'use client'
import { useState, useRef, useEffect } from "react";

const C = {
  bg:    "#181A24",
  surf:  "#1F2130",
  surf2: "#272A3C",
  brd:   "#333756",
  t1:    "#E4E8F5",
  t2:    "#7B84AA",
  acc:   "#5B8BFF",
  gold:  "#E0B860",
};

// ── responsive hook ───────────────────────────────────────────────────────────
function useWindowWidth() {
  const [w, setW] = useState(typeof window !== "undefined" ? window.innerWidth : 1200);
  useEffect(() => {
    const h = () => setW(window.innerWidth);
    window.addEventListener("resize", h);
    return () => window.removeEventListener("resize", h);
  }, []);
  return w;
}

// ── data ─────────────────────────────────────────────────────────────────────
const CATS = [
  { id: "mechanical", label: "Mechanical" },
  { id: "electrical", label: "Electrical" },
  { id: "software",   label: "Software"   },
  { id: "research",   label: "Research"   },
];

const PROJECTS = [
  {
    slug: "auxetic-structures",
    title: "High Strength Auxetic Structures",
    cats: ["mechanical", "research"],
    tags: ["FEA", "SOLIDWORKS", "ANSYS", "3D Printing", "Research"],
    featured: true, fo: 1,
    outcome: "90% load increase → 29 kN",
    summary: "First-author research on hybrid-auxetic cell geometries for high-impact protective applications. Accepted MTME 2026.",
    video: null,
    content: [
      { type: "text", text: "Designed a family of Hybrid-Auxetic cell geometries for high-impact protective applications. Iterated on geometry in SOLIDWORKS and used FEA in ANSYS as a validation tool to guide design decisions." },
      { type: "img-r", alt: "FEA stress distribution results", text: "Fabricated and mechanically tested PLA+/PETG prototypes. Final design achieved a 90% increase in load-bearing capacity to 29 kN over baseline. Accepted for publication at MTME 2026, GIK Institute." },
    ],
  },
  {
    slug: "rocketry-motor",
    title: "Hobby Rocketry Motor",
    cats: ["mechanical"],
    tags: ["SOLIDWORKS", "ANSYS", "OpenRocket", "CNC Machining", "Thermal Analysis"],
    featured: true, fo: 2,
    outcome: "Full design-to-manufacture pipeline",
    summary: "Propellant grain design, casing assembly, propulsion modeling, and full CNC manufacture — from G-code to physical hardware.",
    video: null,
    content: [
      { type: "text", text: "Designed propellant grain geometry and full casing assembly in SOLIDWORKS as part of a 5-person team. Modeled propulsion dynamics in OpenRocket/OpenMotor." },
      { type: "img-l", alt: "CNC machined motor casing and nozzle", text: "Used ANSYS to validate casing and nozzle designs against structural and thermal loads. Manufactured all components via CNC machining — tool selection, feeds/speeds, and G-code. End-to-end from drawing to physical hardware." },
    ],
  },
  {
    slug: "voron-trident",
    title: "Voron Trident CoreXY Printer",
    cats: ["mechanical", "electrical"],
    tags: ["Klipper", "MKS Skipr", "TMC2209", "Electronics", "Firmware"],
    featured: true, fo: 3,
    outcome: "Self-sourced & commissioned under local constraints",
    summary: "Self-sourced and assembled Voron Trident with MKS Skipr SBC. All motion, electrical, and Klipper firmware commissioned independently.",
    video: null,
    content: [
      { type: "text", text: "Fully assembled a Voron Trident 3D printer under local sourcing constraints, substituting unavailable components and integrating an MKS Skipr as combined SBC/control board." },
      { type: "img-r", alt: "Assembled Voron Trident printer", text: "Commissioned and calibrated all motion, electrical, and Klipper firmware systems independently. Configured z_tilt, TMC2209 stepper drivers, T8 leadscrew rotation distances, and hd44780 LCD for a 235mm bed." },
    ],
  },
  {
    slug: "aerospace-bracket",
    title: "Ti-6Al-4V Aerospace Bracket Optimization",
    cats: ["mechanical", "research"],
    tags: ["FORTRAN", "FEA", "ANSYS", "Topology Optimization"],
    featured: false,
    outcome: "80%+ mass reduction",
    summary: "Custom FORTRAN implementation of Timoshenko Beam Theory driving iterative geometry optimization, verified through FEA.",
    video: null,
    content: [
      { type: "text", text: "Wrote a custom FORTRAN program using Timoshenko Beam Theory to drive iterative geometry optimization of a Ti-6Al-4V aerospace bracket." },
      { type: "img-r", alt: "FEA before and after optimization", text: "Achieved 80%+ mass reduction under UDL loading cases. Result independently verified through FEA in ANSYS." },
    ],
  },
  {
    slug: "iot-tracker",
    title: "Global Package Tracking Device",
    cats: ["electrical", "software"],
    tags: ["ESP32", "SIM800L", "ADXL335", "LiPo", "Schematic Design"],
    featured: false,
    outcome: "Full IoT prototype — hardware lead",
    summary: "Hardware lead for team IoT tracker: schematic design, perfboard assembly, ESP32, GSM, accelerometer, environmental sensors, battery management.",
    video: null,
    content: [
      { type: "text", text: "Led hardware for a team IoT prototype for global package tracking and condition monitoring. Handled schematic design, procurement, and perfboard assembly." },
      { type: "img-l", alt: "Perfboard with ESP32 and sensors", text: "Components: ESP32, ADXL335 accelerometer, temperature/humidity sensors, SIM800L GSM, LiPo cells, and buck converters." },
    ],
  },
  {
    slug: "hackathon-wins",
    title: "Hackathon Projects — 2× 1st Place",
    cats: ["software"],
    tags: ["JavaScript", "Chrome Extension", "Firebase", "Accessibility", "Fact-Checking"],
    featured: false,
    outcome: "1st Place × 2 — GDOC 2024 & Mication 2024",
    summary: "Two solo Chrome extensions at separate hackathons: accessibility tools for dyslexia/dyspraxia, and a real-time fact-checker using Google's API.",
    video: null,
    content: [
      { type: "text", text: "Two Chrome extensions built solo at separate 2024 hackathons, both finishing 1st place." },
      { type: "img-l", alt: "Accessibility extension — font and layout controls", text: "GDOC 2024: Accessibility extension for users with dyslexia and dyspraxia. Dynamic font substitution, spacing controls, and layout simplification applied to any webpage in real-time." },
      { type: "img-r", alt: "Fact-checker showing inline accuracy labels", text: "Mication 2024: Fact-checking extension integrating Firebase and Google Fact Check API. Returns inline accuracy assessments as users browse news content." },
    ],
  },
  {
    slug: "belt-drive",
    title: "Multi-Belt Power Transmission Analysis",
    cats: ["mechanical"],
    tags: ["Power Transmission", "Belt Drives", "Engineering Analysis", "Gates Handbook"],
    featured: false,
    outcome: "Full design & analysis to industry standard",
    summary: "Design and analysis report for a twin-belt and sheave power transmission system, sized and verified against industry standards using the Gates Handbook.",
    video: null,
    content: [
      { type: "text", text: "Produced a full design and analysis report for a twin-belt and sheave power transmission system. Sized and verified against industry standards using the Gates Handbook." },
      { type: "img-r", alt: "Belt drive schematic and analysis output", text: "Covered belt selection, sheave sizing, centre distance calculation, and power rating verification under operating conditions." },
    ],
  },
];

