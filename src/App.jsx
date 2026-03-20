import { useState, useEffect, useRef, useContext } from "react";
import { i18n, LangCtx } from './i18n';

/* ═════════════════════════════════════════════════════════════
   OnePay ISP Sales Presentation — Feb 2026
   Pure React, no external deps beyond what artifact supports
   ═════════════════════════════════════════════════════════════ */

/* ─── Heroicon-style SVG Icons ─── */
const I = ({ d, size = 20, color = "currentColor", sw = 1.5 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round">{d}</svg>
);
const If = ({ d, size = 20, color = "currentColor" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={color}>{d}</svg>
);

const Icon = {
  // Business / Building
  building: (p) => <I {...p} d={<><path d="M3.75 21h16.5M4.5 3h15M5.25 3v18m13.5-18v18M9 6.75h1.5m-1.5 3h1.5m-1.5 3h1.5m3-6H15m-1.5 3H15m-1.5 3H15M9 21v-3.375c0-.621.504-1.125 1.125-1.125h3.75c.621 0 1.125.504 1.125 1.125V21" /></>} />,
  // User
  user: (p) => <I {...p} d={<><path d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" /></>} />,
  // Credit card
  creditCard: (p) => <I {...p} d={<><path d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z" /></>} />,
  // Desktop / Monitor
  monitor: (p) => <I {...p} d={<><path d="M9 17.25v1.007a3 3 0 01-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0115 18.257V17.25m6-12V15a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 15V5.25A2.25 2.25 0 015.25 3h13.5A2.25 2.25 0 0121 5.25z" /></>} />,
  // Phone / Mobile
  phone: (p) => <I {...p} d={<><path d="M10.5 1.5H8.25A2.25 2.25 0 006 3.75v16.5a2.25 2.25 0 002.25 2.25h7.5A2.25 2.25 0 0018 20.25V3.75a2.25 2.25 0 00-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3" /></>} />,
  // Brain / Intelligence
  brain: (p) => <I {...p} d={<><path d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 00-2.455 2.456z" /></>} />,
  // Phone call
  phoneCall: (p) => <I {...p} d={<><path d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" /></>} />,
  // Clipboard / Document
  clipboard: (p) => <I {...p} d={<><path d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25z" /></>} />,
  // Bell / Notification
  bell: (p) => <I {...p} d={<><path d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0" /></>} />,
  // Bolt / Lightning
  bolt: (p) => <I {...p} d={<><path d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" /></>} />,
  // Target / Bullseye
  target: (p) => <I {...p} d={<><path d="M12 9.75v6.75m0 0l-3-3m3 3l3-3m-8.25 6a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z" /><circle cx="12" cy="12" r="3" /><circle cx="12" cy="12" r="7" /><circle cx="12" cy="12" r="1" fill="currentColor" /></>} />,
  // Banknotes / Money
  banknotes: (p) => <I {...p} d={<><path d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm3 0h.008v.008H18V10.5zm-12 0h.008v.008H6V10.5z" /></>} />,
  // Chart bar
  chartBar: (p) => <I {...p} d={<><path d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" /></>} />,
  // Trophy
  trophy: (p) => <I {...p} d={<><path d="M16.5 18.75h-9m9 0a3 3 0 013 3h-15a3 3 0 013-3m9 0v-3.375c0-.621-.503-1.125-1.125-1.125h-.871M7.5 18.75v-3.375c0-.621.504-1.125 1.125-1.125h.872m5.007 0H9.497m5.007 0a7.454 7.454 0 01-.982-3.172M9.497 14.25a7.454 7.454 0 00.981-3.172M5.25 4.236c-.982.143-1.954.317-2.916.52A6.003 6.003 0 007.73 9.728M5.25 4.236V4.5c0 2.108.966 3.99 2.48 5.228M5.25 4.236V2.721C7.456 2.41 9.71 2.25 12 2.25c2.291 0 4.545.16 6.75.47v1.516M18.75 4.236c.982.143 1.954.317 2.916.52A6.003 6.003 0 0016.27 9.728M18.75 4.236V4.5c0 2.108-.966 3.99-2.48 5.228m0 0a6.023 6.023 0 01-2.77.852m0 0a18.15 18.15 0 01-1.5.058 18.15 18.15 0 01-1.5-.058m0 0a6.022 6.022 0 01-2.77-.852" /></>} />,
  // Check circle
  checkCircle: (p) => <I {...p} d={<><path d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></>} />,
  // Lock
  lock: (p) => <I {...p} d={<><path d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" /></>} />,
  // Shield
  shield: (p) => <I {...p} d={<><path d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" /></>} />,
  // Inbox / Download
  inbox: (p) => <I {...p} d={<><path d="M2.25 13.5h3.86a2.25 2.25 0 012.012 1.244l.256.512a2.25 2.25 0 002.013 1.244h3.218a2.25 2.25 0 002.013-1.244l.256-.512a2.25 2.25 0 012.013-1.244h3.859m-19.5.338V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18v-4.162c0-.224-.034-.447-.1-.661L19.24 5.338a2.25 2.25 0 00-2.15-1.588H6.911a2.25 2.25 0 00-2.15 1.588L2.35 13.177a2.25 2.25 0 00-.1.661z" /></>} />,
  // Arrow send / Paper airplane
  paperAirplane: (p) => <I {...p} d={<><path d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" /></>} />,
  // Home
  home: (p) => <I {...p} d={<><path d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" /></>} />,
  // Calendar
  calendar: (p) => <I {...p} d={<><path d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" /></>} />,
  // Clock
  clock: (p) => <I {...p} d={<><path d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" /></>} />,
  // Warning / Exclamation
  warning: (p) => <I {...p} d={<><path d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" /></>} />,
  // No symbol / Ban
  noSymbol: (p) => <I {...p} d={<><path d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" /></>} />,
  // Heart
  heart: (p) => <I {...p} d={<><path d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" /></>} />,
  // Document text
  docText: (p) => <I {...p} d={<><path d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" /></>} />,
  // Envelope
  envelope: (p) => <I {...p} d={<><path d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" /></>} />,
  // Chat bubble
  chatBubble: (p) => <I {...p} d={<><path d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z" /></>} />,
  // Search / Magnifying glass
  search: (p) => <I {...p} d={<><path d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" /></>} />,
  // Eye
  eye: (p) => <I {...p} d={<><path d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" /><path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></>} />,
  // Arrow up / Hand pointer
  cursorClick: (p) => <I {...p} d={<><path d="M15.042 21.672L13.684 16.6m0 0l-2.51 2.225.569-9.47 5.227 7.917-3.286-.672zM12 2.25V4.5m5.834.166l-1.591 1.591M20.25 10.5H18M7.757 14.743l-1.59 1.59M6 10.5H3.75m4.007-4.243l-1.59-1.59" /></>} />,
  // Arrow path / Cycle
  arrowPath: (p) => <I {...p} d={<><path d="M19.5 12c0-1.232-.046-2.453-.138-3.662a4.006 4.006 0 00-3.7-3.7 48.678 48.678 0 00-7.324 0 4.006 4.006 0 00-3.7 3.7c-.017.22-.032.441-.046.662M19.5 12l3-3m-3 3l-3-3m-12 3c0 1.232.046 2.453.138 3.662a4.006 4.006 0 003.7 3.7 48.656 48.656 0 007.324 0 4.006 4.006 0 003.7-3.7c.017-.22.032-.441.046-.662M4.5 12l3 3m-3-3l-3 3" /></>} />,
  // Bank / Institution
  bank: (p) => <I {...p} d={<><path d="M12 21v-8.25M15.75 21v-8.25M8.25 21v-8.25M3 9l9-6 9 6m-1.5 12V10.332A48.36 48.36 0 0012 9.75c-2.551 0-5.056.2-7.5.582V21M3 21h18M12 6.75h.008v.008H12V6.75z" /></>} />,
  // Wifi / Signal
  signal: (p) => <I {...p} d={<><path d="M9.348 14.651a3.75 3.75 0 015.304 0m-7.425-2.121a6.75 6.75 0 019.546 0m-12.427-2.83a10.5 10.5 0 0114.854 0M1.5 7.5a14.25 14.25 0 0120.168-.012M12 18.75h.008v.008H12v-.008z" /></>} />,
};

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
      <path fillRule="evenodd" clipRule="evenodd" d="M33.6412 76.468C38.4171 79.172 43.7628 80.524 49.678 80.524C55.6706 80.524 61.0542 79.172 65.8289 76.468C70.4887 73.881 74.374 70.112 77.089 65.546C79.896 60.964 81.299 55.82 81.297 50.113C81.296 44.406 79.893 39.2617 77.089 34.68C74.36 30.0267 70.5688 26.3481 65.7168 23.6444C60.9382 20.9472 55.5919 19.5986 49.678 19.5986C43.7641 19.5986 38.3804 20.9498 33.5271 23.6522C28.8296 26.2788 24.9082 30.0841 22.1548 34.6878C19.4227 39.2682 18.0573 44.4126 18.0586 50.121C18.0599 55.829 19.4627 60.973 22.2669 65.554C25.0478 70.105 28.966 73.865 33.6412 76.468ZM42.9388 30.1556C42.4728 30.1538 42.011 30.2434 41.58 30.4193C41.1489 30.5952 40.7571 30.854 40.4269 31.1807C40.0968 31.5074 39.8348 31.8956 39.6561 32.3231C39.4773 32.7507 39.3853 33.209 39.3853 33.672V65.349C39.3853 65.812 39.4773 66.27 39.6561 66.698C39.8348 67.125 40.0968 67.513 40.4269 67.84C40.7571 68.167 41.1489 68.425 41.58 68.601C42.011 68.777 42.4728 68.867 42.9388 68.865H57.1566C57.6228 68.867 58.0848 68.778 58.516 68.602C58.9473 68.426 59.3394 68.167 59.6697 67.841C60.0001 67.514 60.2622 67.126 60.4411 66.698C60.62 66.27 60.7121 65.812 60.7121 65.349V33.6759C60.7121 33.2128 60.62 32.7542 60.4411 32.3266C60.2622 31.8989 60.0001 31.5106 59.6697 31.1839C59.3394 30.8571 58.9473 30.5985 58.516 30.4227C58.0848 30.2469 57.6228 30.1574 57.1566 30.1595L42.9388 30.1556Z" fill={fill} />
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

const marqueeCSS = `@keyframes marquee{0%{transform:translateX(0)}100%{transform:translateX(-50%)}}@keyframes marquee-rev{0%{transform:translateX(-50%)}100%{transform:translateX(0)}}`;
const ispHoverCSS = `.isp-logo{filter:grayscale(1) brightness(1.8);mix-blend-mode:screen;opacity:0.5;transition:filter .3s,opacity .3s}.isp-logo:hover{filter:grayscale(0) brightness(1.2);opacity:0.9}`;

function ISPLogoMarquee() {
  const lang = useContext(LangCtx);
  const t = i18n[lang].hero;
  const logoGap = 48;
  const half = Math.ceil(ISP_LOGOS.length / 2);
  const row1 = ISP_LOGOS.slice(0, half);
  const row2 = ISP_LOGOS.slice(half);
  const all1 = [...row1, ...row1, ...row1];
  const all2 = [...row2, ...row2, ...row2];
  const mask = "linear-gradient(90deg, transparent, #000 6%, #000 94%, transparent)";
  return (
    <div style={{ marginTop: 64, marginBottom: 32 }}>
      <span style={{ fontSize: 10, color: C.g500, textTransform: "uppercase", letterSpacing: ".06em", display: "block", marginBottom: 16 }}>{t.marqueeISPLabel}</span>
      <style>{marqueeCSS}{ispHoverCSS}</style>
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        <div style={{ overflow: "hidden", maskImage: mask, WebkitMaskImage: mask }}>
          <div style={{ display: "flex", alignItems: "center", width: "max-content", animation: "marquee 30s linear infinite" }}>
            {all1.map((l, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", justifyContent: "center", height: 36, flexShrink: 0, marginRight: logoGap }}>
                <img className="isp-logo" src={l.src} alt={l.alt} title={l.alt} style={{ height: 26, width: "auto", maxWidth: 110, objectFit: "contain" }} />
              </div>
            ))}
          </div>
        </div>
        <div style={{ overflow: "hidden", maskImage: mask, WebkitMaskImage: mask }}>
          <div style={{ display: "flex", alignItems: "center", width: "max-content", animation: "marquee-rev 35s linear infinite" }}>
            {all2.map((l, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", justifyContent: "center", height: 36, flexShrink: 0, marginRight: logoGap }}>
                <img className="isp-logo" src={l.src} alt={l.alt} title={l.alt} style={{ height: 26, width: "auto", maxWidth: 110, objectFit: "contain" }} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function LogoMarquee() {
  const lang = useContext(LangCtx);
  const t = i18n[lang].hero;
  const logoGap = 48;
  const all = [...LOGOS, ...LOGOS, ...LOGOS, ...LOGOS, ...LOGOS, ...LOGOS];
  return (
    <div style={{ marginTop: 40 }}>
      <span style={{ fontSize: 10, color: C.g500, textTransform: "uppercase", letterSpacing: ".06em", display: "block", marginBottom: 16 }}>{t.marqueeCorpLabel}</span>
      <style>{marqueeCSS}</style>
      <div style={{ overflow: "hidden", maskImage: "linear-gradient(90deg, transparent, #000 6%, #000 94%, transparent)", WebkitMaskImage: "linear-gradient(90deg, transparent, #000 6%, #000 94%, transparent)" }}>
        <div style={{ display: "flex", alignItems: "center", width: "max-content", animation: "marquee 40s linear infinite" }}>
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

function NavBar({ setLang }) {
  const lang = useContext(LangCtx);
  const t = i18n[lang].nav;
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
        <span style={{ fontSize: 10, color: C.g400, letterSpacing: ".06em", textTransform: "uppercase" }}>{t.recaudo}</span>
        <span style={{ padding: "3px 8px", borderRadius: 5, fontSize: 10, fontWeight: 700, background: "rgba(34,197,94,.1)", color: C.s400 }}>{t.pciLabel}</span>
        <button onClick={() => setLang(lang === 'es' ? 'pt' : 'es')} style={{
          padding: "3px 8px", borderRadius: 5, fontSize: 10, fontWeight: 700,
          background: "rgba(99,102,241,.15)", color: C.a400,
          border: "none", cursor: "pointer", letterSpacing: ".04em"
        }}>
          {lang === 'es' ? '\u{1F1E7}\u{1F1F7} PT' : '\u{1F1E8}\u{1F1F4} ES'}
        </button>
      </div>
    </nav>
  );
}

function Hero() {
  const lang = useContext(LangCtx);
  const t = i18n[lang].hero;
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
  const stats = t.stats;
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
        <div style={a(.25)}><Tag dark>{t.tag}</Tag></div>
        <h1 style={{ fontSize: "clamp(38px,7vw,76px)", fontWeight: 800, lineHeight: 1.03, letterSpacing: "-.04em", margin: "22px 0", maxWidth: 860, ...a(.45) }}>
          {t.h1[0]}
          <span style={{ background: "linear-gradient(135deg," + C.a400 + "," + C.b400 + ")", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>{t.h1[1]}</span>{t.h1[2]}
        </h1>
        <p style={{ fontSize: "clamp(16px,1.8vw,20px)", lineHeight: 1.6, color: C.g400, maxWidth: 580, margin: "0 0 44px", ...a(.65) }}>
          {t.sub}
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
  const lang = useContext(LangCtx);
  const t = i18n[lang].problema;
  const cardIcons = [<Icon.building size={22} color={C.e500} />, <Icon.user size={22} color={C.b500} />];
  const cardColors = [C.e500, C.b500];
  return (
    <Box>
      <Fade>
        <Tag>{t.tag}</Tag>
        <h2 style={{ fontSize: "clamp(26px,4.5vw,44px)", fontWeight: 800, letterSpacing: "-.03em", margin: "14px 0 10px", lineHeight: 1.08, whiteSpace: "pre-line" }}>{t.h2}</h2>
        <p style={{ fontSize: 16, color: C.g500, maxWidth: 540, lineHeight: 1.6, marginBottom: 40 }}>{t.sub}</p>
      </Fade>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))", gap: 16 }}>
        {t.cards.map((cd, ci) => (
          <Fade key={ci} delay={ci * .12}>
            <div style={{ background: "#fff", borderRadius: 18, padding: 28, border: "1px solid " + C.g200, height: "100%" }}>
              <span>{cardIcons[ci]}</span>
              <h3 style={{ fontSize: 19, fontWeight: 700, margin: "10px 0 14px" }}>{cd.t}</h3>
              {cd.its.map(([m, tx], i) => (
                <div key={i} style={{ display: "flex", gap: 9, alignItems: "baseline", marginBottom: 9 }}>
                  <span style={{ fontSize: 14, fontWeight: 800, color: cardColors[ci], minWidth: 56, flexShrink: 0 }}>{m}</span>
                  <span style={{ fontSize: 13, color: C.g600, lineHeight: 1.4 }}>{tx}</span>
                </div>
              ))}
              <div style={{ marginTop: 16, padding: 12, borderRadius: 10, background: C.g50, fontStyle: "italic", fontSize: 13, color: C.g600, lineHeight: 1.5, borderLeft: "3px solid " + cardColors[ci] }}>{cd.q}</div>
            </div>
          </Fade>
        ))}
      </div>
    </Box>
  );
}

function Insight() {
  const lang = useContext(LangCtx);
  const t = i18n[lang].insight;
  const [aq, saq] = useState(null);
  const [r, v] = useVis();
  useEffect(() => { if (!v) return; const ti = [0, 1, 2, 3].map(i => setTimeout(() => saq(i), 500 + i * 450)); return () => ti.forEach(clearTimeout); }, [v]);
  const qIcons = ["cc", "mon", "ph", "br"];
  const qs = t.questions.map((q, i) => ({ ...q, i: qIcons[i] }));
  return (
    <Box dark>
      <Fade>
        <Tag dark>{t.tag}</Tag>
        <h2 style={{ fontSize: "clamp(26px,4.5vw,44px)", fontWeight: 800, letterSpacing: "-.03em", margin: "14px 0 10px", lineHeight: 1.08 }}>
          {t.h2[0]}<br /><span style={{ color: C.a400 }}>{t.h2[1]}</span>
        </h2>
        <p style={{ fontSize: 16, color: C.g400, maxWidth: 580, lineHeight: 1.6, marginBottom: 40 }}>{t.sub}</p>
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
                <span>{{ cc: <Icon.creditCard size={22} color={op ? C.a300 : C.g300} />, mon: <Icon.monitor size={22} color={op ? C.a300 : C.g300} />, ph: <Icon.phone size={22} color={op ? C.a300 : C.g300} />, br: <Icon.brain size={22} color={op ? C.a300 : C.g300} /> }[q.i]}</span>
                <div style={{ fontSize: 10, color: C.g500, textTransform: "uppercase", letterSpacing: ".05em", marginTop: 8 }}>{t.questionLabel} {i + 1}</div>
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
  const lang = useContext(LangCtx);
  const t = i18n[lang].producto;
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

  const deudasMontos = [85000, 85000, 15000, 25000];
  const deudas = t.deudas.map((d, i) => ({ ...d, monto: deudasMontos[i] }));
  const pdTotal = deudas.reduce((s, d, i) => s + (pdSel[i] ? d.monto : 0), 0);

  const callLines = t.call.lines;

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
  const tabs = t.tabs;
  const tabIcons = [<Icon.phone size={14} />, <Icon.monitor size={14} />, <Icon.phoneCall size={14} />];
  const payMethodsReal = t.payMethods;
  const checks = t.checks;

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
          {flowPage === 1 && <span style={{ fontSize: 12, color: "#aaa" }}>{t.flow.cancel}</span>}
          <span style={{ fontSize: 13, fontWeight: 600, color: "#fff", flex: 1, textAlign: "center" }}>
            {flowPage === 1 ? t.flow.page1Title : flowPage === 2 ? t.flow.page2Title : t.flow.page3Title}
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
                <div style={{ fontSize: 13, fontWeight: 700, color: "#2e7d32" }}>{t.flow.bannerLine1}<span style={{ color: "#00a884" }}>{t.flow.bannerLine1b}</span>{t.flow.bannerLine1c}</div>
                <div style={{ fontSize: 13, fontWeight: 700, color: "#2e7d32" }}>{t.flow.bannerLine2}</div>
                <div style={{ fontSize: 9, color: "#666", marginTop: 4 }}>{t.flow.bannerCredit}<strong>{t.flow.bannerCreditBold}</strong></div>
              </div>
              <div style={{ fontSize: 12, fontWeight: 700, color: "#fff", marginBottom: 2 }}>{t.flow.labelTitulo}</div>
              <div style={{ fontSize: 13, color: "#adb5bd", marginBottom: 14 }}>{t.flow.valueTitulo}</div>
              <div style={{ fontSize: 12, fontWeight: 700, color: "#fff", marginBottom: 2 }}>{t.flow.labelTotal}</div>
              <div style={{ fontSize: 22, fontWeight: 800, color: "#fff", marginBottom: 16 }}>$ 85.000</div>
              <div style={{ fontSize: 10, color: "#adb5bd", lineHeight: 1.5 }}>{t.flow.termsText[0]}<span style={{ color: "#53bdeb" }}>{t.flow.termsText[1]}</span></div>
            </div>
          )}
          {flowPage === 2 && (
            <div>
              <div style={{ fontSize: 12, color: "#adb5bd", marginBottom: 12, lineHeight: 1.4 }}>{t.flow.selectAccountText}</div>
              <div style={{ fontSize: 10, color: "#adb5bd", marginBottom: 8 }}>{t.flow.safePay}</div>
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
              <div style={{ fontSize: 22, fontWeight: 800, color: "#fff", marginBottom: 8 }}>{t.flow.txInProgress}</div>
              <div style={{ fontSize: 13, color: "#adb5bd", lineHeight: 1.5, marginBottom: 6 }}>{t.flow.txUsed.replace('{method}', payMethodsReal[waPay].name)}</div>
              <div style={{ fontSize: 13, color: "#adb5bd", lineHeight: 1.5, marginBottom: 12 }}>{t.flow.txProcess}</div>
              <div style={{ fontSize: 12, color: "#00a884" }}>{t.flow.txThanks}</div>
            </div>
          )}
        </div>
        {/* Flow bottom button */}
        <div style={{ padding: "10px 14px", flexShrink: 0 }}>
          <div onClick={() => { if (wa < 3) sWa(wa + 1); else sWa(4); }} style={{
            padding: "12px", borderRadius: 10, background: "#00a884", textAlign: "center",
            fontSize: 14, fontWeight: 700, color: "#fff", cursor: "pointer"
          }}>
            {flowPage === 1 ? t.flow.btnPay : flowPage === 2 ? t.flow.btnContinue : t.flow.btnFinish}
          </div>
          <div style={{ textAlign: "center", marginTop: 6, display: "flex", alignItems: "center", justifyContent: "center", gap: 4 }}>
            <span style={{ fontSize: 9, color: "#adb5bd" }}>{t.flow.managedBy}</span>
            <span style={{ fontSize: 9, color: "#53bdeb" }}>{t.flow.learnMore}</span>
          </div>
        </div>
      </div>
    );
  };

  return (
    <Box white>
      <Fade>
        <Tag>{t.tag}</Tag>
        <h2 style={{ fontSize: "clamp(26px,4.5vw,44px)", fontWeight: 800, letterSpacing: "-.03em", margin: "14px 0 10px", lineHeight: 1.08 }}>{t.h2}</h2>
        <p style={{ fontSize: 16, color: C.g500, maxWidth: 540, lineHeight: 1.6, marginBottom: 32 }}>{t.sub}</p>
      </Fade>
      <Fade delay={.1}>
        <div style={{ display: "flex", gap: 5, marginBottom: 32, flexWrap: "wrap" }}>
          {tabs.map((t, i) => (
            <button key={i} onClick={() => sTab(i)} style={{ padding: "9px 18px", borderRadius: 100, border: "none", cursor: "pointer", fontSize: 13, fontWeight: 600, transition: "all .3s", background: tab === i ? C.p950 : "#fff", color: tab === i ? "#fff" : C.g600, boxShadow: tab === i ? "0 6px 20px rgba(9,12,28,.14)" : "0 1px 3px rgba(0,0,0,.04)", display: "flex", alignItems: "center", gap: 5 }}>{tabIcons[i]}{t}</button>
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
                          <div style={{ fontSize: 10, fontWeight: 600, color: "#fff" }}>{t.wa.cobroPdf}</div>
                          <div style={{ fontSize: 8, color: "rgba(255,255,255,.4)" }}>{t.wa.cobroSize}</div>
                        </div>
                      </div>
                      <div style={{ padding: "8px 10px 4px" }}>
                        <div style={{ fontSize: 11.5, color: "#e9edef", lineHeight: 1.4 }}>
                          {t.wa.cobroMsg[0]}<strong>{t.wa.cobroMsg[1]}</strong>{t.wa.cobroMsg[2]}<strong>{t.wa.cobroMsg[3]}</strong>{t.wa.cobroMsg[4]}<strong style={{ color: "#53bdeb" }}>{t.wa.cobroMsg[5]}</strong>{t.wa.cobroMsg[6]}
                        </div>
                        <div style={{ fontSize: 9, color: "rgba(255,255,255,.35)", marginTop: 3 }}>{t.wa.cobroSafe}</div>
                        <div style={{ textAlign: "right", fontSize: 8, color: "rgba(255,255,255,.25)", marginTop: 2 }}>7:29 PM</div>
                      </div>
                      {wa === 0 && (
                        <div onClick={() => sWa(1)} style={{ padding: "9px", borderTop: "1px solid rgba(255,255,255,.06)", display: "flex", alignItems: "center", justifyContent: "center", gap: 5, cursor: "pointer" }}>
                          <span style={{ fontSize: 12 }}>{"\u{1F4CB}"}</span>
                          <span style={{ fontSize: 12, fontWeight: 600, color: "#00a884" }}>{t.wa.iniciarPago}</span>
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
                              <div style={{ fontSize: 10, fontWeight: 600, color: "#fff" }}>{t.wa.documento}</div>
                              <div style={{ fontSize: 8, color: "rgba(255,255,255,.4)" }}>{t.wa.cobroSize}</div>
                            </div>
                          </div>
                          <div style={{ padding: "8px 10px 4px" }}>
                            <div style={{ fontSize: 11.5, color: "#e9edef", lineHeight: 1.4 }}>
                              {t.wa.confirmMsg[0]}<strong style={{ color: "#53bdeb" }}>{t.wa.confirmMsg[1]}</strong>{t.wa.confirmMsg[2]}
                            </div>
                            <div style={{ fontSize: 11.5, color: "#e9edef", lineHeight: 1.4, marginTop: 5 }}>
                              {t.wa.confirmReceipt[0]}<strong>{t.wa.confirmReceipt[1]}</strong>{t.wa.confirmReceipt[2]}
                            </div>
                            <div style={{ fontSize: 9, color: "rgba(255,255,255,.35)", marginTop: 3 }}>{t.wa.cobroSafe}</div>
                            <div style={{ textAlign: "right", fontSize: 8, color: "rgba(255,255,255,.25)", marginTop: 2 }}>7:30 PM</div>
                          </div>
                          <div style={{ padding: "8px 10px", borderTop: "1px solid rgba(255,255,255,.06)", display: "flex", alignItems: "center", justifyContent: "center", gap: 4 }}>
                            <span style={{ fontSize: 11 }}>{"\u21A9\uFE0F"}</span>
                            <span style={{ fontSize: 11, fontWeight: 600, color: "#00a884" }}>{t.wa.confirmThanks}</span>
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
                  {pdStep > 0 && <span onClick={() => setPdStep(pdStep - 1)} style={{ fontSize: 12, color: C.a500, cursor: "pointer", fontWeight: 600 }}>{t.portal.back}</span>}
                </div>
                {/* Scrollable content */}
                <div style={{ flex: 1, overflowY: "auto", overflowX: "hidden", padding: "16px", scrollbarWidth: "none" }}>
                  {/* Step 0: Consultar */}
                  {pdStep === 0 && (
                    <div>
                      <h3 style={{ fontSize: 18, fontWeight: 800, color: C.p950, marginBottom: 4 }}>{t.portal.consultaH}</h3>
                      <p style={{ fontSize: 12, color: C.g500, marginBottom: 18 }}>{t.portal.consultaSub}</p>
                      <input
                        type="text"
                        value={pdRef}
                        onChange={(e) => { setPdRef(e.target.value); setPdErr(false); }}
                        placeholder={t.portal.placeholder}
                        style={{ width: "100%", boxSizing: "border-box", border: "1.5px solid " + (pdErr ? C.e500 : C.g300), borderRadius: 10, padding: "10px 14px", marginBottom: 4, fontSize: 13, color: C.g700, outline: "none", background: "#fff" }}
                      />
                      {pdErr && <div style={{ fontSize: 11, color: C.e500, marginBottom: 8, display: "flex", alignItems: "center", gap: 4 }}>{t.portal.errorField}</div>}
                      {!pdErr && <div style={{ height: 20, marginBottom: 8 }} />}
                      <div onClick={() => { if (!pdRef.trim()) { setPdErr(true); return; } setPdStep(1); }} style={{ padding: "12px", borderRadius: 10, background: C.p950, textAlign: "center", color: "#fff", fontWeight: 700, fontSize: 13, cursor: "pointer" }}>{t.portal.btnConsultar}</div>
                    </div>
                  )}
                  {/* Step 1: Selección de deudas */}
                  {pdStep === 1 && (
                    <div>
                      <h3 style={{ fontSize: 16, fontWeight: 800, color: C.p950, marginBottom: 4 }}>{t.portal.tuConsulta}</h3>
                      <p style={{ fontSize: 11, color: C.g500, marginBottom: 12 }}>{t.portal.selectDeudas}</p>
                      <div style={{ display: "flex", flexDirection: "column", gap: 6, marginBottom: 12 }}>
                        {deudas.map((d, i) => (
                          <div key={i} onClick={() => { const n = [...pdSel]; n[i] = !n[i]; setPdSel(n); }} style={{ padding: "10px 12px", borderRadius: 10, border: "1px solid " + C.g200, background: "#fff", cursor: "pointer", display: "flex", gap: 8, alignItems: "flex-start" }}>
                            <div style={{ width: 16, height: 16, borderRadius: 4, border: "2px solid " + (pdSel[i] ? C.a500 : C.g300), background: pdSel[i] ? C.a500 : "#fff", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: 2 }}>
                              {pdSel[i] && <span style={{ color: "#fff", fontSize: 9, fontWeight: 800 }}>{"\u2713"}</span>}
                            </div>
                            <div style={{ flex: 1 }}>
                              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                                <span style={{ fontSize: 10, color: C.g500 }}>{t.portal.valorPagar}</span>
                                <span style={{ fontSize: 9, color: C.g400 }}>{d.ref ? t.portal.refLabel + d.ref : ""}</span>
                              </div>
                              <div style={{ fontSize: 14, fontWeight: 800, color: C.p950, margin: "1px 0" }}>COP ${dot(d.monto)}</div>
                              {d.desc && <div style={{ fontSize: 9, color: C.g500 }}>{d.desc}</div>}
                              <div style={{ fontSize: 9, color: C.g400, marginTop: 1 }}>{t.portal.creacionLabel}{d.fCreacion}{t.portal.venceLabel}{d.fVence}</div>
                            </div>
                          </div>
                        ))}
                      </div>
                      {pdTotal > 0 && (
                        <div style={{ padding: "10px 14px", borderRadius: 10, background: C.g50, border: "1px solid " + C.g200, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                          <div>
                            <div style={{ fontSize: 10, color: C.g500 }}>{t.portal.totalSeleccionado}</div>
                            <div style={{ fontSize: 15, fontWeight: 800, color: C.p950 }}>$ {dot(pdTotal)} COP</div>
                          </div>
                          <div onClick={() => setPdStep(2)} style={{ padding: "7px 16px", borderRadius: 8, background: C.p950, color: "#fff", fontWeight: 700, fontSize: 11, cursor: "pointer" }}>{t.portal.btnPagar}</div>
                        </div>
                      )}
                    </div>
                  )}
                  {/* Step 2: Método de pago */}
                  {pdStep === 2 && (
                    <div>
                      <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 12 }}>
                        <span style={{ fontSize: 11, color: C.g500 }}>{t.portal.totalAPagar}</span>
                        <span style={{ fontSize: 9, color: C.g400, marginLeft: "auto" }}>{t.portal.pagoDe.replace('{n}', pdSel.filter(Boolean).length)}</span>
                      </div>
                      <div style={{ fontSize: 24, fontWeight: 800, color: C.p950, marginBottom: 14 }}>$ {dot(pdTotal)} <span style={{ fontSize: 13, fontWeight: 400, color: C.g500 }}>COP</span></div>
                      <div style={{ fontSize: 11, fontWeight: 600, color: C.g600, marginBottom: 8 }}>{t.portal.metodoPago}</div>
                      {t.portal.portalPayMethods.map((m, i) => (
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
                      <div onClick={() => setPdStep(3)} style={{ marginTop: 12, padding: "11px", borderRadius: 10, background: C.p950, textAlign: "center", color: "#fff", fontWeight: 700, fontSize: 12, cursor: "pointer" }}>{t.portal.btnPagar} ${dot(pdTotal)}</div>
                    </div>
                  )}
                  {/* Step 3: Éxito */}
                  {pdStep === 3 && (
                    <div style={{ textAlign: "center", paddingTop: 40 }}>
                      <div style={{ fontSize: 40 }}>{"\u2705"}</div>
                      <div style={{ fontSize: 18, fontWeight: 800, color: C.p950, margin: "10px 0" }}>{t.portal.pagoExitoso}</div>
                      <div style={{ fontSize: 14, color: C.g600 }}>${dot(pdTotal)} COP</div>
                      <div style={{ padding: "6px 14px", borderRadius: 8, background: C.s50, fontSize: 11, color: C.s500, fontWeight: 600, display: "inline-block", marginTop: 10 }}>{t.portal.conciliadoAuto}</div>
                    </div>
                  )}
                </div>
                {/* Footer */}
                <div style={{ padding: "6px 16px", background: C.g50, borderTop: "1px solid " + C.g200, display: "flex", justifyContent: "space-between", alignItems: "center", flexShrink: 0 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 4, fontSize: 9, color: C.g500 }}>{t.portal.footerSafe}<strong style={{ color: C.p950 }}>onepay</strong></div>
                  <span style={{ fontSize: 9, color: C.g400 }}>{t.portal.footerLang}</span>
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
                  <div style={{ fontSize: 13, fontWeight: 700 }}>Ana {"\u00B7"} {t.call.agenteIA}</div>
                  <div style={{ fontSize: 9, opacity: .7 }}>FibraNet {"\u00B7"} {t.call.gestionCartera}</div>
                  <div style={{ fontFamily: "monospace", fontSize: 16, fontWeight: 700, letterSpacing: 2, marginTop: 3 }}>{fT(ct)}</div>
                </div>
                {/* Transcription - scrollable */}
                <div ref={callRef} style={{ flex: 1, padding: "10px 12px", overflowY: "auto", overflowX: "hidden", scrollBehavior: "smooth", scrollbarWidth: "none", background: "#fafafa" }}>
                  <div style={{ fontSize: 9, color: C.g400, fontWeight: 600, marginBottom: 8, textTransform: "uppercase", letterSpacing: ".05em" }}>{t.call.transcripcion}</div>
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
                      <div style={{ fontSize: 9, fontWeight: 600, color: C.s500, marginBottom: 3 }}>{t.call.resumenIA}</div>
                      <div style={{ fontSize: 10, color: C.g600, lineHeight: 1.45 }}>{t.call.resumenText}</div>
                    </div>
                    <div style={{ padding: "10px 12px", background: C.a50, borderRadius: 10 }}>
                      <div style={{ fontSize: 9, fontWeight: 600, color: C.a500, marginBottom: 5 }}>{t.call.parametrosLabel}</div>
                      <div style={{ display: "flex", flexDirection: "column", gap: 3 }}>
                        {t.call.parametros.map((p, i) => (
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
            <h3 style={{ fontSize: 20, fontWeight: 700, marginBottom: 10 }}>{t.tabTitles[tab]}</h3>
            <p style={{ fontSize: 14, color: C.g500, lineHeight: 1.65, marginBottom: 14 }}>
              {t.tabDescriptions[tab]}
            </p>
            <p style={{ fontSize: 13, color: C.a500, fontWeight: 600, marginBottom: 12, display: "flex", alignItems: "center", gap: 5 }}>
              {tab === 2 ? <Icon.eye size={16} color={C.a500} /> : <Icon.cursorClick size={16} color={C.a500} />} {t.tabCtas[tab]}
            </p>
            {checks[tab].map((chk, i) => (
              <div key={i} style={{ display: "flex", gap: 7, alignItems: "center", fontSize: 13, color: C.g600, marginBottom: 7 }}>
                <span style={{ color: C.s500 }}>{"\u2713"}</span>{chk}
              </div>
            ))}
          </div>
        </Fade>
      </div>
    </Box>
  );
}

function Timeline() {
  const lang = useContext(LangCtx);
  const t = i18n[lang].timeline;
  const [as, sAs] = useState(-1);
  const [exp, sExp] = useState(null);
  const [r, v] = useVis();
  useEffect(() => { if (!v) return; const ti = [0, 1, 2, 3, 4, 5].map(i => setTimeout(() => sAs(i), 250 + i * 350)); return () => ti.forEach(clearTimeout); }, [v]);

  const stepIcons = [<Icon.clipboard size={18} color="#fff" />, <Icon.phone size={18} color="#fff" />, <Icon.bell size={18} color="#fff" />, <Icon.brain size={18} color="#fff" />, <Icon.phoneCall size={18} color="#fff" />, <Icon.checkCircle size={18} color="#fff" />];
  const stepColors = [C.b500, C.a500, C.s500, C.w500, C.e500, C.s500];
  const steps = t.steps.map((s, i) => ({ ...s, ic: stepIcons[i], c: stepColors[i] }));

  return (
    <Box dark>
      <Fade>
        <Tag dark>{t.tag}</Tag>
        <h2 style={{ fontSize: "clamp(26px,4.5vw,44px)", fontWeight: 800, letterSpacing: "-.03em", margin: "14px 0 10px", lineHeight: 1.08 }}>{t.h2}</h2>
        <p style={{ fontSize: 16, color: C.g400, maxWidth: 560, lineHeight: 1.6, marginBottom: 40 }}>{t.sub}</p>
      </Fade>
      <div ref={r} style={{ position: "relative" }}>
        <div style={{ position: "absolute", left: 21, top: 22, bottom: 22, width: 2, background: "rgba(255,255,255,.04)", borderRadius: 2, zIndex: 0 }}>
          <div style={{ width: "100%", borderRadius: 2, background: "linear-gradient(180deg," + C.a500 + "," + C.s500 + ")", height: as >= 0 ? (Math.min(100, ((as + 1) / steps.length) * 100) + "%") : "0%", transition: "height .9s cubic-bezier(.16,1,.3,1)" }} />
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
          {steps.map((s, i) => {
            const act = i <= as;
            const open = exp === i;
            return (
              <div key={i} onClick={() => sExp(open ? null : i)} style={{ display: "flex", gap: 16, alignItems: "flex-start", opacity: act ? 1 : .2, transition: "all .5s cubic-bezier(.16,1,.3,1)", cursor: "pointer" }}>
                <div style={{ width: 42, height: 42, borderRadius: "50%", flexShrink: 0, background: act ? s.c : "rgba(255,255,255,.04)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16, transition: "all .4s", boxShadow: act ? "0 0 20px " + s.c + "20" : "none", position: "relative", zIndex: 1 }}>{s.ic}</div>
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
          <p style={{ fontSize: 18, fontWeight: 700, color: "#fff", margin: 0 }}>{t.callout[0]}<span style={{ color: C.s400 }}>{t.callout[1]}</span></p>
        </div>
      </Fade>
    </Box>
  );
}

function Data() {
  const lang = useContext(LangCtx);
  const t = i18n[lang].data;
  const [mode, sMode] = useState("top");
  const [r, v] = useVis();

  const bkData = {
    top: [{ l: "\u22641d", op: 23.4, ot: 8.7 }, { l: "\u22643d", op: 43.5, ot: 28.8 }, { l: "\u22645d", op: 64.6, ot: 55.3 }, { l: "\u22647d", op: 81.9, ot: 77.0 }, { l: "\u226410d", op: 96.1, ot: 93.7 }, { l: "\u226415d", op: 100, ot: 98.8 }],
    avg: [{ l: "\u22641d", op: 17.9, ot: 4.4 }, { l: "\u22643d", op: 33.7, ot: 16.7 }, { l: "\u22645d", op: 51.6, ot: 33.1 }, { l: "\u22647d", op: 66.1, ot: 47.5 }, { l: "\u226410d", op: 88.0, ot: 73.8 }, { l: "\u226415d", op: 98.6, ot: 93.5 }]
  };
  const avgData = { top: "4.4", avg: "5.5" };
  const sets = {
    top: { ...t.sets.top, avg: avgData.top, bk: bkData.top },
    avg: { ...t.sets.avg, avg: avgData.avg, bk: bkData.avg }
  };
  const d = sets[mode];

  return (
    <Box white>
      <Fade>
        <Tag>{t.tag}</Tag>
        <h2 style={{ fontSize: "clamp(26px,4.5vw,44px)", fontWeight: 800, letterSpacing: "-.03em", margin: "14px 0 10px", lineHeight: 1.08 }}>{t.h2[0]}<br /><span style={{ color: C.g400 }}>{t.h2[1]}</span></h2>
        <p style={{ fontSize: 16, color: C.g500, maxWidth: 560, lineHeight: 1.6, marginBottom: 14 }}>{t.sub}</p>
      </Fade>
      <div ref={r} style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(170px,1fr))", gap: 12, margin: "28px 0" }}>
        {[{ v: 255487, l: t.metricLabels[0], sb: t.metricSubs[0], f: true }, { v: parseFloat(d.avg), l: t.metricLabels[1], sb: d.sub, d: 1 }, { v: d.bk[2].op, l: t.metricLabels[2], sb: d.label, s: "%" }].map((m, i) => (
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
            <h3 style={{ fontSize: 16, fontWeight: 700, margin: 0 }}>{t.chartTitle}</h3>
            <div style={{ display: "flex", gap: 3, padding: 3, background: C.g200, borderRadius: 9 }}>
              {t.toggles.map(({ k, l }, ti) => ({ k, l, icon: ti === 0 ? <Icon.trophy size={14} /> : <Icon.chartBar size={14} /> })).map(({ k, l, icon }) => (
                <button key={k} onClick={() => sMode(k)} style={{ padding: "6px 14px", borderRadius: 7, border: "none", cursor: "pointer", fontSize: 12, fontWeight: 600, transition: "all .3s", background: mode === k ? "#fff" : "transparent", color: mode === k ? C.p950 : C.g500, boxShadow: mode === k ? "0 2px 6px rgba(0,0,0,.06)" : "none", display: "flex", alignItems: "center", gap: 4 }}>{icon}{l}</button>
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
              <><strong style={{ color: C.a500 }}>{d.insightText[0]}</strong>{d.insightText[1]}</>
            </p>
          </div>
        </div>
      </Fade>
    </Box>
  );
}

function Integraciones() {
  const lang = useContext(LangCtx);
  const t = i18n[lang].integraciones;
  return (
    <Box dark>
      <Fade>
        <Tag dark>{t.tag}</Tag>
        <h2 style={{ fontSize: "clamp(26px,4.5vw,42px)", fontWeight: 800, letterSpacing: "-.03em", margin: "14px 0 10px", lineHeight: 1.08 }}>{t.h2[0]}<br /><span style={{ color: C.a400 }}>{t.h2[1]}</span></h2>
        <p style={{ fontSize: 16, color: C.g400, maxWidth: 560, lineHeight: 1.6, marginBottom: 28 }}>{t.sub}</p>
      </Fade>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(240px,1fr))", gap: 14 }}>
        {["Wispro", "Wisphub", "MikroWISP", "Integra", "WispControl", "SAEplus", null].map((n, i) => (
          <Fade key={i} delay={.03 * i}>
            {n ? (
              <div style={{ background: "rgba(255,255,255,.03)", borderRadius: 16, padding: 24, border: "1px solid rgba(255,255,255,.04)" }}>
                <div style={{ fontSize: 15, fontWeight: 700 }}>{n}</div>
                <div style={{ fontSize: 11, color: C.g500, marginTop: 3 }}>{t.directa}</div>
              </div>
            ) : (
              <div style={{ background: "rgba(99,102,241,.06)", borderRadius: 16, padding: 24, border: "1px dashed rgba(99,102,241,.18)" }}>
                <div style={{ fontSize: 15, fontWeight: 700, color: C.a400 }}>{t.tuCRM}</div>
                <div style={{ fontSize: 11, color: C.g500, marginTop: 3 }}>{t.tuCRMsub}</div>
              </div>
            )}
          </Fade>
        ))}
      </div>
      <Fade delay={.25}>
        <div style={{ marginTop: 36 }}>
          <h3 style={{ fontSize: 14, fontWeight: 700, marginBottom: 12, color: C.g300 }}>{t.mediosPago}</h3>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(100px,1fr))", gap: 10 }}>
            {[{ n: "PSE", src: "/logos/payment/pse.svg" }, { n: "Nequi", src: "/logos/payment/nequi.svg" }, { n: "Daviplata", src: "/logos/payment/daviplata.svg", h: 44 }, { n: "Bre-B", src: "/logos/payment/breb.svg" }, { n: "VISA", src: "/logos/payment/visa.svg" }, { n: "Mastercard", src: "/logos/payment/mastercard.svg", h: 40 }, { n: "AMEX", src: "/logos/payment/amex.svg" }, { n: "Efecty", src: "/logos/payment/efecty.svg", s: true }].map((m, i) => (
              <div key={i} style={{ position: "relative", padding: "10px 16px", borderRadius: 10, background: "rgba(255,255,255,.04)", border: "1px solid " + (m.s ? "rgba(251,191,36,.14)" : "rgba(255,255,255,.06)"), display: "flex", alignItems: "center", justifyContent: "center", height: 56 }}>
                <img src={m.src} alt={m.n} style={{ height: m.h || 30, maxWidth: 100, objectFit: "contain", filter: "brightness(0) invert(1)", opacity: .85 }} />
                {m.s && <span style={{ position: "absolute", bottom: 3, left: "50%", transform: "translateX(-50%)", fontSize: 7, fontWeight: 700, color: C.w500, background: C.g950, padding: "1px 5px", borderRadius: 3, whiteSpace: "nowrap" }}>{t.pronto}</span>}
              </div>
            ))}
          </div>
        </div>
      </Fade>
    </Box>
  );
}

function Resultados() {
  const lang = useContext(LangCtx);
  const tr = i18n[lang].resultados;
  const cardIcons = [<Icon.bolt size={24} />, <Icon.phone size={24} />, <Icon.checkCircle size={24} />, <Icon.chartBar size={24} />];
  const cardColors = [C.a500, C.b500, C.s500, C.w500];
  const cards = tr.cards.map((cd, i) => ({ ...cd, ic: cardIcons[i], c: cardColors[i] }));
  return (
    <Box>
      <Fade>
        <Tag>{tr.tag}</Tag>
        <h2 style={{ fontSize: "clamp(26px,4.5vw,44px)", fontWeight: 800, letterSpacing: "-.03em", margin: "14px 0", lineHeight: 1.08 }}>{tr.h2}</h2>
      </Fade>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(240px,1fr))", gap: 14, marginTop: 28 }}>
        {cards.map((r, i) => (
          <Fade key={i} delay={.05 * i}>
            <div style={{ background: "#fff", borderRadius: 16, padding: 24, border: "1px solid " + C.g200, height: "100%" }}>
              <span style={{ color: r.c }}>{r.ic}</span>
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
  const lang = useContext(LangCtx);
  const tc = i18n[lang].ciclo;
  const [ac, sAc] = useState(null);
  const itemIcons = [<Icon.inbox size={22} />, <Icon.chartBar size={22} />, <Icon.paperAirplane size={22} />, <Icon.creditCard size={22} />, <Icon.home size={22} />];
  const itemColors = [C.a500, C.b500, C.s500, C.w500, "#0EA5E9"];
  const items = tc.items.map((it, i) => ({ ...it, ic: itemIcons[i], c: itemColors[i] }));

  return (
    <Box dark>
      <Fade>
        <Tag dark>{tc.tag}</Tag>
        <h2 style={{ fontSize: "clamp(26px,4.5vw,42px)", fontWeight: 800, letterSpacing: "-.03em", margin: "14px 0 10px", lineHeight: 1.08 }}>{tc.h2[0]}<br /><span style={{ color: C.a400 }}>{tc.h2[1]}</span></h2>
        <p style={{ fontSize: 16, color: C.g400, maxWidth: 560, lineHeight: 1.6, marginBottom: 36 }}>{tc.sub}</p>
      </Fade>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(200px,1fr))", gap: 10 }}>
        {items.map((it, i) => {
          const open = ac === i;
          return (
            <Fade key={i} delay={.04 * i}>
              <div onClick={() => sAc(open ? null : i)} style={{ background: open ? "rgba(255,255,255,.06)" : "rgba(255,255,255,.02)", borderRadius: 14, padding: 20, border: "1px solid " + (open ? "rgba(255,255,255,.08)" : "rgba(255,255,255,.03)"), cursor: "pointer", transition: "all .4s" }}>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <span style={{ color: it.c }}>{it.ic}</span>
                  <span style={{ padding: "2px 7px", borderRadius: 100, fontSize: 9, fontWeight: 600, background: it.st === tc.statusActive ? "rgba(34,197,94,.1)" : "rgba(251,191,36,.1)", color: it.st === tc.statusActive ? C.s400 : C.w400 }}>{it.st === tc.statusActive ? "\u25CF" : "\u25D0"} {it.st}</span>
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
          <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 14, display: "flex", alignItems: "center", gap: 6 }}><Icon.paperAirplane size={18} /> {tc.dispersionesTitle}</h3>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(180px,1fr))", gap: 10 }}>
            {tc.channels.map((ch, i) => (
              <div key={i} style={{ background: "rgba(255,255,255,.03)", borderRadius: 10, padding: 16, border: "1px solid rgba(255,255,255,.04)" }}>
                <div style={{ fontSize: 14, fontWeight: 700, marginBottom: 3 }}>{ch.n}</div>
                <div style={{ display: "flex", gap: 10, marginBottom: 6, fontSize: 11 }}>
                  <span style={{ color: C.s400, display: "flex", alignItems: "center", gap: 3 }}><Icon.bolt size={12} color={C.s400} /> {ch.t}</span>
                  <span style={{ color: C.b400, display: "flex", alignItems: "center", gap: 3 }}><Icon.banknotes size={12} color={C.b400} /> {ch.co}</span>
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
  const lang = useContext(LangCtx);
  const td = i18n[lang].dashboard;
  const [size, setSize] = useState(0); // 0 = 2K, 1 = 40K
  const barDataSets = [[1800, 400, 200, 80, 40, 20], [18000, 1200, 800, 300, 120, 60]];
  const data = td.data.map((dd, i) => ({ ...dd, barData: barDataSets[i] }));
  const d = data[size];
  const barLabels = td.barLabels;
  const barMax = Math.max(...d.barData);

  return (
    <div style={{ marginTop: 36 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16, flexWrap: "wrap", gap: 10 }}>
        <div>
          <h3 style={{ fontSize: 16, fontWeight: 700, margin: 0 }}>{td.title}</h3>
          <p style={{ fontSize: 11, color: C.g400, margin: "2px 0 0" }}>{td.sub}</p>
        </div>
        <div style={{ display: "flex", gap: 3, padding: 3, background: "rgba(255,255,255,.06)", borderRadius: 9 }}>
          {td.toggles.map((l, i) => (
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
          <div style={{ fontSize: 10, color: C.g500, marginBottom: 2 }}>{td.totalLabel}</div>
          <div style={{ fontSize: 26, fontWeight: 800 }}>{d.total}</div>
          <div style={{ fontSize: 10, color: C.g500 }}>{td.totalSub}</div>
        </div>
        <div style={{ background: "rgba(255,255,255,.03)", borderRadius: 12, padding: 18, border: "1px solid rgba(255,255,255,.06)" }}>
          <div style={{ fontSize: 10, color: C.g500, marginBottom: 2 }}>{td.tasaLabel}</div>
          <div style={{ fontSize: 26, fontWeight: 800 }}>{d.tasa}</div>
          <div style={{ fontSize: 10, color: C.s400 }}>{d.tasaSub}</div>
        </div>
        {size === 0 && (
          <div style={{ background: "rgba(255,255,255,.03)", borderRadius: 12, padding: 18, border: "1px solid rgba(255,255,255,.06)" }}>
            <div style={{ fontSize: 10, color: C.g500, marginBottom: 2 }}>{td.llamadasLabel}</div>
            <div style={{ fontSize: 26, fontWeight: 800 }}>{d.llamadas}</div>
            <div style={{ fontSize: 10, color: C.b400 }}>{td.llamadasSub}</div>
          </div>
        )}
      </div>

      {/* Charts row */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 16 }}>
        {/* Tendencia semanal - simplified */}
        <div style={{ background: "rgba(255,255,255,.03)", borderRadius: 12, padding: 16, border: "1px solid rgba(255,255,255,.06)" }}>
          <div style={{ fontSize: 12, fontWeight: 700, marginBottom: 2 }}>{td.tendencia}</div>
          <div style={{ fontSize: 10, color: C.g500, marginBottom: 12 }}>{td.tendenciaSub}</div>
          <div style={{ display: "flex", alignItems: "flex-end", gap: 3, height: 60 }}>
            {(size === 0 ? [20, 35, 50, 40, 60, 75, 55, 80, 70, 90, 85, 95] : [10, 15, 20, 25, 30, 40, 45, 55, 70, 85, 95, 100]).map((h, i) => (
              <div key={i} style={{ flex: 1, height: h + "%", background: "linear-gradient(180deg," + C.a500 + "," + C.b500 + ")", borderRadius: "3px 3px 0 0", opacity: .7 + (i / 24) }} />
            ))}
          </div>
        </div>
        {/* Recordatorios hasta el pago */}
        <div style={{ background: "rgba(255,255,255,.03)", borderRadius: 12, padding: 16, border: "1px solid rgba(255,255,255,.06)" }}>
          <div style={{ fontSize: 12, fontWeight: 700, marginBottom: 2 }}>{td.recordatoriosHastaPago}</div>
          <div style={{ fontSize: 10, color: C.g500, marginBottom: 12 }}>{td.recordatoriosHastaPagoSub}</div>
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
          <div style={{ padding: "5px 12px", borderRadius: 6, background: "rgba(255,255,255,.05)", fontSize: 10, color: C.g400, display: "flex", alignItems: "center", gap: 4 }}><Icon.search size={12} color={C.g400} /> {td.buscar}</div>
        </div>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 11 }}>
          <thead>
            <tr style={{ borderBottom: "1px solid rgba(255,255,255,.06)" }}>
              {td.tableHeaders.map((h, i) => (
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
  const lang = useContext(LangCtx);
  const t = i18n[lang].invoiceLifecycle;
  const [activeNode, setAN] = useState(null);
  const [r, v] = useVis();
  const [step, setStep] = useState(-1);
  useEffect(() => { if (!v) return; const ti = [0,1,2,3,4,5,6].map(i => setTimeout(() => setStep(i), 300 + i * 300)); return () => ti.forEach(clearTimeout); }, [v]);

  const nodeIcons = [<Icon.bell size={16} color="#fff" />, <Icon.calendar size={16} color="#fff" />, <Icon.clock size={16} color="#fff" />, <Icon.warning size={16} color="#fff" />, <Icon.phoneCall size={16} color="#fff" />, <Icon.noSymbol size={16} color="#fff" />, <Icon.heart size={16} color="#fff" />];
  const nodeColors = [C.b500, C.a500, C.w500, "#F97316", C.e500, C.g600, C.s500];
  const nodes = t.nodes.map((n, i) => ({ ...n, id: i, icon: nodeIcons[i], color: nodeColors[i] }));

  return (
    <Box dark id="cobranza">
      <Fade>
        <Tag dark>{t.tag}</Tag>
        <h2 style={{ fontSize: "clamp(26px,4.5vw,44px)", fontWeight: 800, letterSpacing: "-.03em", margin: "14px 0 10px", lineHeight: 1.08 }}>
          {t.h2[0]}<br /><span style={{ color: C.a400 }}>{t.h2[1]}</span>
        </h2>
        <p style={{ fontSize: 16, color: C.g400, maxWidth: 600, lineHeight: 1.6, marginBottom: 12 }}>
          {t.sub}
        </p>
        <p style={{ fontSize: 13, color: C.g500, maxWidth: 560, lineHeight: 1.5, marginBottom: 36 }}>
          {t.subDetail}
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
            <strong style={{ color: "#fff" }}>{t.callout[0]}</strong>{t.callout[1]}<strong style={{ color: C.a400 }}>{t.callout[2]}</strong>{t.callout[3]}
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
  const lang = useContext(LangCtx);
  const t = i18n[lang].reconciliation;
  const [tab, sTab] = useState(0);
  const [balFilter, setBalFilter] = useState(0);
  return (
    <Box white id="conciliacion">
      <Fade>
        <Tag>{t.tag}</Tag>
        <h2 style={{ fontSize: "clamp(26px,4.5vw,44px)", fontWeight: 800, letterSpacing: "-.03em", margin: "14px 0 10px", lineHeight: 1.08 }}>
          {t.h2[0]}<br /><span style={{ color: C.g400 }}>{t.h2[1]}</span>
        </h2>
        <p style={{ fontSize: 16, color: C.g500, maxWidth: 560, lineHeight: 1.6, marginBottom: 28 }}>
          {t.sub}
        </p>
      </Fade>

      <Fade delay={.1}>
        <div style={{ display: "flex", gap: 5, marginBottom: 28 }}>
          {t.tabs.map(({ l: tl }, i) => ({ tl, ic: i === 0 ? <Icon.clipboard size={14} /> : <Icon.chartBar size={14} /> })).map(({ tl, ic: ric }, i) => (
            <button key={i} onClick={() => sTab(i)} style={{ padding: "9px 18px", borderRadius: 100, border: "none", cursor: "pointer", fontSize: 13, fontWeight: 600, transition: "all .3s", background: tab === i ? C.p950 : "#fff", color: tab === i ? "#fff" : C.g600, boxShadow: tab === i ? "0 6px 20px rgba(9,12,28,.14)" : "0 1px 3px rgba(0,0,0,.04)", display: "flex", alignItems: "center", gap: 5 }}>{ric}{tl}</button>
          ))}
        </div>
      </Fade>

      {tab === 0 && <Fade delay={.15}>
        <div style={{ background: C.g50, borderRadius: 18, padding: 24, border: "1px solid " + C.g200 }}>
          {/* Status flow */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 6, marginBottom: 24, flexWrap: "wrap" }}>
            {t.flowSteps.map((l, i) => ({ l, ic: [<Icon.docText size={18} />, <Icon.envelope size={18} />, <Icon.checkCircle size={18} />][i], c: [C.b500, C.a500, C.s500][i] })).map((s, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 6 }}>
                <div style={{ width: 42, height: 42, borderRadius: "50%", background: s.c + "12", border: "2px solid " + s.c, display: "flex", alignItems: "center", justifyContent: "center", color: s.c }}>{s.ic}</div>
                <span style={{ fontSize: 12, fontWeight: 600, color: C.g700 }}>{s.l}</span>
                {i < 2 && <div style={{ width: 40, height: 2, background: C.g300, borderRadius: 1 }} />}
              </div>
            ))}
          </div>

          <h3 style={{ fontSize: 15, fontWeight: 700, marginBottom: 12 }}>{t.detallePorFactura}</h3>
          {/* Factura mockup */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(240px,1fr))", gap: 12 }}>
            <div style={{ background: "#fff", borderRadius: 12, padding: 16, border: "1px solid " + C.g200 }}>
              <div style={{ fontSize: 11, fontWeight: 600, color: C.g500, marginBottom: 8 }}>{t.infoFactura}</div>
              {t.infoFacturaRows.map(([k, v], i) => (
                <div key={i} style={{ display: "flex", justifyContent: "space-between", fontSize: 12, padding: "4px 0", borderBottom: "1px solid " + C.g100 }}>
                  <span style={{ color: C.g500 }}>{k}</span>
                  <span style={{ fontWeight: 600, color: i === 3 ? C.s500 : C.g700 }}>{v}</span>
                </div>
              ))}
            </div>
            <div style={{ background: "#fff", borderRadius: 12, padding: 16, border: "1px solid " + C.g200 }}>
              <div style={{ fontSize: 11, fontWeight: 600, color: C.g500, marginBottom: 8 }}>{t.intentoPago}</div>
              {t.intentoPagoRows.map(([k, v], i) => (
                <div key={i} style={{ display: "flex", justifyContent: "space-between", fontSize: 12, padding: "4px 0", borderBottom: "1px solid " + C.g100 }}>
                  <span style={{ color: C.g500 }}>{k}</span>
                  <span style={{ fontWeight: 600, color: i === 0 ? C.s500 : C.g700 }}>{v}</span>
                </div>
              ))}
            </div>
          </div>

          <div style={{ marginTop: 16, padding: "12px 16px", borderRadius: 10, background: C.a50, border: "1px solid " + C.a200 }}>
            <p style={{ fontSize: 12, color: C.g600, margin: 0, lineHeight: 1.5 }}>
              <strong style={{ color: C.a500 }}>{t.operativaCallout[0]}</strong>{t.operativaCallout[1]}
            </p>
          </div>
        </div>
      </Fade>}

      {tab === 1 && <Fade delay={.15}>
        <div style={{ background: C.g50, borderRadius: 18, padding: 24, border: "1px solid " + C.g200 }}>
          <h3 style={{ fontSize: 15, fontWeight: 700, marginBottom: 6 }}>{t.conciliacionNodos}</h3>
          <p style={{ fontSize: 13, color: C.g500, lineHeight: 1.5, marginBottom: 16 }}>{t.conciliacionNodosSub}</p>

          {/* Node visualization */}
          <div style={{ background: "#fff", borderRadius: 14, padding: 18, border: "1px solid " + C.g200, marginBottom: 16 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 14 }}>
              <div style={{ width: 10, height: 10, borderRadius: "50%", background: C.a500 }} />
              <span style={{ fontSize: 13, fontWeight: 700, fontFamily: "monospace", color: C.p950 }}>Nodo a78a4d73</span>
            </div>
            {t.nodeMovements.map((m, i) => ({ ...m, neg: m.val.startsWith('-') })).map((m, i) => (
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
            <div style={{ fontSize: 13, fontWeight: 700, marginBottom: 4 }}>{t.historicoSaldos}</div>
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
              {t.balanceFilters.map((f, i) => (
                <span key={i} onClick={() => setBalFilter(i)} style={{ padding: "3px 10px", borderRadius: 6, background: balFilter === i ? C.p950 : C.g100, color: balFilter === i ? "#fff" : C.g500, fontWeight: 600, cursor: "pointer", transition: "all .2s" }}>{f}</span>
              ))}
            </div>
            {balFilter === 0 && <div style={{ marginTop: 10, fontSize: 11, color: C.g500 }}>
              {t.balanceAll.map((r) => ({ ...r, g: r.v.startsWith('+') })).map((r, i) => (
                <div key={i} style={{ display: "flex", justifyContent: "space-between", padding: "5px 0", borderBottom: "1px solid " + C.g100 }}>
                  <span>{r.c}</span><span style={{ fontWeight: 700, color: r.g ? C.s500 : C.e500 }}>{r.v}</span>
                </div>
              ))}
            </div>}
            {balFilter === 1 && <div style={{ marginTop: 10, fontSize: 11, color: C.g500 }}>
              {t.balanceEntradas.map((r, i) => (
                <div key={i} style={{ display: "flex", justifyContent: "space-between", padding: "5px 0", borderBottom: "1px solid " + C.g100 }}>
                  <span>{r.c}</span><span style={{ fontWeight: 700, color: C.s500 }}>{r.v}</span>
                </div>
              ))}
            </div>}
            {balFilter === 2 && <div style={{ marginTop: 10, fontSize: 11, color: C.g500 }}>
              {t.balanceSalidas.map((r, i) => (
                <div key={i} style={{ display: "flex", justifyContent: "space-between", padding: "5px 0", borderBottom: "1px solid " + C.g100 }}>
                  <span>{r.c}</span><span style={{ fontWeight: 700, color: C.e500 }}>{r.v}</span>
                </div>
              ))}
            </div>}
            {balFilter === 3 && <div style={{ marginTop: 10, fontSize: 11, color: C.g400, fontStyle: "italic" }}>{t.balanceReservas}</div>}
          </div>

          <div style={{ marginTop: 16, padding: "12px 16px", borderRadius: 10, background: C.a50, border: "1px solid " + C.a200 }}>
            <p style={{ fontSize: 12, color: C.g600, margin: 0, lineHeight: 1.5 }}>
              <strong style={{ color: C.a500 }}>{t.contableCallout[0]}</strong>{t.contableCallout[1]}
            </p>
          </div>
        </div>
      </Fade>}
    </Box>
  );
}

function Pricing() {
  const lang = useContext(LangCtx);
  const t = i18n[lang].pricing;
  // === ROI Calculator ===
  const [subs, setSubs] = useState(5000);
  const [ticket, setTicket] = useState(65000);
  const [tasa, setTasa] = useState(70);
  const [personas, setPersonas] = useState(2);
  const [planIdx, setPlanIdx] = useState(-1); // -1 = auto-sugerido
  const [dispersiones, setDispersiones] = useState(200000000);

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

  // Ahorro GMF: módulo de tesorería ahorra la mitad del 4x1000 (= 2x1000 = 0.2%)
  const ahorroGMF = dispersiones * 0.002;

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
  const beneficioTotal = plataNueva + capacidadLiberada + ahorroGMF;
  const roiNeto = beneficioTotal - costoTotal;
  const roiPct = costoTotal > 0 ? Math.round((roiNeto / costoTotal) * 100) : 0;

  const plans = t.plans;

  return (
    <Box id="precios">
      <Fade>
        <Tag>{t.tag}</Tag>
        <h2 style={{ fontSize: "clamp(26px,4.5vw,44px)", fontWeight: 800, letterSpacing: "-.03em", margin: "14px 0 10px", lineHeight: 1.08 }}>{t.h2}</h2>
        <p style={{ fontSize: 16, color: C.g500, maxWidth: 540, lineHeight: 1.6, marginBottom: 32 }}>{t.sub}</p>
      </Fade>

      {/* Plan cards */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(230px,1fr))", gap: 14, marginBottom: 48 }}>
        {plans.map((p, i) => (
          <Fade key={i} delay={.06 * i}>
            <div style={{ background: "#fff", borderRadius: 18, padding: 24, border: plan === i ? "2px solid " + C.a500 : "1px solid " + C.g200, position: "relative", transition: "all .4s", boxShadow: plan === i ? "0 8px 32px rgba(99,102,241,.12)" : "none" }}>
              {p.star && <div style={{ position: "absolute", top: -10, right: 16, padding: "3px 12px", borderRadius: 100, background: C.a500, color: "#fff", fontSize: 10, fontWeight: 700 }}>{t.recommended}</div>}
              {plan === i && <div style={{ position: "absolute", top: -10, left: 16, padding: "3px 10px", borderRadius: 100, background: C.s500, color: "#fff", fontSize: 10, fontWeight: 700 }}>{planIdx === -1 ? t.planIdeal : t.seleccionado}</div>}
              {plan === i && planIdx !== -1 && planIdx !== planSugerido && <div style={{ fontSize: 10, color: "#FBBF24", marginTop: 2, fontWeight: 600 }}>{t.sugerido}{planNames[planSugerido]}</div>}
              <h3 style={{ fontSize: 20, fontWeight: 800, marginBottom: 4 }}>{p.n}</h3>
              <div style={{ fontSize: 24, fontWeight: 800, color: C.a500, marginBottom: 2 }}>{p.saas}</div>
              <div style={{ fontSize: 11, color: C.g500, marginBottom: 14 }}>{t.copMes}</div>

              <div style={{ fontSize: 12, color: C.g600, marginBottom: 12 }}>
                {[[t.planLabels.tarjetas, p.tc + " " + t.planLabels.ivaNote], [t.planLabels.pseBilleteras, p.pse + " " + t.planLabels.ivaNote], [t.planLabels.dispACH, p.dispACH + " " + t.planLabels.ivaNote], [t.planLabels.dispTurbo, p.dispTurbo + " " + t.planLabels.ivaNote], [t.planLabels.llamadasIA, p.calls]].map(([k, v], j) => (
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
            <Icon.banknotes size={22} color={C.a400} />
            <h3 style={{ fontSize: 20, fontWeight: 800, margin: 0 }}>{t.roiTitle}</h3>
          </div>
          <p style={{ fontSize: 13, color: C.g400, marginBottom: 24, lineHeight: 1.5 }}>{t.roiSub}</p>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))", gap: 20, marginBottom: 28 }}>
            <div>
              <label style={{ fontSize: 12, fontWeight: 600, color: "rgba(255,255,255,.5)", display: "block", marginBottom: 6 }}>{t.sliders.subs}<strong style={{ color: "#fff" }}>{dot(subs)}</strong></label>
              <input type="range" min={500} max={50000} step={500} value={subs} onChange={e => setSubs(+e.target.value)} style={{ width: "100%", accentColor: "#6366F1" }} />
            </div>
            <div>
              <label style={{ fontSize: 12, fontWeight: 600, color: "rgba(255,255,255,.5)", display: "block", marginBottom: 6 }}>{t.sliders.ticket}<strong style={{ color: "#fff" }}>${dot(ticket)}</strong></label>
              <input type="range" min={30000} max={200000} step={5000} value={ticket} onChange={e => setTicket(+e.target.value)} style={{ width: "100%", accentColor: "#6366F1" }} />
            </div>
            <div>
              <label style={{ fontSize: 12, fontWeight: 600, color: "rgba(255,255,255,.5)", display: "block", marginBottom: 6 }}>{t.sliders.tasa}<strong style={{ color: "#fff" }}>{tasa}%</strong></label>
              <input type="range" min={50} max={95} step={1} value={tasa} onChange={e => setTasa(+e.target.value)} style={{ width: "100%", accentColor: "#6366F1" }} />
            </div>
            <div>
              <label style={{ fontSize: 12, fontWeight: 600, color: "rgba(255,255,255,.5)", display: "block", marginBottom: 6 }}>{t.sliders.personas}<strong style={{ color: "#fff" }}>{personas}</strong></label>
              <input type="range" min={0} max={10} step={1} value={personas} onChange={e => setPersonas(+e.target.value)} style={{ width: "100%", accentColor: "#6366F1" }} />
            </div>
            <div>
              <label style={{ fontSize: 12, fontWeight: 600, color: "rgba(255,255,255,.5)", display: "block", marginBottom: 6 }}>{t.sliders.dispersiones}<strong style={{ color: "#fff" }}>${dot(dispersiones)}</strong></label>
              <input type="range" min={0} max={2000000000} step={10000000} value={dispersiones} onChange={e => setDispersiones(+e.target.value)} style={{ width: "100%", accentColor: "#6366F1" }} />
            </div>
            <div>
              <label style={{ fontSize: 12, fontWeight: 600, color: "rgba(255,255,255,.5)", display: "block", marginBottom: 6 }}>{t.sliders.plan}<strong style={{ color: "#fff" }}>{planIdx === -1 ? planNames[planSugerido] + t.sliders.planSugerido : planNames[plan]}</strong></label>
              <div style={{ display: "flex", gap: 6, marginTop: 6, flexWrap: "wrap" }}>
                <button onClick={() => setPlanIdx(-1)} style={{
                  padding: "6px 12px", borderRadius: 8, border: "none", cursor: "pointer",
                  fontSize: 11, fontWeight: 600,
                  background: planIdx === -1 ? "rgba(99,102,241,.2)" : "rgba(255,255,255,.06)",
                  color: planIdx === -1 ? "#A78BFA" : "rgba(255,255,255,.5)"
                }}>{t.sliders.auto}</button>
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
              <div style={{ fontSize: 10, color: "rgba(255,255,255,.5)", textTransform: "uppercase", letterSpacing: ".05em" }}>{t.results.plan}</div>
              <div style={{ fontSize: 20, fontWeight: 800, color: "#A78BFA", marginTop: 4 }}>{planNames[plan]}</div>
              {planIdx !== -1 && planIdx !== planSugerido && (
                <div style={{ fontSize: 10, color: "#FBBF24", marginTop: 4 }}>{t.sugerido}{planNames[planSugerido]}</div>
              )}
            </div>
            <div style={{ background: "rgba(34,197,94,.06)", borderRadius: 14, padding: 18, border: "1px solid rgba(34,197,94,.1)" }}>
              <div style={{ fontSize: 10, color: "rgba(255,255,255,.5)", textTransform: "uppercase", letterSpacing: ".05em" }}>{t.results.recaudoAdicional}</div>
              <div style={{ fontSize: 20, fontWeight: 800, color: "#4ADE80", marginTop: 4 }}>${dot(Math.round(plataNueva))}</div>
              <div style={{ fontSize: 10, color: "rgba(255,255,255,.4)", marginTop: 2 }}>{t.results.tasaLabel}{tasa}% → {tasaOnePay}%</div>
            </div>
            <div style={{ background: "rgba(59,130,246,.06)", borderRadius: 14, padding: 18, border: "1px solid rgba(59,130,246,.1)" }}>
              <div style={{ fontSize: 10, color: "rgba(255,255,255,.5)", textTransform: "uppercase", letterSpacing: ".05em" }}>{t.results.capacidadLiberada}</div>
              <div style={{ fontSize: 20, fontWeight: 800, color: "#60A5FA", marginTop: 4 }}>${dot(Math.round(capacidadLiberada))}</div>
              <div style={{ fontSize: 10, color: "rgba(255,255,255,.4)", marginTop: 2 }}>{personas}{personas !== 1 ? t.results.personasLabel : t.results.personaLabel}{t.results.tareasValor}</div>
            </div>
            {dispersiones > 0 && <div style={{ background: "rgba(251,191,36,.06)", borderRadius: 14, padding: 18, border: "1px solid rgba(251,191,36,.1)" }}>
              <div style={{ fontSize: 10, color: "rgba(255,255,255,.5)", textTransform: "uppercase", letterSpacing: ".05em" }}>{t.results.ahorroGMF}</div>
              <div style={{ fontSize: 20, fontWeight: 800, color: "#FBBF24", marginTop: 4 }}>${dot(Math.round(ahorroGMF))}</div>
              <div style={{ fontSize: 10, color: "rgba(255,255,255,.4)", marginTop: 2 }}>{t.results.ahorroGMFsub}</div>
            </div>}
            <div style={{ background: "rgba(255,255,255,.04)", borderRadius: 14, padding: 18, border: "1px solid rgba(255,255,255,.06)" }}>
              <div style={{ fontSize: 10, color: "rgba(255,255,255,.5)", textTransform: "uppercase", letterSpacing: ".05em" }}>{t.results.inversionOnePay}</div>
              <div style={{ fontSize: 20, fontWeight: 800, marginTop: 4, color: "#fff" }}>${dot(Math.round(costoTotal))}</div>
              <div style={{ fontSize: 10, color: "rgba(255,255,255,.4)", marginTop: 2 }}>{t.results.saasLabel}${dot(costoSaaS)}{t.results.txLabel}${dot(Math.round(costoTx))}</div>
            </div>
            <div style={{ background: "rgba(34,197,94,.08)", borderRadius: 14, padding: 18, border: "1px solid rgba(34,197,94,.15)", gridColumn: "span 2" }}>
              <div style={{ fontSize: 10, color: "rgba(255,255,255,.5)", textTransform: "uppercase", letterSpacing: ".05em" }}>{t.results.roiNeto}</div>
              <div style={{ display: "flex", alignItems: "baseline", gap: 12, marginTop: 4 }}>
                <span style={{ fontSize: 28, fontWeight: 800, color: roiNeto > 0 ? "#4ADE80" : "#EF4444" }}>${dot(Math.round(roiNeto))}</span>
                {roiPct > 0 && <span style={{ fontSize: 16, fontWeight: 700, color: "#4ADE80" }}>+{roiPct}% ROI</span>}
              </div>
            </div>
          </div>

          {/* Datos complementarios */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(180px,1fr))", gap: 10, marginTop: 14 }}>
            <div style={{ padding: "12px 16px", borderRadius: 10, background: "rgba(255,255,255,.03)", border: "1px solid rgba(255,255,255,.04)" }}>
              <div style={{ fontSize: 10, color: "rgba(255,255,255,.5)", textTransform: "uppercase" }}>{t.complementary.velocidad}</div>
              <div style={{ fontSize: 14, fontWeight: 700, marginTop: 4 }}>{t.complementary.velocidadVal.replace('{dias}', diasOnePay)} <span style={{ color: "rgba(255,255,255,.4)", fontWeight: 400 }}>{t.complementary.velocidadVs.replace('{diasMercado}', diasMercado)}</span></div>
            </div>
            <div style={{ padding: "12px 16px", borderRadius: 10, background: "rgba(255,255,255,.03)", border: "1px solid rgba(255,255,255,.04)" }}>
              <div style={{ fontSize: 10, color: "rgba(255,255,255,.5)", textTransform: "uppercase" }}>{t.complementary.costoMensajeria}</div>
              <div style={{ fontSize: 14, fontWeight: 700, marginTop: 4 }}>${dot(costoMensajeria)} <span style={{ color: "rgba(255,255,255,.4)", fontWeight: 400 }}>{t.complementary.mensajeriaVal}</span></div>
            </div>
            <div style={{ padding: "12px 16px", borderRadius: 10, background: "rgba(255,255,255,.03)", border: "1px solid rgba(255,255,255,.04)" }}>
              <div style={{ fontSize: 10, color: "rgba(255,255,255,.5)", textTransform: "uppercase" }}>{t.complementary.impactoChurn}</div>
              <div style={{ fontSize: 14, fontWeight: 700, marginTop: 4 }}>{t.complementary.impactoChurnVal} <span style={{ color: "rgba(255,255,255,.4)", fontWeight: 400 }}>{t.complementary.impactoChurnSub}</span></div>
            </div>
          </div>

          {/* Disclaimer */}
          <div style={{ marginTop: 16, padding: "12px 16px", borderRadius: 10, background: "rgba(255,255,255,.03)", border: "1px solid rgba(255,255,255,.04)" }}>
            <p style={{ fontSize: 11, color: "rgba(255,255,255,.4)", margin: 0, lineHeight: 1.5 }}>
              {t.disclaimer}
            </p>
          </div>
        </div>
      </Fade>
    </Box>
  );
}

function Seguridad() {
  const lang = useContext(LangCtx);
  const t = i18n[lang].seguridad;
  const certIcons = [<Icon.lock size={22} color={C.a500} />, <Icon.shield size={22} color={C.s500} />, <Icon.creditCard size={22} color={C.b500} />, <Icon.docText size={22} color={C.w500} />];
  return (
    <Box>
      <Fade>
        <Tag>{t.tag}</Tag>
        <h2 style={{ fontSize: "clamp(26px,4.5vw,44px)", fontWeight: 800, letterSpacing: "-.03em", margin: "14px 0 10px", lineHeight: 1.08 }}>{t.h2[0]}<br /><span style={{ color: C.g400 }}>{t.h2[1]}</span></h2>
        <p style={{ fontSize: 16, color: C.g500, maxWidth: 560, lineHeight: 1.6, marginBottom: 28 }}>{t.sub}</p>
      </Fade>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(150px,1fr))", gap: 9 }}>
        {t.certs.map((s, i) => ({ ...s, i: certIcons[i] })).map((s, i) => (
          <Fade key={i} delay={.04 * i}>
            <div style={{ background: "#fff", borderRadius: 14, padding: 20, border: "1px solid " + C.g200, textAlign: "center" }}>
              <span>{s.i}</span>
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
  const lang = useContext(LangCtx);
  const t = i18n[lang].closing;
  return (
    <Box dark style={{ textAlign: "center", paddingBottom: 70 }}>
      <Fade>
        <div style={{ maxWidth: 720, margin: "0 auto", background: "linear-gradient(135deg," + C.p800 + "," + C.p900 + ")", borderRadius: 24, padding: "clamp(36px,5vw,64px)", position: "relative", overflow: "hidden", border: "1px solid rgba(99,102,241,.06)" }}>
          <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: 400, height: 400, borderRadius: "50%", background: "radial-gradient(circle,rgba(99,102,241,.08) 0%,transparent 55%)", filter: "blur(40px)" }} />
          <div style={{ position: "relative", zIndex: 1 }}>
            <LOGO h={24} />
            <h2 style={{ fontSize: "clamp(26px,4.5vw,40px)", fontWeight: 800, letterSpacing: "-.03em", lineHeight: 1.08, color: "#fff", margin: "22px 0 14px" }}>
              {t.h2[0]}<br />{t.h2[1]}
            </h2>
            <p style={{ fontSize: 16, color: C.g400, lineHeight: 1.6, maxWidth: 420, margin: "0 auto 22px" }}>
              {t.sub}
            </p>
            <div style={{ display: "flex", justifyContent: "center", gap: 18, fontSize: 12, color: C.g500, flexWrap: "wrap" }}>
              {t.bullets.map((b, i) => <span key={i}>{b}</span>)}
            </div>
          </div>
        </div>
      </Fade>
      <div style={{ marginTop: 36 }}>
        <LOGO color={C.g500} h={14} />
        <div style={{ fontSize: 10, color: C.g500, marginTop: 5 }}>{t.footer}</div>
      </div>
    </Box>
  );
}

/* ═════════════════════════════════════════════════════════════
   MAIN EXPORT
   ═════════════════════════════════════════════════════════════ */
export default function App() {
  const [lang, setLang] = useState('es');
  return (
    <LangCtx.Provider value={lang}>
      <div style={{ fontFamily: "'Inter',-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif", WebkitFontSmoothing: "antialiased" }}>
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap" rel="stylesheet" />
        <style>{`*{margin:0;padding:0;box-sizing:border-box}html{scroll-behavior:smooth}::selection{background:rgba(99,102,241,.2)}body{overflow-x:hidden}`}</style>
        <NavBar setLang={setLang} />
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
    </LangCtx.Provider>
  );
}
