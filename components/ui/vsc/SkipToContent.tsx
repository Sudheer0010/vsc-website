"use client";

/**
 * Every page composes its own Navbar + main + Footer independently (no
 * shared layout wraps them), so there's no single `id` to anchor a plain
 * `href="#main-content"` skip link to without editing every page file.
 * Finding the `<main>` landmark at click time avoids that — one component,
 * zero per-page changes.
 */
export function SkipToContent() {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const main = document.querySelector("main");
    if (!main) return;
    if (!main.hasAttribute("tabindex")) main.setAttribute("tabindex", "-1");
    main.focus();
    main.scrollIntoView();
  };

  return (
    <a
      href="#main-content"
      onClick={handleClick}
      className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[2000] focus:rounded-md focus:bg-ink focus:px-4 focus:py-2 focus:font-mono focus:text-[13px] focus:font-semibold focus:text-canvas focus:shadow-lift-2"
    >
      Skip to content
    </a>
  );
}
