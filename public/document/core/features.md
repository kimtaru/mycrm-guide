# @mycrm-ui/core 제공 기능 전체보기

`@mycrm-ui/core`는 mycrm UI 패키지에서 공통으로 사용할 수 있는 프레임워크 독립 TypeScript 기반 패키지다. React 컴포넌트가 아니라 타입, 에러 모델, 범용 유틸리티, 값 포맷터를 제공한다.

## 설치

```bash
npm install @mycrm-ui/core
```

## 전체 Export 목록

```ts
import type {
  ID,
  Key,
  Nullable,
  DeepPartial,
  DeepReadonly,
  CSSProps,
  DateFormatLength,
} from '@mycrm-ui/core'

import {
  MycrmError,
  ValidationError,
  NotFoundError,
  createError,
  deepClone,
  deepMerge,
  flatten,
  groupBy,
  pick,
  omit,
  formatDate,
  formatNumber,
  formatCurrency,
  formatPhoneNumber,
} from '@mycrm-ui/core'
```

## 타입

### ID

```ts
type ID = string | number
```

고객 ID, 행 ID, 엔티티 ID처럼 문자열과 숫자를 모두 허용해야 하는 식별자 타입이다.

```ts
type Customer = {
  id: ID
  name: string
}
```

### Key

```ts
type Key = string | number | symbol
```

객체 키 또는 맵 키처럼 JavaScript property key 전체 범위를 받을 때 사용한다.

### Nullable

```ts
type Nullable<T> = T | null | undefined
```

값이 없을 수 있는 필드를 명시할 때 사용한다.

```ts
type Customer = {
  phone: Nullable<string>
}
```

### DeepPartial

```ts
type DeepPartial<T> = T extends object
  ? { [P in keyof T]?: DeepPartial<T[P]> }
  : T
```

중첩 객체의 모든 필드를 optional로 만든다. 설정 override, patch payload, 테스트 fixture를 만들 때 적합하다.

```ts
type Config = {
  table: {
    pagination: {
      pageSize: number
    }
  }
}

const override: DeepPartial<Config> = {
  table: {
    pagination: {
      pageSize: 50,
    },
  },
}
```

### DeepReadonly

```ts
type DeepReadonly<T> = T extends object
  ? { readonly [P in keyof T]: DeepReadonly<T[P]> }
  : T
```

중첩 객체의 모든 필드를 readonly로 만든다. 외부에서 변경하면 안 되는 설정이나 상수 데이터에 사용한다.

### CSSProps

```ts
type CSSProps = Record<string, string | number | undefined>
```

문자열 키를 갖는 스타일 객체 타입이다. 값은 문자열, 숫자, undefined를 허용한다.

### DateFormatLength

```ts
type DateFormatLength = 8 | 6 | 4
```

`formatDate`의 세 번째 인자로 사용하는 출력 길이 타입이다.

- `8`: `2026-06-05`
- `6`: `26-06-05`
- `4`: `06-05`

## 에러

### MycrmError

```ts
class MycrmError extends Error {
  readonly code: string
  readonly details?: unknown

  constructor(code: string, message: string, details?: unknown)
}
```

공통 에러 베이스 클래스다. `code`, `message`, `details`를 함께 보관한다.

```ts
const error = new MycrmError('PERMISSION_DENIED', '권한이 없습니다.', {
  requiredRole: 'admin',
})

console.log(error.code)
console.log(error.message)
console.log(error.details)
```

### ValidationError

```ts
class ValidationError extends MycrmError {
  constructor(message: string, details?: unknown)
}
```

입력값 검증 실패를 표현한다. `code`는 항상 `VALIDATION_ERROR`다.

```ts
throw new ValidationError('이메일 형식이 올바르지 않습니다.', {
  field: 'email',
})
```

### NotFoundError

```ts
class NotFoundError extends MycrmError {
  constructor(message: string, details?: unknown)
}
```

리소스를 찾지 못한 상황을 표현한다. `code`는 항상 `NOT_FOUND`다.

```ts
throw new NotFoundError('고객을 찾을 수 없습니다.', {
  customerId: 100,
})
```

### createError

```ts
function createError(code: string, message: string, details?: unknown): MycrmError
```

`MycrmError` 인스턴스를 함수 호출 방식으로 만든다.

