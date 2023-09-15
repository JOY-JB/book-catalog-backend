export type IBooksFilterRequest = {
  search?: string | undefined;
  title?: string | undefined;
  author?: string | undefined;
  minPrice?: number | undefined;
  maxPrice?: number | undefined;
  genre?: string | undefined;
  publicationDate?: string | undefined;
  category?: string | undefined;
};
