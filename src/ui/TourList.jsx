import React, { useState, useEffect } from "react";
import TourCard from "./TourCard";
import { client } from "../client";
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

const filters = ["All", "Europe", "Asia", "Africa", "Americas"];

export default function TourList() {
  const [tours, setTours] = useState([]);
  const [active, setActive] = useState("All");

  useEffect(() => {
    const query = `*[_type == "tour"]{
      _id,
      title,
      destination,
      region,
      duration,
      groupSize,
      price,
      rating,
      reviews,
      badge,
      description,
      "image": image.asset->url
    }`;

    client.fetch(query)
      .then((data) => {
        console.log("Sanity Data:", data);
        setTours(data);
      })
      .catch((error) => console.error("Sanity fetch error:", error));
  }, []);

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

        {/* Filter Pills */}
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
              <div key={tour._id} className="col-12 col-md-6 col-lg-4">
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