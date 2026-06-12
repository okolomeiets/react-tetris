# React Tetris

A browser-based Tetris game built with **React**, **TypeScript**, and **Vite**.

The project was created as a learning pet project to practice React state management, game logic, keyboard controls, performance optimization, and component-based UI architecture.

## Demo

Live demo: https://react-tetris-hazel.vercel.app/

## Screenshot

![React Tetris screenshot](./public/screenshot.png)

## Features

- Classic Tetris-style gameplay
- Falling tetromino shapes
- Keyboard controls
- On-screen control buttons
- Shape rotation
- Collision detection
- Line clearing
- Score tracking
- Next shape preview
- Pause and resume functionality
- Game over state
- New game restart
- Responsive game layout
- Futuristic sci-fi inspired UI

## Controls

| Key         | Action           |
| ----------- | ---------------- |
| Arrow Left  | Move shape left  |
| Arrow Right | Move shape right |
| Arrow Down  | Move shape down  |
| Arrow Up    | Rotate shape     |

The game also includes on-screen buttons for movement and rotation.

## Tech Stack

- React
- TypeScript
- Vite
- CSS
- React Hooks
- `useReducer`
- `useMemo`
- `useCallback`
- `React.memo`

## Project Structure

```txt
src/
├── components/
│   ├── arrows/
│   ├── board/
│   ├── cell/
│   ├── field/
│   ├── footer/
│   ├── header/
│   ├── next-shape/
│   ├── popup/
│   └── row/
├── constants/
├── reducers/
│   └── gameReducer.ts
├── utils/
│   └── gameUtils.ts
└── App.tsx
```

## Game Logic

The game state is managed with `useReducer`.

The reducer handles:

- automatic falling with `TICK`
- moving left and right
- moving down
- rotating shapes
- pausing and resuming the game
- starting a new game
- fixing the current shape on the board
- clearing completed rows
- updating the score
- detecting game over

Collision detection prevents shapes from moving outside the board or overlapping with already placed blocks.

## Performance Notes

The project uses several React optimization techniques:

- `useMemo` for merging the current shape with the board
- `useCallback` for stable event handlers
- `React.memo` for presentational components
- reducer logic returns the same state object when no movement is possible, avoiding unnecessary state updates

The project was also checked with Chrome DevTools Performance tools to analyze rendering, scripting, and painting behavior.

## Getting Started

Install dependencies:

```bash
npm install
```

Run the development server:

```bash
npm run dev
```

Build the project:

```bash
npm run build
```

Preview the production build:

```bash
npm run preview
```

## What I Practiced

While building this project, I practiced:

- managing complex state with `useReducer`
- separating game logic from UI components
- working with two-dimensional arrays
- implementing collision detection
- handling keyboard events
- optimizing React rendering
- structuring a React + TypeScript project
- deploying a frontend project to Vercel

## Author

Created by Olha Kolomeiets.
