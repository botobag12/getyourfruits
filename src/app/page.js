
import Image from "next/image";
import Link from "next/link";

export const metadata = {
  title: "Discover the World of Dry Fruits",
  description:
    "Explore dry fruits, nuts, their origins, nutrition information, storage tips, and helpful guides from around the world.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Discover the World of Dry Fruits | GetYourFruits",
    description:
      "Discover dry fruits, nuts, nutrition information, and practical guides.",
    url: "/",
    siteName: "GetYourFruits",
    type: "website",
    images: ["/banner.png"],
  },
};

const categories = [
  {
    icon: "🌰",
    title: "Nuts",
    description: "Discover almonds, walnuts, pistachios, and more.",
    href: "/categories/nuts",
  },
  {
    icon: "🍇",
    title: "Dried Fruits",
    description: "Explore dates, raisins, figs, and dried apricots.",
    href: "/categories/dried-fruits",
  },
  {
    icon: "🌿",
    title: "Nutrition",
    description: "Learn about nutrients and food information.",
    href: "/categories/nutrition",
  },
  {
    icon: "📚",
    title: "Helpful Guides",
    description: "Find guides to storage, selection, and buying.",
    href: "/categories/guides",
  },
];

export default function HomePage() {
  return (
    <>
      {/* Hero banner */}
      <section className="hero" aria-labelledby="hero-title">
        <Image
          src="/banner.png"
          alt="An assortment of dry fruits and nuts"
          fill
          priority
          sizes="100vw"
          className="hero-image"
        />

        <div className="hero-overlay" />

        <div className="hero-content">
          <p className="eyebrow">Explore. Learn. Discover.</p>

          <h1 id="hero-title">
            Discover the World of Dry Fruits
          </h1>

          <p className="hero-description">
            Explore dry-fruit varieties, their origins, nutrition
            information, storage advice, and practical guides
            from around the world.
          </p>

          <Link href="/blog" className="hero-button">
            Explore Our Articles
          </Link>
        </div>

        <a href="#categories" className="scroll-indicator">
          <span>Scroll to explore</span>
          <span aria-hidden="true">↓</span>
        </a>
      </section>

      {/* Introduction */}
      <section className="intro section-padding">
        <p className="eyebrow">Welcome to GetYourFruits</p>

        <h2>Your Guide to Dry Fruits and Nuts</h2>

        <p>
          Learn about different varieties, where they come from,
          their nutritional properties, storage methods, and
          how they are used around the world.
        </p>
      </section>

      {/* Categories */}
      <section
        id="categories"
        className="categories section-padding"
        aria-labelledby="categories-title"
      >
        <p className="eyebrow">Explore Our Topics</p>

        <h2 id="categories-title">
          Discover Something New
        </h2>

        <div className="category-grid">
          {categories.map((category) => (
            <Link
              key={category.title}
              href={category.href}
              className="category-card"
            >
              <span className="category-icon" aria-hidden="true">
                {category.icon}
              </span>

              <h3>{category.title}</h3>

              <p>{category.description}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* Latest articles placeholder */}
      <section className="latest-articles section-padding">
        <p className="eyebrow">From Our Blog</p>

        <h2>Latest Articles</h2>

        <p>
          Discover informative articles about dry fruits,
          their varieties, origins, nutrition, and storage.
          Our published articles will appear here when we
          connect the homepage to Sanity.
        </p>

        <Link href="/blog" className="text-link">
          Browse All Articles →
        </Link>
      </section>
    </>
  );
}
