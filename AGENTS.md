## Coding Guidelines

Follow Karpathy-style pragmatic engineering guidelines:

- Keep code simple, explicit, and readable.
- Prefer boring, direct solutions over clever abstractions.
- Avoid unnecessary layers, frameworks, indirection, and premature generalization.
- Write code that is easy to inspect, debug, and delete.
- Keep functions and files focused.
- Make data flow obvious.
- Use clear names instead of comments where possible.
- Add comments only when they explain non-obvious reasoning.
- Prefer small, verifiable changes.
- Preserve existing project conventions unless there is a concrete reason to change them.
- Do not refactor unrelated code while implementing a requested change.

## Math Typography

- In user-visible mathematical content, always use the Unicode minus sign `−` (U+2212) for negative numbers and subtraction instead of the ASCII hyphen-minus `-`.
- Apply this rule to slide text, formulas, answer choices, SVG labels, accessibility labels, and feedback messages.
- Keep the ASCII hyphen-minus `-` where it is required by programming syntax, identifiers, file names, paths, command-line options, or ordinary non-mathematical hyphenation.

## Verification Preference

- Do not start or check the dev server, localhost URL, browser page, or HTTP response unless the user explicitly asks for it.
- When verification is useful, prefer code-level checks such as type checking, build, lint, or slide data validation.
- Browser-based interaction checks should only be performed when the user specifically requests browser or UI behavior verification.

## Slide Authoring Checklist

- When adding, removing, or reordering slide steps, update these together:
  - MDX `<Step id={...}>`
  - `config.ts` `totalSteps`
  - `steps-data.ts` `rawSteps` ids
  - `QuizArea stepId` and `steps[n].quiz` references
- If a custom component uses `useSlideProgress` instead of `QuizArea`, add that step id to `quizStepIds`.
- For custom gated steps, call `markSolved(stepId)` before `advanceStep()`, and guard auto-advance with `currentStep === stepId && currentStep < totalSteps - 1`.
- After slide changes, run `npm run validate:slides` and `npm run build`.
- Do not run browser checks unless the user explicitly requests UI verification.
