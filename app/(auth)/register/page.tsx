"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Logo } from "@/components/brand/logo";

/**
 * Register Page
 *
 * Brand-compliant registration with:
 * - Centered logo
 * - Minimal layout with calm blue/green accents
 * - Real Supabase authentication
 *
 * Auth Flow:
 * 1. User enters name, email, password
 * 2. Supabase auth.signUp creates auth user with metadata
 * 3. Database trigger auto-creates profile with first_name, last_name
 * 4. On success: redirect to /dashboard
 */
export default function RegisterPage() {
  const router = useRouter();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      setLoading(false);
      return;
    }

    const supabase = createClient();

    const { error: authError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          first_name: firstName,
          last_name: lastName,
        },
      },
    });

    if (authError) {
      setError(authError.message);
      setLoading(false);
      return;
    }

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
              Your personal GCSE revision coach
            </p>
          </div>

          {/* Registration form */}
          <div className="bg-white rounded-2xl border border-neutral-200 p-8 shadow-sm">
            <div className="space-y-6">
              <div className="text-center">
                <h1 className="text-xl font-semibold text-neutral-900">
                  Create an account
                </h1>
                <p className="mt-1 text-sm text-neutral-500">
                  Start discovering your learning style
                </p>
              </div>

              <form onSubmit={handleRegister} className="space-y-4">
                {/* Error message - neutral styling, no red */}
                {error && (
                  <div className="bg-neutral-100 border border-neutral-200 text-neutral-700 px-4 py-3 rounded-lg text-sm">
                    {error}
                  </div>
                )}

                <div className="grid grid-cols-2 gap-3">
                  <Input
                    id="firstName"
                    label="First name"
                    placeholder="John"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    required
                    autoComplete="given-name"
                  />
                  <Input
                    id="lastName"
                    label="Last name"
                    placeholder="Doe"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    required
                    autoComplete="family-name"
                  />
                </div>

                <Input
                  id="email"
                  label="Email"
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  autoComplete="email"
                />

                <Input
                  id="password"
                  label="Password"
                  type="password"
                  placeholder="Create a password (min 6 characters)"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  autoComplete="new-password"
                />

                <Button
                  type="submit"
                  className="w-full"
                  size="lg"
                  disabled={loading}
                >
                  {loading ? "Creating account..." : "Create account"}
                </Button>
              </form>

              <p className="text-center text-sm text-neutral-600">
                Already have an account?{" "}
                <Link
                  href="/login"
                  className="text-revision-blue-600 hover:text-revision-blue-700 font-medium"
                >
                  Sign in
                </Link>
              </p>
            </div>
          </div>

          {/* Footer text */}
          <p className="text-center text-xs text-neutral-400">
            Built for UK GCSE students preparing for 2026 exams
          </p>
        </div>
      </main>
    </div>
  );
}
