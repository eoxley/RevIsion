/**
 * Auth Layout
 *
 * Minimal layout for authentication pages.
 * Uses neutral background for calm appearance.
 */
export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-neutral-50">
      {children}
    </div>
  );
}
