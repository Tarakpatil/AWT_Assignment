import { useMemo } from "react";
import { Link } from "react-router-dom";
import CartItem from "../components/CartItem";
import { useCart } from "../context/CartContext";

const formatPrice = (price) => `₹${price.toLocaleString("en-IN")}`;

export default function Cart() {
  const { cart, changeQty, removeItem } = useCart();

  const total = useMemo(
    () => cart.reduce((sum, item) => sum + item.price * item.qty, 0),
    [cart],
  );

  const totalItems = cart.reduce((sum, item) => sum + item.qty, 0);

  if (cart.length === 0) {
    return (
      <section className="container page">
        <h1 className="page-title">Your Cart</h1>

        <div className="empty-state">
          <p>Your cart is empty</p>
          <Link to="/" className="btn btn-primary">
            Browse Products
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="container page">
      <h1 className="page-title">Your Cart</h1>
      <p className="page-subtitle">{totalItems} items in cart</p>

      <div className="cart-list">
        {cart.map((item) => (
          <CartItem
            key={item.id}
            item={item}
            onInc={(id) => changeQty(id, 1)}
            onDec={(id) => changeQty(id, -1)}
            onRemove={removeItem}
          />
        ))}
      </div>

      <div className="cart-total">
        <span className="cart-total-label">Total</span>
        <span className="cart-total-amount">{formatPrice(total)}</span>
      </div>
    </section>
  );
}
