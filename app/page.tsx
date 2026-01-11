import Link from "next/link";
import { Logo } from "@/components/brand";

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Navigation */}
        <nav className="flex justify-between items-center mb-16">
          <Logo size="md" />
          <div className="flex items-center gap-4">
            <Link
              href="/login"
              className="text-neutral-600 hover:text-neutral-900 transition font-medium"
            >
              Log in
            </Link>
            <Link
              href="/register"
              className="bg-turquoise-500 text-white px-5 py-2.5 rounded-lg hover:bg-turquoise-600 transition font-medium"
            >
              Get Started
            </Link>
          </div>
        </nav>

        {/* Hero Content */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <h1 className="text-5xl md:text-6xl font-bold text-neutral-900 mb-6 leading-tight">
            A revision system that
            <span className="text-turquoise-500"> manages the journey</span>
          </h1>
          <p className="text-xl text-neutral-600 mb-10 leading-relaxed">
            From today until exam day. myrevisionary plans, teaches, and tracks your
            GCSE revision based on how you learn, where you are in the curriculum,
            and how much time you have left.
          </p>
          <Link
            href="/register"
            className="inline-block bg-turquoise-500 text-white text-lg px-8 py-4 rounded-xl hover:bg-turquoise-600 transition shadow-lg hover:shadow-xl font-medium"
          >
            Start your revision plan
          </Link>
        </div>

        {/* Clarification Section */}
        <div className="bg-neutral-50 rounded-3xl p-10 mb-20">
          <h2 className="text-2xl font-bold text-neutral-900 text-center mb-8">
            More than an AI that answers questions
          </h2>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="bg-white p-6 rounded-xl border border-neutral-200">
              <p className="text-sm font-medium text-neutral-500 uppercase tracking-wide mb-3">Most AI revision tools</p>
              <p className="text-neutral-700 leading-relaxed">
                Answer questions when asked. Useful, but reactive. Students still need to decide
                what to revise, when to revise it, and whether they are actually ready.
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl border-2 border-turquoise-300">
              <p className="text-sm font-medium text-turquoise-600 uppercase tracking-wide mb-3">myrevisionary</p>
              <p className="text-neutral-700 leading-relaxed">
                Manages the entire revision journey. It builds a personalised plan, teaches content
                in a way that suits each student, checks understanding over time, and shows
                clear progress towards exam readiness.
              </p>
            </div>
          </div>
        </div>

        {/* How It Works Section */}
        <div className="mb-24">
          <h2 className="text-3xl font-bold text-neutral-900 text-center mb-4">
            How <span className="text-azure-500">myrevisionary</span> works
          </h2>
          <p className="text-neutral-600 text-center mb-12 max-w-2xl mx-auto">
            A structured approach to GCSE revision that adapts to each student
          </p>

          <div className="grid md:grid-cols-5 gap-6">
            {/* Step 1 */}
            <div className="text-center">
              <div className="w-14 h-14 bg-turquoise-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                <span className="text-turquoise-700 font-bold text-lg">1</span>
              </div>
              <h4 className="font-semibold text-neutral-900 mb-2">Learning style discovery</h4>
              <p className="text-sm text-neutral-600 leading-relaxed">
                A short assessment identifies how your child learns best, whether visual, auditory,
                reading-based, or hands-on.
              </p>
            </div>

            {/* Step 2 */}
            <div className="text-center">
              <div className="w-14 h-14 bg-turquoise-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                <span className="text-turquoise-700 font-bold text-lg">2</span>
              </div>
              <h4 className="font-semibold text-neutral-900 mb-2">Curriculum position check</h4>
              <p className="text-sm text-neutral-600 leading-relaxed">
                Diagnostic questions establish what they already know, so revision starts
                from the right place.
              </p>
            </div>

            {/* Step 3 */}
            <div className="text-center">
              <div className="w-14 h-14 bg-turquoise-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                <span className="text-turquoise-700 font-bold text-lg">3</span>
              </div>
              <h4 className="font-semibold text-neutral-900 mb-2">Personalised revision plan</h4>
              <p className="text-sm text-neutral-600 leading-relaxed">
                A revision plan is built around their exam dates, subjects, and available time,
                prioritising what matters most.
              </p>
            </div>

            {/* Step 4 */}
            <div className="text-center">
              <div className="w-14 h-14 bg-turquoise-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                <span className="text-turquoise-700 font-bold text-lg">4</span>
              </div>
              <h4 className="font-semibold text-neutral-900 mb-2">Adaptive teaching</h4>
              <p className="text-sm text-neutral-600 leading-relaxed">
                Content is delivered in a style that suits them, with explanations that adjust
                based on what they understand.
              </p>
            </div>

            {/* Step 5 */}
            <div className="text-center">
              <div className="w-14 h-14 bg-turquoise-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                <span className="text-turquoise-700 font-bold text-lg">5</span>
              </div>
              <h4 className="font-semibold text-neutral-900 mb-2">Progress and readiness</h4>
              <p className="text-sm text-neutral-600 leading-relaxed">
                Understanding is tracked across sessions, showing clear progress towards
                being exam-ready in each subject.
              </p>
            </div>
          </div>
        </div>

        {/* Trust & Reassurance Section */}
        <div className="bg-neutral-50 rounded-3xl p-12 mb-16">
          <h2 className="text-3xl font-bold text-neutral-900 text-center mb-4">
            Built responsibly for UK students
          </h2>
          <p className="text-neutral-600 text-center mb-10 max-w-2xl mx-auto">
            myrevisionary is designed with the needs of GCSE students, parents, and schools in mind
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="flex gap-4">
              <div className="w-10 h-10 bg-azure-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <svg className="w-5 h-5 text-azure-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <h4 className="font-semibold text-neutral-900 mb-1">UK GCSE focused</h4>
                <p className="text-sm text-neutral-600">
                  Content and curriculum aligned specifically to UK GCSE specifications across major exam boards.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="w-10 h-10 bg-azure-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <svg className="w-5 h-5 text-azure-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </div>
              <div>
                <h4 className="font-semibold text-neutral-900 mb-1">Supports, never replaces</h4>
                <p className="text-sm text-neutral-600">
                  Designed to complement classroom teaching. Teachers and schools remain central to learning.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="w-10 h-10 bg-azure-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <svg className="w-5 h-5 text-azure-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <div>
                <h4 className="font-semibold text-neutral-900 mb-1">Explainable progress</h4>
                <p className="text-sm text-neutral-600">
                  Parents and students can see clear progress reports, not just activity metrics.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="w-10 h-10 bg-azure-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <svg className="w-5 h-5 text-azure-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <div>
                <h4 className="font-semibold text-neutral-900 mb-1">Safeguarding-aware</h4>
                <p className="text-sm text-neutral-600">
                  Content guardrails, age-appropriate interactions, and no data shared with third parties.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="w-10 h-10 bg-azure-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <svg className="w-5 h-5 text-azure-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <div>
                <h4 className="font-semibold text-neutral-900 mb-1">No exam paper copying</h4>
                <p className="text-sm text-neutral-600">
                  Questions are generated fresh, not copied from past papers. Academic integrity is respected.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="w-10 h-10 bg-azure-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <svg className="w-5 h-5 text-azure-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 21v-4m0 0V5a2 2 0 012-2h6.5l1 1H21l-3 6 3 6h-8.5l-1-1H5a2 2 0 00-2 2zm9-13.5V9" />
                </svg>
              </div>
              <div>
                <h4 className="font-semibold text-neutral-900 mb-1">UK data residency</h4>
                <p className="text-sm text-neutral-600">
                  GDPR compliant, ICO registered, with data stored on UK servers.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center py-12">
          <h2 className="text-2xl font-bold text-neutral-900 mb-4">
            Start building a revision plan that works
          </h2>
          <p className="text-neutral-600 mb-8 max-w-xl mx-auto">
            Help your child revise with structure, clarity, and confidence.
            See where they are, where they need to be, and how to get there.
          </p>
          <Link
            href="/register"
            className="inline-block bg-turquoise-500 text-white px-8 py-4 rounded-xl hover:bg-turquoise-600 transition font-medium"
          >
            Get started free
          </Link>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-neutral-900 text-neutral-400">
        <div className="max-w-6xl mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-2">
              <span className="text-[#3783a5] font-semibold">my</span>
              <span className="text-[#37a87b] font-semibold">revisionary</span>
            </div>

            {/* Legal Links */}
            <nav className="flex flex-wrap justify-center gap-4 md:gap-6 text-sm">
              <Link href="/privacy" className="hover:text-white transition">
                Privacy Policy
              </Link>
              <Link href="/terms" className="hover:text-white transition">
                Terms
              </Link>
              <Link href="/cookies" className="hover:text-white transition">
                Cookies
              </Link>
              <Link href="/accessibility" className="hover:text-white transition">
                Accessibility
              </Link>
              <a href="mailto:support@myrevisionary.com" className="hover:text-white transition">
                Support
              </a>
            </nav>

            <p className="text-sm">&copy; 2025 myrevisionary</p>
          </div>
        </div>

        {/* Company Info Banner */}
        <div className="border-t border-neutral-800 py-4">
          <div className="max-w-6xl mx-auto px-4">
            <div className="flex flex-col md:flex-row justify-center items-center gap-2 md:gap-6 text-xs text-neutral-500">
              <span>myrevisionary ltd — Company No. 1695473</span>
              <span className="hidden md:inline">|</span>
              <span>ICO Registration: ZB995810</span>
              <span className="hidden md:inline">|</span>
              <span>Professional Indemnity Insurance: Hiscox, £1,000,000 cover</span>
              <span className="hidden md:inline">|</span>
              <span>GDPR compliant, UK servers</span>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
