import { useScrollAnimation } from '../hooks/useScrollAnimation'

const career = [
  {
    period: '2012 – 2018',
    company: '株式会社マルハン',
    role: 'コーチ・リクルーター・販促担当',
    desc: '全国4店舗の運営管理。販促POP・サイネージ動画制作・採用映像制作を担当。主力機種の稼働率を60%→80%に改善。スタッフ満足度50%→80%に向上。',
  },
  {
    period: '2018 – 2020',
    company: '株式会社マルハンダイニング',
    role: 'ディレクター（教育・映像）',
    desc: 'PR映像・研修動画100本以上を制作。Excel VBAによる業務効率化で残業30時間/月削減。飲食コンテストで優勝を牽引。',
  },
  {
    period: '2021.7 – 現在',
    company: 'フリーランス',
    role: '映像クリエイター・ディレクター',
    desc: 'AOI Pro.・株式会社パフィン・FILDS・メドレー等の企業と業務委託。多数の映像を企画〜納品まで一貫して担当。',
    current: true,
  },
]

const strengths = [
  {
    title: '成果指標から逆算する制作',
    desc: 'CTR・視聴維持率・CVなど目的のKPIを起点に、構成・テロップ・サムネイルを最適化。感覚ではなくデータで改善します。',
    icon: '📊',
  },
  {
    title: '企画から納品まで一貫対応',
    desc: '要件ヒアリング→企画→撮影→編集→納品をすべてワンストップで対応。コミュニケーションコストや制作コストの最適化を図ります。',
    icon: '⚡',
  },
  {
    title: '現場での人間力・コミュニケーション',
    desc: '演者・出演者への気配りを大切にし、欲しい表情や演技を引き出します。良好な関係構築により、長期的な継続案件も多数いただいております。',
    icon: '🤝',
  },
]

export default function Profile() {
  const [ref, isVisible] = useScrollAnimation()

  return (
    <section id="profile" className="py-24 bg-[#050507]">
      <div className="max-w-6xl mx-auto px-6">
        <div
          ref={ref}
          className={`text-center mb-16 fade-up ${isVisible ? 'visible' : ''}`}
        >
          <div className="badge">Profile</div>
          <h2 className="section-title">プロフィール</h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 mb-16">
          {/* Avatar + basic info */}
          <ProfileAvatar />

          {/* Career timeline */}
          <div className="lg:col-span-3">
            <h3 className="text-zinc-300 font-semibold text-sm tracking-widest uppercase mb-6">Career</h3>
            <div className="space-y-6">
              {career.map((c, i) => (
                <CareerItem key={i} item={c} index={i} />
              ))}
            </div>
          </div>
        </div>

        {/* Strengths */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {strengths.map((s, i) => {
            const [sRef, sVisible] = useScrollAnimation()
            return (
              <div
                key={i}
                ref={sRef}
                className={`fade-up bg-[#0d0d14] border border-zinc-800/60 rounded-xl p-6 ${sVisible ? 'visible' : ''}`}
                style={{ transitionDelay: `${i * 100}ms` }}
              >
                <div className="text-2xl mb-3">{s.icon}</div>
                <h4 className="text-zinc-100 font-bold text-base mb-2">{s.title}</h4>
                <p className="text-zinc-500 text-sm leading-relaxed">{s.desc}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

function ProfileAvatar() {
  const [ref, isVisible] = useScrollAnimation()

  return (
    <div
      ref={ref}
      className={`lg:col-span-2 fade-up ${isVisible ? 'visible' : ''}`}
    >
      <div className="bg-[#0d0d14] border border-zinc-800/60 rounded-xl p-6 text-center">
        <div className="w-24 h-24 rounded-full mx-auto mb-4 overflow-hidden">
          <img src="/profile.png" alt="橘井雅俊" className="w-full h-full object-cover" />
        </div>
        <h3 className="text-zinc-100 font-black text-xl mb-0.5">橘井 雅俊</h3>
        <p className="text-amber-400 text-xs font-medium mb-4">映像クリエイター・ディレクター</p>
        <div className="space-y-2 text-left">
          {[
            { label: '拠点', value: '東京・千葉（全国対応可）' },
            { label: '経験', value: '業界8年 / フリーランス5年+' },
            { label: '学歴', value: 'デジタルハリウッド CG/VFX専攻' },
            { label: '得意', value: 'YouTube運用、企業PR、採用動画' },
          ].map((item) => (
            <div key={item.label} className="flex gap-3">
              <span className="text-zinc-600 text-sm w-10 flex-shrink-0 pt-0.5">{item.label}</span>
              <span className="text-zinc-300 text-sm leading-relaxed">{item.value}</span>
            </div>
          ))}
        </div>
        <a
          href="#contact"
          className="block mt-5 bg-amber-400 text-zinc-950 py-2.5 rounded font-bold text-sm hover:bg-amber-300 transition-colors"
        >
          お問い合わせ
        </a>
      </div>
    </div>
  )
}

function CareerItem({ item, index }) {
  const [ref, isVisible] = useScrollAnimation()

  return (
    <div
      ref={ref}
      className={`fade-up flex gap-4 ${isVisible ? 'visible' : ''}`}
      style={{ transitionDelay: `${index * 120}ms` }}
    >
      <div className="flex flex-col items-center">
        <div className={`w-3 h-3 rounded-full flex-shrink-0 mt-1 ${item.current ? 'bg-amber-400' : 'bg-zinc-600'}`} />
        {index < 2 && <div className="w-px flex-1 bg-zinc-800 mt-2" />}
      </div>
      <div className="pb-4">
        <div className="text-zinc-500 text-sm mb-1">{item.period}</div>
        <div className="text-zinc-100 font-semibold text-base">{item.company}</div>
        <div className="text-amber-400/80 text-sm mb-1.5">{item.role}</div>
        <p className="text-zinc-500 text-sm leading-relaxed">{item.desc}</p>
        {item.current && (
          <span className="inline-block mt-2 text-xs text-amber-400 bg-amber-400/10 border border-amber-400/20 px-2 py-0.5 rounded-full">
            現在
          </span>
        )}
      </div>
    </div>
  )
}
