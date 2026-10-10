import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import imageUrlBuilder from "@sanity/image-url";
import { client } from "../../../sanity/lib/client";

const imageBuilder = imageUrlBuilder(client);

const categoryDetails = {
  nuts: {
    title: "Nuts",
    description:
      "Explore almonds, walnuts, pistachios, cashews, and other nuts, including their origins, nutritional properties, and storage tips.",
  },
  "dried-fruits": {
    title: "Dried Fruits",
    description:
      "Discover dates, raisins, figs, dried apricots, and other dried fruits, with helpful information about varieties, nutrition, and storage.",
  },
  nutrition: {
    title: "Nutrition",
    description:
      "Learn about the nutritional properties of dry fruits, their nutrients, and how they can fit into a balanced diet.",
  },
  guides: {
    title: "Helpful Guides",
    description:
      "Find practical guides to selecting, storing, and buying dry fruits and nuts.",
  },
};

const categoryQuery = `*[_type == "category" && slug.current == $slug][0] {
  _id,
  title,
  "slug": slug.current,
  description
}`;

const postsQuery = `*[
  _type == "post" &&
  references($categoryId)
] | order(publishedAt desc, _createdAt desc) {
  _id,
  title,
  "slug": slug.current,
  excerpt,
  publishedAt,
  mainImage
}`;

function getImageUrl(image) {
  if (!image) return null;

  return imageBuilder
    .image(image)
    .width(600)
    .height(400)
    .fit("crop")
    .url();
}

function formatDate(date) {
  if (!date) return "";

  return new Intl.DateTimeFormat("en", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(new Date(date));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const fallback = categoryDetails[slug];

  const category = await client.fetch(categoryQuery, { slug });

  if (!category && !fallback) {
    return {
      title: "Category Not Found | GetYourFruits",
    };
  }

  const title = category?.title || fallback.title;
  const description =
    category?.description || fallback.description;

  return {
    title: `${title} | Dry Fruit Articles`,
    description,
    alternates: {
      canonical: `https://www.getyourfruits.com/categories/${slug}`,
    },
    openGraph: {
      title: `${title} | GetYourFruits`,
      description,
      url: `https://www.getyourfruits.com/categories/${slug}`,
      siteName: "GetYourFruits",
      type: "website",
    },
  };
}

export default async function CategoryPage({ params }) {
  const { slug } = await params;
  const fallback = categoryDetails[slug];

  if (!fallback) {
    notFound();
  }

  const category = await client.fetch(categoryQuery, { slug });

  const posts = category
    ? await client.fetch(postsQuery, {
        categoryId: category._id,
      })
    : [];

  const title = category?.title || fallback.title;
  const description =
    category?.description || fallback.description;

  return (
    <main className="category-page info-page">
      <div className="info-container">
        <nav className="breadcrumbs" aria-label="Breadcrumb">
          <Link href="/">Home</Link>
          {" / "}
          <Link href="/categories">Categories</Link>
          {" / "}
          <span>{title}</span>
        </nav>

        <header className="category-header">
          <p className="eyebrow">Explore Our Topics</p>
          <h1>{title}</h1>
          <p>{description}</p>
        </header>

        <section
          className="category-articles"
          aria-labelledby="category-articles-title"
        >
          <h2 id="category-articles-title">
            Articles about {title}
          </h2>

          {posts.length > 0 ? (
            <div className="category-article-grid">
              {posts.map((post) => {
                const imageUrl = getImageUrl(post.mainImage);

                return (
                  <article
                    className="category-article-card"
                    key={post._id}
                  >
                    <Link
                      href={`/blog/${post.slug}`}
                      className="category-article-image"
                    >
                      {imageUrl ? (
                        <Image
                          src={imageUrl}
                          alt={
                            post.mainImage?.alt ||
                            post.title
                          }
                          width={600}
                          height={400}
                        />
                      ) : (
                        <div className="category-image-placeholder">
                          GetYourFruits
                        </div>
                      )}
                    </Link>

                    <div className="category-article-content">
                      {post.publishedAt && (
                        <p className="article-date">
                          {formatDate(post.publishedAt)}
                        </p>
                      )}

                      <h3>
                        <Link href={`/blog/${post.slug}`}>
                          {post.title}
                        </Link>
                      </h3>

                      {post.excerpt && (
                        <p>{post.excerpt}</p>
                      )}

                      <Link
                        href={`/blog/${post.slug}`}
                        className="text-link"
                      >
                        Read Article →
                      </Link>
                    </div>
                  </article>
                );
              })}
            </div>
          ) : (
            <div className="empty-category">
              <h3>Articles are coming soon</h3>
              <p>
                We are preparing informative articles for this
                category. In the meantime, explore our existing
                articles about dry fruits and nuts.
              </p>
              <Link href="/blog" className="text-link">
                Browse All Articles →
              </Link>
            </div>
          )}
        </section>
      </div>
    </main>
  );
}