const IN_PROGRESS = [
  {
    id: "turbomachinery-work",
    title: "Turbomachinery Internship Projects",
    status: "Current",
    description: "Ongoing work at Turbo Machinery Services, Karachi. Add project details here as they develop.",
    tags: ["Turbomachinery", "Industrial Engineering"],
  },
];

const EXPERIENCE = [
  {
    id: "turbo",
    company: "Turbo Machinery Services",
    location: "Karachi",
    role: "Engineering Intern",
    period: "2026 — Present",
    current: true,
    description: "Add details about your work here as the internship develops.",
    tags: ["Turbomachinery", "Industrial Engineering"],
  },
  {
    id: "freelance",
    company: "Freelance",
    location: "Remote",
    role: "CAD Designer & Prototyper",
    period: "Jan 2024 — Present",
    current: true,
    description: "Delivered mechanical and structural CAD across varied client briefs. Managed the full pipeline from specification to print- and machining-ready output.",
    tags: ["SOLIDWORKS", "CAD", "DFM", "3D Printing"],
  },
  {
    id: "research",
    company: "GIK Institute",
    location: "Topi, KPK",
    role: "Research Intern — Auxetic Structures",
    period: "Jun 2025 — Aug 2025",
    current: false,
    description: "First-author research on hybrid-auxetic cell geometries for high-impact protective applications. Resulted in accepted publication at MTME 2026.",
    tags: ["Research", "FEA", "3D Printing", "ANSYS"],
  },
  {
    id: "heattech",
    company: "Heattech",
    location: "Karachi",
    role: "Trainee Technician — Manufacturing & QC",
    period: "May 2024 — Jul 2024",
    current: false,
    description: "Trained across manufacturing and QC processes for custom thermal components — industrial heaters, thermocouples, and ovens — supplied to factory clients across Pakistan.",
    tags: ["Manufacturing", "Quality Control", "Thermal Components"],
  },
];

// ── tiny components ───────────────────────────────────────────────────────────
function Tag({ label }) {
  const [h, setH] = useState(false);
  return (
    <span
      onMouseEnter={() => setH(true)}
      onMouseLeave={() => setH(false)}
      style={{
        fontFamily: "'Space Mono', monospace",
        fontSize: "9px", letterSpacing: "0.08em",
        color: h ? C.acc : C.t2,
        border: `1px solid ${h ? C.acc + "66" : C.brd}`,
        borderRadius: "3px", padding: "2px 6px",
        textTransform: "uppercase", whiteSpace: "nowrap",
        transition: "color 0.15s, border-color 0.15s", cursor: "default",
      }}
    >{label}</span>
  );
}

function CatChip({ label }) {
  return (
    <span style={{
      fontFamily: "'Space Mono', monospace", fontSize: "9px", color: C.acc,
      border: `1px solid ${C.acc}44`, borderRadius: "3px",
      padding: "2px 7px", textTransform: "uppercase", letterSpacing: "0.1em",
    }}>{label}</span>
  );
}

function Eyebrow({ children }) {
  return (
    <div style={{
      fontFamily: "'Space Mono', monospace", fontSize: "10px", color: C.acc,
      letterSpacing: "0.22em", textTransform: "uppercase", marginBottom: "8px",
      display: "flex", alignItems: "center", gap: "10px",
    }}>
      <span style={{ display: "inline-block", width: "18px", height: "1px", background: C.acc, flexShrink: 0 }} />
      {children}
    </div>
  );
}

function HoverBtn({ children, primary, onClick, href, fullWidthMobile }) {
  const [h, setH] = useState(false);
  const base = {
    display: "inline-flex", alignItems: "center", justifyContent: "center",
    padding: "12px 22px", borderRadius: "6px",
    fontSize: "14px", fontWeight: primary ? 600 : 500,
    cursor: "pointer", fontFamily: "inherit",
    transition: "all 0.18s", textDecoration: "none",
    transform: h ? "translateY(-1px)" : "none",
    width: fullWidthMobile ? "100%" : "auto",
  };
  const style = primary
    ? { ...base, background: h ? "#6B99FF" : C.acc, color: "#fff", border: "none", boxShadow: h ? `0 6px 20px ${C.acc}55` : "none" }
    : { ...base, background: "transparent", color: C.t1, border: `1px solid ${h ? C.t1 : C.brd}` };
  const handlers = { onMouseEnter: () => setH(true), onMouseLeave: () => setH(false) };
  if (href) return <a href={href} style={style} {...handlers}>{children}</a>;
  return <button style={style} onClick={onClick} {...handlers}>{children}</button>;
}

