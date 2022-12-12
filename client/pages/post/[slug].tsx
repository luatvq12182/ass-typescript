import React from "react";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { Post, Term } from "../../interfaces";
import useCategoriesOfPost from "../../hooks/useCategoriesOfPost";
import usePostDetail from "../../hooks/usePostDetail";
import usePostsOfCategory from "../../hooks/usePostsOfCategory";
import { CONFIG } from "../../config";

const PostDetail = () => {
  const router = useRouter();
  const { slug } = router.query;

  const postDetail: Post = usePostDetail(slug as string);
  const categoriesOfPost: Term[] = useCategoriesOfPost(postDetail);
  let postsOfCategory: Post[] = usePostsOfCategory(
    postDetail?.categories || []
  );

  postsOfCategory = postsOfCategory?.filter((post: Post) => {
    return post.id !== postDetail.id;
  });

  return (
    <div className="container mx-auto">
      <Head>
        <title>{postDetail?.title}</title>
      </Head>

      <article>
        <div className="grid grid-cols-2 gap-20">
          <div
            className="h-[470px] bg-cover rounded-md"
            style={{
              backgroundImage: `url(${CONFIG.API_URL}/images/${postDetail?.thumbnail})`,
            }}
          ></div>

          <div className="flex flex-col justify-center">
            <div className="mb-[30px]">
              {categoriesOfPost?.map((category: Term) => {
                return (
                  <Link key={category.id} href={`/category/${category.slug}`}>
                    <span className="uppercase hover:bg-[#e7a007] duration-150 font-bold text-[10px] text-white bg-[#414242] mr-2 p-1 px-2 tracking-[1.5px] rounded-[30px]">
                      {category.name}
                    </span>
                  </Link>
                );
              })}
            </div>

            <h1 className="text-white text-[48px] font-bold">
              {postDetail?.title}
            </h1>
          </div>
        </div>

        <div className="max-w-[1200px] mx-auto bg-[#222327] relative -top-[40px] rounded-[26px] p-[80px]">
          <div
            className="text-[19px] text-white max-w-[700px] mx-auto"
            dangerouslySetInnerHTML={{
              __html: postDetail?.content,
            }}
          ></div>
        </div>

        <div className="container mx-auto max-w-[1200px]">
          <h2 className="text-white text-[36px] font-bold">Related posts</h2>

          <div className="grid grid-cols-3 gap-8 container max-w-[1200px] mx-auto mt-[30px]">
            {postsOfCategory?.slice(0, 3).map((post: Post, i: number) => {
              return (
                <article
                  style={{
                    backgroundImage: `url(${CONFIG.API_URL}/images/${post.thumbnail})`,
                  }}
                  key={post.id}
                  className={`hover:-top-2 top-0 ease-in duration-150 article relative w-full min-h-[370px] bg-cover rounded-[26px] p-10 cursor-pointer`}
                >
                  <h2 className="text-white text-[30px] font-bold z-10 relative">
                    <Link href={`/post/${post.slug}`}>{post.title}</Link>
                  </h2>
                </article>
              );
            })}
          </div>
        </div>
      </article>
    </div>
  );
};

export default PostDetail;
