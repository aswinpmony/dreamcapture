import React from "react";

const heroWrapperStyle = {
  position: "relative", minHeight: "100vh",
  display: "flex", alignItems: "center", overflow: "hidden",
};
const bgImageStyle = {
  position: "absolute", inset: 0,
  backgroundImage: "url('https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1800&q=85')",
  backgroundSize: "cover", backgroundPosition: "center 30%",
  transform: "scale(1.04)", transition: "transform 8s ease", zIndex: 0,
};
const overlayStyle = {
  position: "absolute", inset: 0,
  background: "linear-gradient(135deg,rgba(10,15,30,0.82) 0%,rgba(10,15,30,0.45) 60%,rgba(255,107,74,0.12) 100%)",
  zIndex: 1,
};
const contentStyle = { position:"relative", zIndex:2, paddingTop:"120px", paddingBottom:"80px" };
const eyebrowStyle = {
  fontFamily:"'Inter',sans-serif", fontSize:"0.75rem", fontWeight:700,
  letterSpacing:"0.22em", textTransform:"uppercase", color:"#FF6B4A",
  display:"inline-flex", alignItems:"center", gap:"10px", marginBottom:"1.25rem",
};
const headlineStyle = {
  fontFamily:"'Playfair Display',serif", fontWeight:700,
  fontSize:"clamp(2.6rem,6vw,5rem)", lineHeight:1.1, color:"#FFFFFF",
  letterSpacing:"-0.02em", marginBottom:"1.25rem",
};
const subStyle = {
  fontFamily:"'Inter',sans-serif", fontSize:"clamp(1rem,2vw,1.2rem)",
  color:"rgba(255,255,255,0.7)", lineHeight:1.7, maxWidth:"520px",
  marginBottom:"2.5rem", fontWeight:400,
};
const primaryBtnStyle = {
  background:"#FF6B4A", color:"#fff", border:"none", borderRadius:"50px",
  padding:"0.85rem 2.4rem", fontFamily:"'Inter',sans-serif", fontSize:"0.95rem",
  fontWeight:700, letterSpacing:"0.06em", textTransform:"uppercase",
  textDecoration:"none", display:"inline-block", transition:"all 0.2s",
  boxShadow:"0 8px 30px rgba(255,107,74,0.38)", cursor:"pointer",
};
const ghostBtnStyle = {
  background:"transparent", color:"#fff",
  border:"2px solid rgba(255,255,255,0.35)", borderRadius:"50px",
  padding:"0.85rem 2.4rem", fontFamily:"'Inter',sans-serif", fontSize:"0.95rem",
  fontWeight:600, letterSpacing:"0.06em", textTransform:"uppercase",
  textDecoration:"none", display:"inline-block", transition:"all 0.2s",
};
const statCardStyle = {
  background:"rgba(255,255,255,0.07)", backdropFilter:"blur(12px)",
  WebkitBackdropFilter:"blur(12px)", border:"1px solid rgba(255,255,255,0.12)",
  borderRadius:"16px", padding:"1.1rem 1.4rem", minWidth:"120px",
};
const stats = [
  { value:"50+",  label:"Destinations"    },
  { value:"12K+", label:"Happy Travelers" },
  { value:"98%",  label:"Satisfaction"    },
];

export default function Hero() {
  return (
    <section id="home" style={heroWrapperStyle}>
      <div style={bgImageStyle} />
      <div style={overlayStyle} />

      <div className="container" style={contentStyle}>
        <div className="row align-items-center">
          <div className="col-12 col-lg-8 col-xl-7">

            <div style={eyebrowStyle}>
              <span style={{ display:"inline-block", width:32, height:2, background:"#FF6B4A" }} />
              Award-Winning Travel Experiences
            </div>

            <h1 style={headlineStyle}>
              Discover the World's{" "}
              <span style={{ color:"#FF6B4A", fontStyle:"italic" }}>Hidden</span>
              <br />Masterpieces
            </h1>

            <p style={subStyle}>
              Curated luxury journeys to over 50 destinations — where every
              itinerary is crafted around your story, not a template.
            </p>

            {/* CTAs — both scroll to real sections */}
            <div className="d-flex flex-wrap gap-3 mb-5">
              <a
                href="#tours"
                style={primaryBtnStyle}
                onMouseEnter={(e) => {
                  e.target.style.background = "#e85a39";
                  e.target.style.transform = "translateY(-2px)";
                  e.target.style.boxShadow = "0 12px 40px rgba(255,107,74,0.48)";
                }}
                onMouseLeave={(e) => {
                  e.target.style.background = "#FF6B4A";
                  e.target.style.transform = "translateY(0)";
                  e.target.style.boxShadow = "0 8px 30px rgba(255,107,74,0.38)";
                }}
              >
                Explore Packages
              </a>
              <a
                href="#gallery"
                style={ghostBtnStyle}
                onMouseEnter={(e) => { e.target.style.borderColor="#FF6B4A"; e.target.style.color="#FF6B4A"; }}
                onMouseLeave={(e) => { e.target.style.borderColor="rgba(255,255,255,0.35)"; e.target.style.color="#fff"; }}
              >
                View Gallery
              </a>
            </div>

            {/* Stats */}
            <div className="d-flex flex-wrap gap-3">
              {stats.map((s) => (
                <div key={s.label} style={statCardStyle}>
                  <div style={{ fontFamily:"'Playfair Display',serif", fontSize:"1.6rem",
                    fontWeight:700, color:"#fff", lineHeight:1 }}>
                    {s.value}
                  </div>
                  <div style={{ fontFamily:"'Inter',sans-serif", fontSize:"0.72rem",
                    color:"rgba(255,255,255,0.55)", textTransform:"uppercase",
                    letterSpacing:"0.1em", marginTop:"4px" }}>
                    {s.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div style={{ position:"absolute", bottom:"2rem", left:"50%",
        transform:"translateX(-50%)", zIndex:2,
        display:"flex", flexDirection:"column", alignItems:"center", gap:"6px", opacity:0.5 }}>
        <span style={{ fontFamily:"'Inter',sans-serif", fontSize:"0.65rem",
          color:"#fff", letterSpacing:"0.18em", textTransform:"uppercase" }}>
          Scroll
        </span>
        <div style={{ width:1, height:32, background:"linear-gradient(to bottom,#fff,transparent)" }} />
      </div>
    </section>
  );
}