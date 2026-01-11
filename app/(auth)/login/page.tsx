"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Logo } from "@/components/brand/logo";

/**
 * Login Page - Parent/Guardian Access
 *
 * Brand-compliant login with:
 * - Centered logo
 * - Minimal layout with calm blue/green accents
 * - Real Supabase authentication
 * - Secure redirect on success
 *
 * Auth Flow:
 * 1. Parent enters their email + password
 * 2. Supabase auth.signInWithPassword validates credentials
 * 3. On success: redirect to /dashboard to view child's progress
 * 4. On error: display error in neutral tones (no red)
 *
 * Account Structure:
 * - Parent's email is the account login
 * - Child's profile is linked to parent's auth account
 */
export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const supabase = createClient();

    const { error: authError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (authError) {
      setError(authError.message);
      setLoading(false);
      return;
    }

    // Successful login - redirect to dashboard
    router.push("/dashboard");
    router.refresh();
  };

  return (
    <div className="min-h-screen bg-neutral-50 flex flex-col">
      {/* Main content - centered */}
      <main className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-sm space-y-8">
          {/* Logo - centered */}
          <div className="flex flex-col items-center space-y-2">
            <Logo size="xl" />
            <p className="text-sm text-neutral-500">
              Smart GCSE revision for your child
            </p>
          </div>

          {/* Login form */}
          <div className="bg-white rounded-2xl border border-neutral-200 p-8 shadow-sm">
            <div className="space-y-6">
              <div className="text-center">
                <h1 className="text-xl font-semibold text-neutral-900">
                  Welcome back
                </h1>
                <p className="mt-1 text-sm text-neutral-500">
                  Sign in to manage your child&apos;s revision
                </p>
              </div>

              <form onSubmit={handleLogin} className="space-y-4">
                {/* Error message - neutral styling, no red */}
                {error && (
                  <div className="bg-neutral-100 border border-neutral-200 text-neutral-700 px-4 py-3 rounded-lg text-sm">
                    {error}
                  </div>
                )}

                <Input
                  id="email"
                  label="Your email"
                  type="email"
                  placeholder="parent@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  autoComplete="email"
                />

                <Input
                  id="password"
                  label="Password"
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  autoComplete="current-password"
                />

                <Button
                  type="submit"
                  className="w-full"
                  size="lg"
                  disabled={loading}
                >
                  {loading ? "Signing in..." : "Sign in"}
                </Button>
              </form>

              <p className="text-center text-sm text-neutral-600">
                Don&apos;t have an account?{" "}
                <Link
                  href="/register"
                  className="text-azure-600 hover:text-azure-700 font-medium"
                >
                  Sign up
                </Link>
              </p>
            </div>
          </div>

          {/* Footer text */}
          <p className="text-center text-xs text-neutral-400">
            Helping parents support their child&apos;s GCSE success
          </p>
        </div>
      </main>
    </div>
  );
}
