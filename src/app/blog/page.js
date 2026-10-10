
import imageUrlBuilder from "@sanity/image-url";
import Image from "next/image";
import Link from "next/link";
import { client } from "../../sanity/lib/client";
import { allPostsQuery } from "../lib/queries";

const imageBuilder = imageUrlBuilder(client);

function getImageUrl(source) {
  if (!source) return null;
  return imageBuilder.image(source).width(600).height(400).fit("crop").url();
}

export const metadata = {
  title: "Dry Fruit Articles and Guides",
  description:
    "Explore informative articles about dry fruits, nuts, nutrition, origins, storage, and helpful guides.",
  alternates: {
    canonical: "/blog",
  },
};

function formatDate(date) {
  if (!date) return "Recently published";

  return new Intl.DateTimeFormat("en", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(new Date(date));
}

export default async function BlogPage() {
  const posts = await client.fetch(allPostsQuery);


  return (
    <>
      <section className="blog-hero">
        <div className="blog-hero-content">
          <p className="eyebrow">The GetYourFruits Journal</p>
          <h1>Explore Our Articles</h1>
          <p>
            Discover dry-fruit varieties, their origins,
            nutrition information, storage tips, and practical
            guides to help you learn more.
          </p>
        </div>
      </section>

      <section className="blog-section section-padding">
        <div className="blog-section-heading">
          <div>
            <p className="eyebrow">Fresh Knowledge</p>
            <h2>All Articles</h2>
          </div>

          <p className="blog-count">
            {posts.length} {posts.length === 1 ? "article" : "articles"}
          </p>
        </div>

        {posts.length > 0 ? (
          <div className="blog-grid">
            {posts.map((post) => (
              <article className="blog-card" key={post._id}>
                <Link
                  href={`/blog/${post.slug}`}
                  className="blog-card-image-link"
                >
                  {post.mainImage?.asset ? (
                    <div className="blog-card-image">
                      <Image
                        src={getImageUrl(post.mainImage)}
                        alt={
                          post.mainImage.alt ||
                          post.title ||
                          "Dry fruit article image"
                        }
                        fill
                        sizes="(max-width: 650px) 100vw, (max-width: 1000px) 50vw, 33vw"
                      />
                    </div>
                  ) : (
                    <div className="blog-card-image blog-card-placeholder">
                      <span aria-hidden="true">🌿</span>
                    </div>
                  )}
                </Link>

                <div className="blog-card-content">
                  <p className="blog-card-date">
                    {formatDate(post.publishedAt)}
                  </p>

                  <h3>
                    <Link href={`/blog/${post.slug}`}>
                      {post.title}
                    </Link>
                  </h3>

                  {post.categories?.length > 0 && (
                    <div className="blog-card-categories">
                      {post.categories.map((category, index) => (
                        <span key={`${category.title}-${index}`}>
                          {category.title}
                        </span>
                      ))}
                    </div>
                  )}

                  {post.author?.name && (
                    <p className="blog-card-author">
                      By {post.author.name}
                    </p>
                  )}

                  <Link
                    href={`/blog/${post.slug}`}
                    className="blog-read-more"
                  >
                    Read Article <span aria-hidden="true">→</span>
                  </Link>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="blog-empty">
            <span aria-hidden="true">📚</span>
            <h3>Our articles are coming soon</h3>
            <p>
              We're preparing informative guides about dry fruits
              and nuts. Please check back soon.
            </p>
            <Link href="/" className="hero-button">
              Return Home
            </Link>
          </div>
        )}
      </section>
    </>
  );
}




