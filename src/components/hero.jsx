import { useState, useEffect, useRef } from "react";

const WA_LINK = "https://wa.me/919665121862?text=Hello%20Doctors%20Axis,%20I%20need%20assistance";
const CALL_LINK = "tel:+919665121862";

const NAV_LINKS = ["Home", "Facilities", "About"];

const FACILITIES = [
  {
    img: "/assets/facilities/antibiotics.png",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" style={{ width: 24, height: 24 }}>
        <path d="m10.5 20.5 10-10a4.95 4.95 0 1 0-7-7l-10 10a4.95 4.95 0 1 0 7 7Z" />
        <path d="m8.5 8.5 7 7" />
      </svg>
    ),
    title: "Antibiotics & Injections",
    desc: "All types of antibiotics and injections available at heavy discounts.",
  },
  {
    img: "/assets/facilities/icu_home.png",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" style={{ width: 24, height: 24 }}>
        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
        <polyline points="9 22 9 12 15 12 15 22" />
      </svg>
    ),
    title: "ICU Care at Home",
    desc: "Full ICU setup and nursing care provided directly in your home.",
  },
  {
    img: "/assets/facilities/doctor_home.png",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" style={{ width: 24, height: 24 }}>
        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
    title: "24/7 Home Doctor",
    desc: "Expert doctor consultancy available at your home anytime you need.",
  },
  {
    img: "/assets/facilities/nursing.png",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" style={{ width: 24, height: 24 }}>
        <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
      </svg>
    ),
    title: "Nursing Care (GNM/BSc)",
    desc: "Highly experienced GNM and BSc nursing staff available 24/7.",
  },
  {
    img: "/assets/facilities/ambulance.png",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" style={{ width: 24, height: 24 }}>
        <rect x="2" y="10" width="18" height="8" rx="2" />
        <path d="M16 10V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v4" />
        <circle cx="7" cy="18" r="2" />
        <circle cx="17" cy="18" r="2" />
        <path d="M22 13h-2" />
      </svg>
    ),
    title: "24/7 Ambulance",
    desc: "Ambulance services available across all states at reasonable charges.",
  },
  {
    img: "/assets/facilities/insurance.png",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" style={{ width: 24, height: 24 }}>
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z" />
      </svg>
    ),
    title: "Insurance & Claims",
    desc: "Support for all types of insurance claims and hospital billing.",
  },
  {
    img: "/assets/facilities/blood_test.png",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" style={{ width: 24, height: 24 }}>
        <path d="M19 3v12h-5c-1.1 0-2 .9-2 2s.9 2 2 2h4v2" />
        <path d="m4 7 8 5 8-5" />
        <path d="M4 7v10c0 1.1.9 2 2 2h2" />
      </svg>
    ),
    title: "Tests at Home",
    desc: "Blood tests and health checkups at home with maximum discounts.",
  },
  {
    img: "/assets/facilities/equipment.png",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" style={{ width: 24, height: 24 }}>
        <rect x="2" y="7" width="20" height="14" rx="2" />
        <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
      </svg>
    ),
    title: "Medical Equipment",
    desc: "Rent or buy ICU beds, wheelchairs, and other hospital equipment.",
  },
  {
    img: "/assets/facilities/surgery.png",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" style={{ width: 24, height: 24 }}>
        <circle cx="12" cy="12" r="10" />
        <path d="M12 8v8M8 12h8" />
      </svg>
    ),
    title: "Surgery & Physio",
    desc: "Expert surgery support (OPD/IPD) and professional physiotherapists.",
  },
];


function useInView(threshold = 0.15) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } }, { threshold });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, visible];
}

function FadeIn({ children, delay = 0, style = {} }) {
  const [ref, visible] = useInView();
  return (
    <div ref={ref} style={{
      opacity: visible ? 1 : 0,
      transform: visible ? "translateY(0)" : "translateY(24px)",
      transition: `opacity 0.6s ease ${delay}ms, transform 0.6s ease ${delay}ms`,
      ...style,
    }}>
      {children}
    </div>
  );
}

