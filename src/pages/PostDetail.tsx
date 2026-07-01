import { useEffect, useState } from 'react'
import type { Post } from '../types/Post'
import { useParams } from 'react-router-dom'
import { getPostById } from '../services/postService';
import PostCard from '../components/PostCard';
import CommentList from '../components/CommentList';
import styles from '../styles/postDetail.module.css'

function PostDetail() {
    const { id } = useParams();
    const [post, setPost] = useState<Post | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!id) {
            setLoading(false);
            return;
        }

        const getPost = async () => {
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
    }, [id]);

    if (loading) {
        return (
            <main className={styles.page}>
                <div className={styles.statusCard}>
                    <p className={styles.statusTitle}>Cargando publicacion...</p>
                    <p className={styles.statusText}>Estamos buscando el detalle del post.</p>
                </div>
            </main>
        );
    }

    if (!post) {
        return (
            <main className={styles.page}>
                <div className={styles.statusCard}>
                    <p className={styles.statusTitle}>No se encontro la publicacion</p>
                    <p className={styles.statusText}>Puede que el post ya no exista o que el enlace sea incorrecto.</p>
                </div>
            </main>
        );
    }

    return (
        <main className={styles.page}>
            <section className={styles.panel}>
                <header className={styles.header}>
                    <span className={styles.label}>Publicacion</span>
                    <h1>Detalle y comentarios</h1>
                    <p>Lee el post completo, reacciona y segui la conversacion.</p>
                </header>

                <div className={styles.content}>
                    <PostCard key={post._id} post={post} />
                    <CommentList postId={post._id} />
                </div>
            </section>
        </main>
    )
}

export default PostDetail
