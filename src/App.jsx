import { useState, useEffect } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import ClientBar from './components/ClientBar'
import Services from './components/Services'
import Achievements from './components/Achievements'
import Portfolio from './components/Portfolio'
import Skills from './components/Skills'
import Profile from './components/Profile'
import Flow from './components/Flow'
import FAQ from './components/FAQ'
import Contact from './components/Contact'
import Footer from './components/Footer'

function ScrollProgress() {
  const [progress, setProgress] = useState(0)
  useEffect(() => {
    const onScroll = () => {
      const total = document.documentElement.scrollHeight - window.innerHeight
      setProgress(total > 0 ? (window.scrollY / total) * 100 : 0)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])
  return (
    <div className="fixed top-0 left-0 right-0 z-[100] h-0.5 bg-transparent">
      <div
        className="h-full"
        style={{
          width: `${progress}%`,
          background: 'linear-gradient(90deg, #f59e0b, #fbbf24)',
          transition: 'width 0.08s linear',
          boxShadow: '0 0 6px rgba(251,191,36,0.7)',
        }}
      />
    </div>
  )
}

export default function App() {
  return (
    <div className="bg-[#050507] text-zinc-100 min-h-screen overflow-x-hidden">
      <ScrollProgress />
      <Navbar />
      <Hero />
      <ClientBar />
      <Services />
      <Achievements />
      <Portfolio />
      <Skills />
      <Profile />
      <Flow />
      <FAQ />
      <Contact />
      <Footer />
    </div>
  )
}
