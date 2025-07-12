// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import {Client} from "@chainlink/contracts-ccip/contracts/libraries/Client.sol";
import {CCIPReceiver} from "@chainlink/contracts-ccip/contracts/applications/CCIPReceiver.sol";
import {VRFConsumerBaseV2Plus} from "@chainlink/contracts/src/v0.8/vrf/dev/VRFConsumerBaseV2Plus.sol";
import {VRFV2PlusClient} from "@chainlink/contracts/src/v0.8/vrf/dev/libraries/VRFV2PlusClient.sol";

//import "@chainlink/contracts/src/v0.8/interfaces/VRFCoordinatorV2Interface.sol";
//import "@chainlink/contracts/src/v0.8/VRFConsumerBaseV2.sol";


import {LinkTokenInterface} from "@chainlink/contracts/src/v0.8/shared/interfaces/LinkTokenInterface.sol";
import {IRouterClient} from "@chainlink/contracts-ccip/contracts/interfaces/IRouterClient.sol";
//import {OwnerIsCreator} from "@chainlink/contracts/src/v0.8/shared/access/OwnerIsCreator.sol";


interface VRFCoordinatorV2PlusInterface {
    function requestRandomWords(
        VRFV2PlusClient.RandomWordsRequest calldata req
    ) external returns (uint256 requestId);
}

/**
 * THIS IS AN EXAMPLE CONTRACT THAT USES HARDCODED VALUES FOR CLARITY.
 * THIS IS AN EXAMPLE CONTRACT THAT USES UN-AUDITED CODE.
 * DO NOT USE THIS CODE IN PRODUCTION.
 */

/// @title - A simple contract for receiving string data across chains.
contract Receiver is CCIPReceiver, VRFConsumerBaseV2Plus {
    
    // Monad 관련 상태변수
    uint64 public monadChainSelector;
    address public monadReceiver;

    //setter 함수
    function setMonadChainSelector(uint64 _selector) external /*onlyOwner*/ {
        monadChainSelector = _selector;
    }
    function setMonadReceiver(address _receiver) external /*onlyOwner*/ {
        monadReceiver = _receiver;
    }

    // Event emitted when a message is received from another chain.
    //CCIP 관련
    event MessageReceived(
        bytes32 indexed messageId, // The unique ID of the message.
        uint64 indexed sourceChainSelector, // The chain selector of the source chain.
        address sender, // The address of the sender from the source chain.
        uint256 range // The text that was received.
    );

    bytes32 private s_lastReceivedMessageId; // Store the last received messageId.
    uint256 private s_lastReceivedRange; // Store the last received text.
    uint256 public s_lastRandomNumber; // 마지막 랜덤값 

   
    mapping(uint256 => uint256) private s_requestIdToRange; // VRF 요청별 범위 관리
    mapping(uint256 => uint256) public s_requestIdToRandom; // requestId별 랜덤값 저장

    //VRF 관련
    event VRFRequested(uint256 indexed requestId, uint256 range);
    event RandomNumberGenerated(
        uint256 indexed messageId,
        uint256 indexed randomNumber
    );

    VRFCoordinatorV2PlusInterface private immutable COORDINATOR;
    uint256 private immutable s_subscriptionId;
    bytes32 private immutable s_keyHash;
    uint32 private constant CALLBACK_GAS_LIMIT = 200000;
    uint16 private constant REQUEST_CONFIRMATIONS = 3;
    uint32 private constant NUM_WORDS = 1;

    
    IRouterClient public s_router;
    LinkTokenInterface public s_linkToken; 

    
    constructor(
        address router,
        address linkToken,
        address vrfCoordinator,
        uint256 subscriptionId,
        bytes32 keyHash
    ) CCIPReceiver (router) VRFConsumerBaseV2Plus(vrfCoordinator) {
        COORDINATOR = VRFCoordinatorV2PlusInterface(vrfCoordinator);
        s_subscriptionId = subscriptionId;
        s_keyHash = keyHash;

        s_router = IRouterClient(router);
        s_linkToken = LinkTokenInterface(linkToken);

    }

    //CCIP 메시지 수신
    /// handle a received message
    function _ccipReceive(
        Client.Any2EVMMessage memory any2EvmMessage
    ) internal override {
        s_lastReceivedMessageId = any2EvmMessage.messageId; // fetch the messageId
        uint256 range = abi.decode(any2EvmMessage.data, (uint256));
        s_lastReceivedRange = range;

        emit MessageReceived(
            any2EvmMessage.messageId,
            any2EvmMessage.sourceChainSelector, // fetch the source chain identifier (aka selector)
            abi.decode(any2EvmMessage.sender, (address)), // abi-decoding of the sender address,
            range
        );

        //VRF 요청
        _requestRandomNumber(range);
    }

    /// @notice VRF 랜덤 수 요청
    function _requestRandomNumber(uint256 range) internal {
        //VRFV2PlusClient.RandomWordsRequest 구조체 생성
        VRFV2PlusClient.RandomWordsRequest memory req = VRFV2PlusClient.RandomWordsRequest({
            keyHash: s_keyHash,
            subId: s_subscriptionId,
            requestConfirmations: REQUEST_CONFIRMATIONS,
            callbackGasLimit: CALLBACK_GAS_LIMIT,
            numWords: NUM_WORDS,
            extraArgs: ""   // 특별한 추가 인자 없으면 빈 값
        });
        uint256 requestId = COORDINATOR.requestRandomWords(req);
        s_requestIdToRange[requestId] = range;
        emit VRFRequested(requestId, range);
    
    }

    
    function sendRandomToMonad(
        uint64 _monadChainSelector,
        address _monadReceiver,
        uint256 lottoNum
    ) public returns (bytes32 messageId) {

        Client.EVM2AnyMessage memory evm2AnyMessage = Client.EVM2AnyMessage({
            receiver: abi.encode(_monadReceiver),
            data: abi.encode(lottoNum),
            tokenAmounts: new Client.EVMTokenAmount[](0),
            extraArgs: Client._argsToBytes(
                Client.GenericExtraArgsV2({
                    gasLimit: 200_000,
                    allowOutOfOrderExecution: true
                })
            ),
            feeToken: address(s_linkToken)
        });

        uint256 fees = s_router.getFee(
            monadChainSelector,
            evm2AnyMessage
        );

        require(fees <= s_linkToken.balanceOf(address(this)), "Not enough LINK for CCIP fee");

        s_linkToken.approve(address(s_router), fees);

        messageId = s_router.ccipSend(_monadChainSelector, evm2AnyMessage);

        return messageId;
    }


    /// @notice VRF callback 
    function fulfillRandomWords(uint256 requestId, uint256[] calldata randomWords) internal override {
        uint256 range = s_requestIdToRange[requestId];
        // 1~range 사이의 자연수로 변환
        uint256 randomNum = (randomWords[0] % range) + 1; //1~range 자연수 ㅇㅇ
        s_lastRandomNumber = randomNum;
        s_requestIdToRandom[requestId] = randomNum;
        emit RandomNumberGenerated(requestId, randomNum);


        sendRandomToMonad(monadChainSelector, monadReceiver,randomNum);
    }

    


    /// @notice 최근 메시지 및 랜덤값 조회
    function getLastReceivedDetails()
        external
        view
        returns (
            bytes32 messageId,
            uint256 range,
            uint256 randomNumber
        )
    {
        return (s_lastReceivedMessageId, s_lastReceivedRange, s_lastRandomNumber);
    }
}