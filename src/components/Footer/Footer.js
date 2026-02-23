import React, { useState } from "react";
import "./Footer.css";

const Footer = () => {
  const [email, setEmail] = useState("");

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    console.log("Newsletter signup:", email);
    setEmail("");
  };

  return (
    <footer className="footer">
      {/* Newsletter Section */}
      <div className="footer__newsletter">
        <div className="footer__newsletter-container">
          <div className="footer__newsletter-content">
            <h3 className="footer__newsletter-title">
              Stay Updated with Healthcare Innovations
            </h3>
            <p className="footer__newsletter-desc">
              Subscribe to receive the latest news on drug developments,
              clinical trials, and healthcare insights.
            </p>
          </div>
          <form
            className="footer__newsletter-form"
            onSubmit={handleNewsletterSubmit}
          >
            <input
              type="email"
              placeholder="Enter your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="footer__newsletter-input"
              required
            />
            <button type="submit" className="footer__newsletter-btn">
              Subscribe <i className="fas fa-paper-plane"></i>
            </button>
          </form>
        </div>
      </div>

      {/* Main Footer */}
      <div className="footer__main">
        <div className="footer__container">
          {/* Brand Column */}
          <div className="footer__col footer__col--brand">
            <div className="footer__brand">
              <div className="footer__logo">
                <div className="footer__logo-icon">
                  <svg
                    viewBox="0 0 50 50"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <circle
                      cx="25"
                      cy="25"
                      r="24"
                      stroke="currentColor"
                      strokeWidth="2"
                    />
                    <path
                      d="M25 8L25 42M18 15L32 15M18 25L32 25M18 35L32 35"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                    />
                    <circle
                      cx="25"
                      cy="25"
                      r="8"
                      fill="currentColor"
                      opacity="0.15"
                    />
                    <path
                      d="M20 25C20 22.24 22.24 20 25 20C27.76 20 30 22.24 30 25C30 27.76 27.76 30 25 30"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                  </svg>
                </div>
                <div>
                  <span className="footer__logo-name">ASLE</span>
                  <span className="footer__logo-sub">PHARMACEUTICALS</span>
                </div>
              </div>
              <p className="footer__brand-desc">
                A global leader in pharmaceutical innovation, dedicated to
                developing breakthrough therapies that transform patients' lives
                across 80+ countries.
              </p>
              <div className="footer__certifications">
                <span className="footer__cert">
                  <i className="fas fa-shield-alt"></i> WHO-GMP Certified
                </span>
                <span className="footer__cert">
                  <i className="fas fa-award"></i> ISO 9001:2015
                </span>
                <span className="footer__cert">
                  <i className="fas fa-check-circle"></i> FDA Approved
                </span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="footer__col">
            <h4 className="footer__col-title">Quick Links</h4>
            <ul className="footer__links">
              <li>
                <a href="#home">
                  <i className="fas fa-chevron-right"></i> Home
                </a>
              </li>
              <li>
                <a href="#about">
                  <i className="fas fa-chevron-right"></i> About Us
                </a>
              </li>
              <li>
                <a href="#products">
                  <i className="fas fa-chevron-right"></i> Our Products
                </a>
              </li>
              <li>
                <a href="#services">
                  <i className="fas fa-chevron-right"></i> Services
                </a>
              </li>
              <li>
                <a href="#!">
                  <i className="fas fa-chevron-right"></i> Research &
                  Development
                </a>
              </li>
              <li>
                <a href="#!">
                  <i className="fas fa-chevron-right"></i> Investor Relations
                </a>
              </li>
              <li>
                <a href="#!">
                  <i className="fas fa-chevron-right"></i> Careers
                </a>
              </li>
            </ul>
          </div>

          {/* Therapeutic Areas */}
          <div className="footer__col">
            <h4 className="footer__col-title">Therapeutic Areas</h4>
            <ul className="footer__links">
              <li>
                <a href="#!">
                  <i className="fas fa-chevron-right"></i> Oncology
                </a>
              </li>
              <li>
                <a href="#!">
                  <i className="fas fa-chevron-right"></i> Cardiology
                </a>
              </li>
              <li>
                <a href="#!">
                  <i className="fas fa-chevron-right"></i> Neurology
                </a>
              </li>
              <li>
                <a href="#!">
                  <i className="fas fa-chevron-right"></i> Immunology
                </a>
              </li>
              <li>
                <a href="#!">
                  <i className="fas fa-chevron-right"></i> Respiratory
                </a>
              </li>
              <li>
                <a href="#!">
                  <i className="fas fa-chevron-right"></i> Dermatology
                </a>
              </li>
              <li>
                <a href="#!">
                  <i className="fas fa-chevron-right"></i> Gastroenterology
                </a>
              </li>
            </ul>
          </div>

          {/* Patient Resources */}
          <div className="footer__col">
            <h4 className="footer__col-title">Patient Resources</h4>
            <ul className="footer__links">
              <li>
                <a href="#upload">
                  <i className="fas fa-chevron-right"></i> Upload Prescription
                </a>
              </li>
              <li>
                <a href="#!">
                  <i className="fas fa-chevron-right"></i> Find a Pharmacy
                </a>
              </li>
              <li>
                <a href="#!">
                  <i className="fas fa-chevron-right"></i> Patient Support
                  Programs
                </a>
              </li>
              <li>
                <a href="#!">
                  <i className="fas fa-chevron-right"></i> Drug Safety
                  Information
                </a>
              </li>
              <li>
                <a href="#!">
                  <i className="fas fa-chevron-right"></i> Clinical Trials
                </a>
              </li>
              <li>
                <a href="#!">
                  <i className="fas fa-chevron-right"></i> Medical Information
                </a>
              </li>
              <li>
                <a href="#!">
                  <i className="fas fa-chevron-right"></i> Report Side Effects
                </a>
              </li>
            </ul>
          </div>

          {/* Contact & Compliance */}
          <div className="footer__col">
            <h4 className="footer__col-title">Contact Us</h4>
            <div className="footer__contact">
              <div className="footer__contact-item">
                <i className="fas fa-map-marker-alt"></i>
                <span>
                  Asle Tower, Business District,
                  <br />
                  New York, NY 10001, USA
                </span>
              </div>
              <div className="footer__contact-item">
                <i className="fas fa-phone-alt"></i>
                <span>
                  +1 (800) 555-ASLE
                  <br />
                  +1 (800) 555-2753
                </span>
              </div>
              <div className="footer__contact-item">
                <i className="fas fa-envelope"></i>
                <span>info@aslepharmaceuticals.com</span>
              </div>
              <div className="footer__contact-item">
                <i className="fas fa-clock"></i>
                <span>
                  Mon - Fri: 8:00 AM - 6:00 PM
                  <br />
                  24/7 Emergency Line
                </span>
              </div>
            </div>

            {/* Social Media */}
            <div className="footer__socials">
              <a href="#!" className="footer__social" aria-label="LinkedIn">
                <i className="fab fa-linkedin-in"></i>
              </a>
              <a href="#!" className="footer__social" aria-label="Twitter">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="#!" className="footer__social" aria-label="Facebook">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="#!" className="footer__social" aria-label="Instagram">
                <i className="fab fa-instagram"></i>
              </a>
              <a href="#!" className="footer__social" aria-label="YouTube">
                <i className="fab fa-youtube"></i>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="footer__bottom">
        <div className="footer__bottom-container">
          <p className="footer__copyright">
            &copy; {new Date().getFullYear()} Asle Pharmaceuticals Ltd. All
            rights reserved.
          </p>
          <div className="footer__bottom-links">
            <a href="#!">Privacy Policy</a>
            <a href="#!">Terms of Use</a>
            <a href="#!">Cookie Policy</a>
            <a href="#!">Accessibility</a>
            <a href="#!">Compliance</a>
            <a href="#!">Sitemap</a>
          </div>
          <p className="footer__disclaimer">
            The information provided on this website is for educational purposes
            only and is not intended as medical advice.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
