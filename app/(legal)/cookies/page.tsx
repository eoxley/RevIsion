import Link from "next/link";
import { Logo } from "@/components/brand";

export const metadata = {
  title: "Cookie Policy - myrevisionary",
  description: "How we use cookies and similar technologies.",
};

export default function CookiePolicy() {
  return (
    <main className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b border-neutral-200">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <Link href="/">
            <Logo size="md" />
          </Link>
        </div>
      </header>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold text-neutral-900 mb-2">Cookie Policy</h1>
        <p className="text-neutral-500 mb-8">Last updated: January 2025</p>

        <div className="prose prose-neutral max-w-none">
          <section className="mb-10">
            <h2 className="text-2xl font-semibold text-neutral-900 mb-4">1. What Are Cookies?</h2>
            <p className="text-neutral-600 mb-4">
              Cookies are small text files stored on your device when you visit a website. They help websites
              remember your preferences, keep you logged in, and understand how you use the site.
            </p>
            <p className="text-neutral-600 mb-4">
              We also use similar technologies like local storage and session storage for the same purposes.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-semibold text-neutral-900 mb-4">2. How We Use Cookies</h2>
            <p className="text-neutral-600 mb-4">
              myrevisionary uses cookies to provide a better learning experience. We use them to:
            </p>
            <ul className="list-disc pl-6 text-neutral-600 mb-4 space-y-2">
              <li>Keep you logged in securely</li>
              <li>Remember your preferences and settings</li>
              <li>Understand how you use our platform</li>
              <li>Improve our service based on usage patterns</li>
            </ul>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-semibold text-neutral-900 mb-4">3. Types of Cookies We Use</h2>

            <div className="bg-neutral-50 rounded-lg p-6 mb-6">
              <h3 className="text-xl font-medium text-neutral-800 mb-3">Essential Cookies (Required)</h3>
              <p className="text-neutral-600 mb-3">
                These cookies are necessary for the website to function. Without them, you cannot use our service.
              </p>
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-neutral-200">
                    <th className="text-left py-2 font-medium text-neutral-700">Cookie</th>
                    <th className="text-left py-2 font-medium text-neutral-700">Purpose</th>
                    <th className="text-left py-2 font-medium text-neutral-700">Duration</th>
                  </tr>
                </thead>
                <tbody className="text-neutral-600">
                  <tr className="border-b border-neutral-100">
                    <td className="py-2">sb-auth-token</td>
                    <td className="py-2">Keeps you logged in securely</td>
                    <td className="py-2">7 days</td>
                  </tr>
                  <tr className="border-b border-neutral-100">
                    <td className="py-2">sb-refresh-token</td>
                    <td className="py-2">Refreshes your login session</td>
                    <td className="py-2">7 days</td>
                  </tr>
                  <tr className="border-b border-neutral-100">
                    <td className="py-2">session_id</td>
                    <td className="py-2">Identifies your current session</td>
                    <td className="py-2">Session</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="bg-neutral-50 rounded-lg p-6 mb-6">
              <h3 className="text-xl font-medium text-neutral-800 mb-3">Functional Cookies</h3>
              <p className="text-neutral-600 mb-3">
                These cookies remember your choices and preferences to provide a better experience.
              </p>
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-neutral-200">
                    <th className="text-left py-2 font-medium text-neutral-700">Cookie</th>
                    <th className="text-left py-2 font-medium text-neutral-700">Purpose</th>
                    <th className="text-left py-2 font-medium text-neutral-700">Duration</th>
                  </tr>
                </thead>
                <tbody className="text-neutral-600">
                  <tr className="border-b border-neutral-100">
                    <td className="py-2">theme_preference</td>
                    <td className="py-2">Remembers dark/light mode preference</td>
                    <td className="py-2">1 year</td>
                  </tr>
                  <tr className="border-b border-neutral-100">
                    <td className="py-2">audio_enabled</td>
                    <td className="py-2">Remembers audio preference for AI coach</td>
                    <td className="py-2">1 year</td>
                  </tr>
                  <tr className="border-b border-neutral-100">
                    <td className="py-2">last_subject</td>
                    <td className="py-2">Remembers your last studied subject</td>
                    <td className="py-2">30 days</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="bg-neutral-50 rounded-lg p-6 mb-6">
              <h3 className="text-xl font-medium text-neutral-800 mb-3">Analytics Cookies</h3>
              <p className="text-neutral-600 mb-3">
                These cookies help us understand how people use myrevisionary so we can improve it.
              </p>
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-neutral-200">
                    <th className="text-left py-2 font-medium text-neutral-700">Cookie</th>
                    <th className="text-left py-2 font-medium text-neutral-700">Purpose</th>
                    <th className="text-left py-2 font-medium text-neutral-700">Duration</th>
                  </tr>
                </thead>
                <tbody className="text-neutral-600">
                  <tr className="border-b border-neutral-100">
                    <td className="py-2">_analytics_id</td>
                    <td className="py-2">Anonymously tracks page views</td>
                    <td className="py-2">1 year</td>
                  </tr>
                  <tr className="border-b border-neutral-100">
                    <td className="py-2">_session_tracking</td>
                    <td className="py-2">Measures session duration</td>
                    <td className="py-2">Session</td>
                  </tr>
                </tbody>
              </table>
              <p className="text-neutral-500 text-sm mt-3">
                Note: Our analytics are privacy-focused and do not use Google Analytics.
              </p>
            </div>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-semibold text-neutral-900 mb-4">4. Third-Party Cookies</h2>
            <p className="text-neutral-600 mb-4">
              We minimise the use of third-party cookies. Currently, we may use:
            </p>
            <ul className="list-disc pl-6 text-neutral-600 mb-4 space-y-2">
              <li><strong>Supabase:</strong> Our authentication provider (essential for login)</li>
            </ul>
            <p className="text-neutral-600 mb-4">
              We do NOT use advertising cookies or share data with ad networks.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-semibold text-neutral-900 mb-4">5. Managing Cookies</h2>

            <h3 className="text-xl font-medium text-neutral-800 mb-3">Browser Settings</h3>
            <p className="text-neutral-600 mb-4">
              Most browsers allow you to control cookies through their settings. You can:
            </p>
            <ul className="list-disc pl-6 text-neutral-600 mb-4 space-y-2">
              <li>View what cookies are stored on your device</li>
              <li>Delete some or all cookies</li>
              <li>Block cookies from being set</li>
              <li>Set preferences for specific websites</li>
            </ul>
            <p className="text-neutral-600 mb-4">
              Note: Blocking essential cookies will prevent you from using myrevisionary.
            </p>

            <h3 className="text-xl font-medium text-neutral-800 mb-3">Browser-Specific Instructions</h3>
            <ul className="list-disc pl-6 text-neutral-600 mb-4 space-y-2">
              <li><strong>Chrome:</strong> Settings → Privacy and Security → Cookies</li>
              <li><strong>Firefox:</strong> Settings → Privacy & Security → Cookies</li>
              <li><strong>Safari:</strong> Preferences → Privacy → Manage Website Data</li>
              <li><strong>Edge:</strong> Settings → Privacy → Cookies</li>
            </ul>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-semibold text-neutral-900 mb-4">6. Local Storage</h2>
            <p className="text-neutral-600 mb-4">
              In addition to cookies, we use browser local storage to:
            </p>
            <ul className="list-disc pl-6 text-neutral-600 mb-4 space-y-2">
              <li>Store your chat history for quick access</li>
              <li>Cache learning progress for offline viewing</li>
              <li>Save draft responses when revising</li>
            </ul>
            <p className="text-neutral-600 mb-4">
              Local storage data stays on your device and can be cleared through your browser settings.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-semibold text-neutral-900 mb-4">7. Updates to This Policy</h2>
            <p className="text-neutral-600 mb-4">
              We may update this Cookie Policy occasionally. Changes will be posted on this page with an
              updated &quot;Last updated&quot; date.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-semibold text-neutral-900 mb-4">8. Contact Us</h2>
            <p className="text-neutral-600 mb-4">
              If you have questions about our use of cookies, contact us at:
            </p>
            <p className="text-neutral-600 mb-4">
              Email: privacy@myrevisionary.com
            </p>
          </section>
        </div>

        <div className="mt-12 pt-8 border-t border-neutral-200">
          <Link href="/" className="text-azure-500 hover:text-azure-600 font-medium">
            &larr; Back to home
          </Link>
        </div>
      </div>
    </main>
  );
}
