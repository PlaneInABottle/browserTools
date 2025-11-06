# Frontend Development Guidelines

## Project Overview
This is a Next.js 16 project using React 19, TypeScript, and Tailwind CSS for building quick utility tools.

## Technology Stack
- **Framework**: Next.js 16 with App Router
- **React**: Version 19 with Server Components (RSC)
- **TypeScript**: Strict typing enabled
- **Styling**: Tailwind CSS v4
- **UI Components**: shadcn/ui (New York style)
- **Icons**: Lucide React
- **Themes**: next-themes for dark/light mode

## Architecture Principles

### Modular System
- Organize code by feature/domain, not by technical type
- Each tool should be self-contained in its own directory
- Shared utilities in `lib/`, shared components in `components/`
- Keep components small, focused, and reusable

### Component Structure
```
app/
  tools/[tool-name]/          # Feature-based routing
    page.tsx                  # Route component
    components/               # Tool-specific components
components/
  ui/                         # shadcn components
  layout/                     # Layout components
  tools/                      # Shared tool components
lib/
  [domain]/                   # Domain-specific utilities
  utils.ts                    # Shared utilities
```

## shadcn/ui Guidelines

### Installation
Always use the CLI to add new components:
```bash
npx shadcn@latest add [component-name]
```

### Configuration
- Style: `new-york`
- Base color: `neutral`
- CSS variables: Enabled
- Icon library: `lucide-react`

### Component Usage
- Import from `@/components/ui/[component]`
- Customize by editing component files directly
- Use composition over prop drilling
- Leverage Radix UI primitives for accessibility

### Available Components
Check installed components in `components/ui/` before creating custom ones.

## Best Practices

### React Server Components
- Default to Server Components unless interactivity is needed
- Use `"use client"` directive only when necessary (state, effects, browser APIs)
- Keep client boundaries small and deep in the tree
- Pass serializable props between server and client components

### Styling
- Use Tailwind utility classes
- Follow mobile-first responsive design
- Use CSS variables for theming (defined in `globals.css`)
- Leverage `cn()` utility for conditional classes
- Use `tailwind-merge` to avoid class conflicts

### TypeScript
- Define types for all props and function signatures
- Use interfaces for public APIs, types for internal structures
- Avoid `any` - use `unknown` if type is truly unknown
- Leverage TypeScript's type inference where possible

### Performance
- Use dynamic imports for heavy components
- Implement loading states and Suspense boundaries
- Optimize images with Next.js Image component
- Lazy load tool components that aren't immediately visible
- Use Web Workers for CPU-intensive operations (see `lib/workers/`)

### Accessibility
- Use semantic HTML elements
- Ensure keyboard navigation works
- Provide ARIA labels where needed
- shadcn components are accessible by default - maintain this
- Test with screen readers when possible

### State Management
- Use React hooks (useState, useReducer) for local state
- Lift state only when necessary
- Consider URL state for shareable tool configurations
- Avoid global state unless truly global

### File Naming
- Components: PascalCase (e.g., `ToolCard.tsx`)
- Utilities: camelCase (e.g., `formatBytes.ts`)
- Pages/Routes: lowercase (e.g., `page.tsx`, `layout.tsx`)
- Hooks: camelCase with `use` prefix (e.g., `useMediaQuery.ts`)

### Code Organization
- One component per file
- Export component as default for page components
- Export as named for reusable components
- Group related utilities in directories
- Keep files under 300 lines - split if larger

### Testing
- Write tests for utility functions
- Test complex component logic
- Ensure tools work across browsers
- Manual testing for UI/UX
- **Use the `/exampleFiles` directory for testing tool logic and functionality**
  - Place test audio, image, PDF, or other files in this folder
  - This folder is gitignored to prevent committing large test files
  - Use these files to validate tool functionality during development
  - Test various file sizes, formats, and edge cases

### Error Handling
- Use Error Boundaries for component errors
- Provide helpful error messages to users
- Log errors appropriately
- Graceful degradation when features fail

## Common Patterns

### Tool Page Structure
```tsx
export default function ToolPage() {
  return (
    <div className="container mx-auto p-4">
      <ToolHeader />
      <ToolContent />
      <ToolFooter />
    </div>
  );
}
```

### Client Component with State
```tsx
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";

export function InteractiveTool() {
  const [value, setValue] = useState("");
  
  return (
    <div>
      <Input value={value} onChange={(e) => setValue(e.target.value)} />
      <Button onClick={handleAction}>Process</Button>
    </div>
  );
}
```

### Utility Function
```tsx
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
```

## Path Aliases
- `@/components` → `components/`
- `@/lib` → `lib/`
- `@/ui` → `components/ui/`
- `@/hooks` → `hooks/`

## Theme System
- Dark/light mode toggle available via `ThemeToggle` component
- CSS variables defined in `globals.css`
- Use theme-aware colors from Tailwind config
- Test components in both themes

## Development Workflow
1. Plan component structure before coding
2. Start with Server Components, add "use client" when needed
3. Use shadcn/ui components as building blocks
4. Build mobile-first, enhance for desktop
5. Test dark/light themes
6. Keep components modular and reusable
7. Document complex logic with comments
8. Run linter before committing

## Resources
- [Next.js Docs](https://nextjs.org/docs)
- [shadcn/ui](https://ui.shadcn.com)
- [Tailwind CSS](https://tailwindcss.com)
- [Radix UI](https://www.radix-ui.com)
