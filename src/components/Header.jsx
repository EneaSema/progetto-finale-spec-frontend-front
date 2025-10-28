import { Link } from "react-router-dom";
import { useProducts } from "../context/ProductContext"; // 🆕 Importa l'Hook

export default function Header() {
  // Estrai i contatori
  const { favoriteCount, compareCount } = useProducts();

  return (
    <header className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <Link to="/" className="navbar-brand">
          💻 Comparatore Laptop
        </Link>
        <div className="d-flex">
          {/* Contatore Preferiti */}
          <Link to="/" className="btn btn-outline-danger me-2">
            ❤️ Preferiti ({favoriteCount})
          </Link>

          {/* Contatore Confronto */}
          <Link
            to="/compare"
            className={`btn btn-${
              compareCount > 0 ? "primary" : "outline-secondary"
            }`}
            disabled={compareCount < 2}
          >
            ↔ Confronta ({compareCount})
          </Link>
        </div>
      </div>
    </header>
  );
}
