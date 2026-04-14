# mycrm-guide Development Workflow

## Goal

`mycrm-guide`는 배포 안정성과 로컬 검증 속도를 동시에 가져가기 위해 브랜치 역할을 분리해 운영합니다.

## Branch Strategy

### `main`

- Vercel과 연결된 배포 브랜치
- npm에 배포된 `@mycrm-ui/*` 패키지 기준으로만 동작
- 항상 배포 가능한 상태 유지

### `develop`

- 문서와 데모를 빠르게 검증하는 개발 브랜치
- 로컬 `mycrm-ui` 변경을 `build:sync`로 반영해 확인
- 검증이 끝나면 publish된 버전으로 다시 맞춘 뒤 `main`에 PR

## Why We Use `build:sync`

`build:sync`는 `mycrm-ui`를 npm publish하지 않아도 `mycrm-guide`에서 바로 변경사항을 확인할 수 있게 해줍니다.

동작 방식:

1. `mycrm-ui/packages/table` 빌드
2. `mycrm-ui/packages/react-table` 빌드
3. 생성된 `dist` 파일을 `mycrm-guide/node_modules/@mycrm-ui/*`로 복사

이 방식의 장점:

- publish 전에도 데모 화면을 바로 확인 가능
- 버전 업 없이 짧은 피드백 루프 유지
- `package.json`을 로컬 경로 의존성으로 바꾸지 않아 배포 기준이 흔들리지 않음

주의사항:

- `npm install`을 다시 실행하면 복사된 결과가 npm 버전으로 덮일 수 있음
- 현재는 주로 `table`, `react-table` 빌드 산출물을 빠르게 반영하는 용도
- 타입 선언이나 다른 패키지 변경 검증이 중요하면 정식 publish 후 재검증 필요

## Daily Workflow

### 1. 로컬 검증

```bash
cd /Users/jinsol/Desktop/crm/mycrm-guide
npm run sync:ui
npm run dev
```

또는:

```bash
cd /Users/jinsol/Desktop/crm/mycrm-guide
npm run dev:sync
```

### 2. 라이브러리 배포 이후 반영

```bash
cd /Users/jinsol/Desktop/crm/mycrm-guide
npm install @mycrm-ui/react-table@<published-version>
npm run build
```

필요하면 `package-lock.json`도 함께 갱신됩니다.

### 3. `main`으로 올리기 전 체크

- `package.json`이 publish된 버전을 가리키는지 확인
- 로컬 sync 결과에만 의존하지 않는지 확인
- `npm run build` 통과 확인

## Team Rules

- `main`에는 로컬 경로 의존성(`file:`, `link:`)을 커밋하지 않음
- `develop`에서도 가능하면 `package.json`은 npm 버전 기준 유지
- 빠른 확인은 `sync:ui`, 배포 검증은 npm 버전 업데이트 후 수행
- `mycrm-ui` 수정이 `mycrm-guide`에 반영되지 않으면 먼저 `npm run sync:ui`를 다시 실행
