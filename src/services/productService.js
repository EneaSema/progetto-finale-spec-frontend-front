const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3001";

/**
 * Recupera tutti i prodotti con opzionali parametri di ricerca/filtro.
 */
export async function getProducts(params = {}) {
  // La logica di pulizia dei parametri (validParams) rimane invariata.
  const validParams = Object.entries(params).filter(
    ([key, value]) => value !== "" && value !== null
  );
  const query = new URLSearchParams(validParams).toString();
  const url = `${API_URL}/products${query ? `?${query}` : ""}`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Errore HTTP! Status: ${response.status}`);
    }
    return response.json();
  } catch (error) {
    console.error("Errore nel recupero dei prodotti:", error);
    throw error;
  }
}

/**
 * Recupera un singolo prodotto per ID.
 */
export async function getProductById(id) {
  try {
    const response = await fetch(`${API_URL}/products/${id}`);

    if (!response.ok) {
      throw new Error(`Prodotto con ID ${id} non trovato.`);
    }

    const data = await response.json();

    // 🚨 QUESTA RIGA È LA VERA SOLUZIONE:
    // Restituisce SOLO il contenuto di 'product'
    return data.product;
  } catch (error) {
    console.error(`Errore nel recupero del prodotto ${id}:`, error);
    throw error;
  }
}
