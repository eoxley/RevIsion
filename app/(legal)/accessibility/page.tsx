import Link from "next/link";
import { Logo } from "@/components/brand";

export const metadata = {
  title: "Accessibility Statement - myrevisionary",
  description: "Our commitment to making myrevisionary accessible to everyone.",
};

export default function AccessibilityStatement() {
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
        <h1 className="text-4xl font-bold text-neutral-900 mb-2">Accessibility Statement</h1>
        <p className="text-neutral-500 mb-8">Last updated: January 2025</p>

        <div className="prose prose-neutral max-w-none">
          <section className="mb-10">
            <h2 className="text-2xl font-semibold text-neutral-900 mb-4">Our Commitment</h2>
            <p className="text-neutral-600 mb-4">
              myrevisionary ltd is committed to ensuring digital accessibility for people of all abilities.
              We believe every student deserves equal access to quality GCSE revision support, regardless
              of any disability or impairment.
            </p>
            <p className="text-neutral-600 mb-4">
              We are continually improving the user experience for everyone and applying the relevant
              accessibility standards to ensure we provide equal access to all users.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-semibold text-neutral-900 mb-4">Conformance Status</h2>
            <p className="text-neutral-600 mb-4">
              We aim to conform to the Web Content Accessibility Guidelines (WCAG) 2.1 Level AA standards.
              These guidelines explain how to make web content more accessible for people with disabilities.
            </p>
            <p className="text-neutral-600 mb-4">
              myrevisionary is partially conformant with WCAG 2.1 Level AA. &quot;Partially conformant&quot; means
              that some parts of the content do not fully conform to the accessibility standard, and we are
              actively working to address these areas.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-semibold text-neutral-900 mb-4">Accessibility Features</h2>
            <p className="text-neutral-600 mb-4">
              myrevisionary includes the following accessibility features:
            </p>

            <h3 className="text-xl font-medium text-neutral-800 mb-3">Visual Accessibility</h3>
            <ul className="list-disc pl-6 text-neutral-600 mb-4 space-y-2">
              <li><strong>High contrast:</strong> Text meets WCAG AA contrast requirements (4.5:1 minimum)</li>
              <li><strong>Resizable text:</strong> All text can be resized up to 200% without loss of functionality</li>
              <li><strong>No colour-only information:</strong> We don&apos;t rely solely on colour to convey information</li>
              <li><strong>Focus indicators:</strong> Clear visible focus states for keyboard navigation</li>
              <li><strong>Responsive design:</strong> Works on screens of all sizes, including zoom levels up to 400%</li>
            </ul>

            <h3 className="text-xl font-medium text-neutral-800 mb-3">Keyboard Accessibility</h3>
            <ul className="list-disc pl-6 text-neutral-600 mb-4 space-y-2">
              <li><strong>Full keyboard navigation:</strong> All functionality is available using a keyboard</li>
              <li><strong>Skip links:</strong> Skip to main content links for screen reader users</li>
              <li><strong>Logical tab order:</strong> Navigation follows a logical, intuitive order</li>
              <li><strong>No keyboard traps:</strong> You can always navigate away from any component</li>
            </ul>

            <h3 className="text-xl font-medium text-neutral-800 mb-3">Screen Reader Compatibility</h3>
            <ul className="list-disc pl-6 text-neutral-600 mb-4 space-y-2">
              <li><strong>Semantic HTML:</strong> Proper use of headings, landmarks, and ARIA labels</li>
              <li><strong>Alt text:</strong> All images have descriptive alternative text</li>
              <li><strong>Form labels:</strong> All form inputs have associated labels</li>
              <li><strong>Live regions:</strong> Dynamic content changes are announced to screen readers</li>
              <li><strong>Tested with:</strong> NVDA, VoiceOver, and JAWS</li>
            </ul>

            <h3 className="text-xl font-medium text-neutral-800 mb-3">Cognitive Accessibility</h3>
            <ul className="list-disc pl-6 text-neutral-600 mb-4 space-y-2">
              <li><strong>Clear language:</strong> Simple, straightforward content written for GCSE students</li>
              <li><strong>Consistent navigation:</strong> Same layout and navigation across all pages</li>
              <li><strong>Error prevention:</strong> Clear error messages and confirmation before destructive actions</li>
              <li><strong>Progress indicators:</strong> Clear indication of where you are in multi-step processes</li>
              <li><strong>No time limits:</strong> No time-limited content (except optional timed practice)</li>
            </ul>

            <h3 className="text-xl font-medium text-neutral-800 mb-3">Audio and Multimedia</h3>
            <ul className="list-disc pl-6 text-neutral-600 mb-4 space-y-2">
              <li><strong>Audio controls:</strong> Users can pause, stop, or adjust audio volume</li>
              <li><strong>Text alternatives:</strong> Audio content has text-based alternatives available</li>
              <li><strong>No autoplay:</strong> Audio does not play automatically</li>
            </ul>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-semibold text-neutral-900 mb-4">Learning Style Adaptations</h2>
            <p className="text-neutral-600 mb-4">
              Our VARK-based learning style assessment helps us adapt content delivery for different learners:
            </p>
            <ul className="list-disc pl-6 text-neutral-600 mb-4 space-y-2">
              <li><strong>Visual learners:</strong> Descriptive explanations, spatial language, diagram descriptions</li>
              <li><strong>Auditory learners:</strong> Text-to-speech options, conversational explanations</li>
              <li><strong>Read/Write learners:</strong> Detailed written content, note-taking support</li>
              <li><strong>Kinesthetic learners:</strong> Interactive exercises, step-by-step activities</li>
            </ul>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-semibold text-neutral-900 mb-4">Known Limitations</h2>
            <p className="text-neutral-600 mb-4">
              We are aware of the following accessibility limitations and are working to address them:
            </p>
            <ul className="list-disc pl-6 text-neutral-600 mb-4 space-y-2">
              <li>
                <strong>AI chat interface:</strong> Some complex AI responses may be difficult for screen readers
                to parse. We are working on improved formatting.
              </li>
              <li>
                <strong>Mathematical notation:</strong> Some mathematical content may not be fully accessible
                to screen readers. We are implementing MathML support.
              </li>
              <li>
                <strong>Third-party content:</strong> Some embedded content from external sources may not meet
                our accessibility standards.
              </li>
            </ul>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-semibold text-neutral-900 mb-4">Assistive Technology Compatibility</h2>
            <p className="text-neutral-600 mb-4">
              myrevisionary is designed to be compatible with the following assistive technologies:
            </p>
            <ul className="list-disc pl-6 text-neutral-600 mb-4 space-y-2">
              <li>Screen readers (NVDA, JAWS, VoiceOver, TalkBack)</li>
              <li>Screen magnification software</li>
              <li>Speech recognition software</li>
              <li>Keyboard-only navigation</li>
              <li>Switch devices</li>
            </ul>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-semibold text-neutral-900 mb-4">Browser Compatibility</h2>
            <p className="text-neutral-600 mb-4">
              For the best accessible experience, we recommend using the latest versions of:
            </p>
            <ul className="list-disc pl-6 text-neutral-600 mb-4 space-y-2">
              <li>Google Chrome</li>
              <li>Mozilla Firefox</li>
              <li>Apple Safari</li>
              <li>Microsoft Edge</li>
            </ul>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-semibold text-neutral-900 mb-4">Feedback and Contact</h2>
            <p className="text-neutral-600 mb-4">
              We welcome your feedback on the accessibility of myrevisionary. If you encounter any
              accessibility barriers or have suggestions for improvement, please contact us:
            </p>
            <div className="bg-neutral-50 rounded-lg p-6 mb-4">
              <p className="text-neutral-600 mb-2">
                <strong>Email:</strong> accessibility@myrevisionary.com
              </p>
              <p className="text-neutral-600 mb-2">
                <strong>Response time:</strong> We aim to respond within 5 business days
              </p>
            </div>
            <p className="text-neutral-600 mb-4">
              When contacting us, please include:
            </p>
            <ul className="list-disc pl-6 text-neutral-600 mb-4 space-y-2">
              <li>The web address (URL) of the content</li>
              <li>A description of the problem you experienced</li>
              <li>The assistive technology you were using (if any)</li>
              <li>Your browser and operating system</li>
            </ul>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-semibold text-neutral-900 mb-4">Enforcement Procedure</h2>
            <p className="text-neutral-600 mb-4">
              If you are not satisfied with our response to your accessibility concern, you can contact
              the Equality Advisory Support Service (EASS):
            </p>
            <ul className="list-disc pl-6 text-neutral-600 mb-4 space-y-2">
              <li>Website: equalityadvisoryservice.com</li>
              <li>Phone: 0808 800 0082</li>
              <li>Textphone: 0808 800 0084</li>
            </ul>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-semibold text-neutral-900 mb-4">Technical Specifications</h2>
            <p className="text-neutral-600 mb-4">
              The accessibility of myrevisionary relies on the following technologies:
            </p>
            <ul className="list-disc pl-6 text-neutral-600 mb-4 space-y-2">
              <li>HTML5</li>
              <li>WAI-ARIA</li>
              <li>CSS</li>
              <li>JavaScript</li>
            </ul>
            <p className="text-neutral-600 mb-4">
              These technologies are relied upon for conformance with the accessibility standards used.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-semibold text-neutral-900 mb-4">Assessment Approach</h2>
            <p className="text-neutral-600 mb-4">
              myrevisionary assesses the accessibility of our platform through:
            </p>
            <ul className="list-disc pl-6 text-neutral-600 mb-4 space-y-2">
              <li>Self-evaluation using accessibility testing tools</li>
              <li>Regular testing with screen readers and other assistive technologies</li>
              <li>User feedback and testing with disabled users</li>
              <li>Periodic external accessibility audits</li>
            </ul>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-semibold text-neutral-900 mb-4">Continuous Improvement</h2>
            <p className="text-neutral-600 mb-4">
              We are committed to continuously improving accessibility. Our roadmap includes:
            </p>
            <ul className="list-disc pl-6 text-neutral-600 mb-4 space-y-2">
              <li>Regular accessibility audits and remediation</li>
              <li>Staff training on accessibility best practices</li>
              <li>User testing with people who have disabilities</li>
              <li>Integrating accessibility into our development process</li>
            </ul>
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
