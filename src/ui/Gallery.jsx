import React, { useState } from "react";

const sectionStyle = {
  background: "#0A0F1E",
  padding: "100px 0",
  overflow: "hidden",
};

const eyebrowStyle = {
  fontFamily: "'Inter', sans-serif",
  fontSize: "0.72rem",
  fontWeight: 700,
  letterSpacing: "0.22em",
  textTransform: "uppercase",
  color: "#FF6B4A",
  display: "inline-flex",
  alignItems: "center",
  gap: "10px",
  marginBottom: "0.75rem",
};

const headingStyle = {
  fontFamily: "'Playfair Display', serif",
  fontWeight: 700,
  fontSize: "clamp(2rem, 4vw, 3rem)",
  color: "#FFFFFF",
  letterSpacing: "-0.02em",
  lineHeight: 1.15,
  marginBottom: "1rem",
};

const subStyle = {
  fontFamily: "'Inter', sans-serif",
  fontSize: "1rem",
  color: "rgba(255,255,255,0.5)",
  lineHeight: 1.7,
};

// Gallery items — mix of tall and wide for a deliberate grid feel
const galleryItems = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=800&q=80",
    title: "Rome",
    country: "Italy",
    span: "tall", // col-span-1, row-span-2
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=800&q=80",
    title: "Bali",
    country: "Indonesia",
    span: "normal",
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1526392060635-9d6019884377?w=800&q=80",
    title: "Marrakech",
    country: "Morocco",
    span: "normal",
  },
  {
    id: 4,
    image: "https://images.unsplash.com/photo-1516483638261-f4dbaf036963?w=800&q=80",
    title: "Amalfi",
    country: "Italy",
    span: "wide", // col-span-2
  },
  {
    id: 5,
    image: "https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=800&q=80",
    title: "Istanbul",
    country: "Turkey",
    span: "tall",
  },
  {
    id: 6,
    image: "https://images.unsplash.com/photo-1542051841857-5f90071e7989?w=800&q=80",
    title: "Tokyo",
    country: "Japan",
    span: "normal",
  },
  {
    id: 7,
    image: "https://images.unsplash.com/photo-1589308078059-be1415eab4c3?w=800&q=80",
    title: "Santorini",
    country: "Greece",
    span: "normal",
  },
];

function GalleryItem({ item }) {
  const [hovered, setHovered] = useState(false);

  const baseItemStyle = {
    position: "relative",
    overflow: "hidden",
    borderRadius: "16px",
    cursor: "pointer",
    background: "#111827",
  };

  const heightMap = {
    tall: "420px",
    normal: "200px",
    wide: "200px",
  };

  return (
    <div
      style={{ ...baseItemStyle, height: heightMap[item.span] }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Image */}
      <img
        src={item.image}
        alt={item.title}
        loading="lazy"
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          transition: "transform 0.55s ease",
          transform: hovered ? "scale(1.1)" : "scale(1.0)",
          display: "block",
        }}
      />

      {/* Dark overlay */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: hovered
            ? "linear-gradient(to top, rgba(10,15,30,0.85) 0%, rgba(10,15,30,0.15) 100%)"
            : "linear-gradient(to top, rgba(10,15,30,0.6) 0%, transparent 60%)",
          transition: "background 0.35s ease",
        }}
      />

      {/* Label */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          padding: "1rem 1.1rem",
          transform: hovered ? "translateY(0)" : "translateY(4px)",
          transition: "transform 0.3s ease",
        }}
      >
        <div
          style={{
            fontFamily: "'Playfair Display', serif",
            fontWeight: 700,
            fontSize: item.span === "tall" ? "1.4rem" : "1.05rem",
            color: "#fff",
            lineHeight: 1.1,
            marginBottom: "3px",
          }}
        >
          {item.title}
        </div>
        <div
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: "0.7rem",
            fontWeight: 600,
            color: "#FF6B4A",
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            opacity: hovered ? 1 : 0.8,
            transition: "opacity 0.3s",
          }}
        >
          {item.country}
        </div>
      </div>

      {/* Hover CTA */}
      {hovered && (
        <div
          style={{
            position: "absolute",
            top: "14px",
            right: "14px",
            background: "rgba(255,107,74,0.9)",
            backdropFilter: "blur(6px)",
            borderRadius: "50px",
            padding: "5px 14px",
            fontFamily: "'Inter', sans-serif",
            fontSize: "0.7rem",
            fontWeight: 700,
            color: "#fff",
            letterSpacing: "0.08em",
            textTransform: "uppercase",
          }}
        >
          Explore
        </div>
      )}
    </div>
  );
}

