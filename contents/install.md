## 설치

### 요구사항

| 항목 | 버전 |
|---|---|
| Node.js | >= 17 |
| React | >= 18 (react-table, react 패키지 사용 시) |
| TypeScript | >= 5.0 (선택, 권장) |

### 패키지 선택 가이드

사용 목적에 따라 필요한 패키지만 설치합니다.

**React 테이블 컴포넌트를 사용하는 경우 (가장 일반적)**
```bash
# npm
npm install @mycrm-ui/react-table

# yarn
yarn add @mycrm-ui/react-table

# pnpm
pnpm add @mycrm-ui/react-table
```

> `@mycrm-ui/react-table`은 내부적으로 `@mycrm-ui/table`에 의존합니다. 별도로 설치할 필요 없습니다.

**유틸리티 / 타입 / 포맷터만 사용하는 경우**
```bash
npm install @mycrm-ui/core
```

**테이블 로직을 직접 사용하는 경우 (프레임워크 독립적)**
```bash
npm install @mycrm-ui/table
```

**모든 패키지 설치**
```bash
npm install @mycrm-ui/core @mycrm-ui/table @mycrm-ui/react @mycrm-ui/react-table
```

### Peer Dependencies

`@mycrm-ui/react-table`과 `@mycrm-ui/react`는 React를 peer dependency로 요구합니다. 프로젝트에 React가 설치되어 있지 않다면 함께 설치해야 합니다.

```bash
npm install react react-dom
npm install @mycrm-ui/react-table
```

### 패키지 간 의존성

```
@mycrm-ui/react-table
  └── @mycrm-ui/table       (자동 설치)
  └── react, react-dom      (peer, 직접 설치 필요)

@mycrm-ui/react
  └── react, react-dom      (peer, 직접 설치 필요)

@mycrm-ui/table             (의존성 없음)
@mycrm-ui/core              (의존성 없음)
```

### TypeScript 설정

별도의 타입 패키지 없이 각 패키지에 타입 선언이 포함되어 있습니다.

`tsconfig.json`에서 모듈 해석 방식을 확인합니다.

```json
{
  "compilerOptions": {
    "moduleResolution": "bundler",  // Vite 사용 시 권장
    "module": "ESNext",
    "strict": true
  }
}
```

> `moduleResolution: "node"`를 사용하는 경우에도 동작하지만, `"bundler"` 또는 `"node16"` 이상을 권장합니다.

### ESM / CJS 지원

모든 패키지는 ESM(`.js`)과 CJS(`.cjs`) 두 형식을 모두 제공합니다. 번들러(Vite, Webpack, Rollup)가 자동으로 적절한 형식을 선택합니다.

```
dist/index.js    — ESM (import)
dist/index.cjs   — CJS (require)
dist/index.d.ts  — TypeScript 타입 선언
```

### 설치 확인

설치 후 아래 코드로 정상 동작을 확인합니다.

```ts
import { formatDate } from '@mycrm-ui/core'
import { Table } from '@mycrm-ui/react-table'

console.log(formatDate(new Date(), 'YYYY-MM-DD'))
```