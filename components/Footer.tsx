export default function Footer() {
  return (
    <footer className="px-[5vw] py-16 border-t border-white/5 flex flex-col md:flex-row justify-between items-center text-[11px] font-['Oswald'] tracking-[3px] uppercase text-[#8A8582] z-10 relative bg-[#050404]">
      <div className="flex flex-col gap-2">
        <div>© 2026 NACHOS SPOT CATERING</div>
        <div className="text-[#DDA221]/50 hover:text-[#DDA221] transition-colors">
          <a href="/sponsors">Vores Sponsorer / Samarbejdspartnere</a>
        </div>
      </div>
      <div className="mt-8 md:mt-0 flex flex-col items-end gap-2 text-right">
        <div>Kører i hele landet</div>
        <div className="text-white/40">Kontakt: <a href="mailto:Nachosspott@gmail.com" className="hover:text-white">Nachosspott@gmail.com</a></div>
      </div>
    </footer>
  );
}
