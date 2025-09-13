import { Metadata } from "next";
import styles from "./index.module.scss";

interface Blog {
  title: string;
  slug: string;
  description: string;
  content: string;
  date: string;
}

async function getBlog(slug: string): Promise<Blog> {
  const res = await fetch(`https://sample-back-kmmb.onrender.com/api/blogs/${slug}`, {
    cache: "no-store",
  });
  if (!res.ok) throw new Error("Blog not found");
  return res.json();
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const blog = await getBlog(params.slug);
  return {
    title: blog.title,
    description: blog.description,
    openGraph: {
      title: blog.title,
      description: blog.description,
    },
  };
}

export default async function BlogPage({ params }: { params: { slug: string } }) {
  const blog = await getBlog(params.slug);
  return (
    <article className={styles.container}>
      <h1 className={styles.title}>{blog.title}</h1>
      <p className={styles.date}>{blog.date}</p>
      <div className={styles.content}>{blog.content}</div>
    </article>
  );
}
