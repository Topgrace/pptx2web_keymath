# PPTX → 인터랙티브 웹 변환 프로젝트 인수인계 문서

> **최종 작성일**: 2026-02-20  
> **프로젝트 경로**: `d:\Dev\AI테스트용\pptx2web`  
> **원본 PPTX**: `중등 2-1 2단원_0209(최종)_익히기합본.pptx`

---

## 1. 프로젝트 개요

중등 수학 2-1 교과서의 PPTX 슬라이드를 **모바일 우선(max-width 480px) 인터랙티브 학습 웹페이지**로 변환하는 프로젝트입니다.

### 핵심 컨셉
- **모바일 웹툰 스타일**: 세로 스크롤 기반, 카드형 단계(step) 진행
- **퀴즈 게이트**: 각 스텝의 퀴즈를 풀어야 다음 스텝으로 진행 가능
- **타이포 모션**: 텍스트가 타이프라이터, 글자별 스태거, 블러-인 등으로 순차 등장
- **KaTeX 수학 렌더링**: LaTeX 기반 수식 표현 (색상 코딩 포함)

### 대상 단원 (현재 2개 완료)
| 라우트 | 소단원 | PPTX 슬라이드 | 스텝 수 |
|--------|--------|---------------|---------|
| `/unit5` | 거듭제곱과 지수법칙 | 2~14 | 21 (0~20) |
| `/unit6` | 단항식의 곱셈과 나눗셈 | 15~26 | 22 (0~21) |

---

## 2. 기술 스택

| 영역 | 기술 | 버전 |
|------|------|------|
| 프레임워크 | React + TypeScript | React 19, TS 5.9 |
| 빌드 | Vite | 최신 |
| 콘텐츠 | MDX (remark-math + rehype-katex) | @mdx-js/rollup |
| 수학 렌더링 | KaTeX | 0.16.28 |
| 스타일링 | Tailwind CSS v4 + shadcn/ui | tw 4.2, shadcn 3.8 |
| 애니메이션 | Framer Motion | 12.x |
| 검증 | Zod | 4.x |
| 라우팅 | React Router (HashRouter) | 7.x |
| 폰트 | @fontsource/nanum-gothic (400, 700, 800) | - |

---

## 3. 프로젝트 구조