function NavLink({ label, active, onClick }) {
  const [h, setH] = useState(false);
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setH(true)}
      onMouseLeave={() => setH(false)}
      style={{
        background: "none", border: "none", cursor: "pointer",
        color: active ? C.t1 : h ? C.t1 : C.t2,
        fontSize: "14px", fontFamily: "inherit",
        fontWeight: active ? 500 : 400,
        padding: "4px 0", position: "relative",
        transition: "color 0.15s",
      }}
    >
      {label}
      <span style={{
        position: "absolute", bottom: 0, left: 0,
        height: "1px", background: C.acc,
        width: active || h ? "100%" : "0%",
        transition: "width 0.2s ease",
      }} />
    </button>
  );
}

function FilterChip({ label, active, onClick, dot }) {
  const [h, setH] = useState(false);
  return (
    <button onClick={onClick} onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)} style={{
      padding: "6px 14px", borderRadius: "4px",
      border: `1px solid ${active ? C.acc : h ? C.t2 : C.brd}`,
      background: active ? `${C.acc}18` : h ? C.surf2 : "transparent",
      color: active ? C.acc : h ? C.t1 : C.t2,
      cursor: "pointer", fontSize: "12px", fontFamily: "inherit",
      fontWeight: active ? 600 : 400, transition: "all 0.15s",
      display: "flex", alignItems: "center", gap: "5px",
      flexShrink: 0,
    }}>
      {dot && active && <span style={{ width: "5px", height: "5px", borderRadius: "50%", background: C.acc, flexShrink: 0 }} />}
      {label}
    </button>
  );
}

function DdItem({ label, active, onClick }) {
  const [h, setH] = useState(false);
  return (
    <button onClick={onClick} onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)} style={{
      display: "block", width: "100%", textAlign: "left",
      padding: "8px 12px",
      background: active || h ? `${C.acc}15` : "none",
      border: "none", color: active ? C.acc : h ? C.t1 : C.t2,
      cursor: "pointer", fontSize: "13px", borderRadius: "4px",
      transition: "all 0.12s", fontFamily: "inherit",
    }}>{label}</button>
  );
}

// ── thumbnail ─────────────────────────────────────────────────────────────────
function Thumbnail({ project, height = 180, hov }) {
  const vidRef = useRef(null);
  useEffect(() => {
    if (!vidRef.current) return;
    if (hov) vidRef.current.play().catch(() => {});
    else { vidRef.current.pause(); vidRef.current.currentTime = 0; }
  }, [hov]);

  if (project.video) {
    return (
      <div style={{ position: "relative", height, overflow: "hidden" }}>
        <video ref={vidRef} src={project.video} muted loop playsInline
          style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.4s ease", transform: hov ? "scale(1.04)" : "scale(1)" }}
        />
        <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", opacity: hov ? 0 : 1, transition: "opacity 0.25s", background: "rgba(0,0,0,0.35)" }}>
          <div style={{ width: "36px", height: "36px", borderRadius: "50%", background: "rgba(255,255,255,0.15)", backdropFilter: "blur(4px)", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <svg width="12" height="14" viewBox="0 0 12 14" fill="white"><path d="M1 1l10 6-10 6V1z" /></svg>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ height, background: C.surf2, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "8px", overflow: "hidden", position: "relative", transition: "background 0.25s" }}>
      <div style={{ position: "absolute", inset: 0, pointerEvents: "none", backgroundImage: `linear-gradient(${C.brd}40 1px, transparent 1px), linear-gradient(90deg, ${C.brd}40 1px, transparent 1px)`, backgroundSize: "24px 24px", opacity: hov ? 0.6 : 0.3, transition: "opacity 0.3s" }} />
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" style={{ opacity: 0.3, position: "relative" }}>
        <rect x="2" y="2" width="16" height="16" rx="2" stroke={C.t2} strokeWidth="1.2" />
        <circle cx="7" cy="7" r="2" stroke={C.t2} strokeWidth="1.2" />
        <path d="M2 13l4-4 3 3 3-3 6 6" stroke={C.t2} strokeWidth="1.2" strokeLinejoin="round" />
      </svg>
      <span style={{ fontFamily: "'Space Mono', monospace", fontSize: "8px", textTransform: "uppercase", letterSpacing: "0.12em", color: C.t2, opacity: 0.35, position: "relative" }}>Add image / video</span>
    </div>
  );
}

// ── card ──────────────────────────────────────────────────────────────────────
function Card({ p, onClick, isMobile }) {
  const [hov, setHov] = useState(false);
  const active = hov && !isMobile;
  return (
    <div
      onClick={onClick}
      onMouseEnter={() => !isMobile && setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        background: active ? C.surf2 : C.surf,
        border: `1px solid ${active ? C.acc + "66" : C.brd}`,
        borderRadius: "12px", overflow: "hidden", cursor: "pointer",
        transition: "border-color 0.2s, transform 0.22s, box-shadow 0.22s, background 0.2s",
        transform: active ? "translateY(-4px)" : "none",
        boxShadow: active ? `0 20px 48px rgba(0,0,0,0.45), 0 0 0 1px ${C.acc}18` : "0 2px 8px rgba(0,0,0,0.18)",
        display: "flex", flexDirection: "column",
      }}
    >
      <div style={{ borderBottom: `1px solid ${active ? C.acc + "33" : C.brd}`, overflow: "hidden", position: "relative", flexShrink: 0, transition: "border-color 0.2s" }}>
        <Thumbnail project={p} height={180} hov={active} />
        <div style={{ position: "absolute", top: "10px", left: "10px", display: "flex", gap: "4px", flexWrap: "wrap" }}>
          {p.cats.map(c => (
            <span key={c} style={{ fontFamily: "'Space Mono', monospace", fontSize: "8px", background: `${C.bg}CC`, color: C.acc, border: `1px solid ${C.acc}44`, borderRadius: "3px", padding: "2px 6px", textTransform: "uppercase", letterSpacing: "0.08em", backdropFilter: "blur(6px)" }}>{c}</span>
          ))}
        </div>
        <div style={{ position: "absolute", inset: 0, pointerEvents: "none", background: `linear-gradient(135deg, ${C.acc}06 0%, transparent 60%)`, opacity: active ? 1 : 0, transition: "opacity 0.3s" }} />
      </div>

      <div style={{ padding: "1.1rem 1.25rem", display: "flex", flexDirection: "column", flex: 1 }}>
        <div style={{ marginBottom: "10px" }}>
          <div style={{ fontFamily: "'Space Mono', monospace", fontSize: "8px", color: C.t2, letterSpacing: "0.18em", textTransform: "uppercase", marginBottom: "3px", opacity: 0.7 }}>— outcome</div>
          <div style={{ fontSize: "13px", fontWeight: 600, color: C.gold, paddingBottom: "9px", borderBottom: `1px solid ${C.gold}33` }}>{p.outcome}</div>
        </div>
        <h3 style={{ fontSize: "14px", fontWeight: 600, color: active ? "#fff" : C.t1, marginBottom: "6px", lineHeight: 1.35, transition: "color 0.2s" }}>{p.title}</h3>
        <p style={{ fontSize: "12px", color: C.t2, lineHeight: 1.7, marginBottom: "12px", flex: 1 }}>{p.summary}</p>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "5px", alignItems: "center" }}>
          {p.tags.slice(0, 4).map(t => <Tag key={t} label={t} />)}
          {/* Always show on mobile, hover-reveal on desktop */}
          <span style={{ marginLeft: "auto", fontSize: "11px", color: C.acc, opacity: isMobile || active ? 1 : 0, transition: "opacity 0.2s", fontWeight: 500 }}>View →</span>
        </div>
      </div>
    </div>
  );
}

