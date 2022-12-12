import useSWR from "swr";
import { getTerms } from "../../services/term";

const useTerms = () => {
  return useSWR("terms", getTerms);
};

export default useTerms;
