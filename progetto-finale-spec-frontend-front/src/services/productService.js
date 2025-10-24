const urlBase = import.meta.env.VITE_API_URL;

console.log("File productService caricato.");

// Funzione di utilità per gestire la risposta e gli errori
const handleResponse = async (response) => {
  if (!response.ok) {
    const errordata = await response
      .json()
      .catch(() => ({ message: "Errore generico API" }));
    throw new Error(errordata.message);
  }
  return response.json();
};

export const getProducts = async (params = {}) => {
  // 1. Converto l'oggetto dei parametri in una stringa di query
  const query = new URLSearchParams(params) - toString();

  // 2. Costruisco l'URL finale
  const url = `${urlBase}/products${query ? `?${query}` : ``}`;

  try {
    const resp = await fetch(url);
    return await handleResponse(resp);
  } catch (error) {
    console.error("errore nel recupero della lista prodotti:", error);
    throw error;
  }
};

// Recupero un singolo prodotto tramite ID.
// @param {string} id - L'ID del prodotto da recuperare.

const getProductDetails = async (id) => {
  const urlId = `${urlBase}/products/${id}`;

  try {
    const resp = await fetch(urlId);
    return await handleResponse(resp);
  } catch (error) {
    console.error(
      `Errore nel recupero del dettaglio prodotto ID: ${id}`,
      error
    );
    throw error;
  }
};
