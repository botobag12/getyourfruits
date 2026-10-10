
import Link from "next/link";

export const metadata = {
  title: "About GetYourFruits | Your Guide to Dry Fruits",
  description:
    "Discover GetYourFruits, an informational resource for learning about dry fruits, nuts, their nutrition, uses, storage, and everyday food choices.",
  alternates: {
    canonical: "https://www.getyourfruits.com/about",
  },
  openGraph: {
    title: "About GetYourFruits",
    description:
      "Learn about our mission to make dry-fruit information accessible and useful.",
    url: "https://www.getyourfruits.com/about",
    type: "website",
  },
};

export default function AboutPage() {
  return (
    <main className="info-page">
      <div className="info-container">
        <p className="eyebrow">ABOUT US</p>
        <h1>About GetYourFruits</h1>

        <p className="info-intro">
          Your guide to understanding dry fruits, nuts, nutrition, and
          everyday food choices.
        </p>

        <h2>Our Mission</h2>
        <p>
          GetYourFruits is an informational website created to help readers
          learn more about dry fruits, nuts, seeds, and related foods. We
          publish accessible articles covering their nutritional properties,
          common uses, storage, varieties, and place in a balanced diet.
        </p>

        <h2>What You Can Find Here</h2>
        <ul>
          <li>Informative guides about different dry fruits and nuts.</li>
          <li>Nutrition facts explained in straightforward language.</li>
          <li>Practical food storage and preparation tips.</li>
          <li>Ideas for including dry fruits in everyday meals.</li>
          <li>Articles that help readers explore different varieties.</li>
        </ul>

        <h2>Our Approach to Content</h2>
        <p>
          We aim to publish useful, readable, and carefully prepared
          information. Nutrition-related articles are intended for general
          education and are not a substitute for personalized medical advice.
          Readers should consult qualified professionals for individual
          health concerns.
        </p>

        <h2>Explore GetYourFruits</h2>
        <p>
          Visit our <Link href="/blog">latest articles</Link> or browse our{" "}
          <Link href="/categories">categories</Link> to discover more.
        </p>

        <h2>Get in Touch</h2>
        <p>
          Have a question, suggestion, or correction? Please visit our{" "}
          <Link href="/contact">Contact page</Link>.
        </p>
      </div>
    </main>
  );
}
