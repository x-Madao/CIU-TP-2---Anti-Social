import { useEffect, useState } from 'react'
import type { Post } from '../types/Post'
import { useParams } from 'react-router-dom'
import { getPostById } from '../services/postService';
import PostCard from '../components/PostCard';
import CommentList from '../components/CommentList';
import styles from '../styles/postDetail.module.css'
function PostDetail() {
    const {id} = useParams();
    const [post, setPost] = useState<Post | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!id) {
            setLoading(false);
            return;
        }

        const getPost = async() => {
            try {
                const res = await getPostById(id); 
                setPost(res)
            } catch (error) {
                console.error(error)
            } finally {
                setLoading(false)
            }
        }; 

        getPost(); 
    },[id]); 

    if (loading) return <p>Cargando...</p>
    if (!post) return <p>No se encontró la publicación</p>
  return (
    <div className={styles.detallePost}>
        <h1 className="bg-secondary">Detalle del post</h1>
        <PostCard key={post._id} post={post}/>
        <CommentList postId={post._id} />
    </div>
  )
}

export default PostDetail
