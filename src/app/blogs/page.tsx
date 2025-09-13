"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import styles from "./index.module.scss";

interface Blog {
  title: string;
  slug: string;
  description: string;
  date: string;
}

export default function BlogsPage() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetch("https://sample-back-kmmb.onrender.com/api/blogs")
      .then(res => res.json())
      .then(data => setBlogs(data));
  }, []);

  const filtered = blogs.filter(
    b =>
      b.title.toLowerCase().includes(search.toLowerCase()) ||
      b.description.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>Blogs</h1>
      <input
        type="text"
        placeholder="Search blogs..."
        value={search}
        onChange={e => setSearch(e.target.value)}
        className={styles.search}
      />
      <ul className={styles.blogList}>
        {filtered.map(blog => (
          <li key={blog.slug} className={styles.blogItem}>
            <Link href={`/blog/${blog.slug}`} className={styles.blogTitle}>
              {blog.title}
            </Link>
            <p className={styles.blogDesc}>{blog.description}</p>
            <small className={styles.blogDate}>{blog.date}</small>
          </li>
        ))}
      </ul>
    </div>
  );
}
