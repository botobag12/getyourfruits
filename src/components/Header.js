import Link from "next/link";

export default function Header() {
  return (
    <header className="site-header">
      <div className="header-container">

        {/* Logo */}
        <Link href="/" className="logo-box">
          <img
            src="/mogo.png"
            alt="GetYourFruits Logo"
            className="site-logo"
           height={150}
           width={100}
          />
        </Link>

        {/* Navigation */}
        <nav className="main-nav">
          <Link href="/">Home</Link>
          <Link href="/blog">Blog</Link>
          <Link href="/categories">Categories</Link>
          <Link href="/about">About</Link>
          <Link href="/contact">Contact</Link>
        </nav>

        {/* Search */}
        <div className="header-search">
          <input
            type="text"
            placeholder="Search dry fruits..."
          />
          <button>🔍</button>
        </div>

      </div>
    </header>
  );
}