```ts
const error = createError('CUSTOM_ERROR', '처리할 수 없습니다.', {
  reason: 'invalid_state',
})
```

## 유틸리티 함수

### deepClone

```ts
function deepClone<T>(obj: T): T
```

`structuredClone` 기반으로 값을 깊게 복사한다. 객체, 배열, Date 같은 structured clone 가능 값을 복사할 수 있다.

```ts
const original = { user: { name: 'Kim' } }
const copied = deepClone(original)

copied.user.name = 'Lee'
console.log(original.user.name) // 'Kim'
```

주의할 점:

- 런타임에 `structuredClone`이 있어야 한다.
- 함수, DOM 노드 등 structured clone이 지원하지 않는 값은 복사할 수 없다.

### deepMerge

```ts
function deepMerge<T extends object>(target: T, source: DeepPartial<T>): T
```

객체를 깊게 병합한다. `target`은 변경하지 않고 새 객체를 반환한다.

```ts
const defaults = {
  table: {
    pageSize: 20,
    dense: false,
  },
}

const merged = deepMerge(defaults, {
  table: {
    dense: true,
  },
})

// { table: { pageSize: 20, dense: true } }
```

동작 규칙:

- 중첩 객체는 재귀적으로 병합한다.
- 배열은 병합하지 않고 source 배열로 교체한다.
- `undefined` 값은 target 값을 유지한다.
- `__proto__`, `constructor`, `prototype` 키는 건너뛴다.

### flatten

```ts
function flatten<T>(arr: T[][]): T[]
```

2차원 배열을 1차원 배열로 평탄화한다. depth는 1로 고정된다.

```ts
flatten([[1, 2], [3, 4], [5]])
// [1, 2, 3, 4, 5]
```

### groupBy

```ts
function groupBy<T>(
  arr: T[],
  key: keyof T | ((item: T) => string),
): Record<string, T[]>
```

배열을 특정 key 또는 callback 결과 기준으로 그룹화한다.

```ts
const users = [
  { role: 'admin', name: 'Kim' },
  { role: 'user', name: 'Lee' },
  { role: 'admin', name: 'Park' },
]

groupBy(users, 'role')
// {
//   admin: [{ role: 'admin', name: 'Kim' }, { role: 'admin', name: 'Park' }],
//   user: [{ role: 'user', name: 'Lee' }],
// }
```

```ts
groupBy(users, (user) => user.name[0])
```

### pick

```ts
function pick<T extends object, K extends keyof T>(obj: T, keys: K[]): Pick<T, K>
```

객체에서 지정한 키만 추출한다. 존재하지 않는 키는 결과에 넣지 않는다.

```ts
const user = { id: 1, name: 'Kim', password: 'secret' }

pick(user, ['id', 'name'])
// { id: 1, name: 'Kim' }
```

### omit

```ts
function omit<T extends object, K extends keyof T>(obj: T, keys: K[]): Omit<T, K>
```

객체에서 지정한 키를 제외한 새 객체를 반환한다.

```ts
const user = { id: 1, name: 'Kim', password: 'secret' }

omit(user, ['password'])
// { id: 1, name: 'Kim' }
```

## 포맷터 함수

### formatDate

```ts
function formatDate(
  date: Date | string | number,
  separator?: string | null,
  length?: DateFormatLength,
): string
```

날짜 값을 문자열로 정규화한다. 반환값은 항상 string이다.

입력값:

- `Date`
- `20260605` 같은 8자리 숫자
- `'20260605'` 같은 8자리 문자열
- `'2026-06-05'`, `'2026.06.05'`, `'2026/06/05'`처럼 구분자가 있는 문자열
- 일반 timestamp number

separator 규칙:

- 생략하면 `-`를 사용한다.
- `null`을 넣으면 기본값 `-`를 사용한다.
- 빈 문자열 `''`을 넣으면 구분자를 제거한다.
- 다른 문자열을 넣으면 그 문자열을 연, 월, 일 사이에 넣는다.

length 규칙:

- `8`: 연도 4자리 + 월 2자리 + 일 2자리
- `6`: 연도 뒤 2자리 + 월 2자리 + 일 2자리
- `4`: 월 2자리 + 일 2자리
- 생략하면 `8`이다.

