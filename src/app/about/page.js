import Header from "../../components/Header";
import Footer from "../../components/Footer";

export const metadata = {
  title: "About GetYourFruits",
  description:
    "Learn about GetYourFruits and our mission to share information about dry fruits from around the world.",
};

export default function AboutPage() {
  return (
    <>
      <Header />

      <main>

        <section className="page-hero">

          <span className="section-label">
            ABOUT US
          </span>

          <h1>About GetYourFruits</h1>

          <p>
            Discover the story behind our dry fruit information platform.
          </p>

        </section>


        <section className="knowledge-section">

          <div className="section-container">

            <div className="knowledge-content">

              <h2>
                Exploring the World of Dry Fruits
              </h2>

              <p>
                GetYourFruits is an information platform dedicated to
                dry fruits and dried fruits from around the world.
              </p>

              <p>
                We publish articles covering nutrition, cultivation,
                origins, history, production, uses, varieties and
                interesting facts.
              </p>

              <p>
                Our goal is to make dry fruit information easier to
                discover and understand.
              </p>

            </div>

          </div>

        </section>

      </main>

      <Footer />
    </>
  );
}