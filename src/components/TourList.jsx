import React, { useState } from "react";
import TourCard from "./TourCard";

const sectionStyle = {
  background: "#F8F7F4",
  padding: "100px 0",
};
const eyebrowStyle = {
  fontFamily: "'Inter', sans-serif",
  fontSize: "0.72rem", fontWeight: 700, letterSpacing: "0.22em",
  textTransform: "uppercase", color: "#FF6B4A",
  display: "inline-flex", alignItems: "center", gap: "10px", marginBottom: "0.75rem",
};
const headingStyle = {
  fontFamily: "'Playfair Display', serif", fontWeight: 700,
  fontSize: "clamp(2rem, 4vw, 3rem)", color: "#0A0F1E",
  letterSpacing: "-0.02em", lineHeight: 1.15, marginBottom: "1rem",
};
const subStyle = {
  fontFamily: "'Inter', sans-serif", fontSize: "1rem",
  color: "#6B7280", lineHeight: 1.7, maxWidth: "480px",
};
const filterBtnBase = {
  fontFamily: "'Inter', sans-serif", fontSize: "0.8rem", fontWeight: 600,
  letterSpacing: "0.06em", textTransform: "uppercase", borderRadius: "50px",
  padding: "0.45rem 1.3rem", border: "1.5px solid #E5E7EB",
  background: "transparent", color: "#6B7280", cursor: "pointer", transition: "all 0.18s",
};
const filterBtnActive = {
  ...filterBtnBase, background: "#0A0F1E", borderColor: "#0A0F1E", color: "#fff",
};

/* ── Tour data — update price from USD → INR ── */
const tours = [
  {
    id: 1,
    title: "Swiss Alpine Retreat",
    destination: "Switzerland",
    duration: "8 Days",
    groupSize: "Max 10",
    rating: 4.9, reviews: 218,
    price: 85000,
    badge: "Bestseller",
    region: "Europe",
    description: "Pristine alpine meadows, glacial lakes, and charming mountain villages on this immersive Swiss journey.",
    image: "https://images.unsplash.com/photo-1531366936337-7c912a4589a7?w=600&q=80",
  },
  {
    id: 2,
    title: "Santorini Sunset Escape",
    destination: "Greece",
    duration: "6 Days",
    groupSize: "Max 8",
    rating: 4.8, reviews: 341,
    price: 65000,
    badge: "Top Rated",
    region: "Europe",
    description: "Iconic white-washed terraces, volcanic beaches, and world-famous Aegean sunsets.",
    image: "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=600&q=80",
  },
  {
    id: 3,
    title: "Kyoto Cultural Immersion",
    destination: "Japan",
    duration: "10 Days",
    groupSize: "Max 12",
    rating: 5.0, reviews: 156,
    price: 110000,
    badge: "New",
    region: "Asia",
    description: "Ancient temples, bamboo forests, traditional tea ceremonies, and the art of Japanese slow living.",
    image: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=600&q=80",
  },
  {
    id: 4,
    title: "Moroccan Desert Odyssey",
    destination: "Morocco",
    duration: "9 Days",
    groupSize: "Max 10",
    rating: 4.7, reviews: 192,
    price: 58000,
    badge: "Adventure",
    region: "Africa",
    description: "Shifting Sahara dunes, medieval medinas, spice-scented souks, and nights beneath a canopy of stars.",
    image: "https://images.unsplash.com/photo-1539635278303-d4002c07eae3?w=600&q=80",
  },
  {
    id: 5,
    title: "Patagonia Wilderness Trek",
    destination: "Argentina",
    duration: "12 Days",
    groupSize: "Max 8",
    rating: 4.9, reviews: 87,
    price: 142000,
    badge: "Exclusive",
    region: "Americas",
    description: "Towering granite spires, turquoise glacial lakes, and untouched wilderness at the end of the world.",
    image: "https://images.unsplash.com/photo-1501854140801-50d01698950b?w=600&q=80",
  },
  {
    id: 6,
    title: "Amalfi Coast Drive",
    destination: "Italy",
    duration: "7 Days",
    groupSize: "Max 6",
    rating: 4.8, reviews: 274,
    price: 95000,
    badge: "Luxury",
    region: "Europe",
    description: "Cliffside villages draped in bougainvillea, cerulean waters, fresh-caught seafood and la dolce vita.",
    image: "https://images.unsplash.com/photo-1612698093158-e07ac200d44e?w=600&q=80",
  },
];

const filters = ["All", "Europe", "Asia", "Africa", "Americas"];

export default function TourList() {
  const [active, setActive] = useState("All");

  const filtered = active === "All"
    ? tours
    : tours.filter(t => t.region === active);

  return (
    <section style={sectionStyle} id="tours">
      <div className="container">

        {/* Section Header */}
        <div className="row mb-5 align-items-end">
          <div className="col-12 col-md-7">
            <div style={eyebrowStyle}>
              <span style={{ display:"inline-block", width:28, height:2, background:"#FF6B4A" }} />
              Handpicked Experiences
            </div>
            <h2 style={headingStyle}>
              Journeys Crafted for
              <br />
              <em style={{ color: "#FF6B4A" }}>the Curious Soul</em>
            </h2>
            <p style={subStyle}>
              Every package is personally vetted by our travel designers — because a great trip is a great story.
            </p>
          </div>
          <div className="col-12 col-md-5 mt-4 mt-md-0 d-flex justify-content-md-end align-items-end">
            <a
              href="#gallery"
              style={{
                fontFamily:"'Inter',sans-serif", fontSize:"0.85rem", fontWeight:600,
                color:"#0A0F1E", textDecoration:"none",
                borderBottom:"2px solid #FF6B4A", paddingBottom:"2px",
              }}
            >
              See Our Gallery →
            </a>
          </div>
        </div>

        {/* Filter Pills — now actually filters the cards */}
        <div className="d-flex flex-wrap gap-2 mb-5">
          {filters.map((f) => (
            <button
              key={f}
              style={active === f ? filterBtnActive : filterBtnBase}
              onClick={() => setActive(f)}
              onMouseEnter={(e) => {
                if (active !== f) {
                  e.currentTarget.style.borderColor = "#0A0F1E";
                  e.currentTarget.style.color = "#0A0F1E";
                }
              }}
              onMouseLeave={(e) => {
                if (active !== f) {
                  e.currentTarget.style.borderColor = "#E5E7EB";
                  e.currentTarget.style.color = "#6B7280";
                }
              }}
            >
              {f}
            </button>
          ))}
        </div>

        {/* Tour Grid */}
        <div className="row g-4">
          {filtered.length > 0 ? (
            filtered.map((tour) => (
              <div key={tour.id} className="col-12 col-md-6 col-lg-4">
                <TourCard tour={tour} />
              </div>
            ))
          ) : (
            <div className="col-12 text-center py-5">
              <p style={{ fontFamily:"'Inter',sans-serif", color:"#9CA3AF", fontSize:"1rem" }}>
                No tours found for this region yet. Check back soon!
              </p>
            </div>
          )}
        </div>

      </div>
    </section>
  );
}