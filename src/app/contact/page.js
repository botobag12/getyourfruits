import Header from "../../components/Header";
import Footer from "../../components/Footer";

export const metadata = {
  title: "Contact GetYourFruits",
  description:
    "Contact GetYourFruits for questions, suggestions and business inquiries.",
};

export default function ContactPage() {
  return (
    <>
      <Header />

      <main>

        <section className="page-hero">

          <span className="section-label">
            GET IN TOUCH
          </span>

          <h1>Contact GetYourFruits</h1>

          <p>
            Have a question, suggestion or business inquiry?
          </p>

        </section>


        <section className="contact-section">

          <div className="contact-box">

            <h2>Send Us a Message</h2>

            <input
              type="text"
              placeholder="Your Name"
            />

            <input
              type="email"
              placeholder="Your Email"
            />

            <textarea
              placeholder="Your Message"
              rows="6"
            />

            <button>
              Send Message
            </button>

          </div>

        </section>

      </main>

      <Footer />
    </>
  );
}