"use client";

import { useEffect, useRef, useState } from "react";

/* ── Google Fonts ─────────────────────────────────────────────────────────── */
function FontLoader() {
  useEffect(() => {
    const link = document.createElement("link");
    link.href =
      "https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800;900&family=Playfair+Display:ital,wght@0,700;0,800;1,700&display=swap";
    link.rel = "stylesheet";
    document.head.appendChild(link);
  }, []);
  return null;
}

/* ── Scroll Reveal ────────────────────────────────────────────────────────── */
function useReveal(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    // Use a small delay so the browser has painted the element before observing
    const tid = setTimeout(() => {
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) { setVisible(true); obs.disconnect(); }
        },
        { threshold, rootMargin: "0px 0px -60px 0px" }
      );
      obs.observe(el);
      return () => obs.disconnect();
    }, 50);
    return () => clearTimeout(tid);
  }, [threshold]);
  return { ref, visible };
}

function Reveal({
  children, delay = 0, direction = "up", className = "",
}: {
  children: React.ReactNode; delay?: number;
  direction?: "up" | "left" | "right" | "fade"; className?: string;
}) {
  const { ref, visible } = useReveal();
  const transforms: Record<string, string> = {
    up: "translateY(48px)", left: "translateX(-48px)",
    right: "translateX(48px)", fade: "scale(0.95)",
  };
  return (
    <div ref={ref} className={className} style={{
      opacity: visible ? 1 : 0,
      transform: visible ? "none" : transforms[direction],
      transition: `opacity 0.75s cubic-bezier(.22,1,.36,1) ${delay}ms, transform 0.75s cubic-bezier(.22,1,.36,1) ${delay}ms`,
      willChange: "opacity, transform",
    }}>
      {children}
    </div>
  );
}

/* ── Sparkle SVG ──────────────────────────────────────────────────────────── */
const SparkSVG = ({
  className = "",
  style,
}: {
  className?: string;
  style?: React.CSSProperties;
}) => (
  <svg
    className={className}
    style={style}
    viewBox="0 0 24 24"
    fill="currentColor"
  >
    <path d="M12 1 L13.8 10.2 L23 12 L13.8 13.8 L12 23 L10.2 13.8 L1 12 L10.2 10.2 Z" />
  </svg>
);

/* ── BG Blob ──────────────────────────────────────────────────────────────── */
// A single reusable decorative blob element
const Blob = ({ style }: { style: React.CSSProperties }) => (
  <div className="absolute rounded-full blur-3xl pointer-events-none" style={style} />
);

/* ── Global page background (consistent across all sections) ─────────────── */
const pageBg = "bg-[#fff0f5]";

/* ══════════════════════════════════════════════════════════════════════════ */
/*  NAVBAR                                                                    */
/* ══════════════════════════════════════════════════════════════════════════ */
function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const links = ["About", "Services", "Portfolio", "Feedback", "Contact"];

  return (
    <nav
      className="fixed top-0 inset-x-0 z-50 transition-all duration-500"
      style={{
        background: scrolled
          ? "rgba(255,240,245,0.88)"
          : "transparent",
        backdropFilter: scrolled ? "blur(18px)" : "none",
        borderBottom: scrolled ? "1px solid rgba(255,105,180,0.15)" : "none",
        fontFamily: "'Poppins', sans-serif",
      }}
    >
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <span className="font-black text-lg tracking-wider"
          style={{ color: "#e0337a", fontFamily: "'Poppins', sans-serif" }}>
          GODDESS <span style={{ color: "#ff85b3" }}>STUDIO</span>
        </span>

        <div className="hidden md:flex items-center gap-8">
          {links.map(l => (
            <a key={l} href={`#${l.toLowerCase()}`}
              className="text-xs font-semibold tracking-[0.2em] uppercase transition-colors duration-200 hover:text-[#e0337a]"
              style={{ color: scrolled ? "#9b4f6e" : "rgba(255,255,255,0.9)", fontFamily: "'Poppins', sans-serif" }}>
              {l}
            </a>
          ))}
          <a href="https://wa.me/62895321403850" target="_blank" rel="noreferrer"
            className="px-5 py-2.5 rounded-full text-white text-xs font-bold tracking-[0.15em] uppercase transition-all duration-300 hover:scale-105 hover:shadow-lg"
            style={{ background: "linear-gradient(135deg,#ff4da6,#e0337a)", boxShadow: "0 4px 20px rgba(224,51,122,0.4)", fontFamily: "'Poppins', sans-serif" }}>
            Book Now
          </a>
        </div>

        <button onClick={() => setOpen(!open)} className="md:hidden"
          style={{ color: scrolled ? "#e0337a" : "white" }}>
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {open
              ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
              : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 6h16M4 12h16M4 18h16" />}
          </svg>
        </button>
      </div>

      {open && (
        <div className="md:hidden px-6 pb-6 pt-2"
          style={{ background: "rgba(255,240,245,0.97)", borderTop: "1px solid rgba(255,105,180,0.15)", fontFamily: "'Poppins', sans-serif" }}>
          {links.map(l => (
            <a key={l} href={`#${l.toLowerCase()}`} onClick={() => setOpen(false)}
              className="block py-3 text-sm font-semibold tracking-widest uppercase border-b"
              style={{ color: "#9b4f6e", borderColor: "rgba(255,105,180,0.15)" }}>{l}</a>
          ))}
          <a href="https://wa.me/62895321403850" target="_blank" rel="noreferrer"
            className="mt-4 block text-center py-3 rounded-full text-white text-sm font-bold tracking-widest uppercase"
            style={{ background: "linear-gradient(135deg,#ff4da6,#e0337a)" }}>Book Now</a>
        </div>
      )}
    </nav>
  );
}

