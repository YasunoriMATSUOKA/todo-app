# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Essential Commands

### Development

```bash
npm run dev        # Start Vite dev server at http://localhost:5173
npm run build      # TypeScript check + production build
npm run preview    # Preview production build
```

### Code Quality

```bash
npm run lint       # Run ESLint
npm run format     # Format code with Prettier
npm run format:check  # Check formatting without fixing
```

### Component Development

```bash
npm run storybook  # Start Storybook dev server
npm run build-storybook  # Build static Storybook
npm run chromatic  # Run visual regression tests
```

### Environment Variables

```bash
npm run encode:env  # Encode .env file to base64
npm run decode:env  # Decode base64 to .env file
```

## Architecture Overview

This is a React + TypeScript todo application using Vite as the build tool. The codebase follows a clean architecture pattern with clear separation of concerns.

### Key Architectural Decisions

1. **Feature-Based Architecture**: Code is organized by features under `src/lib/feature/`

   - Each feature (e.g., `todo`) contains its own types, services, hooks, and infrastructure
   - Business logic is separated from UI components

2. **Clean Architecture Layers**:

   - **Types** (`todo.types.ts`): Domain entities and interfaces
   - **Service** (`todo.service.ts`): Business logic and use cases
   - **Infrastructure** (`todo.infrastructure.service.ts`): Data persistence layer
   - **Hooks** (`todo.hooks.ts`): React-specific integration layer
   - **Components**: UI components consume hooks, not services directly

3. **UI Component System**:

   - Uses shadcn/ui components (Radix UI based) in `src/components/ui/`
   - Tailwind CSS for styling with custom theme configuration
   - Components are developed in isolation using Storybook

4. **Routing Structure**:

   - React Router v6 with routes defined in `src/AppRoutes.tsx`
   - Base path `/todo-app/` configured for GitHub Pages deployment
   - Pages are in `src/pages/` directory

5. **State Management**:
   - React hooks for local state
   - Custom hooks abstract business logic from components
   - localStorage for persistence (via infrastructure service)

### Important Conventions

- **Path Aliases**: Use `@/*` for imports from `src/*` (e.g., `@/components/ui/button`)
- **Component Stories**: When adding new UI components, create corresponding `.stories.tsx` files
- **Type Safety**: TypeScript strict mode is enabled - ensure all code is properly typed
- **Formatting**: Prettier automatically organizes imports and sorts Tailwind classes
- **Base Path**: All routes and assets must account for `/todo-app/` base path in production

### Development Workflow

1. Run `npm run dev` to start the development server
2. Make changes to components or features
3. Use Storybook (`npm run storybook`) for isolated component development
4. Run `npm run lint` and `npm run format` before committing
5. Build with `npm run build` to ensure TypeScript types are correct

### Testing Notes

While test files exist (e.g., `sort.test.ts`), no test runner is currently configured in the project. Consider adding Vitest or Jest if implementing tests.
