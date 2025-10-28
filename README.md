# Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Test End-to-End

- Runs the end-to-end tests.``npx playwright test``
- Starts the interactive UI mode. ``npx playwright test --ui``
- Runs the tests only on Desktop Chrome. ``npx playwright test --project=chromium``
- Runs the tests in a specific file. ``npx playwright test example``
- Runs the tests in debug mode. ``npx playwright test --debug``
- Auto generate tests with Codegen. ``npx playwright codegen``
