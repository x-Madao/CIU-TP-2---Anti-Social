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
  images?: { _id?:string; url:string}[];
  reactions?: {
    user: string;
    reactionType: string;
  }[];
  commentsCount?: number;
  createdAt?: string;
};
