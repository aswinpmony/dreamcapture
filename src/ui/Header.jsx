import React, { useState, useEffect } from "react";
import logo from '../assets/CAPTURE-DREAMS-LOGO.png';

const navStyle = {
  transition: "background 0.4s ease, box-shadow 0.4s ease",
  zIndex: 1050,
};

// 1. New Bright Frosted Glass Styles
const glassStyle = {
  background: "rgba(255, 255, 255, 0.85)", // White glass
  backdropFilter: "blur(18px)",
  WebkitBackdropFilter: "blur(18px)",
  boxShadow: "0 4px 32px rgba(0,0,0,0.05)",
  borderBottom: "1px solid rgba(0,0,0,0.05)",
};
const solidStyle = {
  background: "rgba(255, 255, 255, 0.98)", // Solid white when scrolled
  boxShadow: "0 2px 16px rgba(0,0,0,0.08)",
};

// 2. Text changed to Dark Navy so it shows up on the white background
const navLinkStyle = {
  color: "#0A0F1E", // Matches your dark website background!
  fontSize: "0.875rem",
  fontWeight: 600, // Made slightly bolder to read better
  letterSpacing: "0.04em",
  textTransform: "uppercase",
  textDecoration: "none",
  padding: "0.4rem 0.85rem",
  transition: "color 0.2s",
  fontFamily: "'Inter', sans-serif",
};

const ctaBtnStyle = {
  background: "#FF6B4A",
  color: "#fff",
  border: "none",
  borderRadius: "50px",
  padding: "0.5rem 1.5rem",
  fontFamily: "'Inter', sans-serif",
  fontSize: "0.85rem",
  fontWeight: 600,
  letterSpacing: "0.04em",
  textTransform: "uppercase",
  textDecoration: "none",
  transition: "background 0.2s, transform 0.15s",
  display: "inline-block",
};

const navLinks = [
  { label: "Home",    href: "#home"    },
  { label: "Tours",   href: "#tours"   },
  { label: "Gallery", href: "#gallery" },
  { label: "About",   href: "#about"   },
  { label: "Contact", href: "#contact" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleLinkClick = () => setMenuOpen(false);

  // 3. Removed the CSS filter. Logo is 100% original colors now.
  const logoStyle = {
    height: scrolled ? "46px" : "58px",
    width: "auto",
    display: "block",
    transition: "height 0.35s ease",
  };

  return (
    <nav
      className="navbar navbar-expand-lg fixed-top"
      style={{ ...navStyle, ...(scrolled ? solidStyle : glassStyle) }}
    >
      <div className="container">

        {/* Logo */}
        <a href="#home" onClick={handleLinkClick} style={{ textDecoration: "none", lineHeight: 0 }}>
          <img src={logo} alt="Dream Capture Travels" style={logoStyle} />
        </a>

        {/* Mobile toggler - 4. Changed the white lines to dark navy! */}
        <button
          className="navbar-toggler border-0 p-1"
          type="button"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle navigation"
          style={{ boxShadow: "none" }}
        >
          <span style={{ display: "block", width: 24, height: 2, background: "#0A0F1E", marginBottom: 5, transition: "all 0.2s" }} />
          <span style={{ display: "block", width: 16, height: 2, background: "#FF6B4A", marginBottom: 5 }} />
          <span style={{ display: "block", width: 24, height: 2, background: "#0A0F1E" }} />
        </button>

        {/* Nav links */}
        <div className={`collapse navbar-collapse ${menuOpen ? "show" : ""}`}>
          <ul className="navbar-nav ms-auto align-items-lg-center gap-lg-1">
            {navLinks.map(({ label, href }) => (
              <li className="nav-item" key={label}>
                <a
                  href={href}
                  style={navLinkStyle}
                  onClick={handleLinkClick}
                  onMouseEnter={e => e.target.style.color = "#FF6B4A"}
                  onMouseLeave={e => e.target.style.color = "#0A0F1E"} // Reset to dark navy
                >
                  {label}
                </a>
              </li>
            ))}
            <li className="nav-item ms-lg-3 mt-3 mt-lg-0">
              <a
                href="#tours"
                style={ctaBtnStyle}
                onClick={handleLinkClick}
                onMouseEnter={e => {
                  e.target.style.background = "#e85a39";
                  e.target.style.transform = "translateY(-1px)";
                }}
                onMouseLeave={e => {
                  e.target.style.background = "#FF6B4A";
                  e.target.style.transform = "translateY(0)";
                }}
              >
                Book Now
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}