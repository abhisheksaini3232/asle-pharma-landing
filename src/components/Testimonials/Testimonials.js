import React, { useState, useCallback, useEffect, useRef } from "react";
import "./Testimonials.css";

/* ── Testimonial data ────────────────────────────────────── */
const testimonials = [
  {
    id: 1,
    name: "Dr. Priya Sharma",
    title: "Dermatologist — AGA Specialist",
    location: "New Delhi, India",
    quote:
      "Asle's AGA treatment line has transformed how I manage androgenetic alopecia. My patients see visible regrowth within 3 months — the results speak for themselves.",
    rating: 5,
    initials: "PS",
    color: "#007C6E",
  },
  {
    id: 2,
    name: "Rajesh Kumar",
    title: "Patient — ED Care",
    location: "Bengaluru, India",
    quote:
      "Quality of life improved dramatically after starting Asle's ED treatment. My confidence is back, and I can finally enjoy life without constant worry.",
    rating: 5,
    initials: "RK",
    color: "#36b5ac",
  },
  {
    id: 3,
    name: "Dr. Sarah Wilson",
    title: "Veterinarian — Pet Health",
    location: "Boston, USA",
    quote:
      "Asle's veterinary-grade pet health range is best-in-class. Excellent tolerability and consistent outcomes across breeds — my go-to recommendation.",
    rating: 5,
    initials: "SW",
    color: "#005A4E",
  },
  {
    id: 4,
    name: "Pharmacist Meera Patel",
    title: "Clinical Pharmacist — Edema",
    location: "Mumbai, India",
    quote:
      "Patients on Asle's edema management therapy consistently report better compliance and faster relief. Fluid retention is no longer a daily struggle for them.",
    rating: 5,
    initials: "MP",
    color: "#4ECDC4",
  },
  {
    id: 5,
    name: "Dr. Ahmed Khan",
    title: "Endocrinologist — Diabetes",
    location: "Dubai, UAE",
    quote:
      "Unmatched innovation in diabetes management. Asle's extended-release formulations have significantly improved patient adherence and blood sugar regulation.",
    rating: 5,
    initials: "AK",
    color: "#007C6E",
  },
  {
    id: 6,
    name: "Nurse Lisa Brown",
    title: "Infection Control — Antibiotics",
    location: "London, UK",
    quote:
      "Asle's antibiotic range has simplified complex treatment protocols significantly. Broad-spectrum efficacy with minimal resistance concerns — truly essential.",
    rating: 5,
    initials: "LB",
    color: "#36b5ac",
  },
];

/* ── Component ───────────────────────────────────────────── */
const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [slidesPerView, setSlidesPerView] = useState(3);
  const trackRef = useRef(null);

  /* Responsive: determine visible slides */
  useEffect(() => {
    const updateSlidesPerView = () => {
      const w = window.innerWidth;
      if (w >= 1024) setSlidesPerView(3);
      else if (w >= 768) setSlidesPerView(2);
      else setSlidesPerView(1);
    };
    updateSlidesPerView();
    window.addEventListener("resize", updateSlidesPerView);
    return () => window.removeEventListener("resize", updateSlidesPerView);
  }, []);

  const maxIndex = Math.max(0, testimonials.length - slidesPerView);

  /* Clamp index when slidesPerView changes */
  useEffect(() => {
    setCurrentIndex((prev) => Math.min(prev, maxIndex));
  }, [maxIndex]);

  /* Navigation handlers */
  const goNext = useCallback(() => {
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
  }, [maxIndex]);

  const goPrev = useCallback(() => {
    setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
  }, [maxIndex]);

  const goTo = (idx) => setCurrentIndex(idx);

  /* Keyboard navigation */
  const handleKeyDown = useCallback(
    (e) => {
      if (e.key === "ArrowLeft") goPrev();
      if (e.key === "ArrowRight") goNext();
    },
    [goPrev, goNext],
  );

  /* Stars renderer */
  const renderStars = (count) =>
    Array.from({ length: 5 }, (_, i) => (
      <i
        key={i}
        className={`fas fa-star testimonials__star ${i < count ? "testimonials__star--filled" : ""}`}
      />
    ));

  /* Dot indicators */
  const dots = Array.from({ length: maxIndex + 1 }, (_, i) => i);

  return (
    <section
      className="testimonials"
      aria-label="Customer Testimonials"
      onKeyDown={handleKeyDown}
      tabIndex="0"
    >
      {/* Decorative background elements */}
      <div className="testimonials__bg-accent" />

      <div className="testimonials__container">
        {/* Section header */}
        <div className="testimonials__header">
          <span className="testimonials__badge">
            <i className="fas fa-quote-left"></i> Testimonials
          </span>
          <h2 className="testimonials__title">
            Trusted by Healthcare Professionals{" "}
            <span className="testimonials__title-accent">Worldwide</span>
          </h2>
          <p className="testimonials__subtitle">
            Hear from doctors, patients, and pharmacists who rely on Asle
            Pharmaceuticals to deliver life-changing results every day.
          </p>
        </div>

        {/* Carousel */}
        <div className="testimonials__carousel">
          {/* Prev arrow */}
          <button
            className="testimonials__arrow testimonials__arrow--prev"
            onClick={goPrev}
            aria-label="Previous testimonials"
          >
            <i className="fas fa-chevron-left"></i>
          </button>

          {/* Track */}
          <div className="testimonials__track-wrapper">
            <div
              className="testimonials__track"
              ref={trackRef}
              style={{
                transform: `translateX(-${currentIndex * (100 / slidesPerView)}%)`,
              }}
            >
              {testimonials.map((t) => (
                <div
                  className="testimonials__slide"
                  key={t.id}
                  style={{ flex: `0 0 ${100 / slidesPerView}%` }}
                >
                  <div className="testimonials__card">
                    {/* Quote icon */}
                    <div className="testimonials__quote-icon">
                      <i className="fas fa-quote-right"></i>
                    </div>

                    {/* Rating */}
                    <div className="testimonials__rating">
                      {renderStars(t.rating)}
                    </div>

                    {/* Quote text */}
                    <p className="testimonials__quote">"{t.quote}"</p>

                    {/* Divider */}
                    <div className="testimonials__divider" />

                    {/* Author info */}
                    <div className="testimonials__author">
                      <div
                        className="testimonials__avatar"
                        style={{ background: t.color }}
                      >
                        {t.initials}
                      </div>
                      <div className="testimonials__author-info">
                        <span className="testimonials__author-name">
                          {t.name}
                        </span>
                        <span className="testimonials__author-title">
                          {t.title}
                        </span>
                        <span className="testimonials__author-location">
                          <i className="fas fa-map-marker-alt"></i> {t.location}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Next arrow */}
          <button
            className="testimonials__arrow testimonials__arrow--next"
            onClick={goNext}
            aria-label="Next testimonials"
          >
            <i className="fas fa-chevron-right"></i>
          </button>
        </div>

        {/* Dot indicators */}
        <div className="testimonials__dots">
          {dots.map((i) => (
            <button
              key={i}
              className={`testimonials__dot ${i === currentIndex ? "testimonials__dot--active" : ""}`}
              onClick={() => goTo(i)}
              aria-label={`Go to testimonial group ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
