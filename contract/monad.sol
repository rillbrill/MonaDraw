// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import {IRouterClient} from "@chainlink/contracts-ccip/contracts/interfaces/IRouterClient.sol";
import {OwnerIsCreator} from "@chainlink/contracts/src/v0.8/shared/access/OwnerIsCreator.sol";
import {Client} from "@chainlink/contracts-ccip/contracts/libraries/Client.sol";
import {LinkTokenInterface} from "@chainlink/contracts/src/v0.8/shared/interfaces/LinkTokenInterface.sol";
import {CCIPReceiver} from "@chainlink/contracts-ccip/contracts/applications/CCIPReceiver.sol";

/**
 * THIS IS AN EXAMPLE CONTRACT THAT USES HARDCODED VALUES FOR CLARITY.
 * THIS IS AN EXAMPLE CONTRACT THAT USES UN-AUDITED CODE.
 * DO NOT USE THIS CODE IN PRODUCTION.
 */

/// @title - A simple contract for sending string data across chains.
contract SenderReceiver is OwnerIsCreator, CCIPReceiver {
    // Custom errors to provide more descriptive revert messages.
    error NotEnoughBalance(uint256 currentBalance, uint256 calculatedFees); // Used to make sure contract has enough balance.

    // Event 범위 보냈다!
    event RangeSent(
        bytes32 indexed messageId, // The unique ID of the CCIP message.
        uint64 indexed destinationChainSelector, // The chain selector of the destination chain.
        address receiver, // The address of the receiver on the destination chain.
        uint256 range, // The text being sent.
        address feeToken, // the token address used to pay CCIP fees.
        uint256 fees // The fees paid for sending the CCIP message.
    );
    //범위 받았다!!
    event RandomNumberReceived(
        bytes32 indexed messageId,
        uint64 indexed sourceChainSelector,
        address sender,
        uint256 randomNumber
    );

    IRouterClient private s_router;
    LinkTokenInterface private s_linkToken;

    // 상태 변수로 저장
    uint64 public sepoliaChainSelector;   // sepolia chain 셀렉터 (sender)
    address public remoteReceiver;            // 상대(세폴리아) 컨트랙트 주소

    // 마지막 range, 랜덤값 저장
    uint256 public lastSentRange;
    uint256 public lastReceivedRandomNumber;
    bytes32 public lastReceivedMessageId;

    /// @notice Constructor initializes the contract with the router address.
    /// @param _router The address of the router contract.
    /// @param _link The address of the link contract.
    constructor(address _router, address _link) CCIPReceiver(_router) {
        s_router = IRouterClient(_router);
        s_linkToken = LinkTokenInterface(_link);
    }

    function setSepoliaChainSelector(uint64 _selector) external onlyOwner {
        sepoliaChainSelector = _selector;
    }
     function setRemoteReceiver(address _receiver) external onlyOwner {
        remoteReceiver = _receiver;
    }

    /// @notice Sends data to receiver on the destination chain.
    /// @dev Assumes your contract has sufficient LINK.
    /// @param range The string text to be sent.
    /// @return messageId The ID of the message that was sent.
    //sepolia로 range 값 전송
    function sendMessage(
        uint256 range
    ) external onlyOwner returns (bytes32 messageId) {
        // Create an EVM2AnyMessage struct in memory with necessary information for sending a cross-chain message
        Client.EVM2AnyMessage memory evm2AnyMessage = Client.EVM2AnyMessage({
            receiver: abi.encode(remoteReceiver), // ABI-encoded receiver address
            data: abi.encode(range), // ABI-encoded uint256
            tokenAmounts: new Client.EVMTokenAmount[](0), // Empty array indicating no tokens are being sent
            extraArgs: Client._argsToBytes(
                // Additional arguments, setting gas limit and allowing out-of-order execution.
                // Best Practice: For simplicity, the values are hardcoded. It is advisable to use a more dynamic approach
                // where you set the extra arguments off-chain. This allows adaptation depending on the lanes, messages,
                // and ensures compatibility with future CCIP upgrades. Read more about it here: https://docs.chain.link/ccip/concepts/best-practices/evm#using-extraargs
                Client.GenericExtraArgsV2({
                    gasLimit: 200_000, // Gas limit for the callback on the destination chain
                    allowOutOfOrderExecution: true // Allows the message to be executed out of order relative to other messages from the same sender
                })
            ),
            // Set the feeToken  address, indicating LINK will be used for fees
            feeToken: address(s_linkToken)
        });

        // 수수료 계산
        uint256 fees = s_router.getFee(
            sepoliaChainSelector,
            evm2AnyMessage
        );

        if (fees > s_linkToken.balanceOf(address(this)))
            revert NotEnoughBalance(s_linkToken.balanceOf(address(this)), fees);

        // approve the Router to transfer LINK tokens on contract's behalf. It will spend the fees in LINK
        s_linkToken.approve(address(s_router), fees);

        // Send the message through the router and store the returned message ID
        messageId = s_router.ccipSend(sepoliaChainSelector, evm2AnyMessage);

        // Emit an event with message details
        emit RangeSent(
            messageId,
            sepoliaChainSelector,
            remoteReceiver,
            range,
            address(s_linkToken),
            fees
        );
        // Return the message ID
        return messageId;
    }



    /// @notice 세폴리아에서 랜덤값 수신 (CCIP)
    function _ccipReceive(
        Client.Any2EVMMessage memory any2EvmMessage
    ) internal override {
        // randomNumber 추출 (세폴리아에서 abi.encode(randomNum, requestId)로 보냈으면 구조 맞춰서 디코딩)
        (uint256 randomNumber, ) = abi.decode(any2EvmMessage.data, (uint256, uint256));
        lastReceivedRandomNumber = randomNumber;
        lastReceivedMessageId = any2EvmMessage.messageId;

        emit RandomNumberReceived(
            any2EvmMessage.messageId,
            any2EvmMessage.sourceChainSelector,
            abi.decode(any2EvmMessage.sender, (address)),
            randomNumber
        );
    }

    /// @notice 최근 받은 랜덤값 조회
    function getLastReceivedRandomNumber() external view returns (uint256) {
        return lastReceivedRandomNumber;
    }

    receive() external payable {}
    
}
