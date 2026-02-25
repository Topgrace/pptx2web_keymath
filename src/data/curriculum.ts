export type CurriculumStatus = 'locked' | 'unlocked' | 'completed'
export type SemesterId = '1-1' | '1-2' | '2-1' | '2-2' | '3-1' | '3-2'

export interface UnitNode {
  id: string
  title: string
  description?: string
  status: CurriculumStatus
  path?: string // if unlocked and has a page
}

export interface ChapterNode {
  id: string
  title: string
  units: UnitNode[]
}

export interface SemesterData {
  id: SemesterId
  title: string
  chapters: ChapterNode[]
}

export const semesters: SemesterData[] = [
  {
    id: '1-1',
    title: '중학교 1학년 1학기',
    chapters: [
      {
        id: '1-1-ch1',
        title: 'I. 소인수분해',
        units: [
          { id: '1-1-u1', title: '1. 소수와 합성수', status: 'locked' },
          { id: '1-1-u2', title: '2. 거듭제곱', status: 'locked' },
          { id: '1-1-u3', title: '3. 소인수분해', status: 'locked' },
          { id: '1-1-u4', title: '4. 제곱인 수 만들기', status: 'locked' },
          { id: '1-1-u5', title: '5. 약수와 약수의 개수 구하기', status: 'locked' },
          { id: '1-1-u6', title: '6. 공약수와 최대공약수', status: 'locked' },
          { id: '1-1-u7', title: '7. 공배수와 최소공배수', status: 'locked' },
          { id: '1-1-u8', title: '8. 최대공약수와 최소공배수의 관계', status: 'locked' }
        ]
      },
      {
        id: '1-1-ch2',
        title: 'II. 정수와 유리수',
        units: [
          { id: '1-1-u9', title: '9. 정수와 유리수', status: 'locked' },
          { id: '1-1-u10', title: '10. 수직선 위에 수 나타내기', status: 'locked' },
          { id: '1-1-u11', title: '11. 절댓값과 크기 비교', status: 'locked' },
          { id: '1-1-u12', title: '12. 덧셈', status: 'locked' },
          { id: '1-1-u13', title: '13. 뺄셈', status: 'locked' },
          { id: '1-1-u14', title: '14. 덧셈과 뺄셈의 혼합 계산', status: 'locked' },
          { id: '1-1-u15', title: '15. 곱셈', status: 'locked' },
          { id: '1-1-u16', title: '16. 곱셈에서 사용되는 법칙', status: 'locked' },
          { id: '1-1-u17', title: '17. 세 수 이상의 곱셈', status: 'locked' },
          { id: '1-1-u18', title: '18. 나눗셈', status: 'locked' },
          { id: '1-1-u19', title: '19. 유리수의 혼합 계산', status: 'locked' }
        ]
      },
      {
        id: '1-1-ch3',
        title: 'III. 문자와 식',
        units: [
          { id: '1-1-u20', title: '20. 문자의 사용', status: 'locked' },
          { id: '1-1-u21', title: '21. 곱셈 기호와 나눗셈 기호의 생략', status: 'locked' },
          { id: '1-1-u22', title: '22. 식의 값', status: 'locked' },
          { id: '1-1-u23', title: '23. 단항식, 다항식, 일차식', status: 'locked' },
          { id: '1-1-u24', title: '24. 단항식과 수의 곱셈, 나눗셈', status: 'locked' },
          { id: '1-1-u25', title: '25. 일차식과 수의 곱셈, 나눗셈', status: 'locked' },
          { id: '1-1-u26', title: '26. 동류항의 계산', status: 'locked' },
          { id: '1-1-u27', title: '27. 식의 계산 응용', status: 'locked' }
        ]
      },
      {
        id: '1-1-ch4',
        title: 'IV. 일차방정식',
        units: [
          { id: '1-1-u28', title: '28. 등식, 방정식, 항등식', status: 'locked' },
          { id: '1-1-u29', title: '29. 등식의 성질', status: 'locked' },
          { id: '1-1-u30', title: '30. 이항과 일차방정식', status: 'locked' },
          { id: '1-1-u31', title: '31. 계수가 복잡한 일차방정식의 풀이', status: 'locked' },
          { id: '1-1-u32', title: '32. 일차방정식의 활용 (1)', status: 'locked' },
          { id: '1-1-u33', title: '33. 일차방정식의 활용 (2)', status: 'locked' }
        ]
      },
      {
        id: '1-1-ch5',
        title: 'V. 그래프와 비례 관계',
        units: [
          { id: '1-1-u34', title: '34. 좌표와 순서쌍', status: 'locked' },
          { id: '1-1-u35', title: '35. 사분면', status: 'locked' },
          { id: '1-1-u36', title: '36. 그래프', status: 'locked' },
          { id: '1-1-u37', title: '37. 정비례', status: 'locked' },
          { id: '1-1-u38', title: '38. 반비례', status: 'locked' }
        ]
      }
    ]
  },
  {
    id: '1-2',
    title: '중학교 1학년 2학기',
    chapters: [
      {
        id: '1-2-ch1',
        title: '기하 (준비중)',
        units: [{ id: '1-2-u1', title: '기본 도형', status: 'locked' }]
      }
    ]
  },
  {
    id: '2-1',
    title: '중학교 2학년 1학기',
    chapters: [
      {
        id: '2-1-ch1',
        title: 'I. 유리수와 순환소수',
        units: [
          { id: '2-1-u1', title: '1. 소수의 분류', status: 'locked' },
          { id: '2-1-u2', title: '2. 유한소수로 나타낼 수 있는 분수', status: 'locked' },
          { id: '2-1-u3', title: '3. 순환소수를 분수로 나타내기 (1)', status: 'locked' },
          { id: '2-1-u4', title: '4. 순환소수를 분수로 나타내기 (2)', status: 'locked' }
        ]
      },
      {
        id: '2-1-ch2',
        title: 'II. 식의 계산',
        units: [
          { id: '2-1-u5', title: '5. 지수법칙', status: 'unlocked', path: '/unit5' },
          { id: '2-1-u6', title: '6. 단항식의 곱셈과 나눗셈', status: 'unlocked', path: '/unit6' },
          { id: '2-1-u7', title: '7. 다항식의 덧셈과 뺄셈', status: 'unlocked', path: '/unit7' },
          { id: '2-1-u8', title: '8. 분수 모양의 식 계산 (1)', status: 'unlocked', path: '/unit8' },
          { id: '2-1-u9', title: '9. (단항식) × (다항식)', status: 'unlocked', path: '/unit9' },
          { id: '2-1-u10', title: '10. (다항식) ÷ (단항식)', status: 'unlocked', path: '/unit10' },
          { id: '2-1-u11', title: '11. 분수 모양의 식 계산 (2)', status: 'unlocked', path: '/unit11' }
        ]
      },
      {
        id: '2-1-ch3',
        title: 'III. 일차부등식',
        units: [
          { id: '2-1-u12', title: '12. 부등식', status: 'locked' },
          { id: '2-1-u13', title: '13. 부등식의 성질', status: 'locked' },
          { id: '2-1-u14', title: '14. 일차부등식의 풀이', status: 'locked' },
          { id: '2-1-u15', title: '15. 여러 가지 일차부등식의 풀이', status: 'locked' },
          { id: '2-1-u16', title: '16. 일차부등식의 활용', status: 'locked' }
        ]
      },
      {
        id: '2-1-ch4',
        title: 'IV. 연립일차방정식',
        units: [
          { id: '2-1-u17', title: '17. 미지수가 2개인 연립일차방정식', status: 'locked' },
          { id: '2-1-u18', title: '18. 연립방정식의 풀이 (1)', status: 'locked' },
          { id: '2-1-u19', title: '19. 연립방정식의 풀이 (2)', status: 'locked' },
          { id: '2-1-u20', title: '20. 여러 가지 연립방정식의 풀이', status: 'locked' },
          { id: '2-1-u21', title: '21. 해가 특수한 연립방정식', status: 'locked' },
          { id: '2-1-u22', title: '22. 연립방정식의 활용 - 수', status: 'locked' },
          { id: '2-1-u23', title: '23. 연립방정식의 활용 - 비율', status: 'locked' },
          { id: '2-1-u24', title: '24. 연립방정식의 활용 - 속력, 농도', status: 'locked' }
        ]
      },
      {
        id: '2-1-ch5',
        title: 'V. 일차함수',
        units: [
          { id: '2-1-u25', title: '25. 함수의 뜻', status: 'locked' },
          { id: '2-1-u26', title: '26. 함숫값', status: 'locked' },
          { id: '2-1-u27', title: '27. 일차함수', status: 'locked' },
          { id: '2-1-u28', title: '28. 일차함수의 그래프', status: 'locked' },
          { id: '2-1-u29', title: '29. 기울기', status: 'locked' },
          { id: '2-1-u30', title: '30. x절편과 y절편', status: 'locked' },
          { id: '2-1-u31', title: '31. 일차함수의 그래프 그리기', status: 'locked' },
          { id: '2-1-u32', title: '32. 일차함수의 그래프의 성질', status: 'locked' },
          { id: '2-1-u33', title: '33. 그래프의 평행과 일치', status: 'locked' },
          { id: '2-1-u34', title: '34. 일차함수 식 구하기', status: 'locked' },
          { id: '2-1-u35', title: '35. 일차함수의 활용', status: 'locked' },
          { id: '2-1-u36', title: '36. 일차함수와 일차방정식', status: 'locked' },
          { id: '2-1-u37', title: '37. x=p, y=q의 그래프', status: 'locked' },
          { id: '2-1-u38', title: '38. 일차함수의 그래프와 연립방정식', status: 'locked' }
        ]
      }
    ]
  },
  {
    id: '2-2',
    title: '중학교 2학년 2학기',
    chapters: [
      {
        id: '2-2-ch1',
        title: '도형의 성질 (준비중)',
        units: [{ id: '2-2-u1', title: '삼각형의 성질', status: 'locked' }]
      }
    ]
  },
  {
    id: '3-1',
    title: '중학교 3학년 1학기',
    chapters: [
      {
        id: '3-1-ch1',
        title: '실수와 그 계산 (준비중)',
        units: [{ id: '3-1-u1', title: '제곱근과 실수', status: 'locked' }]
      }
    ]
  },
  {
    id: '3-2',
    title: '중학교 3학년 2학기',
    chapters: [
      {
        id: '3-2-ch1',
        title: '삼각비 (준비중)',
        units: [{ id: '3-2-u1', title: '삼각비', status: 'locked' }]
      }
    ]
  }
]
