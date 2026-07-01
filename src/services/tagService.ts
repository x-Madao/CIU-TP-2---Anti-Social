import type { Tag } from "../types/Tag";

const API_URL = "http://localhost:3000/api";

export async function getTags(): Promise<Tag[]> {
  const response = await fetch(`${API_URL}/tag`);

  if (!response.ok) {
    throw new Error("Error al obtener las etiquetas");
  }

  return response.json();
}

export async function createTag(nombre: string): Promise<Tag> {
  const response = await fetch(`${API_URL}/tag`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ nombre }),
  });

  if (!response.ok) {
    throw new Error("No se pudo crear la etiqueta");
  }

  return response.json();
}