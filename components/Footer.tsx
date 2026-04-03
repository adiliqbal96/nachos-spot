"use client";

export default function Footer() {
  return (
    <footer style={{
      borderTop: "1px solid rgba(240,230,208,0.06)",
      padding: "28px 5vw",
      display: "flex", justifyContent: "space-between",
      alignItems: "center", flexWrap: "wrap", gap: 16,
    }}>
      <div style={{
        fontFamily: "'Oswald', sans-serif",
        fontSize: 18, letterSpacing: "0.12em",
        color: "rgba(240,230,208,0.2)", textTransform: "uppercase",
      }}>
        NACHOS<span style={{ color: "rgba(245,194,0,0.35)" }}>SPOT</span>
      </div>

      <div style={{ display: "flex", gap: 28, flexWrap: "wrap" }}>
        {[
          { href: "https://instagram.com/nachosspot", label: "Instagram", external: true },
          { href: "#", label: "TikTok" },
          { href: "#booking", label: "Book os" },
          { href: "#menu", label: "Menu" },
        ].map(link => (
          <a
            key={link.label}
            href={link.href}
            target={link.external ? "_blank" : undefined}
            rel={link.external ? "noopener noreferrer" : undefined}
            style={{
              fontFamily: "'Barlow Condensed', sans-serif",
              fontSize: 11, letterSpacing: "0.18em", textTransform: "uppercase",
              color: "rgba(240,230,208,0.25)", textDecoration: "none",
              transition: "color 0.2s",
            }}
            onMouseEnter={e => (e.currentTarget.style.color = "var(--y)")}
            onMouseLeave={e => (e.currentTarget.style.color = "rgba(240,230,208,0.25)")}
          >
            {link.label}
          </a>
        ))}
      </div>

      <div style={{
        fontFamily: "'Barlow Condensed', sans-serif",
        fontSize: 11, letterSpacing: "0.08em",
        color: "rgba(240,230,208,0.15)",
      }}>
        © Nachos Spot · København
      </div>
    </footer>
  );
}
