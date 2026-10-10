
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PortableText } from "@portabletext/react";
import imageUrlBuilder from "@sanity/image-url";
import { groq } from "next-sanity";

import { client } from "../../../sanity/lib/client";

const SITE_URL = "https://www.getyourfruits.com";

const builder = imageUrlBuilder(client);

function urlFor(source) {
  return builder.image(source);
}

const articleQuery = groq`
  *[
    _type == "post" &&
    slug.current == $slug
  ][0] {
    _id,
    title,
    "slug": slug.current,
    publishedAt,
    excerpt,
    mainImage {
      asset,
      alt
    },
    author-> {
      name
    },
    categories[]-> {
      title
    },
    body
  }
`;

async function getArticle(slug) {
  return client.fetch(
    articleQuery,
    { slug },
    { next: { revalidate: 60 } }
  );
}

function formatDate(date) {
  if (!date) return null;

  const parsedDate = new Date(date);

  if (Number.isNaN(parsedDate.getTime())) {
    return null;
  }

  return new Intl.DateTimeFormat("en", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(parsedDate);
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const post = await getArticle(slug);

  if (!post) {
    return {
      title: "Article Not Found | GetYourFruits",
      robots: {
        index: false,
        follow: true,
      },
    };
  }

  const canonicalUrl = `${SITE_URL}/blog/${post.slug}`;

  return {
    title: `${post.title} | GetYourFruits`,
    description:
      post.excerpt ||
      `Read our guide to ${post.title}, with useful information and practical tips about dry fruits and nuts.`,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: post.title,
      description:
        post.excerpt ||
        `Discover more about ${post.title} on GetYourFruits.`,
      url: canonicalUrl,
      type: "article",
      images: post.mainImage?.asset
        ? [
            {
              url: urlFor(post.mainImage)
                .width(1200)
                .height(630)
                .fit("crop")
                .url(),
              alt: post.mainImage.alt || post.title,
            },
          ]
        : [],
    },
  };
}

const portableTextComponents = {
  types: {
    image: ({ value }) => {
      if (!value?.asset?._ref) return null;

      return (
        <figure className="article-inline-image">
          <Image
            src={urlFor(value)
              .width(1200)
              .fit("max")
              .auto("format")
              .url()}
            alt={value.alt || "GetYourFruits article image"}
            width={1200}
            height={800}
            sizes="(max-width: 768px) 100vw, 800px"
          />
          {value.caption && (
            <figcaption>{value.caption}</figcaption>
          )}
        </figure>
      );
    },
  },

  block: {
    h2: ({ children }) => <h2>{children}</h2>,
    h3: ({ children }) => <h3>{children}</h3>,
    blockquote: ({ children }) => (
      <blockquote>{children}</blockquote>
    ),
  },

  marks: {
    link: ({ children, value }) => {
      const href = value?.href || "";

      const isExternal =
        href.startsWith("https://") ||
        href.startsWith("http://");

      return (
        <a
          href={href || "#"}
          target={isExternal ? "_blank" : undefined}
          rel={isExternal ? "noopener noreferrer" : undefined}
        >
          {children}
        </a>
      );
    },
  },
};

export default async function ArticlePage({ params }) {
  const { slug } = await params;
  const post = await getArticle(slug);

  if (!post) {
    notFound();
  }

  const formattedDate = formatDate(post.publishedAt);

  return (
    <main className="article-page">
      <article className="article-container">
        <nav className="article-breadcrumb" aria-label="Breadcrumb">
          <Link href="/">Home</Link>
          <span aria-hidden="true"> / </span>
          <Link href="/blog">Blog</Link>
          <span aria-hidden="true"> / </span>
          <span>{post.title}</span>
        </nav>

        <header className="article-header">
          {post.categories?.length > 0 && (
            <div className="article-categories">
              {post.categories.map((category, index) => (
                <span key={`${category.title}-${index}`}>
                  {category.title}
                </span>
              ))}
            </div>
          )}

          <h1>{post.title}</h1>

          {post.excerpt && (
            <p className="article-excerpt">{post.excerpt}</p>
          )}

          <div className="article-meta">
            {post.author?.name && (
              <span>By {post.author.name}</span>
            )}

            {formattedDate && (
              <time dateTime={post.publishedAt}>
                {formattedDate}
              </time>
            )}
          </div>
        </header>

        {post.mainImage?.asset && (
          <div className="article-featured-image">
            <Image
              src={urlFor(post.mainImage)
                .width(1600)
                .fit("max")
                .auto("format")
                .url()}
              alt={post.mainImage.alt || post.title}
              width={1600}
              height={900}
              priority
              sizes="(max-width: 768px) 100vw, 1100px"
            />
          </div>
        )}

        <div className="article-body">
          {post.body?.length > 0 ? (
            <PortableText
              value={post.body}
              components={portableTextComponents}
            />
          ) : (
            <p>
              The full article content is not available yet.
              Please check back soon.
            </p>
          )}
        </div>

        <footer className="article-footer">
          <Link href="/blog" className="article-back-link">
            ← Back to All Articles
          </Link>
        </footer>
      </article>
    </main>
  );
}
