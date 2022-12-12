import Head from "next/head";
import Link from "next/link";
import usePosts from "../hooks/queries/usePosts";
import { Post } from "../interfaces";
import Button from "../components/Button";
import Input from "../components/Input";

export default function Home() {
  const { data: posts } = usePosts();

  const layouts = [2, 1, 1, 1, 1, 1, 2, 2, 1];

  return (
    <div className={"container max-w-[1200px] mx-auto"}>
      <Head>
        <title>Home Page - My Blog</title>
        <meta name="description" content="My blog created by Vu Van Su" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="grid grid-cols-3 gap-8">
        {posts?.data.slice(0, 9).map((post: Post, i: number) => {
          return (
            <article
              style={{
                backgroundImage: `url(http://localhost:22222/images/${post.thumbnail})`,
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

      <div className="max-w-[700px] mx-auto text-center flex flex-col items-center">
        <h2 className="text-[48px] text-white font-bold mt-[120px] leading-tight">
          Join our occasional newsletter
        </h2>

        <Input placeholder="Your email address" />

        <Button>Subscribe</Button>
      </div>
    </div>
  );
}
