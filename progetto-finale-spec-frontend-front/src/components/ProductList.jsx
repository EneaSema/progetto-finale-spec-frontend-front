import { useEffect, useState } from "react";
const urlBase = import.meta.env.VITE_API_URL;
import { getProducts } from "../services/productService";
import { Link, NavLink } from "react-router-dom";

export default function ProductList() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    console.log("1. Inizio fetch...");
    const fetchproducts = async () => {
      setLoading(true);
      setError(null);

      try {
        // Chiama il servizio API (senza parametri per ora)
        const data = await getProducts();
        console.log("2. Dati ricevuti:", data);

        // Aggiorna lo stato dei prodotti con i dati ricevuti
        if (data) {
          setProducts(data);
        }
      } catch (error) {
        console.error("3. Errore intercettato:", err);
        setError(
          "Impossibile caricare i prodotti. Verifica che il backend sia attivo su porta 3001."
        );
        console.error("Errore nel fetch dei prodotti:", err);
      } finally {
        // Imposta loading a false, indipendentemente dal successo o fallimento
        console.log("4. Fine fetch.");
        setLoading(false);
      }
    };
    fetchproducts();
  }, []);

  // Logica di rendering:

  if (loading) {
    // Mostra un feedback all'utente durante l'attesa
    return <div className="text-center p-5">Caricamento prodotti...</div>;
  }

  if (error) {
    // Mostra un messaggio di errore chiaro
    return <div className="alert alert-danger p-5">Errore: {error}</div>;
  }

  // Gestione stato vuoto (Consigliato, ma utile fin da subito)
  if (products.length === 0) {
    return (
      <div className="text-center p-5">Nessun laptop trovato nel database.</div>
    );
  }

  return (
    <div className="container mt-5">
      <h1 className="mb-4">Catalogo Comparatore Laptop</h1>

      {/* Domani: Qui andranno la Barra di Ricerca, il Filtro e l'Ordinamento
       */}

      <div className="row">
        {products.map((product) => (
          // La chiave `key` è obbligatoria per gli elementi mappati in React
          <div key={product.id} className="col-md-4 mb-4">
            <div className="card shadow-sm">
              <div className="card-body">
                {/* Requisito Minimo: mostra solo title e category.
                                Usiamo Link per navigare al dettaglio (Task 1.4/Giorno 3)
                                */}
                <Link
                  to={`/products/${product.id}`}
                  className="text-decoration-none"
                >
                  <h5 className="card-title">{product.title}</h5>
                </Link>
                <p className="card-text text-muted">
                  Categoria: {product.category}
                </p>

                {/* Lunedì: Qui aggiungeremo il pulsante/icona per i Preferiti
                 */}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
