import Link from "next/link";
import Header from "../components/Header";
import Footer from "../components/Footer";
import BlogCard from "../components/BlogCard";

export const metadata = {
  title: "GetYourFruits | Discover the World of Dry Fruits",
  description:
    "Discover dry fruit benefits, nutrition, origins, production, history, recipes and interesting facts from around the world.",
};

export default function Home() {
  return (
    <>
      <Header />

      <main>

        {/* HERO SECTION */}
        <section className="hero">

          <div className="hero-content">

            <span className="hero-label">
              THE WORLD OF DRY FRUITS
            </span>

            <h1>
              Discover the
              <span> World of Dry Fruits</span>
            </h1>

            <p>
              Explore the fascinating world of almonds, pistachios,
              cashews, walnuts, dates and other dry fruits. Discover
              their origins, nutritional value, benefits, production,
              history and much more.
            </p>

            <div className="hero-buttons">

              <Link href="/blog" className="primary-button">
                Explore Articles
              </Link>

              <Link href="/categories" className="secondary-button">
                Browse Categories
              </Link>

            </div>

          </div>

          <div className="hero-visual">

            <div className="fruit-circle">

              <div>🌰</div>
              <div>🥜</div>
              <div>🫘</div>
              <div>🍇</div>

            </div>

          </div>

        </section>


        {/* INTRODUCTION */}
        <section className="intro-section">

          <div className="section-container">

            <span className="section-label">
              WELCOME TO GETYOURFRUITS
            </span>

            <h2>
              Everything You Want to Know About Dry Fruits
            </h2>

            <p>
              Dry fruits have been part of human diets and cultures for
              thousands of years. From the almond orchards of Central
              Asia to pistachio farms in Iran and California, dry fruits
              have an interesting story behind them.
            </p>

            <p>
              GetYourFruits brings together useful information about
              dry fruits from around the world in one place.
            </p>

          </div>

        </section>


        {/* CATEGORIES */}
        <section className="categories-section">

          <div className="section-container">

            <div className="section-heading">

              <div>
                <span className="section-label">
                  EXPLORE
                </span>

                <h2>Popular Dry Fruits</h2>
              </div>

              <Link href="/categories">
                View All Categories →
              </Link>

            </div>


            <div className="category-grid">

              <Link href="/blog" className="category-card">
                <span>🌰</span>
                <h3>Almonds</h3>
                <p>
                  Nutrition, benefits, origin and production.
                </p>
              </Link>

              <Link href="/blog" className="category-card">
                <span>🥜</span>
                <h3>Pistachios</h3>
                <p>
                  Discover pistachio varieties and their history.
                </p>
              </Link>

              <Link href="/blog" className="category-card">
                <span>🫘</span>
                <h3>Cashews</h3>
                <p>
                  From cultivation to nutritional information.
                </p>
              </Link>

              <Link href="/blog" className="category-card">
                <span>🌰</span>
                <h3>Walnuts</h3>
                <p>
                  Learn about walnuts and their global production.
                </p>
              </Link>

            </div>

          </div>

        </section>


        {/* FEATURED ARTICLES */}
        <section className="articles-section">

          <div className="section-container">

            <div className="section-heading">

              <div>

                <span className="section-label">
                  FROM THE BLOG
                </span>

                <h2>Latest Dry Fruit Articles</h2>

              </div>

              <Link href="/blog">
                View All Articles →
              </Link>

            </div>


            <div className="blog-grid">

              <BlogCard
                category="NUTRITION"
                title="10 Important Benefits of Eating Almonds"
                description="Learn about the nutritional value and commonly discussed benefits of almonds."
                emoji="🌰"
              />

              <BlogCard
                category="WORLD"
                title="Where Are Pistachios Grown Around the World?"
                description="Explore major pistachio-producing regions and how pistachios are cultivated."
                emoji="🥜"
              />

              <BlogCard
                category="FACTS"
                title="Interesting Facts About Dates"
                description="Discover the history, cultivation and cultural importance of dates."
                emoji="🍇"
              />

            </div>

          </div>

        </section>


        {/* SEO CONTENT SECTION */}
        <section className="knowledge-section">

          <div className="section-container">

            <div className="knowledge-content">

              <span className="section-label">
                DRY FRUIT KNOWLEDGE
              </span>

              <h2>
                Learn About Dry Fruits From Around the World
              </h2>

              <p>
                Dry fruits are produced in many regions across the
                world. Different climates, farming techniques and
                traditions have influenced the varieties available today.
              </p>

              <p>
                Our articles explore dry fruit nutrition, farming,
                harvesting, processing, storage, history, trade,
                traditional uses and interesting facts.
              </p>

              <Link href="/blog" className="primary-button">
                Start Exploring
              </Link>

            </div>

          </div>

        </section>


        {/* NEWSLETTER */}
        <section className="newsletter">

          <div className="newsletter-container">

            <span className="section-label">
              STAY UPDATED
            </span>

            <h2>
              Get New Dry Fruit Articles
            </h2>

            <p>
              Stay informed with new articles, facts and stories about
              dry fruits from around the world.
            </p>

            <div className="newsletter-form">

              <input
                type="email"
                placeholder="Enter your email address"
              />

              <button>
                Subscribe
              </button>

            </div>

          </div>

        </section>

      </main>

      <Footer />
    </>
  );
}