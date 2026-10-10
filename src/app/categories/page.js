
import Link from "next/link";

export const metadata = {
  title: "Dry Fruit Categories | Explore GetYourFruits",
  description:
    "Explore dry-fruit and nut guides on GetYourFruits, including almonds, walnuts, pistachios, cashews, dates, raisins, and other varieties.",
  alternates: {
    canonical: "https://www.getyourfruits.com/categories",
  },
  openGraph: {
    title: "Explore Dry Fruit Categories",
    description:
      "Browse educational guides about dry fruits, nuts, nutrition, and everyday uses.",
    url: "https://www.getyourfruits.com/categories",
    type: "website",
  },
};

const categories = [
  {
    name: "Almonds",
    description:
      "Explore almond nutrition, varieties, storage, and ways to enjoy them.",
    slug: "almonds",
  },
  {
    name: "Walnuts",
    description:
      "Learn about walnut varieties, nutrients, culinary uses, and storage.",
    slug: "walnuts",
  },
  {
    name: "Pistachios",
    description:
      "Discover pistachio varieties, nutrition information, and serving ideas.",
    slug: "pistachios",
  },
  {
    name: "Cashews",
    description:
      "Read about cashews, their nutritional profile, and uses in recipes.",
    slug: "cashews",
  },
  {
    name: "Dates",
    description:
      "Learn about date varieties, storage, and their uses in everyday meals.",
    slug: "dates",
  },
  {
    name: "Raisins",
    description:
      "Explore raisins, how they are produced, and how to use them in food.",
    slug: "raisins",
  },
];

export default function CategoriesPage() {
  return (
    <main className="info-page">
      <div className="info-container">
        <p className="eyebrow">EXPLORE</p>
        <h1>Dry Fruit Categories</h1>
        <p className="info-intro">
          Explore our growing collection of guides to dry fruits, nuts,
          nutrition, storage, and everyday food uses.
        </p>

        <div className="category-grid">
          {categories.map((category) => (
            <article className="category-card" key={category.slug}>
              <h2>{category.name}</h2>
              <p>{category.description}</p>
              <Link href={`/blog?category=${category.slug}`}>
                Explore articles →
              </Link>
            </article>
          ))}
        </div>

        <p className="category-note">
          Our collection is growing. Browse the{" "}
          <Link href="/blog">latest articles</Link> to see all currently
          published posts.
        </p>
      </div>
    </main>
  );
}
