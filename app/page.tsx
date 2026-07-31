'use client'

import { useState, useEffect } from 'react'
import {
  ArrowDown,
  Clock,
  DollarSign,
  Rocket,
  Users,
  TrendingUp,
  BookOpen,
  Check,
  Building2,
  UserCheck,
  Lightbulb,
  ShieldCheck,
  Wrench,
  BarChart3
} from 'lucide-react'

export default function LandingPage() {
  /* ── Workflow step animation ── */
  const [activeStep, setActiveStep] = useState(0)
  const workflowSteps = [
    'Understand the Product Goal',
    'Read Hardware Documentation',
    'Build Hardware Understanding',
    'Check Hardware Compatibility',
    'Generate Firmware',
    'Verify Every Decision',
    'Engineer Reviews',
    'Deploy'
  ]

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % workflowSteps.length)
    }, 2400)
    return () => clearInterval(timer)
  }, [])

  return (
    <div style={{ background: '#030303', minHeight: '100vh', color: '#f1f5f9', overflowX: 'hidden', position: 'relative' }}>
      <div className="bg-grid" />
      <div className="bg-circuit-overlay" />

      {/* ═══════════════ NAVBAR ═══════════════ */}
      <nav style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '0 40px', height: '64px',
        background: 'rgba(3,3,3,0.75)',
        backdropFilter: 'blur(16px)',
        borderBottom: '1px solid #1a1a2e',
      }}>
        <a href="#" style={{ display: 'flex', alignItems: 'center', gap: '10px', textDecoration: 'none' }}>
          <svg width="28" height="28" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="32" height="32" rx="8" fill="url(#gNav)"/>
            <circle cx="9" cy="9" r="4" fill="white"/>
            <rect x="5" y="14" width="8" height="12" rx="4" fill="white"/>
            <rect x="19" y="6" width="8" height="12" rx="4" fill="white"/>
            <circle cx="23" cy="23" r="4" fill="white"/>
            <rect x="11" y="15.5" width="10" height="5" rx="2.5" fill="white"/>
            <defs><linearGradient id="gNav" x1="0" y1="0" x2="32" y2="32" gradientUnits="userSpaceOnUse"><stop stopColor="#6366F1"/><stop offset="1" stopColor="#8B5CF6"/></linearGradient></defs>
          </svg>
          <span style={{ fontSize: '15px', fontWeight: 700, letterSpacing: '0.05em', color: '#fff', fontFamily: "'Barlow Condensed', sans-serif" }}>
            HARDCOREAI
          </span>
        </a>

        <div style={{ display: 'flex', alignItems: 'center', gap: '32px' }}>
          {[
            { label: 'How It Works', href: '#how-it-works' },
            { label: 'Who Benefits', href: '#who-benefits' },
            { label: 'About', href: '#trust' },
          ].map(link => (
            <a key={link.label} href={link.href} style={{
              fontSize: '13px', fontWeight: 500, color: '#94a3b8',
              fontFamily: "'IBM Plex Mono', monospace",
              textDecoration: 'none', transition: 'color 0.2s',
            }}
              onMouseEnter={e => (e.currentTarget.style.color = '#fff')}
              onMouseLeave={e => (e.currentTarget.style.color = '#94a3b8')}
            >{link.label}</a>
          ))}
        </div>

        <a href="https://calendly.com/sricharan-srikrishna/30min" target="_blank" style={{
          fontSize: '13px', fontWeight: 600,
          padding: '8px 18px',
          background: '#8b5cf6',
          borderRadius: '6px', color: '#fff', textDecoration: 'none',
          boxShadow: '0 4px 20px rgba(139,92,246,0.25)',
          fontFamily: "'IBM Plex Mono', monospace",
          transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
          border: '1px solid rgba(255,255,255,0.1)'
        }}
          onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-1px)'; e.currentTarget.style.boxShadow = '0 6px 30px rgba(139,92,246,0.4)' }}
          onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 4px 20px rgba(139,92,246,0.25)' }}
        >
          Book a Consultation
        </a>
      </nav>

      {/* ═══════════════ SECTION 1 — WHAT IS HARDCOREAI ═══════════════ */}
      <header className="section hero-section">
        <div className="container">
          <div className="hero-center fade-in-up">
            <span className="section-label">The infrastructure layer for embedded engineering</span>
            <h1 className="hero-title-centered">
              Build embedded products faster.
            </h1>
            <p className="hero-subtitle-centered">
              HardcoreAI helps embedded engineering teams move from product idea to working firmware dramatically faster—by understanding hardware documentation, automating repetitive engineering work and catching mistakes before hardware testing begins.
            </p>
            <div className="hero-actions-centered">
              <a href="https://calendly.com/sricharan-srikrishna/30min" target="_blank" className="btn btn-primary btn-lg">
                Book a 30-Minute Engineering Consultation
              </a>
            </div>

            {/* Backed By badges */}
            <div className="backed-by-centered">
              <span className="backed-by-label">Backed By</span>
              <div className="backed-badge">VIT Technology Business Incubator</div>
              <div className="backed-badge">Sarvam AI Startup Program</div>
            </div>
          </div>
        </div>
      </header>

      {/* ═══════════════ SECTION 2 — WHY DOES THIS MATTER ═══════════════ */}
      <section className="section border-t" style={{ backgroundColor: '#080810' }}>
        <div className="container">
          <div className="section-header text-center fade-in-up">
            <span className="section-label">The Problem</span>
            <h2 className="section-title">
              Why does this matter?
            </h2>
          </div>

          <div className="problem-center fade-in-up">
            <p className="problem-statement">
              Embedded engineering teams spend weeks manually interpreting hardware documentation, configuring hardware and debugging issues that could have been prevented much earlier in the process.
            </p>
            <p className="problem-resolution">
              HardcoreAI reduces that engineering effort—so teams can focus on building products instead of searching through manuals.
            </p>
          </div>

          {/* Supporting stats/points */}
          <div className="problem-points-grid fade-in-up">
            <div className="problem-point">
              <BookOpen size={20} />
              <p>Engineers spend days reading hardware manuals before writing a single line of firmware.</p>
            </div>
            <div className="problem-point">
              <Clock size={20} />
              <p>Configuration mistakes are discovered only after firmware reaches physical hardware—adding weeks to timelines.</p>
            </div>
            <div className="problem-point">
              <DollarSign size={20} />
              <p>Experienced engineers spend significant time on repetitive tasks instead of high-value product work.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════ SECTION 3 — BUSINESS OUTCOMES ═══════════════ */}
      <section className="section border-t">
        <div className="container">
          <div className="section-header text-center fade-in-up">
            <span className="section-label">Business Outcomes</span>
            <h2 className="section-title">
              What changes for your team.
            </h2>
          </div>

          <div className="outcomes-grid fade-in-up">
            {[
              {
                icon: Rocket,
                title: 'Accelerate Product Development',
                desc: 'Reduce the time required to move from an idea to a working embedded prototype.'
              },
              {
                icon: ShieldCheck,
                title: 'Shorter Bring-up',
                desc: 'Identify hardware configuration issues before engineers spend days debugging physical boards.'
              },
              {
                icon: DollarSign,
                title: 'Reduce Engineering Costs',
                desc: 'Automate repetitive engineering tasks so experienced engineers can focus on higher-value work.'
              },
              {
                icon: BarChart3,
                title: 'Improve Team Productivity',
                desc: 'Help engineers spend more time building products and less time searching through documentation.'
              },
              {
                icon: TrendingUp,
                title: 'Faster Time-to-Market',
                desc: 'Reduce firmware bottlenecks that delay product launches.'
              },
              {
                icon: Users,
                title: 'Scale Engineering Knowledge',
                desc: 'Capture engineering best practices and make them available across the entire team.'
              }
            ].map((item, idx) => {
              const Icon = item.icon
              return (
                <div key={item.title} className="outcome-card fade-in-up" style={{ animationDelay: `${(idx + 1) * 80}ms` }}>
                  <div className="outcome-icon"><Icon size={22} /></div>
                  <h3>{item.title}</h3>
                  <p>{item.desc}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ═══════════════ SECTION 4 — HOW IT WORKS ═══════════════ */}
      <section id="how-it-works" className="section border-t" style={{ backgroundColor: '#080810' }}>
        <div className="container">
          <div className="section-header text-center fade-in-up">
            <span className="section-label">How It Works</span>
            <h2 className="section-title">
              From product idea to working firmware.
            </h2>
            <p className="section-subtitle">
              Instead of engineers manually reading thousands of pages of documentation—HardcoreAI handles the repetitive work.
            </p>
          </div>

          <div className="workflow-vertical fade-in-up">
            {workflowSteps.map((step, idx) => (
              <div key={step}>
                <div className={`wf-step ${idx === activeStep ? 'active' : ''}`}>
                  <div className="wf-step-number">{String(idx + 1).padStart(2, '0')}</div>
                  <div className="wf-step-label">{step}</div>
                </div>
                {idx < workflowSteps.length - 1 && (
                  <div className="wf-connector">
                    <ArrowDown size={14} />
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="workflow-note fade-in-up">
            Simple. Understandable. Engineers remain in control at every step.
          </div>
        </div>
      </section>

      {/* ═══════════════ SECTION 5 — WHY COMPANIES CHOOSE ═══════════════ */}
      <section className="section border-t">
        <div className="container">
          <div className="section-header text-center fade-in-up">
            <span className="section-label">Why HardcoreAI</span>
            <h2 className="section-title">
              A better way to build embedded products.
            </h2>
          </div>

          <div className="comparison-split fade-in-up">
            <div className="comparison-col comparison-old">
              <h3>Traditional Firmware Development</h3>
              <ul>
                <li>Engineers manually read hardware documentation</li>
                <li>Configuration is done by hand</li>
                <li>Mistakes are discovered after hardware testing</li>
                <li>Debugging takes days or weeks</li>
                <li>Knowledge stays with individual engineers</li>
              </ul>
            </div>
            <div className="comparison-col comparison-new">
              <h3>With HardcoreAI</h3>
              <ul>
                <li><Check size={15} /> Hardware documentation is understood automatically</li>
                <li><Check size={15} /> Compatibility is checked before development begins</li>
                <li><Check size={15} /> Mistakes are caught before they reach hardware</li>
                <li><Check size={15} /> Engineers focus on product decisions, not repetitive work</li>
                <li><Check size={15} /> Best practices are available to the entire team</li>
              </ul>
            </div>
          </div>

          <div className="comparison-bottom-statement fade-in-up">
            Traditional coding assistants help developers write software.<br />
            HardcoreAI helps engineering teams build hardware products faster.
          </div>
        </div>
      </section>

      {/* ═══════════════ SECTION 6 — WHO BENEFITS ═══════════════ */}
      <section id="who-benefits" className="section border-t" style={{ backgroundColor: '#080810' }}>
        <div className="container">
          <div className="section-header text-center fade-in-up">
            <span className="section-label">Who Benefits</span>
            <h2 className="section-title">
              Built for the people who build products.
            </h2>
          </div>

          <div className="persona-grid fade-in-up">
            {[
              {
                icon: Users,
                title: 'Engineering Teams',
                desc: 'Build products faster.'
              },
              {
                icon: BarChart3,
                title: 'Engineering Managers',
                desc: 'Increase team productivity.'
              },
              {
                icon: UserCheck,
                title: 'CTOs',
                desc: 'Launch products sooner with fewer engineering bottlenecks.'
              },
              {
                icon: Lightbulb,
                title: 'Founders',
                desc: 'Prototype hardware products with leaner teams.'
              },
              {
                icon: Building2,
                title: 'Large Enterprises',
                desc: 'Standardize firmware development across engineering organizations.'
              }
            ].map((persona, idx) => {
              const Icon = persona.icon
              return (
                <div key={persona.title} className="persona-card fade-in-up" style={{ animationDelay: `${(idx + 1) * 80}ms` }}>
                  <div className="persona-icon"><Icon size={22} /></div>
                  <h3>{persona.title}</h3>
                  <p>{persona.desc}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ═══════════════ SECTION 7 — TRUST ═══════════════ */}
      <section id="trust" className="section border-t">
        <div className="container">
          <div className="section-header text-center fade-in-up">
            <span className="section-label">Why Teams Trust HardcoreAI</span>
            <h2 className="section-title">
              Engineering-grade reliability.
            </h2>
          </div>

          <div className="trust-grid fade-in-up">
            {[
              'Built around official hardware documentation',
              'Every recommendation is explainable',
              'Engineers remain in complete control',
              'Works with existing development tools',
              'No workflow disruption'
            ].map(item => (
              <div key={item} className="trust-item">
                <Check size={18} className="trust-check" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════ SECTION 8 — BACKED BY ═══════════════ */}
      <section className="section border-t" style={{ backgroundColor: '#080810' }}>
        <div className="container text-center">
          <div className="section-header fade-in-up">
            <span className="section-label">Backed By</span>
          </div>
          <div className="backer-cards fade-in-up">
            <div className="backer-card">VIT Technology Business Incubator</div>
            <div className="backer-card">Sarvam AI Startup Program</div>
          </div>
        </div>
      </section>

      {/* ═══════════════ SECTION 9 — FINAL CTA ═══════════════ */}
      <section className="section border-t">
        <div className="container">
          <div className="cta-card fade-in-up">
            <span className="section-label">Next Steps</span>
            <h2 className="cta-headline">
              Let&rsquo;s understand your engineering workflow.
            </h2>
            <p className="cta-subheading">
              Book a 30-minute engineering consultation. We&rsquo;ll understand how your team currently develops firmware, identify bottlenecks and explore whether HardcoreAI can help accelerate development and reduce engineering effort.
            </p>

            <a href="https://calendly.com/sricharan-srikrishna/30min" target="_blank" className="btn btn-primary btn-cta">
              Book a 30-Minute Engineering Consultation →
            </a>

            <div className="cta-contacts">
              <span>Email: <a href="mailto:sricharan.srikrishna@gmail.com">sricharan.srikrishna@gmail.com</a></span>
              <span>Phone: <a href="tel:+917010293396">+91 7010293396</a></span>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════ FOOTER ═══════════════ */}
      <footer className="footer border-t">
        <div className="container">
          <div className="footer-layout">
            <div className="footer-brand">
              <div className="footer-logo">
                <svg width="24" height="24" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect width="32" height="32" rx="8" fill="url(#gFoot)"/>
                  <circle cx="9" cy="9" r="4" fill="white"/>
                  <rect x="5" y="14" width="8" height="12" rx="4" fill="white"/>
                  <rect x="19" y="6" width="8" height="12" rx="4" fill="white"/>
                  <circle cx="23" cy="23" r="4" fill="white"/>
                  <rect x="11" y="15.5" width="10" height="5" rx="2.5" fill="white"/>
                  <defs><linearGradient id="gFoot" x1="0" y1="0" x2="32" y2="32" gradientUnits="userSpaceOnUse"><stop stopColor="#6366F1"/><stop offset="1" stopColor="#8B5CF6"/></linearGradient></defs>
                </svg>
                HARDCOREAI
              </div>
              <p className="footer-desc">The infrastructure layer for embedded engineering. Helping teams build products faster.</p>
            </div>

            <div className="footer-nav">
              <div className="footer-nav-col">
                <h4>Navigation</h4>
                <ul>
                  <li><a href="#how-it-works">How It Works</a></li>
                  <li><a href="#who-benefits">Who Benefits</a></li>
                  <li><a href="#trust">About</a></li>
                </ul>
              </div>
              <div className="footer-nav-col">
                <h4>Connect</h4>
                <ul>
                  <li><a href="https://calendly.com/sricharan-srikrishna/30min" target="_blank">Book a Consultation</a></li>
                  <li><a href="mailto:sricharan.srikrishna@gmail.com">Email</a></li>
                  <li><a href="tel:+917010293396">Phone</a></li>
                </ul>
              </div>
            </div>
          </div>

          <div className="footer-bottom">
            <p>&copy; 2026 HardcoreAI. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
