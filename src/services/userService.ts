import type { User, CreateUserDto } from "../types/user";

const API_URL = "http://localhost:3000/api";

export async function getUsers(): Promise<User[]> {
  const response = await fetch(`${API_URL}/user`);

  if (!response.ok) {
    throw new Error("Error al obtener los usuarios");
  }

  return response.json();
}

export async function createUser(user: CreateUserDto): Promise<User> {
  const response = await fetch(`${API_URL}/user`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  });

  if (!response.ok) {
    const data = await response.json();
    console.log(data)
    throw new Error(data.message || data.error || "No se pudo crear el usuario");
  }

  return response.json();
}