```
pptx2web/
├── public/
│   └── images/               # PPTX에서 추출한 캐릭터·도형 이미지
│       ├── shape_2.png        # 메인 캐릭터 (인트로용)
│       ├── slide15_shape3.png # unit6 이미지들
│       └── ...
├── src/
│   ├── main.tsx              # 엔트리 (HashRouter)
│   ├── App.tsx               # 라우팅 (/unit5, /unit6)
│   ├── index.css             # Tailwind 글로벌 + 커스텀 테마 색상
│   │
│   ├── schemas/              # Zod 스키마 (타입 정의)
│   │   ├── step.ts           # Step, Quiz, Choice, BlankType, StepType
│   │   └── slide.ts          # SlideConfig (slug, title, totalSteps, themeColors)
│   │
│   ├── hooks/                # 커스텀 훅
│   │   ├── use-slide-progress.tsx  # useReducer 기반 진행 상태 (currentStep, solved 등)
│   │   ├── use-quiz.ts             # 개별 퀴즈 상태 관리
│   │   └── use-typewriter.ts       # 타이프라이터 애니메이션 훅
│   │
│   ├── components/
│   │   ├── animations/       # 타이포 모션 컴포넌트
│   │   │   ├── stagger-reveal.tsx    # 순차 등장 (0.7s 간격)
│   │   │   ├── character-stagger.tsx # 글자별 등장 (topic-title)
│   │   │   ├── letters-pullup.tsx    # 글자 아래→위 (law-title)
│   │   │   ├── typewriter.tsx        # 타이프라이터 (speech 말풍선)
│   │   │   ├── gradient-text.tsx     # 무지개 그라디언트 (완료 제목)
│   │   │   └── emoji-bounce.tsx      # 이모지 바운스 (완료 체크)
│   │   │
│   │   ├── cards/            # 카드 유형별 컴포넌트
│   │   │   ├── step-card.tsx     # 기본 카드 (Framer Motion visible 애니메이션)
│   │   │   ├── intro-card.tsx    # 인트로 (캐릭터 + speech → title → quiz 순차)
│   │   │   ├── concept-card.tsx  # 개념 설명
│   │   │   ├── law-card.tsx      # 법칙 카드 (공식 + 힌트 + 예시)
│   │   │   ├── definition-card.tsx # 정의 카드
│   │   │   ├── note-card.tsx     # 참고 카드
│   │   │   ├── summary-card.tsx  # 요약/정리 카드
│   │   │   ├── practice-card.tsx # 연습 문제 카드
│   │   │   └── complete-card.tsx # 학습 완료 카드
│   │   │
│   │   ├── content/          # 카드 내부 콘텐츠
│   │   │   ├── law-example.tsx     # 법칙 예시 블록
│   │   │   ├── sign-table.tsx      # 음수 거듭제곱 부호표
│   │   │   └── solution-steps.tsx  # 풀이 과정 단계표시
│   │   │
│   │   ├── layout/           # 레이아웃
│   │   │   ├── slide-container.tsx # 컨테이너 (max-w-[480px])
│   │   │   ├── progress-bar.tsx    # 상단 진행바
│   │   │   └── next-button.tsx     # 하단 다음 버튼 (locked/unlocked/done)
│   │   │
│   │   ├── math/             # 수학 관련
│   │   │   ├── math-display.tsx    # KaTeX 블록/인라인 수식
│   │   │   └── arrow-labels.tsx    # 밑/지수 화살표 라벨
│   │   │
│   │   ├── quiz/             # 퀴즈 시스템
│   │   │   ├── quiz-area.tsx       # 퀴즈 영역 (renderBlank 패턴)
│   │   │   ├── blank-button.tsx    # 빈칸 버튼 (normal/exponent/square)
│   │   │   ├── choice-panel.tsx    # 선택지 패널
│   │   │   └── quiz-feedback.tsx   # 정답/오답 피드백
│   │   │
│   │   ├── mdx/
│   │   │   └── step-wrapper.tsx    # <Step>, <SlideContent> MDX래퍼
│   │   │
│   │   └── ui/               # shadcn/ui 기본 컴포넌트
│   │       ├── button.tsx, card.tsx, badge.tsx, progress.tsx, separator.tsx
│   │
│   ├── content/slides/       # ★ 콘텐츠 데이터 (단원별)
│   │   ├── unit5-exponent/
│   │   │   ├── config.ts     # SlideConfig (slug, title, 21steps, colors)
│   │   │   └── steps-data.ts # Step[] + quizStepIds (퀴즈 정답·선택지)
│   │   ├── unit5-exponent.mdx  # ★ MDX 콘텐츠 (카드 배치·수식·텍스트)
│   │   ├── unit6-monomial/
│   │   │   ├── config.ts
│   │   │   └── steps-data.ts
│   │   └── unit6-monomial.mdx
│   │
│   ├── pages/
│   │   ├── SlidePage.tsx     # 공통 슬라이드 셸 (Provider + Layout)
│   │   ├── Unit5Page.tsx     # /unit5 → SlidePage + unit5 MDX
│   │   └── Unit6Page.tsx     # /unit6 → SlidePage + unit6 MDX
│   │
│   └── lib/
│       └── utils.ts          # cn() (clsx + tailwind-merge)
│
├── backup/
│   └── slide2.html           # 초기 프로토타입 (단일 HTML, React 이전 버전)
│
├── analyze_slide.py          # PPTX 파싱 스크립트 (python-pptx)
├── analyze_slides.py         # 복수 슬라이드 분석
├── analyze2.py               # 상세 분석
├── extract_details*.py       # 텍스트·수식·색상 추출
│
├── vite.config.ts            # MDX + React + Tailwind + KaTeX 플러그인
├── components.json           # shadcn/ui 설정
└── 중등 2-1 2단원_0209(최종)_익히기합본.pptx  # 원본
```

---

## 4. 작업 흐름 (PPTX → 웹페이지 변환 절차)

### 4-1. PPTX 분석 (Python)

