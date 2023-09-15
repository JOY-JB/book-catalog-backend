export type IBooksFilterRequest = {
  id?: string;
  search?: string | undefined;
  title?: string | undefined;
  author?: string | undefined;
  price?: number | undefined;
  genre?: string | undefined;
  publicationDate?: string | undefined;
  categoryId?: string | undefined;
};
