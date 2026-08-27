export default function Filters({
  search,
  setSearch,
  category,
  setCategory,
  categories,
}) {
  return (
    <section className="filters">
      <label>
        Søg
        <input
          type="search"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          placeholder="Søg efter titel eller sted"
        />
      </label>

      <label>
        Kategori
        <select
          value={category}
          onChange={(event) => setCategory(event.target.value)}
        >
          {categories.map((item) => (
            <option key={item}>{item}</option>
          ))}
        </select>
      </label>
    </section>
  );
}


