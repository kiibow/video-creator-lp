import { useState } from 'react'
import { useScrollAnimation } from '../hooks/useScrollAnimation'

const faqs = [
  {
    q: 'どのような案件に対応していますか？',
    a: 'YouTube運用・企業VP・採用動画・教育研修動画・イベント映像・ドローン空撮・ショート動画（TikTok/Reels）など幅広く対応しています。業種は問いません。「こんな映像を作りたいが可能か？」という相談から歓迎しています。',
  },
  {
    q: '依頼から納品まで、どのくらい期間がかかりますか？',
    a: '内容によって異なりますが、目安として撮影込みで2〜4週間、編集のみなら1〜2週間が標準です。急ぎの案件もご相談ください。事前にスケジュールを共有し、納期を守ることを最優先に進行します。',
  },
  {
    q: '撮影場所はどこまで対応できますか？',
    a: '東京・千葉を拠点に、関東圏を中心に対応しています。遠方の場合も交通費実費負担でご対応可能です。また、撮影不要の編集のみの案件はリモートで全国対応しています。',
  },
  {
    q: 'リモート（オンライン）での対応は可能ですか？',
    a: 'もちろん可能です。ヒアリング・打ち合わせはZoom・Google Meet等で対応。進捗共有はGoogleスライドやスプレッドシートを活用し、スムーズなコミュニケーションを心がけています。',
  },
  {
    q: '映像の著作権・使用権はどうなりますか？',
    a: '納品後の映像の使用権は基本的にクライアント様に帰属します。詳細な権利範囲（SNS・広告・社内利用など）については契約時に明確にします。映像素材の二次利用範囲も相談に応じます。',
  },
  {
    q: '修正対応は何回まで対応してもらえますか？',
    a: '標準プランでは初稿提出後2回まで修正対応を含めています。方向性の大幅な変更や仕様変更が生じた場合は別途ご相談となります。初回ヒアリングで認識を合わせることで、修正回数を最小化します。',
  },
  {
    q: 'YouTuberや個人クリエイターへの対応も可能ですか？',
    a: 'はい、もちろん対応しています。個人YouTuberの編集代行から、チャンネル構成の改善提案まで対応。予算規模に合わせた柔軟なプランをご提案します。まずはご相談ください。',
  },
]

export default function FAQ() {
  const [ref, isVisible] = useScrollAnimation()

  return (
    <section id="faq" className="py-24 bg-[#050507]">
      <div className="max-w-3xl mx-auto px-6">
        <div
          ref={ref}
          className={`text-center mb-14 fade-up ${isVisible ? 'visible' : ''}`}
        >
          <div className="badge">FAQ</div>
          <h2 className="section-title">よくある質問</h2>
          <p className="section-subtitle">
            気になる点はお気軽にご質問ください。
          </p>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <FAQItem key={i} faq={faq} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}

function FAQItem({ faq, index }) {
  const [open, setOpen] = useState(false)
  const [ref, isVisible] = useScrollAnimation()

  return (
    <div
      ref={ref}
      className={`fade-up border border-zinc-800/60 rounded-xl overflow-hidden bg-[#0d0d14] ${isVisible ? 'visible' : ''}`}
      style={{ transitionDelay: `${index * 60}ms` }}
    >
      <button
        className="w-full flex items-center justify-between px-5 py-4 text-left group"
        onClick={() => setOpen(!open)}
      >
        <span className="text-zinc-200 text-sm font-medium pr-4 group-hover:text-white transition-colors">
          {faq.q}
        </span>
        <span
          className={`text-amber-400 flex-shrink-0 text-base transition-transform duration-300 ${open ? 'rotate-45' : ''}`}
        >
          +
        </span>
      </button>

      <div
        className={`overflow-hidden transition-all duration-300 ${open ? 'max-h-48' : 'max-h-0'}`}
      >
        <div className="px-5 pb-4 text-zinc-400 text-sm leading-relaxed border-t border-zinc-800/40 pt-3">
          {faq.a}
        </div>
      </div>
    </div>
  )
}
