export interface Term {
  id?: number;
  name: string;
  slug?: string;
  taxonomy?: 'category' | 'tag' | 'link';
  parentId?: number;
  linkType?: 'post' | 'category' | 'self-created' | 'page';
  linkValue?: string | number;
  linkOrder?: number;
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

export interface Comment {
  id?: number;
  postId: number;
  name: string;
  email: string;
  content: string;
  allow: boolean;
  createdAt: number;
}
