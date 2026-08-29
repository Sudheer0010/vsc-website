import "./lab.css";

/**
 * Scopes lab-only CSS to this route segment. The real Navbar/Footer still
 * come from the root layout — the lab intentionally sits inside the real
 * site chrome so brand identity stays visible around each experiment.
 */
export default function DesignLabLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
