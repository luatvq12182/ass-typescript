import useSWR from "swr";
import { getPosts } from "../../services/post";

const usePosts = () => {
  return useSWR("posts", getPosts);
};

export default usePosts;
