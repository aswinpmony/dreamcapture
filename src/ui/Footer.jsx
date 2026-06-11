import React, { useState } from "react";

const footerStyle = {
  background: "#05080F",
  borderTop: "1px solid rgba(255,255,255,0.05)",
  fontFamily: "'Inter', sans-serif",
};
const topBarStyle    = { padding:"80px 0 60px", borderBottom:"1px solid rgba(255,255,255,0.07)" };
const logoStyle      = { fontFamily:"'Playfair Display',serif", fontWeight:700, fontSize:"1.6rem", color:"#FFFFFF", textDecoration:"none", display:"inline-block", marginBottom:"1rem" };
const taglineStyle   = { fontSize:"0.875rem", color:"rgba(255,255,255,0.4)", lineHeight:1.7, maxWidth:"280px", marginBottom:"1.75rem" };
const socialBtnStyle = { display:"inline-flex", alignItems:"center", justifyContent:"center", width:"38px", height:"38px", borderRadius:"50%", border:"1px solid rgba(255,255,255,0.12)", color:"rgba(255,255,255,0.55)", textDecoration:"none", transition:"all 0.2s", fontSize:"0.8rem" };
const colHeadStyle   = { fontSize:"0.7rem", fontWeight:700, letterSpacing:"0.18em", textTransform:"uppercase", color:"rgba(255,255,255,0.35)", marginBottom:"1.25rem" };
const linkStyle      = { display:"block", color:"rgba(255,255,255,0.6)", textDecoration:"none", fontSize:"0.875rem", marginBottom:"0.65rem", transition:"color 0.18s" };
const newsletterInputStyle = { background:"rgba(255,255,255,0.06)", border:"1px solid rgba(255,255,255,0.1)", borderRadius:"50px 0 0 50px", color:"#fff", padding:"0.65rem 1.2rem", fontSize:"0.85rem", fontFamily:"'Inter',sans-serif", outline:"none", flex:1, minWidth:0 };
const newsletterBtnStyle   = { background:"#FF6B4A", border:"none", borderRadius:"0 50px 50px 0", color:"#fff", padding:"0.65rem 1.3rem", fontFamily:"'Inter',sans-serif", fontSize:"0.8rem", fontWeight:700, cursor:"pointer", letterSpacing:"0.06em", whiteSpace:"nowrap", transition:"background 0.18s" };
const bottomBarStyle = { padding:"1.5rem 0", display:"flex", flexWrap:"wrap", alignItems:"center", justifyContent:"space-between", gap:"0.75rem" };
const bottomTextStyle = { fontSize:"0.78rem", color:"rgba(255,255,255,0.3)" };

/* ── Nav link map — matches Header.jsx hrefs exactly ── */
const footerLinks = {
  Explore: [
    { label:"Home",        href:"#home"    },
    { label:"Tours",       href:"#tours"   },
    { label:"Gallery",     href:"#gallery" },
    { label:"About Us",    href:"#about"   },
    { label:"Contact",     href:"#contact" },
  ],
  Tours: [
    { label:"Europe",      href:"#tours" },
    { label:"Asia",        href:"#tours" },
    { label:"Africa",      href:"#tours" },
    { label:"Americas",    href:"#tours" },
    { label:"All Packages",href:"#tours" },
  ],
  Support: [
    { label:"FAQs",        href:"#contact" },
    { label:"Booking Policy",  href:"#contact" },
    { label:"Cancellations",   href:"#contact" },
    { label:"Travel Insurance",href:"#contact" },
    { label:"Privacy Policy",  href:"#contact" },
  ],
};

