# CLAUDE.md

Project rules for Claude when working in this repo.

## Rules

1. **Keep implementation simple.** Prefer the smallest change that solves the problem. No premature abstractions.
2. **API requests use React Query + Axios, in a `hooks/` folder.** All server state goes through `@tanstack/react-query` hooks that call the shared `axiosInstance`. No raw `useEffect` + `axios` in components.
3. **Think before you code.** Read the relevant files, confirm the data shape, and outline the approach before writing.
4. **Do not over-engineer.** No extra layers, wrappers, or config beyond what the task needs.
5. **Think OOP.** Model around clear objects/entities and cohesive responsibilities. Group related logic; avoid scattered free functions when a single owner makes more sense.
6. **Break solutions into `utils/`, `components/`, `hooks/`, `ui/`.** If a piece of logic, view, data-fetch, or presentational primitive can stand on its own, extract it into the matching folder instead of inlining everything in one file.
7. **Use toast notifications for user feedback.** Success, error, and important state changes surface via the toast system — not `alert()`, not silent failures, not ad-hoc inline banners.

## Conventions

- **HTTP client:** `src/api/axiosInstance.ts` (already configured with auth token + `withCredentials`).
- **Hooks location:** `src/hooks/` — one file per resource (e.g. `useAdminStats.ts`).
- **Hook shape:** export a `useXxx()` that wraps `useQuery` / `useMutation` and returns the React Query result directly. Keep types co-located or imported from a shared types file.
- **Components:** consume hooks, render UI. No data-fetching logic inside components.
