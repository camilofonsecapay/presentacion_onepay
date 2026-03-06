import { useState, useEffect, useRef } from "react";

/* ═════════════════════════════════════════════════════════════
   OnePay ISP Sales Presentation — Feb 2026
   Pure React, no external deps beyond what artifact supports
   ═════════════════════════════════════════════════════════════ */

const C = {
  p950: "#090C1C", p900: "#0D122C", p800: "#141C43",
  a500: "#6366F1", a400: "#A78BFA", a300: "#C4B5FD", a200: "#DDD6FE", a50: "#F5F3FF",
  b500: "#3B82F6", b400: "#60A5FA",
  s500: "#22C55E", s400: "#4ADE80", s50: "#F0FDF4",
  w500: "#F59E0B", w400: "#FBBF24",
  e500: "#EF4444",
  g50: "#FAFAF8", g100: "#F5F5F3", g200: "#E8E8E4", g300: "#D4D4CF",
  g400: "#A3A39E", g500: "#6B6B6B", g600: "#525252", g700: "#3D3D3D", g900: "#171717",
};

const dot = (n) => Math.round(n).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const LOGO = (p) => {
  const c = p.color || "white";
  const h = p.h || 24;
  return (
    <svg height={h} viewBox="0 0 463 200" fill="none">
      <path fillRule="evenodd" clipRule="evenodd" d="M62.64 126.47c4.78 2.7 10.12 4.05 16.04 4.05 5.99 0 11.38-1.35 16.15-4.05 4.66-2.59 8.55-6.36 11.26-10.92 2.81-4.58 4.21-9.73 4.21-15.43 0-5.71-1.4-10.85-4.21-15.43-2.73-4.65-6.52-8.33-11.37-11.04-4.78-2.7-10.12-4.05-16.04-4.05s-11.3 1.35-16.15 4.05c-4.7 2.63-8.62 6.43-11.37 11.04-2.73 4.58-4.1 9.73-4.1 15.43s1.4 10.86 4.21 15.43c2.78 4.55 6.7 8.31 11.37 10.92zm9.3-46.31a3.88 3.88 0 00-3.55 2.17c-.18.43-.27.89-.27 1.35v31.68c0 .93.37 1.81 1.04 2.49a3.88 3.88 0 002.51 1.03h14.22a3.88 3.88 0 002.51-1.03 3.51 3.51 0 001.04-2.49V83.68c0-.93-.37-1.81-1.04-2.49a3.88 3.88 0 00-2.51-1.03H71.94z" fill={c} />
      <path d="M114.31 129.61V70.73h15.49v4.86c4.45-3.99 9.95-5.99 16.5-5.99 4.6 0 8.63 1.02 12.1 3.05 3.49 1.9 6.35 4.76 8.25 8.25 1.96 3.47 2.94 7.53 2.94 12.2v36.5h-15.49V95.37c0-3.84-1.09-6.86-3.28-9.04-2.19-2.26-5.17-3.39-8.93-3.39-2.64 0-4.97.53-7.01 1.59-2.03.98-3.78 2.46-5.09 4.3v40.79h-15.49z" fill={c} />
      <path d="M204.69 130.63c-5.88 0-11.23-1.36-16.05-4.07-4.65-2.62-8.55-6.39-11.31-10.96-2.78-4.6-4.18-9.76-4.18-15.48s1.32-10.89 3.96-15.48c2.65-4.54 6.43-8.31 10.97-10.98 4.6-2.71 9.73-4.07 15.38-4.07s11.06 1.39 15.44 4.17c4.37 2.78 7.8 6.55 10.29 11.3 2.56 4.75 3.84 10.14 3.84 16.16v4.07h-43.65c.66 2.31 1.78 4.46 3.28 6.33 1.57 1.88 3.54 3.38 5.77 4.41 2.34 1.06 4.89 1.6 7.46 1.59 2.47.03 4.92-.39 7.24-1.24 2.14-.76 4.1-1.95 5.77-3.5l10.17 9.27c-3.62 2.94-7.35 5.09-11.19 6.44-3.77 1.35-8.03 2.03-12.78 2.03zm-15.94-36.39h28.61a14.63 14.63 0 00-2.94-6.1 12.78 12.78 0 00-4.97-4.17c-1.94-1.07-4.12-1.62-6.33-1.59-2.27-.03-4.52.47-6.56 1.47a12.78 12.78 0 00-4.97 4.17c-1.28 1.74-2.23 3.81-2.83 6.21z" fill={c} />
      <path d="M236.58 152.32V70.39h15.26v4.86c4.82-3.77 10.4-5.65 16.73-5.65 5.58 0 10.63 1.36 15.15 4.07 4.47 2.66 8.17 6.44 10.74 10.96 2.71 4.52 4.07 9.61 4.07 15.26 0 5.65-1.36 10.77-4.07 15.36-2.68 4.49-6.45 8.22-10.96 10.86-4.6 2.64-9.73 3.96-15.38 3.96-2.86.01-5.72-.37-8.48-1.13-2.68-.81-5.22-1.99-7.58-3.5v26.9h-15.49zm29.51-35.37c3.24 0 6.14-.75 8.71-2.26 2.58-1.45 4.72-3.55 6.22-6.1 1.51-2.56 2.26-5.46 2.26-8.7 0-3.24-.75-6.14-2.26-8.7a13.74 13.74 0 00-6.22-6.1c-2.56-1.51-5.46-2.26-8.71-2.26-2.71-.03-5.39.47-7.91 1.47-2.33.9-4.43 2.33-6.1 4.18v22.94c1.72 1.78 3.8 3.16 6.1 4.07 2.52.98 5.21 1.48 7.91 1.47z" fill={c} />
      <path d="M322.26 130.63c-4.22 0-7.95-.75-11.19-2.26-3.24-1.58-5.77-3.73-7.58-6.44-1.81-2.71-2.71-5.84-2.71-9.38 0-5.65 2.11-10.02 6.33-13.11 4.3-3.17 10.18-4.75 17.64-4.75 4.92-.03 9.82.77 14.47 2.37v-4.29c0-3.39-1.06-5.95-3.17-7.68-2.11-1.73-5.2-2.6-9.27-2.6-2.49 0-5.16.41-8.03 1.24-2.86.75-6.18 1.96-9.94 3.62l-5.65-11.41c4.67-2.11 9.12-3.69 13.34-4.75 4.22-1.05 8.54-1.58 12.89-1.59 7.92 0 14.06 1.92 18.43 5.77 4.45 3.77 6.67 9.11 6.67 16.05v38.2h-15.26v-4.18c-2.34 1.77-4.98 3.11-7.8 3.96-2.98.85-6.07 1.27-9.17 1.24zm-6.78-18.42c0 2.26.98 4.07 2.94 5.42 1.96 1.28 4.56 1.92 7.8 1.92 2.41.02 4.8-.28 7.12-.9 2.11-.64 4.1-1.63 5.88-2.94v-8.59a27.1 27.1 0 00-5.88-1.7c-2.17-.39-4.36-.58-6.56-.57-3.54 0-6.33.68-8.37 2.04-1.96 1.28-2.94 3.05-2.94 5.31z" fill={c} />
      <path d="M363.85 152.79c-1.32 0-2.64-.08-3.96-.23-1.02-.05-2.04-.17-3.05-.34V138.89c1.79.32 3.61.47 5.43.45 5.65 0 9.57-2.67 11.76-8.02l.9-2.26-22.95-59.45h17.07l14.7 40.12 16.62-40.12h16.73l-27.14 63.63c-2.03 4.75-4.26 8.55-6.67 11.41-2.41 2.86-5.2 4.93-8.37 6.22-3.09 1.28-6.78 1.92-11.08 1.92z" fill={c} />
    </svg>
  );
};

const ISOTIPO = (p) => {
  const fill = p.fill || "#fff";
  const s = p.size || 24;
  return (
    <svg width={s} height={s} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path fillRule="evenodd" clipRule="evenodd" d="M33.64 76.47c4.78 2.7 10.12 4.05 16.04 4.05 5.99 0 11.38-1.35 16.15-4.05 4.66-2.59 8.55-6.36 11.26-10.92 2.81-4.58 4.21-9.73 4.21-15.43 0-5.71-1.4-10.85-4.21-15.43-2.73-4.65-6.52-8.33-11.37-11.04-4.78-2.7-10.12-4.05-16.04-4.05s-11.3 1.35-16.15 4.05c-4.7 2.63-8.62 6.43-11.37 11.04-2.73 4.58-4.1 9.73-4.1 15.43s1.4 10.86 4.21 15.43c2.78 4.55 6.7 8.31 11.37 10.92zm9.3-46.31a3.88 3.88 0 00-3.55 2.17c-.18.43-.27.89-.27 1.35v31.68c0 .93.37 1.81 1.04 2.49a3.88 3.88 0 002.51 1.03h14.22a3.88 3.88 0 002.51-1.03 3.51 3.51 0 001.04-2.49V83.68c0-.93-.37-1.81-1.04-2.49a3.88 3.88 0 00-2.51-1.03H71.94z" fill={fill} />
    </svg>
  );
};

/* ─── Logo Marquee ─── */
const LOGOS = [
  { src: "/logos/epm.webp", alt: "EPM" },
  { src: "/logos/movistar.png", alt: "Movistar" },
  { src: "/logos/gdo2.png", alt: "GdO" },
  { src: "/logos/surtigas.png", alt: "Surtigas" },
  { src: "/logos/cobelen.png", alt: "Cobelen" },
  { src: "/logos/ceo.png", alt: "CEO" },
];

const ISP_LOGOS = [
  { src: "/logos/isp/linage.png", alt: "Linage Comunicaciones" },
  { src: "/logos/isp/tunortetv.jpg", alt: "Tu Norte TV" },
  { src: "/logos/isp/velonet.svg", alt: "Velonet" },
  { src: "/logos/isp/wifimax.jpg", alt: "Wifimax" },
  { src: "/logos/isp/supercable.png", alt: "Supercable" },
  { src: "/logos/isp/legon.png", alt: "Legon Telecomunicaciones" },
  { src: "/logos/isp/fiesta.svg", alt: "Conéctate - Fiesta Telecomunicaciones" },
  { src: "/logos/isp/cableexito.png", alt: "Cable Éxito" },
  { src: "/logos/isp/ultranet.png", alt: "Ultranet Colombia" },
  { src: "/logos/isp/wisp.webp", alt: "WISP Telecomunicaciones" },
  { src: "/logos/isp/asonet.png", alt: "Asonet Colombia" },
  { src: "/logos/isp/holainternet.svg", alt: "Hola Internet" },
  { src: "/logos/isp/clickhd.png", alt: "Click HD" },
  { src: "/logos/isp/puntored.png", alt: "Puntored Telecomunicaciones" },
  { src: "/logos/isp/intv.webp", alt: "INTV Internet y Televisión" },
  { src: "/logos/isp/conectic.png", alt: "Conectic" },
  { src: "/logos/isp/one.png", alt: "One Telecomunicaciones" },
  { src: "/logos/isp/siinternet.png", alt: "Siinternet" },
  { src: "/logos/isp/vivetel.svg", alt: "Vivetel" },
];

const marqueeCSS = `@keyframes marquee{0%{transform:translateX(0)}100%{transform:translateX(-50%)}}`;
const ispHoverCSS = `.isp-logo{filter:brightness(0) invert(1);opacity:0.4;transition:filter .3s,opacity .3s}.isp-logo:hover{filter:none;opacity:1}`;

