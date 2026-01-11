import Link from "next/link";
import { Logo } from "@/components/brand";

export const metadata = {
  title: "Terms of Service - myrevisionary",
  description: "Terms and conditions for using myrevisionary.",
};

export default function TermsOfService() {
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
        <h1 className="text-4xl font-bold text-neutral-900 mb-2">Terms of Service</h1>
        <p className="text-neutral-500 mb-8">Last updated: January 2025</p>

        <div className="prose prose-neutral max-w-none">
          <section className="mb-10">
            <h2 className="text-2xl font-semibold text-neutral-900 mb-4">1. Introduction</h2>
            <p className="text-neutral-600 mb-4">
              Welcome to myrevisionary. These Terms of Service (&quot;Terms&quot;) govern your use of our website
              and services operated by myrevisionary ltd (Company No. 1695473) (&quot;we&quot;, &quot;us&quot;, &quot;our&quot;).
            </p>
            <p className="text-neutral-600 mb-4">
              By creating an account or using our service, you agree to these Terms. If you don&apos;t agree,
              please don&apos;t use our service.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-semibold text-neutral-900 mb-4">2. Our Service</h2>
            <p className="text-neutral-600 mb-4">
              myrevisionary provides an AI-powered GCSE revision platform that:
            </p>
            <ul className="list-disc pl-6 text-neutral-600 mb-4 space-y-2">
              <li>Assesses your learning style using the VARK framework</li>
              <li>Provides personalised revision support through an AI coach</li>
              <li>Tracks your progress across GCSE subjects</li>
              <li>Sends progress reports to parents/guardians (optional)</li>
            </ul>
            <p className="text-neutral-600 mb-4">
              Our service is designed to supplement, not replace, formal education. We do not guarantee
              specific exam results.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-semibold text-neutral-900 mb-4">3. Account Registration</h2>

            <h3 className="text-xl font-medium text-neutral-800 mb-3">3.1 Eligibility</h3>
            <p className="text-neutral-600 mb-4">
              Our service is intended for GCSE students (typically aged 14-16) and their parents/guardians.
              Users under 13 require parental consent to create an account.
            </p>

            <h3 className="text-xl font-medium text-neutral-800 mb-3">3.2 Account Security</h3>
            <p className="text-neutral-600 mb-4">
              You are responsible for:
            </p>
            <ul className="list-disc pl-6 text-neutral-600 mb-4 space-y-2">
              <li>Keeping your password secure and confidential</li>
              <li>All activity that occurs under your account</li>
              <li>Notifying us immediately of any unauthorised access</li>
            </ul>

            <h3 className="text-xl font-medium text-neutral-800 mb-3">3.3 Accurate Information</h3>
            <p className="text-neutral-600 mb-4">
              You must provide accurate and complete information when registering. We may suspend accounts
              with false information.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-semibold text-neutral-900 mb-4">4. Acceptable Use</h2>
            <p className="text-neutral-600 mb-4">You agree NOT to:</p>
            <ul className="list-disc pl-6 text-neutral-600 mb-4 space-y-2">
              <li>Use the service for any unlawful purpose</li>
              <li>Attempt to gain unauthorised access to our systems</li>
              <li>Interfere with or disrupt the service</li>
              <li>Use automated systems to access the service without permission</li>
              <li>Share your account with others</li>
              <li>Submit content that is harmful, abusive, or inappropriate</li>
              <li>Attempt to extract or copy our content, algorithms, or data</li>
              <li>Use the service to cheat in exams or submit AI-generated work as your own</li>
            </ul>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-semibold text-neutral-900 mb-4">5. AI Coach and Content</h2>

            <h3 className="text-xl font-medium text-neutral-800 mb-3">5.1 AI-Generated Content</h3>
            <p className="text-neutral-600 mb-4">
              Our AI revision coach provides educational support. While we strive for accuracy:
            </p>
            <ul className="list-disc pl-6 text-neutral-600 mb-4 space-y-2">
              <li>AI responses may occasionally contain errors</li>
              <li>Content should be verified against official curriculum materials</li>
              <li>The AI is not a substitute for qualified teachers</li>
            </ul>

            <h3 className="text-xl font-medium text-neutral-800 mb-3">5.2 Academic Integrity</h3>
            <p className="text-neutral-600 mb-4">
              Our service is designed to help you LEARN, not to complete work for you. You must:
            </p>
            <ul className="list-disc pl-6 text-neutral-600 mb-4 space-y-2">
              <li>Not submit AI-generated content as your own coursework</li>
              <li>Use the service to understand concepts, not to get answers to copy</li>
              <li>Follow your school&apos;s academic integrity policies</li>
            </ul>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-semibold text-neutral-900 mb-4">6. Payment and Subscription</h2>
            <p className="text-neutral-600 mb-4">
              If you subscribe to a paid plan:
            </p>
            <ul className="list-disc pl-6 text-neutral-600 mb-4 space-y-2">
              <li>Prices are in GBP and include VAT where applicable</li>
              <li>Subscriptions renew automatically unless cancelled</li>
              <li>You can cancel at any time; access continues until the end of the billing period</li>
              <li>Refunds are available within 14 days of purchase if you haven&apos;t used the service</li>
            </ul>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-semibold text-neutral-900 mb-4">7. Intellectual Property</h2>

            <h3 className="text-xl font-medium text-neutral-800 mb-3">7.1 Our Content</h3>
            <p className="text-neutral-600 mb-4">
              All content, features, and functionality of the service (including text, graphics, logos,
              and software) are owned by myrevisionary ltd and protected by UK and international copyright laws.
            </p>

            <h3 className="text-xl font-medium text-neutral-800 mb-3">7.2 Your Content</h3>
            <p className="text-neutral-600 mb-4">
              You retain ownership of any content you submit. By using our service, you grant us a licence
              to use this content to provide and improve our services.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-semibold text-neutral-900 mb-4">8. Limitation of Liability</h2>
            <p className="text-neutral-600 mb-4">
              To the maximum extent permitted by law:
            </p>
            <ul className="list-disc pl-6 text-neutral-600 mb-4 space-y-2">
              <li>We provide the service &quot;as is&quot; without warranties of any kind</li>
              <li>We are not liable for any indirect, incidental, or consequential damages</li>
              <li>Our total liability is limited to the amount you paid us in the past 12 months</li>
              <li>We do not guarantee specific exam results or academic outcomes</li>
            </ul>
            <p className="text-neutral-600 mb-4">
              Nothing in these Terms limits our liability for death or personal injury caused by negligence,
              fraud, or any other liability that cannot be excluded by law.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-semibold text-neutral-900 mb-4">9. Indemnification</h2>
            <p className="text-neutral-600 mb-4">
              You agree to indemnify and hold harmless myrevisionary ltd from any claims, damages, or expenses
              arising from your use of the service or violation of these Terms.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-semibold text-neutral-900 mb-4">10. Termination</h2>
            <p className="text-neutral-600 mb-4">
              We may suspend or terminate your account if you violate these Terms. You may delete your account
              at any time through your profile settings or by contacting support@myrevisionary.com.
            </p>
            <p className="text-neutral-600 mb-4">
              Upon termination, your right to use the service ends immediately. We may retain certain data
              as described in our Privacy Policy.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-semibold text-neutral-900 mb-4">11. Changes to Terms</h2>
            <p className="text-neutral-600 mb-4">
              We may update these Terms from time to time. We will notify you of significant changes via email
              or through the platform. Continued use of the service after changes constitutes acceptance.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-semibold text-neutral-900 mb-4">12. Governing Law</h2>
            <p className="text-neutral-600 mb-4">
              These Terms are governed by the laws of England and Wales. Any disputes will be subject to the
              exclusive jurisdiction of the courts of England and Wales.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-semibold text-neutral-900 mb-4">13. Contact Us</h2>
            <p className="text-neutral-600 mb-4">
              For questions about these Terms, contact us at:
            </p>
            <p className="text-neutral-600 mb-4">
              General support: <a href="mailto:support@myrevisionary.com" className="text-azure-500 hover:underline">support@myrevisionary.com</a><br />
              Legal enquiries: <a href="mailto:legal@myrevisionary.com" className="text-azure-500 hover:underline">legal@myrevisionary.com</a><br />
              myrevisionary ltd<br />
              United Kingdom
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
