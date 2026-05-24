import HeroSlider from "../components/HeroSlider";
import ProductGrid from "../components/ProductGrid";

const features = [
  { icon: "🚚", title: "Free Shipping", desc: "On all orders over $50. No code needed." },
  { icon: "↩️", title: "30-Day Returns", desc: "Not happy? Return it within 30 days, no questions asked." },
  { icon: "🔒", title: "Secure Payment", desc: "256-bit SSL encryption protects your data." },
  { icon: "💬", title: "24/7 Support", desc: "Our team is available around the clock for you." },
];

const banners = [
  {
    title: "Summer Sale",
    sub: "Up to 60% off on selected items",
    bg: "linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)",
    accent: "#e94560",
    img: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=350&h=250&fit=crop",
  },
  {
    title: "New Tech Drops",
    sub: "Explore the latest gadgets",
    bg: "linear-gradient(135deg, #0f0c29 0%, #302b63 100%)",
    accent: "#6c63ff",
    img: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=350&h=250&fit=crop",
  },
];

export default function HomePage({ onProductClick, onShopClick }) {
  return (
    <main className="home-page">
      <HeroSlider onShopClick={onShopClick} />

      {/* Feature Strip */}
      <section className="features-strip">
        <div className="features-grid">
          {features.map((f) => (
            <div key={f.title} className="feature-card">
              <div className="feature-icon-wrap">{f.icon}</div>
              <div className="feature-text">
                <h4>{f.title}</h4>
                <p>{f.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Promo Banners */}
      <section className="promo-banners">
        <div className="promo-grid">
          {banners.map((b, i) => (
            <div key={i} className="promo-card" style={{ background: b.bg }}>
              <div className="promo-text">
                <h3 style={{ color: b.accent }}>{b.title}</h3>
                <p>{b.sub}</p>
                <button className="promo-btn" style={{ color: b.accent, borderColor: b.accent }} onClick={onShopClick}>
                  Shop Now →
                </button>
              </div>
              <div className="promo-img">
                <img src={b.img} alt={b.title} />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Products */}
      <ProductGrid onProductClick={onProductClick} />

      {/* Marquee Banner */}
      <div className="marquee-section">
        <div className="marquee-track">
          {[...Array(4)].map((_, i) => (
            <span key={i} className="marquee-item">
              ✦ FREE SHIPPING &nbsp;&nbsp; ✦ PREMIUM QUALITY &nbsp;&nbsp; ✦ 50K+ PRODUCTS &nbsp;&nbsp; ✦ 30-DAY RETURNS &nbsp;&nbsp; ✦ 2M+ HAPPY CUSTOMERS &nbsp;&nbsp;
            </span>
          ))}
        </div>
      </div>

      {/* Testimonials */}
      <section className="testimonials-section">
        <div className="section-header">
          <div className="section-label">💬 What Customers Say</div>
          <h2 className="section-title">Loved by Millions</h2>
        </div>
        <div className="testimonials-grid">
          {[
            { name: "Sarah K.", review: "Absolutely love the quality! Got my headphones in 2 days and they sound incredible.", rating: 5, avatar: "SK" },
            { name: "Mike R.", review: "Best online shopping experience I've ever had. The website is so smooth and fast!", rating: 5, avatar: "MR" },
            { name: "Priya M.", review: "Amazing deals and the customer support team was super helpful. Will definitely buy again.", rating: 5, avatar: "PM" },
          ].map((t) => (
            <div key={t.name} className="testimonial-card">
              <div className="test-stars">
                {[...Array(t.rating)].map((_, i) => <span key={i}>★</span>)}
              </div>
              <p className="test-review">"{t.review}"</p>
              <div className="test-author">
                <div className="test-avatar">{t.avatar}</div>
                <span>{t.name}</span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