function ISPLogoMarquee() {
  const logoGap = 56;
  const all = [...ISP_LOGOS, ...ISP_LOGOS];
  return (
    <div style={{ marginTop: 64, marginBottom: 32 }}>
      <span style={{ fontSize: 10, color: C.g500, textTransform: "uppercase", letterSpacing: ".06em", display: "block", marginBottom: 16 }}>ISPs que confían en OnePay</span>
      <style>{marqueeCSS}{ispHoverCSS}</style>
      <div style={{ overflow: "hidden", maskImage: "linear-gradient(90deg, transparent, #000 6%, #000 94%, transparent)", WebkitMaskImage: "linear-gradient(90deg, transparent, #000 6%, #000 94%, transparent)" }}>
        <div style={{ display: "flex", alignItems: "center", width: "max-content", animation: "marquee 35s linear infinite" }}>
          {all.map((l, i) => (
            <div key={i} style={{ display: "flex", alignItems: "center", justifyContent: "center", height: 40, flexShrink: 0, marginRight: logoGap }}>
              <img className="isp-logo" src={l.src} alt={l.alt} title={l.alt} style={{ height: 28, width: "auto", maxWidth: 120, objectFit: "contain" }} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function LogoMarquee() {
  const logoGap = 48;
  const all = [...LOGOS, ...LOGOS];
  return (
    <div style={{ marginTop: 40 }}>
      <span style={{ fontSize: 10, color: C.g500, textTransform: "uppercase", letterSpacing: ".06em", display: "block", marginBottom: 16 }}>Corporativos que confían en Onepay</span>
      <style>{marqueeCSS}</style>
      <div style={{ overflow: "hidden", maskImage: "linear-gradient(90deg, transparent, #000 6%, #000 94%, transparent)", WebkitMaskImage: "linear-gradient(90deg, transparent, #000 6%, #000 94%, transparent)" }}>
        <div style={{ display: "flex", alignItems: "center", width: "max-content", animation: "marquee 25s linear infinite" }}>
          {all.map((l, i) => (
            <div key={i} style={{ display: "flex", alignItems: "center", justifyContent: "center", height: 32, flexShrink: 0, marginRight: logoGap }}>
              <img src={l.src} alt={l.alt} style={{ height: 22, width: "auto", maxWidth: 110, objectFit: "contain", filter: "brightness(0) invert(1)", opacity: 0.5 }} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ─── Hooks ─── */
function useVis(t) {
  const r = useRef(null);
  const [v, sv] = useState(false);
  useEffect(() => {
    const el = r.current;
    if (!el) return;
    const ob = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { sv(true); ob.disconnect(); } },
      { threshold: t || 0.1 }
    );
    ob.observe(el);
    return () => ob.disconnect();
  }, []);
  return [r, v];
}

function useNum(end, dur, on) {
  const [v, sv] = useState(0);
  useEffect(() => {
    if (!on) return;
    let s = null;
    const go = (t) => {
      if (!s) s = t;
      const p = Math.min((t - s) / (dur || 2000), 1);
      sv(end * (1 - Math.pow(1 - p, 3)));
      if (p < 1) requestAnimationFrame(go);
    };
    requestAnimationFrame(go);
  }, [on, end]);
  return v;
}

/* ─── Primitives ─── */
function Fade(p) {
  const [r, v] = useVis();
  const d = { up: "translateY(32px)", left: "translateX(40px)", right: "translateX(-40px)" };
  const dl = p.delay || 0;
  return (
    <div ref={r} style={{
      ...p.style,
      opacity: v ? 1 : 0,
      transform: v ? "none" : (d[p.dir || "up"]),
      transition: "opacity .8s cubic-bezier(.16,1,.3,1) " + dl + "s, transform .8s cubic-bezier(.16,1,.3,1) " + dl + "s"
    }}>
      {p.children}
    </div>
  );
}

function Num(p) {
  const [r, v] = useVis();
  const n = useNum(p.value, 2000, v);
  const show = p.fmt ? dot(n) : (p.dec ? n.toFixed(p.dec) : Math.round(n));
  return <span ref={r}>{p.pre || ""}{show}{p.suf || ""}</span>;
}

function Tag(p) {
  const dk = p.dark;
  return (
    <span style={{
      display: "inline-block", padding: "5px 14px", borderRadius: 100,
      fontSize: 11, fontWeight: 600, letterSpacing: ".05em", textTransform: "uppercase",
      background: dk ? "rgba(99,102,241,.1)" : C.a50,
      color: dk ? C.a400 : C.a500,
      border: "1px solid " + (dk ? "rgba(99,102,241,.16)" : C.a200)
    }}>
      {p.children}
    </span>
  );
}

function Box(p) {
  return (
    <section id={p.id} style={{
      position: "relative",
      background: p.dark ? C.p950 : (p.white ? "#fff" : C.g50),
      color: p.dark ? "#fff" : C.g900,
      padding: "clamp(56px,9vw,110px) clamp(20px,5vw,72px)",
      overflow: "hidden",
      ...p.style
    }}>
      {p.dark && (
        <div style={{
          position: "absolute", inset: 0, opacity: .22,
          backgroundImage: "radial-gradient(circle at 1px 1px, rgba(99,102,241,.1) 1px, transparent 0)",
          backgroundSize: "32px 32px"
        }} />
      )}
      <div style={{ position: "relative", maxWidth: 1160, margin: "0 auto", zIndex: 1 }}>
        {p.children}
      </div>
    </section>
  );
}

function Msg(p) {
  return (
    <div style={{ display: "flex", justifyContent: p.me ? "flex-end" : "flex-start", marginBottom: 5 }}>
      <div style={{
        maxWidth: "86%", padding: "9px 11px",
        borderRadius: p.me ? "13px 4px 13px 13px" : "4px 13px 13px 13px",
        background: p.me ? "#005c4b" : "rgba(255,255,255,.07)",
        fontSize: 13, lineHeight: 1.4, color: "#fff"
      }}>
        {p.text}{p.children}
        {p.t && <div style={{ textAlign: "right", fontSize: 10, color: "rgba(255,255,255,.3)", marginTop: 2 }}>{p.t}</div>}
      </div>
    </div>
  );
}

/* ════════════════════════════════════════════
   SECTIONS
   ════════════════════════════════════════════ */

function NavBar() {
  const [s, ss] = useState(false);
  useEffect(() => {
    const h = () => ss(window.scrollY > 50);
    window.addEventListener("scroll", h, { passive: true });
    return () => window.removeEventListener("scroll", h);
  }, []);
  return (
    <nav style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
      padding: "0 clamp(20px,5vw,56px)", height: 58,
      display: "flex", alignItems: "center", justifyContent: "space-between",
      background: s ? "rgba(9,12,28,.96)" : "transparent",
      backdropFilter: s ? "blur(20px)" : "none",
      borderBottom: s ? "1px solid rgba(99,102,241,.06)" : "none",
      transition: "all .4s"
    }}>
      <LOGO h={30} />
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <span style={{ fontSize: 10, color: C.g400, letterSpacing: ".06em", textTransform: "uppercase" }}>Recaudo Inteligente</span>
        <span style={{ padding: "3px 8px", borderRadius: 5, fontSize: 10, fontWeight: 700, background: "rgba(34,197,94,.1)", color: C.s400 }}>PCI DSS L1</span>
      </div>
    </nav>
  );
}

function Hero() {
  const [m, sm] = useState(false);
  const canvasRef = useRef(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  useEffect(() => { setTimeout(() => sm(true), 180); }, []);

  // Particle network animation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animId;
    let particles = [];
    const resize = () => { canvas.width = canvas.offsetWidth * 2; canvas.height = canvas.offsetHeight * 2; ctx.scale(2, 2); };
    resize();
    window.addEventListener('resize', resize);

    const N = 80;
    for (let i = 0; i < N; i++) {
      particles.push({
        x: Math.random() * canvas.offsetWidth,
        y: Math.random() * canvas.offsetHeight,
        vx: (Math.random() - .5) * .3,
        vy: (Math.random() - .5) * .3,
        r: Math.random() * 2 + 1,
        o: Math.random() * .3 + .1
      });
    }

    const draw = () => {
      ctx.clearRect(0, 0, canvas.offsetWidth, canvas.offsetHeight);
      const mx = mouseRef.current.x, my = mouseRef.current.y;
      particles.forEach(p => {
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0 || p.x > canvas.offsetWidth) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.offsetHeight) p.vy *= -1;
        // Mouse repel
        const dx = p.x - mx, dy = p.y - my, dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 120 && dist > 0) { p.x += dx / dist * .8; p.y += dy / dist * .8; }
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(99,102,241,' + p.o + ')';
        ctx.fill();
      });
      // Lines
      for (let i = 0; i < N; i++) {
        for (let j = i + 1; j < N; j++) {
          const dx = particles[i].x - particles[j].x, dy = particles[i].y - particles[j].y;
          const d = Math.sqrt(dx * dx + dy * dy);
          if (d < 140) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = 'rgba(99,102,241,' + (.08 * (1 - d / 140)) + ')';
            ctx.lineWidth = .5;
            ctx.stroke();
          }
        }
      }
      animId = requestAnimationFrame(draw);
    };
    draw();
    return () => { cancelAnimationFrame(animId); window.removeEventListener('resize', resize); };
  }, []);

  const a = (d) => ({
    opacity: m ? 1 : 0,
    transform: m ? "translateY(0)" : "translateY(26px)",
    transition: "all 1s cubic-bezier(.16,1,.3,1) " + d + "s"
  });
  const stats = [
    { v: 60, s: "+", l: "ISPs activas", sb: "con recaudo inteligente" },
    { v: 5.8, s: "d", l: "Días promedio", sb: "vs. 18 del mercado", d: 1 },
    { v: 93, s: "%", l: "Pagos exitosos", sb: "sin fricción" },
    { v: 15, s: "s", l: "Para pagar", sb: "4 clicks", p: "~" }
  ];
  return (
    <section
      onMouseMove={e => { const r = e.currentTarget.getBoundingClientRect(); mouseRef.current = { x: e.clientX - r.left, y: e.clientY - r.top }; }}
      style={{
        position: "relative", minHeight: "100vh", display: "flex", alignItems: "center",
        background: C.p950, color: "#fff", padding: "clamp(20px,5vw,72px)", overflow: "hidden"
      }}>
      <canvas ref={canvasRef} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", zIndex: 0 }} />
      <div style={{ position: "absolute", top: "-12%", right: "-6%", width: "50vw", height: "50vw", borderRadius: "50%", background: "radial-gradient(circle,rgba(99,102,241,.07) 0%,transparent 60%)", filter: "blur(50px)" }} />
      <div style={{ position: "absolute", bottom: "-8%", left: "-4%", width: "35vw", height: "35vw", borderRadius: "50%", background: "radial-gradient(circle,rgba(59,130,246,.05) 0%,transparent 60%)", filter: "blur(35px)" }} />

      <div style={{ position: "relative", maxWidth: 1160, margin: "0 auto", width: "100%", paddingTop: 76, zIndex: 1 }}>
        <div style={a(.25)}><Tag dark>ISPs</Tag></div>
        <h1 style={{ fontSize: "clamp(38px,7vw,76px)", fontWeight: 800, lineHeight: 1.03, letterSpacing: "-.04em", margin: "22px 0", maxWidth: 860, ...a(.45) }}>
          Tus usuarios te pagan en{" "}
          <span style={{ background: "linear-gradient(135deg," + C.a400 + "," + C.b400 + ")", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>5 días</span>, no en 25.
        </h1>
        <p style={{ fontSize: "clamp(16px,1.8vw,20px)", lineHeight: 1.6, color: C.g400, maxWidth: 580, margin: "0 0 44px", ...a(.65) }}>
          OnePay cobra por WhatsApp, concilia en tiempo real y te muestra cuánta plata te va a entrar esta semana.
        </p>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(136px,1fr))", gap: 1, background: "rgba(99,102,241,.05)", borderRadius: 16, overflow: "hidden", ...a(.85) }}>
          {stats.map((x, i) => (
            <div key={i} style={{ background: "rgba(9,12,28,.9)", padding: "clamp(14px,2.2vw,22px)" }}>
              <div style={{ fontSize: "clamp(22px,3vw,34px)", fontWeight: 800, letterSpacing: "-.02em" }}>
                <Num value={x.v} suf={x.s} pre={x.p} dec={x.d} />
              </div>
              <div style={{ fontSize: 12, fontWeight: 600, color: C.g300, marginTop: 2 }}>{x.l}</div>
              <div style={{ fontSize: 10, color: C.g500, marginTop: 1 }}>{x.sb}</div>
            </div>
          ))}
        </div>

        <div style={a(1.05)}>
          <LogoMarquee />
        </div>

        <div style={a(1.15)}>
          <ISPLogoMarquee />
        </div>
      </div>
    </section>
  );
}

function Problema() {
  const cards = [
    { t: "Lado empresa", ic: "\u{1F3E2}", c: C.e500, its: [["25-35%", "cartera vencida >30 días"], ["2-3", "personas dedicadas a cobrar"], ["$8-12M", "COP/mes en cobranza"], ["Día 18", "promedio para recibir pago"], ["500+", "llamadas manuales al mes"]], q: "\u201CLa plata está, pero no llega a tiempo.\u201D" },
    { t: "Lado usuario", ic: "\u{1F464}", c: C.b500, its: [["40%", "abandono en PSE"], ["17", "pasos para pagar por PSE"], ["20%", "apertura emails de cobro"], ["0", "apps quiere descargar"], ["3+", "intentos para pagar"]], q: "\u201CDoña Carmen no es morosa \u2014 pagar es difícil.\u201D" }
  ];
  return (
    <Box>
      <Fade>
        <Tag>El problema</Tag>
        <h2 style={{ fontSize: "clamp(26px,4.5vw,44px)", fontWeight: 800, letterSpacing: "-.03em", margin: "14px 0 10px", lineHeight: 1.08 }}>Tu equipo persigue pagos.<br />Tus usuarios quieren pagar fácil.</h2>
        <p style={{ fontSize: 16, color: C.g500, maxWidth: 540, lineHeight: 1.6, marginBottom: 40 }}>Nadie es moroso a propósito. Pagar es difícil, cobrar es lento, y el flujo de caja se asfixia.</p>
      </Fade>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))", gap: 16 }}>
        {cards.map((cd, ci) => (
          <Fade key={ci} delay={ci * .12}>
            <div style={{ background: "#fff", borderRadius: 18, padding: 28, border: "1px solid " + C.g200, height: "100%" }}>
              <span style={{ fontSize: 22 }}>{cd.ic}</span>
              <h3 style={{ fontSize: 19, fontWeight: 700, margin: "10px 0 14px" }}>{cd.t}</h3>
              {cd.its.map(([m, t], i) => (
                <div key={i} style={{ display: "flex", gap: 9, alignItems: "baseline", marginBottom: 9 }}>
                  <span style={{ fontSize: 14, fontWeight: 800, color: cd.c, minWidth: 56, flexShrink: 0 }}>{m}</span>
                  <span style={{ fontSize: 13, color: C.g600, lineHeight: 1.4 }}>{t}</span>
                </div>
              ))}
              <div style={{ marginTop: 16, padding: 12, borderRadius: 10, background: C.g50, fontStyle: "italic", fontSize: 13, color: C.g600, lineHeight: 1.5, borderLeft: "3px solid " + cd.c }}>{cd.q}</div>
            </div>
          </Fade>
        ))}
      </div>
    </Box>
  );
}

function Insight() {
  const [aq, saq] = useState(null);
  const [r, v] = useVis();
  useEffect(() => { if (!v) return; const t = [0, 1, 2, 3].map(i => setTimeout(() => saq(i), 500 + i * 450)); return () => t.forEach(clearTimeout); }, [v]);
  const qs = [
    { q: "\u00BFCon qué pagar?", w: "Pasarelas", i: "\u{1F4B3}", d: "Visa, MC, Nequi, Daviplata, PSE, Bre-B" },
    { q: "\u00BFCómo pagar?", w: "Checkouts", i: "\u{1F5A5}\uFE0F", d: "4 clicks, sin fricción, sin apps" },
    { q: "\u00BFDónde pagar?", w: "OnePay", i: "\u{1F4F1}", d: "WhatsApp \u2014 donde ya está el 98%" },
    { q: "\u00BFCómo hacer que pague?", w: "OnePay", i: "\u{1F9E0}", d: "Behavioral intelligence + timing" }
  ];
  return (
    <Box dark>
      <Fade>
        <Tag dark>El insight</Tag>
        <h2 style={{ fontSize: "clamp(26px,4.5vw,44px)", fontWeight: 800, letterSpacing: "-.03em", margin: "14px 0 10px", lineHeight: 1.08 }}>
          Para cobrar hay que resolver<br /><span style={{ color: C.a400 }}>cómo paga la gente</span>
        </h2>
        <p style={{ fontSize: 16, color: C.g400, maxWidth: 580, lineHeight: 1.6, marginBottom: 40 }}>La industria optimiza el cobro. Nadie optimiza el pago. OnePay hace las dos.</p>
      </Fade>
      <div ref={r} style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))", gap: 11 }}>
        {qs.map((q, i) => {
          const op = i >= 2;
          const act = aq !== null && aq >= i;
          return (
            <Fade key={i} delay={.06 * i}>
              <div style={{
                background: act ? (op ? "rgba(99,102,241,.1)" : "rgba(255,255,255,.05)") : "rgba(255,255,255,.02)",
                borderRadius: 14, padding: 20,
                border: "1px solid " + (act && op ? "rgba(99,102,241,.2)" : "rgba(255,255,255,.04)"),
                transition: "all .5s cubic-bezier(.16,1,.3,1)", opacity: act ? 1 : .3
              }}>
                <span style={{ fontSize: 22 }}>{q.i}</span>
                <div style={{ fontSize: 10, color: C.g500, textTransform: "uppercase", letterSpacing: ".05em", marginTop: 8 }}>Pregunta {i + 1}</div>
                <h3 style={{ fontSize: 16, fontWeight: 700, margin: "3px 0 5px", color: op ? C.a300 : "#fff" }}>{q.q}</h3>
                <p style={{ fontSize: 12, color: C.g400, lineHeight: 1.5, marginBottom: 8 }}>{q.d}</p>
                <span style={{ display: "inline-flex", padding: "2px 9px", borderRadius: 100, fontSize: 10, fontWeight: 600, background: op ? "rgba(99,102,241,.12)" : "rgba(255,255,255,.06)", color: op ? C.a300 : C.g400 }}>
                  {op ? "\u2605 OnePay" : q.w}
                </span>
              </div>
            </Fade>
          );
        })}
      </div>
    </Box>
  );
}

