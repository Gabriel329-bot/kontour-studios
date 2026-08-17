'use client'

import { useEffect, useRef, useState, type MouseEvent as ReactMouseEvent, type ReactNode } from 'react'
import Lenis from 'lenis'
import {
  AnimatePresence,
  motion,
  useInView,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
} from 'framer-motion'
import { ArrowDown, ArrowUp, ArrowUpRight, Check, Copy, Menu, Plus, X } from 'lucide-react'

const projects = [
  {
    id: '01',
    name: 'NEURAL / MATTER',
    category: 'Digital Identity · Creative Development',
    year: '2026',
    art: 'orb',
  },
  {
    id: '02',
    name: 'VOID COMMERCE',
    category: 'E-commerce · Art Direction · WebGL',
    year: '2025',
    art: 'portal',
  },
  {
    id: '03',
    name: 'KINT / 24',
    category: 'Fashion System · Campaign',
    year: '2025',
    art: 'type',
  },
  {
    id: '04',
    name: 'SYNTHETIC NATURE',
    category: 'Generative Identity · Motion',
    year: '2024',
    art: 'wave',
  },
]

const services = [
  {
    number: '01',
    title: 'Brand Strategy & Art Direction',
    body: 'Positioning, visual identity and campaign systems built to make ambitious brands impossible to ignore.',
    tags: ['STRATEGY', 'IDENTITY', 'CAMPAIGNS'],
  },
  {
    number: '02',
    title: 'Interactive Websites & WebGL',
    body: 'High-performance digital experiences where motion, interaction and narrative behave as one system.',
    tags: ['CREATIVE DEV', 'WEBGL', 'MOTION'],
  },
  {
    number: '03',
    title: 'Digital Product Design',
    body: 'Clear product thinking and expressive interfaces for platforms that need both utility and character.',
    tags: ['UI/UX', 'SYSTEMS', 'PROTOTYPES'],
  },
  {
    number: '04',
    title: 'Generative AI & Motion Systems',
    body: 'Adaptive design languages and real-time content engines that turn technology into a recognizable voice.',
    tags: ['GENERATIVE', 'AI', 'REAL-TIME'],
  },
]

const ease = [0.16, 1, 0.3, 1] as const

function Magnetic({ children, className = '', href }: { children: ReactNode; className?: string; href: string }) {
  const ref = useRef<HTMLAnchorElement>(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const springX = useSpring(x, { stiffness: 220, damping: 18 })
  const springY = useSpring(y, { stiffness: 220, damping: 18 })

  function move(event: ReactMouseEvent<HTMLAnchorElement>) {
    const bounds = ref.current?.getBoundingClientRect()
    if (!bounds) return
    x.set((event.clientX - bounds.left - bounds.width / 2) * 0.22)
    y.set((event.clientY - bounds.top - bounds.height / 2) * 0.22)
  }

  return (
    <motion.a
      ref={ref}
      href={href}
      className={className}
      style={{ x: springX, y: springY }}
      onMouseMove={move}
      onMouseLeave={() => {
        x.set(0)
        y.set(0)
      }}
    >
      {children}
    </motion.a>
  )
}

function Cursor({ label }: { label: string }) {
  const x = useMotionValue(-100)
  const y = useMotionValue(-100)
  const springX = useSpring(x, { stiffness: 600, damping: 42, mass: 0.5 })
  const springY = useSpring(y, { stiffness: 600, damping: 42, mass: 0.5 })

  useEffect(() => {
    const move = (event: MouseEvent) => {
      x.set(event.clientX)
      y.set(event.clientY)
    }
    window.addEventListener('mousemove', move)
    return () => window.removeEventListener('mousemove', move)
  }, [x, y])

  return (
    <motion.div
      className={`cursor ${label ? 'cursor--active' : ''}`}
      style={{ x: springX, y: springY }}
      aria-hidden="true"
    >
      <span>{label}</span>
    </motion.div>
  )
}

function Counter({ value, suffix = '' }: { value: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: '-10%' })
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!inView) return
    let frame = 0
    const started = performance.now()
    const duration = 1400
    const tick = (now: number) => {
      const progress = Math.min((now - started) / duration, 1)
      setCount(Math.round(value * (1 - Math.pow(1 - progress, 4))))
      if (progress < 1) frame = requestAnimationFrame(tick)
    }
    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [inView, value])

  return (
    <span ref={ref}>
      {count}
      {suffix}
    </span>
  )
}

