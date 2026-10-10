import { groq } from "next-sanity";

export const allPostsQuery = groq`
  *[_type == "post" && defined(slug.current)]
  | order(publishedAt desc) {
    _id,
    title,
    "slug": slug.current,
    publishedAt,
    mainImage {
      asset,
      alt
    },
    categories[]-> {
      title
    },
    author-> {
      name
    }
  }
`;