const socials = [
  { label:"Instagram", svg:<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/></svg> },
  { label:"Facebook",  svg:<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg> },
  { label:"Twitter",   svg:<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"/></svg> },
  { label:"YouTube",   svg:<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-1.96C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 1.96A29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58A2.78 2.78 0 0 0 3.4 19.54C5.12 20 12 20 12 20s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-1.96A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z"/><polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" fill="currentColor" stroke="none"/></svg> },
];

export default function Footer() {
  const [email, setEmail]       = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = () => {
    if (!email || !/\S+@\S+\.\S+/.test(email)) return;
    setSubscribed(true);
    setEmail("");
    setTimeout(() => setSubscribed(false), 4000);
  };

  return (
    <footer style={footerStyle} id="contact">
      {/* Invisible anchor for #about — sits at top of footer */}
      <span id="about" style={{ display:"block", position:"relative", top:"-80px" }} />

      <div className="container">
        <div style={topBarStyle}>
          <div className="row g-5">

            {/* Brand col */}
            <div className="col-12 col-md-4 col-lg-3">
              <a href="#home" style={logoStyle}>
                Dream<span style={{ color:"#FF6B4A" }}>Capture</span>
              </a>
              <p style={taglineStyle}>
                Crafting unforgettable journeys for curious souls since 2009. Your story starts here.
              </p>

              {/* Contact details — useful for customers after booking */}
              <div style={{ marginBottom:"1.5rem" }}>
                {[
                  { icon:"📍", text:"Ernakulam, Kerala, India" },
                  { icon:"📞", text:"+91 9696969696" },
                  { icon:"✉️", text:"hello@dreamcapture.in" },
                ].map(({ icon, text }) => (
                  <div key={text} style={{ display:"flex", gap:"8px", alignItems:"flex-start",
                    marginBottom:"0.5rem", fontFamily:"'Inter',sans-serif",
                    fontSize:"0.8rem", color:"rgba(255,255,255,0.45)" }}>
                    <span style={{ flexShrink:0 }}>{icon}</span>
                    <span>{text}</span>
                  </div>
                ))}
              </div>

              {/* Socials */}
              <div className="d-flex gap-2 flex-wrap">
                {socials.map((s) => (
                  <a key={s.label} href="#" style={socialBtnStyle} aria-label={s.label}
                    onMouseEnter={e => { e.currentTarget.style.background="#FF6B4A"; e.currentTarget.style.borderColor="#FF6B4A"; e.currentTarget.style.color="#fff"; }}
                    onMouseLeave={e => { e.currentTarget.style.background="transparent"; e.currentTarget.style.borderColor="rgba(255,255,255,0.12)"; e.currentTarget.style.color="rgba(255,255,255,0.55)"; }}>
                    {s.svg}
                  </a>
                ))}
              </div>
            </div>

            {/* Link columns — all hrefs point to real sections */}
            {Object.entries(footerLinks).map(([col, links]) => (
              <div key={col} className="col-6 col-md-2 col-lg-2">
                <div style={colHeadStyle}>{col}</div>
                {links.map(({ label, href }) => (
                  <a key={label} href={href} style={linkStyle}
                    onMouseEnter={e => e.target.style.color="#FF6B4A"}
                    onMouseLeave={e => e.target.style.color="rgba(255,255,255,0.6)"}>
                    {label}
                  </a>
                ))}
              </div>
            ))}

            {/* Newsletter col */}
            <div className="col-12 col-lg-3">
              <div style={colHeadStyle}>Stay Inspired</div>
              <p style={{ ...taglineStyle, marginBottom:"1.1rem", maxWidth:"100%" }}>
                Get curated travel inspiration and exclusive early-bird deals.
              </p>

              {subscribed ? (
                <div style={{ background:"rgba(16,185,129,0.12)", border:"1px solid rgba(16,185,129,0.3)",
                  borderRadius:"12px", padding:"0.8rem 1rem",
                  fontFamily:"'Inter',sans-serif", fontSize:"0.82rem", color:"#34D399" }}>
                  ✓ You're subscribed! Watch your inbox.
                </div>
              ) : (
                <div style={{ display:"flex" }}>
                  <input type="email" placeholder="your@email.com"
                    value={email} onChange={e => setEmail(e.target.value)}
                    onKeyDown={e => e.key === "Enter" && handleSubscribe()}
                    style={newsletterInputStyle} />
                  <button style={newsletterBtnStyle} onClick={handleSubscribe}
                    onMouseEnter={e => e.target.style.background="#e85a39"}
                    onMouseLeave={e => e.target.style.background="#FF6B4A"}>
                    Subscribe
                  </button>
                </div>
              )}

              {/* UPI payment note — helpful for customers */}
              <div style={{ marginTop:"1.5rem", background:"rgba(255,107,74,0.08)",
                border:"1px solid rgba(255,107,74,0.2)", borderRadius:"10px",
                padding:"0.75rem 1rem" }}>
                <div style={{ fontFamily:"'Inter',sans-serif", fontSize:"0.7rem",
                  fontWeight:700, letterSpacing:"0.1em", textTransform:"uppercase",
                  color:"#FF6B4A", marginBottom:"4px" }}>
                  We Accept
                </div>
                <div style={{ fontFamily:"'Inter',sans-serif", fontSize:"0.78rem",
                  color:"rgba(255,255,255,0.5)" }}>
                  UPI · GPay · PhonePe · Paytm · Bank Transfer
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Bottom bar */}
        <div style={bottomBarStyle}>
          <span style={bottomTextStyle}>
            © {new Date().getFullYear()} DreamCapture Travels. All rights reserved.
          </span>
          <div style={{ display:"flex", gap:"1.5rem" }}>
            {[
              { label:"Terms",   href:"#contact" },
              { label:"Privacy", href:"#contact" },
              { label:"Cookies", href:"#contact" },
            ].map(({ label, href }) => (
              <a key={label} href={href}
                style={{ ...bottomTextStyle, textDecoration:"none", transition:"color 0.18s" }}
                onMouseEnter={e => e.target.style.color="rgba(255,255,255,0.6)"}
                onMouseLeave={e => e.target.style.color="rgba(255,255,255,0.3)"}>
                {label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}