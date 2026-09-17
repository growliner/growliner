'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import {
  Code2, Smartphone, TrendingUp, Palette, PenTool, Film,
  Rocket, Zap, Target, MapPin, Mail, Phone,
  ArrowRight, Star, Menu, X, Sparkles, CheckCircle2, MessageCircle
} from 'lucide-react'

const WHATSAPP_URL = 'https://wa.me/919351076341?text=Hi%20Growliner,%20I%20need%20help%20with%20my%20business%20growth!'

// ---------- Interactive Particles Background ----------
function ParticlesCanvas() {
  const canvasRef = useRef(null)
  const mouseRef = useRef({ x: -9999, y: -9999 })

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    let raf
    let particles = []

    const resize = () => {
      canvas.width = canvas.offsetWidth * window.devicePixelRatio
      canvas.height = canvas.offsetHeight * window.devicePixelRatio
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio)
    }

    const init = () => {
      const count = Math.min(60, Math.floor(canvas.offsetWidth / 22))
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * canvas.offsetWidth,
        y: Math.random() * canvas.offsetHeight,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        r: Math.random() * 2 + 1,
      }))
    }

    const draw = () => {
      const w = canvas.offsetWidth
      const h = canvas.offsetHeight
      ctx.clearRect(0, 0, w, h)

      // Update
      particles.forEach((p) => {
        p.x += p.vx
        p.y += p.vy
        if (p.x < 0 || p.x > w) p.vx *= -1
        if (p.y < 0 || p.y > h) p.vy *= -1

        // Mouse interaction
        const dx = p.x - mouseRef.current.x
        const dy = p.y - mouseRef.current.y
        const dist = Math.hypot(dx, dy)
        if (dist < 140) {
          p.x += (dx / dist) * 0.8
          p.y += (dy / dist) * 0.8
        }
      })

      // Draw connections
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const a = particles[i]
          const b = particles[j]
          const d = Math.hypot(a.x - b.x, a.y - b.y)
          if (d < 130) {
            ctx.strokeStyle = `rgba(245, 197, 24, ${(1 - d / 130) * 0.35})`
            ctx.lineWidth = 1
            ctx.beginPath()
            ctx.moveTo(a.x, a.y)
            ctx.lineTo(b.x, b.y)
            ctx.stroke()
          }
        }
      }

      // Draw dots
      particles.forEach((p) => {
        ctx.fillStyle = 'rgba(15, 23, 42, 0.55)'
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fill()

        ctx.fillStyle = 'rgba(253, 224, 71, 0.6)'
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r * 2, 0, Math.PI * 2)
        ctx.fill()
      })

      raf = requestAnimationFrame(draw)
    }

    const handleMouse = (e) => {
      const rect = canvas.getBoundingClientRect()
      mouseRef.current.x = e.clientX - rect.left
      mouseRef.current.y = e.clientY - rect.top
    }
    const handleLeave = () => { mouseRef.current.x = -9999; mouseRef.current.y = -9999 }

    resize()
    init()
    draw()
    window.addEventListener('resize', () => { resize(); init() })
    canvas.addEventListener('mousemove', handleMouse)
    canvas.addEventListener('mouseleave', handleLeave)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
}

// ---------- Fade-in-up ----------
const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  show: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.7, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }
  })
}

