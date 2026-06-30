import type { Tag } from "../types/tag";

const API_URL = "http://localhost:3000/api";

export async function getTags(): Promise<Tag[]> {
  const response = await fetch(`${API_URL}/tag`);

  if (!response.ok) {
    throw new Error("Error al obtener las etiquetas");
  }

  return response.json();
}