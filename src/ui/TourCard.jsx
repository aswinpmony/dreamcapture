import React, { useState } from "react";
import BookingModal from "./Bookingmodal";

/* ── Styles ── */
const cardStyle = {
  borderRadius: "20px", overflow: "hidden", background: "#fff",
  border: "none",
  transition: "transform 0.28s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.28s ease",
  cursor: "pointer", boxShadow: "0 2px 16px rgba(10,15,30,0.08)", position: "relative",
};
const cardHoverStyle = { transform: "translateY(-10px)", boxShadow: "0 24px 60px rgba(10,15,30,0.16)" };
const imgWrapStyle  = { position: "relative", overflow: "hidden", height: "220px" };
const imgStyle      = { width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.5s ease" };
const imgHoverStyle = { transform: "scale(1.08)" };
const badgeStyle    = {
  position:"absolute", top:"14px", left:"14px",
  background:"rgba(10,15,30,0.72)", backdropFilter:"blur(8px)",
  color:"#fff", borderRadius:"50px", padding:"4px 12px",
  fontSize:"0.7rem", fontFamily:"'Inter',sans-serif", fontWeight:600,
  letterSpacing:"0.1em", textTransform:"uppercase",
};
const priceBadgeStyle = {
  position:"absolute", top:"14px", right:"14px",
  background:"#FF6B4A", color:"#fff", borderRadius:"12px", padding:"6px 14px",
  fontFamily:"'Playfair Display',serif", fontWeight:700, fontSize:"1.05rem",
  boxShadow:"0 4px 16px rgba(255,107,74,0.4)", lineHeight:1,
  display:"flex", flexDirection:"column", alignItems:"center",
};
const bodyStyle     = { padding: "1.35rem 1.4rem 1.5rem" };
const destStyle     = {
  fontFamily:"'Inter',sans-serif", fontSize:"0.7rem", fontWeight:700,
  letterSpacing:"0.16em", textTransform:"uppercase", color:"#FF6B4A",
  marginBottom:"6px", display:"flex", alignItems:"center", gap:"5px",
};
const titleStyle    = {
  fontFamily:"'Playfair Display',serif", fontWeight:700,
  fontSize:"1.22rem", color:"#0A0F1E", marginBottom:"0.55rem", lineHeight:1.25,
};
const descStyle     = { fontFamily:"'Inter',sans-serif", fontSize:"0.845rem", color:"#6B7280", lineHeight:1.65, marginBottom:"1.1rem" };
const metaStyle     = {
  display:"flex", alignItems:"center", gap:"16px", marginBottom:"1.25rem",
  paddingBottom:"1.1rem", borderBottom:"1px solid #F3F4F6",
};
const metaItemStyle = {
  display:"flex", alignItems:"center", gap:"5px",
  fontFamily:"'Inter',sans-serif", fontSize:"0.78rem", color:"#9CA3AF", fontWeight:500,
};
const bookBtnStyle  = {
  display:"block", width:"100%", textAlign:"center",
  background:"#0A0F1E", color:"#fff", borderRadius:"50px", padding:"0.65rem",
  fontFamily:"'Inter',sans-serif", fontSize:"0.82rem", fontWeight:700,
  letterSpacing:"0.08em", textTransform:"uppercase", textDecoration:"none",
  transition:"background 0.2s", border:"none", cursor:"pointer",
};

export default function TourCard({ tour }) {
  const [hovered,   setHovered]   = useState(false);
  const [showModal, setShowModal] = useState(false);

  const {
    title       = "Swiss Alpine Retreat",
    destination = "Switzerland",
    duration    = "8 Days",
    groupSize   = "Max 12",
    rating      = 4.9,
    reviews     = 218,
    price       = 2499,
    badge       = "Bestseller",
    description = "Explore pristine alpine meadows, glacial lakes, and charming mountain villages.",
    image       = "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&q=80",
  } = tour || {};

  return (
    <>
      <div
        style={{ ...cardStyle, ...(hovered ? cardHoverStyle : {}) }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        {/* Image */}
        <div style={imgWrapStyle}>
          <img src={image} alt={title}
            style={{ ...imgStyle, ...(hovered ? imgHoverStyle : {}) }} loading="lazy" />
          {badge && <span style={badgeStyle}>{badge}</span>}
          <div style={priceBadgeStyle}>
            <span style={{ fontSize:"0.65rem", fontFamily:"'Inter',sans-serif", fontWeight:500, opacity:0.85 }}>from</span>
            <span>₹{price.toLocaleString("en-IN")}</span>
          </div>
          <div style={{ position:"absolute", bottom:0, left:0, right:0, height:"60px",
            background:"linear-gradient(to top,rgba(10,15,30,0.35),transparent)" }} />
        </div>

        {/* Body */}
        <div style={bodyStyle}>
          <div style={destStyle}>
            <svg width="10" height="12" viewBox="0 0 10 12" fill="none">
              <path d="M5 0C2.24 0 0 2.24 0 5c0 3.75 5 7 5 7s5-3.25 5-7c0-2.76-2.24-5-5-5zm0 6.5A1.5 1.5 0 1 1 5 3.5a1.5 1.5 0 0 1 0 3z" fill="#FF6B4A"/>
            </svg>
            {destination}
          </div>
          <h3 style={titleStyle}>{title}</h3>
          <p style={descStyle}>{description}</p>

          <div style={metaStyle}>
            <div style={metaItemStyle}>
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" strokeWidth="2">
                <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
              </svg>
              {duration}
            </div>
            <div style={metaItemStyle}>
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" strokeWidth="2">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                <circle cx="9" cy="7" r="4"/>
                <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
                <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
              </svg>
              {groupSize}
            </div>
            <div style={metaItemStyle}>
              <span style={{ color:"#FF6B4A", fontSize:"0.75rem", letterSpacing:"1px" }}>★</span>
              {rating} ({reviews})
            </div>
          </div>

          <button
            style={bookBtnStyle}
            onClick={() => setShowModal(true)}
            onMouseEnter={e => e.target.style.background = "#FF6B4A"}
            onMouseLeave={e => e.target.style.background = "#0A0F1E"}
          >
            Book Now →
          </button>
        </div>
      </div>

      {/* Booking Modal — mounts outside the card so it overlays the full page */}
      {showModal && (
        <BookingModal
          tour={tour}
          onClose={() => setShowModal(false)}
        />
      )}
    </>
  );
}