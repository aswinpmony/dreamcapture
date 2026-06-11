// src/components/BookingModal.jsx
import React, { useState } from "react";

/* ════════════════════════════════════════════════
   🔧 CONFIG — fill these 2 values
   ════════════════════════════════════════════════
   1. Get your free key at https://web3forms.com
   2. Put your cousin's real UPI ID
   ════════════════════════════════════════════════ */
const WEB3FORMS_ACCESS_KEY = "5128535f-85b0-40a0-aa33-5215ab4a6068"; // <-- Paste your Web3Forms key here
const UPI_ID        = "dreamcapture@upi";   // <-- Your real UPI ID
const BUSINESS_NAME = "Dream Capture Travels";

/* ── Styles ── */
const backdropStyle = {
  position:"fixed", inset:0, zIndex:2000,
  background:"rgba(10,15,30,0.72)", backdropFilter:"blur(6px)",
  display:"flex", alignItems:"center", justifyContent:"center", padding:"1rem",
};
const modalStyle = {
  background:"#fff", borderRadius:"24px", width:"100%", maxWidth:"520px",
  boxShadow:"0 32px 80px rgba(10,15,30,0.28)", overflow:"hidden",
  maxHeight:"92vh", overflowY:"auto",
};
const headerStyle   = { background:"#0A0F1E", padding:"1.6rem 2rem 1.4rem", position:"relative" };
const bodyStyle     = { padding:"1.75rem 2rem" };
const labelStyle    = { fontFamily:"'Inter',sans-serif", fontSize:"0.72rem", fontWeight:700, letterSpacing:"0.1em", textTransform:"uppercase", color:"#6B7280", display:"block", marginBottom:"6px" };
const inputStyle    = { width:"100%", border:"1.5px solid #E5E7EB", borderRadius:"12px", padding:"0.7rem 1rem", fontFamily:"'Inter',sans-serif", fontSize:"0.9rem", color:"#0A0F1E", outline:"none", transition:"border-color 0.2s", marginBottom:"1.1rem", background:"#FAFAFA", boxSizing:"border-box" };
const row2Style     = { display:"grid", gridTemplateColumns:"1fr 1fr", gap:"1rem" };
const closeStyle    = { position:"absolute", top:"1.1rem", right:"1.1rem", background:"rgba(255,255,255,0.1)", border:"none", color:"#fff", borderRadius:"50%", width:32, height:32, cursor:"pointer", fontSize:"1rem", display:"flex", alignItems:"center", justifyContent:"center" };
const summaryBoxStyle = { background:"#F8F7F4", borderRadius:"14px", padding:"1rem 1.2rem", marginBottom:"1.5rem" };
const primaryBtnStyle = { width:"100%", background:"#FF6B4A", color:"#fff", border:"none", borderRadius:"50px", padding:"0.9rem", fontFamily:"'Inter',sans-serif", fontSize:"0.9rem", fontWeight:700, letterSpacing:"0.06em", textTransform:"uppercase", cursor:"pointer", transition:"background 0.2s" };
const ghostBtnStyle   = { width:"100%", background:"transparent", color:"#0A0F1E", border:"1.5px solid #E5E7EB", borderRadius:"50px", padding:"0.85rem", fontFamily:"'Inter',sans-serif", fontSize:"0.88rem", fontWeight:600, cursor:"pointer", transition:"all 0.2s", marginTop:"0.6rem" };
const upiBoxStyle     = { border:"2px dashed #E5E7EB", borderRadius:"16px", padding:"1.5rem", textAlign:"center", marginBottom:"1.2rem" };
const upiIdStyle      = { fontFamily:"'Inter',sans-serif", fontSize:"1.15rem", fontWeight:700, color:"#0A0F1E", letterSpacing:"0.04em", background:"#F8F7F4", borderRadius:"10px", padding:"0.6rem 1rem", display:"inline-block", margin:"0.5rem 0 0.8rem", userSelect:"all" };

const stepDot = (active) => ({
  width:8, height:8, borderRadius:"50%",
  background: active ? "#FF6B4A" : "#E5E7EB", transition:"background 0.3s",
});

function buildUpiLink(upiId, name, amount, note) {
  return `upi://pay?pa=${upiId}&pn=${encodeURIComponent(name)}&am=${amount}&cu=INR&tn=${encodeURIComponent(note)}`;
}
function buildQrUrl(content) {
  return `https://api.qrserver.com/v1/create-qr-code/?size=160x160&data=${encodeURIComponent(content)}`;
}

