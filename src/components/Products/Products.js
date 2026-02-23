import React, { useState, useEffect, useRef, useCallback } from "react";
import "./Products.css";

/* Placeholder product data — replace image paths with your uploaded images from src/images/products/ */
const products = [
  {
    id: 1,
    name: "CardioShield Pro",
    category: "Cardiology",
    description:
      "Advanced cardiovascular protection therapy for heart health management.",
    image: null,
    badge: "Bestseller",
    color: "#e74c3c",
  },
  {
    id: 2,
    name: "NeuroCalm Plus",
    category: "Neurology",
    description:
      "Next-generation neurological support for cognitive function improvement.",
    image: null,
    badge: "New",
    color: "#9b59b6",
  },
  {
    id: 3,
    name: "ImmunoBoost 360",
    category: "Immunology",
    description:
      "Comprehensive immune system fortification for year-round protection.",
    image: null,
    badge: "Popular",
    color: "#2ecc71",
  },
  {
    id: 4,
    name: "OncoGuard Therapy",
    category: "Oncology",
    description:
      "Targeted oncology treatment supporting cancer care and remission.",
    image: null,
    badge: "Breakthrough",
    color: "#e67e22",
  },
  {
    id: 5,
    name: "RespiClear Advanced",
    category: "Respiratory",
    description:
      "Premium respiratory care solution for lung health and clear breathing.",
    image: null,
    badge: "Featured",
    color: "#3498db",
  },
  {
    id: 6,
    name: "GastroEase Ultra",
    category: "Gastroenterology",
    description:
      "Effective gastrointestinal health supplement for digestive wellness.",
    image: null,
    badge: "Trusted",
    color: "#1abc9c",
  },
  {
    id: 7,
    name: "DermaGlow Rx",
    category: "Dermatology",
    description:
      "Clinical-grade skincare therapy for healthy and radiant skin.",
    image: null,
    badge: "Premium",
    color: "#f39c12",
  },
  {
    id: 8,
    name: "OrthoFlex Joint",
    category: "Orthopedics",
    description:
      "Advanced joint care formula for mobility and bone strength support.",
    image: null,
    badge: "Recommended",
    color: "#007C6E",
  },
];

const categories = ["All", ...new Set(products.map((p) => p.category))];

const Products = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const carouselRef = useRef(null);
  const intervalRef = useRef(null);

  const filteredProducts =
    activeCategory === "All"
      ? products
      : products.filter((p) => p.category === activeCategory);

  const totalSlides = filteredProducts.length;

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % totalSlides);
  }, [totalSlides]);

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  // Auto-play
  useEffect(() => {
    if (isAutoPlaying && totalSlides > 1) {
      intervalRef.current = setInterval(() => {
        nextSlide();
      }, 3000);
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isAutoPlaying, totalSlides, nextSlide]);

  // Reset slide when category changes
  useEffect(() => {
    setCurrentSlide(0);
  }, [activeCategory]);

  const handleMouseEnter = () => setIsAutoPlaying(false);
  const handleMouseLeave = () => setIsAutoPlaying(true);

  // Calculate visible cards per view
  const getVisibleCount = () => {
    if (typeof window !== "undefined") {
      if (window.innerWidth <= 640) return 1;
      if (window.innerWidth <= 1024) return 2;
      return 3;
    }
    return 3;
  };

  const [visibleCount, setVisibleCount] = useState(getVisibleCount());

  useEffect(() => {
    const handleResize = () => setVisibleCount(getVisibleCount());
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const maxSlide = Math.max(0, totalSlides - visibleCount);
  const safeCurrentSlide = Math.min(currentSlide, maxSlide);

  return (
    <section className="products" id="products">
      <div className="products__container">
        {/* Section Header */}
        <div className="products__header">
          <span className="products__label">Our Products</span>
          <h2 className="products__title">
            Innovative <span>Healthcare</span> Solutions
          </h2>
          <p className="products__desc">
            Discover our comprehensive range of pharmaceutical products designed
            to improve patient outcomes across multiple therapeutic areas
            worldwide.
          </p>
        </div>

        {/* Category Filter */}
        <div className="products__categories">
          {categories.map((cat) => (
            <button
              key={cat}
              className={`products__cat-btn ${activeCategory === cat ? "products__cat-btn--active" : ""}`}
              onClick={() => setActiveCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Carousel */}
        <div
          className="products__carousel"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          ref={carouselRef}
        >
          {/* Nav Arrows */}
          <button
            className="products__arrow products__arrow--left"
            onClick={prevSlide}
            aria-label="Previous"
          >
            <i className="fas fa-chevron-left"></i>
          </button>
          <button
            className="products__arrow products__arrow--right"
            onClick={nextSlide}
            aria-label="Next"
          >
            <i className="fas fa-chevron-right"></i>
          </button>

          {/* Track */}
          <div className="products__track-wrapper">
            <div
              className="products__track"
              style={{
                transform: `translateX(-${safeCurrentSlide * (100 / visibleCount)}%)`,
              }}
            >
              {filteredProducts.map((product) => (
                <div
                  key={product.id}
                  className="products__card"
                  style={{ minWidth: `${100 / visibleCount}%` }}
                  onClick={() => console.log("Clicked:", product.name)}
                >
                  <div className="products__card-inner">
                    {/* Image Area */}
                    <div
                      className="products__card-image"
                      style={{
                        background: `linear-gradient(135deg, ${product.color}15, ${product.color}30)`,
                      }}
                    >
                      {product.image ? (
                        <img src={product.image} alt={product.name} />
                      ) : (
                        <div
                          className="products__card-placeholder"
                          style={{ color: product.color }}
                        >
                          <i className="fas fa-pills"></i>
                        </div>
                      )}
                      <span
                        className="products__card-badge"
                        style={{ background: product.color }}
                      >
                        {product.badge}
                      </span>
                    </div>

                    {/* Info */}
                    <div className="products__card-info">
                      <span
                        className="products__card-category"
                        style={{ color: product.color }}
                      >
                        {product.category}
                      </span>
                      <h3 className="products__card-name">{product.name}</h3>
                      <p className="products__card-desc">
                        {product.description}
                      </p>
                      <button
                        className="products__card-btn"
                        style={{
                          borderColor: product.color,
                          color: product.color,
                        }}
                      >
                        Learn More <i className="fas fa-arrow-right"></i>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Dots */}
          <div className="products__dots">
            {filteredProducts.map((_, index) => (
              <button
                key={index}
                className={`products__dot ${index === safeCurrentSlide ? "products__dot--active" : ""}`}
                onClick={() => goToSlide(index)}
                aria-label={`Slide ${index + 1}`}
              />
            ))}
          </div>
        </div>

        {/* View All CTA */}
        <div className="products__cta">
          <a href="#products" className="products__cta-btn">
            View All Products <i className="fas fa-arrow-right"></i>
          </a>
        </div>
      </div>
    </section>
  );
};

export default Products;
