# 작업하기 좋은 카페, 작카

***작업하기 좋은 카페 리뷰***

## 사용 stack

***backend***

- node.js
- typescript
- serverless framework, middy
- firebase-admin
- mongoose
- yup

***frontend***

- react
- typescript
- recoil
- firebase
- mui, emotion
- vite

## 프로젝트 구성

```
.
├── packages
│   ├── backend                   # 백엔드
│   │   ├── src
│   │   │   ├── function          # API 요청 처리 함수
│   │   │   ├── lib               # 유틸리티 디렉터리
│   │   │   ├── middleware        # 미들웨어 디렉터리
│   │   │   ├── model             # 데이터베이스 모델
│   │   │   ├── service           # 서비스 로직
│   │   │   ├── validation        # 유효성 검증 로직
│   │   │   └── handler.ts        # API 함수 설정 파일
│   │   ├── package.json
│   │   ├── serverless.ts
│   │   ├── tsconfig.json
│   │   ├── tsconfig.paths.json
│   │   └── yarn.lock
│   └── frontend
│       ├── public
│       ├── src
│       │   ├── assets
│       │   ├── bootstrap          # provider 등 선행작업 디렉터리
│       │   ├── component          # 재사용 가능한 컴포넌트
│       │   ├── helper             # 유틸리티
│       │   ├── model              # 데이터베이스 모델 타입
│       │   ├── page               # 페이지 구성 컴포넌트
│       │   ├── store              # recoil 상태 관리 디렉터리
│       │   │   ├── atom
│       │   │   ├── selector
│       │   ├── style
│       │   ├── App.tsx
│       │   ├── main.tsx
│       │   └── vite-env.d.ts
│       ├── index.html
│       ├── package.json
│       ├── tsconfig.json
│       ├── tsconfig.node.json
│       ├── vite.config.ts
│       ├── yarn-error.log
│       └── yarn.lock
├── README.md
├── lerna.json
├── package.json
├── tsconfig.json
├── yarn-error.log
└── yarn.lock
```