export default function BookingModal({ tour, onClose }) {
  const [step,      setStep]      = useState(1);
  const [form,      setForm]      = useState({ name:"", email:"", phone:"", persons:1, date:"" });
  const [txnId,     setTxnId]     = useState("");
  const [error,     setError]     = useState("");
  const [sending,   setSending]   = useState(false);
  const [copied,    setCopied]    = useState(false);

  if (!tour) return null;

  const totalPrice = tour.price * Number(form.persons || 1);
  const upiLink    = buildUpiLink(UPI_ID, BUSINESS_NAME, totalPrice, `Booking: ${tour.title}`);
  const qrUrl      = buildQrUrl(upiLink);
  const bookingRef = `DCT-${Date.now().toString(36).toUpperCase()}`;

  const set      = (k) => (e) => setForm(f => ({ ...f, [k]: e.target.value }));
  const focusIn  = (e) => e.target.style.borderColor = "#FF6B4A";
  const focusOut = (e) => e.target.style.borderColor = "#E5E7EB";

  const copyUpiId = () => {
    navigator.clipboard.writeText(UPI_ID);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  /* ── Step 1 validation ── */
  const goToPayment = () => {
    const { name, email, phone, date } = form;
    if (!name || !email || !phone || !date) { setError("Please fill all fields."); return; }
    if (!/\S+@\S+\.\S+/.test(email))        { setError("Enter a valid email."); return; }
    setError("");
    setStep(2);
  };

  /* ── Step 2 → confirm + send email via Web3Forms ── */
  const confirmPayment = async () => {
    if (!txnId.trim()) { setError("Please enter your UPI Transaction / UTR ID."); return; }
    setError("");
    setSending(true);

    const travelDateFormatted = new Date(form.date).toLocaleDateString("en-IN", {
      day:"numeric", month:"long", year:"numeric",
    });

    // Web3Forms payload
    const formData = {
      access_key: WEB3FORMS_ACCESS_KEY,
      subject: `New Booking: ${tour.title} from ${form.name}`,
      from_name: BUSINESS_NAME,
      replyto: form.email,
      Booking_Reference: bookingRef,
      Tour_Package: tour.title,
      Destination: tour.destination,
      Travel_Date: travelDateFormatted,
      Number_of_Persons: form.persons,
      Total_Amount: `₹${totalPrice.toLocaleString("en-IN")}`,
      Customer_Name: form.name,
      Customer_Email: form.email,
      Customer_Phone: form.phone,
      UPI_Transaction_ID: txnId
    };

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json"
        },
        body: JSON.stringify(formData)
      });
      
      const result = await response.json();
      
      // If Web3Forms says it failed, stop and alert us why!
      if (!result.success) {
        alert(`Web3Forms Error: ${result.message}`);
        setSending(false);
        return; 
      }

    } catch (err) {
      console.error("Web3Forms error:", err);
      alert("Network error connection failed. Please check internet.");
      setSending(false);
      return;
    }

    setSending(false);
    setStep(3);
  };

  return (
    <div style={backdropStyle} onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div style={modalStyle}>

        {/* Header */}
        <div style={headerStyle}>
          <button style={closeStyle} onClick={onClose}>✕</button>
          <div style={{ fontFamily:"'Inter',sans-serif", fontSize:"0.68rem", fontWeight:700, letterSpacing:"0.18em", textTransform:"uppercase", color:"#FF6B4A", marginBottom:"5px" }}>
            {step === 1 ? "Step 1 of 2 — Your Details" : step === 2 ? "Step 2 of 2 — Make Payment" : "Booking Submitted!"}
          </div>
          <div style={{ fontFamily:"'Playfair Display',serif", fontWeight:700, fontSize:"1.25rem", color:"#fff", lineHeight:1.2 }}>
            {tour.title}
          </div>
          <div style={{ fontFamily:"'Inter',sans-serif", fontSize:"0.78rem", color:"rgba(255,255,255,0.45)", marginTop:"4px" }}>
            {tour.destination} · {tour.duration}
          </div>
          <div style={{ display:"flex", gap:6, marginTop:"1rem" }}>
            {[1,2,3].map(n => <div key={n} style={stepDot(step >= n)} />)}
          </div>
        </div>

        <div style={bodyStyle}>

          {/* ══════════ STEP 1 — Details ══════════ */}
          {step === 1 && <>
            <div style={summaryBoxStyle}>
              <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center" }}>
                <span style={{ fontFamily:"'Inter',sans-serif", fontSize:"0.85rem", color:"#6B7280" }}>
                  ₹{tour.price.toLocaleString("en-IN")} × {form.persons} person(s)
                </span>
                <span style={{ fontFamily:"'Playfair Display',serif", fontWeight:700, fontSize:"1.4rem", color:"#0A0F1E" }}>
                  ₹{totalPrice.toLocaleString("en-IN")}
                </span>
              </div>
            </div>

            {error && <div style={{ background:"#FEF2F2", border:"1.5px solid #FECACA", borderRadius:"10px", padding:"0.65rem 1rem", marginBottom:"1rem", fontFamily:"'Inter',sans-serif", fontSize:"0.82rem", color:"#B91C1C" }}>{error}</div>}

            <label style={labelStyle}>Full Name</label>
            <input style={inputStyle} placeholder="e.g. Arjun Menon" value={form.name} onChange={set("name")} onFocus={focusIn} onBlur={focusOut} />

            <div style={row2Style}>
              <div>
                <label style={labelStyle}>Email</label>
                <input style={inputStyle} type="email" placeholder="you@email.com" value={form.email} onChange={set("email")} onFocus={focusIn} onBlur={focusOut} />
              </div>
              <div>
                <label style={labelStyle}>Phone</label>
                <input style={inputStyle} type="tel" placeholder="+91 98765 43210" value={form.phone} onChange={set("phone")} onFocus={focusIn} onBlur={focusOut} />
              </div>
            </div>

            <div style={row2Style}>
              <div>
                <label style={labelStyle}>No. of Persons</label>
                <input style={inputStyle} type="number" min="1" max="20" value={form.persons} onChange={set("persons")} onFocus={focusIn} onBlur={focusOut} />
              </div>
              <div>
                <label style={labelStyle}>Travel Date</label>
                <input style={inputStyle} type="date" min={new Date().toISOString().split("T")[0]} value={form.date} onChange={set("date")} onFocus={focusIn} onBlur={focusOut} />
              </div>
            </div>

            <button style={primaryBtnStyle} onClick={goToPayment}
              onMouseEnter={e => e.target.style.background="#e85a39"}
              onMouseLeave={e => e.target.style.background="#FF6B4A"}>
              Proceed to Payment →
            </button>
          </>}

          {/* ══════════ STEP 2 — UPI ══════════ */}
          {step === 2 && <>
            <div style={upiBoxStyle}>
              <div style={{ width:160, height:160, margin:"0 auto 0.75rem", borderRadius:"12px", overflow:"hidden", border:"2px solid #F3F4F6" }}>
                <img src={qrUrl} alt="UPI QR Code" style={{ width:"100%", height:"100%", objectFit:"cover", display:"block" }} />
              </div>
              <div style={{ fontFamily:"'Inter',sans-serif", fontSize:"0.78rem", color:"#6B7280", marginBottom:"4px" }}>
                Scan with GPay · PhonePe · Paytm · Any UPI app
              </div>
              <div style={{ display:"flex", alignItems:"center", gap:8, margin:"0.9rem 0" }}>
                <div style={{ flex:1, height:1, background:"#E5E7EB" }} />
                <span style={{ fontFamily:"'Inter',sans-serif", fontSize:"0.72rem", color:"#9CA3AF" }}>OR PAY TO UPI ID</span>
                <div style={{ flex:1, height:1, background:"#E5E7EB" }} />
              </div>
              <div style={{ display:"flex", alignItems:"center", justifyContent:"center", gap:8 }}>
                <div style={upiIdStyle}>{UPI_ID}</div>
                <button onClick={copyUpiId} style={{ background:copied ? "#ECFDF5" : "#F3F4F6", border:"none", borderRadius:"8px", padding:"6px 12px", fontFamily:"'Inter',sans-serif", fontSize:"0.75rem", fontWeight:600, cursor:"pointer", color:copied ? "#059669" : "#374151", transition:"all 0.2s" }}>
                  {copied ? "✓ Copied" : "Copy"}
                </button>
              </div>
              <div style={{ marginTop:"0.9rem", display:"inline-block", background:"#FF6B4A", color:"#fff", borderRadius:"50px", padding:"5px 18px", fontFamily:"'Playfair Display',serif", fontWeight:700, fontSize:"1.1rem", boxShadow:"0 4px 14px rgba(255,107,74,0.3)" }}>
                ₹{totalPrice.toLocaleString("en-IN")}
              </div>
              <div style={{ marginTop:"0.85rem" }}>
                <a href={upiLink} style={{ display:"inline-block", background:"#0A0F1E", color:"#fff", borderRadius:"50px", padding:"0.55rem 1.4rem", fontFamily:"'Inter',sans-serif", fontSize:"0.78rem", fontWeight:600, textDecoration:"none", letterSpacing:"0.04em" }}>
                  Open UPI App →
                </a>
              </div>
            </div>

            <label style={labelStyle}>UPI Transaction / UTR ID <span style={{ color:"#FF6B4A" }}>*</span></label>
            <input style={inputStyle} placeholder="e.g. 423801234567" value={txnId} onChange={e => setTxnId(e.target.value)} onFocus={focusIn} onBlur={focusOut} />
            <div style={{ fontFamily:"'Inter',sans-serif", fontSize:"0.75rem", color:"#9CA3AF", marginTop:"-0.7rem", marginBottom:"1.1rem" }}>
              Find it in your UPI app under payment history after paying.
            </div>

            {error && <div style={{ background:"#FEF2F2", border:"1.5px solid #FECACA", borderRadius:"10px", padding:"0.65rem 1rem", marginBottom:"1rem", fontFamily:"'Inter',sans-serif", fontSize:"0.82rem", color:"#B91C1C" }}>{error}</div>}

            <button style={{ ...primaryBtnStyle, opacity: sending ? 0.7 : 1 }}
              onClick={confirmPayment} disabled={sending}
              onMouseEnter={e => { if (!sending) e.target.style.background="#e85a39"; }}
              onMouseLeave={e => e.target.style.background="#FF6B4A"}>
              {sending ? "Sending confirmation…" : "I've Paid — Confirm Booking →"}
            </button>
            <button style={ghostBtnStyle} onClick={() => setStep(1)}
              onMouseEnter={e => { e.target.style.borderColor="#0A0F1E"; e.target.style.background="#F8F7F4"; }}
              onMouseLeave={e => { e.target.style.borderColor="#E5E7EB"; e.target.style.background="transparent"; }}>
              ← Back
            </button>
          </>}

          {/* ══════════ STEP 3 — Confirmation ══════════ */}
          {step === 3 && <>
            <div style={{ textAlign:"center", marginBottom:"1.5rem" }}>
              <div style={{ fontSize:"3rem", marginBottom:"0.75rem" }}>🎉</div>
              <div style={{ fontFamily:"'Playfair Display',serif", fontWeight:700, fontSize:"1.4rem", color:"#0A0F1E", marginBottom:"0.4rem" }}>
                Booking Submitted!
              </div>
              <div style={{ fontFamily:"'Inter',sans-serif", fontSize:"0.88rem", color:"#6B7280" }}>
                We'll verify your payment and confirm within 1 hour at <strong>{form.email}</strong>
              </div>
            </div>

            <div style={{ background:"#F0FDF4", border:"1.5px solid #BBF7D0", borderRadius:"14px", padding:"1.25rem 1.3rem", marginBottom:"1.4rem" }}>
              {[
                ["Booking Ref",  bookingRef],
                ["Tour",         tour.title],
                ["Destination",  tour.destination],
                ["Travel Date",  new Date(form.date).toLocaleDateString("en-IN",{ day:"numeric", month:"long", year:"numeric" })],
                ["Persons",      form.persons],
                ["Amount",       `₹${totalPrice.toLocaleString("en-IN")}`],
                ["UPI Txn ID",   txnId],
              ].map(([k,v]) => (
                <div key={k} style={{ display:"flex", justifyContent:"space-between", fontFamily:"'Inter',sans-serif", fontSize:"0.82rem", padding:"0.45rem 0", borderBottom:"1px solid #DCFCE7" }}>
                  <span style={{ color:"#6B7280" }}>{k}</span>
                  <span style={{ color:"#0A0F1E", fontWeight:600 }}>{v}</span>
                </div>
              ))}
            </div>

            <button style={primaryBtnStyle} onClick={onClose}
              onMouseEnter={e => e.target.style.background="#e85a39"}
              onMouseLeave={e => e.target.style.background="#FF6B4A"}>
              Explore More Tours
            </button>
          </>}

        </div>
      </div>
    </div>
  );
}