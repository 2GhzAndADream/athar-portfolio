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

function useWindowWidth() {
  const [w, setW] = useState(typeof window !== "undefined" ? window.innerWidth : 1200);
  useEffect(() => {
    const h = () => setW(window.innerWidth);
    window.addEventListener("resize", h);
    return () => window.removeEventListener("resize", h);
  }, []);
  return w;
}

// ─────────────────────────────────────────────────────────────────────────────
// DATA
// ─────────────────────────────────────────────────────────────────────────────
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
    summary: "Designed and tested hybrid-auxetic cell geometries for impact-protective applications. First-author publication accepted at MTME 2026.",
    thumbnail: null,   // → "/projects/auxetic/thumb.jpg"
    video: null,       // → "/projects/auxetic/demo.mp4"
    content: [
      {
        type: "text",
        text: "Designed a family of hybrid-auxetic cell geometries targeting impact-protective equipment applications. Each design revision was iterated in SOLIDWORKS, then validated with FEA in ANSYS before fabrication — using simulation as a design tool rather than a sign-off step.",
      },
      {
        type: "img-r",
        image: null,   // → "/projects/auxetic/fea-result.jpg"
        alt: "FEA stress distribution across auxetic cell geometry",
        text: "PLA+/PETG prototypes were fabricated and tested mechanically under ASTM D695 compression. The final geometry achieved a 90% increase in peak load capacity over the baseline, reaching 29 kN — a result accepted for publication at the MTME 2026 international conference, presented as first author.",
      },
      {
        type: "pdf",
        url: null,     // → "/projects/auxetic/paper.pdf"
        pages: [1, 2, 5],  // which pages visitors can view
        label: "Conference Paper",
      },
    ],
  },
  {
    slug: "rocketry-motor",
    title: "Solid-Propellant Rocketry Motor",
    cats: ["mechanical"],
    tags: ["SOLIDWORKS", "ANSYS", "OpenRocket", "CNC Machining", "Thermal Analysis"],
    featured: true, fo: 2,
    outcome: "Designed and CNC-machined end-to-end",
    summary: "Designed a solid-propellant hobby motor in SOLIDWORKS, validated under structural and thermal loads in ANSYS, and machined every component at the ME workshop.",
    thumbnail: null,
    video: null,
    content: [
      {
        type: "text",
        text: "Led mechanical design of a solid-propellant hobby rocket motor as part of a five-person team. Modelled propellant grain geometry and the full casing assembly in SOLIDWORKS, then ran internal ballistics simulations in OpenRocket and OpenMotor to characterise thrust and burn behaviour.",
      },
      {
        type: "img-l",
        image: null,   // → "/projects/rocketry/casing-cad.jpg"
        alt: "SOLIDWORKS assembly of motor casing and nozzle",
        text: "ANSYS was used to validate the aluminium casing and nozzle against structural and thermal loads at peak operating pressure. All hardware was then manufactured in-house at the ME workshop — including tool selection, feeds and speeds, and G-code generation. Every component went from drawing to machine to assembly.",
      },
      {
        type: "img-r",
        image: null,   // → "/projects/rocketry/machined-parts.jpg"
        alt: "CNC-machined motor casing and nozzle components",
        text: "Hands-on machining of propulsion hardware — including threading, boring, and parting operations — produced components to drawing tolerances using the workshop's manual and CNC lathes.",
      },
    ],
  },
  {
    slug: "voron-trident",
    title: "Voron Trident CoreXY Printer",
    cats: ["mechanical", "electrical"],
    tags: ["Klipper", "MKS Skipr", "TMC2209", "Electronics", "Firmware"],
    featured: true, fo: 3,
    outcome: "Self-sourced and commissioned under local constraints",
    summary: "Built a Voron Trident from scratch under Pakistani sourcing constraints — substituted unavailable components, integrated a non-standard SBC, and commissioned all firmware independently.",
    thumbnail: null,
    video: null,       // → "/projects/voron/build-timelapse.mp4"
    content: [
      {
        type: "text",
        text: "Self-sourced and assembled a Voron Trident CoreXY 3D printer under local component constraints. Unavailable parts were substituted with equivalents and an MKS Skipr was integrated as the combined SBC and motion control board — replacing the standard Raspberry Pi and separate controller setup.",
      },
      {
        type: "img-r",
        image: null,   // → "/projects/voron/assembled.jpg"
        alt: "Assembled Voron Trident printer",
        text: "Independently commissioned all motion, electrical, and Klipper firmware systems. This included z_tilt calibration for the three-leadscrew gantry, TMC2209 stepper tuning, T8 leadscrew rotation distances, and a hd44780 LCD configured over parallel interface — none of which are documented for this exact hardware combination.",
      },
    ],
  },
  {
    slug: "aerospace-bracket",
    title: "Ti-6Al-4V Aerospace Bracket Optimisation",
    cats: ["mechanical", "research"],
    tags: ["FORTRAN", "FEA", "ANSYS", "Topology Optimisation"],
    featured: false,
    outcome: "80%+ mass reduction via custom optimiser",
    summary: "Wrote a FORTRAN optimisation routine from scratch using Timoshenko Beam Theory. Achieved 80%+ mass reduction on a Ti-6Al-4V bracket, verified through FEA.",
    thumbnail: null,
    video: null,
    content: [
      {
        type: "text",
        text: "Implemented a custom geometry optimisation routine in FORTRAN using Timoshenko Beam Theory to iteratively remove material from a Ti-6Al-4V aerospace bracket under uniform distributed loading. No commercial topology optimiser — the geometry update logic was written from scratch and iterated to convergence.",
      },
      {
        type: "img-r",
        image: null,   // → "/projects/bracket/before-after.jpg"
        alt: "Bracket geometry before and after optimisation",
        text: "Achieved over 80% mass reduction while maintaining structural integrity across all load cases. The optimised geometry was independently verified through an FEA pass in ANSYS to confirm stress and deflection remained within allowable limits.",
      },
    ],
  },
  {
    slug: "iot-tracker",
    title: "Global Package Tracking Device",
    cats: ["electrical", "software"],
    tags: ["ESP32", "SIM800L", "ADXL335", "LiPo", "Schematic Design"],
    featured: false,
    outcome: "Hardware lead — full IoT prototype",
    summary: "Led hardware for a team-built IoT package tracker with GSM coverage, 3-axis shock sensing, environmental monitoring, and battery management.",
    thumbnail: null,
    video: null,
    content: [
      {
        type: "text",
        text: "Led hardware development for a team-built IoT package tracker with global GSM coverage and multi-parameter condition monitoring. Handled full hardware ownership: schematic design, component sourcing, and hand-assembly on perfboard.",
      },
      {
        type: "img-l",
        image: null,   // → "/projects/iot/perfboard.jpg"
        alt: "Assembled perfboard with ESP32 and sensor stack",
        text: "The system integrates an ESP32 microcontroller, ADXL335 3-axis accelerometer for shock detection, temperature and humidity sensing, SIM800L GSM for location and data transmission, and a LiPo cell with buck converter regulation for standalone field operation.",
      },
    ],
  },
  {
    slug: "hackathon-wins",
    title: "Hackathon Projects — 2× 1st Place",
    cats: ["software"],
    tags: ["JavaScript", "Chrome Extension", "Firebase", "Accessibility", "Fact-Checking"],
    featured: false,
    outcome: "1st Place × 2 — GDOC 2024 & Mication 2024",
    summary: "Two solo Chrome extensions. Two separate hackathons. Two first-place finishes.",
    thumbnail: null,
    video: null,
    content: [
      {
        type: "text",
        text: "Built two Chrome extensions solo — at two separate 2024 hackathons — and won 1st place at both.",
      },
      {
        type: "img-l",
        image: null,   // → "/projects/hackathon/accessibility-ext.jpg"
        alt: "Accessibility extension showing font and layout controls",
        text: "GDOC 2024: Accessibility extension for users with dyslexia and dyspraxia. Applies dynamic font substitution (OpenDyslexic and alternatives), fine-grained letter and word spacing controls, and layout simplification to any webpage — injected at runtime via a content script, no page reload needed.",
      },
      {
        type: "img-r",
        image: null,   // → "/projects/hackathon/factcheck-ext.jpg"
        alt: "Fact-checking extension showing inline accuracy labels on news article",
        text: "Mication 2024: Fact-checking extension integrating a Firebase backend and Google Fact Check API. Highlights claims in news articles and surfaces accuracy assessments inline as the user reads — no page reload, no separate lookup tab required.",
      },
    ],
  },
  {
    slug: "belt-drive",
    title: "Multi-Belt Power Transmission Analysis",
    cats: ["mechanical"],
    tags: ["Power Transmission", "Belt Drives", "Engineering Analysis", "Gates Handbook"],
    featured: false,
    outcome: "Full design & analysis to industry standard",
    summary: "Complete design and analysis report for a twin-belt and sheave system, sized and verified to industry standards using the Gates Handbook methodology.",
    thumbnail: null,
    video: null,
    content: [
      {
        type: "text",
        text: "Produced a complete design and analysis report for a twin-belt and sheave power transmission system. Belt selection, sheave geometry, centre distance calculation, and power rating verification were all carried out against industry standards using the Gates Handbook methodology.",
      },
      {
        type: "img-r",
        image: null,   // → "/projects/belt-drive/schematic.jpg"
        alt: "Belt drive schematic and analysis output",
        text: "The report covers static loading analysis, belt service factor calculations, and expected service life under the specified operating conditions — structured as a professional engineering deliverable.",
      },
    ],
  },
];

