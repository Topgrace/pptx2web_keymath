# Text Encoding Rules

## Root Cause
- Frequent mojibake came from mixed encodings on Windows shell edits.
- Non-ASCII text (Korean, multiplication sign) was read/written through CP949/ANSI and then saved as UTF-8 with broken bytes.
- Direct shell one-liner edits on non-ASCII literals increased the risk.

## Required Rules
1. Use UTF-8 only for all source files (`.ts`, `.tsx`, `.mdx`, `.md`, `.json`).
2. Do not use ANSI/CP949/UTF-16 for source edits.
3. When editing via PowerShell, always set encoding explicitly:
   - Read: `Get-Content -Encoding utf8`
   - Write: `Set-Content -Encoding utf8`
   - Prefer byte-safe write APIs when replacing larger blocks.
4. For special symbols used in code, prefer escapes over direct literals:
   - Example: use `{'\\u00D7'}` for multiplication sign.
5. Avoid shell-based whole-file rewrite for non-ASCII files when possible.
   - Prefer structured patch edits.
6. Before build/commit, run a mojibake check:
   - `rg -nP "\\x{D69E}|\\x{FFFD}" src`

## Applied Fix in This Incident
- Replaced broken multiplication glyph rendering with Unicode escape (`\\u00D7`) in Step 6 motion.
- Replaced broken Korean `aria-label` text with ASCII labels.
- Rewrote Step 6 quiz data values to ASCII-safe forms (`*`) and removed corrupted glyph values.
