import { http } from "..";

export const getPosts = () => {
  return http.get("/api/posts");
};

export const getPostDetail = (slug: string) => {
  return http.get("/api/posts?slug=" + slug);
};
