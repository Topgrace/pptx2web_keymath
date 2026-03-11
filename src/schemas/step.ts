import { z } from 'zod'

export const BlankTypeSchema = z.enum(['normal', 'exponent', 'square'])

export const ChoiceSchema = z.object({
  label: z.string(),
  value: z.string(),
  latex: z.string().optional(),
})

export const SingleQuizSchema = z.object({
  kind: z.literal('single').optional(),
  answer: z.string(),
  answerLatex: z.string().optional(),
  answerLatexFontSize: z.string().optional(),
  blankType: BlankTypeSchema.default('normal'),
  choices: z.array(ChoiceSchema),
  questionLabel: z.string().optional(),
})

export const MultiQuizItemSchema = z.object({
  id: z.string().min(1),
  answer: z.string(),
  answerLatex: z.string().optional(),
  answerLatexFontSize: z.string().optional(),
  blankType: BlankTypeSchema.default('normal'),
  choices: z.array(ChoiceSchema),
})

export const MultiQuizSchema = z.object({
  kind: z.literal('multi'),
  items: z.array(MultiQuizItemSchema).min(1),
  questionLabel: z.string().optional(),
})

export const QuizSchema = z.union([SingleQuizSchema, MultiQuizSchema])

export const StepTypeSchema = z.enum([
  'intro',
  'concept',
  'law',
  'definition',
  'note',
  'summary',
  'practice',
  'complete',
])

export const CardVariantSchema = z.enum(['default', 'white'])

export const StepSchema = z.object({
  id: z.number(),
  type: StepTypeSchema,
  cardVariant: CardVariantSchema.default('default'),
  quiz: QuizSchema.optional(),
})

export type BlankType = z.infer<typeof BlankTypeSchema>
export type Choice = z.infer<typeof ChoiceSchema>
export type SingleQuiz = z.infer<typeof SingleQuizSchema>
export type MultiQuizItem = z.infer<typeof MultiQuizItemSchema>
export type MultiQuiz = z.infer<typeof MultiQuizSchema>
export type Quiz = z.infer<typeof QuizSchema>
export type StepType = z.infer<typeof StepTypeSchema>
export type CardVariant = z.infer<typeof CardVariantSchema>
export type Step = z.infer<typeof StepSchema>