export default function DoctorsAxis() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [formData, setFormData] = useState({ name: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (id) => {
    setMenuOpen(false);
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const handleSubmit = (e) => {
    if (e) e.preventDefault();
    if (!formData.name || !formData.message) return;
    const msg = encodeURIComponent(`Hello Doctors Axis, my name is ${formData.name}. ${formData.message}`);
    window.open(`https://wa.me/919665121862?text=${msg}`, "_blank");
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
    setFormData({ name: "", message: "" });
  };

  return (
    <div style={{ fontFamily: "'DM Sans', 'Helvetica Neue', Arial, sans-serif", color: "#0f1f3d", background: "#fff", minHeight: "100vh" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600&family=DM+Serif+Display&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
        ::selection { background: #1a56db22; }
        a { text-decoration: none; }
        .nav-link {
          color: #374151; font-size: 14px; font-weight: 500; cursor: pointer;
          transition: color 0.2s; padding: 4px 0; position: relative;
        }
        .nav-link::after {
          content: ''; position: absolute; bottom: -2px; left: 0; right: 0;
          height: 2px; background: #1a56db; transform: scaleX(0); transition: transform 0.2s;
        }
        .nav-link:hover { color: #1a56db; }
        .nav-link:hover::after { transform: scaleX(1); }
        .btn-primary {
          background: linear-gradient(135deg, #1a56db 0%, #3b82f6 100%);
          color: #fff; padding: 12px 28px; border-radius: 10px;
          font-size: 14px; font-weight: 600; cursor: pointer; border: none;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          display: inline-flex; align-items: center; gap: 8px; text-decoration: none;
          box-shadow: 0 4px 12px rgba(26,86,219,0.2);
        }
        .btn-primary:hover { 
          transform: translateY(-2px); 
          box-shadow: 0 8px 25px rgba(26,86,219,0.35); 
          filter: brightness(1.1);
        }
        .btn-outline {
          background: rgba(255, 255, 255, 0.05); color: #1a56db; padding: 11px 26px; border-radius: 10px;
          font-size: 14px; font-weight: 600; cursor: pointer;
          border: 2px solid #1a56db;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          display: inline-flex; align-items: center; gap: 8px; text-decoration: none;
        }
        .btn-outline:hover { 
          background: #1a56db; color: #fff;
          transform: translateY(-2px); 
          box-shadow: 0 8px 25px rgba(26,86,219,0.2);
        }
        .facility-card {
          background: #fff; border: 1px solid #eef2f8; border-radius: 20px;
          padding: 0; cursor: default;
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          position: relative; overflow: hidden;
          box-shadow: 0 4px 20px rgba(0,0,0,0.02);
          display: flex; flex-direction: column;
        }
        .facility-card:hover {
          transform: translateY(-10px);
          box-shadow: 0 20px 50px rgba(26,86,219,0.15);
          border-color: #cbdcfc;
        }
        .facility-card:hover .card-img { transform: scale(1.1); }
        .facility-card::after {
          content: ''; position: absolute; top: 0; left: 0; right: 0; height: 4px;
          background: linear-gradient(90deg, #1a56db, #3b82f6);
          transform: scaleX(0); transition: transform 0.4s; transform-origin: left;
          z-index: 5;
        }
        .facility-card:hover::after { transform: scaleX(1); }
        input, textarea {
          width: 100%; padding: 14px 18px; border-radius: 12px;
          border: 1.5px solid #e5eaf4; font-size: 14px; font-family: inherit;
          outline: none; transition: all 0.2s;
          color: #0f1f3d; background: rgba(248, 250, 252, 0.8);
        }
        input:focus, textarea:focus { 
          border-color: #1a56db; 
          background: #fff;
          box-shadow: 0 0 0 4px rgba(26,86,219,0.12); 
        }
        .hero-form-container {
          background: rgba(255, 255, 255, 0.85);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.4);
          border-radius: 24px;
          padding: 40px;
          box-shadow: 0 25px 80px rgba(0,0,0,0.08);
          width: 100%; maxWidth: 460px;
        }
        .hamburger { display: none; }
        .wa-float {
          position: fixed; bottom: 28px; right: 28px; z-index: 999;
          width: 56px; height: 56px; border-radius: 50%;
          background: #25d366; display: flex; align-items: center; justify-content: center;
          box-shadow: 0 6px 24px rgba(37,211,102,0.4);
          cursor: pointer; transition: transform 0.2s, box-shadow 0.2s;
          text-decoration: none;
        }
        .wa-float:hover { transform: scale(1.1); box-shadow: 0 10px 32px rgba(37,211,102,0.5); }
        .call-float {
          position: fixed; bottom: 28px; left: 28px; z-index: 999;
          width: 56px; height: 56px; border-radius: 50%;
          background: #1a56db; display: flex; align-items: center; justify-content: center;
          box-shadow: 0 6px 24px rgba(26,86,219,0.3);
          cursor: pointer; transition: transform 0.2s, box-shadow 0.2s;
          text-decoration: none;
        }
        .call-float:hover { transform: scale(1.1); box-shadow: 0 10px 32px rgba(26,86,219,0.4); }
        .section-container {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 60px;
          align-items: center;
        }
        .footer-grid {
          display: grid;
          grid-template-columns: 2fr 1fr 1fr;
          gap: 40px;
        }
        @media (max-width: 992px) {
          .section-container {
            grid-template-columns: 1fr;
            gap: 40px;
          }
          .footer-grid {
            grid-template-columns: 1fr 1fr;
          }
        }
        @media (max-width: 768px) {
          .hamburger { display: flex !important; }
          .desktop-nav { display: none !important; }
          .mobile-nav { display: flex !important; }
          .hero-btns { flex-direction: column !important; }
          .facilities-grid { grid-template-columns: 1fr 1fr !important; }
          .footer-grid { grid-template-columns: 1fr; }
          .hero-visual { display: none; }
          section { padding: 60px 20px; }
          .hero-section { padding-top: 100px !important; }
        }
        @media (max-width: 500px) {
          .facilities-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>

      {/* NAVBAR */}
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
        background: scrolled ? "rgba(255,255,255,0.97)" : "rgba(255,255,255,0.9)",
        backdropFilter: "blur(12px)",
        borderBottom: scrolled ? "1px solid #e5eaf4" : "1px solid transparent",
        transition: "all 0.3s",
        padding: "0 24px",
      }}>
        <div style={{ maxWidth: 1160, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", height: 64 }}>
          {/* Logo */}
          <div style={{ display: "flex", alignItems: "center", gap: 10, cursor: "pointer" }} onClick={() => scrollTo("home")}>
            <div style={{ width: 34, height: 34, borderRadius: 9, background: "linear-gradient(135deg,#1a56db,#3b82f6)", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <svg viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" style={{ width: 18, height: 18 }}>
                <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
              </svg>
            </div>
            <span style={{ fontSize: 17, fontWeight: 700, letterSpacing: "-0.3px", color: "#0f1f3d" }}>
              Doctor Axis <span style={{ color: "#1a56db" }}>Healthcare Pvt Ltd</span>
            </span>
          </div>

          {/* Desktop Nav */}
          <div className="desktop-nav" style={{ display: "flex", alignItems: "center", gap: 32 }}>
            {NAV_LINKS.map(n => (
              <span key={n} className="nav-link" onClick={() => scrollTo(n.toLowerCase())}>{n}</span>
            ))}
          </div>

          <div className="desktop-nav" style={{ display: "flex", alignItems: "center" }}>
            <a href={WA_LINK} target="_blank" rel="noopener noreferrer" className="btn-primary">
              <svg viewBox="0 0 24 24" fill="currentColor" style={{ width: 16, height: 16 }}>
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
                <path d="M12.04 0C5.422 0 .026 5.369.026 11.975c0 2.11.554 4.094 1.522 5.817L0 24l6.354-1.522C8.031 23.44 9.99 24 12.04 24 18.655 24 24 18.631 24 12.025 24 5.42 18.655 0 12.04 0zm0 21.9c-1.85 0-3.613-.496-5.144-1.367l-.368-.22-3.82.914.946-3.735-.24-.384A9.846 9.846 0 0 1 2.124 12c0-5.47 4.448-9.913 9.92-9.913 5.472 0 9.92 4.443 9.92 9.913 0 5.47-4.448 9.9-9.924 9.9z" />
              </svg>
              WhatsApp Now
            </a>
          </div>

          {/* Hamburger */}
          <button className="hamburger" onClick={() => setMenuOpen(!menuOpen)}
            style={{ background: "none", border: "none", cursor: "pointer", display: "none", flexDirection: "column", gap: 5, padding: 4 }}>
            {[0, 1, 2].map(i => (
              <span key={i} style={{
                display: "block", width: 22, height: 2, background: "#374151", borderRadius: 2,
                transform: menuOpen ? (i === 0 ? "rotate(45deg) translate(5px,5px)" : i === 2 ? "rotate(-45deg) translate(5px,-5px)" : "scaleX(0)") : "none",
                transition: "transform 0.25s"
              }} />
            ))}
          </button>
        </div>

        {/* Mobile Nav */}
        {menuOpen && (
          <div className="mobile-nav" style={{ display: "flex", flexDirection: "column", padding: "16px 24px 20px", borderTop: "1px solid #e5eaf4", gap: 16 }}>
            {NAV_LINKS.map(n => (
              <span key={n} style={{ fontSize: 15, fontWeight: 500, color: "#374151", cursor: "pointer" }} onClick={() => scrollTo(n.toLowerCase())}>{n}</span>
            ))}
            <a href={WA_LINK} target="_blank" rel="noopener noreferrer" className="btn-primary" style={{ justifyContent: "center" }}>WhatsApp Now</a>
          </div>
        )}
      </nav>

      {/* HERO */}
      <section id="home" className="hero-section" style={{
        minHeight: "100vh", display: "flex", alignItems: "center",
        background: "linear-gradient(160deg, #f8faff 0%, #ffffff 50%, #f0f7ff 100%)",
        padding: "120px 24px 80px",
        position: "relative", overflow: "hidden",
      }}>
        {/* Animated background blobs */}
        <div style={{ position: "absolute", top: -100, right: -100, width: 600, height: 600, borderRadius: "50%", background: "radial-gradient(circle, rgba(26,86,219,0.08) 0%, transparent 70%)", pointerEvents: "none", animation: "pulse 15s infinite alternate" }} />
        <div style={{ position: "absolute", bottom: -150, left: -150, width: 500, height: 500, borderRadius: "50%", background: "radial-gradient(circle, rgba(59,130,246,0.08) 0%, transparent 70%)", pointerEvents: "none", animation: "pulse 12s infinite alternate-reverse" }} />
        <style>{`
          @keyframes pulse {
            0% { transform: scale(1) translate(0, 0); }
            100% { transform: scale(1.1) translate(30px, 20px); }
          }
        `}</style>

        <div style={{ maxWidth: 1160, margin: "0 auto", width: "100%" }}>
          <div className="section-container">
            <div>
              <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginBottom: 24 }}>
                <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "#fff7ed", border: "1px solid #ffedd5", borderRadius: 100, padding: "6px 14px" }}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="#d97706" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ width: 14, height: 14 }}>
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                  <span style={{ fontSize: 12, fontWeight: 600, color: "#d97706", letterSpacing: "0.5px" }}>PALGHAR TO CHURCHGATE</span>
                </div>
              </div>
              <h1 style={{ fontFamily: "'DM Serif Display', Georgia, serif", fontSize: "clamp(36px, 5vw, 58px)", fontWeight: 400, lineHeight: 1.15, color: "#0a1628", letterSpacing: "-0.5px", marginBottom: 20 }}>
                Find Any Healthcare Services<br />
                <span style={{ color: "#1a56db", fontStyle: "italic" }}>24/7 in One Click.</span>
              </h1>
              <p style={{ fontSize: 16, lineHeight: 1.7, color: "#4b5563", maxWidth: 480, marginBottom: 32 }}>
                We help you find ICU, Ambulance, and other hospital services fast. Just message us on WhatsApp and we will guide you in simple steps.
              </p>
              <div className="hero-btns" style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
                <a href={WA_LINK} target="_blank" rel="noopener noreferrer" className="btn-primary" style={{ fontSize: 15, padding: "13px 28px" }}>
                  <svg viewBox="0 0 24 24" fill="currentColor" style={{ width: 18, height: 18 }}>
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
                    <path d="M12.04 0C5.422 0 .026 5.369.026 11.975c0 2.11.554 4.094 1.522 5.817L0 24l6.354-1.522C8.031 23.44 9.99 24 12.04 24 18.655 24 24 18.631 24 12.025 24 5.42 18.655 0 12.04 0zm0 21.9c-1.85 0-3.613-.496-5.144-1.367l-.368-.22-3.82.914.946-3.735-.24-.384A9.846 9.846 0 0 1 2.124 12c0-5.47 4.448-9.913 9.92-9.913 5.472 0 9.92 4.443 9.92 9.913 0 5.47-4.448 9.9-9.924 9.9z" />
                  </svg>
                  Book Appointment on WhatsApp
                </a>
                <span className="btn-outline" onClick={() => scrollTo("facilities")}>Explore Facilities</span>
              </div>

              {/* Trust bar */}
              <div style={{ display: "flex", gap: 28, marginTop: 44, flexWrap: "wrap" }}>
                {[["300+", "Hospitals Covered"], ["24/7", "Support Available"], ["100%", "Service Solution"]].map(([v, l]) => (
                  <div key={l}>
                    <div style={{ fontSize: 22, fontWeight: 700, color: "#1a56db", lineHeight: 1 }}>{v}</div>
                    <div style={{ fontSize: 12, color: "#6b7280", marginTop: 3 }}>{l}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Inquiry Form */}
            <div className="hero-form" style={{ display: "flex", justifyContent: "flex-end" }}>
              <div className="hero-form-container">
                <h3 style={{ fontSize: 24, fontWeight: 700, color: "#0f1f3d", marginBottom: 8, letterSpacing: "-0.5px" }}>Quick Inquiry</h3>
                <p style={{ fontSize: 15, color: "#64748b", marginBottom: 32, lineHeight: 1.6 }}>Tell us what you need and we'll open a WhatsApp chat for you instantly.</p>
                <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
                  <div>
                    <label style={{ fontSize: 13, fontWeight: 600, color: "#475569", display: "block", marginBottom: 8, textTransform: "uppercase", letterSpacing: "0.5px" }}>Your Name</label>
                    <input
                      type="text" placeholder="Enter your full name"
                      value={formData.name}
                      onChange={e => setFormData(p => ({ ...p, name: e.target.value }))}
                    />
                  </div>
                  <div>
                    <label style={{ fontSize: 13, fontWeight: 600, color: "#475569", display: "block", marginBottom: 8, textTransform: "uppercase", letterSpacing: "0.5px" }}>Message / Inquiry</label>
                    <textarea
                      rows={4} placeholder="How can we help you today?"
                      value={formData.message}
                      onChange={e => setFormData(p => ({ ...p, message: e.target.value }))}
                      style={{ resize: "none" }}
                    />
                  </div>
                  <button onClick={handleSubmit} className="btn-primary" style={{ justifyContent: "center", fontSize: 16, padding: "16px", marginTop: 8 }}>
                    {submitted ? "✓ Opening WhatsApp..." : "Book Appointment on WhatsApp"}
                  </button>
                  <p style={{ fontSize: 12, color: "#94a3b8", textAlign: "center", marginTop: 8 }}>
                    Quick response guaranteed within minutes.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FACILITIES */}
      <section id="facilities" style={{ padding: "90px 24px", background: "#f8faff" }}>
        <div style={{ maxWidth: 1160, margin: "0 auto" }}>
          <FadeIn>
            <div style={{ textAlign: "center", marginBottom: 56 }}>
              <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "#eff4ff", border: "1px solid #c7d7fc", borderRadius: 100, padding: "5px 14px", marginBottom: 16 }}>
                <span style={{ fontSize: 11, fontWeight: 600, color: "#1a56db", letterSpacing: "0.5px" }}>HOSPITAL FACILITIES</span>
              </div>
              <h2 style={{ fontFamily: "'DM Serif Display', Georgia, serif", fontSize: "clamp(28px,4vw,42px)", fontWeight: 400, color: "#0a1628", letterSpacing: "-0.3px", marginBottom: 14 }}>
                World-Class Healthcare Infrastructure
              </h2>
              <p style={{ fontSize: 15, color: "#6b7280", maxWidth: 520, margin: "0 auto" }}>
                Explore the advanced facilities available across hospitals in our network — designed for patient safety, comfort, and clinical excellence.
              </p>
            </div>
          </FadeIn>

          <div className="facilities-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 32 }}>
            {FACILITIES.map((f, i) => (
              <FadeIn key={f.title} delay={i * 80} style={{ display: "flex" }}>
                <div className="facility-card" style={{ flex: 1 }}>
                  <div style={{ height: 180, overflow: "hidden", position: "relative" }}>
                    <img src={f.img} alt={f.title} className="card-img" style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)" }} />
                    <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, transparent 50%, rgba(0,0,0,0.4) 100%)" }} />
                  </div>
                  <div style={{ padding: 28, position: "relative" }}>
                    <div style={{
                      width: 52, height: 52, borderRadius: 14,
                      background: "#fff",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      color: "#1a56db", marginTop: -54, position: "relative", zIndex: 2,
                      boxShadow: "0 8px 20px rgba(0,0,0,0.12)",
                      marginBottom: 16
                    }}>
                      {f.icon}
                    </div>
                    <h3 style={{ fontSize: 18, fontWeight: 700, color: "#0f1f3d", marginBottom: 12, letterSpacing: "-0.2px" }}>{f.title}</h3>
                    <p style={{ fontSize: 14.5, color: "#64748b", lineHeight: 1.7 }}>{f.desc}</p>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>


      {/* ABOUT */}
      <section id="about" style={{ padding: "90px 24px", background: "linear-gradient(160deg, #0d2154 0%, #1a3a8f 100%)" }}>
        <div style={{ maxWidth: 860, margin: "0 auto", textAlign: "center" }}>
          <FadeIn>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.2)", borderRadius: 100, padding: "5px 14px", marginBottom: 20 }}>
              <span style={{ fontSize: 11, fontWeight: 600, color: "rgba(255,255,255,0.85)", letterSpacing: "0.5px" }}>ABOUT US</span>
            </div>
            <h2 style={{ fontFamily: "'DM Serif Display', Georgia, serif", fontSize: "clamp(28px,4vw,46px)", fontWeight: 400, color: "#fff", letterSpacing: "-0.3px", marginBottom: 24 }}>
              Doctors Bureau
            </h2>
            <p style={{ fontSize: 16, color: "rgba(255,255,255,0.75)", lineHeight: 1.8, marginBottom: 16 }}>
              Doctors Bureau is your dedicated partner for 24/7 medical assistance and hospital support services from Palghar to Churchgate. We are committed to making quality healthcare accessible, transparent, and easy to navigate for every patient and family.
            </p>
            <p style={{ fontSize: 16, color: "rgba(255,255,255,0.75)", lineHeight: 1.8, marginBottom: 32 }}>
              We ensure that you have instant access to ICU care at home, ambulance services, insurance claim support, and affordable medicines—all with just a single click.
            </p>
            <div style={{ display: "flex", justifyContent: "center", gap: 16, flexWrap: "wrap" }}>
              <a href={WA_LINK} target="_blank" rel="noopener noreferrer" className="btn-primary" style={{ background: "#fff", color: "#1a56db" }}>
                Connect on WhatsApp
              </a>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ background: "#0a1628", color: "#fff", padding: "52px 24px 28px" }}>
        <div style={{ maxWidth: 1160, margin: "0 auto" }}>
          <div className="footer-grid" style={{ marginBottom: 40 }}>
            {/* Brand */}
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
                <div style={{ width: 34, height: 34, borderRadius: 9, background: "linear-gradient(135deg,#1a56db,#3b82f6)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" style={{ width: 18, height: 18 }}>
                    <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
                  </svg>
                </div>
                <span style={{ fontSize: 17, fontWeight: 700, letterSpacing: "-0.3px" }}>Doctor Axis <span style={{ color: "#60a5fa" }}>Healthcare Pvt Ltd</span></span>
              </div>
              <p style={{ fontSize: 13.5, color: "rgba(255,255,255,0.55)", lineHeight: 1.7, maxWidth: 280 }}>
                Providing clear, reliable hospital facility information to patients and families across India.
              </p>
              <a href={WA_LINK} target="_blank" rel="noopener noreferrer" style={{ display: "inline-flex", alignItems: "center", gap: 8, marginTop: 20, background: "#25d366", color: "#fff", padding: "9px 18px", borderRadius: 8, fontSize: 13, fontWeight: 600, textDecoration: "none" }}>
                <svg viewBox="0 0 24 24" fill="currentColor" style={{ width: 15, height: 15 }}>
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
                  <path d="M12.04 0C5.422 0 .026 5.369.026 11.975c0 2.11.554 4.094 1.522 5.817L0 24l6.354-1.522C8.031 23.44 9.99 24 12.04 24 18.655 24 24 18.631 24 12.025 24 5.42 18.655 0 12.04 0zm0 21.9c-1.85 0-3.613-.496-5.144-1.367l-.368-.22-3.82.914.946-3.735-.24-.384A9.846 9.846 0 0 1 2.124 12c0-5.47 4.448-9.913 9.92-9.913 5.472 0 9.92 4.443 9.92 9.913 0 5.47-4.448 9.9-9.924 9.9z" />
                </svg>
                +91 96651 21862
              </a>
            </div>

            {/* Quick Links */}
            <div>
              <h4 style={{ fontSize: 14, fontWeight: 600, marginBottom: 16, color: "rgba(255,255,255,0.9)" }}>Quick Links</h4>
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {NAV_LINKS.map(n => (
                  <span key={n} onClick={() => scrollTo(n.toLowerCase())}
                    style={{ fontSize: 13.5, color: "rgba(255,255,255,0.5)", cursor: "pointer", transition: "color 0.2s" }}
                    onMouseEnter={e => e.target.style.color = "#60a5fa"}
                    onMouseLeave={e => e.target.style.color = "rgba(255,255,255,0.5)"}
                  >{n}</span>
                ))}
              </div>
            </div>

            {/* Facilities */}
            <div>
              <h4 style={{ fontSize: 14, fontWeight: 600, marginBottom: 16, color: "rgba(255,255,255,0.9)" }}>Facilities</h4>
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {FACILITIES.map(f => (
                  <span key={f.title} style={{ fontSize: 13.5, color: "rgba(255,255,255,0.5)" }}>{f.title}</span>
                ))}
              </div>
            </div>
          </div>

          <div style={{ borderTop: "1px solid rgba(255,255,255,0.08)", paddingTop: 24, display: "flex", justifyContent: "space-between", alignItems: "center", gap: 16, flexWrap: "wrap" }}>
            <p style={{ fontSize: 12, color: "rgba(255,255,255,0.35)" }}>© 2025 Doctors Axis. All rights reserved.</p>
            <p style={{ fontSize: 12, color: "rgba(255,255,255,0.35)", maxWidth: 500, textAlign: "right" }}>
              <strong style={{ color: "rgba(255,255,255,0.5)" }}>Disclaimer:</strong> Doctors Axis does not provide doctor listings or direct consultations. All information is for guidance purposes only.
            </p>
          </div>
        </div>
      </footer>

      {/* Floating Buttons */}
      <div className="floating-actions">
        <a href={CALL_LINK} className="call-float" title="Call Now">
          <svg viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ width: 24, height: 24 }}>
            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
          </svg>
        </a>
        <a href={WA_LINK} target="_blank" rel="noopener noreferrer" className="wa-float" title="Chat on WhatsApp">
          <svg viewBox="0 0 24 24" fill="#fff" style={{ width: 28, height: 28 }}>
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
            <path d="M12.04 0C5.422 0 .026 5.369.026 11.975c0 2.11.554 4.094 1.522 5.817L0 24l6.354-1.522C8.031 23.44 9.99 24 12.04 24 18.655 24 24 18.631 24 12.025 24 5.42 18.655 0 12.04 0zm0 21.9c-1.85 0-3.613-.496-5.144-1.367l-.368-.22-3.82.914.946-3.735-.24-.384A9.846 9.846 0 0 1 2.124 12c0-5.47 4.448-9.913 9.92-9.913 5.472 0 9.92 4.443 9.92 9.913 0 5.47-4.448 9.9-9.924 9.9z" />
          </svg>
        </a>
      </div>
    </div>
  );
}
