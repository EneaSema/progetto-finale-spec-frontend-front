import { useProducts } from "../context/ProductContext";
import { Link } from "react-router-dom"; // 🆕 Importa Link

export default function FavoritesSidebar() {
  // Estrai i contatori
  const { favoriteCount, compareCount } = useProducts();

  return (
    <div
      className="p-3 bg-light rounded shadow-sm sticky-top"
      style={{ top: "15px" }}
    >
      {/* SEZIONE PREFERITI */}
      <h4 className="border-bottom pb-2 mb-3">
        ❤️ I Tuoi Preferiti ({favoriteCount})
      </h4>
      {favoriteCount === 0 && (
        <p className="text-muted">Ancora nessun prodotto nei preferiti.</p>
      )}

      {/* SEZIONE CONFRONTO */}
      <h4 className="mt-4 border-bottom pb-2 mb-3">
        ↔ Confronto ({compareCount})
      </h4>

      {compareCount === 0 ? (
        <p className="text-muted">Seleziona i prodotti per confrontare.</p>
      ) : (
        <p className="fw-bold">
          Pronto per confrontare {compareCount} prodotti.
        </p>
      )}

      {/* PULSANTE CONFRONTO */}
      <Link
        to="/compare"
        className="btn btn-primary w-100 mt-2"
        disabled={compareCount < 2} // Disabilita se meno di 2 prodotti
      >
        Vai al Confronto
      </Link>
    </div>
  );
}
