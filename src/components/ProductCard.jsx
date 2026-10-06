// Formats a number the Indian way, e.g. 55000 -> "55,000".
const formatPrice = (price) => `₹${price.toLocaleString("en-IN")}`;

export default function ProductCard({ product, onAdd }) {
  const { id, name, category, price, quantity, image } = product;
  const outOfStock = quantity === 0;

  return (
    <article className="card product-card">
      <img className="product-image" src={image} alt={name} />

      <div className="product-body">
        <div className="product-top">
          <span className="badge">{category}</span>
          {outOfStock && <span className="badge badge-muted">Out of stock</span>}
        </div>

        <h3 className="product-name">{name}</h3>
        <p className="product-price">{formatPrice(price)}</p>
        <p className="product-stock">
          {outOfStock ? "Unavailable" : `Stock: ${quantity}`}
        </p>

        <button
          type="button"
          className="btn btn-primary btn-block"
          onClick={() => onAdd(id)}
          disabled={outOfStock}
        >
          {outOfStock ? "Out of stock" : "Add to Cart"}
        </button>
      </div>
    </article>
  );
}