function ProjectArt({ type, index }: { type: string; index: number }) {
  return (
    <div className={`project-art art-${type}`} aria-hidden="true">
      <div className="art-grid" />
      {type === 'orb' && (
        <>
          <div className="orb orb-main" />
          <div className="orb orb-ghost" />
          <span className="art-code">NM/AI—0{index + 1}</span>
        </>
      )}
      {type === 'portal' && (
        <>
          <div className="portal-ring portal-ring-a" />
          <div className="portal-ring portal-ring-b" />
          <div className="portal-core" />
        </>
      )}
      {type === 'type' && (
        <>
          <span className="mega-type">K</span>
          <span className="type-stamp">FORM / 001<br />GEN / 025</span>
        </>
      )}
      {type === 'wave' && (
        <>
          <div className="wave wave-a" />
          <div className="wave wave-b" />
          <div className="wave-dot" />
        </>
      )}
    </div>
  )
}

export function StudioExperience() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [cursorLabel, setCursorLabel] = useState('')
  const [activeService, setActiveService] = useState(0)
  const [time, setTime] = useState('--:--:--')
  const [copied, setCopied] = useState(false)
  const heroX = useMotionValue(50)
  const heroY = useMotionValue(50)
  const smoothHeroX = useSpring(heroX, { stiffness: 70, damping: 22 })
  const smoothHeroY = useSpring(heroY, { stiffness: 70, damping: 22 })
  const auraBackground = useTransform(
    [smoothHeroX, smoothHeroY],
    ([x, y]) => `radial-gradient(circle at ${x}% ${y}%, rgba(0,255,102,.22), transparent 36%)`,
  )
  const { scrollYProgress } = useScroll()
  const progressScale = useSpring(scrollYProgress, { stiffness: 150, damping: 30 })

  useEffect(() => {
    const lenis = new Lenis({ duration: 1.1, smoothWheel: true })
    let frame = 0
    const raf = (timeStamp: number) => {
      lenis.raf(timeStamp)
      frame = requestAnimationFrame(raf)
    }
    frame = requestAnimationFrame(raf)
    return () => {
      cancelAnimationFrame(frame)
      lenis.destroy()
    }
  }, [])

  useEffect(() => {
    const update = () =>
      setTime(
        new Intl.DateTimeFormat('en-GB', {
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: false,
          timeZone: 'Europe/London',
        }).format(new Date()),
      )
    update()
    const interval = window.setInterval(update, 1000)
    return () => window.clearInterval(interval)
  }, [])

  async function copyEmail() {
    await navigator.clipboard.writeText('hello@kontourstudios.design')
    setCopied(true)
    window.setTimeout(() => setCopied(false), 1800)
  }

  return (
    <main>
      <motion.div className="scroll-progress" style={{ scaleX: progressScale }} />
      <div className="noise" aria-hidden="true" />
      <Cursor label={cursorLabel} />

      <header className="nav-shell">
        <a className="brand" href="#top" aria-label="Kontour Studios home">
          <span className="brand-mark">K/</span>
          <span>KONTOUR<br />STUDIOS</span>
        </a>
        <nav className="desktop-nav" aria-label="Primary navigation">
          {['Work', 'Services', 'Studio', 'Contact'].map((item) => (
            <a key={item} href={`#${item.toLowerCase()}`}>
              {item}
            </a>
          ))}
        </nav>
        <div className="nav-meta">
          <span className="availability"><i /> AVAILABLE Q4</span>
          <span className="clock">LDN {time}</span>
          <Magnetic href="#contact" className="nav-cta">
            START A PROJECT <ArrowUpRight size={15} />
          </Magnetic>
        </div>
        <button
          className="menu-toggle"
          type="button"
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((value) => !value)}
        >
          {menuOpen ? <X /> : <Menu />}
        </button>
      </header>

      <AnimatePresence>
        {menuOpen && (
          <motion.nav
            className="mobile-menu"
            initial={{ opacity: 0, clipPath: 'inset(0 0 100% 0)' }}
            animate={{ opacity: 1, clipPath: 'inset(0)' }}
            exit={{ opacity: 0, clipPath: 'inset(0 0 100% 0)' }}
            transition={{ duration: 0.45, ease }}
          >
            {['Work', 'Services', 'Studio', 'Contact'].map((item, index) => (
              <a key={item} href={`#${item.toLowerCase()}`} onClick={() => setMenuOpen(false)}>
                <span>0{index + 1}</span> {item}
              </a>
            ))}
          </motion.nav>
        )}
      </AnimatePresence>

      <section
        className="hero section-grid"
        id="top"
        onMouseMove={(event) => {
          const bounds = event.currentTarget.getBoundingClientRect()
          heroX.set(((event.clientX - bounds.left) / bounds.width) * 100)
          heroY.set(((event.clientY - bounds.top) / bounds.height) * 100)
        }}
      >
        <motion.div className="hero-aura" style={{ background: auraBackground }} />
        <div className="hero-kicker mono-row">
          <span>( INDEPENDENT CREATIVE STUDIO )</span>
          <span>51.5072° N / 0.1276° W</span>
        </div>
        <div className="hero-title" aria-label="We shape digital experiences">
          {['WE SHAPE', 'DIGITAL', 'EXPERIENCES'].map((line, index) => (
            <div className="reveal-line" key={line}>
              <motion.span
                initial={{ y: '110%', rotate: 2 }}
                animate={{ y: 0, rotate: 0 }}
                transition={{ delay: 0.12 + index * 0.1, duration: 1, ease }}
              >
                {line}
              </motion.span>
            </div>
          ))}
        </div>
        <motion.p
          className="hero-intro"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.65, duration: 0.8, ease }}
        >
          THROUGH KINETIC FORM, IDENTITY<br />AND EMERGING TECHNOLOGY.
        </motion.p>
        <motion.div
          className="hero-reel"
          initial={{ clipPath: 'inset(50% 0 50% 0)' }}
          animate={{ clipPath: 'inset(0)' }}
          transition={{ delay: 0.45, duration: 1.25, ease }}
          onMouseEnter={() => setCursorLabel('DRAG')}
          onMouseLeave={() => setCursorLabel('')}
        >
          <div className="reel-grid" />
          <motion.div
            className="reel-orbit"
            animate={{ rotate: 360 }}
            transition={{ duration: 18, ease: 'linear', repeat: Infinity }}
          />
          <div className="reel-globe"><span>K</span></div>
          <div className="reel-caption"><span>SHOWREEL / 2026</span><span>01:24 MIN</span></div>
        </motion.div>
        <a className="scroll-cue" href="#work">
          <ArrowDown size={16} /> SCROLL TO EXPLORE
        </a>
      </section>

      <div className="marquee" aria-label="Studio disciplines">
        <motion.div animate={{ x: ['0%', '-50%'] }} transition={{ duration: 24, ease: 'linear', repeat: Infinity }}>
          {Array.from({ length: 2 }).map((_, group) => (
            <span key={group}>ART DIRECTION ✦ DIGITAL PRODUCTS ✦ CREATIVE DEVELOPMENT ✦ KINETIC IDENTITIES ✦ GENERATIVE SYSTEMS ✦ </span>
          ))}
        </motion.div>
      </div>

      <section className="work section-grid" id="work">
        <div className="section-head">
          <span className="eyebrow">[ 01 / SELECTED WORK ]</span>
          <h2>BUILT FOR<br /><em>IMPACT.</em></h2>
          <p>A selection of identities and experiences for people building what comes next.</p>
        </div>
        <div className="project-grid">
          {projects.map((project, index) => (
            <motion.article
              className={`project project-${index + 1}`}
              key={project.name}
              initial={{ opacity: 0, y: 70 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-10%' }}
              transition={{ duration: 0.9, delay: index % 2 ? 0.1 : 0, ease }}
              onMouseEnter={() => setCursorLabel('VIEW')}
              onMouseLeave={() => setCursorLabel('')}
            >
              <div className="project-media"><ProjectArt type={project.art} index={index} /></div>
              <div className="project-info">
                <span>[ {project.id} / 04 ]</span>
                <div><h3>{project.name}</h3><p>{project.category}</p></div>
                <span>{project.year}</span>
                <ArrowUpRight />
              </div>
            </motion.article>
          ))}
        </div>
      </section>

      <section className="services section-grid" id="services">
        <div className="section-head services-head">
          <span className="eyebrow">[ 02 / CAPABILITIES ]</span>
          <h2>ONE STUDIO.<br /><em>FULL SIGNAL.</em></h2>
        </div>
        <div className="service-list">
          {services.map((service, index) => {
            const active = activeService === index
            return (
              <article className={`service ${active ? 'service--active' : ''}`} key={service.title}>
                <button type="button" onClick={() => setActiveService(index)} aria-expanded={active}>
                  <span>{service.number}</span>
                  <h3>{service.title}</h3>
                  <motion.span animate={{ rotate: active ? 45 : 0 }}><Plus /></motion.span>
                </button>
                <AnimatePresence initial={false}>
                  {active && (
                    <motion.div
                      className="service-detail"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.5, ease }}
                    >
                      <p>{service.body}</p>
                      <div>{service.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </article>
            )
          })}
        </div>
      </section>

      <section className="studio section-grid" id="studio">
        <span className="eyebrow">[ 03 / STUDIO IN NUMBERS ]</span>
        <div className="metrics">
          <div><strong><Counter value={48} suffix="+" /></strong><span>GLOBAL AWARDS</span></div>
          <div><strong><Counter value={99} suffix="%" /></strong><span>PARTNER SATISFACTION</span></div>
          <div><strong><Counter value={140} suffix="+" /></strong><span>PROJECTS SHIPPED</span></div>
        </div>
        <div className="philosophy">
          <div className="philosophy-mark">K<br />/26</div>
          <blockquote>
            WE DON&apos;T DECORATE<br />THE FUTURE. <em>WE GIVE<br />IT A FORM.</em>
          </blockquote>
          <p>
            Kontour is an independent studio working at the intersection of design, culture and technology. We build sharp identities and useful digital worlds through one integrated team.
          </p>
        </div>
      </section>

      <footer className="footer section-grid" id="contact">
        <div className="footer-top">
          <span className="eyebrow">[ HAVE A VISION? ]</span>
          <span className="availability"><i /> AVAILABLE FOR SELECT PROJECTS</span>
        </div>
        <h2>LET&apos;S BUILD<br /><em>SOMETHING</em><br />EXTRAORDINARY.</h2>
        <button
          className="email-copy"
          type="button"
          onClick={copyEmail}
          onMouseEnter={() => setCursorLabel('COPY')}
          onMouseLeave={() => setCursorLabel('')}
        >
          <span>{copied ? 'COPIED TO CLIPBOARD' : 'HELLO@KONTOURSTUDIOS.DESIGN'}</span>
          {copied ? <Check /> : <Copy />}
        </button>
        <div className="footer-bottom">
          <span>© 2026 KONTOUR STUDIOS</span>
          <div>{['Instagram', 'Behance', 'LinkedIn', 'Awwwards'].map((item) => <a href="#top" key={item}>{item}</a>)}</div>
          <span>MADE WITH INTENT / LONDON</span>
          <Magnetic href="#top" className="back-top">BACK TO TOP <ArrowUp size={15} /></Magnetic>
        </div>
      </footer>
    </main>
  )
}