function Producto() {
  const [tab, sTab] = useState(0);
  // WhatsApp state
  const [wa, sWa] = useState(0); // 0=initial, 1=flow-detail, 2=flow-methods, 3=flow-done, 4=confirmed
  const [waPay, setWaPay] = useState(0);
  const waScrollRef = useRef(null);
  // Portal state
  const [pdStep, setPdStep] = useState(0); // 0=input, 1=deudas, 2=pago, 3=exito
  const [pdSel, setPdSel] = useState([true, true, false, true]);
  const [pdPay, setPdPay] = useState(0);
  const [pdRef, setPdRef] = useState("");
  const [pdErr, setPdErr] = useState(false);
  // Llamada state
  const [callStep, setCallStep] = useState(0);
  const [ct, sCt] = useState(0);
  const callRef = useRef(null);

  const deudas = [
    { desc: "Internet Hogar 100Mbps - Febrero", monto: 85000, ref: "FAC-2026-0218", fCreacion: "18 feb 2026", fVence: "5 mar 2026" },
    { desc: "Internet Hogar 100Mbps - Marzo", monto: 85000, ref: "FAC-2026-0305", fCreacion: "5 mar 2026", fVence: "20 mar 2026" },
    { desc: "Cargo reconexión", monto: 15000, ref: "", fCreacion: "1 mar 2026", fVence: "15 mar 2026" },
    { desc: "Upgrade velocidad Dic", monto: 25000, ref: "FAC-2025-1201", fCreacion: "1 dic 2025", fVence: "20 dic 2025" }
  ];
  const pdTotal = deudas.reduce((s, d, i) => s + (pdSel[i] ? d.monto : 0), 0);

  const callLines = [
    { who: "ai", text: "Hola, buenas tardes. Soy Ana, de FibraNet. ¿Hablo con el señor Carlos Martínez?" },
    { who: "user", text: "Sí, con él. ¿Qué necesita?" },
    { who: "ai", text: "Don Carlos, lo llamo porque tiene una factura de $85.000 de su plan de Internet Hogar que está vencida desde el 18 de febrero. Queríamos ayudarle a ponerse al día antes de que se genere algún inconveniente con el servicio." },
    { who: "user", text: "Ay sí, ya sé... es que este mes ha estado muy duro. La verdad no he podido pagar." },
    { who: "ai", text: "Lo entiendo, don Carlos, y por eso lo llamo. ¿Sabía que puede hacer un abono parcial para evitar el corte? Así no pierde la conexión y completa el resto cuando pueda." },
    { who: "user", text: "¿Y cuánto sería lo mínimo? Porque de verdad ando muy justo..." },
    { who: "ai", text: "Con que abone al menos la mitad, que serían $42.500, ya le cubriría para que no le corten. Y lo más fácil es que le mando un link a su WhatsApp ahora mismo y paga desde ahí, sin filas ni nada." },
    { who: "user", text: "¿Pero me queda debiendo el resto? ¿No me van a cobrar más?" },
    { who: "ai", text: "No señor, el saldo queda registrado y lo puede pagar cuando quiera. No se genera ningún cobro adicional. ¿Le envío el link entonces?" },
    { who: "user", text: "Bueno, mándelo. Voy a ver si pago ahorita por Nequi." },
    { who: "ai", text: "Perfecto don Carlos, ya le envié el link al WhatsApp. Ahí puede elegir Nequi o el medio que prefiera. Cualquier cosa me puede escribir por ahí mismo. ¡Que esté muy bien!" }
  ];

  useEffect(() => { sWa(0); setWaPay(0); setPdStep(0); setPdSel([true, true, false, true]); setPdPay(0); setPdRef(""); setPdErr(false); setCallStep(0); sCt(0); }, [tab]);

  // Call timer
  useEffect(() => {
    if (tab !== 2) return;
    const ti = setInterval(() => sCt(p => p + 1), 1000);
    return () => clearInterval(ti);
  }, [tab]);

  // Call conversation auto-advance
  useEffect(() => {
    if (tab !== 2) return;
    const timers = callLines.map((_, i) => setTimeout(() => setCallStep(i + 1), 2000 + i * 2800));
    return () => timers.forEach(clearTimeout);
  }, [tab]);

  // Auto-scroll
  useEffect(() => {
    if (waScrollRef.current) setTimeout(() => { if (waScrollRef.current) waScrollRef.current.scrollTop = waScrollRef.current.scrollHeight; }, 150);
  }, [wa]);
  useEffect(() => {
    if (callRef.current) setTimeout(() => { if (callRef.current) callRef.current.scrollTop = callRef.current.scrollHeight; }, 100);
  }, [callStep]);

  const fT = (s) => String(Math.floor(s / 60)).padStart(2, "0") + ":" + String(s % 60).padStart(2, "0");
  const tabs = ["\u{1F4F1} WhatsApp", "\u{1F5A5}\uFE0F Portal", "\u{1F4DE} Llamada IA"];
  const payMethodsReal = [
    { icon: "\u{1F4B3}", name: "Visa \u00B70193", sub: "Los pagos con tarjeta se aprueban inmediatamente." },
    { icon: "\u{1F3E6}", name: "PSE Bancolombia", sub: "Pagaste previamente con este método." },
    { icon: "\u{1F4F1}", name: "Nequi \u00B76819", sub: "Los pagos se aprueban inmediatamente." },
    { icon: "\u{1F4F1}", name: "Daviplata", sub: "Billetera digital" }
  ];
  const checks = {
    0: ["WhatsApp Flows nativo \u2014 sin salir de la app", "98% apertura vs 20% email", "~15 segundos para completar", "Todos los métodos de pago", "Recordatorios por comportamiento"],
    1: ["Consulta por referencia de pago", "Selecciona una, varias o todas las deudas", "Múltiples métodos de pago", "Historial completo sin contraseña"],
    2: ["Gestión de cartera vencida", "Cada empresa crea su propio agente IA", "Voz natural \u2014 indistinguible de una persona", "Manejo de objeciones en tiempo real", "Env\u00EDa link de pago durante la llamada", "Par\u00E1metros de entrenamiento autom\u00E1ticos"]
  };

  // WhatsApp Flow overlay component
  const FlowOverlay = () => {
    if (wa < 1 || wa > 3) return null;
    const flowPage = wa;
    const progressW = flowPage === 1 ? "33%" : flowPage === 2 ? "66%" : "100%";
    const progressColor = flowPage === 3 ? "#00a884" : "#00a884";
    return (
      <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, top: wa >= 1 ? "15%" : "100%", background: "#111b21", borderRadius: "16px 16px 0 0", zIndex: 10, display: "flex", flexDirection: "column", transition: "top .4s cubic-bezier(.16,1,.3,1)", boxShadow: "0 -8px 30px rgba(0,0,0,.5)" }}>
        {/* Flow header */}
        <div style={{ padding: "10px 14px", display: "flex", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid rgba(255,255,255,.06)", flexShrink: 0 }}>
          {flowPage > 1 && <span onClick={() => sWa(wa - 1)} style={{ fontSize: 16, color: "#fff", cursor: "pointer" }}>{"\u2190"}</span>}
          {flowPage === 1 && <span style={{ fontSize: 12, color: "#aaa" }}>Cancel</span>}
          <span style={{ fontSize: 13, fontWeight: 600, color: "#fff", flex: 1, textAlign: "center" }}>
            {flowPage === 1 ? "Detalle de tu pago" : flowPage === 2 ? "Tus método de pago" : "Completado"}
          </span>
          <span style={{ fontSize: 16, color: "#aaa" }}>{"\u22EF"}</span>
        </div>
        {/* Progress bar */}
        <div style={{ height: 3, background: "rgba(255,255,255,.08)", flexShrink: 0 }}>
          <div style={{ height: "100%", background: progressColor, width: progressW, transition: "width .4s ease", borderRadius: 2 }} />
        </div>
        {/* Flow content */}
        <div style={{ flex: 1, overflowY: "auto", padding: "16px 14px" }}>
          {flowPage === 1 && (
            <div>
              {/* Banner */}
              <div style={{ borderRadius: 10, padding: "14px 12px", background: "linear-gradient(135deg, #e8f5e9 0%, #f1f8e9 100%)", marginBottom: 16, position: "relative", overflow: "hidden" }}>
                <div style={{ fontSize: 13, fontWeight: 700, color: "#2e7d32" }}>Paga en <span style={{ color: "#00a884" }}>segundos</span> sin</div>
                <div style={{ fontSize: 13, fontWeight: 700, color: "#2e7d32" }}>preocupaciones</div>
                <div style={{ fontSize: 9, color: "#666", marginTop: 4 }}>Creado por <strong>onepay</strong></div>
              </div>
              <div style={{ fontSize: 12, fontWeight: 700, color: "#fff", marginBottom: 2 }}>T{"\u00ED"}tulo</div>
              <div style={{ fontSize: 13, color: "#adb5bd", marginBottom: 14 }}>Factura Internet - Marzo</div>
              <div style={{ fontSize: 12, fontWeight: 700, color: "#fff", marginBottom: 2 }}>Total</div>
              <div style={{ fontSize: 22, fontWeight: 800, color: "#fff", marginBottom: 16 }}>$ 85.000</div>
              <div style={{ fontSize: 10, color: "#adb5bd", lineHeight: 1.5 }}>Al hacer clic en {"\u2018"}Iniciar pago{"\u2019"}, acepta los <span style={{ color: "#53bdeb" }}>términos y condiciones</span></div>
            </div>
          )}
          {flowPage === 2 && (
            <div>
              <div style={{ fontSize: 12, color: "#adb5bd", marginBottom: 12, lineHeight: 1.4 }}>Selecciona una de tus cuentas o tarjetas inscritas</div>
              <div style={{ fontSize: 10, color: "#adb5bd", marginBottom: 8 }}>Pagos seguros con OnePay</div>
              {payMethodsReal.map((m, i) => (
                <div key={i} onClick={() => setWaPay(i)} style={{
                  padding: "10px 12px", borderRadius: 10, margin: "4px 0", cursor: "pointer",
                  background: waPay === i ? "rgba(0,168,132,.08)" : "rgba(255,255,255,.04)",
                  border: waPay === i ? "1.5px solid #00a884" : "1px solid rgba(255,255,255,.08)",
                  display: "flex", alignItems: "center", gap: 10, transition: "all .2s"
                }}>
                  <div style={{ width: 32, height: 32, borderRadius: 8, background: "rgba(255,255,255,.08)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16, flexShrink: 0 }}>{m.icon}</div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 12, fontWeight: 600, color: "#fff" }}>{m.name}</div>
                    <div style={{ fontSize: 10, color: "rgba(255,255,255,.45)", lineHeight: 1.3 }}>{m.sub}</div>
                  </div>
                  {waPay === i && <span style={{ color: "#00a884", fontSize: 16 }}>{"\u2713"}</span>}
                </div>
              ))}
            </div>
          )}
          {flowPage === 3 && (
            <div style={{ textAlign: "center", paddingTop: 20 }}>
              <div style={{ fontSize: 22, fontWeight: 800, color: "#fff", marginBottom: 8 }}>Transacción en progreso</div>
              <div style={{ fontSize: 13, color: "#adb5bd", lineHeight: 1.5, marginBottom: 6 }}>Has utilizado tu cuenta {payMethodsReal[waPay].name} como método de pago.</div>
              <div style={{ fontSize: 13, color: "#adb5bd", lineHeight: 1.5, marginBottom: 12 }}>Esta transacción se procesará inmediatamente.</div>
              <div style={{ fontSize: 12, color: "#00a884" }}>Gracias por usar OnePay.</div>
            </div>
          )}
        </div>
        {/* Flow bottom button */}
        <div style={{ padding: "10px 14px", flexShrink: 0 }}>
          <div onClick={() => { if (wa < 3) sWa(wa + 1); else sWa(4); }} style={{
            padding: "12px", borderRadius: 10, background: "#00a884", textAlign: "center",
            fontSize: 14, fontWeight: 700, color: "#fff", cursor: "pointer"
          }}>
            {flowPage === 1 ? "Iniciar pago" : flowPage === 2 ? "Continuar" : "Finalizar"}
          </div>
          <div style={{ textAlign: "center", marginTop: 6, display: "flex", alignItems: "center", justifyContent: "center", gap: 4 }}>
            <span style={{ fontSize: 9, color: "#adb5bd" }}>Managed by OnePay.</span>
            <span style={{ fontSize: 9, color: "#53bdeb" }}>Learn more</span>
          </div>
        </div>
      </div>
    );
  };

  return (
    <Box white>
      <Fade>
        <Tag>La experiencia</Tag>
        <h2 style={{ fontSize: "clamp(26px,4.5vw,44px)", fontWeight: 800, letterSpacing: "-.03em", margin: "14px 0 10px", lineHeight: 1.08 }}>De la factura al dinero en tu cuenta</h2>
        <p style={{ fontSize: 16, color: C.g500, maxWidth: 540, lineHeight: 1.6, marginBottom: 32 }}>Tres canales, una plataforma. El usuario elige. Tú no tocas nada.</p>
      </Fade>
      <Fade delay={.1}>
        <div style={{ display: "flex", gap: 5, marginBottom: 32, flexWrap: "wrap" }}>
          {tabs.map((t, i) => (
            <button key={i} onClick={() => sTab(i)} style={{ padding: "9px 18px", borderRadius: 100, border: "none", cursor: "pointer", fontSize: 13, fontWeight: 600, transition: "all .3s", background: tab === i ? C.p950 : "#fff", color: tab === i ? "#fff" : C.g600, boxShadow: tab === i ? "0 6px 20px rgba(9,12,28,.14)" : "0 1px 3px rgba(0,0,0,.04)" }}>{t}</button>
          ))}
        </div>
      </Fade>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))", gap: 36, alignItems: "center" }}>
        <Fade delay={.12}>
          {/* ═══ TAB 0: WhatsApp con Flow embebido ═══ */}
          {tab === 0 && (
            <div style={{ background: "#fff", borderRadius: 36, padding: 10, boxShadow: "0 20px 56px rgba(0,0,0,.12)", width: 310, maxWidth: "100%", margin: "0 auto", border: "3px solid #2a2a2a" }}>
              <div style={{ background: "#0b141a", borderRadius: 28, overflow: "hidden", height: 600, display: "flex", flexDirection: "column", position: "relative" }}>
                {/* Status bar */}
                <div style={{ padding: "8px 14px 0", display: "flex", justifyContent: "space-between", fontSize: 10, color: "rgba(255,255,255,.6)", fontWeight: 600, flexShrink: 0, zIndex: 11 }}>
                  <span>7:29</span>
                  <div style={{ width: 50, height: 16, borderRadius: 10, background: "#000", marginTop: -2 }} />
                  <span style={{ fontSize: 8 }}>{"\u25CF\u25CF\u25CF"}</span>
                </div>
                {/* WhatsApp header */}
                <div style={{ padding: "6px 12px 8px", display: "flex", alignItems: "center", gap: 8, borderBottom: "1px solid rgba(255,255,255,.06)", flexShrink: 0, background: "#1f2c34", zIndex: 11 }}>
                  <span style={{ color: "#fff", fontSize: 14 }}>{"\u2190"}</span>
                  <span style={{ fontSize: 11, color: "#adb5bd" }}>48</span>
                  <div style={{ width: 28, height: 28, borderRadius: "50%", background: "#fff", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <ISOTIPO size={20} fill="#01120D" />
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 13, fontWeight: 600, color: "#fff", display: "flex", alignItems: "center", gap: 3 }}>
                      OnePay <span style={{ color: "#53bdeb", fontSize: 11 }}>{"\u2713"}</span>
                    </div>
                  </div>
                </div>
                {/* Chat messages */}
                <div ref={waScrollRef} style={{ flex: 1, padding: "10px 8px", display: "flex", flexDirection: "column", gap: 6, overflowY: "auto", overflowX: "hidden", background: "#0b141a", scrollBehavior: "smooth", scrollbarWidth: "none" }}>
                  {/* Cobro message */}
                  <div style={{ display: "flex", justifyContent: "flex-start", marginBottom: 2 }}>
                    <div style={{ maxWidth: "88%", borderRadius: "4px 12px 12px 12px", background: "#1f2c34", overflow: "hidden" }}>
                      <div style={{ padding: "8px 10px", background: "rgba(0,0,0,.15)", display: "flex", alignItems: "center", gap: 8 }}>
                        <div style={{ width: 26, height: 26, borderRadius: 4, background: "#e74c3c", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 7, fontWeight: 800, color: "#fff", flexShrink: 0 }}>PDF</div>
                        <div>
                          <div style={{ fontSize: 10, fontWeight: 600, color: "#fff" }}>Cobro.pdf</div>
                          <div style={{ fontSize: 8, color: "rgba(255,255,255,.4)" }}>912 KB {"\u00B7"} pdf</div>
                        </div>
                      </div>
                      <div style={{ padding: "8px 10px 4px" }}>
                        <div style={{ fontSize: 11.5, color: "#e9edef", lineHeight: 1.4 }}>
                          {"\u{1F44B}"} <strong>OnePay</strong> ha solicitado <strong>$85.000</strong> para el pago de tu <strong style={{ color: "#53bdeb" }}>Factura Internet - Marzo</strong>.
                        </div>
                        <div style={{ fontSize: 9, color: "rgba(255,255,255,.35)", marginTop: 3 }}>Pagos seguros con OnePay</div>
                        <div style={{ textAlign: "right", fontSize: 8, color: "rgba(255,255,255,.25)", marginTop: 2 }}>7:29 PM</div>
                      </div>
                      {wa === 0 && (
                        <div onClick={() => sWa(1)} style={{ padding: "9px", borderTop: "1px solid rgba(255,255,255,.06)", display: "flex", alignItems: "center", justifyContent: "center", gap: 5, cursor: "pointer" }}>
                          <span style={{ fontSize: 12 }}>{"\u{1F4CB}"}</span>
                          <span style={{ fontSize: 12, fontWeight: 600, color: "#00a884" }}>Iniciar pago</span>
                        </div>
                      )}
                    </div>
                  </div>
                  {/* After flow completes - confirmation message */}
                  {wa >= 4 && (
                    <>
                      <div style={{ display: "flex", justifyContent: "flex-start", marginBottom: 2 }}>
                        <div style={{ maxWidth: "88%", borderRadius: "4px 12px 12px 12px", background: "#1f2c34", overflow: "hidden" }}>
                          <div style={{ padding: "8px 10px", background: "rgba(0,0,0,.15)", display: "flex", alignItems: "center", gap: 8 }}>
                            <div style={{ width: 26, height: 26, borderRadius: 4, background: "#e74c3c", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 7, fontWeight: 800, color: "#fff", flexShrink: 0 }}>PDF</div>
                            <div>
                              <div style={{ fontSize: 10, fontWeight: 600, color: "#fff" }}>Documento</div>
                              <div style={{ fontSize: 8, color: "rgba(255,255,255,.4)" }}>912 KB {"\u00B7"} pdf</div>
                            </div>
                          </div>
                          <div style={{ padding: "8px 10px 4px" }}>
                            <div style={{ fontSize: 11.5, color: "#e9edef", lineHeight: 1.4 }}>
                              Tu pago de <strong style={{ color: "#53bdeb" }}>Factura Internet - Marzo</strong> ha sido acreditado exitosamente {"\u2705"}
                            </div>
                            <div style={{ fontSize: 11.5, color: "#e9edef", lineHeight: 1.4, marginTop: 5 }}>
                              {"\u{1F3E6}"} <strong>OnePay</strong> ha recibido el dinero satisfactoriamente.
                            </div>
                            <div style={{ fontSize: 9, color: "rgba(255,255,255,.35)", marginTop: 3 }}>Pagos seguros con OnePay</div>
                            <div style={{ textAlign: "right", fontSize: 8, color: "rgba(255,255,255,.25)", marginTop: 2 }}>7:30 PM</div>
                          </div>
                          <div style={{ padding: "8px 10px", borderTop: "1px solid rgba(255,255,255,.06)", display: "flex", alignItems: "center", justifyContent: "center", gap: 4 }}>
                            <span style={{ fontSize: 11 }}>{"\u21A9\uFE0F"}</span>
                            <span style={{ fontSize: 11, fontWeight: 600, color: "#00a884" }}>{"\u00A1"}Gracias! {"\u2B50"}</span>
                          </div>
                        </div>
                      </div>
                    </>
                  )}
                </div>
                {/* Bottom input bar — hidden when Flow overlay is open */}
                {(wa === 0 || wa >= 4) && (
                <div style={{ padding: "6px 8px", display: "flex", alignItems: "center", gap: 6, borderTop: "1px solid rgba(255,255,255,.06)", flexShrink: 0, background: "#1f2c34", zIndex: 11 }}>
                  <span style={{ fontSize: 16, color: "rgba(255,255,255,.4)" }}>+</span>
                  <div style={{ flex: 1, height: 28, borderRadius: 16, background: "rgba(255,255,255,.06)", padding: "0 10px", display: "flex", alignItems: "center" }} />
                  <span style={{ fontSize: 14, color: "rgba(255,255,255,.4)" }}>{"\u{1F399}\uFE0F"}</span>
                </div>
                )}
                {/* WhatsApp Flow Overlay */}
                <FlowOverlay />
              </div>
            </div>
          )}

          {/* ═══ TAB 1: Portal de Pagos ═══ */}
          {tab === 1 && (
            <div style={{ background: "#fff", borderRadius: 36, padding: 10, boxShadow: "0 20px 56px rgba(0,0,0,.12)", width: 310, maxWidth: "100%", margin: "0 auto", border: "3px solid #2a2a2a" }}>
              <div style={{ background: "#fff", borderRadius: 28, overflow: "hidden", height: 600, display: "flex", flexDirection: "column" }}>
                {/* Status bar */}
                <div style={{ padding: "8px 14px 0", display: "flex", justifyContent: "space-between", fontSize: 10, color: C.g500, fontWeight: 600, flexShrink: 0 }}>
                  <span>11:01</span>
                  <div style={{ width: 50, height: 16, borderRadius: 10, background: "#000", marginTop: -2 }} />
                  <span style={{ fontSize: 8 }}>{"\u25CF\u25CF\u25CF"}</span>
                </div>
                {/* Portal header */}
                <div style={{ padding: "10px 16px 8px", borderBottom: "1px solid " + C.g200, display: "flex", alignItems: "center", justifyContent: "space-between", flexShrink: 0 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <div style={{ width: 24, height: 24, borderRadius: "50%", background: C.p950, display: "flex", alignItems: "center", justifyContent: "center" }}><ISOTIPO size={16} fill="#fff" /></div>
                    <span style={{ fontSize: 13, fontWeight: 700, color: C.p950 }}>OnePay</span>
                  </div>
                  {pdStep > 0 && <span onClick={() => setPdStep(pdStep - 1)} style={{ fontSize: 12, color: C.a500, cursor: "pointer", fontWeight: 600 }}>{"\u2190"} Volver</span>}
                </div>
                {/* Scrollable content */}
                <div style={{ flex: 1, overflowY: "auto", overflowX: "hidden", padding: "16px", scrollbarWidth: "none" }}>
                  {/* Step 0: Consultar */}
                  {pdStep === 0 && (
                    <div>
                      <h3 style={{ fontSize: 18, fontWeight: 800, color: C.p950, marginBottom: 4 }}>Consulta y paga en segundos</h3>
                      <p style={{ fontSize: 12, color: C.g500, marginBottom: 18 }}>Ingresa la referencia de pago</p>
                      <input
                        type="text"
                        value={pdRef}
                        onChange={(e) => { setPdRef(e.target.value); setPdErr(false); }}
                        placeholder="Ej: ABCD1234"
                        style={{ width: "100%", boxSizing: "border-box", border: "1.5px solid " + (pdErr ? C.e500 : C.g300), borderRadius: 10, padding: "10px 14px", marginBottom: 4, fontSize: 13, color: C.g700, outline: "none", background: "#fff" }}
                      />
                      {pdErr && <div style={{ fontSize: 11, color: C.e500, marginBottom: 8, display: "flex", alignItems: "center", gap: 4 }}>{"\u26A0\uFE0F"} Por favor completa este campo.</div>}
                      {!pdErr && <div style={{ height: 20, marginBottom: 8 }} />}
                      <div onClick={() => { if (!pdRef.trim()) { setPdErr(true); return; } setPdStep(1); }} style={{ padding: "12px", borderRadius: 10, background: C.p950, textAlign: "center", color: "#fff", fontWeight: 700, fontSize: 13, cursor: "pointer" }}>Consultar</div>
                    </div>
                  )}
                  {/* Step 1: Selección de deudas */}
                  {pdStep === 1 && (
                    <div>
                      <h3 style={{ fontSize: 16, fontWeight: 800, color: C.p950, marginBottom: 4 }}>Tu consulta</h3>
                      <p style={{ fontSize: 11, color: C.g500, marginBottom: 12 }}>Selecciona las deudas que deseas pagar.</p>
                      <div style={{ display: "flex", flexDirection: "column", gap: 6, marginBottom: 12 }}>
                        {deudas.map((d, i) => (
                          <div key={i} onClick={() => { const n = [...pdSel]; n[i] = !n[i]; setPdSel(n); }} style={{ padding: "10px 12px", borderRadius: 10, border: "1px solid " + C.g200, background: "#fff", cursor: "pointer", display: "flex", gap: 8, alignItems: "flex-start" }}>
                            <div style={{ width: 16, height: 16, borderRadius: 4, border: "2px solid " + (pdSel[i] ? C.a500 : C.g300), background: pdSel[i] ? C.a500 : "#fff", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: 2 }}>
                              {pdSel[i] && <span style={{ color: "#fff", fontSize: 9, fontWeight: 800 }}>{"\u2713"}</span>}
                            </div>
                            <div style={{ flex: 1 }}>
                              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                                <span style={{ fontSize: 10, color: C.g500 }}>Valor a pagar:</span>
                                <span style={{ fontSize: 9, color: C.g400 }}>{d.ref ? "Ref. " + d.ref : ""}</span>
                              </div>
                              <div style={{ fontSize: 14, fontWeight: 800, color: C.p950, margin: "1px 0" }}>COP ${dot(d.monto)}</div>
                              {d.desc && <div style={{ fontSize: 9, color: C.g500 }}>{d.desc}</div>}
                              <div style={{ fontSize: 9, color: C.g400, marginTop: 1 }}>Creación: {d.fCreacion} | Vence: {d.fVence}</div>
                            </div>
                          </div>
                        ))}
                      </div>
                      {pdTotal > 0 && (
                        <div style={{ padding: "10px 14px", borderRadius: 10, background: C.g50, border: "1px solid " + C.g200, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                          <div>
                            <div style={{ fontSize: 10, color: C.g500 }}>Total seleccionado</div>
                            <div style={{ fontSize: 15, fontWeight: 800, color: C.p950 }}>$ {dot(pdTotal)} COP</div>
                          </div>
                          <div onClick={() => setPdStep(2)} style={{ padding: "7px 16px", borderRadius: 8, background: C.p950, color: "#fff", fontWeight: 700, fontSize: 11, cursor: "pointer" }}>Pagar</div>
                        </div>
                      )}
                    </div>
                  )}
                  {/* Step 2: Método de pago */}
                  {pdStep === 2 && (
                    <div>
                      <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 12 }}>
                        <span style={{ fontSize: 11, color: C.g500 }}>Total a pagar</span>
                        <span style={{ fontSize: 9, color: C.g400, marginLeft: "auto" }}>Pago de {pdSel.filter(Boolean).length} deudas</span>
                      </div>
                      <div style={{ fontSize: 24, fontWeight: 800, color: C.p950, marginBottom: 14 }}>$ {dot(pdTotal)} <span style={{ fontSize: 13, fontWeight: 400, color: C.g500 }}>COP</span></div>
                      <div style={{ fontSize: 11, fontWeight: 600, color: C.g600, marginBottom: 8 }}>Método de pago</div>
                      {[{ name: "Mastercard \u00B78594", sub: "Cargo extra de 3.15%" }, { name: "Visa \u00B72029", sub: "Cargo extra de 3.15%" }, { name: "Nequi \u00B76819", sub: "Sin cargo extra" }, { name: "PSE", sub: "Sin cargo extra" }].map((m, i) => (
                        <div key={i} onClick={() => setPdPay(i)} style={{
                          padding: "9px 10px", borderRadius: 10, margin: "4px 0", cursor: "pointer",
                          border: pdPay === i ? "2px solid " + C.p950 : "1px solid " + C.g200,
                          display: "flex", alignItems: "center", gap: 9
                        }}>
                          <div style={{ width: 26, height: 26, borderRadius: 6, background: C.g100, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 9, fontWeight: 700, color: C.g600, flexShrink: 0 }}>{i < 2 ? "MC" : i === 2 ? "N" : "PSE"}</div>
                          <div>
                            <div style={{ fontSize: 11, fontWeight: 600, color: C.g700 }}>{m.name}</div>
                            <div style={{ fontSize: 9, color: C.g400 }}>{m.sub}</div>
                          </div>
                        </div>
                      ))}
                      <div onClick={() => setPdStep(3)} style={{ marginTop: 12, padding: "11px", borderRadius: 10, background: C.p950, textAlign: "center", color: "#fff", fontWeight: 700, fontSize: 12, cursor: "pointer" }}>Pagar ${dot(pdTotal)}</div>
                    </div>
                  )}
                  {/* Step 3: Éxito */}
                  {pdStep === 3 && (
                    <div style={{ textAlign: "center", paddingTop: 40 }}>
                      <div style={{ fontSize: 40 }}>{"\u2705"}</div>
                      <div style={{ fontSize: 18, fontWeight: 800, color: C.p950, margin: "10px 0" }}>Pago exitoso</div>
                      <div style={{ fontSize: 14, color: C.g600 }}>${dot(pdTotal)} COP</div>
                      <div style={{ padding: "6px 14px", borderRadius: 8, background: C.s50, fontSize: 11, color: C.s500, fontWeight: 600, display: "inline-block", marginTop: 10 }}>{"\u2713"} Conciliado automáticamente</div>
                    </div>
                  )}
                </div>
                {/* Footer */}
                <div style={{ padding: "6px 16px", background: C.g50, borderTop: "1px solid " + C.g200, display: "flex", justifyContent: "space-between", alignItems: "center", flexShrink: 0 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 4, fontSize: 9, color: C.g500 }}>Pagos seguros con <strong style={{ color: C.p950 }}>onepay</strong></div>
                  <span style={{ fontSize: 9, color: C.g400 }}>Español</span>
                </div>
              </div>
            </div>
          )}

          {/* ═══ TAB 2: Llamada IA ═══ */}
          {tab === 2 && (
            <div style={{ background: "#fff", borderRadius: 36, padding: 10, boxShadow: "0 20px 56px rgba(0,0,0,.12)", width: 310, maxWidth: "100%", margin: "0 auto", border: "3px solid #2a2a2a" }}>
              <div style={{ background: "#fafafa", borderRadius: 28, overflow: "hidden", height: 600, display: "flex", flexDirection: "column" }}>
                {/* Status bar */}
                <div style={{ padding: "8px 14px 0", display: "flex", justifyContent: "space-between", fontSize: 10, color: C.g500, fontWeight: 600, flexShrink: 0, background: "linear-gradient(135deg," + C.a500 + "," + C.b500 + ")" }}>
                  <span style={{ color: "rgba(255,255,255,.8)" }}>11:01</span>
                  <div style={{ width: 50, height: 16, borderRadius: 10, background: "#000", marginTop: -2 }} />
                  <span style={{ fontSize: 8, color: "rgba(255,255,255,.8)" }}>{"\u25CF\u25CF\u25CF"}</span>
                </div>
                {/* Call header */}
                <div style={{ padding: "10px 16px 12px", background: "linear-gradient(135deg," + C.a500 + "," + C.b500 + ")", color: "#fff", textAlign: "center", flexShrink: 0 }}>
                  <div style={{ width: 40, height: 40, borderRadius: "50%", background: "rgba(255,255,255,.15)", margin: "0 auto 6px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18 }}>{"\u{1F4DE}"}</div>
                  <div style={{ fontSize: 13, fontWeight: 700 }}>Ana {"\u00B7"} Agente IA</div>
                  <div style={{ fontSize: 9, opacity: .7 }}>FibraNet {"\u00B7"} Gestión de cartera</div>
                  <div style={{ fontFamily: "monospace", fontSize: 16, fontWeight: 700, letterSpacing: 2, marginTop: 3 }}>{fT(ct)}</div>
                </div>
                {/* Transcription - scrollable */}
                <div ref={callRef} style={{ flex: 1, padding: "10px 12px", overflowY: "auto", overflowX: "hidden", scrollBehavior: "smooth", scrollbarWidth: "none", background: "#fafafa" }}>
                  <div style={{ fontSize: 9, color: C.g400, fontWeight: 600, marginBottom: 8, textTransform: "uppercase", letterSpacing: ".05em" }}>{"\u{1F4AC}"} Transcripción en tiempo real</div>
                  {callLines.slice(0, callStep).map((line, i) => (
                    <div key={i} style={{ display: "flex", gap: 6, marginBottom: 8, justifyContent: line.who === "user" ? "flex-end" : "flex-start" }}>
                      {line.who === "ai" && <div style={{ width: 20, height: 20, borderRadius: "50%", background: C.a500, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 9, color: "#fff", flexShrink: 0, marginTop: 2 }}>{"\u{1F916}"}</div>}
                      <div style={{
                        maxWidth: "78%", padding: "7px 10px", borderRadius: line.who === "ai" ? "4px 11px 11px 11px" : "11px 4px 11px 11px",
                        background: line.who === "ai" ? "#fff" : C.a50,
                        border: "1px solid " + (line.who === "ai" ? C.g200 : C.a200),
                        fontSize: 11, lineHeight: 1.45, color: C.g700
                      }}>
                        {line.text}
                      </div>
                      {line.who === "user" && <div style={{ width: 20, height: 20, borderRadius: "50%", background: C.g300, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 9, flexShrink: 0, marginTop: 2 }}>{"\u{1F464}"}</div>}
                    </div>
                  ))}
                  {callStep < callLines.length && (
                    <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
                      <div style={{ width: 20, height: 20, borderRadius: "50%", background: callLines[callStep]?.who === "ai" ? C.a500 : C.g300, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 9, color: "#fff", flexShrink: 0 }}>{callLines[callStep]?.who === "ai" ? "\u{1F916}" : "\u{1F464}"}</div>
                      <div style={{ display: "flex", gap: 3 }}>
                        <span style={{ width: 4, height: 4, borderRadius: "50%", background: C.g300 }} />
                        <span style={{ width: 4, height: 4, borderRadius: "50%", background: C.g300 }} />
                        <span style={{ width: 4, height: 4, borderRadius: "50%", background: C.g300 }} />
                      </div>
                    </div>
                  )}
                  {/* Call summary — inside scroll area */}
                  {callStep >= callLines.length && (
                    <>
                    <div style={{ padding: "10px 12px", background: C.s50, borderRadius: 10, marginTop: 8, marginBottom: 6 }}>
                      <div style={{ fontSize: 9, fontWeight: 600, color: C.s500, marginBottom: 3 }}>{"\u{1F916}"} Resumen IA</div>
                      <div style={{ fontSize: 10, color: C.g600, lineHeight: 1.45 }}>El usuario aceptó recibir link de pago por WhatsApp. Pagará parcialmente hoy ($42.500) y el saldo cuando pueda. Sentimiento: cooperativo después de objeciones por liquidez. Método preferido: Nequi.</div>
                    </div>
                    <div style={{ padding: "10px 12px", background: C.a50, borderRadius: 10 }}>
                      <div style={{ fontSize: 9, fontWeight: 600, color: C.a500, marginBottom: 5 }}>{"\u{1F9E0}"} Parámetros aprendidos</div>
                      <div style={{ display: "flex", flexDirection: "column", gap: 3 }}>
                        {[
                          { k: "Objeción principal", v: "Falta de liquidez" },
                          { k: "Detonante", v: "Pago parcial" },
                          { k: "Canal preferido", v: "WhatsApp + Nequi" },
                          { k: "Horario", v: "Tarde (1er intento)" },
                          { k: "Tono efectivo", v: "Empático, sin presión" }
                        ].map((p, i) => (
                          <div key={i} style={{ display: "flex", gap: 4, fontSize: 9, lineHeight: 1.3 }}>
                            <span style={{ color: C.a500, fontWeight: 600, minWidth: 90, flexShrink: 0 }}>{p.k}:</span>
                            <span style={{ color: C.g600 }}>{p.v}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          )}
        </Fade>

        <Fade delay={.2}>
          <div>
            <h3 style={{ fontSize: 20, fontWeight: 700, marginBottom: 10 }}>{["Pago por WhatsApp", "Portal de Pagos", "Llamada con IA"][tab]}</h3>
            <p style={{ fontSize: 14, color: C.g500, lineHeight: 1.65, marginBottom: 14 }}>
              {tab === 0 && "El usuario recibe su factura en WhatsApp. Toca \u201CIniciar pago\u201D y se abre un WhatsApp Flow nativo \u2014 sin salir de la app. Elige método, paga, listo."}
              {tab === 1 && "Portal web donde el usuario consulta su deuda por referencia, selecciona las facturas que quiere pagar y completa el pago en un solo lugar."}
              {tab === 2 && "Para cartera vencida. Cada empresa crea su propio agente de voz IA que llama como si fuera parte de su equipo. Contextualiza la deuda, maneja objeciones y envía link de pago por WhatsApp."}
            </p>
            {tab === 0 && <p style={{ fontSize: 13, color: C.a500, fontWeight: 600, marginBottom: 12 }}>{"\u{1F446}"} Haz click en {"\u201C"}Iniciar pago{"\u201D"} para ver el WhatsApp Flow</p>}
            {tab === 1 && <p style={{ fontSize: 13, color: C.a500, fontWeight: 600, marginBottom: 12 }}>{"\u{1F446}"} Haz click en {"\u201C"}Consultar{"\u201D"} para ver el flujo completo</p>}
            {tab === 2 && <p style={{ fontSize: 13, color: C.a500, fontWeight: 600, marginBottom: 12 }}>{"\u{1F440}"} Mira la conversación desarrollarse en tiempo real</p>}
            {checks[tab].map((t, i) => (
              <div key={i} style={{ display: "flex", gap: 7, alignItems: "center", fontSize: 13, color: C.g600, marginBottom: 7 }}>
                <span style={{ color: C.s500 }}>{"\u2713"}</span>{t}
              </div>
            ))}
          </div>
        </Fade>
      </div>
    </Box>
  );
}

function Timeline() {
  const [as, sAs] = useState(-1);
  const [exp, sExp] = useState(null);
  const [r, v] = useVis();
  useEffect(() => { if (!v) return; const t = [0, 1, 2, 3, 4, 5].map(i => setTimeout(() => sAs(i), 250 + i * 350)); return () => t.forEach(clearTimeout); }, [v]);

  const steps = [
    { lb: "Día facturación", ic: "\u{1F4CB}", tt: "Creación automática de cobros", c: C.b500, dt: "Tu sistema de gestión genera la factura \u2192 OnePay la recibe al instante vía API. Se crean links de pago únicos y se prepara la secuencia de cobro personalizada." },
    { lb: "Cobro inicial", ic: "\u{1F4F1}", tt: "WhatsApp + Email + Portal", c: C.a500, dt: "El usuario recibe su factura por WhatsApp con link directo (98% apertura). Simultáneamente email y portal. Botón de pago en un click." },
    { lb: "Día 3", ic: "\u{1F514}", tt: "Recordatorio inteligente", c: C.s500, dt: "Solo a quienes no han pagado. El sistema analiza hora, día y canal donde cada usuario tiene mayor probabilidad de responder." },
    { lb: "Día 6-9", ic: "\u{1F9E0}", tt: "Escalamiento adaptativo", c: C.w500, dt: "Behavioral intelligence cambia canal, hora y mensaje automáticamente. Si no abrió WhatsApp \u2192 email. Cada interacción mejora el siguiente intento." },
    { lb: "Día 12-15", ic: "\u{1F4DE}", tt: "Llamada con IA", c: C.e500, dt: "Agente de voz IA para quienes no respondieron a digital. Voz natural, contexto de factura, envía link durante la llamada." },
    { lb: "Pago exitoso", ic: "\u2705", tt: "Conciliación instantánea", c: C.s500, dt: "El pago se aplica automáticamente en tu sistema de gestión. Sin reconciliar manualmente. Dashboard predice el flujo de la semana." }
  ];

  return (
    <Box dark>
      <Fade>
        <Tag dark>Cómo funciona</Tag>
        <h2 style={{ fontSize: "clamp(26px,4.5vw,44px)", fontWeight: 800, letterSpacing: "-.03em", margin: "14px 0 10px", lineHeight: 1.08 }}>Recaudo en piloto automático</h2>
        <p style={{ fontSize: 16, color: C.g400, maxWidth: 560, lineHeight: 1.6, marginBottom: 40 }}>Secuencias inteligentes que se adaptan al comportamiento de cada pagador.</p>
      </Fade>
      <div ref={r} style={{ position: "relative" }}>
        <div style={{ position: "absolute", left: 21, top: 22, bottom: 22, width: 2, background: "rgba(255,255,255,.04)", borderRadius: 2 }}>
          <div style={{ width: "100%", borderRadius: 2, background: "linear-gradient(180deg," + C.a500 + "," + C.s500 + ")", height: as >= 0 ? (Math.min(100, ((as + 1) / steps.length) * 100) + "%") : "0%", transition: "height .9s cubic-bezier(.16,1,.3,1)" }} />
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
          {steps.map((s, i) => {
            const act = i <= as;
            const open = exp === i;
            return (
              <div key={i} onClick={() => sExp(open ? null : i)} style={{ display: "flex", gap: 16, alignItems: "flex-start", opacity: act ? 1 : .2, transition: "all .5s cubic-bezier(.16,1,.3,1)", cursor: "pointer" }}>
                <div style={{ width: 42, height: 42, borderRadius: "50%", flexShrink: 0, background: act ? s.c : "rgba(255,255,255,.04)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16, transition: "all .4s", boxShadow: act ? "0 0 20px " + s.c + "20" : "none" }}>{s.ic}</div>
                <div style={{ background: open ? "rgba(255,255,255,.07)" : "rgba(255,255,255,.03)", borderRadius: 12, padding: "16px 20px", flex: 1, border: "1px solid " + (open ? "rgba(255,255,255,.1)" : "rgba(255,255,255,.03)"), transition: "all .4s" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <div>
                      <span style={{ fontSize: 10, fontWeight: 600, textTransform: "uppercase", letterSpacing: ".05em", color: s.c }}>{s.lb}</span>
                      <h4 style={{ fontSize: 15, fontWeight: 700, margin: "1px 0", color: "#fff" }}>{s.tt}</h4>
                    </div>
                    <span style={{ fontSize: 14, color: C.g500, transition: "transform .3s", transform: open ? "rotate(180deg)" : "rotate(0)" }}>{"\u25BE"}</span>
                  </div>
                  <div style={{ maxHeight: open ? 160 : 0, overflow: "hidden", transition: "max-height .45s cubic-bezier(.16,1,.3,1), opacity .3s", opacity: open ? 1 : 0 }}>
                    <p style={{ fontSize: 13, color: C.g400, lineHeight: 1.55, margin: "8px 0 0", paddingTop: 8, borderTop: "1px solid rgba(255,255,255,.06)" }}>{s.dt}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <Fade delay={.3}>
        <div style={{ marginTop: 36, padding: "18px 24px", borderRadius: 12, background: "rgba(34,197,94,.06)", border: "1px solid rgba(34,197,94,.1)", textAlign: "center" }}>
          <p style={{ fontSize: 18, fontWeight: 700, color: "#fff", margin: 0 }}>61.3% de los pagos se completan en las primeras <span style={{ color: C.s400 }}>53 horas</span></p>
        </div>
      </Fade>
    </Box>
  );
}

function Data() {
  const [mode, sMode] = useState("top");
  const [r, v] = useVis();

  const sets = {
    top: {
      label: "Top Performers", sub: "Mejores ISPs (top 25%)", avg: "4.4",
      bk: [{ l: "\u22641d", op: 23.4, ot: 8.7 }, { l: "\u22643d", op: 43.5, ot: 28.8 }, { l: "\u22645d", op: 64.6, ot: 55.3 }, { l: "\u22647d", op: 81.9, ot: 77.0 }, { l: "\u226410d", op: 96.1, ot: 93.7 }, { l: "\u226415d", op: 100, ot: 98.8 }],
      otLabel: "Otros canales de las mismas ISPs"
    },
    avg: {
      label: "OnePay Promedio", sub: "ISPs promedio", avg: "5.5",
      bk: [{ l: "\u22641d", op: 17.9, ot: 4.4 }, { l: "\u22643d", op: 33.7, ot: 16.7 }, { l: "\u22645d", op: 51.6, ot: 33.1 }, { l: "\u22647d", op: 66.1, ot: 47.5 }, { l: "\u226410d", op: 88.0, ot: 73.8 }, { l: "\u226415d", op: 98.6, ot: 93.5 }],
      otLabel: "Otros canales de las mismas ISPs"
    }
  };
  const d = sets[mode];

  return (
    <Box white>
      <Fade>
        <Tag>Datos reales {"\u00B7"} Febrero 2026</Tag>
        <h2 style={{ fontSize: "clamp(26px,4.5vw,44px)", fontWeight: 800, letterSpacing: "-.03em", margin: "14px 0 10px", lineHeight: 1.08 }}>OnePay cobra más rápido.<br /><span style={{ color: C.g400 }}>Los números lo prueban.</span></h2>
        <p style={{ fontSize: 16, color: C.g500, maxWidth: 560, lineHeight: 1.6, marginBottom: 14 }}>255.487 facturas procesadas. Comparamos velocidad de cobro OnePay vs. canales tradicionales.</p>
      </Fade>
      <div ref={r} style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(170px,1fr))", gap: 12, margin: "28px 0" }}>
        {[{ v: 255487, l: "Facturas procesadas", sb: "febrero 2026", f: true }, { v: parseFloat(d.avg), l: "Días promedio", sb: d.sub, d: 1 }, { v: d.bk[2].op, l: "Cobrado en <5 días", sb: d.label, s: "%" }].map((m, i) => (
          <Fade key={i + mode} delay={.05 * i}>
            <div style={{ background: C.p950, borderRadius: 16, padding: 24, color: "#fff" }}>
              <div style={{ fontSize: "clamp(24px,3.2vw,34px)", fontWeight: 800, letterSpacing: "-.02em" }}>
                <Num value={m.v} suf={m.s} dec={m.d} fmt={m.f} />
              </div>
              <div style={{ fontSize: 13, fontWeight: 600, color: C.g300, marginTop: 3 }}>{m.l}</div>
              <div style={{ fontSize: 11, color: C.g500, marginTop: 1 }}>{m.sb}</div>
            </div>
          </Fade>
        ))}
      </div>
      <Fade delay={.15}>
        <div style={{ background: C.g50, borderRadius: 20, padding: 24, border: "1px solid " + C.g200 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20, flexWrap: "wrap", gap: 10 }}>
            <h3 style={{ fontSize: 16, fontWeight: 700, margin: 0 }}>% facturas cobradas acumulado</h3>
            <div style={{ display: "flex", gap: 3, padding: 3, background: C.g200, borderRadius: 9 }}>
              {[{ k: "top", l: "\u{1F3C6} Top Performers" }, { k: "avg", l: "\u{1F4CA} Promedio" }].map(({ k, l }) => (
                <button key={k} onClick={() => sMode(k)} style={{ padding: "6px 14px", borderRadius: 7, border: "none", cursor: "pointer", fontSize: 12, fontWeight: 600, transition: "all .3s", background: mode === k ? "#fff" : "transparent", color: mode === k ? C.p950 : C.g500, boxShadow: mode === k ? "0 2px 6px rgba(0,0,0,.06)" : "none" }}>{l}</button>
              ))}
            </div>
          </div>
          <div style={{ display: "flex", gap: 14, marginBottom: 14, fontSize: 11 }}>
            <span style={{ display: "flex", alignItems: "center", gap: 4, color: C.g600 }}><span style={{ width: 9, height: 9, borderRadius: 2, background: "linear-gradient(135deg," + C.a500 + "," + C.b500 + ")" }} />OnePay {"\u2014"} {d.label}</span>
            <span style={{ display: "flex", alignItems: "center", gap: 4, color: C.g500 }}><span style={{ width: 9, height: 9, borderRadius: 2, background: C.g300 }} />{d.otLabel}</span>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            {d.bk.map((b, i) => {
              const df = b.op - b.ot;
              return (
                <div key={i + mode} style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <span style={{ fontSize: 11, color: C.g500, minWidth: 42, textAlign: "right", fontWeight: 600 }}>{b.l}</span>
                  <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 3 }}>
                    <div style={{ position: "relative", height: 26, borderRadius: 7, overflow: "hidden", background: C.g200 + "50" }}>
                      <div style={{ height: "100%", borderRadius: 7, background: "linear-gradient(90deg," + C.a500 + "," + C.b500 + ")", width: v ? (b.op + "%") : "0%", transition: "width 1.2s cubic-bezier(.16,1,.3,1) " + (.12 + i * .07) + "s" }} />
                      <span style={{ position: "absolute", left: 10, top: "50%", transform: "translateY(-50%)", fontSize: 11, fontWeight: 700, color: "#fff" }}>{b.op}%</span>
                    </div>
                    <div style={{ position: "relative", height: 16, borderRadius: 5, overflow: "hidden", background: C.g200 + "40" }}>
                      <div style={{ height: "100%", borderRadius: 5, background: C.g400, width: v ? (b.ot + "%") : "0%", transition: "width 1.2s cubic-bezier(.16,1,.3,1) " + (.15 + i * .07) + "s" }} />
                      <span style={{ position: "absolute", left: 7, top: "50%", transform: "translateY(-50%)", fontSize: 9, fontWeight: 600, color: C.g100 }}>{b.ot}%</span>
                    </div>
                  </div>
                  {df > 2 && <span style={{ fontSize: 12, fontWeight: 700, color: C.s500, minWidth: 44 }}>+{Math.round(df)}pp</span>}
                </div>
              );
            })}
          </div>
          <div style={{ marginTop: 18, padding: "14px 18px", borderRadius: 10, background: C.a50, border: "1px solid " + C.a200 }}>
            <p style={{ fontSize: 13, color: C.g600, margin: 0, lineHeight: 1.55 }}>
              {mode === "top"
                ? <><strong style={{ color: C.a500 }}>Los mejores ISPs cobran 65% antes de día 5 con OnePay</strong> {"\u2014"} vs. 55% por otros canales de las mismas empresas. La diferencia se amplía desde el día 1.</>
                : <><strong style={{ color: C.a500 }}>Incluso las ISPs promedio superan a sus propios canales tradicionales</strong> {"\u2014"} 4x más rápido en primeras 24h (18% vs. 4.4%). Día 5: 52% vs. 33%.</>
              }
            </p>
          </div>
        </div>
      </Fade>
    </Box>
  );
}

function Integraciones() {
  return (
    <Box dark>
      <Fade>
        <Tag dark>Integraciones</Tag>
        <h2 style={{ fontSize: "clamp(26px,4.5vw,42px)", fontWeight: 800, letterSpacing: "-.03em", margin: "14px 0 10px", lineHeight: 1.08 }}>Se conecta con tu sistema.<br /><span style={{ color: C.a400 }}>Sin cambiar nada.</span></h2>
        <p style={{ fontSize: 16, color: C.g400, maxWidth: 560, lineHeight: 1.6, marginBottom: 28 }}>Integración directa con los principales sistemas de gestión ISP. API abierta para cualquier otro.</p>
      </Fade>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(240px,1fr))", gap: 14 }}>
        {["Wispro", "Wisphub", "MikroWISP", "Integra", "WispControl", "SAEplus", null].map((n, i) => (
          <Fade key={i} delay={.03 * i}>
            {n ? (
              <div style={{ background: "rgba(255,255,255,.03)", borderRadius: 16, padding: 24, border: "1px solid rgba(255,255,255,.04)" }}>
                <div style={{ fontSize: 15, fontWeight: 700 }}>{n}</div>
                <div style={{ fontSize: 11, color: C.g500, marginTop: 3 }}>Integración directa</div>
              </div>
            ) : (
              <div style={{ background: "rgba(99,102,241,.06)", borderRadius: 16, padding: 24, border: "1px dashed rgba(99,102,241,.18)" }}>
                <div style={{ fontSize: 15, fontWeight: 700, color: C.a400 }}>+ Tu CRM</div>
                <div style={{ fontSize: 11, color: C.g500, marginTop: 3 }}>API abierta — nos integramos</div>
              </div>
            )}
          </Fade>
        ))}
      </div>
      <Fade delay={.25}>
        <div style={{ marginTop: 36 }}>
          <h3 style={{ fontSize: 14, fontWeight: 700, marginBottom: 12, color: C.g300 }}>Medios de pago</h3>
          <div style={{ display: "flex", gap: 7, flexWrap: "wrap" }}>
            {[{ n: "PSE" }, { n: "Nequi" }, { n: "Daviplata" }, { n: "Bre-B" }, { n: "VISA" }, { n: "Mastercard" }, { n: "AMEX" }, { n: "Efecty", s: true }].map((m, i) => (
              <span key={i} style={{ padding: "6px 12px", borderRadius: 8, fontSize: 12, fontWeight: 600, background: m.s ? "rgba(251,191,36,.06)" : "rgba(255,255,255,.03)", border: "1px solid " + (m.s ? "rgba(251,191,36,.14)" : "rgba(255,255,255,.04)"), color: m.s ? C.w400 : C.g300 }}>
                {m.n}{m.s && <span style={{ fontSize: 8, fontWeight: 700, color: C.w500, display: "block", marginTop: 1 }}>PRONTO</span>}
              </span>
            ))}
          </div>
        </div>
      </Fade>
    </Box>
  );
}

function Resultados() {
  const cards = [
    { ic: "\u26A1", t: "Cobra 3x más rápido", bf: "Día 18", af: "Día 5.8", m: "+15-25pp", d: "pagos antes de día 10", c: C.a500 },
    { ic: "\u{1F4F1}", t: "50% por WhatsApp", bf: "0% digital", af: "30-50%", m: "del total", d: "cobrado por canal digital", c: C.b500 },
    { ic: "\u{1F3AF}", t: "Menos tickets", bf: "500+ llamadas", af: "Automático", m: "-20-30%", d: "en tickets operativos", c: C.s500 },
    { ic: "\u{1F4B0}", t: "Flujo predecible", bf: "No sé cuánto", af: "Dashboard", m: "Tiempo real", d: "conciliación y predicción", c: C.w500 }
  ];
  return (
    <Box>
      <Fade>
        <Tag>Resultados en 90 días</Tag>
        <h2 style={{ fontSize: "clamp(26px,4.5vw,44px)", fontWeight: 800, letterSpacing: "-.03em", margin: "14px 0", lineHeight: 1.08 }}>Lo que obtienes con OnePay</h2>
      </Fade>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(240px,1fr))", gap: 14, marginTop: 28 }}>
        {cards.map((r, i) => (
          <Fade key={i} delay={.05 * i}>
            <div style={{ background: "#fff", borderRadius: 16, padding: 24, border: "1px solid " + C.g200, height: "100%" }}>
              <span style={{ fontSize: 24 }}>{r.ic}</span>
              <h3 style={{ fontSize: 17, fontWeight: 700, margin: "8px 0" }}>{r.t}</h3>
              <div style={{ display: "flex", gap: 5, alignItems: "center", marginBottom: 8, fontSize: 12 }}>
                <span style={{ padding: "2px 7px", borderRadius: 5, background: C.g100, color: C.g500, textDecoration: "line-through" }}>{r.bf}</span>
                <span style={{ color: C.g300 }}>{"\u2192"}</span>
                <span style={{ padding: "2px 7px", borderRadius: 5, background: r.c + "10", color: r.c, fontWeight: 700 }}>{r.af}</span>
              </div>
              <div style={{ fontSize: 24, fontWeight: 800, color: r.c, letterSpacing: "-.02em" }}>{r.m}</div>
              <p style={{ fontSize: 12, color: C.g500, margin: "3px 0 0" }}>{r.d}</p>
            </div>
          </Fade>
        ))}
      </div>
    </Box>
  );
}

function CicloFinanciero() {
  const [ac, sAc] = useState(null);
  const items = [
    { ic: "\u{1F4E5}", t: "Recaudo inteligente", st: "Activo", c: C.a500, ds: "Cobro automatizado multicanal con behavioral intelligence.", dt: "WhatsApp, email, portal y llamada IA. Secuencias adaptativas por pagador. Conciliación automática." },
    { ic: "\u{1F4CA}", t: "Tesorería en tiempo real", st: "Activo", c: C.b500, ds: "Dashboard de conciliación, predicción y reportes.", dt: "Todos tus cobros en un solo lugar. Predice flujo semanal. Reportes por canal, fecha y estado. Sin cruzar archivos de bancos." },
    { ic: "\u{1F4B8}", t: "Dispersiones", st: "Activo", c: C.s500, ds: "Pago a terceros y desembolsos automáticos.", dt: "Turbo ACH (intrabancario H2H), Bre-B (instantáneo vía Banco de la República) y ACH estándar. Elige según urgencia y costo." },
    { ic: "\u{1F4B3}", t: "Tarjetas corporativas", st: "Próximamente", c: C.w500, ds: "Control de gastos empresariales integrado.", dt: "Tarjetas físicas y virtuales con límites por persona y categoría. Todo visible en un dashboard." },
    { ic: "\u{1F3E0}", t: "Servicios públicos", st: "Activo", c: "#0EA5E9", ds: "Recaudo de utilities con la misma infraestructura.", dt: "Gas, energía, agua, telecomunicaciones. Ya operamos con EPM Gas, Surtigas, Movistar y Grupo Promigas." }
  ];

  return (
    <Box dark>
      <Fade>
        <Tag dark>El ciclo completo</Tag>
        <h2 style={{ fontSize: "clamp(26px,4.5vw,42px)", fontWeight: 800, letterSpacing: "-.03em", margin: "14px 0 10px", lineHeight: 1.08 }}>No solo cobramos.<br /><span style={{ color: C.a400 }}>Cerramos todo el ciclo financiero.</span></h2>
        <p style={{ fontSize: 16, color: C.g400, maxWidth: 560, lineHeight: 1.6, marginBottom: 36 }}>Desde que entra la plata hasta que se dispersa.</p>
      </Fade>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(200px,1fr))", gap: 10 }}>
        {items.map((it, i) => {
          const open = ac === i;
          return (
            <Fade key={i} delay={.04 * i}>
              <div onClick={() => sAc(open ? null : i)} style={{ background: open ? "rgba(255,255,255,.06)" : "rgba(255,255,255,.02)", borderRadius: 14, padding: 20, border: "1px solid " + (open ? "rgba(255,255,255,.08)" : "rgba(255,255,255,.03)"), cursor: "pointer", transition: "all .4s" }}>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <span style={{ fontSize: 22 }}>{it.ic}</span>
                  <span style={{ padding: "2px 7px", borderRadius: 100, fontSize: 9, fontWeight: 600, background: it.st === "Activo" ? "rgba(34,197,94,.1)" : "rgba(251,191,36,.1)", color: it.st === "Activo" ? C.s400 : C.w400 }}>{it.st === "Activo" ? "\u25CF" : "\u25D0"} {it.st}</span>
                </div>
                <h3 style={{ fontSize: 15, fontWeight: 700, margin: "10px 0 4px" }}>{it.t}</h3>
                <p style={{ fontSize: 12, color: C.g400, lineHeight: 1.5, margin: 0 }}>{it.ds}</p>
                <div style={{ maxHeight: open ? 120 : 0, overflow: "hidden", transition: "max-height .4s cubic-bezier(.16,1,.3,1), opacity .3s", opacity: open ? 1 : 0 }}>
                  <p style={{ fontSize: 12, color: C.g300, lineHeight: 1.55, margin: "10px 0 0", paddingTop: 8, borderTop: "1px solid rgba(255,255,255,.05)" }}>{it.dt}</p>
                </div>
              </div>
            </Fade>
          );
        })}
      </div>

      <Fade delay={.25}>
        <div style={{ marginTop: 32, padding: 24, borderRadius: 16, background: "rgba(34,197,94,.04)", border: "1px solid rgba(34,197,94,.08)" }}>
          <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 14 }}>{"\u{1F4B8}"} Dispersiones {"\u2014"} Tres canales</h3>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(180px,1fr))", gap: 10 }}>
            {[
              { n: "Turbo ACH", t: "5 min – 2 horas", co: "Intrabancario Host-to-Host", d: "Transferencias directas con bancos principales. Bancolombia <30 min, Davivienda <20 min, Nequi <5 min. 24/7 en principales bancos." },
              { n: "Bre-B", t: "< 5 minutos", co: "Banco de la República", d: "Pagos instantáneos vía Bre-B. Personas naturales y jurídicas. Todos los bancos con llave registrada, 24/7." },
              { n: "ACH estándar", t: "6 – 30 horas", co: "Menor costo", d: "Rieles ACH bancarios. Hasta 36h hábiles o 72h en fines de semana. Menor costo por transacción." }
            ].map((ch, i) => (
              <div key={i} style={{ background: "rgba(255,255,255,.03)", borderRadius: 10, padding: 16, border: "1px solid rgba(255,255,255,.04)" }}>
                <div style={{ fontSize: 14, fontWeight: 700, marginBottom: 3 }}>{ch.n}</div>
                <div style={{ display: "flex", gap: 10, marginBottom: 6, fontSize: 11 }}>
                  <span style={{ color: C.s400 }}>{"\u26A1"} {ch.t}</span>
                  <span style={{ color: C.b400 }}>{"\u{1F4B0}"} {ch.co}</span>
                </div>
                <p style={{ fontSize: 12, color: C.g400, lineHeight: 1.5, margin: 0 }}>{ch.d}</p>
              </div>
            ))}
          </div>
        </div>
      </Fade>
    </Box>
  );
}

function DashboardCobranza() {
  const [size, setSize] = useState(0); // 0 = 2K, 1 = 40K
  const data = [
    {
      label: "ISP peque\u00F1a (~2.000 suscriptores)",
      total: "19.608", tasa: "78.1%", tasaSub: "15.320 enviados, 4.288 fallidos",
      llamadas: "500/500", llamadasSub: "Uso vs cuota mensual",
      tabla: [
        { id: "8fb7b1", cobro: "Factura #111342 - Plan 400MBT CALI", canal: "Llamada", cobranza: "Ultranet cobranza", regla: "Cuando se crea un cobro", estado: "Enviado", creado: "hace 32 min" },
        { id: "12d508", cobro: "Factura #111341 - Plan 400MBT CALI", canal: "Llamada", cobranza: "Ultranet cobranza", regla: "Cuando se crea un cobro", estado: "Enviado", creado: "hace 32 min" },
        { id: "4c9c0c", cobro: "Factura #111339 - Plan 400MBT CALI", canal: "Llamada", cobranza: "Ultranet cobranza", regla: "Cuando se crea un cobro", estado: "Enviado", creado: "hace 32 min" },
        { id: "48d2af", cobro: "Factura #111337 - Plan 400MBT CALI", canal: "Llamada", cobranza: "Ultranet cobranza", regla: "Cuando se crea un cobro", estado: "Enviado", creado: "hace 32 min" }
      ],
      barData: [1800, 400, 200, 80, 40, 20]
    },
    {
      label: "ISP grande (~40.000 suscriptores)",
      total: "89.290", tasa: "100%", tasaSub: "89.290 enviados, 0 fallidos",
      llamadas: "1.250/1.250", llamadasSub: "Uso vs cuota mensual",
      tabla: [
        { id: "97a3f4", cobro: "VALOR A PAGAR - 1110593893", canal: "WhatsApp", cobranza: "Fiesta - Reminders", regla: "Cuando se crea un cobro", estado: "Enviado", creado: "hace 28 min" },
        { id: "14fc35", cobro: "VALOR A PAGAR - 15206888", canal: "WhatsApp", cobranza: "Fiesta - Reminders", regla: "Cuando se crea un cobro", estado: "Enviado", creado: "hace 28 min" },
        { id: "9ac968", cobro: "VALOR A PAGAR - 16431588", canal: "WhatsApp", cobranza: "Fiesta - Reminders", regla: "Cuando se crea un cobro", estado: "Enviado", creado: "hace 28 min" },
        { id: "caa952", cobro: "VALOR A PAGAR - 1030580684", canal: "WhatsApp", cobranza: "Fiesta - Reminders", regla: "Cuando se crea un cobro", estado: "Enviado", creado: "hace 28 min" }
      ],
      barData: [18000, 1200, 800, 300, 120, 60]
    }
  ];
  const d = data[size];
  const barLabels = ["Sin recordatorio", "1", "2", "3", "4", "5+"];
  const barMax = Math.max(...d.barData);

  return (
    <div style={{ marginTop: 36 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16, flexWrap: "wrap", gap: 10 }}>
        <div>
          <h3 style={{ fontSize: 16, fontWeight: 700, margin: 0 }}>Recordatorios de cobranza</h3>
          <p style={{ fontSize: 11, color: C.g400, margin: "2px 0 0" }}>Historial de notificaciones y llamadas enviadas por reglas de cobranza.</p>
        </div>
        <div style={{ display: "flex", gap: 3, padding: 3, background: "rgba(255,255,255,.06)", borderRadius: 9 }}>
          {["~2.000 suscriptores", "~40.000 suscriptores"].map((l, i) => (
            <button key={i} onClick={() => setSize(i)} style={{
              padding: "6px 14px", borderRadius: 7, border: "none", cursor: "pointer", fontSize: 11, fontWeight: 600, transition: "all .3s",
              background: size === i ? "rgba(99,102,241,.15)" : "transparent",
              color: size === i ? C.a300 : C.g500
            }}>{l}</button>
          ))}
        </div>
      </div>

      {/* Stats cards */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(160px,1fr))", gap: 10, marginBottom: 16 }}>
        <div style={{ background: "rgba(255,255,255,.03)", borderRadius: 12, padding: 18, border: "1px solid rgba(255,255,255,.06)" }}>
          <div style={{ fontSize: 10, color: C.g500, marginBottom: 2 }}>Total de recordatorios</div>
          <div style={{ fontSize: 26, fontWeight: 800 }}>{d.total}</div>
          <div style={{ fontSize: 10, color: C.g500 }}>Notificaciones enviadas</div>
        </div>
        <div style={{ background: "rgba(255,255,255,.03)", borderRadius: 12, padding: 18, border: "1px solid rgba(255,255,255,.06)" }}>
          <div style={{ fontSize: 10, color: C.g500, marginBottom: 2 }}>Tasa de entrega</div>
          <div style={{ fontSize: 26, fontWeight: 800 }}>{d.tasa}</div>
          <div style={{ fontSize: 10, color: C.s400 }}>{d.tasaSub}</div>
        </div>
        {size === 0 && (
          <div style={{ background: "rgba(255,255,255,.03)", borderRadius: 12, padding: 18, border: "1px solid rgba(255,255,255,.06)" }}>
            <div style={{ fontSize: 10, color: C.g500, marginBottom: 2 }}>Llamadas AI este mes</div>
            <div style={{ fontSize: 26, fontWeight: 800 }}>{d.llamadas}</div>
            <div style={{ fontSize: 10, color: C.b400 }}>{d.llamadasSub}</div>
          </div>
        )}
      </div>

      {/* Charts row */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 16 }}>
        {/* Tendencia semanal - simplified */}
        <div style={{ background: "rgba(255,255,255,.03)", borderRadius: 12, padding: 16, border: "1px solid rgba(255,255,255,.06)" }}>
          <div style={{ fontSize: 12, fontWeight: 700, marginBottom: 2 }}>Tendencia semanal</div>
          <div style={{ fontSize: 10, color: C.g500, marginBottom: 12 }}>Recordatorios por semana ({"\u00FA"}ltimos 3 meses)</div>
          <div style={{ display: "flex", alignItems: "flex-end", gap: 3, height: 60 }}>
            {(size === 0 ? [20, 35, 50, 40, 60, 75, 55, 80, 70, 90, 85, 95] : [10, 15, 20, 25, 30, 40, 45, 55, 70, 85, 95, 100]).map((h, i) => (
              <div key={i} style={{ flex: 1, height: h + "%", background: "linear-gradient(180deg," + C.a500 + "," + C.b500 + ")", borderRadius: "3px 3px 0 0", opacity: .7 + (i / 24) }} />
            ))}
          </div>
        </div>
        {/* Recordatorios hasta el pago */}
        <div style={{ background: "rgba(255,255,255,.03)", borderRadius: 12, padding: 16, border: "1px solid rgba(255,255,255,.06)" }}>
          <div style={{ fontSize: 12, fontWeight: 700, marginBottom: 2 }}>Recordatorios hasta el pago</div>
          <div style={{ fontSize: 10, color: C.g500, marginBottom: 12 }}>Cobros pagados seg{"\u00FA"}n cantidad de recordatorios</div>
          <div style={{ display: "flex", alignItems: "flex-end", gap: 4, height: 60 }}>
            {d.barData.map((v, i) => (
              <div key={i} style={{ flex: 1, textAlign: "center" }}>
                <div style={{ height: Math.max(4, (v / barMax) * 60), background: C.g600, borderRadius: "3px 3px 0 0", marginBottom: 3 }} />
                <div style={{ fontSize: 8, color: C.g500 }}>{barLabels[i]}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Table */}
      <div style={{ background: "rgba(255,255,255,.03)", borderRadius: 12, padding: 14, border: "1px solid rgba(255,255,255,.06)", overflowX: "auto" }}>
        <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: 10, gap: 8 }}>
          <div style={{ padding: "5px 12px", borderRadius: 6, background: "rgba(255,255,255,.05)", fontSize: 10, color: C.g400, display: "flex", alignItems: "center", gap: 4 }}>{"\u{1F50D}"} Buscar</div>
        </div>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 11 }}>
          <thead>
            <tr style={{ borderBottom: "1px solid rgba(255,255,255,.06)" }}>
              {["ID", "Cobro", "Canal", "Cobranza", "Regla", "Estado", "Creado"].map((h, i) => (
                <th key={i} style={{ padding: "6px 8px", textAlign: "left", color: C.g500, fontWeight: 600, fontSize: 10, whiteSpace: "nowrap" }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {d.tabla.map((r, i) => (
              <tr key={i} style={{ borderBottom: "1px solid rgba(255,255,255,.03)" }}>
                <td style={{ padding: "6px 8px", color: C.g400, fontSize: 10, fontFamily: "monospace" }}>{r.id}</td>
                <td style={{ padding: "6px 8px", color: C.g300, fontSize: 10, maxWidth: 200, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{r.cobro}</td>
                <td style={{ padding: "6px 8px" }}><span style={{ padding: "2px 6px", borderRadius: 4, background: r.canal === "WhatsApp" ? "rgba(37,211,102,.1)" : "rgba(99,102,241,.1)", color: r.canal === "WhatsApp" ? "#25d366" : C.a400, fontSize: 9, fontWeight: 600 }}>{r.canal}</span></td>
                <td style={{ padding: "6px 8px", color: C.g400, fontSize: 10 }}>{r.cobranza}</td>
                <td style={{ padding: "6px 8px" }}><span style={{ padding: "2px 6px", borderRadius: 4, background: "rgba(255,255,255,.04)", color: C.g500, fontSize: 9 }}>{r.regla}</span></td>
                <td style={{ padding: "6px 8px" }}><span style={{ display: "flex", alignItems: "center", gap: 3, fontSize: 9, color: C.s400 }}><span style={{ width: 5, height: 5, borderRadius: "50%", background: C.s400 }} />{r.estado}</span></td>
                <td style={{ padding: "6px 8px", color: C.g500, fontSize: 10, whiteSpace: "nowrap" }}>{r.creado}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function InvoiceLifecycle() {
  const [activeNode, setAN] = useState(null);
  const [r, v] = useVis();
  const [step, setStep] = useState(-1);
  useEffect(() => { if (!v) return; const t = [0,1,2,3,4,5,6].map(i => setTimeout(() => setStep(i), 300 + i * 300)); return () => t.forEach(clearTimeout); }, [v]);

  const nodes = [
    { id: 0, label: "Recordatorio", icon: "\u{1F514}", day: "Antes de vencer", color: C.b500, desc: "Aviso previo para que el usuario se prepare y pague a tiempo.", detail: "Reduce la cartera vencida desde el inicio. Los usuarios que reciben recordatorio previo pagan 2.3x más rápido que los que no." },
    { id: 1, label: "Vence hoy", icon: "\u{1F4C5}", day: "Día 0", color: C.a500, desc: "Mensaje con link de pago directo + PDF adjunto de la factura.", detail: "El momento de mayor urgencia. El usuario ve su factura, el monto y paga en 4 clicks sin salir de WhatsApp. 60%+ de los pagos ocurren aquí." },
    { id: 2, label: "Vencido", icon: "\u{1F551}", day: "Día 1-5", color: C.w500, desc: "Recordatorio inteligente: hora y canal óptimo según comportamiento del usuario.", detail: "Recupera usuarios que olvidaron o no pudieron pagar. La IA elige el mejor momento: Juan paga viernes 6pm → mensaje viernes 5pm. María paga día de quincena → mensaje día 15." },
    { id: 3, label: "Pre-corte", icon: "\u26A0\uFE0F", day: "Día 6-9", color: "#F97316", desc: "Escalamiento: cambia canal, tono del mensaje. Urgencia alta.", detail: "Activar la urgencia antes del corte para evitar la desconexión. El usuario entiende que el corte es inminente y tiene una última ventana para pagar sin perder el servicio." },
    { id: 4, label: "Llamada IA", icon: "\u{1F4DE}", day: "Día 10-15", color: C.e500, desc: "Agente de voz IA llama, contextualiza la deuda, envía link en la llamada.", detail: "Llegar a usuarios que no responden a canales digitales. Personas mayores o que no leen mensajes reciben una llamada con voz natural que les guía al pago." },
    { id: 5, label: "Cortado", icon: "\u{1F6AB}", day: "Post-corte", color: C.g600, desc: "Notificación de corte + última oportunidad de pago para reconexión.", detail: "Convertir el corte en oportunidad de recuperación inmediata. El usuario puede pagar y reactivar su servicio automáticamente sin llamar al ISP." },
    { id: 6, label: "Recuperación", icon: "\u{2764}\uFE0F", day: "Re-activación", color: C.s500, desc: "Secuencia de re-activación para usuarios que cancelaron o fueron cortados.", detail: "Recuperar ingresos de usuarios perdidos. Campañas programadas con ofertas o facilidades de pago para re-enganchar suscriptores inactivos." }
  ];

  return (
    <Box dark id="cobranza">
      <Fade>
        <Tag dark>Motor de cobranza</Tag>
        <h2 style={{ fontSize: "clamp(26px,4.5vw,44px)", fontWeight: 800, letterSpacing: "-.03em", margin: "14px 0 10px", lineHeight: 1.08 }}>
          El ciclo de vida completo<br /><span style={{ color: C.a400 }}>de cada factura</span>
        </h2>
        <p style={{ fontSize: 16, color: C.g400, maxWidth: 600, lineHeight: 1.6, marginBottom: 12 }}>
          Tú pones las reglas de negocio. OnePay ejecuta con IA.
        </p>
        <p style={{ fontSize: 13, color: C.g500, maxWidth: 560, lineHeight: 1.5, marginBottom: 36 }}>
          Configura una vez: fecha de vencimiento, etapas, canales y plantillas. La IA decide cuándo, por dónde y qué mensaje enviar según el comportamiento de cada usuario.
        </p>
      </Fade>

      {/* Flow nodes */}
      <div ref={r} style={{ display: "flex", flexDirection: "column", gap: 4 }}>
        {nodes.map((n, i) => {
          const act = step >= i;
          const open = activeNode === i;
          return (
            <Fade key={i} delay={.03 * i}>
              <div onClick={() => setAN(open ? null : i)} style={{ display: "flex", gap: 14, alignItems: "flex-start", opacity: act ? 1 : .2, transition: "all .5s cubic-bezier(.16,1,.3,1)", cursor: "pointer" }}>
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", flexShrink: 0 }}>
                  <div style={{ width: 40, height: 40, borderRadius: "50%", background: act ? n.color : "rgba(255,255,255,.04)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16, transition: "all .4s", boxShadow: act ? "0 0 16px " + n.color + "25" : "none" }}>{n.icon}</div>
                  {i < nodes.length - 1 && <div style={{ width: 2, height: 20, background: act ? n.color + "40" : "rgba(255,255,255,.04)", transition: "background .4s" }} />}
                </div>
                <div style={{ background: open ? "rgba(255,255,255,.06)" : "rgba(255,255,255,.02)", borderRadius: 12, padding: "14px 18px", flex: 1, border: "1px solid " + (open ? "rgba(255,255,255,.1)" : "rgba(255,255,255,.03)"), transition: "all .4s" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <div>
                      <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                        <span style={{ fontSize: 10, fontWeight: 600, textTransform: "uppercase", letterSpacing: ".05em", color: n.color }}>{n.day}</span>
                        <span style={{ fontSize: 10, color: C.g500 }}>{"\u2022"}</span>
                        <span style={{ fontSize: 13, fontWeight: 700, color: "#fff" }}>{n.label}</span>
                      </div>
                      <p style={{ fontSize: 12, color: C.g400, margin: "3px 0 0", lineHeight: 1.4 }}>{n.desc}</p>
                    </div>
                    <span style={{ fontSize: 12, color: C.g500, transition: "transform .3s", transform: open ? "rotate(180deg)" : "rotate(0)" }}>{"\u25BE"}</span>
                  </div>
                  <div style={{ maxHeight: open ? 120 : 0, overflow: "hidden", transition: "max-height .4s cubic-bezier(.16,1,.3,1), opacity .3s", opacity: open ? 1 : 0 }}>
                    <p style={{ fontSize: 12, color: C.g300, lineHeight: 1.55, margin: "8px 0 0", paddingTop: 8, borderTop: "1px solid rgba(255,255,255,.06)" }}>{n.detail}</p>
                  </div>
                </div>
              </div>
            </Fade>
          );
        })}
      </div>

      {/* Callout: each step has a branch: paid? → conciliated */}
      <Fade delay={.3}>
        <div style={{ marginTop: 28, padding: "16px 20px", borderRadius: 12, background: "rgba(99,102,241,.06)", border: "1px solid rgba(99,102,241,.08)" }}>
          <p style={{ fontSize: 13, color: C.g300, margin: 0, lineHeight: 1.5 }}>
            <strong style={{ color: "#fff" }}>En cada etapa:</strong> si el usuario paga, se concilia automáticamente y la secuencia se detiene. <strong style={{ color: C.a400 }}>Sin intervención manual.</strong> La mayoría paga sin necesitar más de 1 recordatorio.
          </p>
        </div>
      </Fade>

      {/* Dashboard mockup - OnePay style */}
      <Fade delay={.4}>
        <DashboardCobranza />
      </Fade>
    </Box>
  );
}

function Reconciliation() {
  const [tab, sTab] = useState(0);
  const [balFilter, setBalFilter] = useState(0);
  return (
    <Box white id="conciliacion">
      <Fade>
        <Tag>Conciliación</Tag>
        <h2 style={{ fontSize: "clamp(26px,4.5vw,44px)", fontWeight: 800, letterSpacing: "-.03em", margin: "14px 0 10px", lineHeight: 1.08 }}>
          Cada peso rastreado.<br /><span style={{ color: C.g400 }}>Cada movimiento conciliado.</span>
        </h2>
        <p style={{ fontSize: 16, color: C.g500, maxWidth: 560, lineHeight: 1.6, marginBottom: 28 }}>
          Conciliación operativa para el día a día. Contable para tu equipo financiero. Descargable en Excel y PDF.
        </p>
      </Fade>

      <Fade delay={.1}>
        <div style={{ display: "flex", gap: 5, marginBottom: 28 }}>
          {["\u{1F4CB} Operativa", "\u{1F4CA} Contable"].map((t, i) => (
            <button key={i} onClick={() => sTab(i)} style={{ padding: "9px 18px", borderRadius: 100, border: "none", cursor: "pointer", fontSize: 13, fontWeight: 600, transition: "all .3s", background: tab === i ? C.p950 : "#fff", color: tab === i ? "#fff" : C.g600, boxShadow: tab === i ? "0 6px 20px rgba(9,12,28,.14)" : "0 1px 3px rgba(0,0,0,.04)" }}>{t}</button>
          ))}
        </div>
      </Fade>

      {tab === 0 && <Fade delay={.15}>
        <div style={{ background: C.g50, borderRadius: 18, padding: 24, border: "1px solid " + C.g200 }}>
          {/* Status flow */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 6, marginBottom: 24, flexWrap: "wrap" }}>
            {[{ l: "Factura", ic: "\u{1F4C4}", c: C.b500 }, { l: "Cobro", ic: "\u{1F4E8}", c: C.a500 }, { l: "Pago", ic: "\u2705", c: C.s500 }].map((s, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 6 }}>
                <div style={{ width: 42, height: 42, borderRadius: "50%", background: s.c + "12", border: "2px solid " + s.c, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16 }}>{s.ic}</div>
                <span style={{ fontSize: 12, fontWeight: 600, color: C.g700 }}>{s.l}</span>
                {i < 2 && <div style={{ width: 40, height: 2, background: C.g300, borderRadius: 1 }} />}
              </div>
            ))}
          </div>

          <h3 style={{ fontSize: 15, fontWeight: 700, marginBottom: 12 }}>Detalle por factura</h3>
          {/* Factura mockup */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(240px,1fr))", gap: 12 }}>
            <div style={{ background: "#fff", borderRadius: 12, padding: 16, border: "1px solid " + C.g200 }}>
              <div style={{ fontSize: 11, fontWeight: 600, color: C.g500, marginBottom: 8 }}>Información de la factura</div>
              {[["Nombre", "Factura - 101207"], ["Proveedor", "wisphub"], ["Monto", "$65.000"], ["Estado", "Conciliada"]].map(([k, v], i) => (
                <div key={i} style={{ display: "flex", justifyContent: "space-between", fontSize: 12, padding: "4px 0", borderBottom: "1px solid " + C.g100 }}>
                  <span style={{ color: C.g500 }}>{k}</span>
                  <span style={{ fontWeight: 600, color: v === "Conciliada" ? C.s500 : C.g700 }}>{v}</span>
                </div>
              ))}
            </div>
            <div style={{ background: "#fff", borderRadius: 12, padding: 16, border: "1px solid " + C.g200 }}>
              <div style={{ fontSize: 11, fontWeight: 600, color: C.g500, marginBottom: 8 }}>Intento de pago</div>
              {[["Estado", "Pagado"], ["Monto", "$65.000"], ["Método", "NEQUI ****0005"], ["Tipo", "Depósito electrónico"]].map(([k, v], i) => (
                <div key={i} style={{ display: "flex", justifyContent: "space-between", fontSize: 12, padding: "4px 0", borderBottom: "1px solid " + C.g100 }}>
                  <span style={{ color: C.g500 }}>{k}</span>
                  <span style={{ fontWeight: 600, color: v === "Pagado" ? C.s500 : C.g700 }}>{v}</span>
                </div>
              ))}
            </div>
          </div>

          <div style={{ marginTop: 16, padding: "12px 16px", borderRadius: 10, background: C.a50, border: "1px solid " + C.a200 }}>
            <p style={{ fontSize: 12, color: C.g600, margin: 0, lineHeight: 1.5 }}>
              <strong style={{ color: C.a500 }}>Cada factura tiene trazabilidad completa:</strong> con qué pagó, si abrió el mensaje, si abandonó el pago, cuántos recordatorios recibió, por qué canal, y cuándo se concilió.
            </p>
          </div>
        </div>
      </Fade>}

      {tab === 1 && <Fade delay={.15}>
        <div style={{ background: C.g50, borderRadius: 18, padding: 24, border: "1px solid " + C.g200 }}>
          <h3 style={{ fontSize: 15, fontWeight: 700, marginBottom: 6 }}>Conciliación por nodos</h3>
          <p style={{ fontSize: 13, color: C.g500, lineHeight: 1.5, marginBottom: 16 }}>Cada nodo agrupa créditos y débitos relacionados. Tu equipo financiero ve todo cuadrado. Exportable a Excel y PDF.</p>

          {/* Node visualization */}
          <div style={{ background: "#fff", borderRadius: 14, padding: 18, border: "1px solid " + C.g200, marginBottom: 16 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 14 }}>
              <div style={{ width: 10, height: 10, borderRadius: "50%", background: C.a500 }} />
              <span style={{ fontSize: 13, fontWeight: 700, fontFamily: "monospace", color: C.p950 }}>Nodo a78a4d73</span>
            </div>
            {[
              { concept: "Retención en la fuente", val: "-$1.315,16", neg: true },
              { concept: "Descuento por cargo extra ($85.000)", val: "-$2.677,50", neg: true },
              { concept: "Pago aprobado", val: "+$87.677,50", neg: false }
            ].map((m, i) => (
              <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "8px 12px", borderRadius: 8, background: i % 2 === 0 ? C.g50 : "#fff", marginBottom: 3 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <div style={{ width: 16, height: 2, background: C.a500 + "40", borderRadius: 1 }} />
                  <span style={{ fontSize: 12, color: C.g600 }}>{m.concept}</span>
                </div>
                <span style={{ fontSize: 13, fontWeight: 700, color: m.neg ? C.e500 : C.s500 }}>{m.val}</span>
              </div>
            ))}
          </div>

          {/* Balance history mockup */}
          <div style={{ background: "#fff", borderRadius: 14, padding: 18, border: "1px solid " + C.g200 }}>
            <div style={{ fontSize: 13, fontWeight: 700, marginBottom: 4 }}>Histórico de saldos</div>
            <div style={{ display: "flex", gap: 12, fontSize: 11, color: C.g500, marginBottom: 12 }}>
              <span>{"\u2191"} $53.518.532</span><span>{"\u2193"} $34.639.458</span>
            </div>
            {/* Simplified chart mockup */}
            <div style={{ height: 60, borderRadius: 8, background: "linear-gradient(180deg, " + C.s500 + "12 0%, transparent 100%)", position: "relative", overflow: "hidden", marginBottom: 10 }}>
              <svg width="100%" height="60" viewBox="0 0 400 60" preserveAspectRatio="none">
                <path d="M0,30 C40,28 80,20 120,22 C160,24 200,35 240,38 C280,32 320,18 360,15 C380,14 400,10 400,10" fill="none" stroke={C.s500} strokeWidth="2" />
                <path d="M0,30 C40,28 80,20 120,22 C160,24 200,35 240,38 C280,32 320,18 360,15 C380,14 400,10 400,10 L400,60 L0,60 Z" fill={C.s500 + "08"} />
              </svg>
            </div>
            <div style={{ display: "flex", gap: 6, fontSize: 11 }}>
              {["Todos", "Entradas", "Salidas", "Reservas"].map((f, i) => (
                <span key={i} onClick={() => setBalFilter(i)} style={{ padding: "3px 10px", borderRadius: 6, background: balFilter === i ? C.p950 : C.g100, color: balFilter === i ? "#fff" : C.g500, fontWeight: 600, cursor: "pointer", transition: "all .2s" }}>{f}</span>
              ))}
            </div>
            {balFilter === 0 && <div style={{ marginTop: 10, fontSize: 11, color: C.g500 }}>
              {[{ c: "Pago aprobado", v: "+$85.000", g: true }, { c: "Procesamiento OnePay", v: "-$952", g: false }, { c: "Pago aprobado", v: "+$65.000", g: true }].map((r, i) => (
                <div key={i} style={{ display: "flex", justifyContent: "space-between", padding: "5px 0", borderBottom: "1px solid " + C.g100 }}>
                  <span>{r.c}</span><span style={{ fontWeight: 700, color: r.g ? C.s500 : C.e500 }}>{r.v}</span>
                </div>
              ))}
            </div>}
            {balFilter === 1 && <div style={{ marginTop: 10, fontSize: 11, color: C.g500 }}>
              {[{ c: "Pago aprobado", v: "+$85.000" }, { c: "Pago aprobado", v: "+$65.000" }, { c: "Pago aprobado", v: "+$60.000" }].map((r, i) => (
                <div key={i} style={{ display: "flex", justifyContent: "space-between", padding: "5px 0", borderBottom: "1px solid " + C.g100 }}>
                  <span>{r.c}</span><span style={{ fontWeight: 700, color: C.s500 }}>{r.v}</span>
                </div>
              ))}
            </div>}
            {balFilter === 2 && <div style={{ marginTop: 10, fontSize: 11, color: C.g500 }}>
              {[{ c: "Procesamiento OnePay", v: "-$952" }, { c: "Retención en la fuente", v: "-$1.315" }, { c: "Descuento cargo extra", v: "-$2.678" }].map((r, i) => (
                <div key={i} style={{ display: "flex", justifyContent: "space-between", padding: "5px 0", borderBottom: "1px solid " + C.g100 }}>
                  <span>{r.c}</span><span style={{ fontWeight: 700, color: C.e500 }}>{r.v}</span>
                </div>
              ))}
            </div>}
            {balFilter === 3 && <div style={{ marginTop: 10, fontSize: 11, color: C.g400, fontStyle: "italic" }}>Sin reservas activas</div>}
          </div>

          <div style={{ marginTop: 16, padding: "12px 16px", borderRadius: 10, background: C.a50, border: "1px solid " + C.a200 }}>
            <p style={{ fontSize: 12, color: C.g600, margin: 0, lineHeight: 1.5 }}>
              <strong style={{ color: C.a500 }}>Descarga en Excel y PDF cuando quieras.</strong> Cada movimiento ya está categorizado y agrupado por nodo. Tu equipo financiero cuadra en minutos, no en días.
            </p>
          </div>
        </div>
      </Fade>}
    </Box>
  );
}

function Pricing() {
  // === ROI Calculator ===
  const [subs, setSubs] = useState(5000);
  const [ticket, setTicket] = useState(65000);
  const [tasa, setTasa] = useState(70);
  const [personas, setPersonas] = useState(2);
  const [planIdx, setPlanIdx] = useState(-1); // -1 = auto-sugerido

  // Plan: auto-sugerido o manual
  const planSugerido = subs <= 3000 ? 0 : subs <= 12000 ? 1 : 2;
  const plan = planIdx === -1 ? planSugerido : planIdx;
  const planNames = ["Essential", "Pro", "Growth"];

  // Facturación y recaudo
  const factMensual = subs * ticket;
  const recaudoActual = factMensual * (tasa / 100);

  // OnePay mejora tasa de recaudo en +12pp (conservador)
  const tasaOnePay = Math.min(tasa + 12, 97);
  const recaudoOnePay = factMensual * (tasaOnePay / 100);
  const plataNueva = recaudoOnePay - recaudoActual;

  // Capacidad liberada: equipo de cobranza se dedica a tareas de mayor valor
  const capacidadLiberada = personas * 2900000 * 0.8;

  // Velocidad de cobro (dato complementario)
  const diasOnePay = 5.5;
  const diasMercado = 18;

  // === Costo OnePay ===
  const cobrosExitosos = Math.round(subs * (tasaOnePay / 100));
  const cobrosPSE = Math.round(cobrosExitosos * 0.95);
  const cobrosTC = Math.round(cobrosExitosos * 0.05);

  const costosPlan = [
    { saas: 600000, pse: 2200, tcPct: 0.025, tcFix: 800 },
    { saas: 1800000, pse: 1680, tcPct: 0.02, tcFix: 500 },
    { saas: 5500000, pse: 1000, tcPct: 0.0185, tcFix: 300 }
  ];
  const cp = costosPlan[plan];
  const costoTx = cobrosPSE * cp.pse + cobrosTC * (ticket * cp.tcPct + cp.tcFix);
  const costoSaaS = cp.saas;
  const costoTotal = costoTx + costoSaaS;

  // Costo mensajería (complementario, fuera del ROI)
  const costoMensajeria = subs * 5 * 8;

  // ROI
  const beneficioTotal = plataNueva + capacidadLiberada;
  const roiNeto = beneficioTotal - costoTotal;
  const roiPct = costoTotal > 0 ? Math.round((roiNeto / costoTotal) * 100) : 0;

  const plans = [
    { n: "Essential", saas: "$600.000", tc: "2.5% + 800", pse: "2.200", dispACH: "$1.500 + 0.2%", dispTurbo: "$2.500 + 0.2%", calls: "Sin llamadas", callNote: null, feats: ["Recaudo + suscripciones", "Procesamiento local", "Tesorería básica", "2 recordatorios/usuario/mes"] },
    { n: "Pro", saas: "$1.800.000", tc: "2% + 500", pse: "1.680", dispACH: "$1.000 + 0.2%", dispTurbo: "$2.000 + 0.2%", calls: "500/mes", callNote: "Numeración USA por defecto. Colombia: +$590.000/mes", feats: ["Todo Essential +", "WhatsApp personalizado", "Plantillas de cobranza", "3 recordatorios/usuario/mes"], star: true },
    { n: "Growth", saas: "$5.500.000", tc: "1.85% + 300", pse: "1.000", dispACH: "$800 + 0.2%", dispTurbo: "$1.500 + 0.2%", calls: "1.250/mes", callNote: "Numeración USA por defecto. Colombia: +$1.350.000/mes", feats: ["Todo Pro +", "Tesorería corporativa", "Plantillas personalizadas", "Soporte prioritario 8x5", "Recordatorios ilimitados"] }
  ];

  return (
    <Box id="precios">
      <Fade>
        <Tag>Precios</Tag>
        <h2 style={{ fontSize: "clamp(26px,4.5vw,44px)", fontWeight: 800, letterSpacing: "-.03em", margin: "14px 0 10px", lineHeight: 1.08 }}>Transparente. Sin letra chica.</h2>
        <p style={{ fontSize: 16, color: C.g500, maxWidth: 540, lineHeight: 1.6, marginBottom: 32 }}>Tarifa transaccional + SaaS mensual. Sin permanencia. Resultado desde el primer mes.</p>
      </Fade>

      {/* Plan cards */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(230px,1fr))", gap: 14, marginBottom: 48 }}>
        {plans.map((p, i) => (
          <Fade key={i} delay={.06 * i}>
            <div style={{ background: "#fff", borderRadius: 18, padding: 24, border: plan === i ? "2px solid " + C.a500 : "1px solid " + C.g200, position: "relative", transition: "all .4s", boxShadow: plan === i ? "0 8px 32px rgba(99,102,241,.12)" : "none" }}>
              {p.star && <div style={{ position: "absolute", top: -10, right: 16, padding: "3px 12px", borderRadius: 100, background: C.a500, color: "#fff", fontSize: 10, fontWeight: 700 }}>RECOMENDADO</div>}
              {plan === i && <div style={{ position: "absolute", top: -10, left: 16, padding: "3px 10px", borderRadius: 100, background: C.s500, color: "#fff", fontSize: 10, fontWeight: 700 }}>{planIdx === -1 ? "Tu plan ideal" : "Seleccionado"}</div>}
              {plan === i && planIdx !== -1 && planIdx !== planSugerido && <div style={{ fontSize: 10, color: "#FBBF24", marginTop: 2, fontWeight: 600 }}>Sugerido: {planNames[planSugerido]}</div>}
              <h3 style={{ fontSize: 20, fontWeight: 800, marginBottom: 4 }}>{p.n}</h3>
              <div style={{ fontSize: 24, fontWeight: 800, color: C.a500, marginBottom: 2 }}>{p.saas}</div>
              <div style={{ fontSize: 11, color: C.g500, marginBottom: 14 }}>COP / mes + transaccional</div>

              <div style={{ fontSize: 12, color: C.g600, marginBottom: 12 }}>
                {[["Tarjetas", p.tc + " + IVA"], ["PSE/billeteras", p.pse + " + IVA"], ["Dispersión ACH", p.dispACH + " + IVA"], ["Dispersión Turbo", p.dispTurbo + " + IVA"], ["Llamadas IA", p.calls]].map(([k, v], j) => (
                  <div key={j} style={{ display: "flex", justifyContent: "space-between", padding: "4px 0", borderBottom: "1px solid " + C.g100 }}>
                    <span style={{ color: C.g500 }}>{k}</span><span style={{ fontWeight: 600 }}>{v}</span>
                  </div>
                ))}
                {p.callNote && <div style={{ fontSize: 10, color: C.g400, marginTop: 4, fontStyle: "italic" }}>{p.callNote}</div>}
              </div>

              <div style={{ fontSize: 12, color: C.g600 }}>
                {p.feats.map((f, j) => (
                  <div key={j} style={{ display: "flex", gap: 5, alignItems: "center", marginBottom: 4 }}>
                    <span style={{ color: C.s500, fontSize: 10 }}>{"\u2713"}</span>{f}
                  </div>
                ))}
              </div>
            </div>
          </Fade>
        ))}
      </div>

      {/* ROI Calculator */}
      <Fade delay={.2}>
        <div style={{ background: C.p950, borderRadius: 20, padding: "clamp(24px,4vw,36px)", color: "#fff" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 20 }}>
            <span style={{ fontSize: 22 }}>{"\u{1F4B0}"}</span>
            <h3 style={{ fontSize: 20, fontWeight: 800, margin: 0 }}>Calculadora de ROI</h3>
          </div>
          <p style={{ fontSize: 13, color: C.g400, marginBottom: 24, lineHeight: 1.5 }}>Ajusta los parámetros de tu ISP y ve el impacto estimado de OnePay en tu negocio.</p>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))", gap: 20, marginBottom: 28 }}>
            <div>
              <label style={{ fontSize: 12, fontWeight: 600, color: "rgba(255,255,255,.5)", display: "block", marginBottom: 6 }}>Suscriptores activos: <strong style={{ color: "#fff" }}>{dot(subs)}</strong></label>
              <input type="range" min={500} max={50000} step={500} value={subs} onChange={e => setSubs(+e.target.value)} style={{ width: "100%", accentColor: "#6366F1" }} />
            </div>
            <div>
              <label style={{ fontSize: 12, fontWeight: 600, color: "rgba(255,255,255,.5)", display: "block", marginBottom: 6 }}>Ticket promedio: <strong style={{ color: "#fff" }}>${dot(ticket)}</strong></label>
              <input type="range" min={30000} max={200000} step={5000} value={ticket} onChange={e => setTicket(+e.target.value)} style={{ width: "100%", accentColor: "#6366F1" }} />
            </div>
            <div>
              <label style={{ fontSize: 12, fontWeight: 600, color: "rgba(255,255,255,.5)", display: "block", marginBottom: 6 }}>Tasa recaudo actual: <strong style={{ color: "#fff" }}>{tasa}%</strong></label>
              <input type="range" min={50} max={95} step={1} value={tasa} onChange={e => setTasa(+e.target.value)} style={{ width: "100%", accentColor: "#6366F1" }} />
            </div>
            <div>
              <label style={{ fontSize: 12, fontWeight: 600, color: "rgba(255,255,255,.5)", display: "block", marginBottom: 6 }}>Personas en cobranza: <strong style={{ color: "#fff" }}>{personas}</strong></label>
              <input type="range" min={0} max={10} step={1} value={personas} onChange={e => setPersonas(+e.target.value)} style={{ width: "100%", accentColor: "#6366F1" }} />
            </div>
            <div>
              <label style={{ fontSize: 12, fontWeight: 600, color: "rgba(255,255,255,.5)", display: "block", marginBottom: 6 }}>Plan: <strong style={{ color: "#fff" }}>{planIdx === -1 ? planNames[planSugerido] + " (sugerido)" : planNames[plan]}</strong></label>
              <div style={{ display: "flex", gap: 6, marginTop: 6, flexWrap: "wrap" }}>
                <button onClick={() => setPlanIdx(-1)} style={{
                  padding: "6px 12px", borderRadius: 8, border: "none", cursor: "pointer",
                  fontSize: 11, fontWeight: 600,
                  background: planIdx === -1 ? "rgba(99,102,241,.2)" : "rgba(255,255,255,.06)",
                  color: planIdx === -1 ? "#A78BFA" : "rgba(255,255,255,.5)"
                }}>Auto</button>
                {planNames.map((n, i) => (
                  <button key={i} onClick={() => setPlanIdx(i)} style={{
                    padding: "6px 12px", borderRadius: 8, border: "none", cursor: "pointer",
                    fontSize: 11, fontWeight: 600,
                    background: plan === i && planIdx !== -1 ? "rgba(99,102,241,.2)" : "rgba(255,255,255,.06)",
                    color: plan === i && planIdx !== -1 ? "#A78BFA" : "rgba(255,255,255,.5)"
                  }}>{n}</button>
                ))}
              </div>
            </div>
          </div>

          {/* Results */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(155px,1fr))", gap: 10 }}>
            <div style={{ background: "rgba(99,102,241,.08)", borderRadius: 14, padding: 18, border: "1px solid rgba(99,102,241,.12)" }}>
              <div style={{ fontSize: 10, color: "rgba(255,255,255,.5)", textTransform: "uppercase", letterSpacing: ".05em" }}>Plan</div>
              <div style={{ fontSize: 20, fontWeight: 800, color: "#A78BFA", marginTop: 4 }}>{planNames[plan]}</div>
              {planIdx !== -1 && planIdx !== planSugerido && (
                <div style={{ fontSize: 10, color: "#FBBF24", marginTop: 4 }}>Sugerido: {planNames[planSugerido]}</div>
              )}
            </div>
            <div style={{ background: "rgba(34,197,94,.06)", borderRadius: 14, padding: 18, border: "1px solid rgba(34,197,94,.1)" }}>
              <div style={{ fontSize: 10, color: "rgba(255,255,255,.5)", textTransform: "uppercase", letterSpacing: ".05em" }}>Recaudo adicional / mes</div>
              <div style={{ fontSize: 20, fontWeight: 800, color: "#4ADE80", marginTop: 4 }}>${dot(Math.round(plataNueva))}</div>
              <div style={{ fontSize: 10, color: "rgba(255,255,255,.4)", marginTop: 2 }}>Tasa: {tasa}% → {tasaOnePay}%</div>
            </div>
            <div style={{ background: "rgba(59,130,246,.06)", borderRadius: 14, padding: 18, border: "1px solid rgba(59,130,246,.1)" }}>
              <div style={{ fontSize: 10, color: "rgba(255,255,255,.5)", textTransform: "uppercase", letterSpacing: ".05em" }}>Capacidad liberada</div>
              <div style={{ fontSize: 20, fontWeight: 800, color: "#60A5FA", marginTop: 4 }}>${dot(Math.round(capacidadLiberada))}</div>
              <div style={{ fontSize: 10, color: "rgba(255,255,255,.4)", marginTop: 2 }}>{personas} persona{personas !== 1 ? "s" : ""} → tareas de mayor valor</div>
            </div>
            <div style={{ background: "rgba(255,255,255,.04)", borderRadius: 14, padding: 18, border: "1px solid rgba(255,255,255,.06)" }}>
              <div style={{ fontSize: 10, color: "rgba(255,255,255,.5)", textTransform: "uppercase", letterSpacing: ".05em" }}>Inversión OnePay</div>
              <div style={{ fontSize: 20, fontWeight: 800, marginTop: 4, color: "#fff" }}>${dot(Math.round(costoTotal))}</div>
              <div style={{ fontSize: 10, color: "rgba(255,255,255,.4)", marginTop: 2 }}>SaaS ${dot(costoSaaS)} + tx ${dot(Math.round(costoTx))}</div>
            </div>
            <div style={{ background: "rgba(34,197,94,.08)", borderRadius: 14, padding: 18, border: "1px solid rgba(34,197,94,.15)", gridColumn: "span 2" }}>
              <div style={{ fontSize: 10, color: "rgba(255,255,255,.5)", textTransform: "uppercase", letterSpacing: ".05em" }}>ROI neto mensual</div>
              <div style={{ display: "flex", alignItems: "baseline", gap: 12, marginTop: 4 }}>
                <span style={{ fontSize: 28, fontWeight: 800, color: roiNeto > 0 ? "#4ADE80" : "#EF4444" }}>${dot(Math.round(roiNeto))}</span>
                {roiPct > 0 && <span style={{ fontSize: 16, fontWeight: 700, color: "#4ADE80" }}>+{roiPct}% ROI</span>}
              </div>
            </div>
          </div>

          {/* Datos complementarios */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(180px,1fr))", gap: 10, marginTop: 14 }}>
            <div style={{ padding: "12px 16px", borderRadius: 10, background: "rgba(255,255,255,.03)", border: "1px solid rgba(255,255,255,.04)" }}>
              <div style={{ fontSize: 10, color: "rgba(255,255,255,.5)", textTransform: "uppercase" }}>Velocidad de cobro</div>
              <div style={{ fontSize: 14, fontWeight: 700, marginTop: 4 }}>~{diasOnePay} días <span style={{ color: "rgba(255,255,255,.4)", fontWeight: 400 }}>vs {diasMercado} días mercado</span></div>
            </div>
            <div style={{ padding: "12px 16px", borderRadius: 10, background: "rgba(255,255,255,.03)", border: "1px solid rgba(255,255,255,.04)" }}>
              <div style={{ fontSize: 10, color: "rgba(255,255,255,.5)", textTransform: "uppercase" }}>Costo mensajería estimado</div>
              <div style={{ fontSize: 14, fontWeight: 700, marginTop: 4 }}>${dot(costoMensajeria)} <span style={{ color: "rgba(255,255,255,.4)", fontWeight: 400 }}>~5 msg/usuario/mes</span></div>
            </div>
            <div style={{ padding: "12px 16px", borderRadius: 10, background: "rgba(255,255,255,.03)", border: "1px solid rgba(255,255,255,.04)" }}>
              <div style={{ fontSize: 10, color: "rgba(255,255,255,.5)", textTransform: "uppercase" }}>Impacto en churn</div>
              <div style={{ fontSize: 14, fontWeight: 700, marginTop: 4 }}>Cobrar 3x más rápido <span style={{ color: "rgba(255,255,255,.4)", fontWeight: 400 }}>= menos cortes</span></div>
            </div>
          </div>

          {/* Disclaimer */}
          <div style={{ marginTop: 16, padding: "12px 16px", borderRadius: 10, background: "rgba(255,255,255,.03)", border: "1px solid rgba(255,255,255,.04)" }}>
            <p style={{ fontSize: 11, color: "rgba(255,255,255,.4)", margin: 0, lineHeight: 1.5 }}>
              Estimación basada en data real de +60 ISPs activas en OnePay (Feb 2026). Mejora de +12pp en tasa de recaudo. Mix de pago: 95% PSE/billeteras, 5% tarjetas. Capacidad liberada basada en salario mínimo integral ($2.9M/mes) × 80% automatización. Resultados varían según adopción y base de suscriptores.
            </p>
          </div>
        </div>
      </Fade>
    </Box>
  );
}

function Seguridad() {
  return (
    <Box>
      <Fade>
        <Tag>Seguridad</Tag>
        <h2 style={{ fontSize: "clamp(26px,4.5vw,44px)", fontWeight: 800, letterSpacing: "-.03em", margin: "14px 0 10px", lineHeight: 1.08 }}>Tu plata está segura.<br /><span style={{ color: C.g400 }}>La de tus usuarios, también.</span></h2>
        <p style={{ fontSize: 16, color: C.g500, maxWidth: 560, lineHeight: 1.6, marginBottom: 28 }}>Cumplimos los estándares más exigentes de la industria de pagos. Cada transacción está protegida de extremo a extremo.</p>
      </Fade>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(150px,1fr))", gap: 9 }}>
        {[{ l: "PCI DSS Level 1", d: "Máximo estándar en pagos", i: "\u{1F512}" }, { l: "ISO 27001", d: "Seguridad de información", i: "\u{1F6E1}\uFE0F" }, { l: "Adquirente directo", d: "Visa & Mastercard", i: "\u{1F4B3}" }, { l: "Póliza cyber", d: "Cobertura integral", i: "\u{1F4CB}" }].map((s, i) => (
          <Fade key={i} delay={.04 * i}>
            <div style={{ background: "#fff", borderRadius: 14, padding: 20, border: "1px solid " + C.g200, textAlign: "center" }}>
              <span style={{ fontSize: 22 }}>{s.i}</span>
              <div style={{ fontSize: 13, fontWeight: 700, margin: "7px 0 2px" }}>{s.l}</div>
              <div style={{ fontSize: 11, color: C.g500 }}>{s.d}</div>
            </div>
          </Fade>
        ))}
      </div>
    </Box>
  );
}

function Closing() {
  return (
    <Box dark style={{ textAlign: "center", paddingBottom: 70 }}>
      <Fade>
        <div style={{ maxWidth: 720, margin: "0 auto", background: "linear-gradient(135deg," + C.p800 + "," + C.p900 + ")", borderRadius: 24, padding: "clamp(36px,5vw,64px)", position: "relative", overflow: "hidden", border: "1px solid rgba(99,102,241,.06)" }}>
          <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: 400, height: 400, borderRadius: "50%", background: "radial-gradient(circle,rgba(99,102,241,.08) 0%,transparent 55%)", filter: "blur(40px)" }} />
          <div style={{ position: "relative", zIndex: 1 }}>
            <LOGO h={24} />
            <h2 style={{ fontSize: "clamp(26px,4.5vw,40px)", fontWeight: 800, letterSpacing: "-.03em", lineHeight: 1.08, color: "#fff", margin: "22px 0 14px" }}>
              Cobre en 5 días<br />lo que hoy te toma 25.
            </h2>
            <p style={{ fontSize: 16, color: C.g400, lineHeight: 1.6, maxWidth: 420, margin: "0 auto 22px" }}>
              Sin contratar más gente. Sin cambiar tu sistema. Resultados desde la primera semana.
            </p>
            <div style={{ display: "flex", justifyContent: "center", gap: 18, fontSize: 12, color: C.g500, flexWrap: "wrap" }}>
              <span>{"\u2713"} Sin permanencia</span>
              <span>{"\u2713"} Piloto controlado</span>
              <span>{"\u2713"} Soporte total</span>
            </div>
          </div>
        </div>
      </Fade>
      <div style={{ marginTop: 36 }}>
        <LOGO color={C.g500} h={14} />
        <div style={{ fontSize: 10, color: C.g500, marginTop: 5 }}>Recaudo inteligente {"\u00B7"} PCI DSS Level 1</div>
      </div>
    </Box>
  );
}

/* ═════════════════════════════════════════════════════════════
   MAIN EXPORT
   ═════════════════════════════════════════════════════════════ */
export default function App() {
  return (
    <div style={{ fontFamily: "'Inter',-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif", WebkitFontSmoothing: "antialiased" }}>
      <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap" rel="stylesheet" />
      <style>{`*{margin:0;padding:0;box-sizing:border-box}html{scroll-behavior:smooth}::selection{background:rgba(99,102,241,.2)}body{overflow-x:hidden}`}</style>
      <NavBar />
      <Hero />
      <Problema />
      <Insight />
      <Producto />
      <InvoiceLifecycle />
      <Timeline />
      <Data />
      <Reconciliation />
      <Integraciones />
      <Resultados />
      <CicloFinanciero />
      <Pricing />
      <Seguridad />
      <Closing />
    </div>
  );
}