```ts
formatDate('20260605')
// '2026-06-05'

formatDate('20260605', '.')
// '2026.06.05'

formatDate('2026-06-05', '')
// '20260605'

formatDate('20260605', null, 6)
// '26-06-05'

formatDate('20260605', '', 6)
// '260605'

formatDate('20260605', '.', 4)
// '06.05'

formatDate(new Date(2026, 5, 5))
// '2026-06-05'
```

잘못된 날짜이거나 정상적인 날짜 문자열을 만들 수 없는 예외 상황은 빈 문자열을 반환한다.

```ts
formatDate('2026-13-05')
// ''

formatDate('2026-02-30')
// ''
```

### formatNumber

```ts
function formatNumber(
  value: number | string,
  options?: Intl.NumberFormatOptions,
  locale?: string,
): string
```

`Intl.NumberFormat`으로 숫자를 포맷한다. 기본 locale은 `ko-KR`이다. 숫자 문자열도 받을 수 있지만, 숫자가 아닌 문자가 포함된 문자열이나 `Intl.NumberFormat`이 처리할 수 없는 옵션/locale은 빈 문자열을 반환한다.

```ts
formatNumber(1234567)
// '1,234,567'

formatNumber('1234567')
// '1,234,567'

formatNumber(3.14159, { maximumFractionDigits: 2 })
// '3.14'

formatNumber('3.14159', { maximumFractionDigits: 2 })
// '3.14'

formatNumber(0.1234, { style: 'percent' })
// '12%'

formatNumber(1234567, undefined, 'de-DE')
// '1.234.567'

formatNumber('12abc')
// ''

formatNumber('1,234')
// ''
```

### formatCurrency

```ts
function formatCurrency(
  value: number,
  currency?: string,
  locale?: string,
): string
```

`Intl.NumberFormat`의 currency 포맷을 사용한다. 기본 currency는 `KRW`, 기본 locale은 `ko-KR`이다.

```ts
formatCurrency(50000)
// '₩50,000'

formatCurrency(100, 'USD', 'en-US')
// '$100.00'
```

### formatPhoneNumber

```ts
function formatPhoneNumber(phone: string, countryCode?: string): string
```

전화번호 문자열에서 숫자만 추출한 뒤 한국 전화번호 형식으로 포맷한다. 기본 `countryCode`는 `KR`이다.

지원하는 한국 번호:

- 서울 `02`: 9자리, 10자리
- 지방/모바일 `0xx`: 10자리, 11자리

```ts
formatPhoneNumber('01012345678')
// '010-1234-5678'

formatPhoneNumber('0101234567')
// '010-123-4567'

formatPhoneNumber('0212345678')
// '02-1234-5678'

formatPhoneNumber('021234567')
// '02-123-4567'

formatPhoneNumber('0312345678')
// '031-234-5678'
```

인식하지 못하는 형식이나 `KR`이 아닌 countryCode는 원본 문자열을 반환한다.

```ts
formatPhoneNumber('+1-800-555-1234', 'US')
// '+1-800-555-1234'
```

## 실무 사용 기준

`@mycrm-ui/core`에 두기 좋은 것:

- React나 브라우저 UI에 의존하지 않는 타입
- 여러 패키지에서 반복되는 순수 함수
- 값 표시를 위한 포맷터
- 공통 에러 코드와 에러 클래스

`@mycrm-ui/core`에 두지 않는 것이 좋은 것:

- React hook
- JSX 컴포넌트
- DOM 이벤트 처리
- 테이블 전용 상태 관리
- 특정 앱 비즈니스 로직

## 빠른 예시

```ts
import {
  type ID,
  type Nullable,
  ValidationError,
  formatDate,
  formatCurrency,
  groupBy,
  pick,
} from '@mycrm-ui/core'

type Customer = {
  id: ID
  name: string
  phone: Nullable<string>
  grade: 'vip' | 'normal'
  createdAt: string
  totalAmount: number
}

const customers: Customer[] = [
  {
    id: 1,
    name: 'Kim',
    phone: '01012345678',
    grade: 'vip',
    createdAt: '20260605',
    totalAmount: 1250000,
  },
]

const row = customers[0]

formatDate(row.createdAt, '.', 6)
// '26.06.05'

formatCurrency(row.totalAmount)
// '₩1,250,000'

groupBy(customers, 'grade')

pick(row, ['id', 'name'])

if (!row.name.trim()) {
  throw new ValidationError('고객명은 필수입니다.', { field: 'name' })
}
```
