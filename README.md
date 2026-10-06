# MiniShop - Product Inventory & Shopping Cart

A small React project for a college assignment. It lists products from a local
data file, lets you filter them, add them to a shopping cart and change the
quantities, and lets you add a brand new product to the list.

The interface is dark themed (near-black background, white text and controls)
and there is no theme switch.

There is **no backend, no login and no checkout** - all data lives in memory in
the browser, so everything resets when you refresh the page.

Built with Vite + React (JavaScript), `react-router-dom` and plain CSS.


## Routes

| Path            | Page         | What it does                                   |
| --------------- | ------------ | ---------------------------------------------- |
| `/`             | Products     | Grid of all products, search + category filter |
| `/cart`         | Cart         | Cart lines, quantity controls and total        |
| `/add-product`  | Add Product  | Controlled form that adds a product            |

The navbar is shown on every page and includes a live item-count badge.

## Project structure

```
src/
├── data/products.js        # 10 seed products across 3 categories
├── context/CartContext.jsx # cart state + addToCart / changeQty / removeItem
├── components/
│   ├── Navbar.jsx          # links + cart count badge
│   ├── ProductCard.jsx     # one product tile
│   ├── SearchFilter.jsx    # search input + category dropdown
│   └── CartItem.jsx        # one cart row
├── pages/
│   ├── Products.jsx        # filtering with useMemo
│   ├── Cart.jsx            # total with useMemo
│   └── AddProduct.jsx      # form + validation
├── App.jsx                 # router + product state
└── App.css                 # all styling and design tokens
```

## How state is shared

- **Products** live in `App.jsx` (`useState(initialProducts)`) and are passed to
  pages as props. `AddProduct` appends to the list with `setProducts` and then
  navigates back to `/`.
- **Cart** lives in `CartContext`. `CartProvider` owns the state and exposes
  `addToCart`, `changeQty` and `removeItem` through the `useCart()` hook, so no
  page has to thread cart functions through props.

## Features to try

- Search "note" in the search box - the filter is case-insensitive.
- Pick a category from the dropdown to combine both filters.
- **Headphones** has a stock of `0`, so its card shows an "Out of stock" badge
  and its button is disabled.
- Add **Chair** (stock 3) to the cart three times, then the `+` button becomes
  disabled because you have hit the available quantity.
- On the cart page, press `−` on a line with quantity `1` and it is removed.
- Submit the Add Product form with an empty name or a price of `0` to see the
  validation messages.
