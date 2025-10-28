import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getProductById } from "../services/productService"; // Funzione che recupera TUTTI i campi
import { useProducts } from "../context/ProductContext";

export default function ProductDetail() {
  // 1. Estrae l'ID dalla URL (es. /products/1)
  const { id } = useParams();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDetail = async () => {
      setLoading(true);
      setError(null);
      try {
        // Chiama l'endpoint REST /products/:id
        const data = await getProductById(id);
        console.log("Dato ricevuto da API /products/:id:", data);
        setProduct(data);
      } catch (err) {
        setError("Impossibile caricare i dettagli del prodotto.");
        console.error("Errore fetch dettaglio:", err);
      } finally {
        setLoading(false);
      }
    };

    // Controllo che l'ID sia valido prima di chiamare
    if (id) {
      fetchDetail();
    }
  }, [id]); // Ricarica solo se l'ID nella URL cambia

  // Consuma le funzioni e lo stato dal Context
  const { toggleFavorite, isFavorite } = useProducts();

  // Controlla lo stato del prodotto corrente
  const currentIsFavorite = isFavorite(id);

  // --- Rendering Condizionale ---
  if (loading) {
    return <div className="text-center p-5">Caricamento dettagli...</div>;
  }
  if (error) {
    return <div className="alert alert-danger p-5">{error}</div>;
  }
  if (!product) {
    return <div className="alert alert-info p-5">Prodotto non trovato.</div>;
  }

  // --- Rendering della Scheda di Dettaglio ---
  return (
    <div className="container mt-5">
      {/* ... (Link Torna al Catalogo) ... */}

      <div className="card shadow-lg">
        <div className="row g-0">
          {/* Immagine */}
          <div className="col-md-5">
            {/* Aggiungo una protezione se l'imageUrl non è ancora disponibile */}
            {product?.imageUrl && (
              <img
                src={product.imageUrl}
                className="img-fluid rounded-start p-3"
                alt={product.title}
                style={{ maxHeight: "400px", objectFit: "contain" }}
              />
            )}
          </div>

          {/* Dettagli Testuali */}
          <div className="col-md-7">
            <div className="card-body">
              {/* Protezione opzionale: se product è null, l'if di sopra lo prende. */}
              <h1 className="card-title display-4">{product.title}</h1>
              <p className="lead text-muted">{product.category}</p>
              <hr />

              <h2 className="text-success mb-4">
                € {product.price?.toLocaleString("it-IT") || "N/D"}
              </h2>

              <h3>Dettagli Tecnici</h3>
              <p className="card-text">
                {product.details || "Nessun dettaglio disponibile."}
              </p>

              <div className="d-flex gap-3 mt-4">
                <button
                  className={`btn btn-${
                    currentIsFavorite ? "danger" : "outline-danger"
                  }`}
                  onClick={() => toggleFavorite(id)} // Chiama la funzione globale
                >
                  {currentIsFavorite
                    ? "❤️ Rimuovi dai Preferiti"
                    : "🤍 Aggiungi ai Preferiti"}
                </button>
                <Link to={`/compare?id=${id}`} className="btn btn-primary">
                  Aggiungi al Confronto
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
