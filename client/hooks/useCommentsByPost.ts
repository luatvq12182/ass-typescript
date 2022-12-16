import { Comment } from "../interfaces";
import useComments from "./queries/useComments";

const useCommentsByPost = (postId: number) => {
  const { data: comments } = useComments();

  if (!comments) return [];

  return comments?.data?.filter(
    (comment: Comment) => comment.postId === postId && comment.allow
  );
};

export default useCommentsByPost;
