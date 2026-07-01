import { useContext, useEffect, useState } from "react"
import type { ChangeEvent, FormEvent } from "react";
import { Alert, Button, Card, Form, Spinner } from "react-bootstrap";
import type { Comment } from "../types/Comment";
import { AuthContext } from "../context/AuthContext";
import { createComment, getComments } from "../services/commentService";

type CommentListProps = {
    postId: string;
};

function CommentList({ postId }: CommentListProps) {
    const auth = useContext(AuthContext)
    const [comments, setComments] = useState<Comment[]>([]);
    const [loading , setLoading] = useState(true); 
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [form, setForm] = useState({
        descripcion: "",
    });
    const currentUserId = auth?.user?._id || (auth?.user as any)?.id; 

    const getCommentText = (comment: Comment) => {
        return comment.descripcion || comment.description || "";
    };

    const getEntityId = (entity: Comment["postId"] | Comment["post"] | Comment["user"] | Comment["userId"]) => {
        if (!entity) return "";
        if (typeof entity === "string") return entity;
        return entity._id || entity.id || "";
    };

    const getEntityNickName = (entity: Comment["user"] | Comment["userId"]) => {
        if (!entity || typeof entity === "string") return "";
        return entity.nickName || "";
    };

    const getCommentUserName = (comment: Comment) => {
        const nickName = getEntityNickName(comment.user) || getEntityNickName(comment.userId);
        if (nickName) return nickName;

        const commentUserId = getEntityId(comment.user) || getEntityId(comment.userId);
        if (commentUserId === currentUserId && auth?.user?.nickName) return auth.user.nickName;

        return "Usuario";
    };

    const getCommentPostId = (comment: Comment) => {
        return getEntityId(comment.postId) || getEntityId(comment.post);
    };

    const formatCommentDate = (comment: Comment) => {
        const dateValue = comment.createdAt || comment.updatedAt || comment.fecha || comment.created_at;
        const timestampFromId = /^[0-9a-fA-F]{24}$/.test(comment._id)
            ? Number.parseInt(comment._id.slice(0, 8), 16) * 1000
            : undefined;

        const date = dateValue ? new Date(dateValue) : new Date(timestampFromId || 0);
        if (Number.isNaN(date.getTime())) return "";
        if (!dateValue && !timestampFromId) return "";

        return date.toLocaleString("es-AR", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
        });
    };

    useEffect(() => {
        const fetchComments = async() => {
            try {
                const res = await getComments(); 
                setComments(res.filter((comment) => getCommentPostId(comment) === postId))
            } catch (error) {
                console.error(error)
                setError("No se pudieron cargar los comentarios")
            } finally{
                setLoading(false)
            }
        }; 
        fetchComments();
    }, [postId])

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!currentUserId) {
            setError("Debes iniciar sesion para comentar");
            return;
        }

        if (!form.descripcion.trim()) {
            setError("El comentario no puede estar vacio");
            return;
        }

        setSubmitting(true);
        setError(null);

        try {
            const newComment = await createComment({
                descripcion: form.descripcion.trim(),
                description: form.descripcion.trim(),
                postId,
                userId: currentUserId,
            });

            setComments((prevComments) => [
                ...prevComments,
                {
                    ...newComment,
                    descripcion: newComment.descripcion || form.descripcion.trim(),
                    description: newComment.description || form.descripcion.trim(),
                    postId: newComment.postId || postId,
                    user: newComment.user || auth?.user || undefined,
                    userId: newComment.userId || currentUserId,
                    createdAt: newComment.createdAt || new Date().toISOString(),
                },
            ]);
            setForm({ descripcion: "" });
        } catch (error) {
            console.error(error);
            setError("No se pudo crear el comentario");
        } finally {
            setSubmitting(false);
        }
    };
    
    return (
        <section className="mt-4">
            <Card className="shadow-sm">
                <Card.Body>
                    <h2 className="h4 mb-3">Comentarios</h2>

                    {error && <Alert variant="danger">{error}</Alert>}

                    <Form onSubmit={handleSubmit} className="mb-4">
                        <Form.Group className="mb-3" controlId="commentDescription">
                            <Form.Control
                                as="textarea"
                                rows={3}
                                name="descripcion"
                                value={form.descripcion}
                                onChange={handleChange}
                                placeholder="Escribi tu comentario..."
                                disabled={submitting || !currentUserId}
                            />
                        </Form.Group>

                        <Button
                            type="submit"
                            variant="primary"
                            disabled={submitting || !currentUserId || !form.descripcion.trim()}
                        >
                            {submitting ? "Comentando..." : "Comentar"}
                        </Button>
                    </Form>

                    {loading ? (
                        <div className="text-center">
                            <Spinner animation="border" size="sm" />
                        </div>
                    ) : comments.length === 0 ? (
                        <p className="text-muted">Todavia no hay comentarios.</p>
                    ) : (
                        comments.map((comment) => (
                            <Card key={comment._id} className="mb-2">
                                <Card.Body>
                                    <div className="d-flex justify-content-between mb-2">
                                        <strong>@{getCommentUserName(comment)}</strong>
                                        <small className="text-muted">
                                            {formatCommentDate(comment)}
                                        </small>
                                    </div>
                                    <p>{getCommentText(comment)}</p>
                                </Card.Body>
                            </Card>
                        ))
                    )}
                </Card.Body>
            </Card>
        </section>
    )
}

export default CommentList
