import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProductList from "./components/ProductList";
import ProductDetail from "./components/ProductDetail";
import ProductCompare from "./components/ProductCompare";
import FavoritesSidebar from "./components/FavoritesSidebar";
import Header from "./components/Header";
import "bootstrap/dist/css/bootstrap.min.css"; // Assicurati di avere questo se usi Bootstrap
import { ProductProvider } from "./context/ProductContext";
export default function App() {
  return (
    // Avvolgiamo tutto il Provider
    <ProductProvider>
      {/* Avvolgo tutto il contenuto in BrowserRouter */}
      <BrowserRouter>
        {/* 1. Header/Navigazione (visibile su tutte le pagine) */}
        <Header />

        <main className="container-fluid mt-4">
          <div className="row">
            <div className="col-md-9">
              <Routes>
                {/* I componenti non hanno più bisogno di prop per i preferiti! */}
                <Route path="/" element={<ProductList />} />
                <Route path="/products/:id" element={<ProductDetail />} />
                <Route path="/compare" element={<ProductCompare />} />
                <Route
                  path="*"
                  element={
                    <div className="text-center p-5">
                      Pagina Non Trovata (404)
                    </div>
                  }
                />
              </Routes>
            </div>

            {/* FavoritesSidebar non ha più bisogno di prop, userà l'hook! */}
            <div className="col-md-3">
              <FavoritesSidebar />
            </div>
          </div>
        </main>
      </BrowserRouter>
    </ProductProvider>
  );
}
