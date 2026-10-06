import { NavLink } from "react-router-dom";
import { useCart } from "../context/CartContext";

// Sums the qty of every cart line for the badge.
const getCartCount = (cart) =>
  cart.reduce((count, item) => count + item.qty, 0);

export default function Navbar() {
  const { cart } = useCart();
  const count = getCartCount(cart);

  return (
    <header className="navbar">
      <div className="navbar-inner container">
        <NavLink to="/" className="brand">
          MiniShop
        </NavLink>

        <nav className="nav-links">
          <NavLink to="/" end className="nav-link">
            Products
          </NavLink>
          <NavLink to="/add-product" className="nav-link">
            Add Product
          </NavLink>

          <NavLink to="/cart" className="nav-link nav-link-cart">
            Cart
            <span className="cart-badge">{count}</span>
          </NavLink>
        </nav>
      </div>
    </header>
  );
}
