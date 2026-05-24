import { useState } from "react";
import { useCart } from "../context/CartContext";

export default function ProductModal({ product, onClose }) {
  const { dispatch, wishlist } = useCart();
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);
  const [selectedColor, setSelectedColor] = useState(0);

  if (!product) return null;

  const isWished = wishlist.some((w) => w.id === product.id);
  const discount = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);

  const handleAdd = () => {
    for (let i = 0; i < qty; i++) dispatch({ type: "ADD_ITEM", payload: product });
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <>
      <div className="modal-overlay" onClick={onClose} />
      <div className="product-modal">
        <button className="modal-close" onClick={onClose}>✕</button>
        <div className="modal-content">
          {/* Image */}
          <div className="modal-image-side">
            <div className="modal-img-wrap">
              <img src={product.image} alt={product.name} />
            </div>
            {discount > 0 && <div className="modal-discount-badge">-{discount}% OFF</div>}
          </div>

          {/* Details */}
          <div className="modal-details">
            <span className="modal-category">{product.category}</span>
            <h2 className="modal-product-name">{product.name}</h2>

            {/* Rating */}
            <div className="modal-rating">
              <div className="stars">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} viewBox="0 0 24 24" fill={i < Math.floor(product.rating) ? "#f59e0b" : "#374151"} className="star">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                  </svg>
                ))}
              </div>
              <span className="modal-rating-text">{product.rating} ({product.reviews.toLocaleString()} reviews)</span>
            </div>

            {/* Price */}
            <div className="modal-price">
              <span className="modal-price-current">${product.price}</span>
              <span className="modal-price-original">${product.originalPrice}</span>
              <span className="modal-save">Save ${(product.originalPrice - product.price).toFixed(2)}</span>
            </div>

            <p className="modal-description">{product.description}</p>

            {/* Color selector */}
            <div className="modal-colors">
              <label>Color:</label>
              <div className="color-options">
                {product.colors.map((c, i) => (
                  <button
                    key={i}
                    className={`color-option ${selectedColor === i ? "selected" : ""}`}
                    style={{ background: c }}
                    onClick={() => setSelectedColor(i)}
                  />
                ))}
              </div>
            </div>

            {/* Qty */}
            <div className="modal-qty">
              <label>Quantity:</label>
              <div className="qty-control">
                <button onClick={() => setQty(Math.max(1, qty - 1))}>−</button>
                <span>{qty}</span>
                <button onClick={() => setQty(Math.min(product.stock, qty + 1))}>+</button>
              </div>
              <span className="stock-info">{product.stock} in stock</span>
            </div>

            {/* Actions */}
            <div className="modal-actions">
              <button className={`modal-add-btn ${added ? "added" : ""}`} onClick={handleAdd}>
                {added ? "✓ Added to Cart!" : `Add ${qty} to Cart — $${(product.price * qty).toFixed(2)}`}
              </button>
              <button
                className={`modal-wish-btn ${isWished ? "wished" : ""}`}
                onClick={() => dispatch({ type: "TOGGLE_WISHLIST", payload: product })}
              >
                <svg viewBox="0 0 24 24" fill={isWished ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2">
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
                </svg>
              </button>
            </div>

            {/* Features */}
            <div className="modal-features">
              {["Free Shipping", "30-Day Returns", "Secure Payment", "24/7 Support"].map((f) => (
                <div key={f} className="feature-chip">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="feature-icon">
                    <polyline points="20 6 9 17 4 12"/>
                  </svg>
                  {f}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
