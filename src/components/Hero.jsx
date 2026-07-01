import { useEffect, useRef, useState } from 'react'

const stats = [
  { num: '8年',    label: '映像業界経験' },
  { num: '100本+', label: '年間制作本数' },
  { num: '160%',   label: 'YouTube登録者増加' },
]

export default function Hero() {
  const videoRef   = useRef(null)
  const bgRef      = useRef(null)
  const contentRef = useRef(null)
  const scrollRef  = useRef(0)
  const rafRef     = useRef(null)
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 100)
    return () => clearTimeout(t)
  }, [])

  // スクロール値だけ記録（passive）
  useEffect(() => {
    const onScroll = () => {
      scrollRef.current = Math.min(window.scrollY / (window.innerHeight * 0.65), 1)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // CSS フィルター更新ループ（WebGL不使用・軽量）
  useEffect(() => {
    let curBlur = 3.0
    let curDim  = 0.48

    const tick = () => {
      rafRef.current = requestAnimationFrame(tick)
      const p = scrollRef.current

      const targetBlur = 3 + p * 8
      const targetDim  = 0.48 + p * 0.24
      curBlur += (targetBlur - curBlur) * 0.07
      curDim  += (targetDim  - curDim)  * 0.07

      // CSS blur（WebGLより遥かに軽量）
      if (bgRef.current) {
        bgRef.current.style.filter =
          `blur(${curBlur.toFixed(1)}px) brightness(${(1 - curDim).toFixed(2)})`
      }
      // テキスト parallax
      if (contentRef.current) {
        const lift = scrollRef.current * window.innerHeight * 0.18 * 0.65
        contentRef.current.style.transform = `translateY(-${lift.toFixed(1)}px)`
        contentRef.current.style.filter = `brightness(${(1 + scrollRef.current * 0.25).toFixed(2)})`
      }
    }
    tick()
    return () => cancelAnimationFrame(rafRef.current)
  }, [])

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#050507]">

      {/* CSS ブラー動画背景（Three.js廃止・GPU負荷を大幅削減） */}
      <div
        ref={bgRef}
        className="absolute inset-0 overflow-hidden pointer-events-none"
        style={{ filter: 'blur(3px) brightness(0.52)', transform: 'scale(1.06)', willChange: 'filter' }}
      >
        <video
          ref={videoRef}
          src="/videos/hero-bg.mp4"
          autoPlay loop muted playsInline
          className="absolute inset-0 w-full h-full object-cover"
        />
      </div>

      {/* グリッドオーバーレイ */}
      <div className="absolute inset-0 bg-grid opacity-25 pointer-events-none" />

      {/* スキャンライン */}
      <div
        className="absolute left-1/3 top-0 bottom-0 w-px pointer-events-none"
        style={{
          background: 'linear-gradient(to bottom, transparent 0%, rgba(251,191,36,0.35) 50%, transparent 100%)',
          height: '30%',
          animation: 'scan-line 6s ease-in-out infinite',
          animationDelay: '1s',
        }}
      />
      <div
        className="absolute left-2/3 top-0 bottom-0 w-px pointer-events-none"
        style={{
          background: 'linear-gradient(to bottom, transparent 0%, rgba(148,163,184,0.25) 50%, transparent 100%)',
          height: '20%',
          animation: 'scan-line 9s ease-in-out infinite',
          animationDelay: '3s',
        }}
      />

      {/* 下部グラデーション */}
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#050507] to-transparent pointer-events-none" />
      {/* 上部ゴールドライン */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-amber-400/40 to-transparent" />

      {/* コンテンツ */}
      <div
        ref={contentRef}
        className={`relative z-10 w-full max-w-5xl mx-auto px-6 pt-28 pb-20 text-center will-change-transform ${
          loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
        }`}
        style={{ transition: loaded ? 'opacity 1s ease' : 'opacity 1s ease, transform 1s ease' }}
      >
        {/* バッジ */}
        <div className="badge">
          <span
            className="w-1.5 h-1.5 rounded-full bg-amber-400"
            style={{ animation: 'badge-ping 2s ease-in-out infinite' }}
          />
          フリーランス映像クリエイター｜東京近郊在住｜業界経験8年
        </div>

        {/* メインヘッディング */}
        <h1 className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-black leading-[1.1] mb-6 pb-2 tracking-tight flex flex-col items-center">
          <span
            style={{
              color: '#ffffff',
              opacity: loaded ? 1 : 0,
              transform: loaded ? 'translateY(0) translateX(0.45em)' : 'translateY(20px) translateX(0.45em)',
              transition: 'opacity 0.8s ease 0.2s, transform 0.8s ease 0.2s',
            }}
          >
            映像で、
          </span>
          <span
            className="text-gradient-animated"
            style={{
              opacity: loaded ? 1 : 0,
              transform: loaded ? 'translateY(0) translateX(0.45em)' : 'translateY(20px) translateX(0.45em)',
              transition: 'opacity 0.8s ease 0.45s, transform 0.8s ease 0.45s',
              paddingBottom: '0.2em',
            }}
          >
            事業を動かす。
          </span>
        </h1>

        {/* サブコピー */}
        <p
          className="text-zinc-400 text-2xl md:text-3xl max-w-3xl mx-auto mb-3 leading-relaxed"
          style={{ opacity: loaded ? 1 : 0, transition: 'opacity 0.8s ease 0.7s' }}
        >
          企画から撮影・編集・AI活用まで幅広く対応。
        </p>
        <p
          className="text-zinc-500 text-xl md:text-2xl max-w-3xl mx-auto mb-12 leading-relaxed"
          style={{ opacity: loaded ? 1 : 0, transition: 'opacity 0.8s ease 0.85s' }}
        >
          視聴データに基づいた構成設計で、<br />CTR・視聴維持率・CVの改善に努めます。
        </p>

        {/* CTA */}
        <div
          className="flex flex-col sm:flex-row gap-4 justify-center mb-16"
          style={{
            opacity: loaded ? 1 : 0,
            transform: loaded ? 'translateY(0)' : 'translateY(10px)',
            transition: 'opacity 0.8s ease 1s, transform 0.8s ease 1s',
          }}
        >
          <a
            href="#portfolio"
            className="relative overflow-hidden bg-amber-400 text-zinc-950 px-9 py-4 rounded font-bold text-base hover:bg-amber-300 transition-all duration-200 hover:shadow-xl hover:shadow-amber-400/25 group"
          >
            <span className="relative z-10">制作実績を見る</span>
            <span
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              style={{ background: 'linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.3) 50%, transparent 60%)' }}
            />
          </a>
          <a
            href="#contact"
            className="border border-zinc-700 text-zinc-300 px-9 py-4 rounded font-bold text-base hover:border-amber-400/50 hover:text-white transition-all duration-200"
          >
            無料相談・お問い合わせ
          </a>
        </div>

        {/* スタット */}
        <div
          className="grid grid-cols-3 gap-6 max-w-md mx-auto"
          style={{ opacity: loaded ? 1 : 0, transition: 'opacity 0.8s ease 1.2s' }}
        >
          {stats.map((s, i) => (
            <div key={i} className="text-center">
              <div
                className="text-2xl md:text-3xl font-black text-amber-400 tabular-nums"
                style={{ animation: 'count-up-glow 3s ease-in-out infinite', animationDelay: `${i * 0.5}s` }}
              >
                {s.num}
              </div>
              <div className="text-zinc-500 text-xs mt-1 leading-snug">{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* スクロールインジケーター */}
      <div className="absolute bottom-16 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-zinc-600 z-10">
        <span className="text-[10px] tracking-widest uppercase">Scroll</span>
        <div
          className="w-px h-8 bg-gradient-to-b from-zinc-600 to-transparent"
          style={{ animation: 'scan-line 2s ease-in-out infinite' }}
        />
      </div>
    </section>
  )
}
