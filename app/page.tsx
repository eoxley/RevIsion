import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100">
      {/* Hero Section */}
      <div className="max-w-6xl mx-auto px-4 py-20">
        <nav className="flex justify-between items-center mb-20">
          <h1 className="text-2xl font-bold text-slate-900">RevIsion</h1>
          <div className="space-x-4">
            <Link
              href="/login"
              className="text-slate-600 hover:text-slate-900 transition"
            >
              Log in
            </Link>
            <Link
              href="/register"
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
            >
              Get Started
            </Link>
          </div>
        </nav>

        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-5xl font-bold text-slate-900 mb-6">
            Discover How You Learn Best
          </h2>
          <p className="text-xl text-slate-600 mb-10">
            Take our comprehensive VARK assessment to understand your unique learning style.
            Get personalized study strategies that work for you.
          </p>
          <Link
            href="/register"
            className="inline-block bg-blue-600 text-white text-lg px-8 py-4 rounded-lg hover:bg-blue-700 transition shadow-lg hover:shadow-xl"
          >
            Start Your Assessment
          </Link>
        </div>

        {/* VARK Cards */}
        <div className="grid md:grid-cols-4 gap-6 mt-20">
          <div className="bg-white p-6 rounded-xl shadow-md border-t-4 border-blue-500">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
              <span className="text-2xl">👁️</span>
            </div>
            <h3 className="font-semibold text-lg mb-2">Visual</h3>
            <p className="text-slate-600 text-sm">
              Learn best through images, diagrams, charts, and spatial understanding
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-md border-t-4 border-green-500">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
              <span className="text-2xl">👂</span>
            </div>
            <h3 className="font-semibold text-lg mb-2">Auditory</h3>
            <p className="text-slate-600 text-sm">
              Learn best through listening, discussions, and verbal explanations
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-md border-t-4 border-yellow-500">
            <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center mb-4">
              <span className="text-2xl">📖</span>
            </div>
            <h3 className="font-semibold text-lg mb-2">Read/Write</h3>
            <p className="text-slate-600 text-sm">
              Learn best through reading, writing notes, and text-based content
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-md border-t-4 border-red-500">
            <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mb-4">
              <span className="text-2xl">🤲</span>
            </div>
            <h3 className="font-semibold text-lg mb-2">Kinesthetic</h3>
            <p className="text-slate-600 text-sm">
              Learn best through hands-on practice, movement, and real experiences
            </p>
          </div>
        </div>

        {/* Features */}
        <div className="mt-24 text-center">
          <h3 className="text-3xl font-bold text-slate-900 mb-12">
            Why Use RevIsion?
          </h3>
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <div className="text-4xl mb-4">📊</div>
              <h4 className="font-semibold text-lg mb-2">Detailed Analysis</h4>
              <p className="text-slate-600">
                32+ questions for a comprehensive understanding of your learning preferences
              </p>
            </div>
            <div>
              <div className="text-4xl mb-4">💡</div>
              <h4 className="font-semibold text-lg mb-2">Personalized Tips</h4>
              <p className="text-slate-600">
                Get study strategies tailored to your specific learning style
              </p>
            </div>
            <div>
              <div className="text-4xl mb-4">📈</div>
              <h4 className="font-semibold text-lg mb-2">Track Progress</h4>
              <p className="text-slate-600">
                Save results and see how your learning style evolves over time
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 py-8 mt-20">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <p>&copy; 2024 RevIsion. Helping students learn smarter.</p>
        </div>
      </footer>
    </main>
  );
}
