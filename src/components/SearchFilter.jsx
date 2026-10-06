export default function SearchFilter({
  search,
  setSearch,
  category,
  setCategory,
  categories,
}) {
  return (
    <div className="search-filter">
      <div className="field">
        <label className="label" htmlFor="search">
          Search
        </label>
        <input
          id="search"
          className="input"
          type="text"
          placeholder="Search by name..."
          value={search}
          onChange={(event) => setSearch(event.target.value)}
        />
      </div>

      <div className="field">
        <label className="label" htmlFor="category">
          Category
        </label>
        <select
          id="category"
          className="input"
          value={category}
          onChange={(event) => setCategory(event.target.value)}
        >
          <option value="All">All</option>
          {categories.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