const IN_PROGRESS = [
  {
    id: "turbomachinery-work",
    title: "Turbomachinery Internship Projects",
    description: "Ongoing work at Turbo Machinery Services, Karachi. Add specific project details here as they develop.",
    tags: ["Turbomachinery", "Industrial Engineering"],
  },
  // Add more here: { id, title, description, tags }
];

const EXPERIENCE = [
  {
    id: "turbo",
    company: "Turbo Machinery Services",
    location: "Karachi",
    role: "Engineering Intern",
    period: "2026 — Present",
    current: true,
    description: "Working within the service and repair workflow for industrial turbomachinery — compressors, turbines, and ancillary rotating equipment. Exposure to maintenance planning, component inspection, and quality documentation in an active industrial environment.",
    tags: ["Turbomachinery", "Industrial Engineering", "Maintenance"],
  },
  {
    id: "freelance",
    company: "Freelance",
    location: "Remote",
    role: "CAD Designer & Prototyper",
    period: "Jan 2024 — Present",
    current: true,
    description: "Independent CAD contractor across mechanical design briefs — surface modelling for CFD, DFM-ready assemblies for 3D printing and CNC, and structural design work. Managed client scoping, design iteration, and final delivery independently with consistent fast turnaround.",
    tags: ["SOLIDWORKS", "CAD", "DFM", "3D Printing", "CNC"],
  },
  {
    id: "research",
    company: "GIK Institute",
    location: "Topi, KPK",
    role: "Research Intern — Auxetic Structures",
    period: "Jun 2025 — Aug 2025",
    current: false,
    description: "Led design, simulation, and fabrication on a hybrid-auxetic cell geometry research project from initial geometry concepts through to mechanical testing and publication. Served as first author on the paper accepted at MTME 2026.",
    tags: ["Research", "FEA", "ANSYS", "3D Printing"],
  },
  {
    id: "heattech",
    company: "Heattech",
    location: "Karachi",
    role: "Trainee Technician — Manufacturing & QC",
    period: "May 2024 — Jul 2024",
    current: false,
    description: "Rotated through manufacturing and QC processes for a Karachi-based thermal components supplier. Gained hands-on exposure to production of industrial heaters, thermocouples, and custom ovens supplied to factory clients across Pakistan — including in-process inspection and end-of-line QC.",
    tags: ["Manufacturing", "Quality Control", "Thermal Components"],
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// SMALL COMPONENTS
// ─────────────────────────────────────────────────────────────────────────────
function Tag({ label }) {
  const [h, setH] = useState(false);
  return (
    <span onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)} style={{ fontFamily: "'Space Mono', monospace", fontSize: "9px", letterSpacing: "0.08em", color: h ? C.acc : C.t2, border: `1px solid ${h ? C.acc + "66" : C.brd}`, borderRadius: "3px", padding: "2px 6px", textTransform: "uppercase", whiteSpace: "nowrap", transition: "color 0.15s, border-color 0.15s", cursor: "default" }}>{label}</span>
  );
}
function CatChip({ label }) {
  return <span style={{ fontFamily: "'Space Mono', monospace", fontSize: "9px", color: C.acc, border: `1px solid ${C.acc}44`, borderRadius: "3px", padding: "2px 7px", textTransform: "uppercase", letterSpacing: "0.1em" }}>{label}</span>;
}
function Eyebrow({ children }) {
  return (
    <div style={{ fontFamily: "'Space Mono', monospace", fontSize: "10px", color: C.acc, letterSpacing: "0.22em", textTransform: "uppercase", marginBottom: "8px", display: "flex", alignItems: "center", gap: "10px" }}>
      <span style={{ display: "inline-block", width: "18px", height: "1px", background: C.acc, flexShrink: 0 }} />{children}
    </div>
  );
}
function HoverBtn({ children, primary, onClick, href, fullWidth }) {
  const [h, setH] = useState(false);
  const base = { display: "inline-flex", alignItems: "center", justifyContent: "center", padding: "12px 22px", borderRadius: "6px", fontSize: "14px", fontWeight: primary ? 600 : 500, cursor: "pointer", fontFamily: "inherit", transition: "all 0.18s", textDecoration: "none", transform: h ? "translateY(-1px)" : "none", width: fullWidth ? "100%" : "auto" };
  const style = primary
    ? { ...base, background: h ? "#6B99FF" : C.acc, color: "#fff", border: "none", boxShadow: h ? `0 6px 20px ${C.acc}55` : "none" }
    : { ...base, background: "transparent", color: C.t1, border: `1px solid ${h ? C.t1 : C.brd}` };
  const ev = { onMouseEnter: () => setH(true), onMouseLeave: () => setH(false) };
  if (href) return <a href={href} style={style} {...ev}>{children}</a>;
  return <button style={style} onClick={onClick} {...ev}>{children}</button>;
}
function NavLink({ label, active, onClick }) {
  const [h, setH] = useState(false);
  return (
    <button onClick={onClick} onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)} style={{ background: "none", border: "none", cursor: "pointer", color: active ? C.t1 : h ? C.t1 : C.t2, fontSize: "14px", fontFamily: "inherit", fontWeight: active ? 500 : 400, padding: "4px 0", position: "relative", transition: "color 0.15s" }}>
      {label}
      <span style={{ position: "absolute", bottom: 0, left: 0, height: "1px", background: C.acc, width: active || h ? "100%" : "0%", transition: "width 0.2s ease" }} />
    </button>
  );
}
function FilterChip({ label, active, onClick, dot }) {
  const [h, setH] = useState(false);
  return (
    <button onClick={onClick} onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)} style={{ padding: "6px 14px", borderRadius: "4px", border: `1px solid ${active ? C.acc : h ? C.t2 : C.brd}`, background: active ? `${C.acc}18` : h ? C.surf2 : "transparent", color: active ? C.acc : h ? C.t1 : C.t2, cursor: "pointer", fontSize: "12px", fontFamily: "inherit", fontWeight: active ? 600 : 400, transition: "all 0.15s", display: "flex", alignItems: "center", gap: "5px", flexShrink: 0 }}>
      {dot && active && <span style={{ width: "5px", height: "5px", borderRadius: "50%", background: C.acc, flexShrink: 0 }} />}
      {label}
    </button>
  );
}
function DdItem({ label, active, onClick }) {
  const [h, setH] = useState(false);
  return (
    <button onClick={onClick} onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)} style={{ display: "block", width: "100%", textAlign: "left", padding: "8px 12px", background: active || h ? `${C.acc}15` : "none", border: "none", color: active ? C.acc : h ? C.t1 : C.t2, cursor: "pointer", fontSize: "13px", borderRadius: "4px", transition: "all 0.12s", fontFamily: "inherit" }}>{label}</button>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// PDF VIEWER
