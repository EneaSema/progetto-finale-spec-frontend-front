import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProductList from "./components/ProductList";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ProductList />} />
        {/* <Route path="/products/:id" element={<ProductDetail />} />
        <Route path="/compare" element={<CompararePage />} />
        <Route path="/favorites" element={<FavoritesPage />} /> */}
      </Routes>
    </BrowserRouter>
  );
}
