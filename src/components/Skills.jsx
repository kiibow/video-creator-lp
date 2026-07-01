import { useScrollAnimation } from '../hooks/useScrollAnimation'

const toolGroups = [
  {
    title: '映像制作',
    tools: [
      { name: 'Premiere Pro', level: 5 },
      { name: 'After Effects', level: 5 },
      { name: 'DaVinci Resolve', level: 5 },
      { name: 'Media Encoder', level: 5 },
      { name: 'Final Cut Pro', level: 2 },
      { name: 'Audition', level: 4 },
    ],
  },
  {
    title: 'デザイン・グラフィック',
    tools: [
      { name: 'Photoshop', level: 5 },
      { name: 'Illustrator', level: 4 },
      { name: 'CINEMA 4D', level: 2 },
      { name: 'Maya', level: 1 },
      { name: 'Unreal Engine 5', level: 1 },
      { name: 'Substance Painter', level: 1 },
    ],
  },
  {
    title: 'AI・データ分析',
    tools: [
      { name: 'ChatGPT', level: 5 },
      { name: 'Gemini', level: 5 },
      { name: 'Claude Code', level: 4 },
      { name: 'Google Analytics', level: 4 },
      { name: 'YouTube Analytics', level: 5 },
      { name: 'Google Slides / Sheets', level: 5 },
    ],
  },
]

const equipment = [
  { name: 'Sony FX6', desc: 'メイン撮影カメラ（フルサイズシネマライン）', icon: '🎬' },
  { name: 'Sony FX3', desc: 'サブ撮影カメラ（シネマライン）', icon: '📷' },
  { name: 'DJI Mavic 3 Pro Cine', desc: '空撮ドローン（4K/60fps）', icon: '🚁' },
  { name: 'DJI Avata 2', desc: 'FPVドローン', icon: '🎮' },
  { name: 'DJI RS3 Pro', desc: '3軸ジンバルスタビライザー', icon: '🎥' },
  { name: 'Nanlite / Aputure', desc: 'LEDライティング', icon: '💡' },
  { name: 'Sennheiser MKH416/600', desc: 'プロフェッショナルマイク', icon: '🎙' },
]

const levelLabel = ['', '入門', '基礎', '経験', '上級', '得意']

function ToolGroupCard({ group, delay, levelLabel }) {
  const [ref, isVisible] = useScrollAnimation()
  return (
    <div
      ref={ref}
      className={`fade-up bg-[#0d0d14] border border-zinc-800/60 rounded-xl p-6 ${isVisible ? 'visible' : ''}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <h3 className="text-amber-400 font-semibold text-sm mb-5">{group.title}</h3>
      <div className="space-y-3.5">
        {group.tools.map((tool) => (
          <div key={tool.name}>
            <div className="flex justify-between items-center mb-1.5">
              <span className="text-zinc-300 text-sm">{tool.name}</span>
              <span className="text-zinc-600 text-xs">{levelLabel[tool.level]}</span>
            </div>
            <div className="h-1.5 bg-zinc-800 rounded-full overflow-hidden">
              <div
                className="h-full rounded-full"
                style={{
                  width: isVisible ? `${(tool.level / 5) * 100}%` : '0%',
                  background: 'linear-gradient(90deg, #f59e0b 0%, #fbbf24 60%, #fde68a 100%)',
                  transition: `width 1.2s cubic-bezier(0.4,0,0.2,1) ${tool.level * 80}ms`,
                  boxShadow: isVisible ? '0 0 8px rgba(251,191,36,0.5)' : 'none',
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function EquipmentItem({ eq, delay }) {
  const [ref, isVisible] = useScrollAnimation()
  return (
    <div
      ref={ref}
      className={`fade-up bg-[#0d0d14] border border-zinc-800/60 rounded-lg px-4 py-3.5 flex items-center gap-3 ${isVisible ? 'visible' : ''}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <span className="text-xl flex-shrink-0">{eq.icon}</span>
      <div>
        <div className="text-zinc-200 text-sm font-semibold">{eq.name}</div>
        <div className="text-zinc-600 text-xs mt-0.5">{eq.desc}</div>
      </div>
    </div>
  )
}

export default function Skills() {
  const [ref, isVisible] = useScrollAnimation()

  return (
    <section id="skills" className="py-24 bg-[#080810]">
      <div className="max-w-6xl mx-auto px-6">
        <div
          ref={ref}
          className={`text-center mb-16 fade-up ${isVisible ? 'visible' : ''}`}
        >
          <div className="badge">Skills & Tools</div>
          <h2 className="section-title">スキル・機材</h2>
          <p className="section-subtitle">
            プロフェッショナルな機材を完備し、高品質な映像制作を幅広くサポートできる体制を整えています。
          </p>
        </div>

        {/* Tools */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {toolGroups.map((group, gi) => (
            <ToolGroupCard key={gi} group={group} delay={gi * 100} levelLabel={levelLabel} />
          ))}
        </div>

        {/* Equipment */}
        <div>
          <h3 className="text-zinc-400 text-sm font-semibold tracking-widest uppercase text-center mb-6">
            保有機材
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {equipment.map((eq, i) => (
              <EquipmentItem key={i} eq={eq} delay={i * 60} />
            ))}
          </div>
        </div>

        {/* Certifications */}
        <div className="mt-10 flex flex-wrap justify-center gap-3">
          {[
            'Google Analytics Individual Qualification（GAIQ）',
            'Webクリエイター能力認定試験 HTML5 エキスパート',
            '普通自動車第一種運転免許',
            'ドローン飛行申請経験あり',
          ].map((cert) => (
            <span
              key={cert}
              className="text-xs text-zinc-400 bg-zinc-900/60 border border-zinc-800/60 px-3 py-1.5 rounded-full"
            >
              {cert}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
