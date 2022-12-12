import { http } from "..";

export const getTerms = () => {
  return http.get("/api/terms");
};
