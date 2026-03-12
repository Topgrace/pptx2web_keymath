# 1-1 단원 이미지 원고 구현 가이드

최종 업데이트: 2026-03-12  
프로젝트 경로: `d:\Dev\AI테스트용\pptx2web`  
기준 커밋: `135cc59` (`u6,u7,u8 초안원고구현`)

## 목적

새 대화 세션에서 단원별 원고 이미지를 바탕으로 `1-1` 시리즈 콘텐츠를 계속 추가할 때, 다음 에이전트가 빠르게 현재 규칙을 파악하고 같은 방식으로 구현할 수 있도록 정리한 문서다.

이 문서는 특히 `1-1-u6`, `1-1-u7`, `1-1-u8`를 구현하면서 확정된 작업 원칙을 기준으로 한다.

## 현재 완료 상태

- `1-1-u6`: 공약수와 최대공약수
- `1-1-u7`: 공배수와 최소공배수
- `1-1-u8`: 최대공약수와 최소공배수의 관계

공개 경로:

- `/1-1-u6`
- `/1-1-u7`
- `/1-1-u8`

연결 파일:

- `src/content/slides/1-1-u6/`
- `src/content/slides/1-1-u7/`
- `src/content/slides/1-1-u8/`
- `src/pages/1-1-u6.tsx`
- `src/pages/1-1-u7.tsx`
- `src/pages/1-1-u8.tsx`
- `src/lib/unit-route-loaders.ts`
- `src/data/curriculum.ts`

## 다음 세션에서 유지해야 할 핵심 원칙

### 1. 원고 이미지는 출처로만 사용한다

- 완성 UI에 원본 이미지를 그대로 넣지 않는다.
- 이미지의 핵심 문장, 예시, 설명 순서를 사람이 옮겨 MDX 원고로 재구성한다.
- 레이아웃은 이미지 복제보다 기존 `1-1` 단원 UX 일관성을 우선한다.

### 2. 기존 `1-1` 단원 스타일을 유지한다

- 모바일 스크롤형 인터랙티브 슬라이드 형식을 유지한다.
- 노란 강조, 파란 포인트, 카드형 단계 진행 등 `u6/u7/u8`의 시각 언어를 이어간다.
- 새 단원은 기존 1-1 계열과 같은 배경 톤과 카드 리듬을 사용한다.

### 3. 시각적으로 복잡한 부분만 컴포넌트로 분리한다

- 단순 설명, 요약, 브리지 텍스트는 MDX에서 해결한다.
- 표, 단계 시각화, 인포그래픽성 요소만 신규 컴포넌트로 만든다.
- 한 단원에 신규 콘텐츠 컴포넌트 수를 최소화한다.

### 4. 퀴즈 데이터와 본문을 분리한다

- 본문 설명은 `*.mdx`
- 퀴즈 텍스트/정답/선택지는 `steps-data.ts`
- 설정은 `config.ts`

### 5. 수식과 문자열은 안전하게 넣는다

- 퀴즈 정답값은 가능하면 ASCII 안전 문자열을 우선 사용한다.
- 화면 표시는 `answerLatex`로 보완한다.
- 곱셈기호 같은 특수문자는 데이터 비교용 값에 직접 의존하지 않는다.
- 인코딩 사고를 줄이기 위해 비ASCII가 꼭 필요하지 않으면 회피한다.

### 6. 설명 보강은 최소한으로 한다

- 이미지 기반 핵심 흐름은 유지한다.
- 학습 완결성을 위해 보강 예시나 확인 문제는 1~2개만 추가한다.
- 대량 연습문제 세트까지 확장하지 않는다.

## 새 단원 추가 표준 절차

단원 하나를 추가할 때 기본적으로 아래 파일이 필요하다.

### 1. 슬라이드 모듈 추가

경로:

- `src/content/slides/<unit-id>/config.ts`
- `src/content/slides/<unit-id>/steps-data.ts`
- `src/content/slides/<unit-id>/<unit-id>.mdx`

예:

- `src/content/slides/1-1-u9/config.ts`
- `src/content/slides/1-1-u9/steps-data.ts`
- `src/content/slides/1-1-u9/1-1-u9.mdx`

### 2. 페이지 래퍼 추가

- `src/pages/<unit-id>.tsx`

패턴:

- `slideConfig` import
- `quizStepIds` import
- `MdxContent` import
- `SlidePage`에 연결

### 3. 공개 경로 연결

수정 파일:

- `src/lib/unit-route-loaders.ts`

할 일:

- loader 추가
- `unitPageRoutes`에 새 path 추가

### 4. 커리큘럼 공개

수정 파일:

- `src/data/curriculum.ts`

할 일:

- 해당 단원 `status: 'unlocked'`
- `path: '/<unit-id>'` 연결

## 단원 설계 패턴

`u1/u2/u3/u4/u5/6/u7/u8` 기준으로, 1개 단원은 원고의 내용에 따라 중학생이 스텝별로 학습하기 적당한 단계로 쪼개어
스텝을 나눈다.

권장 구조:

1. `0 intro`
2. 개념 정의
3. 핵심 관계 1
4. 방법/브리지
5. 방법 또는 유도 1
6. 보강 예시
7. 방법 또는 활용 2
8. 핵심 정리
9. complete

주의:

- `totalSteps`는 실제 마지막 step id 기준이 아니라 총 step 개수와 일치해야 한다.
- 현재 `u6/u7/u8`은 모두 `9`개 step으로 구현되어 있다.

## 이미 구현된 단원에서 재사용할 패턴

### `1-1-u6`

주제:

- 공약수는 최대공약수의 약수
- 소인수분해 이용하기
- 나눗셈 이용하기
- 서로소

재사용 포인트:

