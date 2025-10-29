import { createContext, useContext, useState, useEffect } from "react";

// 1. Creazione del Context
const ProductContext = createContext();

// 2. Hook personalizzato per un facile accesso al Context
export const useProducts = () => {
  return useContext(ProductContext);
};

// 3. Provider: Gestisce lo stato e la logica
export const ProductProvider = ({ children }) => {
  // Legge i Preferiti (o usa array vuoto se non trova nulla)
  const initialFavoriteIds =
    JSON.parse(localStorage.getItem("favoriteIds")) || [];
  const [favoriteIds, setFavoriteIds] = useState(initialFavoriteIds);

  // Legge la lista Confronto (o usa array vuoto se non trova nulla)
  const initialCompareIds =
    JSON.parse(localStorage.getItem("compareIds")) || [];
  const [compareIds, setCompareIds] = useState(initialCompareIds);
  console.log("ID Prodotti da Confrontare:", compareIds);

  // Effetto per salvare i Preferiti
  useEffect(() => {
    // Salva l'array di ID in localStorage, convertito in stringa
    localStorage.setItem("favoriteIds", JSON.stringify(favoriteIds));
  }, [favoriteIds]); // Si attiva ogni volta che favoriteIds cambia

  // Effetto per salvare i Confronti
  useEffect(() => {
    // Salva l'array di ID in localStorage, convertito in stringa
    localStorage.setItem("compareIds", JSON.stringify(compareIds));
  }, [compareIds]); // Si attiva ogni volta che compareIds cambia

  // Funzione di Confronto: Aggiunge o Rimuove un ID dalla lista di confronto
  const toggleCompare = (productId) => {
    const id = Number(productId);

    setCompareIds((prevIds) => {
      if (prevIds.includes(id)) {
        return prevIds.filter((compareId) => compareId !== id); // Rimuovi
      }
      // Limite la lista a 3 prodotti (scelta di design comune)
      if (prevIds.length >= 3) {
        return prevIds; // Non aggiungere se la lista è piena
      }
      return [...prevIds, id]; // Aggiungi
    });
  };

  const isComparing = (productId) => {
    const id = Number(productId);
    return compareIds.includes(id);
  };

  const toggleFavorite = (productId) => {
    const id = Number(productId);

    setFavoriteIds(
      (prevIds) =>
        prevIds.includes(id)
          ? prevIds.filter((favId) => favId !== id) // Rimuovi
          : [...prevIds, id] // Aggiungi
    );
  };

  const isFavorite = (productId) => {
    const id = Number(productId);
    return favoriteIds.includes(id);
  };

  // Oggetto contenente tutti gli stati e le funzioni da esporre
  const value = {
    // Preferiti
    favoriteIds,
    favoriteCount: favoriteIds.length,
    toggleFavorite,
    isFavorite,

    // Confronto
    compareIds,
    compareCount: compareIds.length,
    toggleCompare,
    isComparing,
  };

  return (
    <ProductContext.Provider value={value}>{children}</ProductContext.Provider>
  );
};
