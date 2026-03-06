import { mkdir, readdir, copyFile, readFile, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const rootDir = path.resolve(__dirname, '..')
const sourcePath = path.join(rootDir, 'node_modules', 'katex', 'dist', 'katex.min.css')
const outputPath = path.join(rootDir, 'src', 'styles', 'generated-katex.css')

const sourceCss = await readFile(sourcePath, 'utf8')

let replacementCount = 0
const generatedCss = sourceCss.replace(
  /,url\([^)]+\.woff\) format\("woff"\),url\([^)]+\.ttf\) format\("truetype"\)/g,
  () => {
    replacementCount += 1
    return ''
  },
)

if (replacementCount === 0) {
  throw new Error('No KaTeX fallback font sources were removed')
}

await mkdir(path.dirname(outputPath), { recursive: true })
await writeFile(outputPath, generatedCss, 'utf8')

console.log(`[prepare:katex-css] wrote ${outputPath} with ${replacementCount} woff2-only font rules`)

// Copy only .woff2 KaTeX font files so @font-face url(fonts/...) resolves correctly
const fontsSrc = path.join(rootDir, 'node_modules', 'katex', 'dist', 'fonts')
const fontsDest = path.join(rootDir, 'src', 'styles', 'fonts')
await mkdir(fontsDest, { recursive: true })

const allFontFiles = await readdir(fontsSrc)
const woff2Files = allFontFiles.filter(f => f.endsWith('.woff2'))
await Promise.all(
  woff2Files.map(f => copyFile(path.join(fontsSrc, f), path.join(fontsDest, f)))
)

console.log(`[prepare:katex-css] copied ${woff2Files.length} woff2 fonts → ${fontsDest}`)
