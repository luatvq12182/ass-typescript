import usePosts from "./queries/usePosts";
import { Post } from "../interfaces";

const usePostsOfCategory = (ids: number[]) => {
  const { data: posts } = usePosts();

  const map: any = {};

  ids.forEach((id: number) => {
    map[id] = id;
  });

  const postsOfCategory: Post[] = posts?.data?.filter((post: Post) => {
    return post.categories.some((id: number) => !!map[id]);
  });

  return postsOfCategory;
};

export default usePostsOfCategory;