```bash
# 1. 슬라이드 내용 추출 (python-pptx 필요)
pip install python-pptx

# 2. 대상 슬라이드 범위의 텍스트/수식/이미지/색상 정보 추출
python analyze_slides.py   # 전체 슬라이드 개요
python extract_details3.py # 개별 슬라이드 상세 (텍스트, 폰트 색상, 수식 등)
```

**추출해야 할 정보**:
- 각 슬라이드의 텍스트 내용 (개념 설명, 공식, 예시, 퀴즈 문제)
- 색상 코딩 (밑: `#D85A3A`, 지수: `#2E7D32`, 공식: `#00AAEE` 등)
- 이미지/캐릭터 도형 → `public/images/` 로 추출
- 소단원 구분, 슬라이드별 역할 (인트로/법칙/연습/정리 등)

### 4-2. 콘텐츠 설계

PPTX 분석 결과를 바탕으로:

1. **스텝(Step) 분할**: 슬라이드 1개 = 스텝 1~2개 (복잡도에 따라)
2. **카드 유형 결정**: intro / concept / law / definition / note / summary / practice / complete
3. **퀴즈 설계**: 각 스텝에 1개의 빈칸 퀴즈 (4지선다)
4. **수식 LaTeX 변환**: PPTX 텍스트 → KaTeX LaTeX 문법

### 4-3. 새 단원 추가 절차

#### A. 데이터 파일 생성

```
src/content/slides/
├── unit7-polynomial/        # 새 단원 폴더
│   ├── config.ts            # SlideConfig
│   └── steps-data.ts        # Step[] + quizStepIds
└── unit7-polynomial.mdx     # MDX 콘텐츠
```

**config.ts** 예시:
```typescript
import type { SlideConfig } from '@/schemas/slide'

export const slideConfig: SlideConfig = {
  slug: 'unit7-polynomial',
  title: '다항식의 덧셈과 뺄셈',
  totalSteps: 18,    // 0부터 시작, 마지막은 complete
  themeColors: { ... },  // 기본값 사용 가능
}
```

**steps-data.ts** 예시:
```typescript
import type { Step } from '@/schemas/step'
import { StepSchema } from '@/schemas/step'

const rawSteps: Step[] = [
  {
    id: 0, type: 'intro', cardVariant: 'default',
    quiz: {
      answer: '정답텍스트',
      blankType: 'normal',     // 'normal' | 'exponent' | 'square'
      choices: [
        { label: '선택지1', value: '선택지1' },
        { label: '선택지2', value: '선택지2' },
        // ...
      ],
      answerLatex: 'a^n',  // KaTeX로 보여줄 경우 (선택)
    },
  },
  // ... 나머지 스텝
]

export const steps = rawSteps.map(s => StepSchema.parse(s))
export const quizStepIds = new Set(steps.filter(s => s.quiz).map(s => s.id))
```

#### B. MDX 콘텐츠 작성

MDX 파일에서 import한 컴포넌트를 조합하여 각 스텝의 UI를 구성합니다.

```mdx
import { Step, SlideContent } from '@/components/mdx/step-wrapper'
import { IntroCard } from '@/components/cards/intro-card'
import { LawCard } from '@/components/cards/law-card'
import { QuizArea } from '@/components/quiz'
import { MathInline } from '@/components/math'
import { steps } from './unit7-polynomial/steps-data'

<SlideContent>

<Step id={0}>
  <IntroCard
    characterImg="/images/캐릭터.png"
    speechText="이번에는 다항식을 배워볼까~"
    topicTitle="다항식"
  >
    {steps[0].quiz && (
      <QuizArea
        stepId={0}
        quiz={steps[0].quiz}
        renderBlank={(blank) => (
          <>여러 항의 합으로 이루어진 식을 {blank} (이)라 해요</>
        )}
      />
    )}
  </IntroCard>
</Step>

<Step id={1}>
  <LawCard
    title="법칙 제목"
    formula={"LaTeX 수식"}
    hint="💡 힌트 텍스트"
  >
    {steps[1].quiz && (
      <QuizArea stepId={1} quiz={steps[1].quiz}
        renderBlank={(blank) => (
          <><MathInline tex={"x + y ="} /> {blank}</>
        )}
      />
    )}
  </LawCard>
</Step>

{/* ... 나머지 스텝 ... */}

</SlideContent>
```

