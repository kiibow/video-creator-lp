import { useState, useEffect, useCallback } from 'react'
import { useScrollAnimation } from '../hooks/useScrollAnimation'

const works = [
  {
    category: 'YouTube運用',
    client: 'pafin株式会社',
    title: 'YouTubeチャンネル運用・TikTok制作',
    desc: '年間100本以上の動画を企画・撮影・編集・サムネ制作まで一括担当。AIを活用した制作フローで登録者8,000人→13,300人（160%増）を達成。TikTokでは10万再生を超えるコンテンツも制作。',
    tags: ['YouTube', 'TikTok', 'AI活用', 'ショート動画'],
    result: '登録者 160% 増加',
    videoId: '2g-P53BodzY',
    linkUrl: 'https://www.youtube.com/@pafin',
    linkLabel: 'チャンネルを見る',
    color: 'from-red-900/30 to-red-950/60',
  },
  {
    category: 'メイキング映像',
    client: '株式会社AOI Pro.',
    title: 'JR東日本「撮り旅 in 八王子」メイキング',
    desc: '大手制作会社AOI Pro.とのコラボレーション。JR東日本のロケ現場でメイキング映像のディレクション・撮影・編集を担当。大規模撮影現場の制作フローを熟知したドキュメンタリータッチの映像に。',
    tags: ['メイキング', 'ドキュメンタリー', 'Sony FX3', 'DaVinci'],
    result: '大手制作会社との協業実績',
    videoId: 'P_t22RGBHLo',
    linkUrl: 'https://youtu.be/P_t22RGBHLo',
    linkLabel: '動画を見る',
    color: 'from-blue-900/30 to-blue-950/60',
  },
  {
    category: '研修・教育動画',
    client: '株式会社メドレー',
    title: 'ジョブメドレーアカデミー 研修動画制作',
    desc: '医療・介護・福祉従事者向けオンライン研修の映像制作を継続担当。医療SaaSという性質上、情報の誤りが現場で命取りになりかねないため、専門書・一次文献の確認を徹底した上でスクリプトを構成。学習効果を高める視覚設計・カット割りと、正確性への細心の注意を両立させた制作フローを実践。',
    tags: ['eラーニング', '医療介護', '文献確認', '教育コンテンツ', 'SaaS'],
    result: '継続受注中（2026年〜）',
    videoId: 'vymOG0YtFJk',
    linkUrl: 'https://www.youtube.com/watch?v=vymOG0YtFJk',
    linkLabel: '動画を見る',
    color: 'from-emerald-900/30 to-emerald-950/60',
  },
  {
    category: 'イベント映像',
    client: 'Symphonity株式会社',
    title: 'イベント映像制作',
    desc: 'カンファレンス・スポーツ試合・企業イベントの撮影・編集を担当。',
    tags: ['イベント映像', '撮影', '編集'],
    result: '視聴数トップクラスのコンテンツ制作',
    videoId: null,
    linkUrl: null,
    linkLabel: null,
    nonPublic: true,
    color: 'from-purple-900/30 to-purple-950/60',
  },
  {
    category: 'YouTube広告',
    client: '銀座カラー',
    title: 'YouTube広告 撮影・編集',
    desc: '大手美容脱毛ブランドの公式YouTube広告を制作。ターゲット層に刺さる映像表現と、スキップされにくい冒頭設計を意識して制作。',
    tags: ['YouTube広告', '美容PR', '人物撮影', '編集'],
    result: '公式YouTube広告として採用・配信',
    videoId: 'e4-_dDBE2gM',
    linkUrl: 'https://youtu.be/e4-_dDBE2gM',
    linkLabel: '動画を見る',
    color: 'from-pink-900/30 to-pink-950/60',
  },
  {
    category: '教育コンテンツ',
    client: 'FILDS株式会社',
    title: '業界解説動画・教育コンテンツ（月3本）',
    desc: '企画立案・講師対応・進行管理・撮影・編集をワンストップで納品。サムネイルとYouTubeの見せ方を最適化するPDCAを継続し、多くの動画が視聴ランキング上位にランクイン。',
    tags: ['セミナー', 'インタビュー', 'PDCAサイクル'],
    result: '月間視聴ランキングで上位獲得',
    videoId: 'nF0vhOylVJc',
    linkUrl: 'https://www.youtube.com/watch?v=nF0vhOylVJc',
    linkLabel: '動画を見る',
    color: 'from-amber-900/30 to-amber-950/60',
  },
  {
    category: '店舗・商品PR',
    client: '東京プレミアムダイニング',
    title: '越前ガニ特設LP 素材動画・店舗PR映像',
    desc: '商品PR目的の店舗・商品撮影および編集を担当。食品演出・ドローン撮影・カラーグレーディングで高品質な素材映像を制作。制作した映像素材が特設LP内で実際に活用されています。',
    tags: ['食品PR', '店舗撮影', 'ドローン', 'カラーグレーディング'],
    result: '特設LP掲載・実装済み',
    videoId: null,
    thumbUrl: 'https://crab.azabu.jpn.com/assets/img/img_about01.jpg',
    linkUrl: 'https://crab.azabu.jpn.com/',
    linkLabel: 'LPを見る',
    color: 'from-orange-900/30 to-orange-950/60',
  },
  {
    category: 'PR動画',
    client: 'レッドロック',
    title: 'ブランドPR動画（年間資料数1位獲得）',
    desc: '企画・撮影・編集をワンストップで担当したブランドPR動画。訴求ポイントを絞り込んだストーリー構成と高品質な映像表現が評価され、年間を通じた視聴数でランキング1位を達成。',
    tags: ['ブランドPR', '企画・構成', '撮影・編集'],
    result: '年間視聴数ランキング1位',
    videoId: '2ZW-nj5eMaY',
    linkUrl: 'https://www.youtube.com/watch?v=2ZW-nj5eMaY',
    linkLabel: '動画を見る',
    color: 'from-rose-900/30 to-rose-950/60',
  },
  {
    category: 'BtoB動画',
    client: 'PS情報ステーション',
    title: 'BtoB向け教育コンテンツ',
    desc: '企画立案から構成・撮影・編集まで一貫して担当。ターゲットに刺さるテーマ設定とわかりやすい情報整理により、BtoBメディア内の視聴ランキングで継続的に上位を獲得中。',
    tags: ['BtoB', '企画・構成', '教育コンテンツ', 'ランキング上位'],
    result: 'BtoBメディア視聴ランキング上位を継続獲得',
    videoId: '0_d1eHKtY7A',
    linkUrl: 'https://www.youtube.com/watch?v=0_d1eHKtY7A',
    linkLabel: '動画を見る',
    color: 'from-sky-900/30 to-sky-950/60',
  },
  {
    category: 'データ分析・KPI設計',
    client: 'BtoBメディア運用',
    title: 'GA4分析ダッシュボード・KPI設計',
    desc: 'GA4連携のリアルタイム分析ダッシュボードを独自開発。DAU/MAU・バウンスレート・エンゲージメント率など指標設計からPDCAの仕組み化まで対応。動画コンテンツの効果検証を数値で回せる体制を構築。',
    tags: ['GA4', 'KPI設計', 'PDCA', 'データ分析', 'GAS'],
    result: 'データドリブンな改善サイクルを実現',
    videoId: null,
    thumbUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&q=80&auto=format&fit=crop',
    linkUrl: '/psstation-demo.html',
    linkLabel: 'デモを見る',
    color: 'from-violet-900/30 to-violet-950/60',
  },
]

