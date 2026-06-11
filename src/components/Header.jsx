import React, { useState, useEffect } from "react";

const navStyle = {
  transition: "background 0.4s ease, box-shadow 0.4s ease",
  zIndex: 1050,
};

const glassStyle = {
  background: "rgba(10, 15, 30, 0.55)",
  backdropFilter: "blur(18px)",
  WebkitBackdropFilter: "blur(18px)",
  boxShadow: "0 4px 32px rgba(0,0,0,0.18)",
  borderBottom: "1px solid rgba(255,255,255,0.08)",
};

const solidStyle = {
  background: "rgba(10, 15, 30, 0.97)",
  boxShadow: "0 2px 16px rgba(0,0,0,0.32)",
};

const logoStyle = {
  fontFamily: "'Playfair Display', serif",
  fontWeight: 700,
  fontSize: "1.45rem",
  letterSpacing: "-0.01em",
  color: "#FFFFFF",
  textDecoration: "none",
};

const logoAccentStyle = {
  color: "#FF6B4A",
};

const navLinkStyle = {
  color: "rgba(255,255,255,0.82)",
  fontSize: "0.875rem",
  fontWeight: 500,
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
  padding: "0.45rem 1.4rem",
  fontFamily: "'Inter', sans-serif",
  fontSize: "0.85rem",
  fontWeight: 600,
  letterSpacing: "0.04em",
  textTransform: "uppercase",
  textDecoration: "none",
  transition: "background 0.2s, transform 0.15s",
  display: "inline-block",
};

// ✅ Each link now has a matching section id
const navLinks = [
  { label: "Home",        href: "#home"    },
  { label: "Tours",       href: "#tours"   },
  { label: "Gallery",     href: "#gallery" },
  { label: "About",       href: "#about"   },
  { label: "Contact",     href: "#contact" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close mobile menu on any nav-link click
  const handleLinkClick = () => setMenuOpen(false);

  return (
    <nav
      className="navbar navbar-expand-lg fixed-top"
      style={{ ...navStyle, ...(scrolled ? solidStyle : glassStyle) }}
    >
      <div className="container">
        {/* Logo → scrolls to top */}
        <a href="#home" style={logoStyle} onClick={handleLinkClick}>
          Dream<span style={logoAccentStyle}>Capture</span>{" "}
          
        </a>

        {/* Mobile toggler */}
        <button
          className="navbar-toggler border-0 p-1"
          type="button"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle navigation"
          style={{ boxShadow: "none" }}
        >
          <span style={{ display: "block", width: 24, height: 2, background: "#fff", marginBottom: 5, transition: "all 0.2s" }} />
          <span style={{ display: "block", width: 16, height: 2, background: "#FF6B4A", marginBottom: 5 }} />
          <span style={{ display: "block", width: 24, height: 2, background: "#fff" }} />
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
                  onMouseEnter={(e) => (e.target.style.color = "#FF6B4A")}
                  onMouseLeave={(e) => (e.target.style.color = "rgba(255,255,255,0.82)")}
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
                onMouseEnter={(e) => {
                  e.target.style.background = "#e85a39";
                  e.target.style.transform = "translateY(-1px)";
                }}
                onMouseLeave={(e) => {
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