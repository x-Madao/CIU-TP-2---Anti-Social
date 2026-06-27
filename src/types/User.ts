export type User = {
  id: number;
  nickName: string;
  nombre: string;
  email: string;
  password: string;
};

export type CreateUserDto = Omit<User, "id">;
