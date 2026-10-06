import { useMemo, useState } from "react";
import ProductCard from "../components/ProductCard";
import SearchFilter from "../components/SearchFilter";
import { useCart } from "../context/CartContext";

export default function Products({ products }) {
  const { addToCart } = useCart();

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

  const categories = [...new Set(products.map((product) => product.category))];

  const filteredProducts = useMemo(() => {
    const term = search.trim().toLowerCase();

    return products.filter((product) => {
      const matchesName = product.name.toLowerCase().includes(term);
      const matchesCategory =
        category === "All" || product.category === category;

      return matchesName && matchesCategory;
    });
  }, [products, search, category]);

  const handleAdd = (id) => {
    const product = products.find((item) => item.id === id);

    if (product) {
      addToCart(product);
    }
  };

  return (
    <section className="container page">
      <div className="page-head">
        <div>
          <h1 className="page-title">Products</h1>
          <p className="page-subtitle">
            {filteredProducts.length} of {products.length} items
          </p>
        </div>
      </div>

      <SearchFilter
        search={search}
        setSearch={setSearch}
        category={category}
        setCategory={setCategory}
        categories={categories}
      />

      {filteredProducts.length === 0 ? (
        <div className="empty-state">
          <p>No products found</p>
        </div>
      ) : (
        <div className="product-grid">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onAdd={handleAdd}
            />
          ))}
        </div>
      )}
    </section>
  );
}
