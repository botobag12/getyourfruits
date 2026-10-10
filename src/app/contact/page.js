
import Link from "next/link";

export const metadata = {
  title: "Contact GetYourFruits | Questions and Feedback",
  description:
    "Contact GetYourFruits with questions, article feedback, corrections, or suggestions about our dry-fruit and nutrition guides.",
  alternates: {
    canonical: "https://www.getyourfruits.com/contact",
  },
  openGraph: {
    title: "Contact GetYourFruits",
    description:
      "Send feedback, questions, and suggestions to the GetYourFruits team.",
    url: "https://www.getyourfruits.com/contact",
    type: "website",
  },
};

export default function ContactPage() {
  return (
    <main className="info-page">
      <div className="info-container">
        <p className="eyebrow">GET IN TOUCH</p>
        <h1>Contact GetYourFruits</h1>

        <p className="info-intro">
          We welcome your questions, suggestions, feedback, and corrections.
        </p>

        <h2>How Can We Help?</h2>
        <p>
          Contact us about an article, suggest a topic you would like us to
          cover, or let us know if you find information that needs correction.
        </p>

        <h2>Email Us</h2>
       <a
  href="mailto:botobag47@gmail.com"
  className="contact-email-icon"
  aria-label="Email GetYourFruits"
  title="Email us"
>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <rect x="3" y="5" width="18" height="14" rx="2" />
    <path d="m3 7 9 6 9-6" />
  </svg>
</a>

        <h2>Before Contacting Us</h2>
        <p>
          Please include the relevant article URL and enough context to help
          us understand your question. Please do not send passwords or other
          sensitive personal information.
        </p>

        <p>
          For information about how we handle information submitted to us,
          read our <Link href="/privacy">Privacy Policy</Link>.
        </p>
      </div>
    </main>
  );
}
