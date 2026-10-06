import { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Navbar from "./components/Navbar";
import { CartProvider } from "./context/CartContext";
import { initialProducts } from "./data/products";
import AddProduct from "./pages/AddProduct";
import Cart from "./pages/Cart";
import Products from "./pages/Products";

import "./App.css";

export default function App() {

  const [products, setProducts] = useState(initialProducts);

  return (
    <BrowserRouter>
      <CartProvider>
        <Navbar />

        <main>
          <Routes>
            <Route path="/" element={<Products products={products} />} />
            <Route path="/cart" element={<Cart />} />
            <Route
              path="/add-product"
              element={
                <AddProduct products={products} setProducts={setProducts} />
              }
            />
          </Routes>
        </main>
      </CartProvider>
    </BrowserRouter>
  );
}