// ── content block ─────────────────────────────────────────────────────────────
function Block({ b, isMobile }) {
  if (b.type === "text") return (
    <p style={{ fontSize: "1rem", color: C.t1, lineHeight: 1.85, maxWidth: "680px" }}>{b.text}</p>
  );
  const imgBox = (
    <div key="img" style={{ height: isMobile ? "200px" : "280px", border: `1px dashed ${C.brd}`, borderRadius: "8px", background: C.surf2, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "8px" }}>
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" style={{ opacity: 0.3 }}>
        <rect x="2" y="2" width="16" height="16" rx="2" stroke={C.t2} strokeWidth="1.2" />
        <circle cx="7" cy="7" r="2" stroke={C.t2} strokeWidth="1.2" />
        <path d="M2 13l4-4 3 3 3-3 6 6" stroke={C.t2} strokeWidth="1.2" strokeLinejoin="round" />
      </svg>
      <span style={{ fontFamily: "'Space Mono',monospace", fontSize: "9px", textTransform: "uppercase", letterSpacing: "0.1em", color: C.t2, opacity: 0.4, textAlign: "center", padding: "0 16px" }}>{b.alt}</span>
    </div>
  );
  const txt = <p key="txt" style={{ fontSize: "1rem", color: C.t1, lineHeight: 1.85 }}>{b.text}</p>;

  if (isMobile) {
    // On mobile: always stack — image on top, text below
    return (
      <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
        {imgBox}{txt}
      </div>
    );
  }
  const imgFirst = b.type === "img-l";
  return (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2.5rem", alignItems: "center" }}>
      {imgFirst ? [imgBox, txt] : [txt, imgBox]}
    </div>
  );
}

// ── views ─────────────────────────────────────────────────────────────────────
function HomeView({ nav, isMobile, isTablet }) {
  const featured = PROJECTS.filter(p => p.featured).sort((a, b) => a.fo - b.fo);
  const cols = isMobile ? "1fr" : isTablet ? "1fr 1fr" : "repeat(3, 1fr)";
  const pad = isMobile ? "0 1.25rem" : "0 clamp(2rem, 10vw, 10rem)";

  return (
    <div>
      <section style={{ minHeight: "calc(100vh - 60px)", display: "flex", alignItems: "center", padding: pad, position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, pointerEvents: "none", backgroundImage: `linear-gradient(${C.brd}30 1px, transparent 1px), linear-gradient(90deg, ${C.brd}30 1px, transparent 1px)`, backgroundSize: "48px 48px", maskImage: "radial-gradient(ellipse 70% 85% at 15% 50%, black 25%, transparent 100%)", WebkitMaskImage: "radial-gradient(ellipse 70% 85% at 15% 50%, black 25%, transparent 100%)" }} />
        <div style={{ position: "absolute", left: isMobile ? "-30%" : "-10%", top: "20%", width: "500px", height: "500px", borderRadius: "50%", background: `radial-gradient(circle, ${C.acc}12 0%, transparent 70%)`, pointerEvents: "none" }} />

        <div style={{ position: "relative", maxWidth: "820px", paddingTop: isMobile ? "2rem" : "0", paddingBottom: isMobile ? "2rem" : "0" }}>
          <Eyebrow>Muhammad Athar Shaikh · GIK Institute</Eyebrow>
          <h1 style={{ fontSize: isMobile ? "2.8rem" : "clamp(3rem, 8vw, 6rem)", fontWeight: 700, lineHeight: 1.05, letterSpacing: "-0.025em", marginBottom: "1.5rem" }}>
            Design it.<br />Simulate it.<br /><span style={{ color: C.acc }}>Build it.</span>
          </h1>
          <p style={{ fontSize: isMobile ? "0.95rem" : "1.05rem", color: C.t2, maxWidth: "480px", lineHeight: 1.8, marginBottom: "1rem" }}>
            Mechanical engineering student with hands-on experience across CAD, FEA, CNC machining, and embedded systems — from published research to real hardware.
          </p>

          <div style={{ display: "inline-flex", alignItems: "center", gap: "8px", marginBottom: "2rem", background: `${C.gold}10`, border: `1px solid ${C.gold}30`, borderRadius: "4px", padding: "5px 10px" }}>
            <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: C.gold, flexShrink: 0, boxShadow: `0 0 6px ${C.gold}`, animation: "pulse 2s ease-in-out infinite" }} />
            <span style={{ fontFamily: "'Space Mono', monospace", fontSize: isMobile ? "9px" : "10px", color: C.gold, letterSpacing: "0.08em" }}>
              Currently interning at Turbo Machinery Services
            </span>
          </div>

          <div style={{ display: "flex", gap: "12px", flexWrap: "wrap", flexDirection: isMobile ? "column" : "row" }}>
            <HoverBtn primary onClick={() => nav("projects")} fullWidthMobile={isMobile}>View Projects</HoverBtn>
            <HoverBtn href="#" fullWidthMobile={isMobile}>Download CV ↓</HoverBtn>
          </div>
        </div>
      </section>

      <section style={{ padding: isMobile ? "3rem 1.25rem" : "5rem clamp(2rem, 6vw, 8rem)", borderTop: `1px solid ${C.brd}` }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: "2rem" }}>
          <div>
            <Eyebrow>Selected work</Eyebrow>
            <h2 style={{ fontSize: isMobile ? "1.4rem" : "1.75rem", fontWeight: 700 }}>Featured Projects</h2>
          </div>
          <button onClick={() => nav("projects")} style={{ background: "none", border: "none", color: C.acc, cursor: "pointer", fontSize: "13px", fontFamily: "inherit", whiteSpace: "nowrap" }}>
            All →
          </button>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: cols, gap: "1.25rem" }}>
          {featured.map(p => <Card key={p.slug} p={p} onClick={() => nav("project", p)} isMobile={isMobile} />)}
        </div>
      </section>
    </div>
  );
}

