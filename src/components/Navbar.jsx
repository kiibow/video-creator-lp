import { useState, useEffect } from 'react'

const navLinks = [
  { href: '#services', label: 'サービス' },
  { href: '#achievements', label: '実績' },
  { href: '#portfolio', label: '作品' },
  { href: '#profile', label: 'プロフィール' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[#050507]/95 backdrop-blur-md border-b border-zinc-800/60'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <a href="#" className="flex items-center gap-2 group">
          <img
            src="/logo.png"
            alt="wremakejapan"
            className="h-8 sm:h-10 w-auto object-contain transition-opacity duration-200 group-hover:opacity-80"
            style={{ filter: 'brightness(1.15)' }}
          />
        </a>

        <nav className="hidden md:flex items-center gap-7">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-zinc-400 hover:text-zinc-100 text-sm transition-colors duration-200 relative group"
            >
              {link.label}
              <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-amber-400 group-hover:w-full transition-all duration-300" />
            </a>
          ))}
          <a
            href="#contact"
            className="bg-amber-400 text-zinc-950 px-5 py-2 rounded text-sm font-bold hover:bg-amber-300 transition-colors duration-200"
          >
            お問い合わせ
          </a>
        </nav>

        <button
          className="md:hidden text-zinc-400 hover:text-zinc-100 transition-colors p-2"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="メニュー"
        >
          <div className="w-5 flex flex-col gap-1.5">
            <span className={`block h-px bg-current transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-2' : ''}`} />
            <span className={`block h-px bg-current transition-all duration-300 ${menuOpen ? 'opacity-0' : ''}`} />
            <span className={`block h-px bg-current transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
          </div>
        </button>
      </div>

      {menuOpen && (
        <div className="md:hidden bg-[#0a0a10]/98 backdrop-blur-md border-t border-zinc-800/60 px-6 py-5">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="block py-3 text-zinc-300 hover:text-white border-b border-zinc-800/50 text-sm transition-colors"
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </a>
          ))}
          <a
            href="#contact"
            className="block mt-4 bg-amber-400 text-zinc-950 px-4 py-3 rounded text-center font-bold text-sm"
            onClick={() => setMenuOpen(false)}
          >
            お問い合わせ
          </a>
        </div>
      )}
    </header>
  )
}