/* ══════════════════════════════════════════════════════════════════════════ */
/*  HERO                                                                      */
/* ══════════════════════════════════════════════════════════════════════════ */
function Hero() {
  const [in_, setIn] = useState(false);
  useEffect(() => { const t = setTimeout(() => setIn(true), 120); return () => clearTimeout(t); }, []);
  const anim = (delay: number) => ({
    opacity: in_ ? 1 : 0,
    transform: in_ ? "none" : "translateY(32px)",
    transition: `opacity 1s cubic-bezier(.22,1,.36,1) ${delay}ms, transform 1s cubic-bezier(.22,1,.36,1) ${delay}ms`,
  });

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{ background: "linear-gradient(150deg,#ff4da6 0%,#ff85b3 30%,#ffb3d1 55%,#ffd6e8 75%,#fff0f5 100%)" }}>

      {/* Decorative blobs */}
      <Blob style={{ width:600, height:600, top:"-15%", right:"-12%", background:"rgba(255,255,255,0.18)" }} />
      <Blob style={{ width:400, height:400, bottom:"-10%", left:"-8%", background:"rgba(255,77,166,0.25)" }} />
      <Blob style={{ width:300, height:300, top:"40%", left:"5%", background:"rgba(255,200,230,0.3)" }} />
      <Blob style={{ width:200, height:200, top:"15%", right:"25%", background:"rgba(255,255,255,0.22)" }} />

      {/* Floating sparkles */}
      {[
        { cls:"top-24 left-[18%] w-5 h-5 text-white/60 animate-pulse", delay:0 },
        { cls:"top-36 right-[22%] w-3 h-3 text-yellow-100/80", delay:300 },
        { cls:"bottom-40 left-[30%] w-4 h-4 text-white/50 animate-pulse", delay:600 },
        { cls:"bottom-56 right-[18%] w-6 h-6 text-pink-100/70", delay:900 },
        { cls:"top-[45%] left-[8%] w-3 h-3 text-white/40 animate-pulse", delay:200 },
      ].map((s, i) => <SparkSVG key={i} className={`absolute ${s.cls}`} />)}

      {/* Decorative circles ring */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[700px] h-[700px] rounded-full border border-white/10" />
        <div className="absolute w-[500px] h-[500px] rounded-full border border-white/15" />
        <div className="absolute w-[300px] h-[300px] rounded-full border border-white/20" />
      </div>

      <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
        <div style={anim(100)}>
          <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full mb-8"
            style={{ background:"rgba(255,255,255,0.25)", backdropFilter:"blur(8px)", border:"1px solid rgba(255,255,255,0.4)" }}>
            <SparkSVG className="w-3 h-3 text-white" />
            <span className="text-white text-xs font-semibold tracking-[0.3em] uppercase"
              style={{ fontFamily:"'Poppins',sans-serif" }}>Premium Nail Art Studio · Jakarta Timur</span>
            <SparkSVG className="w-3 h-3 text-white" />
          </div>
        </div>

        <div style={anim(300)}>
          <h1 style={{
            fontFamily: "'Poppins',sans-serif",
            fontSize: "clamp(4rem,11vw,9rem)",
            fontWeight: 900,
            lineHeight: 0.95,
            letterSpacing: "-0.03em",
            color: "white",
            textShadow: "0 4px 40px rgba(180,0,80,0.25)",
          }}>
            GODDESS
          </h1>
        </div>
        <div style={anim(450)}>
          <h1 style={{
            fontFamily: "'Poppins',sans-serif",
            fontSize: "clamp(4rem,11vw,9rem)",
            fontWeight: 900,
            lineHeight: 0.95,
            letterSpacing: "-0.03em",
            WebkitTextStroke: "3px rgba(255,255,255,0.9)",
            color: "transparent",
            textShadow: "none",
          }}>
            STUDIO
          </h1>
        </div>

        <div style={anim(600)}>
          <p className="mt-8 mb-12 text-white/85 text-lg md:text-xl max-w-2xl mx-auto"
            style={{ fontFamily:"'Poppins',sans-serif", fontWeight:400, lineHeight:1.8, letterSpacing:"0.01em" }}>
            Nail art bukan sekadar hiasan —<br />
            <span className="font-semibold text-white">ini adalah seni yang menceritakan dirimu.</span>
          </p>
        </div>

        <div style={anim(800)} className="flex flex-col sm:flex-row gap-4 justify-center">
          <a href="https://wa.me/62895321403850" target="_blank" rel="noreferrer"
            className="group px-10 py-4 rounded-full text-white font-bold text-sm tracking-[0.2em] uppercase flex items-center justify-center gap-3 transition-all duration-300 hover:scale-105 hover:shadow-2xl"
            style={{ background:"rgba(255,255,255,0.2)", backdropFilter:"blur(12px)", border:"2px solid rgba(255,255,255,0.6)", fontFamily:"'Poppins',sans-serif", boxShadow:"0 8px 32px rgba(180,0,80,0.2)" }}>
            <svg className="w-5 h-5 fill-white" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z"/></svg>
            Book Now
            <span className="group-hover:translate-x-1 transition-transform">→</span>
          </a>
          <a href="#portfolio"
            className="px-10 py-4 rounded-full text-white font-bold text-sm tracking-[0.2em] uppercase flex items-center justify-center gap-2 transition-all duration-300 hover:scale-105"
            style={{ background:"rgba(255,255,255,0.12)", backdropFilter:"blur(8px)", border:"2px solid rgba(255,255,255,0.35)", fontFamily:"'Poppins',sans-serif" }}>
            Lihat Karya Kami ↓
          </a>
        </div>

        <div style={anim(1100)} className="mt-16 flex justify-center gap-12">
          {[["500+","Happy Clients"],["3+","Tahun Pengalaman"],["100%","Handcrafted"]].map(([n,l]) => (
            <div key={l} className="text-center">
              <p className="font-black text-white" style={{ fontFamily:"'Poppins',sans-serif", fontSize:"1.8rem" }}>{n}</p>
              <p className="text-white/70 text-xs font-medium tracking-[0.15em] uppercase mt-1" style={{ fontFamily:"'Poppins',sans-serif" }}>{l}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        style={{ opacity: in_ ? 1 : 0, transition: "opacity 1s ease 1.3s" }}>
        <span className="text-white/50 text-xs tracking-[0.3em] uppercase font-medium" style={{ fontFamily:"'Poppins',sans-serif" }}>Scroll</span>
        <div className="w-px h-10 animate-pulse" style={{ background:"linear-gradient(to bottom,rgba(255,255,255,0.6),transparent)" }} />
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════════════════════════ */
/*  SECTION WRAPPER — consistent background                                  */
/* ══════════════════════════════════════════════════════════════════════════ */
function Section({ id, children, dark = false }: {
  id?: string; children: React.ReactNode; dark?: boolean;
}) {
  return (
    <section id={id} className="relative overflow-hidden py-28"
      style={{ background: dark
        ? "linear-gradient(160deg,#ff4da6 0%,#e0337a 40%,#b5175e 100%)"
        : "linear-gradient(160deg,#fff0f5 0%,#ffe0ef 40%,#ffd0e8 70%,#ffb8d9 100%)" }}>
      {!dark && <>
        <Blob style={{ width:500, height:500, top:"-20%", right:"-10%", background:"rgba(255,100,170,0.12)", borderRadius:"60% 40% 70% 30%/50% 60% 40% 50%" }} />
        <Blob style={{ width:350, height:350, bottom:"-15%", left:"-8%", background:"rgba(255,180,215,0.2)", borderRadius:"40% 60% 30% 70%/60% 40% 60% 40%" }} />
      </>}
      {dark && <>
        <Blob style={{ width:400, height:400, top:"-20%", right:"-5%", background:"rgba(255,255,255,0.07)" }} />
        <Blob style={{ width:300, height:300, bottom:"-10%", left:"-5%", background:"rgba(0,0,0,0.1)" }} />
      </>}
      <div className="relative z-10 max-w-6xl mx-auto px-6">{children}</div>
    </section>
  );
}

/* ── Section heading ──────────────────────────────────────────────────────── */
function SectionHead({ eyebrow, title, subtitle, dark = false }: {
  eyebrow: string; title: React.ReactNode; subtitle?: string; dark?: boolean;
}) {
  return (
    <Reveal className="text-center mb-16">
      <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-4"
        style={{ background: dark ? "rgba(255,255,255,0.15)" : "rgba(224,51,122,0.1)", border: dark ? "1px solid rgba(255,255,255,0.25)" : "1px solid rgba(224,51,122,0.2)" }}>
        <SparkSVG className="w-2.5 h-2.5" style={{ color: dark ? "rgba(255,255,255,0.8)" : "#e0337a" } as React.CSSProperties} />
        <span className="text-xs font-bold tracking-[0.3em] uppercase"
          style={{ color: dark ? "rgba(255,255,255,0.85)" : "#e0337a", fontFamily:"'Poppins',sans-serif" }}>{eyebrow}</span>
      </div>
      <h2 className="font-black leading-tight"
        style={{ fontFamily:"'Poppins',sans-serif", fontSize:"clamp(2rem,4vw,3.2rem)", color: dark ? "white" : "#2d0a18" }}>
        {title}
      </h2>
      {subtitle && <p className="mt-4 max-w-lg mx-auto text-sm leading-relaxed"
        style={{ fontFamily:"'Poppins',sans-serif", color: dark ? "rgba(255,255,255,0.7)" : "#9b4f6e" }}>{subtitle}</p>}
    </Reveal>
  );
}

/* ══════════════════════════════════════════════════════════════════════════ */
/*  ABOUT                                                                     */
/* ══════════════════════════════════════════════════════════════════════════ */
function About() {
  const feats = [
    { icon:"💎", t:"Premium Quality", d:"Produk berlisensi internasional untuk hasil terbaik dan tahan lama." },
    { icon:"🧼", t:"Hygiene First", d:"Sterilisasi penuh setiap alat untuk setiap klien tanpa pengecualian." },
    { icon:"🎨", t:"Custom Design", d:"Setiap desain dibuat eksklusif sesuai kepribadian dan keinginan kamu." },
    { icon:"✨", t:"Long Lasting", d:"Teknik aplikasi profesional yang menjamin ketahanan maksimal." },
  ];
  return (
    <Section id="about">
      <div className="grid md:grid-cols-2 gap-16 items-center">
        <Reveal direction="left">
          <SectionHead eyebrow="About Us" title={<>Di Mana Seni<br /><span style={{ color:"#e0337a" }}>Bertemu Keindahan</span></>}  />
          <p className="text-sm leading-relaxed mb-4" style={{ color:"#7a3050", fontFamily:"'Poppins',sans-serif" }}>
            Goddess Studio adalah nail art studio premium di Jakarta Timur yang hadir untuk merayakan keunikan setiap wanita. Kami percaya kuku yang indah bukan sekadar aksesori — ia adalah pernyataan diri.
          </p>
          <p className="text-sm leading-relaxed" style={{ color:"#9b6070", fontFamily:"'Poppins',sans-serif" }}>
            Dari french glam minimalis hingga 3D nail art yang paling intricate, setiap karya kami dieksekusi dengan presisi tinggi dan penuh dedikasi.
          </p>
          <div className="mt-10 grid grid-cols-3 gap-6">
            {[["500+","Happy Clients"],["3+","Tahun"],["100%","Handcrafted"]].map(([n,l]) => (
              <div key={l} className="p-4 rounded-2xl text-center"
                style={{ background:"rgba(224,51,122,0.08)", border:"1px solid rgba(224,51,122,0.15)" }}>
                <p className="font-black text-2xl" style={{ color:"#e0337a", fontFamily:"'Poppins',sans-serif" }}>{n}</p>
                <p className="text-xs font-semibold tracking-widest uppercase mt-1" style={{ color:"#9b4f6e", fontFamily:"'Poppins',sans-serif" }}>{l}</p>
              </div>
            ))}
          </div>
        </Reveal>
        <div className="grid grid-cols-2 gap-4">
          {feats.map((f, i) => (
            <Reveal key={f.t} delay={i * 100} direction="up">
              <div className="group p-6 rounded-3xl transition-all duration-400 hover:-translate-y-2 hover:shadow-2xl cursor-default"
                style={{ background:"rgba(255,255,255,0.7)", backdropFilter:"blur(12px)", border:"1px solid rgba(255,100,170,0.2)", boxShadow:"0 4px 24px rgba(224,51,122,0.08)" }}>
                <span className="text-3xl mb-4 block">{f.icon}</span>
                <h3 className="font-bold text-sm mb-2" style={{ color:"#2d0a18", fontFamily:"'Poppins',sans-serif" }}>{f.t}</h3>
                <p className="text-xs leading-relaxed" style={{ color:"#9b6070", fontFamily:"'Poppins',sans-serif" }}>{f.d}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </Section>
  );
}

/* ══════════════════════════════════════════════════════════════════════════ */
/*  VISION & MISSION                                                          */
/* ══════════════════════════════════════════════════════════════════════════ */
function VisionMission() {
  return (
    <Section dark>
      <SectionHead dark eyebrow="Our Purpose" title={<>Visi & <span style={{ WebkitTextStroke:"2px white", color:"transparent" }}>Misi</span></>} />
      <div className="grid md:grid-cols-2 gap-8">
        <Reveal delay={100} direction="left">
          <div className="p-10 rounded-3xl h-full transition-all duration-400 hover:-translate-y-2"
            style={{ background:"rgba(255,255,255,0.12)", backdropFilter:"blur(16px)", border:"1px solid rgba(255,255,255,0.25)" }}>
            <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6 text-3xl"
              style={{ background:"rgba(255,255,255,0.15)" }}>👁</div>
            <h3 className="text-white font-black text-xl mb-4" style={{ fontFamily:"'Poppins',sans-serif" }}>Visi Kami</h3>
            <p className="text-white/75 text-sm leading-relaxed" style={{ fontFamily:"'Poppins',sans-serif" }}>
              Menjadi studio nail art terdepan di Jakarta yang dikenal sebagai destinasi perawatan kuku premium — di mana setiap wanita merasa seperti seorang dewi: berdaya, indah, dan penuh kepercayaan diri.
            </p>
          </div>
        </Reveal>
        <Reveal delay={200} direction="right">
          <div className="p-10 rounded-3xl h-full transition-all duration-400 hover:-translate-y-2"
            style={{ background:"rgba(255,255,255,0.12)", backdropFilter:"blur(16px)", border:"1px solid rgba(255,255,255,0.25)" }}>
            <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6 text-3xl"
              style={{ background:"rgba(255,255,255,0.15)" }}>✦</div>
            <h3 className="text-white font-black text-xl mb-4" style={{ fontFamily:"'Poppins',sans-serif" }}>Misi Kami</h3>
            <ul className="space-y-4">
              {[
                "Menghadirkan nail art berkualitas tinggi dengan standar kebersihan internasional.",
                "Menginspirasi ekspresi diri melalui seni kuku yang personal dan bermakna.",
                "Memberikan pengalaman nyaman, eksklusif, dan berkesan bagi setiap klien.",
              ].map(m => (
                <li key={m} className="flex items-start gap-3 text-white/75 text-sm" style={{ fontFamily:"'Poppins',sans-serif" }}>
                  <span className="mt-0.5 flex-shrink-0 text-pink-200 font-bold">◆</span>
                  <span className="leading-relaxed">{m}</span>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}

/* ══════════════════════════════════════════════════════════════════════════ */
/*  SERVICES                                                                  */
/* ══════════════════════════════════════════════════════════════════════════ */
function Services() {
  return (
    <Section id="services">
      <SectionHead eyebrow="How We Serve" title={<>Layanan <span style={{ color:"#e0337a" }}>Kami</span></>}
        subtitle="Kami hadir sesuai kenyamanan kamu — di studionya atau langsung ke tempatmu." />
      <div className="grid md:grid-cols-2 gap-8 max-w-3xl mx-auto">
        {[
          {
            delay: 100, dir: "left" as const,
            accent: "linear-gradient(135deg,#ff4da6,#e0337a)",
            icon: "🏠", label: "Home Service",
            desc: "Kami datang langsung ke lokasi kamu. Nikmati nail art premium dari kenyamanan rumah, kantor, atau venue pilihan kamu.",
            perks: ["Teknisi berpengalaman ke lokasi kamu","Peralatan lengkap & steril dibawa langsung","Jadwal fleksibel sesuai kebutuhanmu"],
            cta: "Book via WhatsApp", ctaHref: "https://wa.me/62895321403850",
            ctaBg: "linear-gradient(135deg,#ff4da6,#e0337a)",
          },
          {
            delay: 200, dir: "right" as const,
            accent: "linear-gradient(135deg,#ffb347,#e8855a)",
            icon: "✨", label: "Visit to Studio",
            desc: "Kunjungi studio cozy kami di Jakarta Timur. Rasakan suasana eksklusif dengan fasilitas lengkap dan ambiance yang memanjakan.",
            perks: ["Atmosfer studio yang premium & cozy","Pilihan desain paling lengkap tersedia","Jl. Duri Bulan No.73, Kramat Jati"],
            cta: "Lihat di Google Maps", ctaHref: "https://www.google.com/maps/place/Goddess+Studio/@-6.2789405,106.8573573,17z/data=!3m1!4b1!4m6!3m5!1s0x2e69f30013d0c23b:0x9924d156c7f7de95!8m2!3d-6.2789405!4d106.8599322!16s%2Fg%2F11zbsskxnj",
            ctaBg: "linear-gradient(135deg,#ffb347,#e8855a)",
          },
        ].map(s => (
          <Reveal key={s.label} delay={s.delay} direction={s.dir}>
            <div className="group rounded-3xl overflow-hidden flex flex-col transition-all duration-500 hover:-translate-y-3 hover:shadow-2xl"
              style={{ background:"rgba(255,255,255,0.75)", backdropFilter:"blur(16px)", border:"1px solid rgba(255,100,170,0.2)", boxShadow:"0 8px 40px rgba(224,51,122,0.1)" }}>
              <div className="h-2 w-full" style={{ background: s.accent }} />
              <div className="p-10 flex flex-col flex-1">
                <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl mb-6 group-hover:scale-110 transition-transform duration-300"
                  style={{ background:"rgba(224,51,122,0.08)" }}>{s.icon}</div>
                <h3 className="font-black text-xl mb-3" style={{ color:"#2d0a18", fontFamily:"'Poppins',sans-serif" }}>{s.label}</h3>
                <p className="text-sm leading-relaxed mb-6 flex-1" style={{ color:"#9b6070", fontFamily:"'Poppins',sans-serif" }}>{s.desc}</p>
                <ul className="space-y-2 mb-8">
                  {s.perks.map(p => (
                    <li key={p} className="flex items-center gap-2 text-xs" style={{ color:"#7a3050", fontFamily:"'Poppins',sans-serif" }}>
                      <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background:"#e0337a" }} />
                      {p}
                    </li>
                  ))}
                </ul>
                <a href={s.ctaHref} target="_blank" rel="noreferrer"
                  className="flex items-center justify-center gap-2 py-4 rounded-2xl text-white text-sm font-bold tracking-[0.15em] uppercase transition-all duration-200 hover:scale-[1.02] hover:shadow-lg"
                  style={{ background: s.ctaBg, fontFamily:"'Poppins',sans-serif", boxShadow:`0 6px 24px rgba(224,51,122,0.3)` }}>
                  {s.cta}
                </a>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}

/* ══════════════════════════════════════════════════════════════════════════ */
/*  PORTFOLIO                                                                 */
/* ══════════════════════════════════════════════════════════════════════════ */
function Portfolio() {
  // Dummy nail art images from Unsplash (free, no auth needed)
  const items = [
    {
      img: "/Portofolio/Nailart 1.jpg",
      label: "French Glam",
      tag: "Classic",
    },
    {
      img: "/Portofolio/Nailart 2.jpg",
      label: "3D Florals",
      tag: "Artistic",
    },
    {
      img: "/Portofolio/nailart 3.jpg",
      label: "Nude Ombré",
      tag: "Elegant",
    },
    {
      img: "/Portofolio/Nailart 4.jpg",
      label: "Gold Chrome",
      tag: "Luxury",
    },
    {
      img: "/Portofolio/Nailart 5.jpg",
      label: "Gel Extension",
      tag: "Premium",
    },
    {
      img: "/Portofolio/Nailart 6.jpg",         
      label: "Abstract Art",
      tag: "Creative",
    },
  ];

  // Fallback gradient per card if image fails to load
  const fallbacks = [
    "linear-gradient(135deg,#ff4da6,#ffb3d1)",
    "linear-gradient(135deg,#e0337a,#ff85b3)",
    "linear-gradient(135deg,#ffb347,#ff8c94)",
    "linear-gradient(135deg,#ff4da6,#c0336e)",
    "linear-gradient(135deg,#d63384,#ff85b3)",
    "linear-gradient(135deg,#ff85b3,#ffcc44)",
  ];

  return (
    <Section id="portfolio" dark>
      <SectionHead dark eyebrow="Our Work" title="Portfolio" subtitle="Setiap karya adalah ekspresi unik — dibuat khusus untuk setiap klien kami." />
      <div className="grid grid-cols-2 md:grid-cols-3 gap-5">
        {items.map((p, i) => (
          <Reveal key={p.label} delay={i * 80} direction="up">
            <div
              className="group relative rounded-3xl overflow-hidden cursor-pointer transition-all duration-400 hover:-translate-y-2 hover:shadow-2xl"
              style={{ aspectRatio: "1/1", background: fallbacks[i], boxShadow: "0 8px 32px rgba(0,0,0,0.25)" }}
            >
              {/* Image */}
              <img
                src={p.img}
                alt={p.label}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
              />
              {/* Bottom gradient overlay — always visible */}
              <div
                className="absolute inset-0"
                style={{ background: "linear-gradient(to top, rgba(0,0,0,0.55) 0%, transparent 55%)" }}
              />
              {/* Tag top-left */}
              <div className="absolute top-3 left-3">
                <span
                  className="px-2.5 py-1 rounded-full text-white text-[10px] font-bold tracking-widest uppercase"
                  style={{ background: "rgba(255,77,166,0.75)", backdropFilter: "blur(6px)", fontFamily: "'Poppins',sans-serif" }}
                >
                  {p.tag}
                </span>
              </div>
              {/* Sparkle top-right */}
              <SparkSVG className="absolute top-3 right-3 w-4 h-4 text-white/50" />
              {/* Label bottom */}
              <div className="absolute bottom-0 left-0 right-0 px-4 py-4">
                <p
                  className="text-white font-black text-sm tracking-wide"
                  style={{ fontFamily: "'Poppins',sans-serif", textShadow: "0 1px 6px rgba(0,0,0,0.4)" }}
                >
                  {p.label}
                </p>
              </div>
              {/* Hover overlay */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center"
                style={{ background: "rgba(224,51,122,0.25)", backdropFilter: "blur(1px)" }}
              >
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center"
                  style={{ background: "rgba(255,255,255,0.25)", backdropFilter: "blur(8px)", border: "1.5px solid rgba(255,255,255,0.5)" }}
                >
                  <SparkSVG className="w-5 h-5 text-white" />
                </div>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
      <Reveal delay={400} className="text-center mt-12">
        <a
          href="https://www.instagram.com/goddessstudiooo/"
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-3 px-8 py-3 rounded-full text-white text-sm font-bold tracking-[0.2em] uppercase transition-all duration-200 hover:scale-105"
          style={{ background: "rgba(255,255,255,0.15)", border: "1px solid rgba(255,255,255,0.35)", fontFamily: "'Poppins',sans-serif" }}
        >
          <svg className="w-4 h-4 fill-white" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
          @goddessstudiooo
        </a>
      </Reveal>
    </Section>
  );
}

/* ══════════════════════════════════════════════════════════════════════════ */
/*  FEEDBACK                                                                  */
/* ══════════════════════════════════════════════════════════════════════════ */
function Feedback() {
  const [form, setForm] = useState({
    name: "",
    message: "",
  });

  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const handle = async () => {
    if (!form.name || !form.message) return;

    setLoading(true);

    try {
      await fetch(
        "https://script.google.com/macros/s/AKfycbza7GYgNP-UNTDWWxcmSJVM_nYazJfT_LdAgybiOE2UbZLT6mF-H6_QssXDh8IYoaVR/exec",
        {
          method: "POST",
          mode: "no-cors",
          headers: {
            "Content-Type": "text/plain;charset=utf-8",
          },
          body: JSON.stringify({
            name: form.name,
            message: form.message,
          }),
        }
      );

      setSent(true);

      const currentName = form.name;

      setForm({
        name: "",
        message: "",
      });

      setTimeout(() => {
        setSent(false);
      }, 3500);

    } catch (error) {
      console.error("Feedback Error:", error);
      alert("Gagal mengirim feedback.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Section id="feedback">
      <div className="max-w-2xl mx-auto">
        <SectionHead
          eyebrow="We Listen"
          title={
            <>
              Feedback &{" "}
              <span style={{ color: "#e0337a" }}>
                Saran
              </span>
            </>
          }
          subtitle="Pendapatmu sangat berarti. Mari bersama-sama kita tumbuh lebih baik."
        />

        <Reveal delay={150}>
          <div
            className="p-10 rounded-3xl"
            style={{
              background: "rgba(255,255,255,0.7)",
              backdropFilter: "blur(16px)",
              border: "1px solid rgba(255,100,170,0.2)",
              boxShadow: "0 16px 64px rgba(224,51,122,0.1)",
            }}
          >
            {sent ? (
              <div className="text-center py-8">
                <div
                  className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 text-4xl"
                  style={{
                    background: "rgba(224,51,122,0.1)",
                  }}
                >
                  ✦
                </div>

                <h3
                  className="font-black text-xl mb-2"
                  style={{
                    color: "#2d0a18",
                    fontFamily: "'Poppins',sans-serif",
                  }}
                >
                  Terima kasih!
                </h3>

                <p
                  className="text-sm"
                  style={{
                    color: "#9b6070",
                    fontFamily: "'Poppins',sans-serif",
                  }}
                >
                  Masukan kamu telah kami terima.
                  Kami akan terus meningkatkan kualitas layanan.
                </p>
              </div>
            ) : (
              <div className="space-y-5">
                <div>
                  <label
                    className="block text-xs font-bold tracking-[0.2em] uppercase mb-2"
                    style={{
                      color: "#9b4f6e",
                      fontFamily: "'Poppins',sans-serif",
                    }}
                  >
                    Nama
                  </label>

                  <input
                    type="text"
                    value={form.name}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        name: e.target.value,
                      })
                    }
                    placeholder="Nama kamu..."
                    className="w-full px-5 py-4 rounded-2xl text-sm outline-none transition-all duration-200"
                    style={{
                      background: "rgba(255,240,245,0.8)",
                      border: "1.5px solid rgba(224,51,122,0.2)",
                      color: "#2d0a18",
                      fontFamily: "'Poppins',sans-serif",
                    }}
                  />
                </div>

                <div>
                  <label
                    className="block text-xs font-bold tracking-[0.2em] uppercase mb-2"
                    style={{
                      color: "#9b4f6e",
                      fontFamily: "'Poppins',sans-serif",
                    }}
                  >
                    Pesan / Saran
                  </label>

                  <textarea
                    rows={5}
                    value={form.message}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        message: e.target.value,
                      })
                    }
                    placeholder="Tulis pesan atau saranmu di sini..."
                    className="w-full px-5 py-4 rounded-2xl text-sm resize-none outline-none transition-all duration-200"
                    style={{
                      background: "rgba(255,240,245,0.8)",
                      border: "1.5px solid rgba(224,51,122,0.2)",
                      color: "#2d0a18",
                      fontFamily: "'Poppins',sans-serif",
                    }}
                  />
                </div>

                <button
                  onClick={handle}
                  disabled={
                    loading ||
                    !form.name ||
                    !form.message
                  }
                  className="w-full py-4 rounded-2xl text-white text-sm font-bold tracking-[0.2em] uppercase transition-all duration-200 hover:scale-[1.01] hover:shadow-xl disabled:opacity-40"
                  style={{
                    background:
                      "linear-gradient(135deg,#ff4da6,#e0337a)",
                    fontFamily:
                      "'Poppins',sans-serif",
                    boxShadow:
                      "0 6px 24px rgba(224,51,122,0.35)",
                  }}
                >
                  {loading
                    ? "Mengirim..."
                    : "Kirim Pesan ✦"}
                </button>
              </div>
            )}
          </div>
        </Reveal>
      </div>
    </Section>
  );
}

/* ══════════════════════════════════════════════════════════════════════════ */
/*  CONTACT / CTA                                                             */
/* ══════════════════════════════════════════════════════════════════════════ */
function Contact() {
  const socials = [
    { label:"WhatsApp", href:"https://wa.me/62895321403850", bg:"#25d366",
      icon:<svg className="w-5 h-5 fill-white" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z"/></svg> },
    { label:"Gmail", href:"mailto:studiogoddes99@gmail.com", bg:"#ea4335",
      icon:<svg className="w-5 h-5 fill-white" viewBox="0 0 24 24"><path d="M24 5.457v13.909c0 .904-.732 1.636-1.636 1.636h-3.819V11.73L12 16.64l-6.545-4.91v9.273H1.636A1.636 1.636 0 0 1 0 19.366V5.457c0-2.023 2.309-3.178 3.927-1.964L5.455 4.64 12 9.548l6.545-4.91 1.528-1.145C21.69 2.28 24 3.434 24 5.457z"/></svg> },
    { label:"Instagram", href:"https://www.instagram.com/goddessstudiooo/", bg:"linear-gradient(45deg,#f09433,#e6683c,#dc2743,#cc2366,#bc1888)",
      icon:<svg className="w-5 h-5 fill-white" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg> },
    { label:"TikTok", href:"https://www.tiktok.com/@goddessnailzzz_", bg:"#010101",
      icon:<svg className="w-5 h-5 fill-white" viewBox="0 0 24 24"><path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/></svg> },
  ];

  return (
    <Section id="contact" dark>
      <div className="text-center">
        <Reveal>
          <SparkSVG className="w-8 h-8 text-white/50 mx-auto mb-6" />
          <h2 className="font-black text-white leading-tight mb-6"
            style={{ fontFamily:"'Poppins',sans-serif", fontSize:"clamp(2.2rem,5vw,4.5rem)" }}>
            Siap Jadi<br />
            <span style={{ WebkitTextStroke:"2px rgba(255,255,255,0.8)", color:"transparent" }}>Goddess</span>
            {" "}Berikutnya?
          </h2>
          <p className="text-white/70 text-base mb-12 max-w-md mx-auto" style={{ fontFamily:"'Poppins',sans-serif" }}>
            Reservasi sekarang dan biarkan kami mengubah kuku kamu menjadi karya seni yang berbicara.
          </p>
        </Reveal>

        <Reveal delay={150}>
          <a href="https://wa.me/62895321403850" target="_blank" rel="noreferrer"
            className="group inline-flex items-center gap-4 px-12 py-5 rounded-full text-white font-black text-base tracking-[0.15em] uppercase transition-all duration-300 hover:scale-105 hover:shadow-2xl mb-16"
            style={{ background:"rgba(255,255,255,0.2)", backdropFilter:"blur(12px)", border:"2px solid rgba(255,255,255,0.5)", fontFamily:"'Poppins',sans-serif", boxShadow:"0 8px 40px rgba(0,0,0,0.2)" }}>
            <svg className="w-6 h-6 fill-white" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z"/></svg>
            Book via WhatsApp
            <span className="group-hover:translate-x-1 transition-transform">→</span>
          </a>
        </Reveal>

        <Reveal delay={250}>
          <div className="flex flex-wrap justify-center gap-4 mb-16">
            {socials.map(s => (
              <a key={s.label} href={s.href} target="_blank" rel="noreferrer"
                className="flex items-center gap-2.5 px-6 py-3 rounded-full text-white text-sm font-bold tracking-wide transition-all duration-200 hover:scale-105 hover:shadow-lg"
                style={{ background: s.bg, fontFamily:"'Poppins',sans-serif" }}>
                {s.icon} {s.label}
              </a>
            ))}
          </div>
        </Reveal>

        <Reveal delay={350}>
          <div className="pt-10" style={{ borderTop:"1px solid rgba(255,255,255,0.15)" }}>
            <p className="text-white/60 text-xs mb-2" style={{ fontFamily:"'Poppins',sans-serif" }}>
              Jl. Duri Bulan No.73, RT.8/RW.4, Batu Ampar, Kec. Kramat Jati, Jakarta Timur 13520
            </p>
            <p className="text-white/30 text-xs" style={{ fontFamily:"'Poppins',sans-serif" }}>
              © {new Date().getFullYear()} Goddess Studio Nailart. All rights reserved.
            </p>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}

/* ── Floating WA ──────────────────────────────────────────────────────────── */
function FloatingWA() {
  return (
    <a href="https://wa.me/62895321403850" target="_blank" rel="noreferrer" aria-label="Chat WhatsApp"
      className="fixed bottom-8 right-6 z-50 w-14 h-14 rounded-full flex items-center justify-center text-white shadow-xl transition-all duration-300 hover:scale-110 hover:shadow-2xl"
      style={{ background:"linear-gradient(135deg,#25d366,#128c7e)", boxShadow:"0 8px 32px rgba(37,211,102,0.45)" }}>
      <svg className="w-7 h-7 fill-white" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z"/></svg>
    </a>
  );
}

/* ══════════════════════════════════════════════════════════════════════════ */
/*  PAGE                                                                      */
/* ══════════════════════════════════════════════════════════════════════════ */
export default function Page() {
  return (
    <>
      <FontLoader />
      <Navbar />
      <main>
        <Hero />
        <About />
        <VisionMission />
        <Services />
        <Portfolio />
        <Feedback />
        <Contact />
      </main>
      <FloatingWA />
    </>
  );
}