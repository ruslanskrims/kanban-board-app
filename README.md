## Architecture

- Tech stack: Vue 3, Vite, TypeScript, Pinia (state), Element Plus (UI), Axios (HTTP).
- Project structure: feature-based under src/features/tasks with components, types, stores, and composables for clear separation of concerns.
- State & logic: Pinia stores in src/features/tasks/stores and composables in src/features/tasks/composables for reusable behavior.
- API: centralized Axios client at src/api/client.ts.
- UI: Element Plus components; task UI split into board/column/item/form for composability.
- Build & checks: scripts in package.json use vite, vue-tsc, ESLint and Prettier.

## Architecture decisions

- Feature-based layout: groups components, stores, types and composables by feature (src/features/tasks) to keep code modular and scalable.
- Pinia for app state: lightweight, type-safe store that integrates with Vue 3 and TypeScript.
- Composables for business logic: reusable hooks (src/features/tasks/composables) keep components thin and testable.
- Centralized API client: single Axios instance (src/api/client.ts) to manage base URL, interceptors and HTTP concerns.
- UI library: Element Plus chosen for ready-made UI primitives and consistent styling.
- Types-first: TypeScript + dedicated types (src/features/tasks/types) to reduce runtime bugs and improve DX.

## Project Setup

Install dependencies:

```sh
npm install
```

Dev server:

```sh
npm run dev
```

Build for production:

```sh
npm run build
```
