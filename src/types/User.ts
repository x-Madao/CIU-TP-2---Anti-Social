export type User = {
  _id: string;
  nickName: string;
  nombre: string;
  email: string;
};

export type CreateUserDto = Omit<User, "_id"> & {password?: string};
