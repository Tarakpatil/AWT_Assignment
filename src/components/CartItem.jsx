const formatPrice = (price) => `₹${price.toLocaleString("en-IN")}`;

export default function CartItem({ item, onInc, onDec, onRemove }) {
  const { id, name, price, image, qty, quantity } = item;

  return (
    <div className="cart-item">
      <img className="cart-item-image" src={image} alt={name} />

      <div className="cart-item-info">
        <h3 className="cart-item-name">{name}</h3>
        <p className="cart-item-price">{formatPrice(price)}</p>
      </div>

      <div className="qty-controls">
        <button
          type="button"
          className="btn btn-outline qty-btn"
          onClick={() => onDec(id)}
          aria-label={`Decrease ${name}`}
        >
          −
        </button>

        <span className="qty-value">{qty}</span>

        <button
          type="button"
          className="btn btn-outline qty-btn"
          onClick={() => onInc(id)}
          // Cannot go above the stock quantity of the product.
          disabled={qty >= quantity}
          aria-label={`Increase ${name}`}
        >
          +
        </button>
      </div>

      <button
        type="button"
        className="btn btn-outline remove-btn"
        onClick={() => onRemove(id)}
      >
        Remove
      </button>
    </div>
  );
}
