'use client'

import { useState, useEffect } from 'react'
import {
  ArrowRight,
  Check,
  Linkedin,
  ShieldCheck,
  Cpu,
  Sparkles,
  Terminal,
  Layers,
  CheckCircle2,
  BookOpen,
  Sliders,
  FileCode2,
  Activity
} from 'lucide-react'

export default function LandingPage() {
  const [timelineMode, setTimelineMode] = useState<'traditional' | 'hardcore'>('hardcore')
  const [activeReasoningStep, setActiveReasoningStep] = useState(0)
  
  const reasoningSteps = [
    { title: 'Specification Processing', desc: 'Parsing 1,200+ page microcontroller reference manual & datasheet tables.' },
    { title: 'Hardware Constraint Mapping', desc: 'Validating pin conflicts, bus speeds, clock sources, and register dependencies.' },
    { title: 'Deterministic Verification', desc: 'Cross-checking driver rules against physical silicon boundaries before compilation.' },
    { title: 'Verified Firmware Generation', desc: 'Producing production-ready C/C++ drivers traceable to official manual pages.' }
  ]

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveReasoningStep((prev) => (prev + 1) % reasoningSteps.length)
    }, 3200)
    return () => clearInterval(timer)
  }, [])

  return (
    <div style={{ minHeight: '100vh', position: 'relative', overflowX: 'hidden' }}>
      
      {/* Background Textures */}
      <div className="bg-radial-glow"></div>
      <div className="bg-engineering-grid"></div>

      {/* ═══════════════ FLOATING NAVIGATION ═══════════════ */}
      <div className="nav-wrapper">
        <nav className="floating-nav">
          <a href="#" className="nav-brand">
            <svg width="24" height="24" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <linearGradient id="navLogoPurple" x1="0" y1="0" x2="32" y2="32" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#A78BFA"/>
                  <stop offset="1" stopColor="#4C1D95"/>
                </linearGradient>
              </defs>
              <circle cx="9" cy="9" r="4" fill="url(#navLogoPurple)"/>
              <rect x="5" y="14" width="8" height="12" rx="4" fill="url(#navLogoPurple)"/>
              <rect x="19" y="6" width="8" height="12" rx="4" fill="url(#navLogoPurple)"/>
              <circle cx="23" cy="23" r="4" fill="url(#navLogoPurple)"/>
              <rect x="11" y="15.5" width="10" height="5" rx="2.5" fill="url(#navLogoPurple)"/>
            </svg>
            HARDCOREAI
          </a>

          <div className="nav-links">
            <a href="#why-it-matters">The Problem</a>
            <a href="#transformation">Transformation</a>
            <a href="#system">How It Works</a>
            <a href="#readme">Getting Started</a>
            <a href="#trust">Trust</a>
            <a href="https://www.linkedin.com/company/hardcoreai/" target="_blank" rel="noopener noreferrer">
              <Linkedin size={18} strokeWidth={1.5} />
            </a>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <a href="https://hardcore-ai-inky.vercel.app/login" style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', fontWeight: 500, padding: '0.4rem 0.8rem', borderRadius: '6px', textDecoration: 'none' }}>
              Sign In
            </a>
            <a href="https://hardcore-ai-inky.vercel.app/" className="btn-nav">
              Launch App
            </a>
          </div>
        </nav>
      </div>

      {/* ═══════════════ HERO SECTION ═══════════════ */}
      <section className="section" style={{ paddingTop: '12rem', paddingBottom: '8rem' }}>
        <div className="container text-center">
          
          <div className="hero-badge fade-in-up">
            <Sparkles size={14} strokeWidth={2} style={{ color: 'var(--accent-secondary)' }} />
            <span>Build Embedded Products Faster.</span>
          </div>

          <h1 className="hero-headline-massive fade-in-up">
            Build Embedded Products<br />
            <span className="text-gradient">Faster.</span>
          </h1>

          <p className="hero-lead-text fade-in-up">
            HardcoreAI converts complex hardware specifications into verified engineering execution—helping teams prototype faster, reduce bring-up delays, and launch products sooner.
          </p>

          <div className="hero-actions-group fade-in-up">
            <a href="https://hardcore-ai-inky.vercel.app/" className="btn-hero-primary">
              Launch Platform <ArrowRight size={20} strokeWidth={2} />
            </a>
            <a href="https://calendly.com/sricharan-srikrishna/30min" target="_blank" rel="noopener noreferrer" className="btn-hero-ghost">
              Book 30-Min Demo
            </a>
          </div>

          {/* Premium Dark Tech SVG Visual (Animated Constraint Graph / Data flow) */}
          <div className="hero-visual-wrapper fade-in-up">
            <div className="engineering-visual">
              <div className="engineering-visual-header">
                <span>SYSTEM ARCHITECTURE ENGINE</span>
                <span style={{ color: 'var(--success)' }}>● VERIFIED_STATE: ACTIVE</span>
              </div>
              <div className="engineering-visual-content">
                
                {/* Glow behind the core */}
                <div className="animated-glow" style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '200px', height: '100px', background: 'var(--accent-primary)', borderRadius: '50%', zIndex: 0 }}></div>

                <svg width="100%" height="100%" viewBox="0 0 600 250" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ position: 'relative', zIndex: 10 }}>
                  {/* Left Nodes (Inputs) */}
                  <rect x="30" y="50" width="120" height="44" rx="10" fill="#1E293B" stroke="rgba(255,255,255,0.1)" strokeWidth="1"/>
                  <text x="90" y="77" fill="#CBD5E1" fontSize="13" fontWeight="500" textAnchor="middle">Datasheets</text>
                  
                  <rect x="30" y="140" width="120" height="44" rx="10" fill="#1E293B" stroke="rgba(255,255,255,0.1)" strokeWidth="1"/>
                  <text x="90" y="167" fill="#CBD5E1" fontSize="13" fontWeight="500" textAnchor="middle">Schematics</text>

                  {/* Circuit traces connecting to center */}
                  <path d="M150 72 L190 72 L190 115 L230 115" stroke="rgba(255,255,255,0.1)" strokeWidth="2" strokeLinejoin="round" fill="none" />
                  <path d="M150 162 L190 162 L190 115 L230 115" stroke="rgba(255,255,255,0.1)" strokeWidth="2" strokeLinejoin="round" fill="none" />
                  
                  {/* Animated glowing traces */}
                  <path d="M150 72 L190 72 L190 115 L230 115" stroke="#A78BFA" strokeWidth="2" strokeLinejoin="round" fill="none" className="svg-path-animate" />
                  <path d="M150 162 L190 162 L190 115 L230 115" stroke="#A78BFA" strokeWidth="2" strokeLinejoin="round" fill="none" className="svg-path-animate" style={{ animationDelay: '0.5s' }} />

                  {/* Center Node (Reasoning Engine) */}
                  <rect x="230" y="75" width="150" height="80" rx="14" fill="#0B0F19" stroke="#7C3AED" strokeWidth="1.5"/>
                  <rect x="235" y="80" width="140" height="70" rx="10" fill="rgba(124, 58, 237, 0.15)"/>
                  <text x="305" y="112" fill="#FFFFFF" fontSize="14" fontWeight="600" textAnchor="middle">Reasoning Engine</text>
                  <text x="305" y="132" fill="#A78BFA" fontSize="11" fontWeight="500" textAnchor="middle" opacity="0.8">Constraint Validation</text>

                  {/* Circuit traces connecting to right */}
                  <path d="M380 115 L450 115" stroke="rgba(255,255,255,0.1)" strokeWidth="2" fill="none" />
                  <path d="M380 115 L450 115" stroke="#10B981" strokeWidth="2" fill="none" className="svg-path-animate" style={{ animationDelay: '1.5s' }} />

                  {/* Right Node (Output) */}
                  <rect x="450" y="85" width="120" height="60" rx="10" fill="#1E293B" stroke="rgba(16, 185, 129, 0.3)" strokeWidth="1"/>
                  <text x="510" y="114" fill="#10B981" fontSize="13" fontWeight="600" textAnchor="middle">Verified</text>
                  <text x="510" y="132" fill="#CBD5E1" fontSize="11" textAnchor="middle">Firmware (C/C++)</text>
                </svg>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ═══════════════ THE PROBLEM ═══════════════ */}
      <section id="why-it-matters" className="section bg-alternate">
        <div className="container">
          <div className="section-label-center fade-in-up">THE REIMAGINED WORKFLOW</div>
          <h2 className="section-title-large text-center fade-in-up">
            What if building hardware products<br />felt like building modern web apps?
          </h2>

          <div className="transformation-grid fade-in-up">
            <div className="premium-card">
              <div className="transform-before">BEFORE</div>
              <h3>Days lost searching 2,000-page manuals</h3>
              <p>Engineers waste hundreds of hours manually translating register tables into code.</p>
              <div className="transform-after">
                <p>What if every hardware document became instantly understandable?</p>
              </div>
            </div>

            <div className="premium-card">
              <div className="transform-before">BEFORE</div>
              <h3>Bugs discovered only on physical boards</h3>
              <p>Clock mismatches and pin conflicts cause bricked prototypes and weeks of debugging.</p>
              <div className="transform-after">
                <p>What if hardware mistakes were caught before reaching your prototype?</p>
              </div>
            </div>

            <div className="premium-card">
              <div className="transform-before">BEFORE</div>
              <h3>Repetitive driver setup on every project</h3>
              <p>Senior engineers spend critical bandwidth on low-level boilerplate instead of core IP.</p>
              <div className="transform-after">
                <p>What if your engineers never had to spend days reading documentation again?</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════ IMPACT & TIMELINE ═══════════════ */}
      <section className="section bg-deep">
        <div className="container">
          <div className="section-label-center fade-in-up">BUSINESS IMPACT</div>
          <h2 className="section-title-large text-center fade-in-up">
            The cost of friction in embedded development.
          </h2>

          <div className="numbers-hero-grid fade-in-up">
            <div className="number-card">
              <div className="number-stat">70%</div>
              <div className="number-label">Reduction in Firmware Bring-Up Time</div>
              <p>Identify hardware configuration mistakes before boards are powered on.</p>
            </div>

            <div className="number-card">
              <div className="number-stat">100+</div>
              <div className="number-label">Hours of Documentation Search Eliminated</div>
              <p>Instant hardware reasoning replaces manual page-by-page datasheet research.</p>
            </div>

            <div className="number-card">
              <div className="number-stat">3x</div>
              <div className="number-label">Faster Prototype Iteration Cycles</div>
              <p>Move from schematic approval to executing firmware in days instead of months.</p>
            </div>
          </div>

          {/* Timeline Toggle Component */}
          <div className="timeline-toggle-container fade-in-up">
            <div className="timeline-header">
              <h3>Development Cycle Comparison</h3>
              <div className="toggle-switch-box">
                <button 
                  className={`toggle-btn ${timelineMode === 'traditional' ? 'active' : ''}`}
                  onClick={() => setTimelineMode('traditional')}
                >
                  Traditional Workflow
                </button>
                <button 
                  className={`toggle-btn ${timelineMode === 'hardcore' ? 'active' : ''}`}
                  onClick={() => setTimelineMode('hardcore')}
                >
                  With HardcoreAI
                </button>
              </div>
            </div>

            <div className="timeline-visual-content">
              {timelineMode === 'traditional' ? (
                <div className="timeline-bar-group fade-in">
                  <div className="timeline-phase" style={{ flex: 3 }}>
                    <span>Datasheet Reading & Mapping (3 Weeks)</span>
                  </div>
                  <div className="timeline-phase" style={{ flex: 2 }}>
                    <span>Manual Driver Setup (2 Weeks)</span>
                  </div>
                  <div className="timeline-phase" style={{ flex: 4 }}>
                    <span>Hardware Debugging & Flashing (4 Weeks)</span>
                  </div>
                  <div className="timeline-total">Total: 9 Weeks to Stable Prototype</div>
                </div>
              ) : (
                <div className="timeline-bar-group fade-in">
                  <div className="timeline-phase highlight" style={{ flex: 1 }}>
                    <span>Hardware Grounding & Verification (2 Days)</span>
                  </div>
                  <div className="timeline-phase highlight" style={{ flex: 1 }}>
                    <span>Verified Generation (1 Day)</span>
                  </div>
                  <div className="timeline-phase highlight" style={{ flex: 1 }}>
                    <span>Instant Board Bring-Up (3 Days)</span>
                  </div>
                  <div className="timeline-total total-highlight">Total: 6 Days to Stable Prototype</div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════ VERSUS ═══════════════ */}
      <section className="section bg-alternate">
        <div className="container">
          <div className="section-label-center fade-in-up">THE HARDWARE PARADOX</div>
          <h2 className="section-title-large text-center fade-in-up">
            Why generic AI fails at embedded engineering.
          </h2>

          <div className="versus-grid fade-in-up">
            <div className="versus-box">
              <div className="versus-badge">Generic Coding Assistants</div>
              <h4>Trained on Web Code & Syntax</h4>
              <ul>
                <li>❌ No understanding of physical hardware constraints</li>
                <li>❌ Hallucinate non-existent registers and memory offsets</li>
                <li>❌ Cannot verify clock dependencies or pin conflicts</li>
                <li>❌ Require engineers to spend hours fixing generated bugs</li>
              </ul>
            </div>

            <div className="versus-box versus-hardcore">
              <div className="versus-badge badge-blue">HardcoreAI Platform</div>
              <h4>Grounded in Physical Silicon Boundaries</h4>
              <ul>
                <li><Check size={20} strokeWidth={2} style={{ color: 'var(--accent-secondary)' }} /> Grounded directly in official vendor specification manuals</li>
                <li><Check size={20} strokeWidth={2} style={{ color: 'var(--accent-secondary)' }} /> Deterministic constraint validation before code generation</li>
                <li><Check size={20} strokeWidth={2} style={{ color: 'var(--accent-secondary)' }} /> Explains every engineering recommendation with exact page citations</li>
                <li><Check size={20} strokeWidth={2} style={{ color: 'var(--accent-secondary)' }} /> Keeps engineers in complete architectural control</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════ SYSTEM ═══════════════ */}
      <section id="system" className="section bg-deep">
        <div className="container">
          <div className="section-label-center fade-in-up">THE SYSTEM</div>
          <h2 className="section-title-large text-center fade-in-up">
            Turning hardware documentation into verified execution.
          </h2>

          <div className="system-flow-wrapper fade-in-up">
            <div className="system-flow-header">
              <span>AUTOMATED REASONING PIPELINE</span>
              <span>STEP {activeReasoningStep + 1} OF 4</span>
            </div>

            <div className="system-flow-steps">
              {reasoningSteps.map((step, idx) => (
                <div 
                  key={step.title}
                  className={`flow-step-card ${idx === activeReasoningStep ? 'active' : ''}`}
                  onClick={() => setActiveReasoningStep(idx)}
                >
                  <div className="step-num">0{idx + 1}</div>
                  <h4>{step.title}</h4>
                  <p>{step.desc}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="system-modules-grid fade-in-up">
            <div className="premium-card" style={{ padding: '2.5rem' }}>
              <div className="module-icon"><BookOpen size={24} strokeWidth={1.5} style={{ color: 'var(--accent-secondary)' }} /></div>
              <h3>Documentation Knowledge Graph</h3>
              <p style={{ marginBottom: 0 }}>Indexes multi-thousand-page vendor manuals, schematics, and errata into a queryable hardware graph.</p>
            </div>

            <div className="premium-card" style={{ padding: '2.5rem' }}>
              <div className="module-icon"><Sliders size={24} strokeWidth={1.5} style={{ color: 'var(--accent-secondary)' }} /></div>
              <h3>Constraint Verification Engine</h3>
              <p style={{ marginBottom: 0 }}>Validates peripheral trees, clock configuration limits, pin mappings, and register dependencies deterministically.</p>
            </div>

            <div className="premium-card" style={{ padding: '2.5rem' }}>
              <div className="module-icon"><FileCode2 size={24} strokeWidth={1.5} style={{ color: 'var(--accent-secondary)' }} /></div>
              <h3>Grounded Driver Synthesizer</h3>
              <p style={{ marginBottom: 0 }}>Generates production-grade C/C++ firmware grounded strictly in vendor specs with complete manual page citations.</p>
            </div>

            <div className="premium-card" style={{ padding: '2.5rem' }}>
              <div className="module-icon"><Activity size={24} strokeWidth={1.5} style={{ color: 'var(--accent-secondary)' }} /></div>
              <h3>Trace & Diagnostic Intelligence</h3>
              <p style={{ marginBottom: 0 }}>Maps execution crashes and register dumps directly back to the physical hardware rule in the manual.</p>
            </div>
          </div>

        </div>
      </section>

      {/* ═══════════════ GETTING STARTED / README ═══════════════ */}
      <section id="readme" className="section bg-deep" style={{ borderTop: '1px solid var(--border-color)', borderBottom: '1px solid var(--border-color)' }}>
        <div className="container">
          <div className="section-label-center fade-in-up">GETTING STARTED</div>
          <h2 className="section-title-large text-center fade-in-up" style={{ marginBottom: '1rem' }}>
            HardcoreAI — Getting Started
          </h2>
          <p className="hero-lead-text text-center fade-in-up" style={{ maxWidth: '800px', margin: '0 auto 3rem auto', fontSize: '1.05rem' }}>
            Welcome to HardcoreAI, your AI-powered firmware engineering platform. HardcoreAI understands your hardware and its documentation before generating firmware, helping you move from board selection &rarr; research &rarr; firmware &rarr; hardware.
          </p>

          {/* Golden Rule Callout Banner */}
          <div className="premium-card fade-in-up" style={{ padding: '2rem', border: '1px solid rgba(124, 58, 237, 0.4)', background: 'linear-gradient(135deg, rgba(124, 58, 237, 0.12) 0%, rgba(17, 24, 39, 0.8) 100%)', marginBottom: '3rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '0.75rem' }}>
              <div style={{ height: '40px', width: '40px', borderRadius: '10px', background: 'rgba(124, 58, 237, 0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#A78BFA' }}>
                <Sparkles size={22} />
              </div>
              <div>
                <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', fontWeight: 700, letterSpacing: '0.05em', color: '#A78BFA', display: 'block' }}>GOLDEN RULE</span>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 700, margin: 0, color: '#FFFFFF' }}>Research first. Generate second. Flash last.</h3>
              </div>
            </div>
            <p style={{ margin: 0, color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: '1.6' }}>
              HardcoreAI is designed to understand the hardware and documentation before generating firmware. That is what makes the workflow fundamentally different from simply asking an AI to write embedded C code.
            </p>
          </div>

          {/* Workflow Sequence Summary */}
          <div className="fade-in-up" style={{ marginBottom: '3.5rem', background: 'rgba(17, 24, 39, 0.6)', border: '1px solid var(--border-color)', borderRadius: '16px', padding: '1.5rem 2rem', textAlign: 'center' }}>
            <span style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.05em', display: 'block', marginBottom: '0.75rem' }}>RECOMMENDED HARDCOREAI WORKFLOW</span>
            <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', fontSize: '0.95rem', fontWeight: 600, color: 'var(--text-primary)' }}>
              <span>Select Board</span> &rarr;
              <span>Research</span> &rarr;
              <span>Generate</span> &rarr;
              <span>Build &amp; Check</span> &rarr;
              <span>Flash</span> &rarr;
              <span>Test</span> &rarr;
              <span>Debug</span>
            </div>
          </div>

          {/* 6 Step Cards Grid */}
          <div className="grid-2-col fade-in-up" style={{ gap: '1.5rem', marginBottom: '3rem' }}>
            {/* Step 1 */}
            <div className="premium-card" style={{ padding: '2rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
                <span style={{ height: '32px', width: '32px', borderRadius: '50%', background: 'rgba(124, 58, 237, 0.2)', border: '1px solid rgba(124, 58, 237, 0.4)', color: '#A78BFA', fontWeight: 700, fontSize: '0.85rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>1</span>
                <h3 style={{ margin: 0, fontSize: '1.15rem' }}>Select Your Board</h3>
              </div>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '1rem' }}>
                Start by selecting the development board or MCU you are working with. Choose your development board, microcontroller, required peripherals, and hardware configuration.
              </p>
              <div style={{ background: 'var(--bg-app)', border: '1px solid var(--border-color)', borderRadius: '8px', padding: '0.75rem 1rem', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                <strong style={{ color: '#A78BFA' }}>Tip:</strong> Make sure the selected board matches the actual hardware you are using. If your exact board isn&apos;t listed, select the closest supported MCU/board configuration and verify details before generating firmware.
              </div>
            </div>

            {/* Step 2 */}
            <div className="premium-card" style={{ padding: '2rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
                <span style={{ height: '32px', width: '32px', borderRadius: '50%', background: 'rgba(124, 58, 237, 0.2)', border: '1px solid rgba(124, 58, 237, 0.4)', color: '#A78BFA', fontWeight: 700, fontSize: '0.85rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>2</span>
                <h3 style={{ margin: 0, fontSize: '1.15rem' }}>Research Your Project</h3>
              </div>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '1rem' }}>
                Before generating firmware, use Research Mode. Provide requirements, datasheets, reference manuals, schematics, pin requirements, and sensor docs so HardcoreAI understands pins, clocks, peripherals, and registers.
              </p>
              <div style={{ background: 'var(--bg-app)', border: '1px solid var(--border-color)', borderRadius: '8px', padding: '0.75rem 1rem', fontSize: '0.825rem', fontFamily: 'monospace', color: 'var(--text-primary)' }}>
                &ldquo;I want to interface an MPU6050 over I2C1 and send the sensor data over USART2. Research the required hardware configuration and identify the relevant pins, clocks and peripherals.&rdquo;
              </div>
            </div>

            {/* Step 3 */}
            <div className="premium-card" style={{ padding: '2rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
                <span style={{ height: '32px', width: '32px', borderRadius: '50%', background: 'rgba(124, 58, 237, 0.2)', border: '1px solid rgba(124, 58, 237, 0.4)', color: '#A78BFA', fontWeight: 700, fontSize: '0.85rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>3</span>
                <h3 style={{ margin: 0, fontSize: '1.15rem' }}>Generate Firmware</h3>
              </div>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', margin: 0 }}>
                Once research is complete, ask HardcoreAI to generate firmware. Specify peripheral configuration, communication protocols, sensors, interrupts, timing requirements, and existing code constraints. HardcoreAI generates firmware based on selected hardware and research.
              </p>
            </div>

            {/* Step 4 */}
            <div className="premium-card" style={{ padding: '2rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
                <span style={{ height: '32px', width: '32px', borderRadius: '50%', background: 'rgba(124, 58, 237, 0.2)', border: '1px solid rgba(124, 58, 237, 0.4)', color: '#A78BFA', fontWeight: 700, fontSize: '0.85rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>4</span>
                <h3 style={{ margin: 0, fontSize: '1.15rem' }}>Build &amp; Check</h3>
              </div>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', margin: 0 }}>
                Build the generated firmware before flashing. Check for compilation errors, warnings, missing dependencies, incorrect pin configurations, peripheral conflicts, and clock issues. If the build fails, provide error log to HardcoreAI for immediate hardware-grounded fixes.
              </p>
            </div>

            {/* Step 5 */}
            <div className="premium-card" style={{ padding: '2rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
                <span style={{ height: '32px', width: '32px', borderRadius: '50%', background: 'rgba(124, 58, 237, 0.2)', border: '1px solid rgba(124, 58, 237, 0.4)', color: '#A78BFA', fontWeight: 700, fontSize: '0.85rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>5</span>
                <h3 style={{ margin: 0, fontSize: '1.15rem' }}>Flash to Your Board</h3>
              </div>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '0.75rem' }}>
                Connect your development board, select programming/debugging interface, flash firmware, reset board, and test expected behavior.
              </p>
              <div style={{ fontWeight: 600, fontSize: '0.85rem', color: '#A78BFA' }}>
                Workflow: Generate &rarr; Build &rarr; Flash &rarr; Test
              </div>
            </div>

            {/* Step 6 */}
            <div className="premium-card" style={{ padding: '2rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
                <span style={{ height: '32px', width: '32px', borderRadius: '50%', background: 'rgba(124, 58, 237, 0.2)', border: '1px solid rgba(124, 58, 237, 0.4)', color: '#A78BFA', fontWeight: 700, fontSize: '0.85rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>6</span>
                <h3 style={{ margin: 0, fontSize: '1.15rem' }}>Debug &amp; Iterate</h3>
              </div>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '0.75rem' }}>
                If firmware doesn&apos;t behave as expected, don&apos;t start from scratch. Tell HardcoreAI what happened (e.g. &ldquo;The firmware builds and flashes, but USART2 produces no output&rdquo;). HardcoreAI investigates across:
              </p>
              <div style={{ fontWeight: 600, fontSize: '0.85rem', color: 'var(--text-primary)' }}>
                Firmware &rarr; Hardware Configuration &rarr; Peripherals &rarr; Manual Docs
              </div>
            </div>
          </div>

          {/* Launch Action */}
          <div className="text-center fade-in-up">
            <a href="https://hardcore-ai-inky.vercel.app/" className="btn-hero-primary">
              Launch Platform &amp; Begin Workflow <ArrowRight size={20} strokeWidth={2} />
            </a>
          </div>

        </div>
      </section>

      {/* ═══════════════ ENTERPRISE TRUST ═══════════════ */}
      <section id="trust" className="section bg-alternate">
        <div className="container">
          <div className="section-label-center fade-in-up">ENTERPRISE GRADE</div>
          <h2 className="section-title-large text-center fade-in-up">
            Designed for mission-critical engineering teams.
          </h2>

          <div className="trust-cards-grid fade-in-up">
            <div className="trust-card">
              <div className="trust-icon"><ShieldCheck size={28} strokeWidth={1.5} /></div>
              <h3>Grounded in Documentation</h3>
              <p>Every response and generated driver strictly references vendor datasheets and manuals—eliminating hallucinations.</p>
            </div>

            <div className="trust-card">
              <div className="trust-icon"><CheckCircle2 size={28} strokeWidth={1.5} /></div>
              <h3>Explainable Recommendations</h3>
              <p>Every configuration decision includes detailed technical context and citations back to original manual pages.</p>
            </div>

            <div className="trust-card">
              <div className="trust-icon"><Layers size={28} strokeWidth={1.5} /></div>
              <h3>Engineers Remain in Control</h3>
              <p>Engineers review and approve every architectural choice before deployment. HardcoreAI augments human judgment.</p>
            </div>

            <div className="trust-card">
              <div className="trust-icon"><Terminal size={28} strokeWidth={1.5} /></div>
              <h3>Zero Workflow Disruption</h3>
              <p>Integrates seamlessly alongside PlatformIO, STM32CubeIDE, ESP-IDF, and existing Git repositories.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════ CTA ═══════════════ */}
      <section className="section bg-deep">
        <div className="container">
          <div className="cta-clean-card fade-in-up">
            <div className="section-label-center">NEXT STEPS</div>
            
            <h2 className="cta-title">
              Let&rsquo;s see how much engineering time your team could save.
            </h2>

            <p className="cta-body">
              In a 30-minute conversation we&rsquo;ll understand your current firmware workflow, identify bottlenecks and explore whether HardcoreAI can help your team prototype faster.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 my-6">
              <a href="https://hardcore-ai-inky.vercel.app/" className="btn-hero-primary" style={{ position: 'relative', zIndex: 10 }}>
                Launch Platform <ArrowRight size={20} strokeWidth={2} />
              </a>
              <a href="https://calendly.com/sricharan-srikrishna/30min" target="_blank" rel="noopener noreferrer" className="btn-hero-ghost" style={{ position: 'relative', zIndex: 10 }}>
                Book 30-Min Demo
              </a>
            </div>

            <div className="cta-contact-details">
              <span>Email: <a href="mailto:sricharan.srikrishna@gmail.com">sricharan.srikrishna@gmail.com</a></span>
              <span>Phone: <a href="tel:+917010293396">+91 7010293396</a></span>
              <span>LinkedIn: <a href="https://www.linkedin.com/company/hardcoreai/" target="_blank" rel="noopener noreferrer">HardcoreAI</a></span>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════ FOOTER ═══════════════ */}
      <footer className="footer-clean">
        <div className="container">
          <div className="footer-grid">
            <div className="footer-brand-col">
              <div className="footer-logo">
                <svg width="24" height="24" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <defs>
                    <linearGradient id="footLogoPurple" x1="0" y1="0" x2="32" y2="32" gradientUnits="userSpaceOnUse">
                      <stop stopColor="#A78BFA"/>
                      <stop offset="1" stopColor="#4C1D95"/>
                    </linearGradient>
                  </defs>
                  <circle cx="9" cy="9" r="4" fill="url(#footLogoPurple)"/>
                  <rect x="5" y="14" width="8" height="12" rx="4" fill="url(#footLogoPurple)"/>
                  <rect x="19" y="6" width="8" height="12" rx="4" fill="url(#footLogoPurple)"/>
                  <circle cx="23" cy="23" r="4" fill="url(#footLogoPurple)"/>
                  <rect x="11" y="15.5" width="10" height="5" rx="2.5" fill="url(#footLogoPurple)"/>
                </svg>
                HARDCOREAI
              </div>
              <p className="footer-tagline">Building the intelligence platform for embedded engineering.</p>
            </div>

            <div className="footer-links-col">
              <h4>Platform</h4>
              <a href="https://hardcore-ai-inky.vercel.app/login">Sign In</a>
              <a href="https://hardcore-ai-inky.vercel.app/">Launch Platform</a>
              <a href="https://hardcore-ai-inky.vercel.app/dashboard">Developer Dashboard</a>
              <a href="#system">System Pipeline</a>
            </div>

            <div className="footer-links-col">
              <h4>Connect</h4>
              <a href="https://calendly.com/sricharan-srikrishna/30min" target="_blank" rel="noopener noreferrer">Book a Demo</a>
              <a href="https://www.linkedin.com/company/hardcoreai/" target="_blank" rel="noopener noreferrer">LinkedIn Profile</a>
              <a href="mailto:sricharan.srikrishna@gmail.com">Contact Us</a>
            </div>
          </div>

          <div className="footer-sub">
            <p>&copy; 2026 HardcoreAI. All rights reserved.</p>
            <p>The Standard Platform for Embedded Systems Engineering.</p>
          </div>
        </div>
      </footer>

    </div>
  )
}
