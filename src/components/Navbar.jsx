import { useState, useEffect } from "react";
import { useCart } from "../context/CartContext";
import { categories } from "../data/products";

export default function Navbar({ onCartOpen, currentPage, setCurrentPage }) {
  const { itemCount } = useCart();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchVal, setSearchVal] = useState("");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <nav className={`navbar ${scrolled ? "scrolled" : ""}`}>
        <div className="nav-container">
          {/* Logo */}
          <div className="nav-logo" onClick={() => setCurrentPage("home")}>
            <div className="logo-icon">
              <svg viewBox="0 0 40 40" fill="none">
                <polygon points="20,2 38,12 38,28 20,38 2,28 2,12" fill="none" stroke="url(#lg)" strokeWidth="2.5"/>
                <polygon points="20,10 30,16 30,24 20,30 10,24 10,16" fill="url(#lg)" opacity="0.3"/>
                <defs>
                  <linearGradient id="lg" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#6c63ff"/>
                    <stop offset="100%" stopColor="#e94560"/>
                  </linearGradient>
                </defs>
              </svg>
            </div>
            <span className="logo-text">NEXORA</span>
          </div>

          {/* Desktop Nav Links */}
          <div className="nav-links">
            <button className={`nav-link ${currentPage === "home" ? "active" : ""}`} onClick={() => setCurrentPage("home")}>Home</button>
            <button className={`nav-link ${currentPage === "shop" ? "active" : ""}`} onClick={() => setCurrentPage("shop")}>Shop</button>
            <button className={`nav-link ${currentPage === "deals" ? "active" : ""}`} onClick={() => setCurrentPage("deals")}>Hot Deals</button>
            <button className={`nav-link ${currentPage === "about" ? "active" : ""}`} onClick={() => setCurrentPage("about")}>About</button>
          </div>

          {/* Nav Actions */}
          <div className="nav-actions">
            <button className="nav-icon-btn" onClick={() => setSearchOpen(!searchOpen)} aria-label="Search">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
              </svg>
            </button>
            <button className="nav-icon-btn wishlist-btn" onClick={() => setCurrentPage("wishlist")} aria-label="Wishlist">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
              </svg>
            </button>
            <button className="nav-icon-btn cart-btn" onClick={onCartOpen} aria-label="Cart">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/>
                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
              </svg>
              {itemCount > 0 && <span className="cart-badge">{itemCount}</span>}
            </button>
            <button className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
              <span className={menuOpen ? "open" : ""}></span>
              <span className={menuOpen ? "open" : ""}></span>
              <span className={menuOpen ? "open" : ""}></span>
            </button>
          </div>
        </div>

        {/* Search Bar */}
        <div className={`search-bar ${searchOpen ? "open" : ""}`}>
          <div className="search-inner">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="search-icon-inner">
              <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
            </svg>
            <input
              type="text"
              placeholder="Search for products, brands, categories..."
              value={searchVal}
              onChange={(e) => setSearchVal(e.target.value)}
              onKeyDown={(e) => { if (e.key === "Enter") { setCurrentPage("shop"); setSearchOpen(false); }}}
            />
            <button onClick={() => setSearchOpen(false)}>✕</button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div className={`mobile-menu ${menuOpen ? "open" : ""}`}>
          {["home", "shop", "deals", "about"].map((p) => (
            <button key={p} className={`mobile-link ${currentPage === p ? "active" : ""}`}
              onClick={() => { setCurrentPage(p); setMenuOpen(false); }}>
              {p.charAt(0).toUpperCase() + p.slice(1)}
            </button>
          ))}
        </div>
      </nav>

      {/* Category strip */}
      <div className="category-strip">
        <div className="category-scroll">
          {categories.map((cat) => (
            <button key={cat.id} className="cat-chip" onClick={() => setCurrentPage("shop")}>
              <span>{cat.icon}</span> {cat.name}
            </button>
          ))}
        </div>
      </div>
    </>
  );
}
