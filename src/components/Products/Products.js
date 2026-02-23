import React, { useState, useEffect, useRef, useCallback } from "react";
import "./Products.css";

/* Product images */
import agaImg from "../../images/products/AGA.png";
import edImg from "../../images/products/ED.png";
import petsImg from "../../images/products/PETS.png";
import edemaImg from "../../images/products/EDEMA.png";
import diabetesImg from "../../images/products/DIABETES.png";
import antibioticsImg from "../../images/products/ANTIBIOTICS.png";

const products = [
  {
    id: 1,
    name: "AGA Treatment",
    category: "AGA",
    description:
      "Advanced androgenetic alopecia therapy promoting hair regrowth and follicle revitalization.",
    image: agaImg,
    badge: "Bestseller",
    color: "#007C6E",
  },
  {
    id: 2,
    name: "ED Care",
    category: "ED",
    description:
      "Clinically proven erectile dysfunction solution for improved performance and confidence.",
    image: edImg,
    badge: "Popular",
    color: "#005A4E",
  },
  {
    id: 3,
    name: "Pet Health",
    category: "PETS",
    description:
      "Veterinary-grade pharmaceutical care for your beloved pets' health and wellbeing.",
    image: petsImg,
    badge: "New",
    color: "#4ECDC4",
  },
  {
    id: 4,
    name: "Edema Relief",
    category: "EDEMA",
    description:
      "Targeted edema management therapy for effective fluid retention control and comfort.",
    image: edemaImg,
    badge: "Trusted",
    color: "#36b5ac",
  },
  {
    id: 5,
    name: "Diabetes Management",
    category: "DIABETES",
    description:
      "Comprehensive diabetes care solutions for blood sugar regulation and patient wellness.",
    image: diabetesImg,
    badge: "Featured",
    color: "#007C6E",
  },
  {
    id: 6,
    name: "Antibiotic Range",
    category: "ANTIBIOTIC",
    description:
      "Broad-spectrum antibiotic formulations for effective infection treatment and prevention.",
    image: antibioticsImg,
    badge: "Essential",
    color: "#005A4E",
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
  const canSlide = totalSlides > visibleCount;
  /* When fewer cards than slots, use totalSlides so each card fills more space */
  const effectiveVisible = canSlide ? visibleCount : totalSlides;

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev >= maxSlide ? 0 : prev + 1));
  }, [maxSlide]);

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev <= 0 ? maxSlide : prev - 1));
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  // Auto-play
  useEffect(() => {
    if (isAutoPlaying && canSlide) {
      intervalRef.current = setInterval(() => {
        nextSlide();
      }, 3000);
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isAutoPlaying, canSlide, nextSlide]);

  // Reset slide when category changes
  useEffect(() => {
    setCurrentSlide(0);
  }, [activeCategory]);

  const handleMouseEnter = () => setIsAutoPlaying(false);
  const handleMouseLeave = () => setIsAutoPlaying(true);

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
          {canSlide && (
            <button
              className="products__arrow products__arrow--left"
              onClick={prevSlide}
              aria-label="Previous"
            >
              <i className="fas fa-chevron-left"></i>
            </button>
          )}
          {canSlide && (
            <button
              className="products__arrow products__arrow--right"
              onClick={nextSlide}
              aria-label="Next"
            >
              <i className="fas fa-chevron-right"></i>
            </button>
          )}

          {/* Track */}
          <div className="products__track-wrapper">
            <div
              className={`products__track ${!canSlide ? "products__track--centered" : ""}`}
              style={{
                transform: canSlide
                  ? `translateX(-${safeCurrentSlide * (100 / visibleCount)}%)`
                  : "none",
              }}
            >
              {filteredProducts.map((product) => (
                <div
                  key={product.id}
                  className="products__card"
                  style={{
                    minWidth: `${100 / effectiveVisible}%`,
                    maxWidth: `${100 / effectiveVisible}%`,
                  }}
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
          {canSlide && (
            <div className="products__dots">
              {Array.from({ length: maxSlide + 1 }, (_, index) => (
                <button
                  key={index}
                  className={`products__dot ${index === safeCurrentSlide ? "products__dot--active" : ""}`}
                  onClick={() => goToSlide(index)}
                  aria-label={`Slide ${index + 1}`}
                />
              ))}
            </div>
          )}
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
