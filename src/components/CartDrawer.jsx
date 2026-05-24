import { useCart } from "../context/CartContext";

export default function CartDrawer({ isOpen, onClose }) {
  const { items, dispatch, total, itemCount } = useCart();

  if (!isOpen) return null;

  return (
    <>
      <div className="cart-overlay" onClick={onClose} />
      <div className={`cart-drawer ${isOpen ? "open" : ""}`}>
        {/* Header */}
        <div className="cart-header">
          <div className="cart-title">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/>
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
            </svg>
            <h2>Your Cart <span>({itemCount})</span></h2>
          </div>
          <button className="cart-close" onClick={onClose}>✕</button>
        </div>

        {/* Items */}
        <div className="cart-items">
          {items.length === 0 ? (
            <div className="cart-empty">
              <div className="empty-cart-icon">🛒</div>
              <p>Your cart is empty</p>
              <small>Add items to get started</small>
              <button className="btn-primary" onClick={onClose}>Browse Products</button>
            </div>
          ) : (
            items.map((item) => (
              <div className="cart-item" key={item.id}>
                <div className="cart-item-img">
                  <img src={item.image} alt={item.name} />
                </div>
                <div className="cart-item-info">
                  <h4>{item.name}</h4>
                  <span className="cart-item-cat">{item.category}</span>
                  <div className="cart-item-controls">
                    <div className="qty-control">
                      <button onClick={() => {
                        if (item.qty <= 1) dispatch({ type: "REMOVE_ITEM", payload: item.id });
                        else dispatch({ type: "UPDATE_QTY", payload: { id: item.id, qty: item.qty - 1 } });
                      }}>−</button>
                      <span>{item.qty}</span>
                      <button onClick={() => dispatch({ type: "UPDATE_QTY", payload: { id: item.id, qty: item.qty + 1 } })}>+</button>
                    </div>
                    <span className="cart-item-price">${(item.price * item.qty).toFixed(2)}</span>
                  </div>
                </div>
                <button className="cart-item-remove" onClick={() => dispatch({ type: "REMOVE_ITEM", payload: item.id })}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14H6L5 6"/>
                    <path d="M10 11v6m4-6v6m1-10V4a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v3"/>
                  </svg>
                </button>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="cart-footer">
            <div className="cart-summary">
              <div className="summary-row"><span>Subtotal</span><span>${total.toFixed(2)}</span></div>
              <div className="summary-row"><span>Shipping</span><span className="free">FREE</span></div>
              <div className="summary-row total"><span>Total</span><span>${total.toFixed(2)}</span></div>
            </div>
            <button className="checkout-btn">
              Checkout Now
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M5 12h14m-7-7 7 7-7 7"/>
              </svg>
            </button>
            <button className="clear-cart-btn" onClick={() => dispatch({ type: "CLEAR_CART" })}>Clear Cart</button>
          </div>
        )}
      </div>
    </>
  );
}