function ProjectsView({ nav, cats, toggleCat, clearCats, isMobile }) {
  const list = cats.length === 0 ? PROJECTS : PROJECTS.filter(p => p.cats.some(c => cats.includes(c)));
  const pad = isMobile ? "2rem 1.25rem" : "3rem clamp(2rem, 6vw, 8rem)";
  return (
    <div style={{ padding: pad }}>
      <Eyebrow>All work</Eyebrow>
      <h1 style={{ fontSize: isMobile ? "1.75rem" : "2.25rem", fontWeight: 700, marginBottom: "1.5rem" }}>Projects</h1>

      {/* Filter chips — horizontal scroll on mobile */}
      <div style={{
        display: "flex", gap: "6px",
        marginBottom: "2rem", paddingBottom: "1.5rem",
        borderBottom: `1px solid ${C.brd}`, alignItems: "center",
        overflowX: isMobile ? "auto" : "visible",
        WebkitOverflowScrolling: "touch",
        scrollbarWidth: "none",
        msOverflowStyle: "none",
        paddingLeft: isMobile ? "0" : "0",
      }}>
        <FilterChip label="All" active={cats.length === 0} onClick={clearCats} />
        {CATS.map(c => <FilterChip key={c.id} label={c.label} active={cats.includes(c.id)} onClick={() => toggleCat(c.id)} dot={cats.includes(c.id)} />)}
        {cats.length > 0 && (
          <span style={{ fontFamily: "'Space Mono', monospace", fontSize: "10px", color: C.t2, marginLeft: "4px", flexShrink: 0 }}>
            {list.length} result{list.length !== 1 ? "s" : ""}
          </span>
        )}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "repeat(auto-fill, minmax(280px, 1fr))", gap: "1.25rem" }}>
        {list.map(p => <Card key={p.slug} p={p} onClick={() => nav("project", p)} isMobile={isMobile} />)}
      </div>
    </div>
  );
}

function ProjectView({ p, nav, isMobile }) {
  if (!p) return null;
  const idx = PROJECTS.findIndex(x => x.slug === p.slug);
  const next = PROJECTS[(idx + 1) % PROJECTS.length];
  const pad = isMobile ? "2rem 1.25rem" : "3rem clamp(2rem, 6vw, 8rem)";
  return (
    <div style={{ padding: pad }}>
      <button onClick={() => nav("projects")} style={{ background: "none", border: "none", color: C.t2, cursor: "pointer", fontSize: "13px", fontFamily: "inherit", marginBottom: "2rem", display: "flex", alignItems: "center", gap: "6px", transition: "color 0.15s" }}
        onMouseEnter={e => e.currentTarget.style.color = C.t1}
        onMouseLeave={e => e.currentTarget.style.color = C.t2}
      >← All Projects</button>

      <div style={{ maxWidth: "860px", margin: "0 auto" }}>
        <div style={{ display: "flex", gap: "6px", marginBottom: "1rem", flexWrap: "wrap" }}>
          {p.cats.map(c => <CatChip key={c} label={c} />)}
        </div>
        <h1 style={{ fontSize: isMobile ? "1.6rem" : "clamp(1.8rem, 4vw, 2.75rem)", fontWeight: 700, marginBottom: "1.25rem", lineHeight: 1.15, letterSpacing: "-0.015em" }}>
          {p.title}
        </h1>

        <div style={{ display: "inline-flex", alignItems: "stretch", marginBottom: "1.5rem", borderRadius: "6px", overflow: "hidden", border: `1px solid ${C.brd}` }}>
          <div style={{ width: "3px", background: C.gold, flexShrink: 0 }} />
          <div style={{ padding: "10px 16px", background: C.surf }}>
            <div style={{ fontFamily: "'Space Mono', monospace", fontSize: "8px", color: C.t2, letterSpacing: "0.18em", textTransform: "uppercase", marginBottom: "3px" }}>— outcome</div>
            <div style={{ fontSize: isMobile ? "1rem" : "1.15rem", fontWeight: 700, color: C.gold }}>{p.outcome}</div>
          </div>
        </div>

        <div style={{ display: "flex", flexWrap: "wrap", gap: "6px", marginBottom: "2rem" }}>
          {p.tags.map(t => <Tag key={t} label={t} />)}
        </div>
        <div style={{ height: "1px", background: C.brd, marginBottom: "2.5rem" }} />
        <div style={{ display: "flex", flexDirection: "column", gap: isMobile ? "2rem" : "3rem" }}>
          {p.content.map((b, i) => <Block key={i} b={b} isMobile={isMobile} />)}
        </div>

        <div style={{ marginTop: "4rem", paddingTop: "2rem", borderTop: `1px solid ${C.brd}` }}>
          <div style={{ fontFamily: "'Space Mono', monospace", fontSize: "9px", color: C.t2, textTransform: "uppercase", letterSpacing: "0.15em", marginBottom: "4px" }}>Next project</div>
          <button onClick={() => nav("project", next)} style={{ background: "none", border: "none", color: C.t1, cursor: "pointer", fontSize: isMobile ? "14px" : "15px", fontFamily: "inherit", fontWeight: 600, padding: 0, transition: "color 0.15s" }}
            onMouseEnter={e => e.currentTarget.style.color = C.acc}
            onMouseLeave={e => e.currentTarget.style.color = C.t1}
          >{next.title} →</button>
        </div>
      </div>
    </div>
  );
}