// ---------- Header ----------
function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const links = [
    { href: '#services', label: 'Services' },
    { href: '#portfolio', label: 'Portfolio' },
    { href: '#stack', label: 'Tech Stack' },
    { href: '#about', label: 'About' },
    { href: '#contact', label: 'Contact' },
  ]

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'glass shadow-sm py-3' : 'py-5'}`}>
      <nav className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <a href="#" className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-yellow-300 to-amber-400 flex items-center justify-center shadow-md">
            <Sparkles className="w-5 h-5 text-slate-900" />
          </div>
          <span className="text-xl font-extrabold tracking-tight text-slate-900">
            Grow<span className="text-amber-400">liner</span>
          </span>
        </a>

        <ul className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <li key={l.href}>
              <a href={l.href} className="text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors">
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <a
          href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer"
          className="hidden md:inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-yellow-300 text-slate-900 font-semibold text-sm hover:scale-105 transition-transform btn-glow"
        >
          Chat with Us <ArrowRight className="w-4 h-4" />
        </a>

        <button className="md:hidden p-2" onClick={() => setOpen(!open)}>
          {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
            className="md:hidden glass border-t mt-3 px-6 py-4"
          >
            <ul className="flex flex-col gap-4">
              {links.map((l) => (
                <li key={l.href}>
                  <a href={l.href} onClick={() => setOpen(false)} className="block text-slate-700 font-medium">{l.label}</a>
                </li>
              ))}
              <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-yellow-300 text-slate-900 font-semibold">
                Chat with Us <ArrowRight className="w-4 h-4" />
              </a>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}

// ---------- Hero ----------
function Hero() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden pt-24 pb-16">
      {/* Mesh gradient blobs */}
      <div className="absolute inset-0 bg-gradient-to-br from-white via-yellow-50 to-orange-50" />
      <div className="absolute -top-40 -left-20 w-[500px] h-[500px] mesh-blob bg-yellow-200" />
      <div className="absolute top-20 right-0 w-[600px] h-[600px] mesh-blob bg-orange-100" style={{ animationDelay: '-6s' }} />
      <div className="absolute bottom-0 left-1/3 w-[500px] h-[500px] mesh-blob bg-amber-100" style={{ animationDelay: '-12s' }} />

      {/* Particles */}
      <div className="absolute inset-0">
        <ParticlesCanvas />
      </div>

      <div className="relative max-w-7xl mx-auto px-6 w-full">
        <motion.div
          initial="hidden" animate="show"
          className="max-w-4xl mx-auto text-center"
        >
          <motion.div variants={fadeUp} custom={0} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/60 backdrop-blur border border-yellow-200 mb-8">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            <span className="text-xs font-semibold text-slate-700">Now accepting Q3 projects · Based in Jaipur, India</span>
          </motion.div>

          <motion.h1 variants={fadeUp} custom={1} className="text-5xl md:text-7xl font-extrabold tracking-tight text-slate-900 leading-[1.05]">
            Empowering Businesses with{' '}
            <span className="relative inline-block">
              <span className="relative z-10">Next-Gen Tech</span>
              <span className="absolute bottom-2 left-0 right-0 h-4 bg-yellow-300 -z-0 rounded"></span>
            </span>{' '}
            & Digital Growth in Jaipur.
          </motion.h1>

          <motion.p variants={fadeUp} custom={2} className="mt-8 text-lg md:text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
            We build lightning-fast websites, intuitive apps, and data-driven marketing campaigns to scale your brand.
          </motion.p>

          <motion.div variants={fadeUp} custom={3} className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 px-7 py-4 rounded-2xl bg-yellow-300 text-slate-900 font-bold text-base hover:scale-105 transition-transform btn-glow"
            >
              <MessageCircle className="w-5 h-5" />
              Let&apos;s Talk Growth
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
            <a
              href="#portfolio"
              className="inline-flex items-center gap-2 px-7 py-4 rounded-2xl bg-white border-2 border-slate-900 text-slate-900 font-bold text-base hover:scale-105 hover:bg-slate-900 hover:text-white transition-all"
            >
              View Portfolio
            </a>
          </motion.div>

          <motion.div variants={fadeUp} custom={4} className="mt-14 flex flex-wrap items-center justify-center gap-8 text-slate-500">
            <div className="flex items-center gap-2">
              <div className="flex">
                {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />)}
              </div>
              <span className="text-sm font-semibold">5.0 on Google</span>
            </div>
            <div className="text-sm"><span className="font-bold text-slate-900">120+</span> projects delivered</div>
            <div className="text-sm"><span className="font-bold text-slate-900">40+</span> happy brands</div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

// ---------- Services ----------
const SERVICES = [
  { icon: Code2, title: 'Custom Web Development', desc: 'Blazing-fast websites and web apps built with Next.js, React, and modern stacks. SEO-optimized from the ground up.' },
  { icon: Smartphone, title: 'Mobile App Development', desc: 'Native and cross-platform iOS + Android apps with intuitive UX and enterprise-grade architecture.' },
  { icon: TrendingUp, title: 'Digital Marketing (SEO & Performance)', desc: 'Rank higher, spend smarter. Google Ads, Meta Ads, and technical SEO tuned for measurable ROI.' },
  { icon: Palette, title: 'Professional UI/UX & Web Design', desc: 'Pixel-perfect, conversion-focused interfaces designed in Figma with user research and prototyping.' },
  { icon: PenTool, title: 'Creative Graphic Design', desc: 'Brand identity, social creatives, and print collateral that stop the scroll and drive recall.' },
  { icon: Film, title: 'Video Editing Services', desc: 'Reels, ads, and long-form edits crafted in Adobe Premiere & After Effects for maximum engagement.' },
]

function Services() {
  return (
    <section id="services" className="relative py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial="hidden" whileInView="show" viewport={{ once: true, margin: '-100px' }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <motion.p variants={fadeUp} className="text-sm font-bold uppercase tracking-widest text-amber-500 mb-3">What We Do</motion.p>
          <motion.h2 variants={fadeUp} custom={1} className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight">
            Services designed to <span className="text-amber-500">10x your growth</span>
          </motion.h2>
          <motion.p variants={fadeUp} custom={2} className="mt-5 text-lg text-slate-600">
            One partner for your entire digital journey — from a single line of code to full-funnel campaigns.
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SERVICES.map((s, i) => (
            <motion.article
              key={s.title}
              initial="hidden" whileInView="show" viewport={{ once: true, margin: '-50px' }}
              variants={fadeUp} custom={i}
              whileHover={{ y: -8 }}
              className="group relative p-8 rounded-2xl bg-white border border-slate-100 hover:border-yellow-300 hover:shadow-xl hover:shadow-yellow-200/40 transition-all duration-300 cursor-pointer overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-yellow-100 rounded-full blur-3xl opacity-0 group-hover:opacity-70 transition-opacity duration-500" />
              <div className="relative">
                <div className="w-14 h-14 rounded-xl bg-yellow-100 flex items-center justify-center mb-6 group-hover:bg-yellow-300 transition-colors">
                  <s.icon className="w-7 h-7 text-amber-600 group-hover:text-slate-900" strokeWidth={2} />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">{s.title}</h3>
                <p className="text-slate-600 leading-relaxed">{s.desc}</p>
                <div className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-amber-600 group-hover:gap-3 transition-all">
                  Learn more <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}

// ---------- Portfolio ----------
const PORTFOLIO = [
  { img: 'https://images.unsplash.com/photo-1634084462412-b54873c0a56d', title: 'FinTech Web Platform', tag: 'Web Development' },
  { img: 'https://images.unsplash.com/photo-1706700392642-dee59f678a09', title: 'Wellness Mobile App', tag: 'App Design + Dev' },
  { img: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71', title: 'SaaS Analytics Dashboard', tag: 'UI/UX + Frontend' },
  { img: 'https://images.unsplash.com/photo-1608222351212-18fe0ec7b13b', title: 'E-Commerce Storefront', tag: 'Full-Stack Build' },
  { img: 'https://images.unsplash.com/photo-1677530410699-f692c94cf806', title: 'Real Estate Portal', tag: 'Web + SEO' },
  { img: 'https://images.unsplash.com/photo-1526628953301-3e589a6a8b74', title: 'Growth Campaign for D2C', tag: 'Performance Marketing' },
]

function Portfolio() {
  return (
    <section id="portfolio" className="relative py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div initial="hidden" whileInView="show" viewport={{ once: true, margin: '-100px' }} className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
          <div>
            <motion.p variants={fadeUp} className="text-sm font-bold uppercase tracking-widest text-amber-500 mb-3">Our Work</motion.p>
            <motion.h2 variants={fadeUp} custom={1} className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight max-w-xl">
              Projects that ship, scale, and <span className="text-amber-500">convert</span>.
            </motion.h2>
          </div>
          <motion.p variants={fadeUp} custom={2} className="text-slate-600 md:max-w-md">
            Handpicked builds from the last 12 months — spanning startups, D2C brands, and enterprises.
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {PORTFOLIO.map((p, i) => (
            <motion.article
              key={p.title}
              initial="hidden" whileInView="show" viewport={{ once: true, margin: '-50px' }}
              variants={fadeUp} custom={i}
              className="group relative rounded-2xl overflow-hidden bg-white shadow-sm hover:shadow-2xl transition-shadow duration-500 cursor-pointer"
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src={p.img}
                  alt={p.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-500">
                  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-yellow-300 text-slate-900 font-bold text-sm">
                    View Details <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              </div>
              <div className="p-6">
                <p className="text-xs font-bold uppercase tracking-wider text-amber-500 mb-2">{p.tag}</p>
                <h3 className="text-lg font-bold text-slate-900">{p.title}</h3>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}

// ---------- Tech Stack Marquee ----------
const STACK = ['React', 'Next.js', 'Node.js', 'TypeScript', 'Figma', 'Google Ads', 'Meta Ads', 'Adobe Premiere', 'After Effects', 'MongoDB', 'AWS', 'Tailwind CSS', 'GA4', 'Webflow', 'Framer']

function TechStack() {
  const doubled = [...STACK, ...STACK]
  return (
    <section id="stack" className="relative py-20 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 text-center mb-12">
        <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="text-sm font-bold uppercase tracking-widest text-amber-500 mb-3">Tech Stack</motion.p>
        <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
          Powered by the world&apos;s best tools
        </motion.h2>
      </div>

      <div className="relative">
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-white to-transparent z-10" />
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-white to-transparent z-10" />
        <div className="flex marquee-track gap-4" style={{ width: 'max-content' }}>
          {doubled.map((tech, i) => (
            <div key={i} className="flex-shrink-0 px-8 py-5 rounded-2xl bg-gray-50 border border-gray-200 hover:border-yellow-300 hover:bg-yellow-50 transition-all">
              <span className="text-lg font-bold text-slate-800 whitespace-nowrap">{tech}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ---------- Why Choose Us ----------
const PERKS = [
  { icon: Target, title: 'SEO-first approach', desc: 'Every line of code and pixel of design is architected to rank and convert.' },
  { icon: Zap, title: 'Lightning-fast execution', desc: 'Weekly sprints, transparent Slack channels, and delivery in weeks — not months.' },
  { icon: TrendingUp, title: 'Data-driven ROI', desc: 'We report on the metrics that move revenue — CAC, LTV, ROAS, and organic traffic.' },
  { icon: MapPin, title: 'Based in Jaipur, serving globally', desc: 'Boutique attention from Jaipur, delivering to founders across India, UAE, US and UK.' },
]

function WhyUs() {
  return (
    <section id="about" className="relative py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-14 items-center">
        <motion.div
          initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}
          className="relative"
        >
          <div className="absolute -top-6 -left-6 w-24 h-24 bg-yellow-300 rounded-2xl -z-0" />
          <div className="absolute -bottom-6 -right-6 w-40 h-40 bg-yellow-100 rounded-full -z-0" />
          <div className="relative rounded-3xl overflow-hidden shadow-2xl aspect-[4/5]">
            <Image
              src="https://images.unsplash.com/photo-1557804506-669a67965ba0"
              alt="Growliner team collaborating in modern Jaipur office"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
        </motion.div>

        <motion.div
          initial="hidden" whileInView="show" viewport={{ once: true, margin: '-100px' }}
        >
          <motion.p variants={fadeUp} className="text-sm font-bold uppercase tracking-widest text-amber-500 mb-3">Why Growliner</motion.p>
          <motion.h2 variants={fadeUp} custom={1} className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight mb-6">
            A partner obsessed with your <span className="text-amber-500">growth curve</span>.
          </motion.h2>
          <motion.p variants={fadeUp} custom={2} className="text-lg text-slate-600 mb-8">
            We&apos;re a lean, senior-led team combining engineering rigor, marketing science and design craft. No layers, no hand-offs — just the people building your product talking directly to you.
          </motion.p>

          <div className="grid sm:grid-cols-2 gap-5">
            {PERKS.map((p, i) => (
              <motion.div key={p.title} variants={fadeUp} custom={3 + i} className="p-5 rounded-2xl bg-white border border-slate-100 hover:border-yellow-300 hover:shadow-lg transition-all">
                <div className="w-11 h-11 rounded-xl bg-yellow-100 flex items-center justify-center mb-3">
                  <p.icon className="w-5 h-5 text-amber-600" />
                </div>
                <h3 className="font-bold text-slate-900 mb-1">{p.title}</h3>
                <p className="text-sm text-slate-600 leading-relaxed">{p.desc}</p>
              </motion.div>
            ))}
          </div>

          <motion.a
            variants={fadeUp} custom={8}
            href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer"
            className="mt-8 inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-slate-900 text-white font-semibold hover:bg-slate-800 hover:scale-105 transition-all"
          >
            Start Your Project <ArrowRight className="w-4 h-4" />
          </motion.a>
        </motion.div>
      </div>
    </section>
  )
}

// ---------- CTA Banner ----------
function CtaBanner() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-yellow-200 via-yellow-300 to-amber-300 p-10 md:p-16 text-center"
        >
          <div className="absolute -top-20 -left-20 w-72 h-72 bg-white/40 rounded-full blur-3xl" />
          <div className="absolute -bottom-20 -right-10 w-72 h-72 bg-orange-200/60 rounded-full blur-3xl" />
          <div className="relative">
            <Rocket className="w-12 h-12 text-slate-900 mx-auto mb-6" />
            <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900 tracking-tight max-w-3xl mx-auto">
              Ready to grow 3x faster than your competitors?
            </h2>
            <p className="mt-5 text-slate-800 text-lg max-w-xl mx-auto">
              A 15-minute WhatsApp call is all it takes to map your growth roadmap.
            </p>
            <a
              href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer"
              className="mt-8 inline-flex items-center gap-2 px-8 py-4 rounded-2xl bg-slate-900 text-yellow-300 font-bold hover:scale-105 transition-transform"
            >
              <MessageCircle className="w-5 h-5" /> Chat on WhatsApp
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

// ---------- Footer ----------
function Footer() {
  return (
    <footer id="contact" className="relative bg-slate-900 text-slate-300 pt-20 pb-8">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-10 pb-14 border-b border-slate-800">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-5">
              <div className="w-10 h-10 rounded-xl bg-yellow-300 flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-slate-900" />
              </div>
              <span className="text-2xl font-extrabold text-white">
                Grow<span className="text-yellow-300">liner</span>
              </span>
            </div>
            <p className="text-slate-400 leading-relaxed max-w-md mb-5">
              Growliner is a tech & growth partner helping ambitious brands ship better products and win more customers.
            </p>
            <div className="flex items-center gap-2 text-yellow-300">
              {[...Array(5)].map((_, i) => <Star key={i} className="w-5 h-5 fill-yellow-300" />)}
              <span className="ml-2 text-sm font-semibold text-slate-200">5.0 Rated on Google</span>
            </div>
          </div>

          <div>
            <h4 className="text-white font-bold mb-4">Contact</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-3"><MapPin className="w-4 h-4 text-yellow-300 mt-0.5 flex-shrink-0" /><span>Shastri Nagar, Jaipur, Rajasthan, 302016</span></li>
              <li className="flex items-center gap-3"><Mail className="w-4 h-4 text-yellow-300" /><a href="mailto:growliner@gmail.com" className="hover:text-yellow-300">growliner@gmail.com</a></li>
              <li className="flex items-center gap-3"><Phone className="w-4 h-4 text-yellow-300" /><a href="tel:+919351076341" className="hover:text-yellow-300">+91 93510 76341</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-4">Follow</h4>
            <ul className="space-y-3 text-sm">
              <li><a href="https://instagram.com/grow.liner" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-3 hover:text-yellow-300"> Instagram</a></li>
              <li><a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-3 hover:text-yellow-300"> LinkedIn</a></li>
            </ul>
            <div className="mt-6 p-4 rounded-xl bg-slate-800 border border-slate-700">
              <div className="flex items-center gap-2 text-xs text-slate-400 mb-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-green-400" /> Verified on Google Business
              </div>
              <div className="text-sm font-semibold text-white">View us on Google Maps →</div>
            </div>
          </div>
        </div>

        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-slate-500">© {new Date().getFullYear()} Growliner. All rights reserved. Crafted with care in Jaipur.</p>
          <div className="flex gap-6 text-sm text-slate-500">
            <a href="#" className="hover:text-yellow-300">Privacy</a>
            <a href="#" className="hover:text-yellow-300">Terms</a>
          </div>
        </div>
      </div>
    </footer>
  )
}

// ---------- Sticky WhatsApp ----------
function StickyWhatsApp() {
  return (
    <a
      href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      className="fixed bottom-6 right-6 z-50 group flex items-center gap-3"
    >
      <span className="hidden group-hover:inline-block px-4 py-2 rounded-xl bg-slate-900 text-white text-sm font-semibold shadow-lg">
        Chat on WhatsApp
      </span>
      <span className="w-16 h-16 rounded-full bg-[#25D366] flex items-center justify-center shadow-xl wa-pulse hover:scale-110 transition-transform">
        <svg viewBox="0 0 32 32" className="w-8 h-8 fill-white">
          <path d="M19.11 17.26c-.3-.15-1.79-.88-2.07-.98-.28-.1-.48-.15-.68.15-.2.3-.78.98-.96 1.18-.18.2-.35.22-.65.07-.3-.15-1.27-.47-2.42-1.5-.89-.79-1.5-1.77-1.67-2.07-.18-.3-.02-.46.13-.61.13-.13.3-.35.45-.53.15-.18.2-.3.3-.5.1-.2.05-.38-.02-.53-.07-.15-.68-1.64-.93-2.24-.24-.58-.5-.5-.68-.51h-.58c-.2 0-.53.08-.8.38-.28.3-1.05 1.02-1.05 2.5s1.07 2.9 1.22 3.1c.15.2 2.11 3.22 5.11 4.51.71.31 1.27.49 1.71.63.72.23 1.37.2 1.89.12.58-.09 1.79-.73 2.04-1.44.25-.7.25-1.31.18-1.44-.07-.13-.28-.2-.58-.35zM16 3C8.83 3 3 8.83 3 16c0 2.29.6 4.44 1.65 6.31L3 29l6.87-1.62A12.94 12.94 0 0 0 16 29c7.17 0 13-5.83 13-13S23.17 3 16 3zm0 23.5c-2.05 0-3.96-.6-5.57-1.65l-.4-.24-4.07.96 1.02-3.94-.26-.42A10.44 10.44 0 0 1 5.5 16c0-5.79 4.71-10.5 10.5-10.5S26.5 10.21 26.5 16 21.79 26.5 16 26.5z" />
        </svg>
      </span>
    </a>
  )
}

// ---------- App ----------
const App = () => {
  return (
    <main className="relative bg-white text-slate-900 min-h-screen">
      <Header />
      <Hero />
      <Services />
      <Portfolio />
      <TechStack />
      <WhyUs />
      <CtaBanner />
      <Footer />
      <StickyWhatsApp />
    </main>
  )
}

export default App
