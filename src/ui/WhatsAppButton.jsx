import React from 'react';

export default function WhatsAppButton() {
  // Replace with your cousin's actual number (Country Code + Number, no plus sign)
  // For example: 919876543210
  const phoneNumber = "919633172507"; 
  
  // This is the pre-filled message the customer will send to him
  const defaultMessage = "Hi! I have a quick query about a tour package.";
  
  // The official WhatsApp API link
  const waLink = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(defaultMessage)}`;

  return (
    <a 
      href={waLink} 
      target="_blank" 
      rel="noopener noreferrer"
      aria-label="Chat with us on WhatsApp"
      style={{
        position: 'fixed',
        bottom: '25px',
        right: '25px',
        backgroundColor: '#25D366', // Official WhatsApp Green
        color: 'white',
        borderRadius: '50px',
        padding: '12px 20px',
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        boxShadow: '0px 4px 12px rgba(0,0,0,0.15)',
        textDecoration: 'none',
        fontFamily: "'Inter', sans-serif",
        fontWeight: '600',
        fontSize: '0.9rem',
        zIndex: 1000, // Keeps it on top of everything else
        transition: 'transform 0.2s ease',
      }}
      onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
      onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
    >
      {/* WhatsApp SVG Icon */}
      <svg width="24" height="24" viewBox="0 0 24 24" fill="white" xmlns="http://www.w3.org/2000/svg">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
        <path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.553 4.116 1.527 5.86L.35 23.65l5.968-1.157C8.01 23.447 9.946 24 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.986c-1.848 0-3.606-.475-5.18-1.328l-.371-.202-3.844.746.758-3.738-.222-.385C2.26 15.348 1.714 13.722 1.714 12c0-5.666 4.62-10.286 10.286-10.286S22.286 6.334 22.286 12 17.666 21.986 12 21.986z"/>
      </svg>
      Chat with us
    </a>
  );
}