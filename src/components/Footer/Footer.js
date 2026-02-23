import React from "react";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer__main">
        <div className="footer__container">
          {/* Brand */}
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
            <p className="footer__desc">
              A global pharmaceutical company delivering innovative therapies
              across 80+ countries.
            </p>
            <div className="footer__socials">
              <a href="#!" aria-label="LinkedIn">
                <i className="fab fa-linkedin-in"></i>
              </a>
              <a href="#!" aria-label="Twitter">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="#!" aria-label="Instagram">
                <i className="fab fa-instagram"></i>
              </a>
            </div>
          </div>

          {/* Products */}
          <div className="footer__col">
            <h4 className="footer__col-title">Products</h4>
            <ul className="footer__links">
              <li>
                <a href="#products">AGA Treatment</a>
              </li>
              <li>
                <a href="#products">ED Care</a>
              </li>
              <li>
                <a href="#products">Pet Health</a>
              </li>
              <li>
                <a href="#products">Edema Relief</a>
              </li>
              <li>
                <a href="#products">Diabetes Management</a>
              </li>
              <li>
                <a href="#products">Antibiotics</a>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div className="footer__col">
            <h4 className="footer__col-title">Company</h4>
            <ul className="footer__links">
              <li>
                <a href="#home">Home</a>
              </li>
              <li>
                <a href="#about">About Us</a>
              </li>
              <li>
                <a href="#services">Services</a>
              </li>
              <li>
                <a href="#faq">FAQ</a>
              </li>
              <li>
                <a href="#!">Careers</a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div className="footer__col">
            <h4 className="footer__col-title">Contact</h4>
            <ul className="footer__contact">
              <li>
                <i className="fas fa-envelope"></i>
                info@aslepharmaceuticals.com
              </li>
              <li>
                <i className="fas fa-phone-alt"></i>
                +1 (800) 555-ASLE
              </li>
              <li>
                <i className="fas fa-map-marker-alt"></i>
                New York, NY 10001, USA
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div className="footer__bottom">
        <p>
          &copy; {new Date().getFullYear()} Asle Pharmaceuticals Ltd. All rights
          reserved.
        </p>
        <div className="footer__bottom-links">
          <a href="#!">Privacy Policy</a>
          <a href="#!">Terms of Use</a>
          <a href="#!">Compliance</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
