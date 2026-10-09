import Header from "../../components/Header";
import Footer from "../../components/Footer";
import BlogCard from "../../components/BlogCard";

export const metadata = {
  title: "Dry Fruit Blog",
  description:
    "Read articles about dry fruit benefits, nutrition, origins, production, history and interesting facts.",
};

export default function BlogPage() {
  return (
    <>
      <Header />

      <main>

        <section className="page-hero">

          <span className="section-label">
            GETYOURFRUITS BLOG
          </span>

          <h1>Dry Fruit Knowledge & Articles</h1>

          <p>
            Explore informative articles about dry fruits,
            their origins, benefits, nutrition, production and history.
          </p>

        </section>


        <section className="articles-section">

          <div className="section-container">

            <div className="blog-grid">

              <BlogCard
                category="NUTRITION"
                title="10 Important Benefits of Eating Almonds"
                description="Discover the nutritional profile and commonly known benefits of almonds."
                emoji="🌰"
              />

              <BlogCard
                category="WORLD"
                title="Where Are Pistachios Grown?"
                description="Explore the world's major pistachio-producing regions."
                emoji="🥜"
              />

              <BlogCard
                category="HISTORY"
                title="The History of Dates"
                description="Learn about the long history and cultural importance of dates."
                emoji="🍇"
              />

              <BlogCard
                category="FACTS"
                title="Interesting Facts About Walnuts"
                description="Discover interesting facts about one of the world's oldest cultivated tree nuts."
                emoji="🌰"
              />

              <BlogCard
                category="HEALTH"
                title="Dry Fruits and a Balanced Diet"
                description="Explore how dry fruits can fit into a balanced eating pattern."
                emoji="🥜"
              />

              <BlogCard
                category="WORLD"
                title="Major Dry Fruit Producing Countries"
                description="Explore countries known for producing different types of dry fruits."
                emoji="🌍"
              />

            </div>

          </div>

        </section>

      </main>

      <Footer />
    </>
  );
}