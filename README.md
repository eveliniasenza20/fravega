## Fravega Challenge

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/pages/api-reference/create-next-app).

## Getting Started

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

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/pages/building-your-application/routing/api-routes) instead of React pages.

This project uses [`next/font`](https://nextjs.org/docs/pages/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Core libraries

- [React.js](https://react.dev/reference/react)
- [Typescript](https://www.typescriptlang.org/docs/handbook/typescript-in-5-minutes.html)
- [Material UI](https://mui.com/material-ui/getting-started/)

## Steps to run project

### Pre-requisites

- Install [Node](https://nodejs.org/en/download/package-manager) - Version 18.18.0
- Install [npm](https://docs.npmjs.com/about-npm-versions)

## Naming conventions

- Components names should be named using upper-camel-case. e.g. `const BalanceDrawer = () => {...}`
- Hooks and functions should be named using camel-case. e.g. `const useHookExample = () => {...}`

## Structuring rules

- Pages components should be inside **pages** folder.
- Shared components should be inside **components** folder.

- When a component needs a child component, should be created in **components** folder inside the parent component following the rule below.

```
Folder structure example for shared and pages components:
   parent-component/
   |__ components/
   |   |__ child-component/
   |        |__ child-component.tsx
   |        |__ index.ts
   |__ parent-component.tsx
   |__ index.ts

```
