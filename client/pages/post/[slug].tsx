import React, { useState } from "react";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { Comment as CommentInterface, Post, Term } from "../../interfaces";
import useCategoriesOfPost from "../../hooks/useCategoriesOfPost";
import usePostDetail from "../../hooks/usePostDetail";
import usePostsOfCategory from "../../hooks/usePostsOfCategory";
import { CONFIG } from "../../config";
import Input from "../../components/Input";
import Textarea from "../../components/Textarea";
import Button from "../../components/Button";
import useCommentsByPost from "../../hooks/useCommentsByPost";
import Comment from "../../components/Comment";
import { postComment } from "../../services/comment";

const PostDetail = () => {
  const router = useRouter();
  const { slug } = router.query;
  const [formData, setFormData] = useState<{
    name: string;
    email: string;
    content: string;
  }>({
    name: "",
    email: "",
    content: "",
  });

  const postDetail: Post = usePostDetail(slug as string);
  const categoriesOfPost: Term[] = useCategoriesOfPost(postDetail);
  const comments: Comment[] = useCommentsByPost(postDetail?.id);
  let postsOfCategory: Post[] = usePostsOfCategory(
    postDetail?.categories || []
  );

  postsOfCategory = postsOfCategory?.filter((post: Post) => {
    return post.id !== postDetail.id;
  });

  const handlePostComment = async (e: React.SyntheticEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.content) {
      window.alert("Please enter full information");
    } else {
      postComment({
        postId: postDetail.id,
        name: formData.name,
        email: formData.email,
        content: formData.content,
        allow: false,
        createdAt: Date.now(),
      });
    }
  };

  const handleChangeValue =
    (field: "name" | "email" | "content") =>
    (
      e:
        | React.FormEvent<HTMLInputElement>
        | React.FormEvent<HTMLTextAreaElement>
    ) => {
      setFormData({
        ...formData,
        [field]: e.currentTarget.value,
      });
    };

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

        <div className="container mx-auto max-w-[700px]">
          <h2 className="text-white text-[36px] font-bold">Leave a comment</h2>

          <form
            onSubmit={handlePostComment}
            className="grid grid-cols-2 gap-x-8"
          >
            <div>
              <Input
                onChange={handleChangeValue("name")}
                placeholder="Your name*"
                required
                className="w-full"
              />
            </div>

            <div>
              <Input
                onChange={handleChangeValue("email")}
                placeholder="Your email*"
                required
                type="email"
                className="w-full"
              />
            </div>

            <div className="col-span-2">
              <Textarea
                onChange={handleChangeValue("content")}
                required
                placeholder="Your comment*"
                className="w-full"
              />
            </div>

            <div>
              <Button>Post a comment</Button>
            </div>
          </form>
        </div>

        <div className="container mx-auto max-w-[700px] mt-[30px]">
          {comments?.map((comment: CommentInterface) => {
            return <Comment key={comment.id} data={comment} />;
          })}
        </div>

        <div className="container mx-auto max-w-[1200px] mt-[60px]">
          <h2 className="text-white text-[36px] font-bold">Related posts</h2>

          <div className="grid grid-cols-3 gap-8 container max-w-[1200px] mx-auto mt-[30px]">
            {postsOfCategory?.slice(0, 3).map((post: Post) => {
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