export default function Gallery() {
  return (
    <section style={sectionStyle} id="gallery">
      <div className="container">
        {/* Header */}
        <div className="row mb-5">
          <div className="col-12 col-md-6">
            <div style={eyebrowStyle}>
              <span style={{ display: "inline-block", width: 28, height: 2, background: "#FF6B4A" }} />
              Around the World
            </div>
            <h2 style={headingStyle}>
              Destinations That
              <br />
              <em style={{ color: "#FF6B4A" }}>Take Your Breath Away</em>
            </h2>
          </div>
          <div className="col-12 col-md-6 d-flex align-items-end mt-3 mt-md-0">
            <p style={subStyle}>
              A curated window into the places that keep our travelers coming back — each one a chapter waiting to be written.
            </p>
          </div>
        </div>

        {/* Gallery Grid — two rows, CSS grid for desktop */}
        {/* Row 1: tall + 2 normal stacked + tall + wide */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gridTemplateRows: "200px 200px",
            gap: "14px",
          }}
          className="d-none d-md-grid"
        >
          {/* Rome — tall (2 rows) */}
          <div style={{ gridRow: "1 / 3" }}>
            <GalleryItem item={galleryItems[0]} />
          </div>
          {/* Bali */}
          <div>
            <GalleryItem item={{ ...galleryItems[1], span: "normal" }} />
          </div>
          {/* Istanbul — tall (2 rows) */}
          <div style={{ gridRow: "1 / 3" }}>
            <GalleryItem item={galleryItems[4]} />
          </div>
          {/* Tokyo */}
          <div>
            <GalleryItem item={{ ...galleryItems[5], span: "normal" }} />
          </div>
          {/* Marrakech */}
          <div>
            <GalleryItem item={{ ...galleryItems[2], span: "normal" }} />
          </div>
          {/* Santorini */}
          <div>
            <GalleryItem item={{ ...galleryItems[6], span: "normal" }} />
          </div>
        </div>

        {/* Amalfi wide — separate row */}
        <div
          style={{ marginTop: "14px" }}
          className="d-none d-md-block"
        >
          <div style={{ position: "relative", overflow: "hidden", borderRadius: "16px", height: "240px", cursor: "pointer" }}>
            <img
              src={galleryItems[3].image}
              alt="Amalfi"
              style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.55s ease" }}
              onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.06)")}
              onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
            />
            <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(10,15,30,0.65) 0%, transparent 60%)" }} />
            <div style={{ position: "absolute", bottom: "1.5rem", left: "1.5rem" }}>
              <div style={{ fontFamily: "'Playfair Display',serif", fontSize: "1.6rem", fontWeight: 700, color: "#fff" }}>Amalfi Coast</div>
              <div style={{ fontFamily: "'Inter',sans-serif", fontSize: "0.7rem", fontWeight: 700, color: "#FF6B4A", letterSpacing: "0.14em", textTransform: "uppercase" }}>Italy</div>
            </div>
          </div>
        </div>

        {/* Mobile: simple 2-col grid */}
        <div className="row g-3 d-md-none">
          {galleryItems.map((item) => (
            <div key={item.id} className="col-6">
              <GalleryItem item={{ ...item, span: "normal" }} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}