function ExperienceView({ isMobile }) {
  const pad = isMobile ? "2rem 1.25rem" : "3rem clamp(2rem, 6vw, 8rem)";
  return (
    <div style={{ padding: pad }}>
      <Eyebrow>Work history</Eyebrow>
      <h1 style={{ fontSize: isMobile ? "1.75rem" : "2.25rem", fontWeight: 700, marginBottom: "2.5rem" }}>Experience</h1>
      <div style={{ position: "relative", maxWidth: "720px" }}>
        <div style={{ position: "absolute", left: "11px", top: "8px", bottom: "8px", width: "1px", background: `linear-gradient(to bottom, ${C.acc}, ${C.brd}44)` }} />
        <div style={{ display: "flex", flexDirection: "column" }}>
          {EXPERIENCE.map((exp, i) => <ExpItem key={exp.id} exp={exp} last={i === EXPERIENCE.length - 1} isMobile={isMobile} />)}
        </div>
      </div>
    </div>
  );
}

function ExpItem({ exp, last, isMobile }) {
  const [h, setH] = useState(false);
  return (
    <div onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)} style={{ display: "flex", gap: isMobile ? "1rem" : "2rem", paddingBottom: last ? 0 : "2.5rem" }}>
      <div style={{ flexShrink: 0, width: "23px", display: "flex", justifyContent: "center", paddingTop: "4px" }}>
        <div style={{ width: "11px", height: "11px", borderRadius: "50%", background: exp.current ? C.gold : h ? C.brd : C.surf, border: `2px solid ${exp.current ? C.gold : h ? C.t2 : C.brd}`, boxShadow: exp.current ? `0 0 12px ${C.gold}55` : "none", flexShrink: 0, transition: "all 0.2s" }} />
      </div>
      <div style={{ flex: 1, background: h && !isMobile ? C.surf : "transparent", border: `1px solid ${h && !isMobile ? C.brd : "transparent"}`, borderRadius: "8px", padding: h && !isMobile ? "1rem" : "0", transition: "all 0.2s" }}>
        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: "0.5rem", marginBottom: "4px", flexWrap: "wrap" }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "2px", flexWrap: "wrap" }}>
              <h3 style={{ fontSize: isMobile ? "1rem" : "1.1rem", fontWeight: 700, color: C.t1 }}>{exp.company}</h3>
              {exp.current && (
                <span style={{ fontFamily: "'Space Mono', monospace", fontSize: "8px", color: C.gold, border: `1px solid ${C.gold}55`, borderRadius: "3px", padding: "1px 6px", textTransform: "uppercase", letterSpacing: "0.1em" }}>Current</span>
              )}
            </div>
            <div style={{ fontSize: "13px", color: C.acc, fontWeight: 500, marginBottom: "2px" }}>{exp.role}</div>
            <div style={{ fontFamily: "'Space Mono', monospace", fontSize: "10px", color: C.t2, letterSpacing: "0.06em" }}>
              {exp.period} · {exp.location}
            </div>
          </div>
        </div>
        <p style={{ fontSize: "13px", color: C.t2, lineHeight: 1.75, margin: "10px 0" }}>{exp.description}</p>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "5px" }}>
          {exp.tags.map(t => <Tag key={t} label={t} />)}
        </div>
      </div>
    </div>
  );
}

function InProgressView({ isMobile }) {
  const pad = isMobile ? "2rem 1.25rem" : "3rem clamp(2rem, 6vw, 8rem)";
  return (
    <div style={{ padding: pad }}>
      <Eyebrow>Live work</Eyebrow>
      <h1 style={{ fontSize: isMobile ? "1.75rem" : "2.25rem", fontWeight: 700, marginBottom: "0.75rem" }}>In Progress</h1>
      <p style={{ color: C.t2, fontSize: "14px", marginBottom: "2.5rem", maxWidth: "500px", lineHeight: 1.7 }}>Active projects and ongoing work. Updated as things develop.</p>
      <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "repeat(auto-fill, minmax(300px, 1fr))", gap: "1.25rem" }}>
        {IN_PROGRESS.map(item => <InProgressCard key={item.id} item={item} />)}
        <div style={{ border: `1px dashed ${C.brd}`, borderRadius: "10px", padding: "1.5rem", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "8px", minHeight: "160px" }}>
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M10 4v12M4 10h12" stroke={C.brd} strokeWidth="1.5" strokeLinecap="round" /></svg>
          <span style={{ fontFamily: "'Space Mono', monospace", fontSize: "9px", textTransform: "uppercase", letterSpacing: "0.12em", color: C.t2, opacity: 0.4 }}>Add item</span>
        </div>
      </div>
    </div>
  );
}