function VideoModal({ videoId, onClose }) {
  const handleKey = useCallback(
    (e) => { if (e.key === 'Escape') onClose() },
    [onClose]
  )

  useEffect(() => {
    window.addEventListener('keydown', handleKey)
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', handleKey)
      document.body.style.overflow = ''
    }
  }, [handleKey])

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-sm px-4"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-3xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute -top-10 right-0 text-zinc-400 hover:text-white text-sm flex items-center gap-1.5 transition-colors"
        >
          <span>✕</span>
          <span>閉じる（ESC）</span>
        </button>
        <div className="aspect-video rounded-xl overflow-hidden shadow-2xl border border-zinc-800">
          <iframe
            src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`}
            className="w-full h-full"
            allow="autoplay; encrypted-media; fullscreen"
            allowFullScreen
            title="YouTube動画"
          />
        </div>
      </div>
    </div>
  )
}

function Thumbnail({ videoId, thumbUrl, siteUrl, color, onClick, nonPublic }) {
  if (nonPublic) {
    return (
      <div className={`h-44 bg-gradient-to-br ${color} relative flex flex-col items-center justify-center gap-2`}>
        <div className="w-10 h-10 rounded-full bg-white/10 border border-white/20 flex items-center justify-center">
          <svg className="w-5 h-5 text-zinc-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
          </svg>
        </div>
        <div className="text-center px-4">
          <p className="text-zinc-300 text-sm font-semibold">映像あり / 非公開</p>
          <p className="text-zinc-600 text-xs mt-1">ご要望の際はお問い合わせください</p>
        </div>
      </div>
    )
  }

  const isSite  = !videoId && !thumbUrl && !!siteUrl
  const isThumb = !!thumbUrl

  const initialSrc = thumbUrl
    ? thumbUrl
    : videoId
      ? `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`
      : isSite
        ? `https://image.thum.io/get/width/600/crop/400/${siteUrl}`
        : null

  const [imgSrc, setImgSrc]       = useState(initialSrc)
  const [imgLoaded, setImgLoaded] = useState(false)
  const [imgFailed, setImgFailed] = useState(false)

  const handleLoad = (e) => {
    if (videoId && e.target.naturalWidth <= 120) {
      setImgSrc(`https://img.youtube.com/vi/${videoId}/hqdefault.jpg`)
      return
    }
    setImgLoaded(true)
  }

  const handleError = () => {
    if (imgSrc?.includes('maxresdefault')) {
      setImgSrc(`https://img.youtube.com/vi/${videoId}/hqdefault.jpg`)
    } else {
      setImgFailed(true)
    }
  }

  if (!videoId && !isThumb && !isSite || imgFailed) {
    return (
      <div className={`h-44 bg-gradient-to-br ${color} relative flex items-center justify-center`}>
        <svg className="w-8 h-8 text-zinc-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 10l4.553-2.069A1 1 0 0121 8.882v6.236a1 1 0 01-1.447.894L15 14M3 8a2 2 0 012-2h10a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2V8z" />
        </svg>
      </div>
    )
  }

  return (
    <div
      className="h-44 relative overflow-hidden cursor-pointer group/thumb"
      onClick={onClick}
    >
      {!imgLoaded && (
        <div className={`absolute inset-0 bg-gradient-to-br ${color} animate-pulse`} />
      )}
      <img
        src={imgSrc}
        alt={isSite ? 'サイトプレビュー' : 'サムネイル'}
        className={`w-full h-full object-cover object-top transition-all duration-300 group-hover/thumb:scale-105 ${imgLoaded ? 'opacity-100' : 'opacity-0'}`}
        onLoad={handleLoad}
        onError={handleError}
      />
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/30 group-hover/thumb:bg-black/20 transition-colors" />
      {/* Center icon */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-12 h-12 rounded-full bg-white/15 backdrop-blur-sm border border-white/30 flex items-center justify-center group-hover/thumb:scale-110 group-hover/thumb:bg-amber-400/80 transition-all duration-200">
          {(isSite || isThumb) ? (
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          ) : (
            <svg className="w-5 h-5 text-white ml-0.5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z" />
            </svg>
          )}
        </div>
      </div>
      {/* Badge */}
      <div className="absolute bottom-2 right-2 flex items-center gap-1 bg-black/60 rounded px-1.5 py-0.5">
        {(isSite || isThumb) ? (
          <>
            <svg className="w-3 h-3 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
            </svg>
            <span className="text-white text-[9px] font-medium">WEBSITE</span>
          </>
        ) : (
          <>
            <svg className="w-3 h-3 text-red-500" fill="currentColor" viewBox="0 0 24 24">
              <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
            </svg>
            <span className="text-white text-[9px] font-medium">再生</span>
          </>
        )}
      </div>
    </div>
  )
}

