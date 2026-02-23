import React, { useState, useRef, useEffect } from "react";
import "./FAQ.css";

/* ── FAQ data ────────────────────────────────────────────── */
const faqs = [
  {
    id: 1,
    question:
      "What types of medicines and therapies does Asle Pharmaceuticals specialize in?",
    answer:
      "Asle Pharmaceuticals operates across six core therapeutic categories: AGA (androgenetic alopecia treatments), ED (erectile dysfunction care), Pet Health (veterinary-grade pharmaceuticals), Edema (fluid retention management), Diabetes (blood sugar regulation solutions), and Antibiotics (broad-spectrum infection treatment). Our R&D pipeline continues to expand into adjacent therapeutic areas.",
  },
  {
    id: 2,
    question:
      "How does Asle Pharmaceuticals ensure the safety and quality of its products?",
    answer:
      "Every Asle product undergoes rigorous multi-phase clinical trials, followed by stringent quality control at our GMP-certified manufacturing facilities. We comply with FDA, EMA, and WHO guidelines, and our pharmacovigilance team continuously monitors product safety post-launch through real-world evidence gathering and adverse event reporting systems.",
  },
  {
    id: 3,
    question:
      "Where can healthcare professionals access product information and research data?",
    answer:
      "Healthcare professionals can access detailed prescribing information, clinical trial data, and peer-reviewed publications through our dedicated HCP portal. Simply navigate to the 'Products' section and select the relevant category, or contact our medical affairs team at medinfo@aslepharmaceuticals.com for specific queries.",
  },
  {
    id: 4,
    question: "How can patients report side effects or adverse drug reactions?",
    answer:
      "Patient safety is our highest priority. Side effects can be reported directly through our 24/7 pharmacovigilance hotline at +1 (800) 555-ASLE, via the 'Report a Side Effect' form on our website, or by emailing safety@aslepharmaceuticals.com. All reports are reviewed within 24 hours by our safety team.",
  },
  {
    id: 5,
    question:
      "Does Asle Pharmaceuticals offer any patient assistance programs?",
    answer:
      "Yes. We believe that financial barriers should never prevent access to essential medication. Our Patient Assistance Program (PAP) provides eligible patients with discounted or free medications across all our therapeutic categories. Visit the 'Patient Resources' section in our footer or speak with your healthcare provider for enrollment details.",
  },
  {
    id: 6,
    question:
      "What sustainability initiatives are part of Asle's global operations?",
    answer:
      "Asle Pharmaceuticals is committed to carbon-neutral operations by 2030. Our initiatives include green manufacturing processes, sustainable packaging, water recycling at all production sites, and partnerships with global health organizations to improve medicine access in underserved communities across 80+ countries.",
  },
  {
    id: 7,
    question:
      "How can investors or distributors get in touch with the corporate team?",
    answer:
      "Investors can access quarterly reports, annual filings, and governance documentation in our Investor Relations portal. For distribution partnerships and business development inquiries, please reach out to partnerships@aslepharmaceuticals.com or call our corporate office. We welcome collaborations that align with our mission of global health improvement.",
  },
  {
    id: 8,
    question: "Is Asle Pharmaceuticals available in my country?",
    answer:
      "Asle Pharmaceuticals has a global presence spanning 80+ countries across Asia, Europe, the Middle East, Africa, and the Americas. Product availability may vary by region due to local regulatory approvals. Please check the 'About Us' section or contact your local Asle representative for country-specific information.",
  },
];

/* ── Single FAQ item with smooth height animation ────────── */
const FAQItem = ({ faq, isOpen, onToggle }) => {
  const contentRef = useRef(null);
  const [height, setHeight] = useState(0);

  /* Recalculate height when open state changes */
  useEffect(() => {
    if (isOpen) {
      setHeight(contentRef.current.scrollHeight);
    } else {
      setHeight(0);
    }
  }, [isOpen]);

  return (
    <div className={`faq__item ${isOpen ? "faq__item--open" : ""}`}>
      <button
        className="faq__question"
        onClick={onToggle}
        aria-expanded={isOpen}
        aria-controls={`faq-answer-${faq.id}`}
      >
        <span className="faq__question-text">{faq.question}</span>
        <span className="faq__icon" aria-hidden="true">
          <span className="faq__icon-bar faq__icon-bar--h" />
          <span className="faq__icon-bar faq__icon-bar--v" />
        </span>
      </button>

      <div
        id={`faq-answer-${faq.id}`}
        className="faq__answer-wrapper"
        role="region"
        style={{ height }}
      >
        <div className="faq__answer" ref={contentRef}>
          <p>{faq.answer}</p>
        </div>
      </div>
    </div>
  );
};

/* ── Main FAQ section ────────────────────────────────────── */
const FAQ = () => {
  const [openId, setOpenId] = useState(null);

  const handleToggle = (id) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <section className="faq" id="faq">
      {/* Decorative accents */}
      <div className="faq__bg-circle faq__bg-circle--1" />
      <div className="faq__bg-circle faq__bg-circle--2" />

      <div className="faq__container">
        {/* Header */}
        <div className="faq__header">
          <span className="faq__badge">
            <i className="fas fa-question-circle"></i> FAQ
          </span>
          <h2 className="faq__title">
            Frequently Asked{" "}
            <span className="faq__title-accent">Questions</span>
          </h2>
        </div>

        {/* Accordion list */}
        <div className="faq__list">
          {faqs.map((faq) => (
            <FAQItem
              key={faq.id}
              faq={faq}
              isOpen={openId === faq.id}
              onToggle={() => handleToggle(faq.id)}
            />
          ))}
        </div>

        {/* Contact CTA */}
        <div className="faq__cta">
          <p className="faq__cta-text">
            Still have questions? Our team is ready to assist you.
          </p>
          <a href="#contact" className="faq__cta-btn">
            <i className="fas fa-envelope"></i> Contact Us
          </a>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
