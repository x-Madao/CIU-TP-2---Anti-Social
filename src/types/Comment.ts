type EntityReference = string | {
  _id?: string;
  id?: string;
  nickName?: string;
  nombre?: string;
};

export type Comment = {
  _id: string;
  descripcion?: string;
  description?: string;
  postId?: EntityReference;
  post?: EntityReference;
  user?: EntityReference;
  userId?: EntityReference;
  createdAt?: string;
  updatedAt?: string;
  fecha?: string;
  created_at?: string;
};