// ─────────────────────────────────────────────────────────────────────────────
function PDFViewer({ url, pages, label }) {
  const allPages = pages && pages.length > 0 ? pages : [1];
  const [activePage, setActivePage] = useState(allPages[0]);

  if (!url) {
    return (
      <div style={{ border: `1px dashed ${C.brd}`, borderRadius: "10px", padding: "2rem", display: "flex", flexDirection: "column", alignItems: "center", gap: "8px", background: C.surf }}>
        <svg width="28" height="28" viewBox="0 0 28 28" fill="none"><rect x="4" y="2" width="14" height="18" rx="2" stroke={C.brd} strokeWidth="1.5" /><path d="M14 2l6 6v14a2 2 0 01-2 2H6a2 2 0 01-2-2V4a2 2 0 012-2" stroke={C.brd} strokeWidth="1.5" /><path d="M14 2v6h6" stroke={C.brd} strokeWidth="1.5" /></svg>
        <span style={{ fontFamily: "'Space Mono', monospace", fontSize: "9px", color: C.t2, textTransform: "uppercase", letterSpacing: "0.12em", opacity: 0.5 }}>Add PDF — set url in project data</span>
      </div>
    );
  }

  const iframeSrc = `${url}#page=${activePage}&toolbar=0&navpanes=0&scrollbar=0`;

  return (
    <div style={{ border: `1px solid ${C.brd}`, borderRadius: "10px", overflow: "hidden", background: C.surf }}>
      {/* Toolbar */}
      <div style={{ padding: "10px 14px", borderBottom: `1px solid ${C.brd}`, display: "flex", alignItems: "center", gap: "8px", background: C.surf2, flexWrap: "wrap" }}>
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><rect x="1" y="1" width="9" height="12" rx="1.5" stroke={C.t2} strokeWidth="1.2" /><path d="M4 4h5M4 7h5M4 10h3" stroke={C.t2} strokeWidth="1.2" strokeLinecap="round" /></svg>
        <span style={{ fontFamily: "'Space Mono', monospace", fontSize: "10px", color: C.t2, flex: 1 }}>{label || url.split("/").pop()}</span>
        {/* Page selector */}
        {allPages.length > 1 && (
          <div style={{ display: "flex", gap: "4px", alignItems: "center" }}>
            <span style={{ fontFamily: "'Space Mono', monospace", fontSize: "9px", color: C.t2, marginRight: "4px", textTransform: "uppercase", letterSpacing: "0.1em" }}>Page:</span>
            {allPages.map(p => (
              <button key={p} onClick={() => setActivePage(p)} style={{ padding: "2px 8px", borderRadius: "3px", border: `1px solid ${activePage === p ? C.acc : C.brd}`, background: activePage === p ? `${C.acc}18` : "transparent", color: activePage === p ? C.acc : C.t2, fontSize: "11px", cursor: "pointer", fontFamily: "inherit", fontWeight: activePage === p ? 600 : 400, transition: "all 0.12s" }}>{p}</button>
            ))}
          </div>
        )}
        <a href={url} target="_blank" rel="noreferrer" style={{ fontFamily: "'Space Mono', monospace", fontSize: "10px", color: C.t2, textDecoration: "none", marginLeft: "4px", transition: "color 0.15s" }}
          onMouseEnter={e => e.currentTarget.style.color = C.acc}
          onMouseLeave={e => e.currentTarget.style.color = C.t2}
        >Open ↗</a>
      </div>
      {/* PDF frame */}
      <iframe src={iframeSrc} style={{ width: "100%", height: "520px", border: "none", display: "block" }} title={label || "PDF viewer"} />
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// THUMBNAIL
// ─────────────────────────────────────────────────────────────────────────────
function Thumbnail({ project, height = 180, hov }) {
  const vidRef = useRef(null);
  useEffect(() => {
    if (!vidRef.current) return;
    if (hov) vidRef.current.play().catch(() => {});
    else { vidRef.current.pause(); vidRef.current.currentTime = 0; }
  }, [hov]);

  // Video (hover-plays)
  if (project.video) {
    return (
      <div style={{ position: "relative", height, overflow: "hidden" }}>
        <video ref={vidRef} src={project.video} muted loop playsInline style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.4s ease", transform: hov ? "scale(1.04)" : "scale(1)" }} />
        <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", opacity: hov ? 0 : 1, transition: "opacity 0.25s", background: "rgba(0,0,0,0.3)" }}>
          <div style={{ width: "36px", height: "36px", borderRadius: "50%", background: "rgba(255,255,255,0.15)", backdropFilter: "blur(4px)", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <svg width="12" height="14" viewBox="0 0 12 14" fill="white"><path d="M1 1l10 6-10 6V1z" /></svg>
          </div>
        </div>
      </div>
    );
  }

  // Static thumbnail image
  if (project.thumbnail) {
    return (
      <div style={{ height, overflow: "hidden" }}>
        <img src={project.thumbnail} alt={project.title} style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.4s ease", transform: hov ? "scale(1.04)" : "scale(1)", display: "block" }} />
      </div>
    );
  }

  // Placeholder
  return (
    <div style={{ height, background: C.surf2, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "8px", overflow: "hidden", position: "relative" }}>
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

// ─────────────────────────────────────────────────────────────────────────────
// CARD
// ─────────────────────────────────────────────────────────────────────────────
function Card({ p, onClick, isMobile }) {
  const [hov, setHov] = useState(false);
  const active = hov && !isMobile;
  return (
    <div onClick={onClick} onMouseEnter={() => !isMobile && setHov(true)} onMouseLeave={() => setHov(false)}
      style={{ background: active ? C.surf2 : C.surf, border: `1px solid ${active ? C.acc + "66" : C.brd}`, borderRadius: "12px", overflow: "hidden", cursor: "pointer", transition: "border-color 0.2s, transform 0.22s, box-shadow 0.22s, background 0.2s", transform: active ? "translateY(-4px)" : "none", boxShadow: active ? `0 20px 48px rgba(0,0,0,0.45), 0 0 0 1px ${C.acc}18` : "0 2px 8px rgba(0,0,0,0.18)", display: "flex", flexDirection: "column" }}>
      <div style={{ borderBottom: `1px solid ${active ? C.acc + "33" : C.brd}`, overflow: "hidden", position: "relative", flexShrink: 0, transition: "border-color 0.2s" }}>
        <Thumbnail project={p} height={180} hov={active} />
        <div style={{ position: "absolute", top: "10px", left: "10px", display: "flex", gap: "4px", flexWrap: "wrap" }}>
          {p.cats.map(c => <span key={c} style={{ fontFamily: "'Space Mono', monospace", fontSize: "8px", background: `${C.bg}CC`, color: C.acc, border: `1px solid ${C.acc}44`, borderRadius: "3px", padding: "2px 6px", textTransform: "uppercase", letterSpacing: "0.08em", backdropFilter: "blur(6px)" }}>{c}</span>)}
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
          <span style={{ marginLeft: "auto", fontSize: "11px", color: C.acc, opacity: isMobile || active ? 1 : 0, transition: "opacity 0.2s", fontWeight: 500 }}>View →</span>
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// CONTENT BLOCK (supports text, img-l, img-r, pdf)
// ─────────────────────────────────────────────────────────────────────────────
function Block({ b, isMobile }) {
  if (b.type === "text") {
    return <p style={{ fontSize: "1rem", color: C.t1, lineHeight: 1.85, maxWidth: "680px" }}>{b.text}</p>;
  }

  if (b.type === "pdf") {
    return <PDFViewer url={b.url} pages={b.pages} label={b.label} />;
  }

  // img-l or img-r
  const imgEl = b.image
    ? <img key="img" src={b.image} alt={b.alt} style={{ width: "100%", borderRadius: "8px", objectFit: "cover", maxHeight: "300px", display: "block" }} />
    : (
      <div key="img" style={{ height: isMobile ? "200px" : "280px", border: `1px dashed ${C.brd}`, borderRadius: "8px", background: C.surf2, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "8px" }}>
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" style={{ opacity: 0.3 }}>
          <rect x="2" y="2" width="16" height="16" rx="2" stroke={C.t2} strokeWidth="1.2" />
          <circle cx="7" cy="7" r="2" stroke={C.t2} strokeWidth="1.2" />
          <path d="M2 13l4-4 3 3 3-3 6 6" stroke={C.t2} strokeWidth="1.2" strokeLinejoin="round" />
        </svg>
        <span style={{ fontFamily: "'Space Mono',monospace", fontSize: "9px", textTransform: "uppercase", letterSpacing: "0.1em", color: C.t2, opacity: 0.4, textAlign: "center", padding: "0 16px" }}>{b.alt}</span>
      </div>
    );

  const txtEl = <p key="txt" style={{ fontSize: "1rem", color: C.t1, lineHeight: 1.85 }}>{b.text}</p>;

  if (isMobile) return <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>{imgEl}{txtEl}</div>;

  const imgFirst = b.type === "img-l";
  return (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2.5rem", alignItems: "center" }}>
      {imgFirst ? [imgEl, txtEl] : [txtEl, imgEl]}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// VIEWS
// ─────────────────────────────────────────────────────────────────────────────
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
            <span style={{ fontFamily: "'Space Mono', monospace", fontSize: isMobile ? "9px" : "10px", color: C.gold, letterSpacing: "0.08em" }}>Currently interning at Turbo Machinery Services</span>
          </div>
          <div style={{ display: "flex", gap: "12px", flexWrap: "wrap", flexDirection: isMobile ? "column" : "row" }}>
            <HoverBtn primary onClick={() => nav("projects")} fullWidth={isMobile}>View Projects</HoverBtn>
            <HoverBtn href="/cv.pdf" fullWidth={isMobile}>Download CV ↓</HoverBtn>
          </div>
        </div>
      </section>
      <section style={{ padding: isMobile ? "3rem 1.25rem" : "5rem clamp(2rem, 6vw, 8rem)", borderTop: `1px solid ${C.brd}` }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: "2rem" }}>
          <div><Eyebrow>Selected work</Eyebrow><h2 style={{ fontSize: isMobile ? "1.4rem" : "1.75rem", fontWeight: 700 }}>Featured Projects</h2></div>
          <button onClick={() => nav("projects")} style={{ background: "none", border: "none", color: C.acc, cursor: "pointer", fontSize: "13px", fontFamily: "inherit", whiteSpace: "nowrap" }}>All →</button>
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
      <div style={{ display: "flex", gap: "6px", marginBottom: "2rem", paddingBottom: "1.5rem", borderBottom: `1px solid ${C.brd}`, alignItems: "center", overflowX: isMobile ? "auto" : "visible", WebkitOverflowScrolling: "touch" }}>
        <FilterChip label="All" active={cats.length === 0} onClick={clearCats} />
        {CATS.map(c => <FilterChip key={c.id} label={c.label} active={cats.includes(c.id)} onClick={() => toggleCat(c.id)} dot={cats.includes(c.id)} />)}
        {cats.length > 0 && <span style={{ fontFamily: "'Space Mono', monospace", fontSize: "10px", color: C.t2, marginLeft: "4px", flexShrink: 0 }}>{list.length} result{list.length !== 1 ? "s" : ""}</span>}
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
      <button onClick={() => nav("projects")} style={{ background: "none", border: "none", color: C.t2, cursor: "pointer", fontSize: "13px", fontFamily: "inherit", marginBottom: "2rem", display: "flex", alignItems: "center", gap: "6px", transition: "color 0.15s" }} onMouseEnter={e => e.currentTarget.style.color = C.t1} onMouseLeave={e => e.currentTarget.style.color = C.t2}>← All Projects</button>
      <div style={{ maxWidth: "860px", margin: "0 auto" }}>
        <div style={{ display: "flex", gap: "6px", marginBottom: "1rem", flexWrap: "wrap" }}>{p.cats.map(c => <CatChip key={c} label={c} />)}</div>
        <h1 style={{ fontSize: isMobile ? "1.6rem" : "clamp(1.8rem, 4vw, 2.75rem)", fontWeight: 700, marginBottom: "1.25rem", lineHeight: 1.15, letterSpacing: "-0.015em" }}>{p.title}</h1>
        <div style={{ display: "inline-flex", alignItems: "stretch", marginBottom: "1.5rem", borderRadius: "6px", overflow: "hidden", border: `1px solid ${C.brd}` }}>
          <div style={{ width: "3px", background: C.gold, flexShrink: 0 }} />
          <div style={{ padding: "10px 16px", background: C.surf }}>
            <div style={{ fontFamily: "'Space Mono', monospace", fontSize: "8px", color: C.t2, letterSpacing: "0.18em", textTransform: "uppercase", marginBottom: "3px" }}>— outcome</div>
            <div style={{ fontSize: isMobile ? "1rem" : "1.15rem", fontWeight: 700, color: C.gold }}>{p.outcome}</div>
          </div>
        </div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "6px", marginBottom: "2rem" }}>{p.tags.map(t => <Tag key={t} label={t} />)}</div>
        <div style={{ height: "1px", background: C.brd, marginBottom: "2.5rem" }} />
        <div style={{ display: "flex", flexDirection: "column", gap: isMobile ? "2rem" : "3rem" }}>
          {p.content.map((b, i) => <Block key={i} b={b} isMobile={isMobile} />)}
        </div>
        <div style={{ marginTop: "4rem", paddingTop: "2rem", borderTop: `1px solid ${C.brd}` }}>
          <div style={{ fontFamily: "'Space Mono', monospace", fontSize: "9px", color: C.t2, textTransform: "uppercase", letterSpacing: "0.15em", marginBottom: "4px" }}>Next project</div>
          <button onClick={() => nav("project", next)} style={{ background: "none", border: "none", color: C.t1, cursor: "pointer", fontSize: isMobile ? "14px" : "15px", fontFamily: "inherit", fontWeight: 600, padding: 0, transition: "color 0.15s" }} onMouseEnter={e => e.currentTarget.style.color = C.acc} onMouseLeave={e => e.currentTarget.style.color = C.t1}>{next.title} →</button>
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
        <div style={{ display: "flex", alignItems: "flex-start", gap: "0.5rem", marginBottom: "4px", flexWrap: "wrap" }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "2px", flexWrap: "wrap" }}>
              <h3 style={{ fontSize: isMobile ? "1rem" : "1.1rem", fontWeight: 700, color: C.t1 }}>{exp.company}</h3>
              {exp.current && <span style={{ fontFamily: "'Space Mono', monospace", fontSize: "8px", color: C.gold, border: `1px solid ${C.gold}55`, borderRadius: "3px", padding: "1px 6px", textTransform: "uppercase", letterSpacing: "0.1em" }}>Current</span>}
            </div>
            <div style={{ fontSize: "13px", color: C.acc, fontWeight: 500, marginBottom: "2px" }}>{exp.role}</div>
            <div style={{ fontFamily: "'Space Mono', monospace", fontSize: "10px", color: C.t2, letterSpacing: "0.06em" }}>{exp.period} · {exp.location}</div>
          </div>
        </div>
        <p style={{ fontSize: "13px", color: C.t2, lineHeight: 1.75, margin: "10px 0" }}>{exp.description}</p>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "5px" }}>{exp.tags.map(t => <Tag key={t} label={t} />)}</div>
      </div>
    </div>
  );
}

// ─── STATUS PAGE (renamed from In Progress, two sections) ─────────────────────
function StatusView({ isMobile }) {
  const pad = isMobile ? "2rem 1.25rem" : "3rem clamp(2rem, 6vw, 8rem)";
  const currentPositions = EXPERIENCE.filter(e => e.current);
  return (
    <div style={{ padding: pad }}>
      <Eyebrow>What I'm doing now</Eyebrow>
      <h1 style={{ fontSize: isMobile ? "1.75rem" : "2.25rem", fontWeight: 700, marginBottom: "3rem" }}>Status</h1>

      {/* Current Position */}
      <div style={{ marginBottom: "3.5rem" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "1.5rem" }}>
          <span style={{ width: "8px", height: "8px", borderRadius: "50%", background: C.gold, boxShadow: `0 0 8px ${C.gold}`, animation: "pulse 2s ease-in-out infinite", flexShrink: 0 }} />
          <h2 style={{ fontSize: isMobile ? "1.1rem" : "1.25rem", fontWeight: 600, color: C.t1 }}>Current Position</h2>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "repeat(auto-fill, minmax(320px, 1fr))", gap: "1rem" }}>
          {currentPositions.map(exp => (
            <div key={exp.id} style={{ background: C.surf, border: `1px solid ${C.gold}33`, borderLeft: `3px solid ${C.gold}`, borderRadius: "8px", padding: "1.25rem 1.5rem" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "4px", flexWrap: "wrap" }}>
                <h3 style={{ fontSize: "1rem", fontWeight: 700, color: C.t1 }}>{exp.company}</h3>
                <span style={{ fontFamily: "'Space Mono', monospace", fontSize: "8px", color: C.gold, border: `1px solid ${C.gold}55`, borderRadius: "3px", padding: "1px 6px", textTransform: "uppercase", letterSpacing: "0.1em" }}>Now</span>
              </div>
              <div style={{ fontSize: "13px", color: C.acc, fontWeight: 500, marginBottom: "2px" }}>{exp.role}</div>
              <div style={{ fontFamily: "'Space Mono', monospace", fontSize: "10px", color: C.t2, marginBottom: "10px" }}>{exp.period} · {exp.location}</div>
              <p style={{ fontSize: "13px", color: C.t2, lineHeight: 1.7, marginBottom: "10px" }}>{exp.description}</p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "5px" }}>{exp.tags.map(t => <Tag key={t} label={t} />)}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Divider */}
      <div style={{ height: "1px", background: C.brd, marginBottom: "3rem" }} />

      {/* In Progress projects */}
      <div>
        <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "1.5rem" }}>
          <span style={{ width: "8px", height: "8px", borderRadius: "50%", background: C.acc, boxShadow: `0 0 8px ${C.acc}`, flexShrink: 0 }} />
          <h2 style={{ fontSize: isMobile ? "1.1rem" : "1.25rem", fontWeight: 600, color: C.t1 }}>In Progress</h2>
        </div>
        <p style={{ color: C.t2, fontSize: "13px", marginBottom: "1.5rem", lineHeight: 1.7 }}>Active projects and ongoing work. Updated as things develop.</p>
        <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "repeat(auto-fill, minmax(300px, 1fr))", gap: "1.25rem" }}>
          {IN_PROGRESS.map(item => <InProgressCard key={item.id} item={item} />)}
          <div style={{ border: `1px dashed ${C.brd}`, borderRadius: "10px", padding: "1.5rem", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "8px", minHeight: "160px" }}>
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M10 4v12M4 10h12" stroke={C.brd} strokeWidth="1.5" strokeLinecap="round" /></svg>
            <span style={{ fontFamily: "'Space Mono', monospace", fontSize: "9px", textTransform: "uppercase", letterSpacing: "0.12em", color: C.t2, opacity: 0.4 }}>Add item</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function InProgressCard({ item }) {
  const [h, setH] = useState(false);
  return (
    <div onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)} style={{ background: h ? C.surf2 : C.surf, border: `1px solid ${h ? C.acc + "44" : C.brd}`, borderRadius: "10px", padding: "1.5rem", position: "relative", overflow: "hidden", transition: "all 0.2s", transform: h ? "translateY(-2px)" : "none", boxShadow: h ? `0 12px 32px rgba(0,0,0,0.3)` : "none" }}>
      <div style={{ position: "absolute", top: 0, right: 0, width: "80px", height: "80px", background: `radial-gradient(circle at top right, ${C.acc}${h ? "14" : "08"}, transparent 70%)`, transition: "all 0.3s" }} />
      <div style={{ display: "inline-flex", alignItems: "center", gap: "6px", marginBottom: "1rem", background: `${C.acc}10`, border: `1px solid ${C.acc}30`, borderRadius: "4px", padding: "4px 8px" }}>
        <span style={{ width: "5px", height: "5px", borderRadius: "50%", background: C.acc, flexShrink: 0, animation: "pulse 2s ease-in-out infinite" }} />
        <span style={{ fontFamily: "'Space Mono', monospace", fontSize: "9px", color: C.acc, letterSpacing: "0.12em", textTransform: "uppercase" }}>In Progress</span>
      </div>
      <h3 style={{ fontSize: "1rem", fontWeight: 600, color: h ? "#fff" : C.t1, marginBottom: "8px", lineHeight: 1.35, position: "relative", transition: "color 0.2s" }}>{item.title}</h3>
      <p style={{ fontSize: "13px", color: C.t2, lineHeight: 1.7, marginBottom: "1rem", position: "relative" }}>{item.description}</p>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "5px" }}>{item.tags.map(t => <Tag key={t} label={t} />)}</div>
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
        <p style={{ color: C.t2, lineHeight: 1.8, marginBottom: "2rem", fontSize: "1rem" }}>Open to freelance projects, research collaborations, and internships. Response within 24 hours.</p>
        <div style={{ marginBottom: "1.5rem" }}>
          <HoverBtn primary href="mailto:atharshaikh2004work@gmail.com" fullWidth={isMobile}>atharshaikh2004work@gmail.com</HoverBtn>
        </div>
        <a href="https://linkedin.com/in/athar-shaikh-prs/" target="_blank" rel="noreferrer" style={{ color: C.t2, fontSize: "13px", textDecoration: "none", transition: "color 0.15s" }} onMouseEnter={e => e.currentTarget.style.color = C.acc} onMouseLeave={e => e.currentTarget.style.color = C.t2}>LinkedIn ↗</a>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// ROOT
