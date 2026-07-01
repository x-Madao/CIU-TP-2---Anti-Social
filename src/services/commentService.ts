import type { Comment } from "../types/Comment";
const API_URL = "http://localhost:3000/api";
export async function getComments():Promise<Comment[]> {
    const response = await fetch(`${API_URL}/comment`); 
    if(!response.ok) {
        throw new Error('Error al obtener los comentarios')
    }
    return response.json(); 
}

export type CreatCommetDto = {
    descripcion : string, 
    description?: string,
    postId : string, 
    userId : string, 
}
export async function createComment(comment:CreatCommetDto):Promise<Comment> {
    const payload = {
        ...comment,
        description: comment.description || comment.descripcion,
    };

    const response = await fetch(`${API_URL}/comment`, {
        method : "POST", 
        headers : {
            "Content-Type" : "application/json",
        }, 
        body : JSON.stringify(payload)
    });
    if(!response.ok){
        const errorData = await response.json(); 
        throw new Error(errorData.message || "Error al crear el comentario");
    }
    return response.json()
}
