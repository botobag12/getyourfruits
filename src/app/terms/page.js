
import Link from "next/link";

export const metadata = {
  title: "Terms and Conditions | GetYourFruits",
  description:
    "Read the Terms and Conditions for using GetYourFruits, including website content, acceptable use, external links, and educational disclaimers.",
  alternates: {
    canonical: "https://www.getyourfruits.com/terms",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function TermsPage() {
  return (
    <main className="info-page">
      <div className="info-container">
        <p className="eyebrow">WEBSITE POLICIES</p>
        <h1>Terms and Conditions</h1>
        <p className="small-note">Last updated: October 10, 2026</p>

        <p>
          Welcome to GetYourFruits. By accessing or using
          www.getyourfruits.com, you agree to these Terms and Conditions. If
          you do not agree with them, please discontinue using the website.
        </p>

        <h2>1. Website Purpose</h2>
        <p>
          GetYourFruits publishes informational content about dry fruits,
          nuts, food, nutrition, storage, and related topics. The website is
          provided for general educational and informational purposes.
        </p>

        <h2>2. No Medical or Professional Advice</h2>
        <p>
          Our content is not a substitute for personalized medical, dietary,
          or other professional advice. Nutritional needs vary between
          individuals. Consult a qualified professional for advice specific
          to your circumstances, and do not delay seeking care based on
          something you read on this website.
        </p>

        <h2>3. Accuracy of Information</h2>
        <p>
          We aim to provide useful and accurate information, but we cannot
          guarantee that every article is complete, current, or free from
          errors. Product composition and nutritional values may vary by
          variety, brand, serving size, and preparation method.
        </p>

        <h2>4. Acceptable Use</h2>
        <p>
          You agree not to misuse the website, attempt unauthorized access,
          interfere with its operation, introduce malicious code, or use the
          website in a way that violates applicable law.
        </p>

        <h2>5. Intellectual Property</h2>
        <p>
          Unless otherwise stated, website text, design elements, branding,
          and original materials are owned by or used with permission by
          GetYourFruits. You may link to our public pages. You may not
          reproduce or republish substantial portions of our content for
          commercial use without appropriate permission, except where
          permitted by law.
        </p>

        <h2>6. External Links</h2>
        <p>
          We may link to third-party websites for additional information.
          These links are provided for convenience and do not necessarily
          represent an endorsement. We are not responsible for external
          websites or their practices.
        </p>

        <h2>7. Limitation of Liability</h2>
        <p>
          To the extent permitted by applicable law, GetYourFruits is not
          liable for losses arising from reliance on website information,
          temporary service interruptions, or third-party websites. Nothing
          in these terms excludes liability that cannot lawfully be excluded.
        </p>

        <h2>8. Changes to the Website and Terms</h2>
        <p>
          We may modify website content or these terms as the website develops.
          Updated terms will be posted on this page with a revised date.
        </p>

        <h2>9. Applicable Law</h2>
        <p>
          These terms are subject to applicable laws. Any specific governing
          law or dispute provisions should be added after appropriate legal
          review for the operator and audience of this website.
        </p>

        <h2>10. Contact</h2>
        <p>
          If you have questions about these terms, visit our{" "}
          <Link href="/contact">Contact page</Link>.
        </p>
      </div>
    </main>
  );
}