// ─────────────────────────────────────────────────────────────────────────────
function HamburgerIcon({ open }) {
  return (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
      {open
        ? <path d="M5 5l12 12M17 5L5 17" stroke={C.t1} strokeWidth="1.5" strokeLinecap="round" />
        : <path d="M3 7h16M3 11h16M3 15h16" stroke={C.t1} strokeWidth="1.5" strokeLinecap="round" />}
    </svg>
  );
}

export default function App() {
  const w = useWindowWidth();
  const isMobile  = w < 640;
  const isTablet  = w < 1024;

  const [view,     setView]     = useState("home");
  const [proj,     setProj]     = useState(null);
  const [cats,     setCats]     = useState([]);
  const [ddOpen,   setDdOpen]   = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const nav = (v, p = null) => { setView(v); if (p) setProj(p); setDdOpen(false); setMenuOpen(false); };
  const toggleCat = id => setCats(prev => prev.includes(id) ? prev.filter(c => c !== id) : [...prev, id]);

  const NAV_LINKS = [
    { id: "experience", label: "Experience" },
    { id: "status",     label: "Status"     },
    { id: "contact",    label: "Contact"    },
  ];

  const navPad = isMobile ? "0 1.25rem" : "0 clamp(1.5rem, 5vw, 4rem)";

  return (
    <div style={{ fontFamily: "'Space Grotesk', sans-serif", background: C.bg, color: C.t1, minHeight: "100vh" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=Space+Mono:wght@400;700&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        a { color: inherit; } button { font-family: inherit; }
        ::-webkit-scrollbar { width: 4px; } ::-webkit-scrollbar-track { background: ${C.bg}; } ::-webkit-scrollbar-thumb { background: ${C.brd}; border-radius: 2px; }
        ::-webkit-scrollbar:horizontal { height: 0; }
        @keyframes pulse { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:0.6;transform:scale(0.85)} }
        @keyframes slideDown { from{opacity:0;transform:translateY(-8px)} to{opacity:1;transform:translateY(0)} }
      `}</style>

      {/* NAVBAR */}
      <nav style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 100, background: `${C.bg}E0`, backdropFilter: "blur(16px)", WebkitBackdropFilter: "blur(16px)", borderBottom: `1px solid ${C.brd}`, height: "60px", display: "flex", alignItems: "center", justifyContent: "space-between", padding: navPad }}>
        <button onClick={() => nav("home")} style={{ background: "none", border: "none", cursor: "pointer", fontFamily: "'Space Mono', monospace", fontSize: "15px", fontWeight: 700, letterSpacing: "0.12em", color: C.acc }}>AS</button>

        {!isMobile && (
          <div style={{ display: "flex", alignItems: "center", gap: "1.75rem" }}>
            <div style={{ position: "relative" }}>
              <NavLink label={<span style={{ display: "flex", alignItems: "center", gap: "4px" }}>Projects <span style={{ fontSize: "9px", transition: "transform 0.18s", transform: ddOpen ? "rotate(180deg)" : "none", display: "inline-block" }}>▾</span></span>} active={["projects","project"].includes(view)} onClick={() => setDdOpen(!ddOpen)} />
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
            <HoverBtn primary href="/portfolio.pdf">
              <span style={{ display: "flex", alignItems: "center", gap: "5px" }}>
                <svg width="11" height="11" viewBox="0 0 11 11" fill="none"><path d="M5.5 1v7M3 5.5L5.5 8 8 5.5M1.5 10h8" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" /></svg>
                Portfolio PDF
              </span>
            </HoverBtn>
          </div>
        )}

        {isMobile && (
          <button onClick={() => setMenuOpen(!menuOpen)} style={{ background: "none", border: "none", cursor: "pointer", padding: "4px", display: "flex" }}>
            <HamburgerIcon open={menuOpen} />
          </button>
        )}
      </nav>

      {/* MOBILE MENU */}
      {isMobile && menuOpen && (
        <div style={{ position: "fixed", top: "60px", left: 0, right: 0, bottom: 0, zIndex: 99, background: C.bg, borderTop: `1px solid ${C.brd}`, overflowY: "auto", animation: "slideDown 0.18s ease" }}>
          <div style={{ padding: "1.5rem 1.25rem", display: "flex", flexDirection: "column" }}>
            <div style={{ fontFamily: "'Space Mono', monospace", fontSize: "9px", color: C.t2, textTransform: "uppercase", letterSpacing: "0.18em", padding: "0.5rem 0" }}>Projects</div>
            {[{ id: "all", label: "All Projects" }, ...CATS.map(c => ({ id: c.id, label: c.label }))].map(item => (
              <button key={item.id} onClick={() => { if (item.id === "all") setCats([]); else setCats([item.id]); nav("projects"); }} style={{ display: "block", width: "100%", textAlign: "left", padding: "0.85rem 0", background: "none", border: "none", borderBottom: `1px solid ${C.brd}`, color: C.t1, fontSize: "1rem", cursor: "pointer", fontFamily: "inherit" }}>{item.label}</button>
            ))}
            {NAV_LINKS.map(l => (
              <button key={l.id} onClick={() => nav(l.id)} style={{ display: "block", width: "100%", textAlign: "left", padding: "0.85rem 0", background: "none", border: "none", borderBottom: `1px solid ${C.brd}`, color: view === l.id ? C.acc : C.t1, fontSize: "1rem", cursor: "pointer", fontFamily: "inherit", fontWeight: view === l.id ? 600 : 400 }}>{l.label}</button>
            ))}
            <div style={{ marginTop: "1.5rem" }}>
              <HoverBtn primary href="/portfolio.pdf" fullWidth>
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
        {view === "project"    && <ProjectView    p={proj} nav={nav} isMobile={isMobile} />}
        {view === "experience" && <ExperienceView isMobile={isMobile} />}
        {view === "status"     && <StatusView     isMobile={isMobile} />}
        {view === "contact"    && <ContactView    isMobile={isMobile} />}
      </div>

      {/* FOOTER */}
      <footer style={{ borderTop: `1px solid ${C.brd}`, padding: `1.5rem ${isMobile ? "1.25rem" : "clamp(1.5rem, 5vw, 4rem)"}`, display: "flex", flexDirection: isMobile ? "column" : "row", justifyContent: "space-between", alignItems: isMobile ? "flex-start" : "center", gap: isMobile ? "1rem" : "0" }}>
        <span style={{ fontFamily: "'Space Mono', monospace", fontSize: "11px", color: C.t2, letterSpacing: "0.08em" }}>© 2026 Muhammad Athar Shaikh</span>
        <div style={{ display: "flex", gap: "1.5rem" }}>
          {[["mailto:atharshaikh2004work@gmail.com","Email"],["https://linkedin.com/in/athar-shaikh-prs/","LinkedIn ↗"]].map(([href, label], i) => (
            <a key={i} href={href} target={i===1?"_blank":undefined} rel="noreferrer" style={{ fontSize: "12px", color: C.t2, textDecoration: "none", transition: "color 0.15s" }} onMouseEnter={e=>e.currentTarget.style.color=C.t1} onMouseLeave={e=>e.currentTarget.style.color=C.t2}>{label}</a>
          ))}
        </div>
      </footer>
    </div>
  );
}