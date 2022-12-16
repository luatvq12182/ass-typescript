import useSWR from "swr";
import { getComments } from "../../services/comment";

const useComments = () => {
  return useSWR("comments", getComments);
};

export default useComments;
