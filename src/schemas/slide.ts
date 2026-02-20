import { z } from 'zod'

export const SlideConfigSchema = z.object({
  slug: z.string(),
  title: z.string(),
  totalSteps: z.number().positive(),
  themeColors: z.object({
    background: z.string().default('#F0D8C5'),
    cardDefault: z.string().default('#F8F0E4'),
    primary: z.string().default('#7A4C14'),
    accent: z.string().default('#D8A883'),
    red: z.string().default('#D85A3A'),
    green: z.string().default('#2E7D32'),
    gray: z.string().default('#646466'),
    formula: z.string().default('#00AAEE'),
  }).default({
    background: '#F0D8C5',
    cardDefault: '#F8F0E4',
    primary: '#7A4C14',
    accent: '#D8A883',
    red: '#D85A3A',
    green: '#2E7D32',
    gray: '#646466',
    formula: '#00AAEE',
  }),
})

export type SlideConfig = z.infer<typeof SlideConfigSchema>
