import { useScrollAnimation } from '../hooks/useScrollAnimation'

const steps = [
  {
    num: '01',
    title: 'お問い合わせ',
    desc: 'フォームやメールで案件の概要をお送りください。内容を確認後、2営業日以内にご返信します。',
    icon: '✉',
  },
  {
    num: '02',
    title: 'ヒアリング・要件整理',
    desc: '目的・KPI・ターゲット・予算・納期をオンラインでヒアリング。コンセプト設計の方向性を合わせます。',
    icon: '💬',
  },
  {
    num: '03',
    title: '企画・見積もり提出',
    desc: '構成案・スケジュール・見積書をGoogleスライドで提出。イメージのズレが起きないよう丁寧にご確認いただきます。',
    icon: '📋',
  },
  {
    num: '04',
    title: '撮影・制作',
    desc: '承認後、スケジュールに従って撮影・編集を進行。進捗は随時共有し、途中変更にも柔軟に対応します。',
    icon: '🎬',
  },
  {
    num: '05',
    title: '修正・納品',
    desc: '初稿をご確認いただき、修正対応後に最終納品。ファイル形式・プラットフォーム要件に合わせた書き出しで納品します。',
    icon: '✅',
  },
]

export default function Flow() {
  const [ref, isVisible] = useScrollAnimation()

  return (
    <section id="flow" className="py-24 bg-[#080810]">
      <div className="max-w-4xl mx-auto px-6">
        <div
          ref={ref}
          className={`text-center mb-16 fade-up ${isVisible ? 'visible' : ''}`}
        >
          <div className="badge">Process</div>
          <h2 className="section-title">ご依頼の流れ</h2>
          <p className="section-subtitle">
            問い合わせから納品まで、スムーズな制作進行を心がけています。
          </p>
        </div>

        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-amber-400/30 via-amber-400/10 to-transparent -translate-x-1/2 hidden md:block" />

          <div className="space-y-8">
            {steps.map((step, i) => (
              <StepCard key={i} step={step} index={i} isLeft={i % 2 === 0} />
            ))}
          </div>
        </div>

        <div className="mt-16 text-center">
          <p className="text-zinc-500 text-sm mb-6">
            まずは気軽にご相談ください。対応可否やスケジュール感をお伝えします。
          </p>
          <a
            href="#contact"
            className="inline-block bg-amber-400 text-zinc-950 px-10 py-4 rounded font-bold hover:bg-amber-300 transition-colors"
          >
            無料相談・お問い合わせ
          </a>
        </div>
      </div>
    </section>
  )
}

function StepCard({ step, index, isLeft }) {
  const [ref, isVisible] = useScrollAnimation()

  return (
    <div
      ref={ref}
      className={`fade-up relative flex gap-6 items-start ${isVisible ? 'visible' : ''} ${
        isLeft ? 'md:flex-row' : 'md:flex-row-reverse'
      }`}
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      {/* Step indicator (desktop center) */}
      <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-[#0d0d14] border-2 border-amber-400/50 items-center justify-center z-10 flex-shrink-0">
        <span className="text-amber-400 text-xs font-black">{step.num}</span>
      </div>

      {/* Content card */}
      <div className={`md:w-[calc(50%-3rem)] bg-[#0d0d14] border border-zinc-800/60 rounded-xl p-5 ${isLeft ? 'md:mr-auto' : 'md:ml-auto'} w-full`}>
        <div className="flex items-center gap-3 mb-3">
          <span className="text-xl">{step.icon}</span>
          <div>
            <span className="text-amber-400 text-xs font-bold md:hidden">{step.num}. </span>
            <span className="text-zinc-100 font-bold text-sm">{step.title}</span>
          </div>
        </div>
        <p className="text-zinc-500 text-xs leading-relaxed">{step.desc}</p>
      </div>

      {/* Spacer for opposite side (desktop) */}
      <div className="hidden md:block md:w-[calc(50%-3rem)]" />
    </div>
  )
}