function InProgressCard({ item }) {
  const [h, setH] = useState(false);
  return (
    <div onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)} style={{ background: h ? C.surf2 : C.surf, border: `1px solid ${h ? C.gold + "44" : C.gold + "22"}`, borderRadius: "10px", padding: "1.5rem", position: "relative", overflow: "hidden", transition: "all 0.2s", transform: h ? "translateY(-2px)" : "none", boxShadow: h ? `0 12px 32px rgba(0,0,0,0.3)` : "none" }}>
      <div style={{ position: "absolute", top: 0, right: 0, width: "80px", height: "80px", background: `radial-gradient(circle at top right, ${C.gold}${h ? "20" : "10"}, transparent 70%)`, transition: "all 0.3s" }} />
      <div style={{ display: "inline-flex", alignItems: "center", gap: "6px", marginBottom: "1rem", background: `${C.gold}10`, border: `1px solid ${C.gold}30`, borderRadius: "4px", padding: "4px 8px" }}>
        <span style={{ width: "5px", height: "5px", borderRadius: "50%", background: C.gold, flexShrink: 0, boxShadow: `0 0 5px ${C.gold}`, animation: "pulse 2s ease-in-out infinite" }} />
        <span style={{ fontFamily: "'Space Mono', monospace", fontSize: "9px", color: C.gold, letterSpacing: "0.12em", textTransform: "uppercase" }}>{item.status}</span>
      </div>
      <h3 style={{ fontSize: "1rem", fontWeight: 600, color: h ? "#fff" : C.t1, marginBottom: "8px", lineHeight: 1.35, position: "relative", transition: "color 0.2s" }}>{item.title}</h3>
      <p style={{ fontSize: "13px", color: C.t2, lineHeight: 1.7, marginBottom: "1rem", position: "relative" }}>{item.description}</p>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "5px", position: "relative" }}>
        {item.tags.map(t => <Tag key={t} label={t} />)}
      </div>
    </div>
  );
}

function ContactView({ isMobile }) {
  const pad = isMobile ? "3rem 1.25rem" : "0 clamp(2rem, 10vw, 10rem)";
  return (
    <div style={{ minHeight: isMobile ? "auto" : "calc(100vh - 60px)", display: "flex", alignItems: isMobile ? "flex-start" : "center", padding: pad, paddingTop: isMobile ? "3rem" : undefined }}>
      <div style={{ maxWidth: "540px" }}>
        <Eyebrow>Get in touch</Eyebrow>
        <h1 style={{ fontSize: isMobile ? "2rem" : "2.5rem", fontWeight: 700, marginBottom: "1rem" }}>Contact</h1>
        <p style={{ color: C.t2, lineHeight: 1.8, marginBottom: "2rem", fontSize: "1rem" }}>
          Open to freelance projects, research collaborations, and internships. Response within 24 hours.
        </p>
        <div style={{ marginBottom: "1.5rem" }}>
          <HoverBtn primary href="mailto:atharshaikh2004work@gmail.com" fullWidthMobile={isMobile}>
            atharshaikh2004work@gmail.com
          </HoverBtn>
        </div>
        <a href="https://linkedin.com/in/athar-shaikh-prs/" target="_blank" rel="noreferrer" style={{ color: C.t2, fontSize: "13px", textDecoration: "none", transition: "color 0.15s" }}
          onMouseEnter={e => e.currentTarget.style.color = C.acc}
          onMouseLeave={e => e.currentTarget.style.color = C.t2}
        >LinkedIn ↗</a>
      </div>
    </div>
  );
}

// ── hamburger menu ────────────────────────────────────────────────────────────
function HamburgerIcon({ open }) {
  return (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
      {open ? (
        <>
          <path d="M5 5l12 12M17 5L5 17" stroke={C.t1} strokeWidth="1.5" strokeLinecap="round" />
        </>
      ) : (
        <>
          <path d="M3 7h16M3 11h16M3 15h16" stroke={C.t1} strokeWidth="1.5" strokeLinecap="round" />
        </>
      )}
    </svg>
  );
}

