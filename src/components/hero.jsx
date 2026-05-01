import { useState, useEffect, useRef } from "react";

const WA_LINK = "https://wa.me/919665121862?text=Hello%20Doctors%20Axis,%20I%20need%20assistance";

const NAV_LINKS = ["Home", "Facilities", "Services", "About", "Contact"];

const FACILITIES = [
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" style={{width:32,height:32}}>
        <path d="m10.5 20.5 10-10a4.95 4.95 0 1 0-7-7l-10 10a4.95 4.95 0 1 0 7 7Z"/>
        <path d="m8.5 8.5 7 7"/>
      </svg>
    ),
    title: "Antibiotic Orders",
    desc: "Streamlined assistance for acquiring prescribed antibiotic medications from certified hospital pharmacies.",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" style={{width:32,height:32}}>
        <path d="m3 21 2-2m4-4 10-10a2.828 2.828 0 1 0-4-4L5 11m0 0 4 4m-4-4-1 1m4 4 1-1"/>
      </svg>
    ),
    title: "Injections",
    desc: "Coordination for professional administration of injections and IV fluids within clinical settings.",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" style={{width:32,height:32}}>
        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/>
        <circle cx="9" cy="7" r="4"/>
        <path d="M22 21v-2a4 4 0 0 0-3-3.87"/>
        <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
      </svg>
    ),
    title: "Doctor Visits",
    desc: "Information and scheduling support for specialist consultations and routine physician checkups.",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" style={{width:32,height:32}}>
        <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/>
      </svg>
    ),
    title: "Nursing Care",
    desc: "Dedicated nursing support services for inpatient care, wound dressing, and post-operative monitoring.",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" style={{width:32,height:32}}>
        <rect x="2" y="10" width="18" height="8" rx="2"/>
        <path d="M16 10V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v4"/>
        <circle cx="7" cy="18" r="2"/>
        <circle cx="17" cy="18" r="2"/>
        <path d="M22 13h-2"/>
      </svg>
    ),
    title: "Ambulance",
    desc: "Swift coordination of emergency ambulance services equipped with life-support for patient transport.",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" style={{width:32,height:32}}>
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z"/>
      </svg>
    ),
    title: "Claims & Insurance",
    desc: "Guided assistance for insurance verification, cashless claim processing, and reimbursement documentation.",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" style={{width:32,height:32}}>
        <path d="M19 3v12h-5c-1.1 0-2 .9-2 2s.9 2 2 2h4v2"/>
        <path d="m4 7 8 5 8-5"/>
        <path d="M4 7v10c0 1.1.9 2 2 2h2"/>
      </svg>
    ),
    title: "Health Checkups",
    desc: "Comprehensive health screening packages including blood tests, cardiac imaging, and physical exams.",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" style={{width:32,height:32}}>
        <path d="M12 22a7 7 0 0 0 7-7c0-2-1-3.9-3-5.5s-3.5-4-4-6.5c-.5 2.5-2 4.9-4 6.5s-3 3.5-3 5.5a7 7 0 0 0 7 7Z"/>
      </svg>
    ),
    title: "Blood Collection",
    desc: "Safe and hygienic sample collection for laboratory diagnostics, available at hospitals or via home visits.",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" style={{width:32,height:32}}>
        <rect x="2" y="7" width="20" height="14" rx="2"/>
        <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/>
      </svg>
    ),
    title: "Medical Equipment",
    desc: "Access to advanced medical devices, rehabilitation tools, and home-care clinical equipment.",
  },
];

