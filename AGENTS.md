<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# Vengeance UI Component Integration Rules

Whenever a Vengeance UI component is pasted or introduced, always adhere to the following workflow:
1. **Official Installation**: Install it using the official method.
2. **Component Pathing**: Keep the original unmodified component under `components/ui/vengeance/`.
3. **VSC Wrapper**: Create or update a VSC wrapper component referencing the original.
4. **VSC Design Language**: Adapt the colors, typography, spacing, and motion configurations to the VSC design language tokens and values.
5. **Quality & Standard Compliance**: Preserve accessibility (ARIA, semantic attributes) and responsiveness across breakpoints.
6. **Isolation**: Do not modify unrelated files or sections of the project.
7. **Build Success**: Verify that `npm run build` succeeds with zero TypeScript compile errors or ESLint warnings.

# Documentation authority

- [ARCHITECTURE.md](ARCHITECTURE.md) — technical architecture (stack, routes, data model, component layers)
- [PRODUCT.md](PRODUCT.md) — product and business facts
- [DESIGN_PRINCIPLES.md](DESIGN_PRINCIPLES.md) — visual authority
- [DEVELOPMENT.md](DEVELOPMENT.md) — dev workflow

`docs/ACTIONS.md` is a task backlog, not an automatic source of current work. Do not treat it as a live queue unless the user points you to it. Take task intent from the user's explicit request in the conversation.

Run `npm run check` (typecheck + lint + test + build) before reporting any code change as complete.

