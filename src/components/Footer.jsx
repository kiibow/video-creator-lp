export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="py-10 border-t border-zinc-800/50 bg-[#050507]">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <img
            src="/logo.png"
            alt="wremakejapan"
            className="h-8 w-auto object-contain opacity-80"
          />

          <nav className="flex flex-wrap justify-center gap-6">
            {[
              { href: '#services', label: 'サービス' },
              { href: '#achievements', label: '実績' },
              { href: '#portfolio', label: '作品' },
              { href: '#profile', label: 'プロフィール' },
              { href: '#contact', label: 'お問い合わせ' },
            ].map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-zinc-600 hover:text-zinc-400 text-xs transition-colors"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="text-zinc-700 text-xs">
            © {year} Masatoshi Kitsui. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  )
}
