import { useScrollAnimation } from '../hooks/useScrollAnimation'

const clients = [
  { name: 'AOI Pro.',      nameJp: '株式会社AOI Pro.',      logo: '/logos/aoi-pro.svg',    bg: '#ffffff', pad: '14px 16px' },
  { name: 'FIELDS',        nameJp: 'フィールズ株式会社',     logo: '/logos/fields.gif',     bg: '#ffffff', pad: '12px 16px' },
  { name: 'pafin',         nameJp: 'pafin株式会社',          logo: '/logos/pafin.svg',      bg: '#ffffff', pad: '12px 14px' },
  { name: 'ジョブメドレー', nameJp: '株式会社メドレー',       logo: '/logos/job-medley.png', bg: '#ffffff', pad: '10px 10px' },
  { name: 'Symphonity',    nameJp: 'Symphonity株式会社',     logo: '/logos/symphonity.png', bg: '#ffffff', pad: '10px 10px' },
  { name: 'MARUHAN',       nameJp: '株式会社マルハン',        logo: '/logos/maruhan.png',    bg: '#ffffff', pad: '14px 18px' },
]

const ROW_A = clients

function LogoCard({ client }) {
  return (
    <div
      className="flex-shrink-0 flex flex-col items-center gap-2 mx-3"
    >
      <div
        className="w-36 h-20 rounded-2xl border border-zinc-200/10 shadow flex items-center justify-center overflow-hidden"
        style={{ backgroundColor: client.bg }}
      >
        <img
          src={client.logo}
          alt={client.nameJp}
          className="max-w-full max-h-full object-contain"
          style={{ padding: client.pad }}
          loading="lazy"
          draggable={false}
        />
      </div>
      <span className="text-zinc-500 text-[10px] font-medium whitespace-nowrap">{client.nameJp}</span>
    </div>
  )
}

function TickerRow({ items, direction = 'left', speed = '35s' }) {
  // アイテムを4セット複製してシームレスなループを保証
  const track = [...items, ...items, ...items, ...items]

  return (
    <div className="ticker-wrap overflow-hidden">
      <div
        className={direction === 'left' ? 'ticker-track-left' : 'ticker-track-right'}
        style={{
          display: 'flex',
          width: 'max-content',
          '--ticker-speed': speed,
        }}
      >
        {track.map((c, i) => (
          <LogoCard key={i} client={c} />
        ))}
      </div>
    </div>
  )
}

export default function ClientBar() {
  const [ref, isVisible] = useScrollAnimation()

  return (
    <section className="py-16 border-y border-zinc-800/50 bg-[#080810] overflow-hidden">
      <div
        ref={ref}
        className={`fade-up ${isVisible ? 'visible' : ''}`}
      >
        <p className="text-center text-zinc-500 text-xs tracking-widest uppercase mb-8">
          主要クライアント ／ Trusted by
        </p>

        {/* 1行ティッカー */}
        <div className="relative">
          <div className="absolute left-0 top-0 bottom-0 w-24 z-10 pointer-events-none"
               style={{ background: 'linear-gradient(to right, #080810, transparent)' }} />
          <div className="absolute right-0 top-0 bottom-0 w-24 z-10 pointer-events-none"
               style={{ background: 'linear-gradient(to left, #080810, transparent)' }} />
          <TickerRow items={ROW_A} direction="left" speed="40s" />
        </div>
      </div>
    </section>
  )
}
