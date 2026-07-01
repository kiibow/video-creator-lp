import { useScrollAnimation } from '../hooks/useScrollAnimation'

const services = [
  {
    icon: '▶',
    title: 'YouTube運用・動画制作',
    desc: '企画立案から台本・撮影・編集・サムネ制作まで幅広く対応。アナリティクスに基づいたPDCAで視聴指標の改善に努めます。',
    tags: ['企画', '撮影', '編集', 'AI活用'],
    img: 'https://images.unsplash.com/photo-1759417501248-0aa9489dab3f?w=600&q=80&auto=format&fit=crop',
  },
  {
    icon: '🎬',
    title: '企業VP・PR映像',
    desc: 'ブランド訴求、サービス紹介、会社紹介。ターゲットと目的に合わせたコンセプト設計から映像化まで対応します。',
    tags: ['コンセプト設計', 'ブランディング', 'カラー'],
    img: 'https://images.pexels.com/photos/7652178/pexels-photo-7652178.jpeg?auto=compress&cs=tinysrgb&w=600',
  },
  {
    icon: '👥',
    title: '採用動画・HR映像',
    desc: '求める人物像とカルチャーを的確に伝える採用PR映像。視聴者の共感を引き出す構成・演出でエントリー増加に貢献。',
    tags: ['採用PR', '会社紹介', 'インタビュー'],
    img: 'https://images.pexels.com/photos/18848929/pexels-photo-18848929.jpeg?auto=compress&cs=tinysrgb&w=600',
  },
  {
    icon: '📚',
    title: '教育・研修動画',
    desc: '学習効果を高めるカット割りとテロップ設計。株式会社メドレー「ジョブメドレーアカデミー」でも実績あり。',
    tags: ['eラーニング', 'オンライン研修', '医療介護'],
    img: 'https://images.pexels.com/photos/5538323/pexels-photo-5538323.jpeg?auto=compress&cs=tinysrgb&w=600',
  },
  {
    icon: '🚁',
    title: 'ドローン空撮',
    desc: 'DJI Mavic 3 Pro Cine・Avata 2による高品質空撮。飛行申請経験あり。施設・建設・観光・イベント映像に対応。',
    tags: ['ドローン', '4K空撮', 'FPV'],
    img: 'https://images.unsplash.com/flagged/photo-1580051720305-a944536881fb?w=600&q=80&auto=format&fit=crop',
  },
  {
    icon: '✦',
    title: 'CG・モーショングラフィックス',
    desc: 'After Effects・DaVinci Resolveを駆使したモーショングラフィックス。テロップアニメーション、VFX演出も対応。',
    tags: ['After Effects', 'DaVinci', 'カラーグレーディング'],
    img: 'https://images.unsplash.com/photo-1616161560417-66d4db5892ec?w=600&q=80&auto=format&fit=crop',
  },
  {
    icon: '🏎️',
    title: '車両・バイク撮影',
    desc: '専用のカメラカーや大型バイクを活用し、追走・並走・POV（主観）などダイナミックな走行シーンを安全かつ高品質に撮影します。',
    tags: ['カメラカー', '並走撮影', 'モビリティ', 'POV'],
    img: 'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?w=600&q=80&auto=format&fit=crop',
  },
  {
    icon: '📊',
    title: 'データ分析・KPI設計',
    desc: 'GA4連携のリアルタイム分析ダッシュボードを独自開発。KPI指標の設計からPDCAの仕組み化まで対応。動画コンテンツの効果を数値で検証・改善できる体制を構築します。',
    tags: ['GA4', 'KPI設計', 'PDCA', 'データ分析'],
    img: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&q=80&auto=format&fit=crop',
  },
]

function ServiceCard({ service, delay }) {
  const [ref, isVisible] = useScrollAnimation()

  return (
    <div
      ref={ref}
      className={`fade-up card-hover bg-[#0d0d14] border border-zinc-800/60 rounded-xl overflow-hidden flex flex-col cursor-default ${isVisible ? 'visible' : ''}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {/* Image */}
      <div className="h-44 overflow-hidden relative flex-shrink-0">
        <img
          src={service.img}
          alt={service.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0d0d14] via-black/20 to-transparent" />
        <div className="absolute top-3 left-3 w-8 h-8 rounded-md bg-amber-400/15 border border-amber-400/30 flex items-center justify-center text-sm backdrop-blur-sm">
          {service.icon}
        </div>
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-1">
        <h3 className="text-zinc-100 font-bold text-base mb-2">{service.title}</h3>
        <p className="text-zinc-500 text-sm leading-relaxed mb-4 flex-1">{service.desc}</p>
        <div className="flex flex-wrap gap-1.5">
          {service.tags.map((tag) => (
            <span key={tag} className="text-[11px] text-amber-400/70 bg-amber-400/8 border border-amber-400/15 px-2 py-0.5 rounded-full">
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}

export default function Services() {
  const [ref, isVisible] = useScrollAnimation()

  return (
    <section id="services" className="py-24 bg-[#050507]">
      <div className="max-w-6xl mx-auto px-6">
        <div
          ref={ref}
          className={`text-center mb-16 fade-up ${isVisible ? 'visible' : ''}`}
        >
          <div className="badge">Services</div>
          <h2 className="section-title">提供サービス</h2>
          <p className="section-subtitle">
            映像制作に関わる工程を一貫して対応。<br className="hidden sm:block" />
            目的・KPI・ターゲットを起点に、成果につながるコンテンツを設計します。
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {services.map((s, i) => (
            <ServiceCard key={i} service={s} delay={i * 80} />
          ))}
        </div>
      </div>
    </section>
  )
}
