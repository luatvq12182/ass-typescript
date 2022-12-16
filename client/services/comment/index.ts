import { http } from "..";
import { Comment } from "../../interfaces";

export const getComments = () => {
  return http.get("/api/comments");
};

export const postComment = (data: Comment) => {
  return http.post("/api/comments", data);
};
