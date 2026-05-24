import { useState, useEffect } from "react";
import { heroSlides } from "../data/products";

export default function HeroSlider({ onShopClick }) {
  const [current, setCurrent] = useState(0);
  const [animating, setAnimating] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      goNext();
    }, 5000);
    return () => clearInterval(interval);
  }, [current]);

  const goTo = (idx) => {
    if (animating || idx === current) return;
    setAnimating(true);
    setTimeout(() => {
      setCurrent(idx);
      setAnimating(false);
    }, 400);
  };

  const goNext = () => goTo((current + 1) % heroSlides.length);
  const goPrev = () => goTo((current - 1 + heroSlides.length) % heroSlides.length);

  const slide = heroSlides[current];

  return (
    <section className="hero-slider" style={{ background: slide.gradient }}>
      {/* Animated background blobs */}
      <div className="hero-blobs">
        <div className="blob blob1" style={{ background: slide.accent }}></div>
        <div className="blob blob2" style={{ background: slide.accent }}></div>
        <div className="blob blob3" style={{ background: slide.accent }}></div>
      </div>

      <div className={`hero-content ${animating ? "fade-out" : "fade-in"}`}>
        <div className="hero-text">
          <div className="hero-badge" style={{ borderColor: slide.accent, color: slide.accent }}>
            ✦ New Season Arrivals
          </div>
          <h1 className="hero-title">
            <span>{slide.title}</span>
            <br />
            <span className="hero-subtitle" style={{ color: slide.accent }}>{slide.subtitle}</span>
          </h1>
          <p className="hero-desc">{slide.description}</p>
          <div className="hero-actions">
            <button
              className="hero-cta"
              style={{ background: `linear-gradient(135deg, ${slide.accent}, ${slide.accent}99)` }}
              onClick={onShopClick}
            >
              {slide.cta} →
            </button>
            <button className="hero-cta-outline" style={{ borderColor: slide.accent, color: slide.accent }}>
              View Lookbook
            </button>
          </div>
          <div className="hero-stats">
            <div className="stat"><span className="stat-num">50K+</span><span className="stat-label">Products</span></div>
            <div className="stat-div"></div>
            <div className="stat"><span className="stat-num">4.9★</span><span className="stat-label">Rating</span></div>
            <div className="stat-div"></div>
            <div className="stat"><span className="stat-num">2M+</span><span className="stat-label">Customers</span></div>
          </div>
        </div>

        <div className="hero-image">
          <div className="hero-img-glow" style={{ background: `radial-gradient(circle, ${slide.accent}44, transparent 70%)` }}></div>
          <div className="hero-img-wrap">
            <img src={slide.productImage} alt={slide.title} />
          </div>
          {/* Floating tags */}
          <div className="floating-tag tag1">
            <div className="tag-dot" style={{ background: slide.accent }}></div>
            <span>Free Shipping</span>
          </div>
          <div className="floating-tag tag2">
            <div className="tag-dot" style={{ background: slide.accent }}></div>
            <span>Best Quality</span>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <button className="slider-btn slider-prev" onClick={goPrev}>‹</button>
      <button className="slider-btn slider-next" onClick={goNext}>›</button>

      {/* Dots */}
      <div className="slider-dots">
        {heroSlides.map((_, i) => (
          <button
            key={i}
            className={`dot ${i === current ? "active" : ""}`}
            style={i === current ? { background: slide.accent } : {}}
            onClick={() => goTo(i)}
          />
        ))}
      </div>

      {/* Scroll indicator */}
      <div className="scroll-indicator">
        <div className="scroll-mouse">
          <div className="scroll-wheel" style={{ background: slide.accent }}></div>
        </div>
        <span>Scroll</span>
      </div>
    </section>
  );
}