- 정의 -> 대표 예시 -> 방법 2개 -> 요약 구조

관련 시각화:

- `src/components/content/gcd-prime-factorization-motion.tsx`
- `src/components/content/gcd-division-table-motion.tsx`

### `1-1-u7`

주제:

- 공배수는 최소공배수의 배수
- 소인수분해 이용하기
- 나눗셈 이용하기

재사용 포인트:

- `u6`와 거의 같은 골격으로 반대 개념을 설명할 때 유용하다.

관련 시각화:

- `src/components/content/lcm-prime-factorization-motion.tsx`
- `src/components/content/lcm-division-table-motion.tsx`

### `1-1-u8`

주제:

- `(두 수의 곱) = (최대공약수) × (최소공배수)` 관계식 유도

재사용 포인트:

- 정의 반복보다 관계식 유도형 단원에 적합하다.
- 상단 관계도 1개만 컴포넌트로 만들고, 핵심 유도는 MDX와 `SolutionSteps`로 해결했다.

관련 시각화:

- `src/components/content/gcd-lcm-relation-setup-motion.tsx`

## 파일 작성 규칙

### `config.ts`

- `slug`는 단원별로 고유해야 한다.
- `title`은 학습자 화면 기준으로 바로 읽히는 한국어 제목으로 둔다.
- 색상은 `u6/u7/u8` 계열과 맞춘다.

### `steps-data.ts`

- 퀴즈가 있는 step만 `quiz`를 둔다.
- 핵심 용어를 정답 축으로 둔다.
- 수식이 필요한 선택지는 `answerLatex`를 적극 사용한다.
- 데이터 비교용 `answer` 값은 가급적 ASCII 안전 문자열로 둔다.

예:

- `G*a`
- `G*a*b`
- `L*G`

### `*.mdx`

- 카드 배치와 설명 흐름은 여기서 결정한다.
- Step별 메시지는 짧고 단정하게 쓴다.
- 이미지 문장을 그대로 베끼기보다, 모바일 카드 흐름에 맞게 나눈다.
- 지나치게 복잡한 한 장짜리 인포그래픽은 여러 Step으로 분해한다.

## 작업 중 주의사항

### 1. 기존 미커밋 변경이 있어도 되돌리지 않는다

- 이 프로젝트는 워크트리가 더러울 수 있다.
- 사용자가 만든 변경과 충돌하지 않으면 그대로 두고 진행한다.
- 직접 만든 변경만 수정한다.

### 2. 수동 편집은 `apply_patch` 우선

- 파일 생성/수정은 가능하면 `apply_patch`로 처리한다.
- PowerShell 한 줄 치환으로 한글 파일 전체를 덮어쓰는 방식은 피한다.

### 3. 검색은 `rg` 우선

- 파일 찾기: `rg --files`
- 텍스트 찾기: `rg -n "pattern" src`

## 검증 절차

새 단원을 추가한 뒤 아래 순서를 기본 검증으로 사용한다.

### 필수

```powershell
npm.cmd run validate:slides
rg -nP "\\x{D69E}|\\x{FFFD}" src
npm.cmd run build
```

판정 기준:

- `validate:slides` 통과해야 함
- 인코딩 검사에서 결과가 없어야 함
- `build` 통과해야 함

### 참고

```powershell
npm.cmd run lint
```

현재 상태:

- `lint`는 이번 세션 기준 baseline 실패가 이미 있다.
- 따라서 새 단원 작업 완료 판정은 우선 `validate:slides`와 `build` 기준으로 잡는다.

## 현재 알려진 baseline lint 이슈

이번 세션 기준 `npm.cmd run lint` 실패는 아래 기존 파일들 때문이다.

- `src/components/cards/eratosthenes-origin-motion-card.tsx`
- `src/components/cards/prime-composite-neo-card.tsx`
- `src/components/content/exponent-grouping-order-motion.tsx`
- `src/components/content/factor-tree-step3-activity.tsx`
- `src/components/content/prime-division-step2-activity.tsx`
- `src/components/quiz/choice-panel.tsx`
- `src/components/ui/badge.tsx`
- `src/components/ui/button.tsx`
- `src/hooks/use-slide-progress.tsx`
- `src/hooks/use-typewriter.ts`

다음 세션 에이전트는 이 실패를 새 단원 변경 탓으로 오해하지 말 것.

## 다음 세션에서 바로 할 일

새 원고 이미지를 받으면 아래 순서로 시작하면 된다.

1. 이미지에서 핵심 문장, 예시, 방법, 정리 문구를 추출한다.
2. `9 step` 내외로 학습 흐름을 설계한다.
3. 복잡한 시각화가 필요한지 판단한다.
4. `config.ts`, `steps-data.ts`, `*.mdx`, `pages/<unit-id>.tsx`를 만든다.
5. `unit-route-loaders.ts`, `curriculum.ts`를 연결한다.
6. `validate:slides`, 인코딩 검사, `build`를 실행한다.

## 추천 응답 방식

사용자가 "구현계획을 세워라"라고 하면:

- 먼저 원고의 핵심 개념 구조를 짧게 정리
- 그다음 `콘텐츠 구조`, `구현 방식`, `연결 작업`, `퀴즈 규칙`, `검증 계획`, `가정` 순서로 제안

사용자가 "PLEASE IMPLEMENT THIS PLAN"이라고 하면:

- 별도 장황한 재설명 없이 바로 구현
- 필요한 최소 탐색 후 파일 생성/수정
- 끝나면 검증 결과만 짧게 보고

## 참고 파일

- `src/content/slides/1-1-u6/`
- `src/content/slides/1-1-u7/`
- `src/content/slides/1-1-u8/`
- `src/lib/unit-route-loaders.ts`
- `src/data/curriculum.ts`
- `RULES.md`

