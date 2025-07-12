# MonaDraw Smart Contracts

## 프로젝트 개요

MonaDraw 스마트 컨트랙트는 혁신적인 보험 디파이 프로젝트의 핵심 로직을 구현한 Solidity 기반 스마트 컨트랙트 모음입니다. 선물 거래, 복권 풀 관리, 응모권 시스템, 그리고 자동화된 보험료 수집 기능을 제공합니다.

## 주요 컨트랙트

### 1. MonaDraw Core (`monad.sol`)
MonaDraw의 핵심 기능을 담당하는 메인 컨트랙트입니다.

#### 주요 기능
- **선물 거래 관리**: 사용자의 선물 거래 실행 및 포지션 관리
- **복권 풀 운영**: 각 코인별 복권 풀 생성 및 관리
- **응모권 시스템**: 청산 및 스테이킹을 통한 응모권 발행
- **당첨자 선정**: Chainlink VRF를 통한 공평한 당첨자 선정
- **자동 보험료 수집**: 거래 수수료의 일부를 복권 풀에 자동 누적

#### 핵심 함수
```solidity
// 선물 거래 실행
function executeTrade(
    address token,
    bool isLong,
    uint256 amount,
    uint256 leverage
) external;

// 복권 응모
function enterLottery(
    address token,
    uint256 ticketId,
    uint256 amount
) external;

// 당첨자 선정
function selectWinner(address token) external;
```

### 2. Sepolia Testnet (`sepolia.sol`)
Sepolia 테스트넷에서의 테스트 및 검증을 위한 컨트랙트입니다.

#### 테스트 기능
- **기능 검증**: 모든 핵심 기능의 정상 동작 확인
- **보안 테스트**: 다양한 공격 시나리오에 대한 방어 테스트
- **가스 최적화**: 컨트랙트 실행 비용 최적화
- **오라클 연동**: Chainlink VRF 정상 동작 확인

## 아키텍처 설계

### 1. 복권 풀 시스템
```
LotteryPool
├── Pool Info
│   ├── Total Prize Pool
│   ├── Ticket Count
│   ├── Draw Period
│   └── Winner Address
├── Ticket Management
│   ├── Ticket-1 (Liquidation)
│   └── Ticket-2 (Staking)
└── Winner Selection
    └── Chainlink VRF
```

### 2. 응모권 시스템
- **전용 티켓**: 청산 시 발행, 해당 코인 전용
- **공용 티켓**: 스테이킹 시 발행, 모든 풀 사용 가능
- **NFT 표준**: ERC-721 기반 응모권 토큰화

### 3. 보험료 수집 메커니즘
```
Trade Fee (0.4%)
├── Platform Fee (0.2%)
└── Insurance Pool (0.2%)
    └── Distributed to Lottery Pools
```

## 보안 고려사항

### 1. 재진입 공격 방지
- OpenZeppelin의 ReentrancyGuard 사용
- 외부 호출 전 상태 변경

### 2. 오라클 조작 방지
- Chainlink VRF의 검증된 랜덤성 활용
- 다중 오라클 검증 시스템

### 3. 권한 관리
- 관리자 권한의 명확한 분리
- 다중 서명을 통한 중요 작업 보호

### 4. 가스 최적화
- 배치 처리로 가스 비용 절약
- 불필요한 스토리지 접근 최소화

## 개발 환경 설정

### 필수 도구
- **Solidity**: 0.8.19 이상
- **Hardhat**: 개발 및 테스트 프레임워크
- **OpenZeppelin**: 보안 라이브러리
- **Chainlink**: 오라클 서비스

### 설치 방법

1. **의존성 설치**
```bash
cd contract
npm install
```

2. **환경 변수 설정**
```bash
cp .env.example .env
# .env 파일에 필요한 변수들 설정
```

3. **컴파일**
```bash
npx hardhat compile
```

4. **테스트 실행**
```bash
npx hardhat test
```

### 환경 변수
```env
PRIVATE_KEY=your_private_key
RPC_URL=your_rpc_url
ETHERSCAN_API_KEY=your_etherscan_key
CHAINLINK_VRF_KEY=your_chainlink_key
```

## 배포 가이드

### 1. 로컬 네트워크
```bash
npx hardhat node
npx hardhat run scripts/deploy.js --network localhost
```

### 2. Sepolia 테스트넷
```bash
npx hardhat run scripts/deploy.js --network sepolia
```

### 3. 모나드 메인넷
```bash
npx hardhat run scripts/deploy.js --network monad
```

## 테스트

### 테스트 구조
```
test/
├── unit/              # 단위 테스트
│   ├── Lottery.test.js
│   ├── Trading.test.js
│   └── Security.test.js
├── integration/       # 통합 테스트
│   └── FullFlow.test.js
└── gas/              # 가스 최적화 테스트
    └── GasOptimization.test.js
```

### 테스트 실행
```bash
# 전체 테스트
npm test

# 특정 테스트 파일
npx hardhat test test/unit/Lottery.test.js

# 가스 리포트
REPORT_GAS=true npm test
```

## 감사 및 검증

### 1. 정적 분석
- **Slither**: 보안 취약점 검사
- **Mythril**: 심볼릭 실행 분석
- **Echidna**: 퍼징 테스트

### 2. 동적 분석
- **Hardhat**: 로컬 테스트넷
- **Forking**: 메인넷 포크 테스트
- **Invariant Testing**: 불변 조건 검증

## 모니터링

### 1. 이벤트 로깅
```solidity
event LotteryEntered(
    address indexed user,
    address indexed token,
    uint256 ticketId,
    uint256 amount
);

event WinnerSelected(
    address indexed winner,
    address indexed token,
    uint256 prize
);
```

### 2. 상태 추적
- 복권 풀 잔액 모니터링
- 응모권 발행량 추적
- 당첨자 선정 이력 관리

## 업그레이드 전략

### 1. 프록시 패턴
- OpenZeppelin의 UUPS 프록시 사용
- 무중단 업그레이드 지원

### 2. 데이터 마이그레이션
- 상태 데이터 보존
- 점진적 업그레이드 지원

## 라이선스

이 프로젝트는 MIT 라이선스 하에 배포됩니다.

## 기여하기

1. 이 저장소를 포크합니다
2. 기능 브랜치를 생성합니다
3. 변경사항을 커밋합니다
4. 테스트를 실행합니다
5. Pull Request를 생성합니다

## 지원

기술적 질문이나 보안 이슈는 이슈를 생성해 주세요. 