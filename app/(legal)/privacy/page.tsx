import Link from "next/link";
import { Logo } from "@/components/brand";

export const metadata = {
  title: "Privacy Policy - myrevisionary",
  description: "How we collect, use, and protect your personal data.",
};

export default function PrivacyPolicy() {
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
        <h1 className="text-4xl font-bold text-neutral-900 mb-2">Privacy Policy</h1>
        <p className="text-neutral-500 mb-8">Last updated: January 2025</p>

        <div className="prose prose-neutral max-w-none">
          <section className="mb-10">
            <h2 className="text-2xl font-semibold text-neutral-900 mb-4">1. Who We Are</h2>
            <p className="text-neutral-600 mb-4">
              myrevisionary ltd (Company No. 1695473) is the data controller responsible for your personal data.
              We are registered with the Information Commissioner&apos;s Office (ICO) under registration number ZB995810.
            </p>
            <p className="text-neutral-600 mb-4">
              <strong>Contact:</strong><br />
              Email: privacy@myrevisionary.com<br />
              Address: myrevisionary ltd, United Kingdom
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-semibold text-neutral-900 mb-4">2. Information We Collect</h2>

            <h3 className="text-xl font-medium text-neutral-800 mb-3">2.1 Information You Provide</h3>
            <ul className="list-disc pl-6 text-neutral-600 mb-4 space-y-2">
              <li><strong>Account information:</strong> Name, email address, password (encrypted)</li>
              <li><strong>Profile information:</strong> Student name, year group, selected GCSE subjects</li>
              <li><strong>Learning style data:</strong> Responses to our VARK assessment questionnaire</li>
              <li><strong>Parent/guardian information:</strong> Name, email address (for progress reports)</li>
            </ul>

            <h3 className="text-xl font-medium text-neutral-800 mb-3">2.2 Information Generated Through Use</h3>
            <ul className="list-disc pl-6 text-neutral-600 mb-4 space-y-2">
              <li><strong>Learning progress:</strong> Topics studied, understanding levels, session history</li>
              <li><strong>Chat interactions:</strong> Conversations with our AI revision coach</li>
              <li><strong>Usage data:</strong> Login times, session duration, features used</li>
            </ul>

            <h3 className="text-xl font-medium text-neutral-800 mb-3">2.3 Technical Information</h3>
            <ul className="list-disc pl-6 text-neutral-600 mb-4 space-y-2">
              <li>IP address and approximate location (country level)</li>
              <li>Browser type and version</li>
              <li>Device type and operating system</li>
              <li>Cookies and similar technologies (see our Cookie Policy)</li>
            </ul>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-semibold text-neutral-900 mb-4">3. How We Use Your Information</h2>
            <p className="text-neutral-600 mb-4">We use your information to:</p>
            <ul className="list-disc pl-6 text-neutral-600 mb-4 space-y-2">
              <li><strong>Provide our service:</strong> Deliver personalised revision support based on your learning style</li>
              <li><strong>Track progress:</strong> Monitor understanding and adapt our AI coach to your needs</li>
              <li><strong>Send progress reports:</strong> Weekly updates to parents/guardians (where registered)</li>
              <li><strong>Improve our service:</strong> Analyse usage patterns to enhance the learning experience</li>
              <li><strong>Communicate with you:</strong> Service updates, support responses, and important notices</li>
              <li><strong>Ensure security:</strong> Protect against fraud, abuse, and unauthorised access</li>
            </ul>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-semibold text-neutral-900 mb-4">4. Legal Basis for Processing</h2>
            <p className="text-neutral-600 mb-4">Under UK GDPR, we process your data based on:</p>
            <ul className="list-disc pl-6 text-neutral-600 mb-4 space-y-2">
              <li><strong>Contract:</strong> To provide the revision service you&apos;ve signed up for</li>
              <li><strong>Legitimate interests:</strong> To improve our service and ensure security</li>
              <li><strong>Consent:</strong> For optional communications and parent progress reports</li>
              <li><strong>Legal obligation:</strong> Where required by law</li>
            </ul>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-semibold text-neutral-900 mb-4">5. Children&apos;s Privacy</h2>
            <p className="text-neutral-600 mb-4">
              Our service is designed for GCSE students (typically aged 14-16). We take children&apos;s privacy seriously:
            </p>
            <ul className="list-disc pl-6 text-neutral-600 mb-4 space-y-2">
              <li>We collect only the minimum data necessary for the service</li>
              <li>We do not sell or share children&apos;s data with third parties for marketing</li>
              <li>Parents/guardians can request access to or deletion of their child&apos;s data</li>
              <li>We provide age-appropriate privacy information</li>
              <li>AI interactions are designed to be safe and educational</li>
            </ul>
            <p className="text-neutral-600 mb-4">
              For users under 13, we require parental consent before creating an account.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-semibold text-neutral-900 mb-4">6. Data Sharing</h2>
            <p className="text-neutral-600 mb-4">We share your data only with:</p>
            <ul className="list-disc pl-6 text-neutral-600 mb-4 space-y-2">
              <li><strong>Parents/guardians:</strong> Progress reports (where registered and consented)</li>
              <li><strong>Service providers:</strong> Hosting (UK-based servers), email delivery, AI processing</li>
              <li><strong>Legal requirements:</strong> If required by law or to protect rights and safety</li>
            </ul>
            <p className="text-neutral-600 mb-4">
              We do NOT sell your personal data. We do NOT share data with advertisers.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-semibold text-neutral-900 mb-4">7. Data Storage and Security</h2>
            <ul className="list-disc pl-6 text-neutral-600 mb-4 space-y-2">
              <li><strong>Location:</strong> All data is stored on UK-based servers</li>
              <li><strong>Encryption:</strong> Data is encrypted in transit (TLS) and at rest</li>
              <li><strong>Access controls:</strong> Strict access controls and authentication</li>
              <li><strong>Regular audits:</strong> Security practices are regularly reviewed</li>
              <li><strong>Insurance:</strong> Professional indemnity insurance with Hiscox (£1,000,000 cover)</li>
            </ul>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-semibold text-neutral-900 mb-4">8. Data Retention</h2>
            <p className="text-neutral-600 mb-4">We retain your data for:</p>
            <ul className="list-disc pl-6 text-neutral-600 mb-4 space-y-2">
              <li><strong>Active accounts:</strong> For the duration of your account</li>
              <li><strong>After account deletion:</strong> Up to 30 days for backup purposes</li>
              <li><strong>Legal requirements:</strong> Longer if required by law</li>
              <li><strong>Anonymised data:</strong> May be retained indefinitely for service improvement</li>
            </ul>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-semibold text-neutral-900 mb-4">9. Your Rights</h2>
            <p className="text-neutral-600 mb-4">Under UK GDPR, you have the right to:</p>
            <ul className="list-disc pl-6 text-neutral-600 mb-4 space-y-2">
              <li><strong>Access:</strong> Request a copy of your personal data</li>
              <li><strong>Rectification:</strong> Correct inaccurate data</li>
              <li><strong>Erasure:</strong> Request deletion of your data (&quot;right to be forgotten&quot;)</li>
              <li><strong>Restriction:</strong> Limit how we process your data</li>
              <li><strong>Portability:</strong> Receive your data in a portable format</li>
              <li><strong>Object:</strong> Object to certain processing activities</li>
              <li><strong>Withdraw consent:</strong> Where processing is based on consent</li>
            </ul>
            <p className="text-neutral-600 mb-4">
              To exercise these rights, contact privacy@myrevisionary.com. We will respond within 30 days.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-semibold text-neutral-900 mb-4">10. Complaints</h2>
            <p className="text-neutral-600 mb-4">
              If you&apos;re unhappy with how we handle your data, you can:
            </p>
            <ul className="list-disc pl-6 text-neutral-600 mb-4 space-y-2">
              <li>Contact us at privacy@myrevisionary.com</li>
              <li>Lodge a complaint with the Information Commissioner&apos;s Office (ICO) at ico.org.uk</li>
            </ul>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-semibold text-neutral-900 mb-4">11. Changes to This Policy</h2>
            <p className="text-neutral-600 mb-4">
              We may update this policy from time to time. We will notify you of significant changes via email
              or through the platform. The &quot;Last updated&quot; date at the top indicates when changes were made.
            </p>
          </section>
        </div>

        <div className="mt-12 pt-8 border-t border-neutral-200">
          <Link href="/" className="text-revision-green-600 hover:text-revision-green-700 font-medium">
            &larr; Back to home
          </Link>
        </div>
      </div>
    </main>
  );
}
