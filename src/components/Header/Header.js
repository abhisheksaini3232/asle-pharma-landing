import React, { useState, useEffect } from "react";
import "./Header.css";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen);
    setSearchQuery("");
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    console.log("Searching for:", searchQuery);
  };

  return (
    <header className={`header ${isScrolled ? "header--scrolled" : ""}`}>
      {/* Main Navigation */}
      <nav className="header__nav">
        <div className="header__nav-container">
          {/* Logo */}
          <a href="#home" className="header__logo">
            <div className="header__logo-icon">
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
            <div className="header__logo-text">
              <span className="header__logo-name">ASLE</span>
              <span className="header__logo-sub">PHARMACEUTICALS</span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <ul
            className={`header__links ${isMobileMenuOpen ? "header__links--open" : ""}`}
          >
            <li>
              <a href="#home" className="header__link">
                Home
              </a>
            </li>
            <li className="header__link-dropdown">
              <a href="#products" className="header__link">
                Products <i className="fas fa-chevron-down"></i>
              </a>
              <div className="header__dropdown">
                <a href="#products">All Products</a>
                <a href="#products">Prescription Medicines</a>
                <a href="#products">Over-the-Counter</a>
                <a href="#products">Vaccines & Biologics</a>
                <a href="#products">Oncology</a>
                <a href="#products">Cardiology</a>
              </div>
            </li>
            <li className="header__link-dropdown">
              <a href="#services" className="header__link">
                Services <i className="fas fa-chevron-down"></i>
              </a>
              <div className="header__dropdown">
                <a href="#services">Clinical Trials</a>
                <a href="#services">Drug Development</a>
                <a href="#services">Healthcare Solutions</a>
                <a href="#services">Patient Support</a>
              </div>
            </li>
            <li>
              <a href="#about" className="header__link">
                About Us
              </a>
            </li>
            <li>
              <a
                href="#upload"
                className="header__link header__link--prescription"
              >
                <i className="fas fa-file-medical"></i> Upload Prescription
              </a>
            </li>
          </ul>

          {/* Right Actions */}
          <div className="header__actions">
            {/* Search */}
            <button
              className="header__action-btn"
              onClick={toggleSearch}
              aria-label="Search"
            >
              <i
                className={isSearchOpen ? "fas fa-times" : "fas fa-search"}
              ></i>
            </button>

            {/* Mobile Menu Toggle */}
            <button
              className={`header__hamburger ${isMobileMenuOpen ? "header__hamburger--active" : ""}`}
              onClick={toggleMobileMenu}
              aria-label="Menu"
            >
              <span></span>
              <span></span>
              <span></span>
            </button>
          </div>
        </div>

        {/* Search Bar Overlay */}
        <div
          className={`header__search ${isSearchOpen ? "header__search--open" : ""}`}
        >
          <div className="header__search-container">
            <form onSubmit={handleSearchSubmit} className="header__search-form">
              <i className="fas fa-search header__search-icon"></i>
              <input
                type="text"
                placeholder="Search products, medicines, treatments..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="header__search-input"
                autoFocus={isSearchOpen}
              />
              <button type="submit" className="header__search-btn">
                Search
              </button>
            </form>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
