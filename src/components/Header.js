
import Image from "next/image";
import Link from "next/link";

export default function Header() {
  return (
    <header className="site-header">
      <Link
        href="/"
        className="logo-link"
        aria-label="GetYourFruits homepage"
      >
        <Image
          src="/logo.png"
          alt="GetYourFruits"
          width={180}
          height={60}
          priority
          className="site-logo"
        />
      </Link>

      <nav className="main-nav" aria-label="Main navigation">
        <Link href="/">Home</Link>
        <Link href="/blog">Blog</Link>
        <Link href="/categories">Categories</Link>
        <Link href="/about">About</Link>
        <Link href="/contact">Contact</Link>
      </nav>
    </header>
  );
}
