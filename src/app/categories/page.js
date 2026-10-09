import Link from "next/link";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

export const metadata = {
  title: "Dry Fruit Categories",
  description:
    "Explore GetYourFruits categories covering almonds, pistachios, cashews, walnuts, dates and other dry fruits.",
};

export default function CategoriesPage() {
  const categories = [
    ["🌰", "Almonds", "Everything about almonds, from nutrition to cultivation."],
    ["🥜", "Pistachios", "Pistachio varieties, origins, farming and global production."],
    ["🫘", "Cashews", "Learn about cashew cultivation, processing and nutrition."],
    ["🌰", "Walnuts", "Walnut history, varieties, benefits and production."],
    ["🍇", "Dates", "Explore dates, their cultivation, varieties and cultural history."],
    ["🌍", "Global Dry Fruits", "Stories and information about dry fruits around the world."],
  ];

  return (
    <>
      <Header />

      <main>

        <section className="page-hero">

          <span className="section-label">
            EXPLORE
          </span>

          <h1>Dry Fruit Categories</h1>

          <p>
            Browse our growing collection of dry fruit topics.
          </p>

        </section>


        <section className="categories-section">

          <div className="section-container">

            <div className="category-grid large">

              {categories.map((category, index) => (

                <Link href="/blog" className="category-card" key={index}>

                  <span>{category[0]}</span>

                  <h3>{category[1]}</h3>

                  <p>{category[2]}</p>

                  <strong>
                    Explore →
                  </strong>

                </Link>

              ))}

            </div>

          </div>

        </section>

      </main>

      <Footer />
    </>
  );
}