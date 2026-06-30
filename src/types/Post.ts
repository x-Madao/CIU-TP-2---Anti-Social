import type { Tag } from './tag'; 

export type Post = {
  _id: string;
  description: string;
  user: {
    _id: string;
    nickName: string;
    nombre:string;
  };
  tags: Tag[];
  images?: string[]
  commentsCount?: number;
  createdAt?: string;
};
