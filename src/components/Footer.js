
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="site-footer">
      <p>
        © {new Date().getFullYear()} GetYourFruits.
        {" "}All rights reserved.
      </p>

      <nav className="footer-links" aria-label="Footer navigation">
        
        <Link href="/blog">Blog</Link>
        <Link href="/about">About Us</Link>
        <Link href="/contact">Contact</Link>
       
         
  <Link href="/categories">Categories</Link>
   <Link href="/privacy">Privacy Policy</Link>
 <Link href="/terms">Terms and Conditions</Link>
      </nav>
    </footer>
  );
}
