export type Comment = {
  _id: string;
  descripcion: string;
  postId: string;
  user: {
    _id: string;
    nickName: string;
  };
  createdAt?: string;
};
