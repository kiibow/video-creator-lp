import { useScrollAnimation, useCounter } from '../hooks/useScrollAnimation'

const metrics = [
  {
    value: 8,
    suffix: '年',
    label: '映像業界経験',
    desc: '2021年7月独立。デジタルハリウッド CG/VFX専攻修了',
  },
  {
    value: 100,
    suffix: '本+',
    label: '年間制作本数',
    desc: 'YouTube・ショート・企業VP・研修動画など',
  },
  {
    value: 50,
    suffix: '%',
    label: 'CTR・視聴維持率向上',
    desc: 'pafin社YouTubeチャンネルにおける改善実績',
  },
  {
    value: 160,
    suffix: '%',
    label: 'YouTube登録者増加',
    desc: '8,000人 → 13,300人へ成長させた実績',
  },
]

const highlights = [
  { icon: '🏆', text: 'カンファレンス・スポーツ等 大型イベント映像制作に携わる' },
  { icon: '🤖', text: 'AI（ChatGPT / Gemini）を編集フローに組み込み生産性向上' },
  { icon: '📱', text: 'TikTokにて再生数10万回超のコンテンツを制作' },
  { icon: '🎓', text: 'ジョブメドレーアカデミー 医療・介護研修動画を継続担当' },
]

function HighlightItem({ item, delay }) {
  const [ref, isVisible] = useScrollAnimation()
  return (
    <div
      ref={ref}
      className={`fade-up flex items-start gap-3 bg-[#0d0d14] border border-zinc-800/60 rounded-lg px-5 py-4 ${isVisible ? 'visible' : ''}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <span className="text-xl flex-shrink-0 mt-0.5">{item.icon}</span>
      <span className="text-zinc-300 text-base leading-relaxed">{item.text}</span>
    </div>
  )
}

function CounterCard({ metric, index }) {
  const [ref, isVisible] = useScrollAnimation()
  const count = useCounter(metric.value, 2000, isVisible)

  return (
    <div
      ref={ref}
      className={`fade-up bg-[#0d0d14] border border-zinc-800/60 rounded-xl p-6 text-center ${isVisible ? 'visible' : ''}`}
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      <div className="text-5xl md:text-6xl font-black text-amber-400 tabular-nums leading-none mb-2">
        {count}
        <span className="text-3xl md:text-4xl">{metric.suffix}</span>
      </div>
      <div className="text-zinc-100 font-semibold text-base mb-1">{metric.label}</div>
      <div className="text-zinc-500 text-sm leading-snug">{metric.desc}</div>
    </div>
  )
}

export default function Achievements() {
  const [ref, isVisible] = useScrollAnimation()

  return (
    <section id="achievements" className="py-24 bg-[#080810]">
      <div className="max-w-6xl mx-auto px-6">
        <div
          ref={ref}
          className={`text-center mb-16 fade-up ${isVisible ? 'visible' : ''}`}
        >
          <div className="badge">Results</div>
          <h2 className="section-title">数字で見る実績</h2>
          <p className="section-subtitle">
            制作本数だけでなく、成果指標にこだわった映像制作を続けています。
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
          {metrics.map((m, i) => (
            <CounterCard key={i} metric={m} index={i} />
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {highlights.map((h, i) => (
            <HighlightItem key={i} item={h} delay={i * 80} />
          ))}
        </div>
      </div>
    </section>
  )
}
