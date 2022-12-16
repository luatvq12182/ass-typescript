import { Post, Term } from "../interfaces";
import useTerms from "./queries/useTerms";

const useCategoriesOfPost = (postDetail: Post) => {
  const { data: terms } = useTerms();

  const categories: Term[] = terms?.data?.filter(
    (term: Term) => term?.taxonomy === "category"
  );

  const categoriesOfPost: Term[] = categories?.filter((term: Term) => {
    return postDetail?.categories?.includes(term.id || 0);
  });

  return categoriesOfPost;
};

export default useCategoriesOfPost;
