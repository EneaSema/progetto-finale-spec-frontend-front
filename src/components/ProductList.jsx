import { useEffect, useState, useCallback, useMemo } from "react";
import { Link } from "react-router-dom";
import { getProducts } from "../services/productService";
import { useProducts } from "../context/ProductContext";

const CATEGORIES = ["Ultrabook", "Gaming", "Business", "2-in-1"];

// FUNZIONE DEBOUNCE: Deve stare fuori dal componente
const debounce = (callback, delay) => {
  let timer;
  return (value) => {
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(() => {
      callback(value);
    }, delay);
  };
};

// Funzione di utilità per l'Ordinamento
const sortProducts = (list, criteria) => {
  const sorted = [...list];
  const [field, direction] = criteria.split("-");

  sorted.sort((a, b) => {
    // Poiché riceviamo solo title e category, l'ordinamento è semplice
    let comparison = 0;
    if (a[field] > b[field]) comparison = 1;
    if (a[field] < b[field]) comparison = -1;

    return direction === "asc" ? comparison : comparison * -1;
  });
  return sorted;
};

export default function ProductList() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Stato immediato: Aggiornato ad ogni battitura (per fluidità dell'input)
  const [searchInput, setSearchInput] = useState("");

  // Stato effettivo: Aggiornato solo dopo il debounce o dal filtro categoria
  const [filters, setFilters] = useState({
    search: "",
    category: "",
  });

  // Stato per l'Ordinamento
  const [sortCriteria, setSortCriteria] = useState("title-asc");

  // 1. USECALLBACK: Stabilizza la funzione che DEVE aggiornare lo stato di filtro.
  // L'identità di questa funzione non cambierà, evitando problemi con il debounce.
  const updateSearchFilter = useCallback(
    (term) => {
      // Aggiorna lo stato 'filters.search', che farà ripartire il fetch API
      setFilters((prev) => ({ ...prev, search: term }));
    },
    [setFilters]
  );

  // 2. USEMEMO: Crea la funzione debounced una SOLA volta.
  // Memorizza il risultato di debounce(funzione_stabile, ritardo).
  const debouncedSearch = useMemo(() => {
    return debounce(updateSearchFilter, 500); // 500ms di ritardo per la ricerca
  }, [updateSearchFilter]); // Si ricrea solo se updateSearchFilter cambia (mai)

  // --- 2. Hook Principale: FETCH API ---
  // --- Hook Principale: FETCH API ---
  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      setError(null);
      try {
        // La funzione getProducts usa i filtri (che includono la ricerca debounced)
        const data = await getProducts(filters);
        setProducts(data);
      } catch (err) {
        setError(
          "Impossibile caricare i prodotti. Controlla il backend (porta 3001)."
        );
        console.error("Errore fetch:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [filters]); // Si riesegue quando i filtri (incluso search) o categoria cambiano

  const { isFavorite, toggleFavorite, isComparing, toggleCompare, compareIds } =
    useProducts();

  // --- Rendering Condizionale ---
  if (loading) {
    return <div className="text-center p-5">Caricamento prodotti...</div>;
  }
  if (error) {
    return <div className="alert alert-danger p-5">Errore: {error}</div>;
  }

  // Applico l'ordinamento ai prodotti visualizzati (lato frontend)
  const displayedProducts = sortProducts(products, sortCriteria);

  return (
    <div className="container mt-5">
      <h1 className="mb-4">Catalogo Comparatore Laptop</h1>

      {/* Input, Filtri e Ordinamento */}
      <div className="row mb-4 g-3">
        <div className="col-md-4">
          {/* Ricerca: Usa lo stato immediato per la fluidità */}
          <input
            type="text"
            className="form-control"
            placeholder="Cerca per titolo..."
            // Usa lo stato immediato (searchInput) per l'input controllato
            value={searchInput}
            onChange={(e) => {
              // 1. Aggiorna lo stato visivo immediatamente
              setSearchInput(e.target.value);
              // 2. Chiama la funzione debounced, che aspetta 500ms prima di aggiornare i filtri
              debouncedSearch(e.target.value);
            }}
          />
        </div>

        <div className="col-md-3">
          {/* Filtro Categoria: Aggiornamento immediato */}
          <select
            className="form-select"
            value={filters.category}
            onChange={(e) =>
              setFilters((prev) => ({ ...prev, category: e.target.value }))
            }
          >
            <option value="">Tutte le Categorie</option>
            {CATEGORIES.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        <div className="col-md-3">
          {/* Ordinamento */}
          <select
            className="form-select"
            value={sortCriteria}
            onChange={(e) => setSortCriteria(e.target.value)}
          >
            <option value="title-asc">Titolo (A-Z)</option>
            <option value="title-desc">Titolo (Z-A)</option>
            <option value="category-asc">Categoria (A-Z)</option>
            <option value="category-desc">Categoria (Z-A)</option>
          </select>
        </div>
        {/* Link ai Preferiti */}
        <div className="col-md-2 text-end">
          <Link to="/compare" className="btn btn-outline-primary">
            Confronta
          </Link>
        </div>
      </div>

      {/* Gestione stato vuoto e Mappatura dei prodotti... (il resto del JSX rimane invariato) */}

      {displayedProducts.length === 0 && (
        <div className="text-center p-5 alert alert-warning">
          Nessun prodotto trovato.
        </div>
      )}

      {/* Mappatura dei prodotti */}
      <div className="row">
        {displayedProducts.map((product) => (
          <div key={product.id} className="col-md-4 mb-4">
            <div className="card shadow-sm h-100">
              <div className="card-body">
                <Link
                  to={`/products/${product.id}`}
                  className="text-decoration-none text-dark"
                >
                  <h5 className="card-title">{product.title}</h5>
                </Link>
                <p className="card-text text-muted">
                  Categoria: {product.category}
                </p>

                {/* LOGICA PREFERITI E CONFRONTO */}
                <div className="mt-auto d-flex justify-content-between align-items-center pt-2">
                  {/* Pulsante 1: Preferiti */}
                  <button
                    className={`btn btn-sm btn-${
                      isFavorite(product.id) ? "danger" : "outline-danger"
                    }`}
                    onClick={() => toggleFavorite(product.id)}
                    title={
                      isFavorite(product.id)
                        ? "Rimuovi dai Preferiti"
                        : "Aggiungi ai Preferiti"
                    }
                  >
                    {isFavorite(product.id) ? "❤️" : "🤍"}
                  </button>

                  {/* Pulsante 2: Aggiungi al Confronto */}
                  <button
                    className={`btn btn-sm btn-${
                      isComparing(product.id) ? "primary" : "outline-primary"
                    }`}
                    onClick={() => toggleCompare(product.id)}
                    title={
                      isComparing(product.id)
                        ? "Rimuovi dal Confronto"
                        : "Aggiungi al Confronto"
                    }
                    disabled={
                      !isComparing(product.id) && compareIds.length >= 3
                    } // Disabilita se lista piena
                  >
                    {isComparing(product.id) ? "✓ Confrontato" : "↔ Confronta"}
                  </button>
                </div>

                <div className="d-flex justify-content-between align-items-center mt-3">
                  {/* Link al Dettaglio */}
                  <Link
                    to={`/products/${product.id}`}
                    className="btn btn-sm btn-link text-secondary"
                  >
                    Dettagli
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