function PortfolioCard({ work, delay }) {
  const [ref, isVisible] = useScrollAnimation()
  const [modalOpen, setModalOpen] = useState(false)

  return (
    <>
      <div
        ref={ref}
        className={`fade-up card-hover bg-[#0d0d14] border border-zinc-800/60 rounded-xl overflow-hidden flex flex-col ${isVisible ? 'visible' : ''}`}
        style={{ transitionDelay: `${delay}ms` }}
      >
        <Thumbnail
          videoId={work.videoId}
          thumbUrl={work.thumbUrl}
          siteUrl={work.siteUrl}
          color={work.color}
          nonPublic={work.nonPublic}
          onClick={
            work.videoId
              ? () => setModalOpen(true)
              : work.linkUrl
                ? () => window.open(work.linkUrl, '_blank', 'noopener noreferrer')
                : undefined
          }
        />

        <div className="p-5 flex flex-col flex-1">
          <div className="text-zinc-500 text-xs mb-1">{work.client}</div>
          <div className="flex items-center gap-2 mb-2">
            <span className="text-[10px] font-semibold text-zinc-500 bg-zinc-800/70 px-2 py-0.5 rounded-full">
              {work.category}
            </span>
          </div>
          <h3 className="text-zinc-100 font-bold text-base mb-2 leading-snug">{work.title}</h3>
          <p className="text-zinc-500 text-sm leading-relaxed mb-4 flex-1">{work.desc}</p>

          <div className="flex flex-wrap gap-1 mb-4">
            {work.tags.map((tag) => (
              <span key={tag} className="text-xs text-zinc-500 bg-zinc-800/60 px-2 py-0.5 rounded-full">
                {tag}
              </span>
            ))}
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-zinc-800/60 gap-2">
            <div className="flex items-center gap-1.5 text-amber-400/80 text-sm font-medium min-w-0">
              <span className="flex-shrink-0">✦</span>
              <span className="truncate">{work.result}</span>
            </div>
            <div className="flex items-center gap-2 flex-shrink-0">
              {work.videoId && (
                <button
                  onClick={() => setModalOpen(true)}
                  className="text-xs text-zinc-400 hover:text-amber-400 transition-colors flex items-center gap-1 bg-zinc-800/60 hover:bg-zinc-800 px-2 py-1 rounded"
                >
                  <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                  再生
                </button>
              )}
              {work.linkUrl && (
                <a
                  href={work.linkUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-zinc-500 hover:text-amber-400 transition-colors flex items-center gap-1"
                >
                  {work.linkLabel}
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
              )}
            </div>
          </div>
        </div>
      </div>

      {modalOpen && (
        <VideoModal videoId={work.videoId} onClose={() => setModalOpen(false)} />
      )}
    </>
  )
}

export default function Portfolio() {
  const [ref, isVisible] = useScrollAnimation()

  return (
    <section id="portfolio" className="py-24 bg-[#050507]">
      <div className="max-w-6xl mx-auto px-6">
        <div
          ref={ref}
          className={`text-center mb-16 fade-up ${isVisible ? 'visible' : ''}`}
        >
          <div className="badge">Portfolio</div>
          <h2 className="section-title">制作実績</h2>
          <p className="section-subtitle">
            企業VP・YouTube運用・イベント映像・研修動画など、<br className="hidden sm:block" />
            業種を問わず幅広い案件を手がけてきました。
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {works.map((work, i) => (
            <PortfolioCard key={i} work={work} delay={i * 80} />
          ))}
        </div>

        <p className="text-center text-zinc-600 text-xs mt-8">
          ▲ サムネイルをクリックするとページ内で動画を再生できます
        </p>

        {/* 企画書・制作資料 */}
        <div className="mt-20 pt-16 border-t border-zinc-800/40">
          <div className="mb-10">
            <div className="badge">Documents</div>
            <h3 className="text-2xl font-bold text-zinc-100 mt-3 mb-2">企画書 / 制作資料</h3>
            <p className="text-zinc-500 text-sm leading-relaxed">
              映像の上流工程である企画立案・構成設計・撮影計画も対応しています。<br className="hidden sm:block" />
              実際の提案書・資料はご要望の際にお問い合わせください。
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              {
                tag: 'コンテンツ戦略',
                domain: 'フィンテック / 暗号資産SaaS',
                title: 'コンテンツロードマップ 2026〜2027',
                point: '暗号資産×YouTubeという難易度の高い領域で、3本柱のテーマ設計と12か月のコンテンツ計画を策定。',
                result: '視聴者層ごとの入口を設計した年間ロードマップ',
                color: 'from-blue-900/30 to-blue-950/60',
              },
              {
                tag: '撮影計画',
                domain: '医療SaaS企業',
                title: '密着ドキュメンタリー ショットリスト',
                point: '医療現場の複雑な許可事情に対応するため、シーン別に3段階の許可フラグを設定した撮影基準表を作成。',
                result: 'スタッフ全員が現場判断に依存せず動ける設計',
                color: 'from-teal-900/30 to-teal-950/60',
              },
              {
                tag: '企画提案',
                domain: '医療SaaS企業',
                title: '密着ドキュメンタリー シリーズ企画提案書',
                point: '2チャンネルのコンテンツ差別化を目的に継続シリーズとして設計。ログライン設定〜構成・演出方針まで一貫して提案。',
                result: 'チャンネルごとの差別化ポイントを明確化した企画提案',
                color: 'from-teal-900/30 to-teal-950/60',
              },
            ].map((doc, i) => (
              <div key={i} className="bg-[#0d0d14] border border-zinc-800/60 rounded-xl overflow-hidden flex flex-col">
                <div className={`h-44 bg-gradient-to-br ${doc.color} relative flex flex-col items-center justify-center gap-2`}>
                  <div className="w-10 h-10 rounded-full bg-white/10 border border-white/20 flex items-center justify-center">
                    <svg className="w-5 h-5 text-zinc-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                  <div className="text-center px-4">
                    <p className="text-zinc-300 text-sm font-semibold">企画書あり / 非公開</p>
                    <p className="text-zinc-600 text-xs mt-1">ご要望の際はお問い合わせください</p>
                  </div>
                </div>
                <div className="p-5 flex flex-col flex-1">
                  <div className="text-zinc-500 text-xs mb-1">{doc.domain}</div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-[10px] font-semibold text-zinc-500 bg-zinc-800/70 px-2 py-0.5 rounded-full">
                      {doc.tag}
                    </span>
                  </div>
                  <h3 className="text-zinc-100 font-bold text-base mb-2 leading-snug">{doc.title}</h3>
                  <p className="text-zinc-500 text-sm leading-relaxed flex-1">{doc.point}</p>
                  <div className="flex items-center gap-1.5 text-amber-400/80 text-sm font-medium pt-4 mt-4 border-t border-zinc-800/60">
                    <span className="flex-shrink-0">✦</span>
                    <span>{doc.result}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
