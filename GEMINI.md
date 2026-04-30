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

## Verification Preference

- Do not start or check the dev server, localhost URL, browser page, or HTTP response unless the user explicitly asks for it.
- When verification is useful, prefer code-level checks such as type checking, build, lint, or slide data validation.
- Browser-based interaction checks should only be performed when the user specifically requests browser or UI behavior verification.
