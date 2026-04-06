# Getting Started — @mycrm-ui


## @mycrm-ui/react

공통 React 컴포넌트, 컨텍스트, 훅 모음입니다.

### 컴포넌트

```tsx
import { Portal, ErrorBoundary } from '@mycrm-ui/react'

// Portal: 특정 DOM 노드에 자식을 렌더링
<Portal container={document.body}>
  <Modal />
</Portal>

// ErrorBoundary: 컴포넌트 에러 경계
<ErrorBoundary
  fallback={(error) => <div>오류 발생: {error.message}</div>}
  onError={(error, info) => console.error(error, info)}
>
  <App />
</ErrorBoundary>
```

### 컨텍스트

```tsx
import { ThemeProvider, useTheme, LocaleProvider, useLocale } from '@mycrm-ui/react'

// 테마
<ThemeProvider defaultTheme="light">
  <App />
</ThemeProvider>

function MyComponent() {
  const { theme, setTheme } = useTheme()
  return <button onClick={() => setTheme('dark')}>다크 모드</button>
}

// 로케일
<LocaleProvider defaultLocale="ko-KR">
  <App />
</LocaleProvider>

function MyComponent() {
  const { locale, setLocale } = useLocale()
}
```

### 훅

```ts
import { useDebounce, useClickOutside, useResizeObserver, useId } from '@mycrm-ui/react'

// 값 디바운스
const debouncedSearch = useDebounce(searchTerm, 300)

// 외부 클릭 감지
const ref = useRef<HTMLDivElement>(null)
useClickOutside(ref, () => setOpen(false))

// 엘리먼트 크기 감지
const size = useResizeObserver(ref)  // { width, height } | null

// 고유 ID 생성
const id = useId('input')  // 'input-abc123'
```

---

