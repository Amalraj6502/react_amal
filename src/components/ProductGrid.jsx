import { useState } from "react";
import { products, categories } from "../data/products";
import ProductCard from "./ProductCard";

export default function ProductGrid({ onProductClick }) {
  const [active, setActive] = useState("all");
  const [sort, setSort] = useState("default");
  const [visible, setVisible] = useState(8);

  const filtered = products
    .filter((p) => active === "all" || p.category === active)
    .sort((a, b) => {
      if (sort === "price-asc") return a.price - b.price;
      if (sort === "price-desc") return b.price - a.price;
      if (sort === "rating") return b.rating - a.rating;
      return 0;
    });

  return (
    <section className="product-section">
      {/* Section Header */}
      <div className="section-header">
        <div className="section-label">🔥 Featured Collection</div>
        <h2 className="section-title">Shop Our Bestsellers</h2>
        <p className="section-desc">Handpicked products loved by thousands of customers</p>
      </div>

      {/* Filters */}
      <div className="filter-row">
        <div className="category-tabs">
          {categories.map((cat) => (
            <button
              key={cat.id}
              className={`cat-tab ${active === cat.id ? "active" : ""}`}
              onClick={() => { setActive(cat.id); setVisible(8); }}
            >
              <span className="cat-tab-icon">{cat.icon}</span>
              {cat.name}
            </button>
          ))}
        </div>
        <select
          className="sort-select"
          value={sort}
          onChange={(e) => setSort(e.target.value)}
        >
          <option value="default">Sort: Featured</option>
          <option value="price-asc">Price: Low to High</option>
          <option value="price-desc">Price: High to Low</option>
          <option value="rating">Top Rated</option>
        </select>
      </div>

      {/* Grid */}
      <div className="product-grid">
        {filtered.slice(0, visible).map((product, idx) => (
          <div key={product.id} className="product-grid-item" style={{ animationDelay: `${idx * 0.07}s` }}>
            <ProductCard product={product} onProductClick={onProductClick} />
          </div>
        ))}
      </div>

      {/* Load More */}
      {visible < filtered.length && (
        <div className="load-more-wrap">
          <button className="load-more-btn" onClick={() => setVisible((v) => v + 4)}>
            Load More Products
            <span className="load-more-count">{filtered.length - visible} remaining</span>
          </button>
        </div>
      )}
    </section>
  );
}
