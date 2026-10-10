
import Link from "next/link";

export const metadata = {
  title: "Privacy Policy | GetYourFruits",
  description:
    "Read the GetYourFruits Privacy Policy to understand website data, cookies, analytics, advertising, and contact information practices.",
  alternates: {
    canonical: "https://www.getyourfruits.com/privacy",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function PrivacyPage() {
  return (
    <main className="info-page">
      <div className="info-container">
        <p className="eyebrow">WEBSITE POLICIES</p>
        <h1>Privacy Policy</h1>
        <p className="small-note">Last updated: October 10, 2026</p>

        <p>
          GetYourFruits respects the privacy of visitors
          to www.getyourfruits.com. This policy explains how information may
          be collected and used when you visit our website.
        </p>

        <h2>1. Information We Collect</h2>
        <p>
          You can browse our informational articles without creating an
          account. If you contact us by email, we may receive your email
          address and the information you choose to include in your message.
        </p>
        <p>
          Our hosting provider and website infrastructure may process
          technical information, such as IP addresses, browser details,
          requested pages, and server logs, to deliver and secure the website.
          The exact information depends on the services we use.
        </p>

        <h2>2. How We Use Information</h2>
        <p>Information may be used to:</p>
        <ul>
          <li>Operate, maintain, and protect the website.</li>
          <li>Respond to messages and feedback.</li>
          <li>Understand website performance if analytics are enabled.</li>
          <li>Detect technical issues, abuse, and security problems.</li>
        </ul>

        <h2>3. Cookies and Similar Technologies</h2>
        <p>
          The website or its third-party services may use cookies or similar
          technologies for essential functionality, analytics, or advertising,
          if those services are enabled. You can manage cookies through your
          browser settings. Where required by applicable law, we will provide
          appropriate consent choices before using non-essential technologies.
        </p>

        <h2>4. Analytics and Advertising</h2>
        <p>
          If we enable an analytics service, it may process information about
          how visitors use the website. If we display advertisements, advertising
          partners may use cookies or similar technologies as described in
          their own policies and subject to applicable requirements.
        </p>
        <p>
          This section describes possible future services. We will update this
          policy to identify the services actually used on the website before
          enabling them.
        </p>

        <h2>5. Sharing of Information</h2>
        <p>
          We do not sell personal information as a business practice. We may
          use service providers that process information on our behalf to host,
          secure, analyze, or operate the website. Information may also be
          disclosed when required by law or necessary to protect rights and
          security.
        </p>

        <h2>6. Data Retention and Security</h2>
        <p>
          Information is retained only for as long as reasonably necessary for
          the purpose for which it was collected, subject to legal and
          operational requirements. We take reasonable measures to protect
          information, but no internet transmission or storage system can be
          guaranteed to be completely secure.
        </p>

        <h2>7. Your Privacy Choices</h2>
        <p>
          Depending on your location and applicable law, you may have rights
          to request access to, correction of, or deletion of personal
          information. Contact us to make a request.
        </p>

        <h2>8. Children's Privacy</h2>
        <p>
          Our website provides general informational content and is not
          intended to collect personal information from children. Please
          contact us if you believe a child has provided personal information
          that should be addressed.
        </p>

        <h2>9. External Websites</h2>
        <p>
          Our articles may link to third-party websites. We are not responsible
          for their content, security, or privacy practices. Review their
          policies before sharing information with them.
        </p>

        <h2>10. Changes to This Policy</h2>
        <p>
          We may update this policy as our website and services change. Any
          updated version will be published on this page with a revised date.
        </p>

        <h2>11. Contact</h2>
        <p>
          For privacy-related questions, visit our <Link href="/contact">
          Contact page</Link>.
        </p>
      </div>
    </main>
  );
}
