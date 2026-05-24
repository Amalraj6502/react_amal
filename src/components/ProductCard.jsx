import { useState } from "react";
import { useCart } from "../context/CartContext";

export default function ProductCard({ product, onProductClick }) {
  const { dispatch, wishlist } = useCart();
  const [added, setAdded] = useState(false);
  const [hovered, setHovered] = useState(false);

  const isWished = wishlist.some((w) => w.id === product.id);
  const discount = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);

  const handleAddToCart = (e) => {
    e.stopPropagation();
    dispatch({ type: "ADD_ITEM", payload: product });
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  const handleWishlist = (e) => {
    e.stopPropagation();
    dispatch({ type: "TOGGLE_WISHLIST", payload: product });
  };

  return (
    <div
      className={`product-card ${hovered ? "hovered" : ""}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={() => onProductClick(product)}
    >
      {/* Badge */}
      {product.badge && <span className="product-badge">{product.badge}</span>}
      {discount > 0 && <span className="discount-badge">-{discount}%</span>}

      {/* Wishlist */}
      <button className={`wishlist-heart ${isWished ? "wished" : ""}`} onClick={handleWishlist}>
        <svg viewBox="0 0 24 24" fill={isWished ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2">
          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
        </svg>
      </button>

      {/* Image */}
      <div className="product-image-wrap">
        <img src={product.image} alt={product.name} className="product-image" loading="lazy" />
        <div className="product-overlay">
          <button className="quick-view-btn">Quick View</button>
        </div>
      </div>

      {/* Info */}
      <div className="product-info">
        <span className="product-category">{product.category}</span>
        <h3 className="product-name">{product.name}</h3>

        {/* Rating */}
        <div className="product-rating">
          <div className="stars">
            {[...Array(5)].map((_, i) => (
              <svg key={i} viewBox="0 0 24 24" fill={i < Math.floor(product.rating) ? "#f59e0b" : "#374151"} className="star">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
              </svg>
            ))}
          </div>
          <span className="rating-val">{product.rating}</span>
          <span className="rating-count">({product.reviews.toLocaleString()})</span>
        </div>

        {/* Price */}
        <div className="product-price">
          <span className="price-current">${product.price}</span>
          {product.originalPrice > product.price && (
            <span className="price-original">${product.originalPrice}</span>
          )}
        </div>

        {/* Color swatches */}
        <div className="color-swatches">
          {product.colors.map((c, i) => (
            <span key={i} className="swatch" style={{ background: c }} />
          ))}
        </div>

        {/* Add to Cart */}
        <button
          className={`add-to-cart-btn ${added ? "added" : ""}`}
          onClick={handleAddToCart}
        >
          {added ? (
            <>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                <polyline points="20 6 9 17 4 12"/>
              </svg>
              Added!
            </>
          ) : (
            <>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/>
                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
              </svg>
              Add to Cart
            </>
          )}
        </button>
      </div>
    </div>
  );
}
