export interface Term {
  id?: number;
  name: string;
  slug?: string;
  link?: string;
  taxonomy?: string;
  parentId?: number;
}

export interface Post {
  id: number;
  title: string;
  slug: string;
  categories: Array<number>;
  tags: Array<number>;
  thumbnail: string;
  content: string;
}
