# Dice Game (Test Task)

Тестове завдання на `TypeScript + Next.js (App Router) + Material UI`.

## Demo Features

- Гра Dice з результатом від `1` до `100`.
- Вибір умови: `Under` / `Over`.
- Вибір порогу через слайдер (діапазон `0..100`).
- Кнопка `PLAY` запускає кидок і показує результат.
- Верхній toast зі статусом (`You won` / `You lost`).
- Історія ігор у таблиці (`Time`, `Guess`, `Result`).
- Ліміт історії: `10` записів.
- Збереження стану в `localStorage` + відновлення після refresh.

## Tech Stack

- `next` (App Router)
- `react` / `react-dom`
- `typescript`
- `@mui/material`, `@mui/icons-material`, `@emotion/*`
- `@mui/material-nextjs` (коректна SSR інтеграція стилів)
- `eslint` + `commitlint` (Conventional Commits)

## Project Structure (FSD-style)

```text
src/
  shared/
  entities/
    game/
      model/
      ui/
  features/
    play-dice/
      model/
      ui/
  widgets/
    dice-game/
      ui/
  page-layer/
    home/
      ui/
app/
  layout.tsx
  page.tsx
```

## Architecture Note

- `app/page.tsx` є thin entrypoint і лише рендерить `HomePage`.
- Основний orchestration зосереджений у `widgets/dice-game` (`DiceGameWidget`), який композиційно збирає форму, toast і історію.
- Бізнес-логіка винесена у `entities/game/model/game-logic.ts` (pure functions), а стан гри та side effects (`localStorage`) ізольовано у `features/play-dice/model/use-dice-game.ts`.
- SSR-safe підхід: початковий UI рендериться зі стабільних дефолтів, а відновлення persisted state відбувається після mount, щоб уникати hydration mismatch.
- UI-стилі централізовано через `src/shared/ui/tokens.ts` (кольори, spacing, розміри, typography, motion, z-index), щоб мінімізувати hardcoded `sx` значення.

## Run Locally

```bash
pnpm install
pnpm dev
```

Відкрити: [http://localhost:3000](http://localhost:3000)

## Scripts

- `pnpm dev` — запуск у режимі розробки
- `pnpm build` — production build
- `pnpm start` — запуск production сервера
- `pnpm lint` — перевірка ESLint
- `pnpm test` — запуск тестів (Vitest, run mode)
- `pnpm test:watch` — запуск тестів у watch mode
- `pnpm lint:commit` — перевірка останнього commit message

## Tests

- Стек: `Vitest` + `Testing Library` + `jsdom`.
- Поточне мінімальне покриття включає 3 ключові тести:
  - `src/entities/game/model/game-logic.test.ts` — unit для `checkWin()` (включно з edge case `equal`);
  - `src/features/play-dice/model/use-dice-game.test.tsx` — integration для ліміту history (`max 10`);
  - `src/widgets/dice-game/ui/dice-game-widget.test.tsx` — integration UI-флоу (`PLAY` -> toast + history update).

## Code Style / Commit Rules

- Компоненти і хуки — через `function declaration`.
- Форматування узгоджене через `.editorconfig` + ESLint.
- Коміти — за Conventional Commits (`commitlint` + git hook `commit-msg`).
