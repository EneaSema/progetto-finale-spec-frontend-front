import { useEffect, useState } from "react";
import { useProducts } from "../context/ProductContext";
import { getProductById } from "../services/productService";
import { Link } from "react-router-dom";

export default function ProductCompare() {
  // 1. Ottiene gli ID da confrontare e le funzioni dal Context
  const { compareIds, compareCount, toggleCompare } = useProducts();

  console.log("ID da confrontare ricevuti:", compareIds);
  console.log("Conteggio:", compareCount);

  // 2. Stato per memorizzare i dettagli completi dei prodotti
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // 3. Effect per caricare i dati dei prodotti
  useEffect(() => {
    if (compareIds.length === 0) {
      setProducts([]); // Svuota la lista se non ci sono ID
      return;
    }

    setLoading(true);
    setError(null);

    // Mappa l'array di ID in un array di Promises di fetching
    const fetchPromises = compareIds.map((id) => getProductById(id));

    // Esegue tutte le chiamate API in parallelo
    Promise.all(fetchPromises)
      .then((dataArray) => {
        console.log("Dati caricati per il confronto:", dataArray);
        setProducts(dataArray);
      })
      .catch((err) => {
        setError(
          "Errore nel caricamento di uno o più prodotti per il confronto."
        );
        console.error("Errore fetch comparatore:", err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [compareIds]); // Ricarica OGNI VOLTA che l'array compareIds cambia!

  // --- Rendering Condizionale ---
  if (loading) {
    return (
      <div className="text-center p-5">
        Caricamento prodotti per confronto...
      </div>
    );
  }

  if (error) {
    return <div className="alert alert-danger p-5">{error}</div>;
  }

  if (compareCount === 0) {
    return (
      <div className="alert alert-info p-5 text-center">
        <h3>Nessun Prodotto da Confrontare</h3>
        <p>
          Aggiungi almeno due laptop dalla <Link to="/">lista prodotti</Link>{" "}
          per iniziare.
        </p>
      </div>
    );
  }

  // --- Rendering Tabella di Confronto ---
  return (
    <div className="container mt-5">
      <h2>↔ Confronto Prodotti ({compareCount} selezionati)</h2>
      <p className="text-muted">
        Aggiungi fino a 3 prodotti. Clicca sul titolo per vedere i dettagli.
      </p>

      <div className="table-responsive">
        <table className="table table-bordered align-middle text-center">
          <tbody>
            {/* Riga 1: Titoli e Pulsante Rimuovi */}
            <tr>
              <th className="table-light">Prodotto</th>
              {products.map((p) => (
                <td key={p.id} className="fw-bold">
                  <Link
                    to={`/products/${p.id}`}
                    className="text-decoration-none text-primary"
                  >
                    {p.title}
                  </Link>
                  <button
                    className="btn btn-sm btn-outline-secondary ms-2"
                    onClick={() => toggleCompare(p.id)} // Rimuovi dal confronto
                  >
                    &times; Rimuovi
                  </button>
                </td>
              ))}
            </tr>

            {/* Riga 2: Immagine */}
            <tr>
              <th className="table-light">Immagine</th>
              {products.map((p) => (
                <td key={p.id}>
                  <img
                    src={p.imageUrl}
                    alt={p.title}
                    style={{
                      width: "100px",
                      height: "auto",
                      objectFit: "contain",
                    }}
                    className="img-fluid"
                  />
                </td>
              ))}
            </tr>

            {/* Riga 3: Prezzo */}
            <tr>
              <th className="table-light">Prezzo</th>
              {products.map((p) => (
                <td key={p.id} className="h4 text-success">
                  € {p.price ? p.price.toLocaleString("it-IT") : "N/D"}
                </td>
              ))}
            </tr>

            {/* Riga 4: Categoria */}
            <tr>
              <th className="table-light">Categoria</th>
              {products.map((p) => (
                <td key={p.id}>{p.category}</td>
              ))}
            </tr>

            {/* Riga 5: Dettagli */}
            <tr>
              <th className="table-light">Dettagli</th>
              {products.map((p) => (
                <td key={p.id} className="small text-start">
                  {p.details}
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
