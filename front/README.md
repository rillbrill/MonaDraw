# MonaDraw Frontend

## 프로젝트 개요

MonaDraw 프론트엔드는 혁신적인 보험 디파이 프로젝트의 사용자 인터페이스를 제공하는 React 기반 웹 애플리케이션입니다. 사용자들이 선물 거래, 복권 응모, 응모권 거래 등을 직관적으로 수행할 수 있도록 설계되었습니다.

## 주요 기능

### 🎯 핵심 기능
- **선물 거래**: MonaDraw 자체 DEX에서 선물 거래 수행
- **복권 응모**: 각 코인별 복권 풀에 응모권을 통한 참여
- **응모권 거래**: NFT 마켓플레이스를 통한 응모권 거래
- **실시간 차트**: 거래소 데이터를 실시간으로 표시하는 캔들차트
- **대시보드**: 사용자의 포트폴리오 및 활동 현황 모니터링

### 🎨 UI/UX 특징
- **모던한 디자인**: 직관적이고 사용자 친화적인 인터페이스
- **반응형 레이아웃**: 다양한 디바이스에서 최적화된 경험
- **실시간 업데이트**: WebSocket을 통한 실시간 데이터 동기화
- **다크/라이트 모드**: 사용자 선호에 따른 테마 전환

## 기술 스택

### Frontend Framework
- **React 18**: 최신 React 기능 활용
- **TypeScript**: 타입 안정성과 개발 생산성 향상
- **Vite**: 빠른 개발 서버와 빌드 도구

### UI 라이브러리
- **Tailwind CSS**: 유틸리티 퍼스트 CSS 프레임워크
- **Shadcn/ui**: 재사용 가능한 UI 컴포넌트
- **React Router**: 클라이언트 사이드 라우팅

### 차트 및 시각화
- **TradingView**: 전문적인 금융 차트 라이브러리
- **Recharts**: React 기반 차트 라이브러리

### 상태 관리
- **React Context**: 전역 상태 관리
- **Local Storage**: 사용자 설정 및 데이터 캐싱

## 프로젝트 구조

```
vite-project/
├── src/
│   ├── components/          # 재사용 가능한 UI 컴포넌트
│   │   ├── ui/             # 기본 UI 컴포넌트
│   │   ├── Dashboard.tsx   # 대시보드 페이지
│   │   ├── DrawPage.tsx    # 복권 응모 페이지
│   │   ├── TradeDEX.tsx    # 선물 거래 페이지
│   │   └── ...
│   ├── contexts/           # React Context
│   │   └── TicketContext.tsx
│   ├── lib/                # 유틸리티 함수
│   ├── assets/             # 정적 자산
│   └── App.tsx             # 메인 애플리케이션
├── public/                 # 공개 정적 파일
└── package.json           # 의존성 관리
```

## 설치 및 실행

### 필수 요구사항
- Node.js 18.0.0 이상
- npm 또는 yarn 패키지 매니저

### 설치 방법

1. **의존성 설치**
```bash
cd front/vite-project
npm install
```

2. **개발 서버 실행**
```bash
npm run dev
```

3. **프로덕션 빌드**
```bash
npm run build
```

4. **빌드 결과 미리보기**
```bash
npm run preview
```

## 환경 설정

### 환경 변수
프로젝트 루트에 `.env` 파일을 생성하고 다음 변수들을 설정하세요:

```env
VITE_RPC_URL=your_monad_rpc_url
VITE_CONTRACT_ADDRESS=your_contract_address
VITE_CHAIN_ID=your_chain_id
```

## 주요 페이지

### 1. 대시보드 (`/dashboard`)
- 사용자 포트폴리오 현황
- 최근 거래 내역
- 복권 응모 현황
- 실시간 시장 데이터

### 2. 선물 거래 (`/trade`)
- 다양한 코인 선물 거래
- 실시간 가격 차트
- 주문 입력 및 관리
- 포지션 모니터링

### 3. 복권 응모 (`/draw`)
- 각 코인별 복권 풀 현황
- 응모권 구매 및 응모
- 당첨 확률 계산기
- 응모권 거래소

### 4. 응모권 마켓 (`/market`)
- NFT 응모권 거래
- 가격 비교 및 분석
- 거래 내역 조회

## 개발 가이드

### 컴포넌트 개발
- 모든 컴포넌트는 TypeScript로 작성
- Props 인터페이스 명시적 정의
- 재사용 가능한 컴포넌트 설계

### 스타일링
- Tailwind CSS 클래스 우선 사용
- 컴포넌트별 스타일 모듈화
- 반응형 디자인 고려

### 상태 관리
- 로컬 상태는 useState 사용
- 전역 상태는 Context API 활용
- 복잡한 상태는 useReducer 고려

## 배포

### Vercel 배포 (권장)
```bash
npm install -g vercel
vercel
```

### Netlify 배포
```bash
npm run build
# dist 폴더를 Netlify에 업로드
```

## 기여하기

1. 이 저장소를 포크합니다
2. 기능 브랜치를 생성합니다 (`git checkout -b feature/amazing-feature`)
3. 변경사항을 커밋합니다 (`git commit -m 'Add amazing feature'`)
4. 브랜치에 푸시합니다 (`git push origin feature/amazing-feature`)
5. Pull Request를 생성합니다

## 라이선스

이 프로젝트는 MIT 라이선스 하에 배포됩니다.

## 지원

문제가 발생하거나 질문이 있으시면 이슈를 생성해 주세요.