#### C. 페이지 + 라우팅 등록

**페이지 컴포넌트** (`src/pages/Unit7Page.tsx`):
```tsx
import SlidePage from '@/pages/SlidePage'
import { slideConfig } from '@/content/slides/unit7-polynomial/config'
import { quizStepIds } from '@/content/slides/unit7-polynomial/steps-data'
import MdxContent from '@/content/slides/unit7-polynomial.mdx'

export default function Unit7Page() {
  return (
    <SlidePage
      Content={MdxContent}
      totalSteps={slideConfig.totalSteps}
      quizStepIds={quizStepIds}
    />
  )
}
```

**라우팅** (`src/App.tsx`):
```tsx
const Unit7Page = lazy(() => import('@/pages/Unit7Page'))
// ...
<Route path="/unit7" element={<Unit7Page />} />
```

---

## 5. 핵심 아키텍처 패턴

### 5-1. Step 진행 시스템

```
SlideProgressProvider (Context + useReducer)
├── currentStep: number       # 현재 보이는 최대 스텝
├── solvedQuizzes: Set<number> # 풀린 퀴즈 ID 집합
├── nextButtonState: 'locked' | 'unlocked' | 'done'
│   └── 퀴즈가 있는 스텝에서 미풀이 → locked, 풀이 완료 → unlocked
├── advanceStep()             # currentStep + 1
└── markSolved(stepId)        # 퀴즈 정답 처리 → 1.2초 후 자동 advanceStep
```

### 5-2. StepWrapper (MDX → React 연결)

`<Step id={n}>` 래퍼가 `useSlideProgress()`에서 `currentStep`을 읽어:
- `id <= currentStep` → `visible=true` 를 하위 카드에 cloneElement로 주입
- `visible` prop에 따라 Framer Motion 애니메이션 트리거

### 5-3. 퀴즈 흐름

```
blank-button 클릭 → choice-panel 토글
→ 선택지 클릭 → useQuiz.checkAnswer()
  → 정답: solved 표시 + markSolved(stepId) + 1.2초 후 자동 advance
  → 오답: shake 애니메이션 + "다시 생각해보세요!" 피드백
```

### 5-4. 애니메이션 계층

| 레벨 | 대상 | 효과 | 트리거 |
|------|------|------|--------|
| L1 카드 등장 | StepCard | opacity 0→1, y 40→0 | visible prop |
| L2 콘텐츠 순차 | StaggerReveal | 자식 0.7s 간격 순차 등장 | visible state |
| L3 글자 모션 | CharacterStagger, LettersPullUp | 글자별 딜레이 | enabled prop |
| L4 타이프라이터 | Typewriter | 40ms/글자 한 자씩 | enabled + onComplete 체인 |
| L5 완료 이펙트 | GradientText, EmojiBounce | 무지개 흐름, 바운스 | visible |

### 5-5. 빈칸 유형 (BlankType)

| 타입 | 용도 | 크기 |
|------|------|------|
| `normal` | 일반 텍스트 빈칸 | min-w 80px, 패딩 6px 14px |
| `exponent` | 지수 위치 빈칸 (위첨자) | min-w 30px, font 13px, vertical-align super |
| `square` | 분수 내부 □ 빈칸 | exponent와 동일 |

---

## 6. 색상 팔레트

| 용도 | 색상 코드 | Tailwind 변수 |
|------|-----------|---------------|
| 페이지 배경 | `#F0D8C5` | `bg-slide-bg` |
| 카드 배경 (기본) | `#F8F0E4` | `bg-slide-card` |
| 카드 배경 (white) | `#FFFFFF` | `bg-white` |
| 제목·강조 (갈색) | `#7A4C14` | `text-slide-brown` |
| 번호·본문 (회색) | `#646466` | `text-slide-gray` |
| 테두리·악센트 | `#D8A883` | `bg-slide-accent` |
| 밑 (base) | `#D85A3A` | LaTeX `\color{#D85A3A}` |
| 지수 (exponent) | `#2E7D32` | LaTeX `\color{#2E7D32}` |
| 공식 파란색 | `#00AAEE` | LaTeX `\color{#00AAEE}` |
| 오렌지 | `#F68746` | - |