const SERVICES = [
  {
    num: "01",
    title: "General Consultation Guidance",
    desc: "We help patients understand which hospital departments and specialties best match their medical needs — without prescribing or diagnosing.",
  },
  {
    num: "02",
    title: "Hospital Information Support",
    desc: "Get accurate, up-to-date information on hospital facilities, available infrastructure, bed availability categories, and service offerings.",
  },
  {
    num: "03",
    title: "Patient Assistance",
    desc: "Guided support for navigating hospital admission processes, discharge procedures, insurance queries, and general patient-care workflows.",
  },
  {
    num: "04",
    title: "WhatsApp Appointment Booking",
    desc: "Connect instantly via WhatsApp to inquire about hospital schedules, facilities, and coordinate your hospital visit — fast and hassle-free.",
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
    e.preventDefault();
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
          background: #1a56db; color: #fff; padding: 11px 24px; border-radius: 8px;
          font-size: 14px; font-weight: 600; cursor: pointer; border: none;
          transition: background 0.2s, transform 0.15s, box-shadow 0.2s;
          display: inline-flex; align-items: center; gap: 8px; text-decoration: none;
        }
        .btn-primary:hover { background: #1447c0; transform: translateY(-1px); box-shadow: 0 6px 20px rgba(26,86,219,0.3); }
        .btn-outline {
          background: transparent; color: #1a56db; padding: 10px 22px; border-radius: 8px;
          font-size: 14px; font-weight: 600; cursor: pointer;
          border: 1.5px solid #1a56db;
          transition: background 0.2s, transform 0.15s;
          display: inline-flex; align-items: center; gap: 8px; text-decoration: none;
        }
        .btn-outline:hover { background: #eff4ff; transform: translateY(-1px); }
        .facility-card {
          background: #fff; border: 1px solid #e5eaf4; border-radius: 14px;
          padding: 28px 24px; cursor: default;
          transition: transform 0.25s, box-shadow 0.25s, border-color 0.25s;
        }
        .facility-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 16px 40px rgba(26,86,219,0.1);
          border-color: #93b4f7;
        }
        .service-card {
          display: flex; gap: 20px; align-items: flex-start;
          padding: 24px; border-radius: 12px; border: 1px solid #e5eaf4;
          background: #fff;
          transition: box-shadow 0.25s, border-color 0.25s;
        }
        .service-card:hover { box-shadow: 0 8px 30px rgba(26,86,219,0.08); border-color: #93b4f7; }
        input, textarea {
          width: 100%; padding: 12px 16px; border-radius: 8px;
          border: 1.5px solid #dde3f0; font-size: 14px; font-family: inherit;
          outline: none; transition: border-color 0.2s, box-shadow 0.2s;
          color: #0f1f3d; background: #fff;
        }
        input:focus, textarea:focus { border-color: #1a56db; box-shadow: 0 0 0 3px rgba(26,86,219,0.1); }
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
              <svg viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" style={{width:18,height:18}}>
                <path d="M22 12h-4l-3 9L9 3l-3 9H2"/>
              </svg>
            </div>
            <span style={{ fontSize: 17, fontWeight: 700, letterSpacing: "-0.3px", color: "#0f1f3d" }}>
              Doctors <span style={{ color: "#1a56db" }}>Axis</span>
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
              <svg viewBox="0 0 24 24" fill="currentColor" style={{width:16,height:16}}>
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                <path d="M12.04 0C5.422 0 .026 5.369.026 11.975c0 2.11.554 4.094 1.522 5.817L0 24l6.354-1.522C8.031 23.44 9.99 24 12.04 24 18.655 24 24 18.631 24 12.025 24 5.42 18.655 0 12.04 0zm0 21.9c-1.85 0-3.613-.496-5.144-1.367l-.368-.22-3.82.914.946-3.735-.24-.384A9.846 9.846 0 0 1 2.124 12c0-5.47 4.448-9.913 9.92-9.913 5.472 0 9.92 4.443 9.92 9.913 0 5.47-4.448 9.9-9.924 9.9z"/>
              </svg>
              WhatsApp Now
            </a>
          </div>

          {/* Hamburger */}
          <button className="hamburger" onClick={() => setMenuOpen(!menuOpen)}
            style={{ background: "none", border: "none", cursor: "pointer", display: "none", flexDirection: "column", gap: 5, padding: 4 }}>
            {[0,1,2].map(i => (
              <span key={i} style={{ display: "block", width: 22, height: 2, background: "#374151", borderRadius: 2,
                transform: menuOpen ? (i===0?"rotate(45deg) translate(5px,5px)": i===2?"rotate(-45deg) translate(5px,-5px)":"scaleX(0)") : "none",
                transition: "transform 0.25s" }} />
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
        background: "linear-gradient(160deg, #f0f4ff 0%, #ffffff 55%, #e8f5ff 100%)",
        padding: "100px 24px 60px",
        position: "relative", overflow: "hidden",
      }}>
        {/* Background accent */}
        <div style={{ position:"absolute", top:-80, right:-100, width:480, height:480, borderRadius:"50%", background:"radial-gradient(circle, rgba(26,86,219,0.06) 0%, transparent 70%)", pointerEvents:"none" }} />
        <div style={{ position:"absolute", bottom:-60, left:-60, width:320, height:320, borderRadius:"50%", background:"radial-gradient(circle, rgba(59,130,246,0.06) 0%, transparent 70%)", pointerEvents:"none" }} />

        <div style={{ maxWidth: 1160, margin: "0 auto", width: "100%" }}>
          <div className="section-container">
            <div>
              <div style={{ display:"flex", gap:12, flexWrap:"wrap", marginBottom:24 }}>
                <div style={{ display:"inline-flex", alignItems:"center", gap:8, background:"#eff4ff", border:"1px solid #c7d7fc", borderRadius:100, padding:"6px 14px" }}>
                  <span style={{ width:7, height:7, borderRadius:"50%", background:"#1a56db", display:"inline-block" }} />
                  <span style={{ fontSize:12, fontWeight:600, color:"#1a56db", letterSpacing:"0.5px" }}>HOSPITAL INFORMATION PLATFORM</span>
                </div>
                <div style={{ display:"inline-flex", alignItems:"center", gap:8, background:"#fff7ed", border:"1px solid #ffedd5", borderRadius:100, padding:"6px 14px" }}>
                  <span style={{ width:7, height:7, borderRadius:"50%", background:"#d97706", display:"inline-block" }} />
                  <span style={{ fontSize:12, fontWeight:600, color:"#d97706", letterSpacing:"0.5px" }}>CHURCHGATE TO PALGHAR ONLY</span>
                </div>
              </div>
              <h1 style={{ fontFamily:"'DM Serif Display', Georgia, serif", fontSize:"clamp(36px, 5vw, 58px)", fontWeight:400, lineHeight:1.15, color:"#0a1628", letterSpacing:"-0.5px", marginBottom:20 }}>
                Reliable Hospital<br />Information,{" "}
                <span style={{ color:"#1a56db", fontStyle:"italic" }}>Simplified.</span>
              </h1>
              <p style={{ fontSize:16, lineHeight:1.7, color:"#4b5563", maxWidth:480, marginBottom:32 }}>
                Doctors Axis provides clear, structured information about hospital facilities and services — helping patients and families make informed decisions. We do not list individual doctors or offer direct consultations.
              </p>
              <div className="hero-btns" style={{ display:"flex", gap:14, flexWrap:"wrap" }}>
                <a href={WA_LINK} target="_blank" rel="noopener noreferrer" className="btn-primary" style={{ fontSize:15, padding:"13px 28px" }}>
                  <svg viewBox="0 0 24 24" fill="currentColor" style={{width:18,height:18}}>
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                    <path d="M12.04 0C5.422 0 .026 5.369.026 11.975c0 2.11.554 4.094 1.522 5.817L0 24l6.354-1.522C8.031 23.44 9.99 24 12.04 24 18.655 24 24 18.631 24 12.025 24 5.42 18.655 0 12.04 0zm0 21.9c-1.85 0-3.613-.496-5.144-1.367l-.368-.22-3.82.914.946-3.735-.24-.384A9.846 9.846 0 0 1 2.124 12c0-5.47 4.448-9.913 9.92-9.913 5.472 0 9.92 4.443 9.92 9.913 0 5.47-4.448 9.9-9.924 9.9z"/>
                  </svg>
                  Book Appointment on WhatsApp
                </a>
                <span className="btn-outline" onClick={() => scrollTo("facilities")}>Explore Facilities</span>
              </div>

              {/* Trust bar */}
              <div style={{ display:"flex", gap:28, marginTop:44, flexWrap:"wrap" }}>
                {[["200+","Hospitals Covered"],["24/7","Support Available"],["100%","Free to Use"]].map(([v,l]) => (
                  <div key={l}>
                    <div style={{ fontSize:22, fontWeight:700, color:"#1a56db", lineHeight:1 }}>{v}</div>
                    <div style={{ fontSize:12, color:"#6b7280", marginTop:3 }}>{l}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Hero visual */}
            <div className="hero-visual" style={{ display:"flex", justifyContent:"flex-end" }}>
              <div style={{ position:"relative", width:"100%", maxWidth:420 }}>
                {/* Main card */}
                <div style={{ background:"#fff", borderRadius:20, padding:28, border:"1px solid #e5eaf4", boxShadow:"0 20px 60px rgba(26,86,219,0.1)" }}>
                  <div style={{ display:"flex", alignItems:"center", gap:12, marginBottom:20 }}>
                    <div style={{ width:44, height:44, borderRadius:12, background:"#eff4ff", display:"flex", alignItems:"center", justifyContent:"center" }}>
                      <svg viewBox="0 0 24 24" fill="none" stroke="#1a56db" strokeWidth="1.8" strokeLinecap="round" style={{width:22,height:22}}>
                        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
                        <polyline points="9 22 9 12 15 12 15 22"/>
                      </svg>
                    </div>
                    <div>
                      <div style={{ fontSize:14, fontWeight:600, color:"#0f1f3d" }}>City General Hospital</div>
                      <div style={{ fontSize:12, color:"#6b7280" }}>Facility Overview</div>
                    </div>
                    <div style={{ marginLeft:"auto", background:"#ecfdf5", color:"#059669", fontSize:11, fontWeight:600, padding:"3px 10px", borderRadius:100 }}>Open</div>
                  </div>
                  {[["ICU Beds","Available","#eff4ff","#1a56db"],["Emergency","24/7 Active","#ecfdf5","#059669"],["Diagnostics","All Units Ready","#fff7ed","#d97706"],["OT Theatres","3 of 5 Free","#eff4ff","#1a56db"]].map(([t,s,bg,tc]) => (
                    <div key={t} style={{ display:"flex", justifyContent:"space-between", alignItems:"center", padding:"10px 14px", background:bg, borderRadius:9, marginBottom:8 }}>
                      <span style={{ fontSize:13, fontWeight:500, color:"#0f1f3d" }}>{t}</span>
                      <span style={{ fontSize:12, fontWeight:600, color:tc }}>{s}</span>
                    </div>
                  ))}
                </div>
                {/* Floating badge */}
                <div style={{ position:"absolute", bottom:-18, left:-18, background:"#1a56db", borderRadius:14, padding:"12px 18px", boxShadow:"0 8px 24px rgba(26,86,219,0.3)" }}>
                  <div style={{ fontSize:11, color:"rgba(255,255,255,0.75)", marginBottom:2 }}>Contact via</div>
                  <div style={{ fontSize:13, fontWeight:700, color:"#fff" }}>WhatsApp Instantly</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FACILITIES */}
      <section id="facilities" style={{ padding:"90px 24px", background:"#f8faff" }}>
        <div style={{ maxWidth:1160, margin:"0 auto" }}>
          <FadeIn>
            <div style={{ textAlign:"center", marginBottom:56 }}>
              <div style={{ display:"inline-flex", alignItems:"center", gap:8, background:"#eff4ff", border:"1px solid #c7d7fc", borderRadius:100, padding:"5px 14px", marginBottom:16 }}>
                <span style={{ fontSize:11, fontWeight:600, color:"#1a56db", letterSpacing:"0.5px" }}>HOSPITAL FACILITIES</span>
              </div>
              <h2 style={{ fontFamily:"'DM Serif Display', Georgia, serif", fontSize:"clamp(28px,4vw,42px)", fontWeight:400, color:"#0a1628", letterSpacing:"-0.3px", marginBottom:14 }}>
                World-Class Healthcare Infrastructure
              </h2>
              <p style={{ fontSize:15, color:"#6b7280", maxWidth:520, margin:"0 auto" }}>
                Explore the advanced facilities available across hospitals in our network — designed for patient safety, comfort, and clinical excellence.
              </p>
            </div>
          </FadeIn>

          <div className="facilities-grid" style={{ display:"grid", gridTemplateColumns:"repeat(3, 1fr)", gap:20 }}>
            {FACILITIES.map((f, i) => (
              <FadeIn key={f.title} delay={i * 80} style={{ display: "flex" }}>
                <div className="facility-card" style={{ flex: 1 }}>
                  <div style={{ width:56, height:56, borderRadius:14, background:"#eff4ff", display:"flex", alignItems:"center", justifyContent:"center", color:"#1a56db", marginBottom:18 }}>
                    {f.icon}
                  </div>
                  <h3 style={{ fontSize:16, fontWeight:600, color:"#0f1f3d", marginBottom:8 }}>{f.title}</h3>
                  <p style={{ fontSize:13.5, color:"#6b7280", lineHeight:1.65 }}>{f.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section id="services" style={{ padding:"90px 24px", background:"#fff" }}>
        <div style={{ maxWidth:1160, margin:"0 auto" }}>
          <div className="section-container">
            <FadeIn>
              <div>
                <div style={{ display:"inline-flex", alignItems:"center", gap:8, background:"#eff4ff", border:"1px solid #c7d7fc", borderRadius:100, padding:"5px 14px", marginBottom:16 }}>
                  <span style={{ fontSize:11, fontWeight:600, color:"#1a56db", letterSpacing:"0.5px" }}>OUR SERVICES</span>
                </div>
                <h2 style={{ fontFamily:"'DM Serif Display', Georgia, serif", fontSize:"clamp(26px,3.5vw,40px)", fontWeight:400, color:"#0a1628", letterSpacing:"-0.3px", marginBottom:16 }}>
                  What Doctors Axis Provides
                </h2>
                <p style={{ fontSize:15, color:"#6b7280", lineHeight:1.7, marginBottom:28 }}>
                  We bridge the gap between patients and hospital infrastructure — providing clarity, guidance, and fast access to facility information.
                </p>
                <a href={WA_LINK} target="_blank" rel="noopener noreferrer" className="btn-primary">Get Assistance Now</a>
              </div>
            </FadeIn>

            <div style={{ display:"flex", flexDirection:"column", gap:14 }}>
              {SERVICES.map((s, i) => (
                <FadeIn key={s.num} delay={i * 100}>
                  <div className="service-card">
                    <div style={{ flexShrink:0, width:40, height:40, borderRadius:10, background:"#eff4ff", display:"flex", alignItems:"center", justifyContent:"center", fontSize:13, fontWeight:700, color:"#1a56db" }}>
                      {s.num}
                    </div>
                    <div>
                      <h3 style={{ fontSize:15, fontWeight:600, color:"#0f1f3d", marginBottom:5 }}>{s.title}</h3>
                      <p style={{ fontSize:13, color:"#6b7280", lineHeight:1.6 }}>{s.desc}</p>
                    </div>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" style={{ padding:"90px 24px", background:"linear-gradient(160deg, #0d2154 0%, #1a3a8f 100%)" }}>
        <div style={{ maxWidth:860, margin:"0 auto", textAlign:"center" }}>
          <FadeIn>
            <div style={{ display:"inline-flex", alignItems:"center", gap:8, background:"rgba(255,255,255,0.1)", border:"1px solid rgba(255,255,255,0.2)", borderRadius:100, padding:"5px 14px", marginBottom:20 }}>
              <span style={{ fontSize:11, fontWeight:600, color:"rgba(255,255,255,0.85)", letterSpacing:"0.5px" }}>ABOUT US</span>
            </div>
            <h2 style={{ fontFamily:"'DM Serif Display', Georgia, serif", fontSize:"clamp(28px,4vw,46px)", fontWeight:400, color:"#fff", letterSpacing:"-0.3px", marginBottom:24 }}>
              Your Trusted Hospital Information Partner
            </h2>
            <p style={{ fontSize:16, color:"rgba(255,255,255,0.75)", lineHeight:1.8, marginBottom:16 }}>
              Doctors Axis was built with a single goal: to make hospital information accessible, transparent, and easy to navigate. We understand that finding the right hospital facility — quickly and confidently — can make a critical difference for patients and their families.
            </p>
            <p style={{ fontSize:16, color:"rgba(255,255,255,0.75)", lineHeight:1.8, marginBottom:32 }}>
              Our platform focuses exclusively on hospital infrastructure, facility details, and patient-care services. We do not maintain doctor profiles, provide individual doctor listings, or offer any direct medical consultation. Everything we do is oriented around helping you find the right facility — and guiding you to connect with them directly, simply by reaching out on WhatsApp.
            </p>
            <div style={{ display:"flex", justifyContent:"center", gap:16, flexWrap:"wrap" }}>
              <a href={WA_LINK} target="_blank" rel="noopener noreferrer" className="btn-primary" style={{ background:"#fff", color:"#1a56db" }}>
                Connect on WhatsApp
              </a>
              <span className="btn-outline" style={{ borderColor:"rgba(255,255,255,0.4)", color:"#fff" }} onClick={() => scrollTo("services")}>
                Our Services
              </span>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" style={{ padding:"90px 24px", background:"#f8faff" }}>
        <div style={{ maxWidth:1000, margin:"0 auto" }}>
          <FadeIn>
            <div style={{ textAlign:"center", marginBottom:52 }}>
              <div style={{ display:"inline-flex", alignItems:"center", gap:8, background:"#eff4ff", border:"1px solid #c7d7fc", borderRadius:100, padding:"5px 14px", marginBottom:16 }}>
                <span style={{ fontSize:11, fontWeight:600, color:"#1a56db", letterSpacing:"0.5px" }}>CONTACT</span>
              </div>
              <h2 style={{ fontFamily:"'DM Serif Display', Georgia, serif", fontSize:"clamp(26px,3.5vw,42px)", fontWeight:400, color:"#0a1628", letterSpacing:"-0.3px" }}>
                Get in Touch
              </h2>
            </div>
          </FadeIn>

          <div className="section-container" style={{ gap:40 }}>
            {/* WhatsApp Panel */}
            <FadeIn>
              <div style={{ background:"#fff", borderRadius:18, border:"1px solid #e5eaf4", padding:36, display:"flex", flexDirection:"column", gap:20 }}>
                <div style={{ width:56, height:56, borderRadius:16, background:"#ecfdf5", display:"flex", alignItems:"center", justifyContent:"center" }}>
                  <svg viewBox="0 0 24 24" fill="#25d366" style={{width:30,height:30}}>
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                    <path d="M12.04 0C5.422 0 .026 5.369.026 11.975c0 2.11.554 4.094 1.522 5.817L0 24l6.354-1.522C8.031 23.44 9.99 24 12.04 24 18.655 24 24 18.631 24 12.025 24 5.42 18.655 0 12.04 0zm0 21.9c-1.85 0-3.613-.496-5.144-1.367l-.368-.22-3.82.914.946-3.735-.24-.384A9.846 9.846 0 0 1 2.124 12c0-5.47 4.448-9.913 9.92-9.913 5.472 0 9.92 4.443 9.92 9.913 0 5.47-4.448 9.9-9.924 9.9z"/>
                  </svg>
                </div>
                <div>
                  <h3 style={{ fontSize:20, fontWeight:600, color:"#0f1f3d", marginBottom:8 }}>WhatsApp Us Directly</h3>
                  <p style={{ fontSize:14, color:"#6b7280", lineHeight:1.65 }}>
                    The fastest way to get hospital information, ask about facilities, or coordinate a visit. Our team typically responds within minutes.
                  </p>
                </div>
                <div style={{ background:"#f0fdf4", borderRadius:10, padding:"14px 18px" }}>
                  <div style={{ fontSize:12, color:"#6b7280", marginBottom:3 }}>WhatsApp Number</div>
                  <div style={{ fontSize:20, fontWeight:700, color:"#059669", fontFamily:"monospace" }}>+91 96651 21862</div>
                </div>
                <a href={WA_LINK} target="_blank" rel="noopener noreferrer" className="btn-primary" style={{ justifyContent:"center", background:"#25d366", fontSize:15, padding:"13px" }}>
                  <svg viewBox="0 0 24 24" fill="currentColor" style={{width:18,height:18}}>
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                    <path d="M12.04 0C5.422 0 .026 5.369.026 11.975c0 2.11.554 4.094 1.522 5.817L0 24l6.354-1.522C8.031 23.44 9.99 24 12.04 24 18.655 24 24 18.631 24 12.025 24 5.42 18.655 0 12.04 0zm0 21.9c-1.85 0-3.613-.496-5.144-1.367l-.368-.22-3.82.914.946-3.735-.24-.384A9.846 9.846 0 0 1 2.124 12c0-5.47 4.448-9.913 9.92-9.913 5.472 0 9.92 4.443 9.92 9.913 0 5.47-4.448 9.9-9.924 9.9z"/>
                  </svg>
                  Chat on WhatsApp
                </a>
              </div>
            </FadeIn>

            {/* Contact Form */}
            <FadeIn delay={120}>
              <div style={{ background:"#fff", borderRadius:18, border:"1px solid #e5eaf4", padding:36 }}>
                <h3 style={{ fontSize:20, fontWeight:600, color:"#0f1f3d", marginBottom:6 }}>Send a Message</h3>
                <p style={{ fontSize:14, color:"#6b7280", marginBottom:24 }}>Fill in your details and we'll open a WhatsApp chat for you.</p>
                <div style={{ display:"flex", flexDirection:"column", gap:16 }}>
                  <div>
                    <label style={{ fontSize:13, fontWeight:500, color:"#374151", display:"block", marginBottom:6 }}>Your Name</label>
                    <input
                      type="text" placeholder="Enter your name"
                      value={formData.name}
                      onChange={e => setFormData(p => ({...p, name: e.target.value}))}
                    />
                  </div>
                  <div>
                    <label style={{ fontSize:13, fontWeight:500, color:"#374151", display:"block", marginBottom:6 }}>Message</label>
                    <textarea
                      rows={4} placeholder="Describe what you're looking for..."
                      value={formData.message}
                      onChange={e => setFormData(p => ({...p, message: e.target.value}))}
                    />
                  </div>
                  <button onClick={handleSubmit} className="btn-primary" style={{ justifyContent:"center", fontSize:15, padding:"13px" }}>
                    {submitted ? "✓ Opening WhatsApp..." : "Send via WhatsApp"}
                  </button>
                  <p style={{ fontSize:12, color:"#9ca3af", textAlign:"center" }}>
                    Submitting opens WhatsApp with your message pre-filled.
                  </p>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ background:"#0a1628", color:"#fff", padding:"52px 24px 28px" }}>
        <div style={{ maxWidth:1160, margin:"0 auto" }}>
          <div className="footer-grid" style={{ marginBottom:40 }}>
            {/* Brand */}
            <div>
              <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:16 }}>
                <div style={{ width:34, height:34, borderRadius:9, background:"linear-gradient(135deg,#1a56db,#3b82f6)", display:"flex", alignItems:"center", justifyContent:"center" }}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" style={{width:18,height:18}}>
                    <path d="M22 12h-4l-3 9L9 3l-3 9H2"/>
                  </svg>
                </div>
                <span style={{ fontSize:17, fontWeight:700, letterSpacing:"-0.3px" }}>Doctors <span style={{color:"#60a5fa"}}>Axis</span></span>
              </div>
              <p style={{ fontSize:13.5, color:"rgba(255,255,255,0.55)", lineHeight:1.7, maxWidth:280 }}>
                Providing clear, reliable hospital facility information to patients and families across India.
              </p>
              <a href={WA_LINK} target="_blank" rel="noopener noreferrer" style={{ display:"inline-flex", alignItems:"center", gap:8, marginTop:20, background:"#25d366", color:"#fff", padding:"9px 18px", borderRadius:8, fontSize:13, fontWeight:600, textDecoration:"none" }}>
                <svg viewBox="0 0 24 24" fill="currentColor" style={{width:15,height:15}}>
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                  <path d="M12.04 0C5.422 0 .026 5.369.026 11.975c0 2.11.554 4.094 1.522 5.817L0 24l6.354-1.522C8.031 23.44 9.99 24 12.04 24 18.655 24 24 18.631 24 12.025 24 5.42 18.655 0 12.04 0zm0 21.9c-1.85 0-3.613-.496-5.144-1.367l-.368-.22-3.82.914.946-3.735-.24-.384A9.846 9.846 0 0 1 2.124 12c0-5.47 4.448-9.913 9.92-9.913 5.472 0 9.92 4.443 9.92 9.913 0 5.47-4.448 9.9-9.924 9.9z"/>
                </svg>
                +91 96651 21862
              </a>
            </div>

            {/* Quick Links */}
            <div>
              <h4 style={{ fontSize:14, fontWeight:600, marginBottom:16, color:"rgba(255,255,255,0.9)" }}>Quick Links</h4>
              <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
                {NAV_LINKS.map(n => (
                  <span key={n} onClick={() => scrollTo(n.toLowerCase())}
                    style={{ fontSize:13.5, color:"rgba(255,255,255,0.5)", cursor:"pointer", transition:"color 0.2s" }}
                    onMouseEnter={e => e.target.style.color="#60a5fa"}
                    onMouseLeave={e => e.target.style.color="rgba(255,255,255,0.5)"}
                  >{n}</span>
                ))}
              </div>
            </div>

            {/* Facilities */}
            <div>
              <h4 style={{ fontSize:14, fontWeight:600, marginBottom:16, color:"rgba(255,255,255,0.9)" }}>Facilities</h4>
              <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
                {FACILITIES.map(f => (
                  <span key={f.title} style={{ fontSize:13.5, color:"rgba(255,255,255,0.5)" }}>{f.title}</span>
                ))}
              </div>
            </div>
          </div>

          <div style={{ borderTop:"1px solid rgba(255,255,255,0.08)", paddingTop:24, display:"flex", justifyContent:"space-between", alignItems:"center", gap:16, flexWrap:"wrap" }}>
            <p style={{ fontSize:12, color:"rgba(255,255,255,0.35)" }}>© 2025 Doctors Axis. All rights reserved.</p>
            <p style={{ fontSize:12, color:"rgba(255,255,255,0.35)", maxWidth:500, textAlign:"right" }}>
              <strong style={{color:"rgba(255,255,255,0.5)"}}>Disclaimer:</strong> Doctors Axis does not provide doctor listings or direct consultations. All information is for guidance purposes only.
            </p>
          </div>
        </div>
      </footer>

      {/* Floating WhatsApp Button */}
      <a href={WA_LINK} target="_blank" rel="noopener noreferrer" className="wa-float" title="Chat on WhatsApp">
        <svg viewBox="0 0 24 24" fill="#fff" style={{width:28,height:28}}>
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
          <path d="M12.04 0C5.422 0 .026 5.369.026 11.975c0 2.11.554 4.094 1.522 5.817L0 24l6.354-1.522C8.031 23.44 9.99 24 12.04 24 18.655 24 24 18.631 24 12.025 24 5.42 18.655 0 12.04 0zm0 21.9c-1.85 0-3.613-.496-5.144-1.367l-.368-.22-3.82.914.946-3.735-.24-.384A9.846 9.846 0 0 1 2.124 12c0-5.47 4.448-9.913 9.92-9.913 5.472 0 9.92 4.443 9.92 9.913 0 5.47-4.448 9.9-9.924 9.9z"/>
        </svg>
      </a>
    </div>
  );
}
