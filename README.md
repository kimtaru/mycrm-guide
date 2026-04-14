# mycrm-guide

`mycrm-guide`는 `@mycrm-ui/react-table` 문서와 데모를 제공하는 Next.js 앱입니다.

## Branch Roles

- `main`: Vercel 배포 브랜치입니다. npm에 배포된 `@mycrm-ui/*` 버전만 사용합니다.
- `develop`: 개발 검증 브랜치입니다. 로컬 `mycrm-ui`의 빌드 결과를 빠르게 반영해 문서와 데모를 확인합니다.

`develop`에서도 `package.json`은 npm 버전을 유지하고, 로컬 확인이 필요할 때만 `build:sync`로 `node_modules`를 덮어써서 검증합니다. 이렇게 하면 배포 브랜치 기준은 안정적으로 유지하면서도 라이브러리 수정 확인 속도를 높일 수 있습니다.

## Getting Started

```bash
npm install
npm run dev
```

브라우저에서 [http://localhost:3000](http://localhost:3000)을 열어 확인합니다.

## Local mycrm-ui Workflow

로컬 `mycrm-ui` 변경을 `mycrm-guide`에 반영하는 가장 빠른 방법은 `build:sync` 기반 워크플로우입니다.

```bash
npm run sync:ui
```

이 명령은 내부적으로 `../mycrm-ui`에서 `pnpm build:sync`를 실행해 다음 작업을 처리합니다.

- `@mycrm-ui/table` 빌드
- `@mycrm-ui/react-table` 빌드
- 빌드 결과를 `mycrm-guide/node_modules/@mycrm-ui/*`에 복사

한 번에 개발 서버까지 띄우려면 아래 명령을 사용합니다.

```bash
npm run dev:sync
```

## Recommended Release Flow

1. `mycrm-ui` 수정
2. `mycrm-guide`의 `develop`에서 `npm run sync:ui`로 로컬 검증
3. 검증 완료 후 `mycrm-ui` push 및 npm publish
4. `mycrm-guide/develop`에서 배포된 버전으로 `package.json` 업데이트
5. `mycrm-guide` 검증 후 `main`으로 PR
6. `main` 머지 후 Vercel 배포

## More Detail

운영 규칙과 주의사항은 [docs/development-workflow.md](./docs/development-workflow.md)에서 확인할 수 있습니다.
