import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { Logo } from "@/components/brand/logo";

/**
 * Dashboard Layout
 *
 * Brand-compliant navigation with:
 * - revIsion logo (with distinct green I)
 * - Minimal navigation
 * - Neutral colors for inactive states
 * - revision-blue for active/primary states
 *
 * NO red, yellow, purple, or gamification colors.
 */

async function signOut() {
  "use server";
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect("/login");
}

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("first_name, last_name")
    .eq("id", user.id)
    .single();

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Header */}
      <header className="bg-white border-b border-neutral-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link href="/dashboard" className="flex-shrink-0">
              <Logo size="md" />
            </Link>

            {/* Navigation */}
            <nav className="hidden md:flex items-center gap-1">
              <NavLink href="/dashboard">Dashboard</NavLink>
              <NavLink href="/assessment">Assessment</NavLink>
              <NavLink href="/history">History</NavLink>
            </nav>

            {/* User Menu */}
            <div className="flex items-center gap-4">
              <span className="text-sm text-neutral-600 hidden sm:block">
                {profile?.first_name || user.email?.split("@")[0]}
              </span>
              <form action={signOut}>
                <button
                  type="submit"
                  className="text-sm text-neutral-500 hover:text-neutral-700 transition"
                >
                  Sign out
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className="md:hidden border-t border-neutral-100">
          <div className="flex justify-around py-2">
            <MobileNavLink href="/dashboard">Dashboard</MobileNavLink>
            <MobileNavLink href="/assessment">Assessment</MobileNavLink>
            <MobileNavLink href="/history">History</MobileNavLink>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {children}
      </main>
    </div>
  );
}

/**
 * Desktop navigation link
 */
function NavLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className="px-3 py-2 text-sm font-medium text-neutral-600 hover:text-revision-blue-600 hover:bg-revision-blue-50 rounded-lg transition"
    >
      {children}
    </Link>
  );
}

/**
 * Mobile navigation link
 */
function MobileNavLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className="px-4 py-2 text-xs font-medium text-neutral-600 hover:text-revision-blue-600 transition"
    >
      {children}
    </Link>
  );
}
