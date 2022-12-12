import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import useTerms from "../../hooks/queries/useTerms";
import { Post, Term } from "../../interfaces";
import usePostsOfCategory from "../../hooks/usePostsOfCategory";
import { CONFIG } from "../config";
import Head from "next/head";

const Category = () => {
  const router = useRouter();
  const { slug } = router.query;
  const { data: terms } = useTerms();

  const category: Term = terms?.data?.find((term: Term) => {
    return term.slug === slug;
  });

  const postsOfCategory: Post[] = usePostsOfCategory([category?.id || 0]);

  const layouts = [1, 2, 1, 1, 1, 1, 2, 2, 1];

  return (
    <div>
      <Head>
        <title>Category: {category?.name}</title>
      </Head>

      <div className="text-center">
        <h1 className="text-white text-[50px] font-bold">{category?.name}</h1>

        <span className="tracking-[2px] text-white text-[13px] font-bold">
          {postsOfCategory?.length} POSTS
        </span>
      </div>

      <div className="grid grid-cols-3 gap-8 container max-w-[1200px] mx-auto mt-[80px]">
        {postsOfCategory?.slice(0, 8).map((post: Post, i: number) => {
          return (
            <article
              style={{
                backgroundImage: `url(${CONFIG.API_URL}/images/${post.thumbnail})`,
              }}
              key={post.id}
              className={`hover:-top-2 top-0 ease-in duration-150 article relative w-full min-h-[370px] bg-cover rounded-[26px] p-10 cursor-pointer col-span-${layouts[i]}`}
            >
              <h2 className="text-white text-[30px] font-bold z-10 relative">
                <Link href={`/post/${post.slug}`}>{post.title}</Link>
              </h2>
            </article>
          );
        })}
      </div>
    </div>
  );
};

export default Category;
