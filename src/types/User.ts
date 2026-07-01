export type User = {
  _id: string;
  nickName: string;
  nombre: string;
  email: string;
  image?: string;
  avatar?: string;
  foto?: string;
  profileImage?: string;
};

export type CreateUserDto = Omit<User, "_id"> & {password?: string};
