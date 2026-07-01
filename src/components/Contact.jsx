import { useState } from 'react'
import { useScrollAnimation } from '../hooks/useScrollAnimation'

const contactTypes = [
  'YouTube運用・動画制作',
  '企業VP・PR映像',
  '採用動画',
  '教育・研修動画',
  'ドローン空撮',
  'イベント映像',
  'その他',
]

const FORMSPREE_ENDPOINT = 'https://formspree.io/f/YOUR_FORM_ID'

export default function Contact() {
  const [ref, isVisible] = useScrollAnimation()
  const [form, setForm] = useState({ name: '', email: '', type: '', message: '' })
  const [status, setStatus] = useState('idle') // idle | sending | success | error

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus('sending')
    try {
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      if (res.ok) {
        setStatus('success')
        setForm({ name: '', email: '', type: '', message: '' })
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  return (
    <section id="contact" className="py-24 bg-[#080810]">
      <div className="max-w-5xl mx-auto px-6">
        <div
          ref={ref}
          className={`text-center mb-16 fade-up ${isVisible ? 'visible' : ''}`}
        >
          <div className="badge">Contact</div>
          <h2 className="section-title">お問い合わせ</h2>
          <p className="section-subtitle">
            まずはお気軽にご相談ください。内容を確認後、2営業日以内にご返信します。
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
          {/* Contact info */}
          <ContactInfo />

          {/* Form */}
          <div className="lg:col-span-3">
            {status === 'success' ? (
              <div className="bg-[#0d0d14] border border-amber-400/30 rounded-xl p-10 text-center">
                <div className="text-4xl mb-4">✅</div>
                <h3 className="text-zinc-100 font-bold text-lg mb-2">送信が完了しました</h3>
                <p className="text-zinc-400 text-sm">
                  お問い合わせありがとうございます。<br />
                  2営業日以内にご返信します。
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-zinc-400 text-xs mb-1.5">お名前 / 会社名 *</label>
                    <input
                      type="text"
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      required
                      placeholder="橘井太郎 / 株式会社◯◯"
                      className="w-full bg-[#0d0d14] border border-zinc-800/80 rounded-lg px-4 py-3 text-zinc-200 text-sm placeholder-zinc-700 focus:outline-none focus:border-amber-400/50 transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-zinc-400 text-xs mb-1.5">メールアドレス *</label>
                    <input
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      required
                      placeholder="your@email.com"
                      className="w-full bg-[#0d0d14] border border-zinc-800/80 rounded-lg px-4 py-3 text-zinc-200 text-sm placeholder-zinc-700 focus:outline-none focus:border-amber-400/50 transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-zinc-400 text-xs mb-1.5">ご依頼の種別</label>
                  <select
                    name="type"
                    value={form.type}
                    onChange={handleChange}
                    className="w-full bg-[#0d0d14] border border-zinc-800/80 rounded-lg px-4 py-3 text-zinc-200 text-sm focus:outline-none focus:border-amber-400/50 transition-colors appearance-none"
                  >
                    <option value="">選択してください</option>
                    {contactTypes.map((t) => (
                      <option key={t} value={t}>{t}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-zinc-400 text-xs mb-1.5">ご相談内容 *</label>
                  <textarea
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    placeholder="制作したい映像の内容・目的・ご予算・納期感など、お気軽にご記入ください。"
                    className="w-full bg-[#0d0d14] border border-zinc-800/80 rounded-lg px-4 py-3 text-zinc-200 text-sm placeholder-zinc-700 focus:outline-none focus:border-amber-400/50 transition-colors resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={status === 'sending'}
                  className="w-full bg-amber-400 text-zinc-950 py-4 rounded-lg font-bold text-base hover:bg-amber-300 transition-colors duration-200 disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {status === 'sending' ? '送信中...' : '送信する'}
                </button>
                {status === 'error' && (
                  <p className="text-red-400 text-xs text-center">
                    送信に失敗しました。時間をおいて再度お試しください。
                  </p>
                )}
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

function ContactInfo() {
  const [ref, isVisible] = useScrollAnimation()

  return (
    <div
      ref={ref}
      className={`lg:col-span-2 fade-up ${isVisible ? 'visible' : ''}`}
    >
      <div className="bg-[#0d0d14] border border-zinc-800/60 rounded-xl p-6 space-y-5">
        <div>
          <div className="text-zinc-500 text-xs mb-1">Email</div>
          <a
            href="mailto:kiibowjack1112@gmail.com"
            className="text-zinc-200 text-sm hover:text-amber-400 transition-colors break-all"
          >
            kiibowjack1112@gmail.com
          </a>
        </div>
        <div>
          <div className="text-zinc-500 text-xs mb-1">Portfolio</div>
          <a
            href="https://foriio.com/m-kitsui"
            target="_blank"
            rel="noopener noreferrer"
            className="text-zinc-200 text-sm hover:text-amber-400 transition-colors"
          >
            foriio.com/m-kitsui
          </a>
        </div>
        <div>
          <div className="text-zinc-500 text-xs mb-1">対応エリア</div>
          <div className="text-zinc-300 text-sm">東京・千葉（遠方応相談）</div>
        </div>
        <div>
          <div className="text-zinc-500 text-xs mb-1">対応形式</div>
          <div className="text-zinc-300 text-sm">対面・リモート（全国可）</div>
        </div>
        <div className="pt-3 border-t border-zinc-800/50">
          <div className="text-zinc-500 text-xs mb-2">得意な案件ジャンル</div>
          <div className="flex flex-wrap gap-1.5">
            {['YouTube運用', '企業VP', '採用動画', 'イベント映像', '教育動画', 'ドローン空撮'].map((tag) => (
              <span key={tag} className="text-[10px] text-zinc-400 bg-zinc-800/60 px-2 py-0.5 rounded-full">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
