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
              className="bg-revision-green-500 text-white px-5 py-2.5 rounded-lg hover:bg-revision-green-600 transition font-medium"
            >
              Get Started
            </Link>
          </div>
        </nav>

        {/* Hero Content */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <h1 className="text-5xl md:text-6xl font-bold text-neutral-900 mb-6 leading-tight">
            Study smarter,
            <span className="text-revision-green-500"> not harder</span>
          </h1>
          <p className="text-xl text-neutral-600 mb-10 leading-relaxed">
            Everyone learns differently. Take a quick quiz to discover your unique learning style
            and get revision tips that actually work for you.
          </p>
          <Link
            href="/register"
            className="inline-block bg-revision-green-500 text-white text-lg px-8 py-4 rounded-xl hover:bg-revision-green-600 transition shadow-lg hover:shadow-xl font-medium"
          >
            Let's find out about you
          </Link>
        </div>

        {/* Learning Style Cards */}
        <div className="grid md:grid-cols-4 gap-5 mb-24">
          <div className="bg-white p-6 rounded-2xl border border-neutral-200 hover:border-revision-green-300 hover:shadow-lg transition">
            <div className="w-12 h-12 bg-revision-green-50 rounded-xl flex items-center justify-center mb-4">
              <span className="text-2xl">👁️</span>
            </div>
            <h3 className="font-semibold text-lg mb-2 text-neutral-900">Visual</h3>
            <p className="text-neutral-600 text-sm leading-relaxed">
              Learn best through images, diagrams, charts, and spatial understanding
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-neutral-200 hover:border-revision-green-300 hover:shadow-lg transition">
            <div className="w-12 h-12 bg-revision-green-50 rounded-xl flex items-center justify-center mb-4">
              <span className="text-2xl">👂</span>
            </div>
            <h3 className="font-semibold text-lg mb-2 text-neutral-900">Auditory</h3>
            <p className="text-neutral-600 text-sm leading-relaxed">
              Learn best through listening, discussions, and verbal explanations
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-neutral-200 hover:border-revision-green-300 hover:shadow-lg transition">
            <div className="w-12 h-12 bg-revision-green-50 rounded-xl flex items-center justify-center mb-4">
              <span className="text-2xl">📖</span>
            </div>
            <h3 className="font-semibold text-lg mb-2 text-neutral-900">Read/Write</h3>
            <p className="text-neutral-600 text-sm leading-relaxed">
              Learn best through reading, writing notes, and text-based content
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-neutral-200 hover:border-revision-green-300 hover:shadow-lg transition">
            <div className="w-12 h-12 bg-revision-green-50 rounded-xl flex items-center justify-center mb-4">
              <span className="text-2xl">🤲</span>
            </div>
            <h3 className="font-semibold text-lg mb-2 text-neutral-900">Hands-on</h3>
            <p className="text-neutral-600 text-sm leading-relaxed">
              Learn best through hands-on practice, movement, and real experiences
            </p>
          </div>
        </div>

        {/* Features */}
        <div className="bg-neutral-50 rounded-3xl p-12 mb-16">
          <h2 className="text-3xl font-bold text-neutral-900 text-center mb-12">
            Why students love <span className="text-revision-green-500">myrevisionary</span>
          </h2>
          <div className="grid md:grid-cols-3 gap-10">
            <div className="text-center">
              <div className="w-16 h-16 bg-revision-green-100 rounded-2xl flex items-center justify-center mx-auto mb-5">
                <svg className="w-8 h-8 text-revision-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h4 className="font-semibold text-lg mb-2 text-neutral-900">Quick Quiz</h4>
              <p className="text-neutral-600">
                2-minute quiz to understand exactly how your brain works best
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-revision-green-100 rounded-2xl flex items-center justify-center mx-auto mb-5">
                <svg className="w-8 h-8 text-revision-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
              </div>
              <h4 className="font-semibold text-lg mb-2 text-neutral-900">AI Coach</h4>
              <p className="text-neutral-600">
                Personal revision coach that adapts to how you learn
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-revision-green-100 rounded-2xl flex items-center justify-center mx-auto mb-5">
                <svg className="w-8 h-8 text-revision-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h4 className="font-semibold text-lg mb-2 text-neutral-900">Smart Tips</h4>
              <p className="text-neutral-600">
                Study strategies tailored specifically to your learning style
              </p>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center py-12">
          <h2 className="text-2xl font-bold text-neutral-900 mb-4">
            Ready to ace your GCSEs?
          </h2>
          <p className="text-neutral-600 mb-8">
            Join students who are already revising smarter
          </p>
          <Link
            href="/register"
            className="inline-block bg-revision-green-500 text-white px-8 py-4 rounded-xl hover:bg-revision-green-600 transition font-medium"
          >
            Get started for free
          </Link>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-neutral-900 text-neutral-400">
        <div className="max-w-6xl mx-auto px-4 py-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="text-[#4A7C9B] font-semibold">my</span>
            <span className="text-[#3AAA8A] font-semibold">revisionary</span>
          </div>
          <p className="text-sm">&copy; 2025 myrevisionary. Helping students learn smarter.</p>
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
