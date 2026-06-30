import type {Post} from '../types/post';

const API_URL = "http://localhost:3000/api";

export async function getPosts(): Promise<Post[]> {
    const response = await fetch(`${API_URL}/posts`);

    if(!response.ok) {
        throw new Error("Error al obtener las publicaciones");
    }

    return response.json();
};

export type CreatePostDto = {
    description: string;
    userId: string;
    tags: string[];
};

export async function createPost(postData: CreatePostDto) : Promise<Post> {
    const response = await fetch(`${API_URL}/posts`, {
        method: "POST", 
        headers: {
            "Content-Type" : "application/json",
        },
        body: JSON.stringify(postData),
    });

    if(!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Error al crear publicación");
    }
    return response.json();
}

export async function createPostImage(postId: string, url: string): Promise<void> {
  const response = await fetch(`${API_URL}/postimages`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ postId, url }),
  });

  if (!response.ok) {
    throw new Error("Error al guardar la imagen asociada");
  }
}