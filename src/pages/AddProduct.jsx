import { useState } from "react";
import { useNavigate } from "react-router-dom";

const categories = ["Electronics", "Furniture", "Stationery"];

const emptyForm = {
  name: "",
  category: "Electronics",
  price: "",
  quantity: "",
  image: "",
};

export default function AddProduct({ products, setProducts }) {
  const navigate = useNavigate();

  // Controlled form: every field value and every onChange lives in React state.
  const [form, setForm] = useState(emptyForm);
  const [errors, setErrors] = useState({});

  // Spread the current form and override only the field that changed.
  const handleChange = (event) => {
    const { name, value } = event.target;

    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const validate = () => {
    const nextErrors = {};

    if (!form.name.trim()) {
      nextErrors.name = "Name is required";
    }

    // Number("") is 0, so also check that the field is not empty.
    if (!form.price.trim()) {
      nextErrors.price = "Price is required";
    } else if (Number(form.price) <= 0) {
      nextErrors.price = "Price must be greater than 0";
    }

    setErrors(nextErrors);

    // Return true only when there are no problems.
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!validate()) {
      return;
    }

    // Next id = the current highest id + 1.
    const nextId =
      products.reduce((max, product) => Math.max(max, product.id), 0) + 1;

    const newProduct = {
      id: nextId,
      name: form.name.trim(),
      category: form.category,
      price: Number(form.price),
      quantity: Number(form.quantity) || 0,
      image:
        form.image.trim() ||
        // Fall back to a dark placeholder that matches the theme.
        `https://placehold.co/200x150?bg=27272a&fg=fafafa&text=${encodeURIComponent(
          form.name.trim(),
        )}`,
    };

    setProducts((prevProducts) => [...prevProducts, newProduct]);
    navigate("/");
  };

  return (
    <section className="container page">
      <h1 className="page-title">Add Product</h1>

      <form className="form-card" onSubmit={handleSubmit} noValidate>
        <div className="field">
          <label className="label" htmlFor="name">
            Name
          </label>
          <input
            id="name"
            className="input"
            type="text"
            name="name"
            placeholder="e.g. Monitor"
            value={form.name}
            onChange={handleChange}
          />
          {errors.name && <p className="error-text">{errors.name}</p>}
        </div>

        <div className="field">
          <label className="label" htmlFor="category">
            Category
          </label>
          <select
            id="category"
            className="input"
            name="category"
            value={form.category}
            onChange={handleChange}
          >
            {categories.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </div>

        <div className="field">
          <label className="label" htmlFor="price">
            Price (₹)
          </label>
          <input
            id="price"
            className="input"
            type="number"
            name="price"
            placeholder="e.g. 1500"
            value={form.price}
            onChange={handleChange}
          />
          {errors.price && <p className="error-text">{errors.price}</p>}
        </div>

        <div className="field">
          <label className="label" htmlFor="quantity">
            Quantity
          </label>
          <input
            id="quantity"
            className="input"
            type="number"
            name="quantity"
            placeholder="e.g. 10"
            value={form.quantity}
            onChange={handleChange}
          />
        </div>

        <div className="field">
          <label className="label" htmlFor="image">
            Image URL
          </label>
          <input
            id="image"
            className="input"
            type="text"
            name="image"
            placeholder="https://..."
            value={form.image}
            onChange={handleChange}
          />
        </div>

        <button type="submit" className="btn btn-primary btn-block">
          Add Product
        </button>
      </form>
    </section>
  );
}
