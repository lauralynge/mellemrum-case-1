import styles from "./Filters.module.css";

export default function Filters({
  search,
  setSearch,
  category,
  setCategory,
  categories,
}) {
  return (
    <section className={styles.filters}>
      <label className="formLabel">
        Søg
        <input
          type="search"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          placeholder="Søg efter titel eller sted"
        />
      </label>

      <label className="formLabel">
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
