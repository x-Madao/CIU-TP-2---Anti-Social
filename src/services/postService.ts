import type { Post } from "../types/Post";

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
    images?: {url:string}[];
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


export const reactToPost = async (postId: string, userId: string, reactionType: string) => {
  
  const response = await fetch(`http://localhost:3000/api/posts/${postId}/react`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      
    },
    body: JSON.stringify({ userId, reactionType })
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Error al reaccionar al post');
  }

  return response.json();
};

export async function getPostById(id:string){
    const response = await fetch(`${API_URL}/posts/${id}`)
    if (!response.ok) {
        throw new Error("Error al obtener la publicacion")
    }
    return response.json()
}