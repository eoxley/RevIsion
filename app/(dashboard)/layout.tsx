import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

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
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("first_name, last_name")
    .eq("id", user.id)
    .single();

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-white border-b border-slate-200">
        <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/dashboard" className="text-xl font-bold text-slate-900">
            RevIsion
          </Link>
          <nav className="flex items-center gap-6">
            <Link
              href="/dashboard"
              className="text-slate-600 hover:text-slate-900 transition"
            >
              Dashboard
            </Link>
            <Link
              href="/assessment"
              className="text-slate-600 hover:text-slate-900 transition"
            >
              Assessment
            </Link>
            <Link
              href="/history"
              className="text-slate-600 hover:text-slate-900 transition"
            >
              History
            </Link>
            <Link
              href="/my-profile"
              className="text-slate-600 hover:text-slate-900 transition"
            >
              My Profile
            </Link>
            <Link
              href="/revision-ai"
              className="text-blue-600 hover:text-blue-700 font-medium transition"
            >
              RevisionAI
            </Link>
            <div className="flex items-center gap-4">
              <span className="text-sm text-slate-600">
                {profile?.first_name || user.email}
              </span>
              <form action={signOut}>
                <button
                  type="submit"
                  className="text-sm text-slate-500 hover:text-slate-700"
                >
                  Sign out
                </button>
              </form>
            </div>
          </nav>
        </div>
      </header>

      {/* Main content */}
      <main className="max-w-6xl mx-auto px-4 py-8">{children}</main>
    </div>
  );
}
