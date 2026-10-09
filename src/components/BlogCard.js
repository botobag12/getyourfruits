import Link from "next/link";

export default function BlogCard({
  category,
  title,
  description,
  emoji,
}) {
  return (
    <article className="blog-card">

      <div className="blog-image">
        <span>{emoji}</span>
      </div>

      <div className="blog-content">

        <span className="blog-category">
          {category}
        </span>

        <h3>{title}</h3>

        <p>{description}</p>

        <Link href="/blog">
          Read Article →
        </Link>

      </div>

    </article>
  );
}