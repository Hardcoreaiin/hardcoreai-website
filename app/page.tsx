'use client'

import Image from 'next/image'

export default function LandingPage() {
  return (
    <div style={{ background: '#0A0A0F', minHeight: '100vh', fontFamily: 'Inter, -apple-system, sans-serif', color: '#F0F0FF', overflowX: 'hidden' }}>

      {/* ── NAV ── */}
      <nav style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '0 40px', height: '60px',
        background: 'rgba(10,10,15,0.85)',
        backdropFilter: 'blur(20px)',
        borderBottom: '1px solid rgba(255,255,255,0.06)',
      }}>
        {/* Logo */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <Image src="/logo.png" alt="HARDCOREAI Logo" width={115} height={45} style={{ height: '24px', width: 'auto' }} />
        </div>

        {/* Nav links */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '32px' }}>
          {['Features', 'Workflow', 'Why Us'].map(item => (
            <a key={item} href={`#${item.toLowerCase().replace(' ', '-')}`} style={{
              fontSize: '13px', fontWeight: 500, color: '#8B8BA7',
              textDecoration: 'none', transition: 'color 0.2s',
            }}
              onMouseEnter={e => (e.currentTarget.style.color = '#F0F0FF')}
              onMouseLeave={e => (e.currentTarget.style.color = '#8B8BA7')}
            >{item}</a>
          ))}
        </div>

        {/* CTA */}
        <a href="mailto:vardhin@hardcoreai.in?subject=Access Request" style={{
          fontSize: '13px', fontWeight: 600,
          padding: '8px 18px',
          background: 'linear-gradient(135deg, #7C3AED, #A855F7)',
          borderRadius: '7px', color: '#fff', textDecoration: 'none',
          boxShadow: '0 0 20px rgba(124,58,237,0.35)',
          transition: 'transform 0.2s, box-shadow 0.2s',
        }}
          onMouseEnter={e => {
            e.currentTarget.style.transform = 'translateY(-1px)'
            e.currentTarget.style.boxShadow = '0 0 30px rgba(124,58,237,0.6)'
          }}
          onMouseLeave={e => {
            e.currentTarget.style.transform = 'translateY(0)'
            e.currentTarget.style.boxShadow = '0 0 20px rgba(124,58,237,0.35)'
          }}
        >
          Request Access
        </a>
      </nav>

      {/* ── HERO ── */}
      <section style={{
        position: 'relative', minHeight: '100vh',
        display: 'flex', flexDirection: 'column', alignItems: 'center',
        justifyContent: 'center', paddingTop: '100px', paddingBottom: '60px',
        padding: '120px 24px 60px',
      }}>
        {/* Background gradient blob */}
        <div style={{
          position: 'absolute', top: '10%', left: '50%',
          transform: 'translateX(-50%)',
          width: '800px', height: '400px',
          background: 'radial-gradient(ellipse, rgba(124,58,237,0.18) 0%, transparent 70%)',
          pointerEvents: 'none',
        }} />

        {/* Badge */}
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: '8px',
          padding: '5px 14px', marginBottom: '28px',
          background: 'rgba(124,58,237,0.12)',
          border: '1px solid rgba(124,58,237,0.3)',
          borderRadius: '100px',
          fontSize: '12px', fontWeight: 600, color: '#A855F7',
          letterSpacing: '0.05em', textTransform: 'uppercase',
        }}>
          <span style={{ width: '6px', height: '6px', background: '#A855F7', borderRadius: '50%', display: 'inline-block', boxShadow: '0 0 8px #A855F7' }} />
          Embedded Development Platform
        </div>

        {/* Headline */}
        <h1 style={{
          fontSize: 'clamp(36px, 6vw, 72px)',
          fontWeight: 900,
          letterSpacing: '-0.04em',
          lineHeight: 1.05,
          textAlign: 'center',
          maxWidth: '820px',
          marginBottom: '24px',
          background: 'linear-gradient(160deg, #FFFFFF 0%, rgba(240,240,255,0.75) 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
        }}>
          Firmware Development,{' '}
          <span style={{
            background: 'linear-gradient(135deg, #7C3AED 0%, #A855F7 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}>
            Built For Hardware Teams
          </span>
        </h1>

        {/* Sub-headline */}
        <p style={{
          fontSize: 'clamp(15px, 2vw, 19px)',
          color: '#8B8BA7', textAlign: 'center',
          maxWidth: '560px', lineHeight: 1.65,
          marginBottom: '40px', fontWeight: 400,
        }}>
          Turn datasheets into working firmware. Build, flash, debug, and validate embedded software in a single environment.
        </p>

        {/* CTAs */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '24px' }}>
          <a href="mailto:vardhin@hardcoreai.in?subject=Access Request" style={{
            padding: '13px 28px',
            background: 'linear-gradient(135deg, #7C3AED, #A855F7)',
            borderRadius: '9px', color: '#fff',
            fontSize: '14px', fontWeight: 700,
            textDecoration: 'none',
            boxShadow: '0 0 30px rgba(124,58,237,0.45)',
            transition: 'all 0.2s',
            letterSpacing: '-0.01em',
          }}
            onMouseEnter={e => {
              e.currentTarget.style.transform = 'translateY(-2px)'
              e.currentTarget.style.boxShadow = '0 0 50px rgba(124,58,237,0.7)'
            }}
            onMouseLeave={e => {
              e.currentTarget.style.transform = 'translateY(0)'
              e.currentTarget.style.boxShadow = '0 0 30px rgba(124,58,237,0.45)'
            }}
          >
            Request Access
          </a>
        </div>

        {/* Trust note */}
        <p style={{ fontSize: '12px', color: '#4A4A6A', textAlign: 'center', maxWidth: '460px', lineHeight: 1.6 }}>
          Developed using production firmware projects, real hardware documentation, and embedded debugging workflows.
        </p>

        {/* IDE Screenshot hero */}
        <div style={{
          position: 'relative', marginTop: '64px',
          width: '100%', maxWidth: '1100px',
        }}>
          {/* Glow underneath */}
          <div style={{
            position: 'absolute', bottom: '-40px', left: '10%', right: '10%', height: '60px',
            background: 'rgba(124,58,237,0.4)',
            filter: 'blur(40px)',
            borderRadius: '50%',
          }} />

          <div style={{
            borderRadius: '14px',
            overflow: 'hidden',
            border: '1px solid rgba(124,58,237,0.3)',
            boxShadow: '0 40px 120px rgba(0,0,0,0.8), 0 0 0 1px rgba(255,255,255,0.04)',
          }}>
            <Image
              src="/screenshots/ide-hero.png"
              alt="HARDCOREAI IDE — Full Workspace with Editor, Configurator, and Copilot"
              width={1100}
              height={700}
              style={{ width: '100%', height: 'auto', display: 'block' }}
              priority
            />
          </div>
        </div>
      </section>

      {/* ── METRICS STRIP ── */}
      <section style={{
        padding: '60px 40px',
        borderTop: '1px solid rgba(255,255,255,0.05)',
        borderBottom: '1px solid rgba(255,255,255,0.05)',
        display: 'flex', justifyContent: 'center',
        background: 'rgba(14,14,22,0.6)',
      }}>
        <div style={{
          display: 'flex', gap: '80px', flexWrap: 'wrap',
          justifyContent: 'center', alignItems: 'center',
          maxWidth: '900px',
        }}>
          {[
            { value: '10×', label: 'Faster peripheral config' },
            { value: 'Zero', label: 'Context switching' },
            { value: '100%', label: 'Local — no cloud lock-in' },
            { value: 'One', label: 'Environment for everything' },
          ].map(({ value, label }) => (
            <div key={label} style={{ textAlign: 'center' }}>
              <div style={{
                fontSize: '36px', fontWeight: 900,
                letterSpacing: '-0.04em',
                background: 'linear-gradient(135deg, #7C3AED, #A855F7)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                marginBottom: '4px',
              }}>{value}</div>
              <div style={{ fontSize: '13px', color: '#8B8BA7', fontWeight: 500 }}>{label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── FEATURES ── */}
      <section id="features" style={{ padding: '120px 40px', maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '72px' }}>
          <p style={{
            fontSize: '12px', fontWeight: 700, letterSpacing: '0.1em',
            textTransform: 'uppercase', color: '#7C3AED', marginBottom: '16px',
          }}>Platform capabilities</p>
          <h2 style={{
            fontSize: 'clamp(28px, 4vw, 48px)', fontWeight: 800,
            letterSpacing: '-0.03em', lineHeight: 1.1,
            background: 'linear-gradient(160deg, #FFFFFF 0%, rgba(240,240,255,0.7) 100%)',
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
          }}>
            Everything in one environment.
          </h2>
          <p style={{ fontSize: '16px', color: '#8B8BA7', marginTop: '16px', maxWidth: '480px', margin: '16px auto 0' }}>
            No more switching between CubeMX, a text editor, a terminal, and a debugger.
          </p>
        </div>

        {/* Feature grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2px' }}>
          {[
            {
              icon: '⚡',
              title: 'Embedded Configurator',
              desc: 'Visual pin mapping, clock tree configuration, and peripheral setup — directly inside the editor. No external tools.',
              img: '/screenshots/ide-main.jpg',
            },
            {
              icon: '🤖',
              title: 'AI Copilot',
              desc: 'Context-aware firmware generation from datasheets, schematics, and project history. Not a generic chatbot.',
              img: '/screenshots/ide-ai.jpg',
            },
            {
              icon: '🔧',
              title: 'Flash & Debug',
              desc: 'Integrated serial monitor, build output, and debugging workflow. One click from code to running hardware.',
              img: '/screenshots/ide-debug.jpg',
            },
          ].map(({ icon, title, desc, img }) => (
            <div key={title} style={{
              background: '#0E0E16',
              border: '1px solid rgba(255,255,255,0.06)',
              borderRadius: '16px',
              overflow: 'hidden',
              transition: 'border-color 0.3s, transform 0.3s',
              cursor: 'default',
            }}
              onMouseEnter={e => {
                e.currentTarget.style.borderColor = 'rgba(124,58,237,0.4)'
                e.currentTarget.style.transform = 'translateY(-4px)'
              }}
              onMouseLeave={e => {
                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)'
                e.currentTarget.style.transform = 'translateY(0)'
              }}
            >
              {/* Screenshot */}
              <div style={{ overflow: 'hidden', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                <Image
                  src={img}
                  alt={title}
                  width={560}
                  height={320}
                  style={{ width: '100%', height: '220px', objectFit: 'cover', display: 'block', transition: 'transform 0.4s' }}
                />
              </div>
              <div style={{ padding: '28px' }}>
                <div style={{ fontSize: '24px', marginBottom: '12px' }}>{icon}</div>
                <h3 style={{ fontSize: '17px', fontWeight: 700, marginBottom: '10px', color: '#F0F0FF', letterSpacing: '-0.02em' }}>{title}</h3>
                <p style={{ fontSize: '14px', color: '#8B8BA7', lineHeight: 1.65 }}>{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── WORKFLOW SECTION ── */}
      <section id="workflow" style={{
        padding: '120px 40px',
        background: 'rgba(14,14,22,0.5)',
        borderTop: '1px solid rgba(255,255,255,0.04)',
        borderBottom: '1px solid rgba(255,255,255,0.04)',
      }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '80px' }}>
            <p style={{
              fontSize: '12px', fontWeight: 700, letterSpacing: '0.1em',
              textTransform: 'uppercase', color: '#7C3AED', marginBottom: '16px',
            }}>How it works</p>
            <h2 style={{
              fontSize: 'clamp(28px, 4vw, 48px)', fontWeight: 800,
              letterSpacing: '-0.03em',
              background: 'linear-gradient(160deg, #FFFFFF 0%, rgba(240,240,255,0.7) 100%)',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
            }}>
              From datasheet to deployed firmware.
            </h2>
          </div>

          {/* Steps */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
            {[
              {
                step: '01',
                title: 'Open your hardware project',
                desc: 'Import your microcontroller, load your schematics and datasheets. HARDCOREAI reads your hardware context — pinout, peripherals, clocks.',
              },
              {
                step: '02',
                title: 'Configure peripherals visually',
                desc: 'Use the integrated embedded configurator to set up UART, SPI, I2C, timers and GPIO without leaving the editor. Changes reflect in code instantly.',
              },
              {
                step: '03',
                title: 'Generate firmware with AI',
                desc: 'Describe what you need in plain language. The AI copilot writes firmware grounded in your actual hardware configuration, not generic examples.',
              },
              {
                step: '04',
                title: 'Flash, monitor, and debug',
                desc: 'Build and flash directly from the IDE. The serial monitor and build output live in the same window. Iterate fast on real hardware.',
              },
            ].map(({ step, title, desc }, i) => (
              <div key={step} style={{
                display: 'flex', gap: '48px', alignItems: 'flex-start',
                padding: '36px 40px',
                background: i % 2 === 0 ? 'rgba(18,18,28,0.6)' : 'transparent',
                borderRadius: '12px',
                border: '1px solid rgba(255,255,255,0.04)',
                transition: 'border-color 0.3s',
              }}
                onMouseEnter={e => e.currentTarget.style.borderColor = 'rgba(124,58,237,0.25)'}
                onMouseLeave={e => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.04)'}
              >
                <div style={{
                  fontSize: '11px', fontWeight: 800, letterSpacing: '0.08em',
                  color: '#7C3AED', minWidth: '32px', paddingTop: '4px',
                  fontFamily: 'monospace',
                }}>{step}</div>
                <div>
                  <h3 style={{ fontSize: '18px', fontWeight: 700, marginBottom: '10px', letterSpacing: '-0.02em' }}>{title}</h3>
                  <p style={{ fontSize: '15px', color: '#8B8BA7', lineHeight: 1.65, maxWidth: '560px' }}>{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SCREENSHOT SHOWCASE ── */}
      <section style={{ padding: '120px 40px', maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '64px' }}>
          <h2 style={{
            fontSize: 'clamp(24px, 3.5vw, 42px)', fontWeight: 800,
            letterSpacing: '-0.03em',
            background: 'linear-gradient(160deg, #FFFFFF 0%, rgba(240,240,255,0.7) 100%)',
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
            marginBottom: '16px',
          }}>
            Built for engineers who care about hardware.
          </h2>
          <p style={{ fontSize: '15px', color: '#8B8BA7', maxWidth: '480px', margin: '0 auto' }}>
            Every panel, every feature was designed around the real embedded development workflow.
          </p>
        </div>

        {/* Large screenshot */}
        <div style={{
          position: 'relative',
          borderRadius: '16px', overflow: 'hidden',
          border: '1px solid rgba(124,58,237,0.2)',
          boxShadow: '0 60px 150px rgba(0,0,0,0.7), 0 0 0 1px rgba(255,255,255,0.04)',
          marginBottom: '2px',
        }}>
          <Image
            src="/screenshots/ide-config.jpg"
            alt="HARDCOREAI embedded configurator — pin mapping interface"
            width={1200}
            height={750}
            style={{ width: '100%', height: 'auto', display: 'block' }}
          />
        </div>

        {/* Two smaller screenshots side by side */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2px', marginTop: '2px' }}>
          {[
            { src: '/screenshots/ide-ai.jpg', alt: 'AI Copilot panel' },
            { src: '/screenshots/ide-debug.jpg', alt: 'Serial monitor and build output' },
          ].map(({ src, alt }) => (
            <div key={src} style={{
              borderRadius: '14px', overflow: 'hidden',
              border: '1px solid rgba(255,255,255,0.06)',
              boxShadow: '0 20px 60px rgba(0,0,0,0.5)',
              transition: 'border-color 0.3s',
            }}
              onMouseEnter={e => e.currentTarget.style.borderColor = 'rgba(124,58,237,0.3)'}
              onMouseLeave={e => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)'}
            >
              <Image
                src={src}
                alt={alt}
                width={600}
                height={380}
                style={{ width: '100%', height: 'auto', display: 'block' }}
              />
            </div>
          ))}
        </div>
      </section>

      {/* ── WHY SECTION ── */}
      <section id="why-us" style={{
        padding: '120px 40px',
        background: 'rgba(14,14,22,0.5)',
        borderTop: '1px solid rgba(255,255,255,0.04)',
      }}>
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          <p style={{
            fontSize: '12px', fontWeight: 700, letterSpacing: '0.1em',
            textTransform: 'uppercase', color: '#7C3AED', marginBottom: '16px',
            textAlign: 'center',
          }}>Why HARDCOREAI</p>
          <h2 style={{
            fontSize: 'clamp(28px, 4vw, 48px)', fontWeight: 800,
            letterSpacing: '-0.03em', textAlign: 'center',
            background: 'linear-gradient(160deg, #FFFFFF 0%, rgba(240,240,255,0.7) 100%)',
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
            marginBottom: '72px',
          }}>
            Firmware teams ship faster.
          </h2>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '20px' }}>
            {[
              {
                title: 'No more tool chaos',
                desc: 'CubeMX, VS Code, PlatformIO, a terminal, a serial monitor — unified into a single purpose-built IDE.',
              },
              {
                title: 'Knowledge that stays',
                desc: 'Hardware context, peripheral configs, and debugging notes are preserved in the project — not lost when an engineer leaves.',
              },
              {
                title: 'AI that knows your hardware',
                desc: 'The AI copilot is grounded in your actual MCU, your actual pinout, your actual peripheral config — not generic examples.',
              },
              {
                title: 'Faster onboarding',
                desc: 'New engineers go from zero to their first flashed firmware in hours, not weeks. Hardware context is already in the project.',
              },
            ].map(({ title, desc }) => (
              <div key={title} style={{
                padding: '28px',
                background: '#0E0E16',
                border: '1px solid rgba(255,255,255,0.06)',
                borderRadius: '14px',
                transition: 'border-color 0.3s, background 0.3s',
              }}
                onMouseEnter={e => {
                  e.currentTarget.style.borderColor = 'rgba(124,58,237,0.35)'
                  e.currentTarget.style.background = '#121220'
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)'
                  e.currentTarget.style.background = '#0E0E16'
                }}
              >
                <div style={{
                  width: '32px', height: '3px',
                  background: 'linear-gradient(90deg, #7C3AED, #A855F7)',
                  borderRadius: '2px', marginBottom: '20px',
                }} />
                <h3 style={{ fontSize: '16px', fontWeight: 700, marginBottom: '10px', letterSpacing: '-0.02em' }}>{title}</h3>
                <p style={{ fontSize: '14px', color: '#8B8BA7', lineHeight: 1.65 }}>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA SECTION ── */}
      <section style={{
        padding: '140px 40px',
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden',
      }}>
        {/* Background glow */}
        <div style={{
          position: 'absolute', top: '50%', left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '600px', height: '300px',
          background: 'radial-gradient(ellipse, rgba(124,58,237,0.22) 0%, transparent 70%)',
          pointerEvents: 'none',
        }} />

        <div style={{ position: 'relative', zIndex: 1 }}>
          <h2 style={{
            fontSize: 'clamp(32px, 5vw, 60px)', fontWeight: 900,
            letterSpacing: '-0.04em', lineHeight: 1.05,
            background: 'linear-gradient(160deg, #FFFFFF 0%, rgba(240,240,255,0.75) 100%)',
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
            marginBottom: '24px',
          }}>
            Ready to ship firmware faster?
          </h2>
          <p style={{
            fontSize: '17px', color: '#8B8BA7', maxWidth: '440px',
            margin: '0 auto 48px', lineHeight: 1.65,
          }}>
            Request access and get HARDCOREAI running on your hardware project within a day.
          </p>

          <a href="mailto:vardhin@hardcoreai.in?subject=Access Request" style={{
            display: 'inline-block',
            padding: '16px 40px',
            background: 'linear-gradient(135deg, #7C3AED, #A855F7)',
            borderRadius: '10px', color: '#fff',
            fontSize: '15px', fontWeight: 700,
            textDecoration: 'none',
            boxShadow: '0 0 40px rgba(124,58,237,0.5)',
            transition: 'all 0.2s',
            letterSpacing: '-0.01em',
          }}
            onMouseEnter={e => {
              e.currentTarget.style.transform = 'translateY(-3px)'
              e.currentTarget.style.boxShadow = '0 0 70px rgba(124,58,237,0.75)'
            }}
            onMouseLeave={e => {
              e.currentTarget.style.transform = 'translateY(0)'
              e.currentTarget.style.boxShadow = '0 0 40px rgba(124,58,237,0.5)'
            }}
          >
            Request Access →
          </a>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer style={{
        padding: '40px',
        borderTop: '1px solid rgba(255,255,255,0.05)',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        flexWrap: 'wrap', gap: '16px',
      }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
            <Image src="/logo.png" alt="HARDCOREAI Logo" width={90} height={35} style={{ height: '20px', width: 'auto', opacity: 0.8, filter: 'grayscale(100%)' }} />
          </div>
        <p style={{ fontSize: '12px', color: '#4A4A6A' }}>
          © 2025 HARDCOREAI. Built for embedded engineers.
        </p>
        <div style={{ display: 'flex', gap: '24px' }}>
          {['Privacy', 'Contact'].map(item => (
            <a key={item} href={`mailto:vardhin@hardcoreai.in`} style={{
              fontSize: '12px', color: '#4A4A6A', textDecoration: 'none',
              transition: 'color 0.2s',
            }}
              onMouseEnter={e => e.currentTarget.style.color = '#8B8BA7'}
              onMouseLeave={e => e.currentTarget.style.color = '#4A4A6A'}
            >{item}</a>
          ))}
        </div>
      </footer>

    </div>
  )
}
