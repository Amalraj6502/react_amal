import { useState } from "react";
import { CartProvider } from "./context/CartContext";
import Navbar from "./components/Navbar";
import CartDrawer from "./components/CartDrawer";
import ProductModal from "./components/ProductModal";
import Footer from "./components/Footer";
import HomePage from "./pages/HomePage";
import WishlistPage from "./pages/WishlistPage";
import "./App.css";

function App() {
  const [page, setPage] = useState("home");
  const [cartOpen, setCartOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const handleProductClick = (product) => setSelectedProduct(product);

  return (
    <CartProvider>
      <div className="app">
        <Navbar
          onCartOpen={() => setCartOpen(true)}
          currentPage={page}
          setCurrentPage={setPage}
        />

        {page === "home" && (
          <HomePage
            onProductClick={handleProductClick}
            onShopClick={() => setPage("shop")}
          />
        )}
        {page === "shop" && (
          <main className="page-container shop-page">
            <div className="page-header">
              <h1 className="page-title">All Products</h1>
              <p className="page-sub">Discover our complete collection</p>
            </div>
            <div className="shop-grid-wrap">
              {/* Import inline to avoid separate file */}
              <ShopPageContent onProductClick={handleProductClick} />
            </div>
          </main>
        )}
        {page === "deals" && (
          <main className="page-container">
            <div className="page-header">
              <h1 className="page-title">🔥 Hot Deals</h1>
              <p className="page-sub">Limited time offers — grab them before they're gone!</p>
            </div>
            <DealsContent onProductClick={handleProductClick} />
          </main>
        )}
        {page === "about" && <AboutPage />}
        {page === "wishlist" && <WishlistPage onProductClick={handleProductClick} />}

        <Footer setCurrentPage={setPage} />
        <CartDrawer isOpen={cartOpen} onClose={() => setCartOpen(false)} />
        <ProductModal product={selectedProduct} onClose={() => setSelectedProduct(null)} />
      </div>
    </CartProvider>
  );
}

// Inline shop content
import ProductGrid from "./components/ProductGrid";
function ShopPageContent({ onProductClick }) {
  return <ProductGrid onProductClick={onProductClick} />;
}

// Deals
import { products } from "./data/products";
import ProductCard from "./components/ProductCard";
function DealsContent({ onProductClick }) {
  const deals = products.filter((p) => p.originalPrice > p.price);
  return (
    <div className="product-grid" style={{ paddingTop: "2rem" }}>
      {deals.map((p) => (
        <ProductCard key={p.id} product={p} onProductClick={onProductClick} />
      ))}
    </div>
  );
}

// About
function AboutPage() {
  return (
    <main className="page-container about-page">
      <div className="about-hero">
        <div className="about-text">
          <div className="section-label">✦ Our Story</div>
          <h1 className="about-title">We're Redefining <br /><span className="gradient-text">Online Shopping</span></h1>
          <p>NEXORA was founded in 2020 with a simple mission: make premium products accessible to everyone. We curate only the finest items across tech, fashion, beauty, and lifestyle.</p>
          <div className="about-stats">
            {[["2M+", "Happy Customers"], ["50K+", "Products"], ["150+", "Countries"], ["4.9★", "Average Rating"]].map(([n, l]) => (
              <div key={l} className="about-stat">
                <span className="about-stat-num">{n}</span>
                <span className="about-stat-label">{l}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="about-image">
          <img src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=600&h=500&fit=crop" alt="About NEXORA" />
        </div>
      </div>
      <div className="values-section">
        <div className="section-header">
          <div className="section-label">Our Values</div>
          <h2 className="section-title">What We Stand For</h2>
        </div>
        <div className="values-grid">
          {[
            { icon: "🌍", title: "Sustainability", desc: "We partner with eco-conscious brands and offset our carbon footprint with every order." },
            { icon: "💎", title: "Quality First", desc: "Every product is rigorously tested and hand-selected by our expert team before it reaches you." },
            { icon: "🤝", title: "Customer Love", desc: "We treat every customer like family. Your satisfaction is our top priority, always." },
            { icon: "⚡", title: "Innovation", desc: "We're constantly innovating — from our lightning-fast app to our AI-powered recommendations." },
          ].map((v) => (
            <div key={v.title} className="value-card">
              <div className="value-icon">{v.icon}</div>
              <h3>{v.title}</h3>
              <p>{v.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}

export default App;
