import React, { useState, useEffect, useContext } from "react";
import { Container, Form, Button, Card, Alert, Spinner, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { getTags } from "../services/tagService";
import { createPost } from "../services/postService"; 
import type { Tag } from "../types/Tag";

export function NewPost() {
  const auth = useContext(AuthContext);
  const navigate = useNavigate();

  const [description, setDescription] = useState("");
  const [availableTags, setAvailableTags] = useState<Tag[]>([]);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  
  const [imageUrls, setImageUrls] = useState<string[]>([""]); 

  const [loadingTags, setLoadingTags] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTags = async () => {
      try {
        const tags = await getTags();
        setAvailableTags(tags);
      } catch (err: any) {
        console.error("Error al cargar etiquetas:", err);
      } finally {
        setLoadingTags(false);
      }
    };
    fetchTags();
  }, []);

  const handleTagChange = (tagId: string) => {
    setSelectedTags((prev) =>
      prev.includes(tagId) ? prev.filter((id) => id !== tagId) : [...prev, tagId]
    );
  };

  
  const handleUrlChange = (index: number, value: string) => {
    const newUrls = [...imageUrls];
    newUrls[index] = value;
    setImageUrls(newUrls);
  };

  const handleAddUrlField = () => {
    setImageUrls([...imageUrls, ""]); 
  };

  const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    const userIdToSubmit = auth?.user?._id || (auth?.user as any)?.id;
    
    if (!userIdToSubmit) {
      setError("Error crítico: No se pudo obtener tu ID. Por favor, cerrá sesión y volvé a entrar.");
      return;
    }
    if (!description.trim()) {
      setError("La descripción no puede estar vacía.");
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      
      const validImages = imageUrls
        .filter(url => url.trim() !== "")
        .map(url => ({ url: url.trim() }));

      await createPost({
        description,
        userId: userIdToSubmit,
        tags: selectedTags,
        images: validImages, 
      });

      navigate("/");
    } catch (err: any) {
      setError(err.message || "Ocurrió un error al crear la publicación.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Container className="mt-5 mb-5">
      <Row className="justify-content-center">
        <Col md={8} lg={6}>
          <Card className="shadow-sm">
            <Card.Body className="p-4">
              <h3 className="mb-4 text-center fw-bold">Crear Nueva Publicación</h3>

              {error && <Alert variant="danger">{error}</Alert>}

              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="postDescription">
                  <Form.Label className="fw-bold">¿Qué estás pensando?</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={4}
                    placeholder="Escribí tu publicación acá..."
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    disabled={isSubmitting}
                  />
                </Form.Group>

                <Form.Group className="mb-4">
                  <Form.Label className="fw-bold">Imágenes (Opcional)</Form.Label>
                  {imageUrls.map((url, index) => (
                    <div key={index} className="mb-2">
                      <Form.Control
                        type="url"
                        placeholder="https://ejemplo.com/imagen.jpg"
                        value={url}
                        onChange={(e) => handleUrlChange(index, e.target.value)}
                        disabled={isSubmitting}
                      />
                      {url && (
                        <div className="mt-2 text-center">
                          <img 
                            src={url} 
                            alt={`Vista previa ${index + 1}`} 
                            style={{ maxHeight: '100px', objectFit: 'cover', borderRadius: '8px' }} 
                            onError={(e) => (e.currentTarget.style.display = 'none')}
                          />
                        </div>
                      )}
                    </div>
                  ))}
                  <Button variant="outline-secondary" size="sm" onClick={handleAddUrlField} disabled={isSubmitting}>
                    + Agregar otra imagen
                  </Button>
                </Form.Group>

                <Form.Group className="mb-4">
                  <Form.Label className="fw-bold">Etiquetas</Form.Label>
                  {loadingTags ? (
                    <div><Spinner animation="border" size="sm" /> Cargando...</div>
                  ) : availableTags.length === 0 ? (
                    <p className="text-muted small">No hay etiquetas disponibles.</p>
                  ) : (
                    <div className="d-flex flex-wrap gap-3">
                      {availableTags.map((tag) => (
                        <Form.Check
                          key={tag._id}
                          type="checkbox"
                          id={`tag-${tag._id}`}
                          label={`#${tag.nombre}`}
                          checked={selectedTags.includes(tag._id)}
                          onChange={() => handleTagChange(tag._id)}
                          disabled={isSubmitting}
                        />
                      ))}
                    </div>
                  )}
                </Form.Group>

                <div className="d-grid">
                  <Button variant="primary" type="submit" disabled={isSubmitting || !description.trim()}>
                    {isSubmitting ? "Publicando..." : "Publicar"}
                  </Button>
                </div>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
