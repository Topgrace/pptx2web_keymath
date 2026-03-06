import { readdir } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'

import { SlideConfigSchema } from '../src/schemas/slide.ts'
import { StepSchema } from '../src/schemas/step.ts'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const slidesRoot = path.resolve(__dirname, '../src/content/slides')

async function getSlideDirectories(rootDir) {
  const entries = await readdir(rootDir, { withFileTypes: true })

  return entries
    .filter((entry) => entry.isDirectory())
    .map((entry) => path.join(rootDir, entry.name))
}

function getModuleUrl(modulePath) {
  return `${pathToFileURL(modulePath).href}?t=${Date.now()}`
}

async function validateSlideDirectory(slideDir) {
  const configPath = path.join(slideDir, 'config.ts')
  const stepsPath = path.join(slideDir, 'steps-data.ts')

  const [{ slideConfig }, { steps, quizStepIds }] = await Promise.all([
    import(getModuleUrl(configPath)),
    import(getModuleUrl(stepsPath)),
  ])

  SlideConfigSchema.parse(slideConfig)

  if (!(quizStepIds instanceof Set)) {
    throw new Error(`quizStepIds must be a Set in ${path.basename(slideDir)}`)
  }

  const stepIds = new Set()

  for (const step of steps) {
    StepSchema.parse(step)
    stepIds.add(step.id)

    if (step.quiz && !quizStepIds.has(step.id)) {
      throw new Error(`quizStepIds missing step ${step.id} in ${path.basename(slideDir)}`)
    }
  }

  for (const stepId of quizStepIds) {
    if (!stepIds.has(stepId)) {
      throw new Error(`quizStepIds references unknown step ${stepId} in ${path.basename(slideDir)}`)
    }
  }
}

async function main() {
  const slideDirs = await getSlideDirectories(slidesRoot)
  const failures = []

  for (const slideDir of slideDirs) {
    try {
      await validateSlideDirectory(slideDir)
    } catch (error) {
      failures.push({
        slide: path.basename(slideDir),
        error: error instanceof Error ? error.message : String(error),
      })
    }
  }

  if (failures.length > 0) {
    for (const failure of failures) {
      console.error(`[validate:slides] ${failure.slide}: ${failure.error}`)
    }
    process.exitCode = 1
    return
  }

  console.log(`[validate:slides] validated ${slideDirs.length} slide data modules`)
}

await main()
