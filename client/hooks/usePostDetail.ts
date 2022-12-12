import { Post } from "../interfaces";
import usePosts from "./queries/usePosts";

const usePostDetail = (slug: string): Post => {
  const { data: posts } = usePosts();

  const postDetail: Post = posts?.data?.find(
    (post: Post) => post.slug === slug
  );

  return postDetail;
};

export default usePostDetail;