// ── root ──────────────────────────────────────────────────────────────────────
export default function App() {
  const w = useWindowWidth();
  const isMobile = w < 640;
  const isTablet = w < 1024;

  const [view,     setView]     = useState("home");
  const [proj,     setProj]     = useState(null);
  const [cats,     setCats]     = useState([]);
  const [ddOpen,   setDdOpen]   = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const nav = (v, p = null) => {
    setView(v); if (p) setProj(p);
    setDdOpen(false); setMenuOpen(false);
  };
  const toggleCat = (id) => setCats(prev => prev.includes(id) ? prev.filter(c => c !== id) : [...prev, id]);

  const NAV_LINKS = [
    { id: "experience", label: "Experience"  },
    { id: "inprogress", label: "In Progress" },
    { id: "contact",    label: "Contact"     },
  ];

  return (
    <div style={{ fontFamily: "'Space Grotesk', sans-serif", background: C.bg, color: C.t1, minHeight: "100vh" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=Space+Mono:wght@400;700&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        a { color: inherit; } button { font-family: inherit; }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: ${C.bg}; }
        ::-webkit-scrollbar-thumb { background: ${C.brd}; border-radius: 2px; }
        ::-webkit-scrollbar:horizontal { height: 0; }
        @keyframes pulse { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:0.6;transform:scale(0.85)} }
        @keyframes slideDown { from{opacity:0;transform:translateY(-8px)} to{opacity:1;transform:translateY(0)} }
      `}</style>

      {/* NAVBAR */}
      <nav style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 100, background: `${C.bg}E0`, backdropFilter: "blur(16px)", WebkitBackdropFilter: "blur(16px)", borderBottom: `1px solid ${C.brd}`, height: "60px", display: "flex", alignItems: "center", justifyContent: "space-between", padding: `0 ${isMobile ? "1.25rem" : "clamp(1.5rem, 5vw, 4rem)"}` }}>

        {/* Logo */}
        <button onClick={() => nav("home")} style={{ background: "none", border: "none", cursor: "pointer", fontFamily: "'Space Mono', monospace", fontSize: "15px", fontWeight: 700, letterSpacing: "0.12em", color: C.acc }}>AS</button>

        {/* Desktop nav */}
        {!isMobile && (
          <div style={{ display: "flex", alignItems: "center", gap: "1.75rem" }}>
            <div style={{ position: "relative" }}>
              <NavLink
                label={<span style={{ display: "flex", alignItems: "center", gap: "4px" }}>Projects <span style={{ fontSize: "9px", transition: "transform 0.18s", transform: ddOpen ? "rotate(180deg)" : "none", display: "inline-block" }}>▾</span></span>}
                active={["projects", "project"].includes(view)}
                onClick={() => setDdOpen(!ddOpen)}
              />
              {ddOpen && (
                <>
                  <div style={{ position: "fixed", inset: 0, zIndex: 98 }} onClick={() => setDdOpen(false)} />
                  <div style={{ position: "absolute", top: "calc(100% + 10px)", right: 0, background: C.surf, border: `1px solid ${C.brd}`, borderRadius: "8px", padding: "4px", minWidth: "160px", zIndex: 99, boxShadow: "0 16px 40px rgba(0,0,0,0.5)", animation: "slideDown 0.15s ease" }}>
                    <DdItem label="All Projects" onClick={() => { setCats([]); nav("projects"); }} />
                    <div style={{ height: "1px", background: C.brd, margin: "4px 0" }} />
                    {CATS.map(c => <DdItem key={c.id} label={c.label} active={cats.includes(c.id) && view === "projects"} onClick={() => { setCats([c.id]); nav("projects"); }} />)}
                  </div>
                </>
              )}
            </div>
            {NAV_LINKS.map(l => <NavLink key={l.id} label={l.label} active={view === l.id} onClick={() => nav(l.id)} />)}
            <HoverBtn primary href="#">
              <span style={{ display: "flex", alignItems: "center", gap: "5px" }}>
                <svg width="11" height="11" viewBox="0 0 11 11" fill="none"><path d="M5.5 1v7M3 5.5L5.5 8 8 5.5M1.5 10h8" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" /></svg>
                Portfolio PDF
              </span>
            </HoverBtn>
          </div>
        )}

        {/* Mobile hamburger */}
        {isMobile && (
          <button onClick={() => setMenuOpen(!menuOpen)} style={{ background: "none", border: "none", cursor: "pointer", padding: "4px", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <HamburgerIcon open={menuOpen} />
          </button>
        )}
      </nav>

      {/* Mobile menu overlay */}
      {isMobile && menuOpen && (
        <div style={{ position: "fixed", top: "60px", left: 0, right: 0, bottom: 0, zIndex: 99, background: C.bg, borderTop: `1px solid ${C.brd}`, overflowY: "auto", animation: "slideDown 0.18s ease" }}>
          <div style={{ padding: "1.5rem 1.25rem", display: "flex", flexDirection: "column", gap: "0" }}>
            {/* Projects section */}
            <div style={{ marginBottom: "0.5rem" }}>
              <div style={{ fontFamily: "'Space Mono', monospace", fontSize: "9px", color: C.t2, textTransform: "uppercase", letterSpacing: "0.18em", padding: "0.75rem 0 0.5rem" }}>Projects</div>
              {[{ id: "all", label: "All Projects" }, ...CATS.map(c => ({ id: c.id, label: c.label }))].map(item => (
                <button key={item.id} onClick={() => { if (item.id === "all") { setCats([]); } else { setCats([item.id]); } nav("projects"); }} style={{ display: "block", width: "100%", textAlign: "left", padding: "0.85rem 0", background: "none", border: "none", borderBottom: `1px solid ${C.brd}`, color: C.t1, fontSize: "1rem", cursor: "pointer", fontFamily: "inherit" }}>
                  {item.label}
                </button>
              ))}
            </div>
            {NAV_LINKS.map(l => (
              <button key={l.id} onClick={() => nav(l.id)} style={{ display: "block", width: "100%", textAlign: "left", padding: "0.85rem 0", background: "none", border: "none", borderBottom: `1px solid ${C.brd}`, color: view === l.id ? C.acc : C.t1, fontSize: "1rem", cursor: "pointer", fontFamily: "inherit", fontWeight: view === l.id ? 600 : 400 }}>
                {l.label}
              </button>
            ))}
            <div style={{ marginTop: "1.5rem" }}>
              <HoverBtn primary href="#" fullWidthMobile>
                <span style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                  <svg width="11" height="11" viewBox="0 0 11 11" fill="none"><path d="M5.5 1v7M3 5.5L5.5 8 8 5.5M1.5 10h8" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" /></svg>
                  Download Portfolio PDF
                </span>
              </HoverBtn>
            </div>
          </div>
        </div>
      )}

      {/* MAIN */}
      <div style={{ paddingTop: "60px" }}>
        {view === "home"       && <HomeView       nav={nav} isMobile={isMobile} isTablet={isTablet} />}
        {view === "projects"   && <ProjectsView   nav={nav} cats={cats} toggleCat={toggleCat} clearCats={() => setCats([])} isMobile={isMobile} />}
        {view === "project"    && <ProjectView    p={proj}  nav={nav} isMobile={isMobile} />}
        {view === "experience" && <ExperienceView isMobile={isMobile} />}
        {view === "inprogress" && <InProgressView isMobile={isMobile} />}
        {view === "contact"    && <ContactView    isMobile={isMobile} />}
      </div>

      {/* FOOTER */}
      <footer style={{ borderTop: `1px solid ${C.brd}`, padding: `1.5rem ${isMobile ? "1.25rem" : "clamp(1.5rem, 5vw, 4rem)"}`, display: "flex", flexDirection: isMobile ? "column" : "row", justifyContent: "space-between", alignItems: isMobile ? "flex-start" : "center", gap: isMobile ? "1rem" : "0" }}>
        <span style={{ fontFamily: "'Space Mono', monospace", fontSize: "11px", color: C.t2, letterSpacing: "0.08em" }}>© 2026 Muhammad Athar Shaikh</span>
        <div style={{ display: "flex", gap: "1.5rem" }}>
          {[["mailto:atharshaikh2004work@gmail.com", "Email"], ["https://linkedin.com/in/athar-shaikh-prs/", "LinkedIn ↗"]].map(([href, label], i) => (
            <a key={i} href={href} target={i === 1 ? "_blank" : undefined} rel="noreferrer" style={{ fontSize: "12px", color: C.t2, textDecoration: "none", transition: "color 0.15s" }}
              onMouseEnter={e => e.currentTarget.style.color = C.t1}
              onMouseLeave={e => e.currentTarget.style.color = C.t2}
            >{label}</a>
          ))}
        </div>
      </footer>
    </div>
  );
}