---

## 7. 개발 명령어

```bash
# 의존성 설치
npm install

# 개발 서버
npm run dev          # http://localhost:5173

# 빌드
npm run build        # dist/ 에 출력

# 프리뷰 (빌드 결과 확인)
npm run preview
```

---

## 8. 이미지 추출 방법

PPTX에서 이미지를 추출하여 `public/images/`에 저장합니다.

```python
from pptx import Presentation
from pptx.enum.shapes import MSO_SHAPE_TYPE
import os

prs = Presentation('중등 2-1 2단원_0209(최종)_익히기합본.pptx')
os.makedirs('public/images', exist_ok=True)

for slide_idx, slide in enumerate(prs.slides):
    for shape in slide.shapes:
        if shape.shape_type == MSO_SHAPE_TYPE.PICTURE:
            img = shape.image
            ext = img.content_type.split('/')[-1]
            fname = f'slide{slide_idx+1}_{shape.name}.{ext}'
            with open(f'public/images/{fname}', 'wb') as f:
                f.write(img.blob)
```

---

## 9. 주의사항 / 트러블슈팅

### KaTeX 색상
- LaTeX에서 색상: `\color{#D85A3A}{a}^{\color{#2E7D32}{3}}`
- 중괄호 이스케이프: MDX에서 `{` → `{"{"}` 또는 문자열 prop으로 전달

### MDX 주의
- MDX에서 JSX 표현식은 `{}` 안에 작성
- 주석은 `{/* ... */}` 형태
- import는 파일 최상단에 위치 (frontmatter 아래)

### Framer Motion + React 19
- `framer-motion` 12.x 는 React 19와 호환됨
- StepCard의 `maxHeight` 트릭: 콘텐츠 높이를 모르므로 `maxHeight: 5000` 사용

### 빈칸 퀴즈 answerLatex
- `answer` 필드: 선택지의 `value`와 매칭 (내부 비교용)
- `answerLatex` 필드(선택): 정답 표시 시 KaTeX로 렌더링할 LaTeX 문자열

### HashRouter 사용 이유
- GitHub Pages 등 정적 호스팅 시 새로고침 문제 방지

---

## 10. 진화 이력 요약

| 단계 | 내용 |
|------|------|
| v0.1 | `slide2.html` — 단일 HTML, 인라인 CSS/JS, CDN KaTeX |
| v0.2 | 모바일 웹툰 UI + 퀴즈 게이트 시스템 |
| v0.3 | 타이포 모션 애니메이션 (7종) 추가 |
| v0.4 | 순차 등장 체인 (speech → title → quiz → 콘텐츠 그룹 0.7s 간격) |
| v1.0 | **React + Vite + MDX 전환** — 컴포넌트화, Framer Motion, Zod 스키마 |
| v1.1 | unit6 (단항식) 추가 — 동일 패턴으로 2번째 단원 구현 |

---

## 11. 다음 작업 후보

- [ ] 추가 단원 변환 (PPTX 슬라이드 27~ )
- [ ] 학습 진행 상태 localStorage 저장/복원
- [ ] 단원 목록 페이지 (홈)
- [ ] 오답 노트 / 복습 기능
- [ ] PWA 오프라인 지원
- [ ] 접근성(a11y) 개선

---

## 12. 파일별 역할 빠른 참조

| 파일 | 역할 | 새 단원 추가 시 수정 |
|------|------|---------------------|
| `App.tsx` | 라우팅 | ✅ Route 추가 |
| `pages/SlidePage.tsx` | 공통 셸 | ❌ |
| `pages/Unit*Page.tsx` | 단원별 진입점 | ✅ 새 파일 생성 |
| `content/slides/unit*/*.ts` | 데이터 (config, steps) | ✅ 새 폴더+파일 |
| `content/slides/unit*.mdx` | UI 콘텐츠 | ✅ 새 파일 |
| `schemas/step.ts` | Step 타입 | 새 카드유형 추가 시 |
| `components/cards/*` | 카드 컴포넌트 | 새 카드유형 추가 시 |
| `components/animations/*` | 애니메이션 | 새 효과 추가 시 |
| `hooks/*` | 상태·로직 | 거의 변경 없음 |
