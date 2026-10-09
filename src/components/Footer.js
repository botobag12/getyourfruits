import Link from "next/link";

export default function Footer() {
  return (
    <footer className="site-footer">

      <div className="footer-container">

        <div className="footer-about">

          <h2>GetYourFruits</h2>

          <p>
            Exploring the world of dry fruits through information,
            nutrition, history, production, benefits and interesting facts.
          </p>

        </div>

        <div className="footer-links">

          <h3>Explore</h3>

          <Link href="/blog">Blog</Link>
          <Link href="/categories">Categories</Link>
          <Link href="/about">About Us</Link>
          <Link href="/contact">Contact</Link>

        </div>

        <div className="footer-links">

          <h3>Popular Topics</h3>

          <Link href="/blog">Almonds</Link>
          <Link href="/blog">Pistachios</Link>
          <Link href="/blog">Cashews</Link>
          <Link href="/blog">Walnuts</Link>

        </div>

      </div>

      <div className="footer-bottom">

        <p>
          © 2026 GetYourFruits. All rights reserved.
        </p>

        <p>
          Information about the world of dry fruits.
        </p>

      </div>

    </footer>
  );
}