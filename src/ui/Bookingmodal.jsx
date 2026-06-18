import React, { useState, useEffect } from "react";

export default function BookingModal({ isOpen, onClose, tour }) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [shouldAnimate, setShouldAnimate] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => setShouldAnimate(true), 10);
    } else {
      setShouldAnimate(false);
    }
  }, [isOpen]);

  const handleClose = () => {
    setShouldAnimate(false);
    setTimeout(onClose, 200); 
  };

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => (document.body.style.overflow = "auto"); 
  }, [isOpen]);

  if (!isOpen) return null;

  /* ── 🎨 Premium Styles ── */
  const colors = {
    accent: "#FF6B4A", 
    dark: "#0A0F1E",   
    text: "#4B5563",   
    border: "#F3F4F6",  
  };

  const overlayStyle = {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(10, 15, 30, 0.7)", 
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 9999,
    padding: "20px",
  };

  // The base inline style for the modal container
  const modalBaseStyle = {
    background: "#fff",
    borderRadius: "24px",
    width: "100%",
    maxWidth: "850px", 
    overflow: "hidden", 
    fontFamily: "'Inter', sans-serif",
    position: "relative",
    opacity: shouldAnimate ? 1 : 0,
    transform: shouldAnimate ? "scale(1)" : "scale(0.95)",
    transition: "opacity 0.28s ease, transform 0.28s cubic-bezier(0.34, 1.56, 0.64, 1)",
    boxShadow: "0 24px 60px rgba(10,15,30,0.16)",
  };

  const closeBtnStyle = {
    position: "absolute",
    top: "15px",
    right: "15px",
    background: "#fff",
    border: `1px solid ${colors.border}`,
    borderRadius: "50%",
    width: "36px",
    height: "36px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "1.2rem",
    color: colors.text,
    cursor: "pointer",
    zIndex: 100, // Make sure it sits above the image on mobile
    transition: "background 0.2s",
    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
  };

  const labelStyle = {
    display: "block",
    fontSize: "0.75rem",
    fontWeight: 600,
    letterSpacing: "0.1em",
    textTransform: "uppercase",
    color: colors.dark,
    marginBottom: "6px",
  };

  const inputStyle = {
    width: "100%",
    padding: "0.85rem 1.1rem",
    background: "#F9FAFB",
    border: `1px solid ${colors.border}`,
    borderRadius: "10px",
    fontSize: "0.9rem",
    color: colors.dark,
    outline: "none",
    transition: "border-color 0.2s, background 0.2s",
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(e.target);
    // TODO: Paste your actual Web3Forms Access Key here!
    formData.append("access_key", "5128535f-85b0-40a0-aa33-5215ab4a6068");
    formData.append("subject", `Request for Unforgettable Journey: ${tour?.name || "Tour"}`);

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (data.success) {
        setIsSuccess(true);
      } else {
        alert("Something went wrong. Please try again.");
      }
    } catch (error) {
      console.error("Submission failed:", error);
      alert("Network error. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleFocus = (e) => {
    e.target.style.borderColor = colors.accent;
    e.target.style.background = "#fff";
  };
  const handleBlur = (e) => {
    e.target.style.borderColor = colors.border;
    e.target.style.background = "#F9FAFB";
  };

  return (
    <div style={overlayStyle} onClick={handleClose}>
      {/* 📱 INJECTED RESPONSIVE CSS */}
      <style>
        {`
          .responsive-modal-layout {
            display: grid;
            grid-template-columns: minmax(300px, 1fr) 1.25fr;
            max-height: 90vh;
          }
          .responsive-image-section {
            position: relative;
            overflow: hidden;
          }
          .responsive-form-section {
            padding: 3rem;
            display: flex;
            flex-direction: column;
            overflow-y: auto;
          }
          .responsive-input-row {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 1rem;
          }
          .responsive-field {
            margin-bottom: 1.1rem;
          }
          
          /* MOBILE FIXES */
          @media (max-width: 768px) {
            .responsive-modal-layout {
              grid-template-columns: 1fr;
              overflow-y: auto; 
            }
            .responsive-image-section {
              height: 220px; /* Fixed height banner for mobile */
              flex-shrink: 0;
            }
            .responsive-form-section {
              padding: 1.5rem;
              overflow-y: visible;
            }
            .responsive-input-row {
              grid-template-columns: 1fr; /* Stack inputs on mobile */
              gap: 0;
            }
            .mobile-title {
              font-size: 1.4rem !important;
              margin-bottom: 0.5rem !important;
            }
          }
        `}
      </style>

      <div style={modalBaseStyle} className="responsive-modal-layout" onClick={(e) => e.stopPropagation()}>
        <button
          onClick={handleClose}
          style={closeBtnStyle}
          onMouseEnter={(e) => (e.currentTarget.style.background = "#F9FAFB")}
          onMouseLeave={(e) => (e.currentTarget.style.background = "#fff")}
        >
          &times;
        </button>

        {isSuccess ? (
          <div className="responsive-form-section" style={{ gridColumn: "1 / -1", textAlign: "center", alignItems: "center", justifyContent: "center" }}>
            <div style={{ fontSize: "4rem", color: "#10B981", marginBottom: "1rem" }}>✓</div>
            <h3 className="mobile-title" style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, fontSize: "2rem", color: colors.dark, marginBottom: "1rem" }}>Request Received!</h3>
            <p style={{ color: colors.text, fontSize: "0.95rem", lineHeight: "1.6", maxWidth: "450px" }}>
              Our dedicated travel specialists are processing your request. We will connect with you shortly via WhatsApp to finalize details and confirm your booking. Your unforgettable story starts soon.
            </p>
            <button
              onClick={handleClose}
              style={{
                marginTop: "1.5rem",
                padding: "0.85rem 2.5rem",
                background: colors.dark,
                color: "#fff",
                border: "none",
                borderRadius: "50px",
                cursor: "pointer",
                fontWeight: 700,
                fontSize: "0.8rem",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
              }}
            >
              Close Window
            </button>
          </div>
        ) : (
          <>
            {/* ── LEFT COLUMN: Tour Visual (Becomes Top Banner on Mobile) ── */}
            <div className="responsive-image-section">
              <img src={tour?.image} alt={tour?.name} style={{ width: "100%", height: "100%", objectFit: "cover", position: "absolute", top: 0, left: 0, zIndex: 1 }} />
              <div style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0, background: "linear-gradient(to top, rgba(10,15,30,0.9) 5%, rgba(10,15,30,0.3) 70%)", zIndex: 2 }} />
              
              <div style={{ position: "absolute", bottom: "1.5rem", left: "1.5rem", right: "1.5rem", zIndex: 3 }}>
                <div style={{
                  fontFamily: "'Inter', sans-serif", fontSize: "0.7rem", fontWeight: 700,
                  letterSpacing: "0.15em", textTransform: "uppercase", color: colors.accent, marginBottom: "6px"
                }}>Your requested journey</div>
                <h2 className="mobile-title" style={{
                  fontFamily: "'Playfair Display', serif", fontWeight: 700, fontSize: "1.8rem",
                  color: "#fff", lineHeight: 1.2, marginBottom: "1rem"
                }}>{tour?.name || "Amazing Adventure"}</h2>
                <div style={{ display: "flex", gap: "0.8rem", alignItems: "baseline", borderTop: "1px solid rgba(255,255,255,0.2)", paddingTop: "0.8rem" }}>
                  <div style={{ color: "#fff", fontWeight: 700, fontSize: "1.3rem", fontFamily: "'Playfair Display', serif" }}>₹{(tour?.price || 15000).toLocaleString("en-IN")}</div>
                  <div style={{ color: "rgba(255,255,255,0.8)", fontSize: "0.75rem", fontWeight: 500 }}>from</div>
                </div>
              </div>
            </div>

            {/* ── RIGHT COLUMN: Lead-Gen Form (Becomes Scrollable Bottom on Mobile) ── */}
            <div className="responsive-form-section">
              <div style={{ marginBottom: "1.5rem" }}>
                <h3 className="mobile-title" style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, fontSize: "1.6rem", color: colors.dark, marginBottom: "0.5rem" }}>Begin Your Journey</h3>
                <p style={{ color: colors.text, fontSize: "0.85rem", lineHeight: 1.6 }}>Share your contact details below to get personalized support and finalize your dates.</p>
              </div>

              <form onSubmit={handleSubmit} style={{ flexGrow: 1 }}>
                <input type="hidden" name="from_name" value="Capture Dreams Booking" />
                <input type="hidden" name="Tour_Requested" value={tour?.name || "Unknown Tour"} />

                <div className="responsive-field">
                  <label htmlFor="name" style={labelStyle}>Full Name *</label>
                  <input type="text" id="name" name="Name" placeholder="Your full name" required style={inputStyle} onFocus={handleFocus} onBlur={handleBlur} />
                </div>
                
                <div className="responsive-input-row">
                  <div className="responsive-field">
                    <label htmlFor="email" style={labelStyle}>Email *</label>
                    <input type="email" id="email" name="Email" placeholder="your@email.com" required style={inputStyle} onFocus={handleFocus} onBlur={handleBlur} />
                  </div>
                  <div className="responsive-field">
                    <label htmlFor="phone" style={labelStyle}>WhatsApp Number *</label>
                    <input type="tel" id="phone" name="Phone" placeholder="91-0000000000" required style={inputStyle} onFocus={handleFocus} onBlur={handleBlur} />
                  </div>
                </div>

                <div className="responsive-field">
                  <label htmlFor="travel_dates" style={labelStyle}>Preferred Travel Dates *</label>
                  <input type="text" id="travel_dates" name="Travel_Dates" placeholder="e.g., Early July / Specific Dates" required style={inputStyle} onFocus={handleFocus} onBlur={handleBlur} />
                </div>
                
                <div className="responsive-field">
                  <label htmlFor="message" style={labelStyle}>Optional Message</label>
                  <textarea id="message" name="Message" placeholder="Any special requests or questions?" rows="2" style={{ ...inputStyle, resize: "none" }} onFocus={handleFocus} onBlur={handleBlur}></textarea>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  style={{
                    width: "100%",
                    padding: "1rem",
                    background: isSubmitting ? "#ccc" : colors.accent,
                    color: "#fff",
                    border: "none",
                    borderRadius: "50px",
                    fontSize: "0.85rem",
                    fontWeight: 700,
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                    cursor: isSubmitting ? "not-allowed" : "pointer",
                    transition: "background 0.2s",
                    boxShadow: isSubmitting ? "none" : "0 8px 16px rgba(255,107,74,0.3)",
                    marginTop: "0.5rem"
                  }}
                  onMouseEnter={e => !isSubmitting && (e.currentTarget.style.background = "#e85a39")}
                  onMouseLeave={e => !isSubmitting && (e.currentTarget.style.background = colors.accent)}
                >
                  {isSubmitting ? "Sending Request..." : "Request an Unforgettable Journey →"}
                </button>
              </form>
            </div>
          </>
        )}
      </div>
    </div>
  );
}