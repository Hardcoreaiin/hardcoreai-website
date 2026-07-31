'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { 
  Zap, 
  Clock, 
  ShieldCheck, 
  TrendingUp, 
  AlertTriangle, 
  BookOpen, 
  Sliders, 
  FileText, 
  UserCheck, 
  HelpCircle, 
  Code2, 
  Cpu, 
  Activity, 
  Check, 
  CheckCircle2, 
  Terminal, 
  Package, 
  Search, 
  GitBranch, 
  ArrowRight,
  HelpCircle as IntentIcon
} from 'lucide-react'

export default function LandingPage() {
  // 1. Hero Workflow Animation Loop
  const [activeWorkflowIndex, setActiveWorkflowIndex] = useState(0)
  const workflowSteps = [
    { name: 'Engineering Intent', icon: HelpCircle },
    { name: 'Hardware Understanding', icon: BookOpen },
    { name: 'Constraint Validation', icon: ShieldCheck },
    { name: 'Firmware Generation', icon: Code2 },
    { name: 'Bring-up', icon: Cpu },
    { name: 'Production', icon: Activity }
  ]

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveWorkflowIndex((prev) => (prev + 1) % workflowSteps.length)
    }, 2800)
    return () => clearInterval(timer)
  }, [])

  // 2. Problem Timeline Animation Loop
  const [activeProblemIndex, setActiveProblemIndex] = useState(0)
  const problemSteps = [
    'Engineering Requirement',
    'Read Datasheets',
    'Reference Manuals',
    'Application Notes',
    'HAL Documentation',
    'Select Peripherals',
    'Configure Clocks',
    'Assign Pins',
    'Resolve Register Dependencies',
    'Generate Firmware',
    'Compile',
    'Flash Hardware',
    'Debug'
  ]

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveProblemIndex((prev) => (prev + 1) % problemSteps.length)
    }, 1800)
    return () => clearInterval(timer)
  }, [])

  // 3. Product Showcase Active Tab State
  const [activeTab, setActiveTab] = useState('research')
  const tabs = [
    {
      id: 'research',
      name: 'Research Mode',
      title: 'Research Mode',
      desc: 'Scan, interpret, and cross-reference thousands of pages of PDF specifications instantly. Ask technical hardware questions directly to your indexed datasheet archive.',
      bullets: ['Multi-document correlation', 'Register table indexing', 'Detailed page-level citations'],
      img: '/screenshots/ide-main.jpg'
    },
    {
      id: 'verification',
      name: 'Verification Mode',
      title: 'Verification Mode',
      desc: 'Validate register configurations, pin mappings, and peripheral tree settings. Catch logic issues and conflicting dependencies before compiling or deploying to physical components.',
      bullets: ['Clock tree frequency checks', 'Peripheral constraint validation', 'Pin-conflict warning system'],
      img: '/screenshots/ide-config.jpg'
    },
    {
      id: 'generation',
      name: 'Firmware Generation',
      title: 'Firmware Generation',
      desc: 'Generate production-ready C/C++ drivers grounded in validated constraints. Surpasses generic models by strictly referencing hardware boundaries, ensuring zero register hallucinations.',
      bullets: ['Production-ready driver modules', 'Grounded register offsets', 'Vendor SDK compatibility'],
      img: '/screenshots/ide-ai.jpg'
    },
    {
      id: 'debug',
      name: 'Debug Mode',
      title: 'Debug Mode',
      desc: 'Analyze crashes, core register faults, and serial streams. HardcoreAI parses execution traces and maps errors back to original manual rules, showing you the exact source lines to modify.',
      bullets: ['Core dump register inspection', 'Real-time trace mapping', 'Automated diagnostic explanations'],
      img: '/screenshots/ide-debug.jpg'
    }
  ]

  const activeTabData = tabs.find(t => t.id === activeTab) || tabs[0]

  return (
    <div style={{ background: '#030303', minHeight: '100vh', color: '#f8fafc', overflowX: 'hidden', position: 'relative' }}>
      
      {/* Background Grids */}
      <div className="bg-grid" />
      <div className="bg-circuit-overlay" />

      {/* Sticky Navbar */}
      <nav style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '0 40px', height: '64px',
        background: 'rgba(3,3,3,0.7)',
        backdropFilter: 'blur(16px)',
        borderBottom: '1px solid #1e1e2f',
      }}>
        {/* Logo */}
        <a href="#" style={{ display: 'flex', alignItems: 'center', gap: '10px', textDecoration: 'none' }}>
          <svg width="28" height="28" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="32" height="32" rx="8" fill="url(#purpleGradientNav)"/>
            <circle cx="9" cy="9" r="4" fill="white"/>
            <rect x="5" y="14" width="8" height="12" rx="4" fill="white"/>
            <rect x="19" y="6" width="8" height="12" rx="4" fill="white"/>
            <circle cx="23" cy="23" r="4" fill="white"/>
            <rect x="11" y="15.5" width="10" height="5" rx="2.5" fill="white"/>
            <defs>
              <linearGradient id="purpleGradientNav" x1="0" y1="0" x2="32" y2="32" gradientUnits="userSpaceOnUse">
                <stop stop-color="#6366F1"/>
                <stop offset="1" stop-color="#8B5CF6"/>
              </linearGradient>
            </defs>
          </svg>
          <span style={{ fontSize: '15px', fontWeight: 700, letterSpacing: '0.05em', color: '#fff', fontFamily: "'Barlow Condensed', sans-serif" }}>
            HARDCOREAI
          </span>
        </a>

        {/* Nav Links */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '32px' }}>
          {[
            { label: 'Product', href: '#product' },
            { label: 'How It Works', href: '#how-it-works' },
            { label: 'Industries', href: '#industries' },
            { label: 'About', href: '#about' }
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

        {/* Action Button */}
        <a href="https://calendly.com/sricharan-srikrishna/30min" target="_blank" style={{
          fontSize: '13px', fontWeight: 600,
          padding: '8px 18px',
          background: 'var(--accent-purple)',
          borderRadius: '6px', color: '#fff', textDecoration: 'none',
          boxShadow: '0 4px 20px rgba(139,92,246,0.25)',
          fontFamily: "'IBM Plex Mono', monospace",
          transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
          border: '1px solid rgba(255,255,255,0.1)'
        }}
          onMouseEnter={e => {
            e.currentTarget.style.backgroundColor = '#7c3aed'
            e.currentTarget.style.boxShadow = '0 4px 30px rgba(139,92,246,0.4)'
            e.currentTarget.style.transform = 'translateY(-1px)'
          }}
          onMouseLeave={e => {
            e.currentTarget.style.backgroundColor = 'var(--accent-purple)'
            e.currentTarget.style.boxShadow = '0 4px 20px rgba(139,92,246,0.25)'
            e.currentTarget.style.transform = 'translateY(0)'
          }}
        >
          Book a Consultation
        </a>
      </nav>

      {/* ── HERO SECTION ── */}
      <header id="hero" className="section hero-section">
        <div className="container hero-grid">
          <div className="hero-content fade-in-up">
            <h1 className="hero-title">
              Engineering teams don't need faster code generation.<br />
              <span className="text-purple">They need faster hardware development.</span>
            </h1>
            <p className="hero-subtitle">
              HardcoreAI helps firmware teams understand hardware documentation, validate engineering decisions, generate production-ready firmware and reduce bring-up time—so products move from concept to prototype significantly faster.
            </p>
            <div className="hero-actions">
              <a href="https://calendly.com/sricharan-srikrishna/30min" target="_blank" className="btn btn-primary btn-lg">Book a 30-Minute Engineering Consultation</a>
              <a href="#how-it-works" className="btn btn-secondary btn-lg">See How It Works</a>
            </div>

            {/* Trust Badges */}
            <div className="backed-by-container">
              <p className="backed-by-label">Backed By</p>
              <div className="backed-by-grid">
                <div className="backed-badge">VIT Technology Business Incubator</div>
                <div className="backed-badge">Sarvam AI Startup Program</div>
              </div>
            </div>
          </div>

          {/* Animated embedded workflow visual */}
          <div className="hero-workflow fade-in-up">
            <div className="workflow-graphic-header">
              <span>Target Hardware Workflow</span>
              <span className="workflow-status-dot"></span>
            </div>
            
            {workflowSteps.map((step, idx) => {
              const StepIcon = step.icon
              const isActive = idx === activeWorkflowIndex
              return (
                <div key={step.name}>
                  {idx > 0 && <div className="workflow-step-arrow">&darr;</div>}
                  <div className={`workflow-step-node ${isActive ? 'active' : ''}`}>
                    <StepIcon />
                    <span>{step.name}</span>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </header>

      {/* ── VALUE PROPOSITION ── */}
      <section id="values" className="section border-t" style={{ backgroundColor: 'var(--bg-secondary)' }}>
        <div className="container">
          <div className="section-header text-center fade-in-up">
            <span className="section-label">Business Value</span>
            <h2 className="section-title">Engineering teams don't buy AI.<br />They buy faster product development.</h2>
          </div>

          <div className="premium-card-grid">
            {[
              {
                icon: Zap,
                title: 'Accelerate Prototyping',
                desc: 'Reduce repetitive firmware work so engineering teams can validate ideas faster.'
              },
              {
                icon: Clock,
                title: 'Shorter Bring-up Cycles',
                desc: 'Catch configuration mistakes before firmware reaches hardware.'
              },
              {
                icon: ShieldCheck,
                title: 'Reduce Engineering Effort',
                desc: 'Automate repetitive hardware reasoning while engineers stay in complete control.'
              },
              {
                icon: TrendingUp,
                title: 'Ship Products Faster',
                desc: 'Reduce firmware bottlenecks that delay hardware programs.'
              }
            ].map((card, idx) => {
              const CardIcon = card.icon
              return (
                <div key={card.title} className="premium-card glow-card fade-in-up" style={{ animationDelay: `${(idx + 1) * 100}ms` }}>
                  <div className="premium-card-icon"><CardIcon /></div>
                  <h3>{card.title}</h3>
                  <p>{card.desc}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ── PROBLEM SECTION ── */}
      <section id="problem" className="section border-t">
        <div className="container split-grid">
          {/* Vertical step nodes cycling through */}
          <div className="flow-timeline fade-in-up">
            {problemSteps.map((step, idx) => (
              <div key={step} className={`flow-node ${idx === activeProblemIndex ? 'active' : ''}`}>
                <div className="flow-node-label">{step}</div>
              </div>
            ))}
          </div>

          <div className="hero-content fade-in-up">
            <span className="section-label">The Bottleneck</span>
            <h2 className="section-title">Firmware engineers make hundreds of hardware decisions before writing a single line of code.</h2>
            
            <div className="mt-lg problem-bullet-list">
              <div className="problem-bullet">
                <h4><i data-lucide="alert-triangle"><AlertTriangle size={16} /></i> Fragmented Documentation</h4>
                <p>Today's firmware workflow is fundamentally manual. Hardware knowledge is fragmented across multiple documents, requiring engineers to spend days tracking registers.</p>
              </div>
              <div className="problem-bullet">
                <h4><i data-lucide="alert-triangle"><AlertTriangle size={16} /></i> Unmapped Dependencies</h4>
                <p>Every engineering decision affects multiple subsystems. Pin conflicts and clock mismatches cause complex issues that are silent during compilation.</p>
              </div>
              <div className="problem-bullet">
                <h4><i data-lucide="alert-triangle"><AlertTriangle size={16} /></i> Code vs. Hardware</h4>
                <p>Generic AI understands code syntax—not physical hardware boundaries. Most mistakes are discovered only after firmware reaches physical hardware, leading to bricked prototypes.</p>
              </div>
            </div>
            
            <div className="section-footer-statement">
              Firmware failures usually begin long before firmware is written.
            </div>
          </div>
        </div>
      </section>

      {/* ── WHY NOW SECTION ── */}
      <section id="why-now" className="section border-t bg-alt" style={{ backgroundColor: 'var(--bg-secondary)' }}>
        <div className="container">
          <div className="section-header text-center fade-in-up">
            <span className="section-label">Market Realities</span>
            <h2 className="section-title">Embedded software complexity is growing faster than engineering productivity.</h2>
          </div>

          <div className="premium-card-grid">
            {[
              {
                title: 'Increasing Hardware Complexity',
                desc: 'Modern embedded systems integrate increasingly complex peripherals, protocols, and vendor ecosystems, widening the gap between hardware select and software boot.'
              },
              {
                title: 'Compressed Timelines',
                desc: 'Engineering teams are expected to build products faster with leaner teams and shorter release cycles, leaving no margin for manual register configuration errors.'
              },
              {
                title: 'Documentation-Grounded Assistance',
                desc: 'Recent advances in AI finally make hardware-aware engineering assistance practical—but only when grounded in official documentation and deterministic validation.'
              }
            ].map((card, idx) => (
              <div key={card.title} className="premium-card why-now-card glow-card fade-in-up" style={{ animationDelay: `${(idx + 1) * 100}ms` }}>
                <div className="premium-card-icon"><Cpu size={24} /></div>
                <h3>{card.title}</h3>
                <p>{card.desc}</p>
              </div>
            ))}
          </div>

          <div className="text-center">
            <div className="section-footer-statement">
              The industry has AI for software development. Embedded engineering still lacks an intelligence layer built specifically for hardware.
            </div>
          </div>
        </div>
      </section>

      {/* ── SOLUTION SECTION ── */}
      <section id="solution" className="section border-t">
        <div className="container">
          <div className="section-header text-center fade-in-up">
            <span className="section-label">The Platform</span>
            <h2 className="section-title">The reasoning layer for embedded engineering.</h2>
            <p className="section-subtitle">
              Instead of forcing engineers to manually interpret documentation and validate every hardware decision, HardcoreAI understands engineering intent, reasons across hardware documentation, validates constraints, generates firmware and explains every engineering decision before deployment.
            </p>
          </div>

          {/* Horizontal scrollable workflow */}
          <div className="solution-flow-container fade-in-up">
            <div className="solution-horizontal-flow">
              {[
                'Engineering Intent',
                'Understand Design Goal',
                'Read Hardware Documentation',
                'Build Hardware Context',
                'Reason Across Constraints',
                'Generate Firmware',
                'Verify Every Decision',
                'Engineer Approval'
              ].map((step, idx) => (
                <div key={step} style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
                  {idx > 0 && <span className="solution-flow-arrow">&rarr;</span>}
                  <div className="solution-flow-step">{step}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="premium-card-grid">
            {[
              {
                title: 'Hardware Grounding',
                desc: 'Every reasoning cycle is directly grounded in official vendor documentation (datasheets, reference manuals) to eliminate errors.',
                icon: BookOpen
              },
              {
                title: 'Constraint Reasoning',
                desc: 'Validates peripherals, clocks, registers, interrupts and pin mappings before firmware generation to prevent runtime faults.',
                icon: Sliders
              },
              {
                title: 'Explainable Generation',
                desc: 'Every engineering decision and generated block is traceable back to official documentation with page and register citations.',
                icon: FileText
              },
              {
                title: 'Engineer in Control',
                desc: 'AI accelerates engineering reasoning, enabling senior engineers to focus on architectural judgement instead of manual mapping.',
                icon: UserCheck
              }
            ].map((card, idx) => {
              const CardIcon = card.icon
              return (
                <div key={card.title} className="premium-card glow-card fade-in-up" style={{ animationDelay: `${(idx + 1) * 100}ms` }}>
                  <div className="premium-card-icon"><CardIcon /></div>
                  <h3>{card.title}</h3>
                  <p>{card.desc}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ── PRODUCT SHOWCASE SECTION ── */}
      <section id="product" className="section border-t bg-alt" style={{ backgroundColor: 'var(--bg-secondary)' }}>
        <div className="container">
          <div className="section-header text-center fade-in-up">
            <span className="section-label">Interactive Platform</span>
            <h2 className="section-title">A unified platform replacing fragmented tools</h2>
            <p className="section-subtitle">
              A reasoning environment designed specifically for hardware-level development and configuration.
            </p>
          </div>

          <div className="tabs-container fade-in-up">
            <div className="tab-nav">
              {tabs.map(tab => (
                <button
                  key={tab.id}
                  className={`tab-btn ${activeTab === tab.id ? 'active' : ''}`}
                  onClick={() => setActiveTab(tab.id)}
                >
                  {tab.name}
                </button>
              ))}
            </div>

            <div className="product-showcase-card">
              <div className="showcase-grid">
                <div className="showcase-text">
                  <h3>{activeTabData.title}</h3>
                  <p>{activeTabData.desc}</p>
                  <ul className="showcase-features-list">
                    {activeTabData.bullets.map(bullet => (
                      <li key={bullet}>
                        <i><Check size={16} /></i>
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="showcase-visual">
                  <Image 
                    src={activeTabData.img} 
                    alt={activeTabData.title} 
                    width={650}
                    height={400}
                    style={{ width: '100%', height: 'auto', display: 'block' }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── WHY HARDCOREAI (COMPARISON TABLE) ── */}
      <section id="why-hardcore" className="section border-t">
        <div className="container">
          <div className="section-header text-center fade-in-up">
            <span className="section-label">Architecture Comparison</span>
            <h2 className="section-title">Built specifically for hardware.</h2>
          </div>

          <div className="comparison-table-wrapper fade-in-up">
            <table className="comparison-table">
              <thead>
                <tr>
                  <th className="comparison-feature-col">Capabilities</th>
                  <th className="comparison-traditional-col">Traditional AI</th>
                  <th className="comparison-hardcore-col">HardcoreAI</th>
                </tr>
              </thead>
              <tbody>
                {[
                  {
                    feature: 'Code Integration',
                    traditional: 'Writes code based on generic web patterns',
                    hardcore: 'Reasons directly across hardware documentation'
                  },
                  {
                    feature: 'Reasoning Core',
                    traditional: 'Generic language patterns',
                    hardcore: 'Validates specific engineering constraints'
                  },
                  {
                    feature: 'Verification',
                    traditional: 'No hardware level validation',
                    hardcore: 'Grounded and validated generation'
                  },
                  {
                    feature: 'Context Awareness',
                    traditional: 'No underlying hardware context',
                    hardcore: 'Explainable outputs referenced to pages'
                  },
                  {
                    feature: 'Reliability',
                    traditional: 'No deterministic verification loops',
                    hardcore: 'Deterministic validation architecture'
                  }
                ].map(row => (
                  <tr key={row.feature}>
                    <td className="comparison-feature-col">{row.feature}</td>
                    <td className="comparison-traditional-col">{row.traditional}</td>
                    <td className="comparison-hardcore-col">
                      <Check size={16} style={{ display: 'inline', marginRight: '6px', color: 'var(--accent-purple)' }} />
                      {row.hardcore}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p className="comparison-statement fade-in-up">
            Cursor understands code. HardcoreAI understands hardware.
          </p>
        </div>
      </section>

      {/* ── BUSINESS OUTCOMES ── */}
      <section id="outcomes" className="section border-t bg-alt" style={{ backgroundColor: 'var(--bg-secondary)' }}>
        <div className="container">
          <div className="section-header text-center fade-in-up">
            <span className="section-label">Business Impact</span>
            <h2 className="section-title">The outcomes engineering leaders actually care about.</h2>
          </div>

          <div className="outcomes-grid">
            {[
              {
                title: 'Accelerate prototyping',
                desc: 'Minimize initial driver setup delays, letting your hardware program iterate on proof of concepts in days instead of months.'
              },
              {
                title: 'Reduce firmware bring-up time',
                desc: 'Shorten the critical window between board delivery and stable execution by preemptively catching config mismatches.'
              },
              {
                title: 'Reduce debugging effort',
                desc: 'Automate core registers parsing, reducing manual trace and scope investigation time for runtime faults.'
              },
              {
                title: 'Standardize engineering workflows',
                desc: 'Enforce clean, documented driver configurations based on unified hardware guidelines across the entire development team.'
              },
              {
                title: 'Improve onboarding',
                desc: 'Get new developers ramped up on complex hardware specifications with grounded, interactive reference lookup utilities.'
              },
              {
                title: 'Ship products faster',
                desc: 'Ensure software delays never become the bottleneck on your critical path to market launch.'
              }
            ].map((outcome, idx) => (
              <div key={outcome.title} className="outcome-card fade-in-up" style={{ animationDelay: `${(idx + 1) * 100}ms` }}>
                <h3>{outcome.title}</h3>
                <p>{outcome.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WORKFLOW INTEGRATION ── */}
      <section id="workflow-integration" className="section border-t">
        <div className="container">
          <div className="section-header text-center fade-in-up">
            <span className="section-label">Integration</span>
            <h2 className="section-title">Works alongside existing engineering workflows.</h2>
            <p className="section-subtitle">
              Deploy HardcoreAI without forcing your team to abandon their preferred toolchain.
            </p>
          </div>

          <div className="enterprise-features-grid">
            {[
              {
                title: 'PlatformIO',
                desc: 'Build, upload, and test directly using your standard configs.',
                icon: Terminal
              },
              {
                title: 'STM32CubeIDE',
                desc: 'Integrate generated driver modules directly inside vendor environments.',
                icon: Package
              },
              {
                title: 'Vendor SDKs',
                desc: 'Direct compatibility with ESP-IDF, STM32CubeHAL, and custom register files.',
                icon: Cpu
              },
              {
                title: 'Existing Repositories',
                desc: 'Runs seamlessly alongside your current Git structure and CI files.',
                icon: GitBranch
              },
              {
                title: 'Existing Debugging',
                desc: 'Augments standard GDB, J-Link, and logic analyzer diagnostics.',
                icon: Search
              }
            ].map((feat, idx) => {
              const FeatIcon = feat.icon
              return (
                <div key={feat.title} className="ent-feature-card fade-in-up" style={{ animationDelay: `${(idx + 1) * 100}ms` }}>
                  <FeatIcon size={24} style={{ marginBottom: '16px', color: 'var(--accent-purple)' }} />
                  <h4>{feat.title}</h4>
                  <p>{feat.desc}</p>
                </div>
              )
            })}
          </div>

          <div className="text-center mt-lg fade-in-up">
            <div className="section-footer-statement" style={{ marginTop: '2rem' }}>
              No workflow disruption. No vendor lock-in. Engineers remain in control.
            </div>
          </div>
        </div>
      </section>

      {/* ── INDUSTRIES ── */}
      <section id="industries" className="section border-t bg-alt" style={{ backgroundColor: 'var(--bg-secondary)' }}>
        <div className="container">
          <div className="section-header text-center fade-in-up">
            <span className="section-label">Sectors Supported</span>
            <h2 className="section-title">Built for high-reliability industries.</h2>
          </div>

          <div className="industries-grid">
            {[
              'Robotics',
              'Automotive',
              'Industrial Automation',
              'Medical Devices',
              'Consumer Electronics',
              'Semiconductors',
              'Aerospace & Defence'
            ].map((ind, idx) => (
              <div key={ind} className="industry-tag fade-in-up" style={{ animationDelay: `${(idx + 1) * 100}ms` }}>
                {ind}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── ABOUT SECTION ── */}
      <section id="about" className="section border-t">
        <div className="container text-center">
          <div className="section-header fade-in-up">
            <span className="section-label">Our Mission</span>
            <h2 className="section-title">Building the reasoning layer for embedded engineering.</h2>
          </div>

          <div className="about-box fade-in-up">
            <p className="about-text">
              HardcoreAI is building enterprise infrastructure for firmware engineering. Instead of replacing engineers, HardcoreAI augments hardware reasoning by grounding every engineering decision in official documentation, validating hardware constraints before firmware generation and keeping engineers in complete control throughout development.
            </p>
            <div className="about-mission">
              Our mission is to help engineering teams prototype faster, reduce bring-up time and accelerate the development of embedded products.
            </div>
          </div>
        </div>
      </section>

      {/* ── FINAL CTA CARD ── */}
      <section className="section border-t bg-alt" style={{ backgroundColor: 'var(--bg-secondary)' }}>
        <div className="container">
          <div className="cta-card fade-in-up">
            <span className="section-label">Next Steps</span>
            <h2 className="section-title" style={{ fontSize: '3rem', marginBottom: '1.5rem' }}>Let's improve your firmware development workflow.</h2>
            <p className="section-subtitle" style={{ marginLeft: 'auto', marginRight: 'auto', maxWidth: '750px', fontSize: '1.15rem', lineHeight: '1.6', marginBottom: '3rem' }}>
              Book a 30-minute engineering consultation. We'll understand your current firmware workflow, identify bottlenecks and determine whether HardcoreAI can help reduce bring-up time, accelerate prototyping and improve engineering productivity.
            </p>

            <a href="https://calendly.com/sricharan-srikrishna/30min" target="_blank" style={{
              display: 'inline-flex',
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
              Book a 30-Minute Engineering Consultation &rarr;
            </a>

            <div className="cta-contacts">
              <span>Email: <a href="mailto:sricharan.srikrishna@gmail.com">sricharan.srikrishna@gmail.com</a></span>
              <span>Phone: <a href="tel:+917010293396">+91 7010293396</a></span>
            </div>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="footer border-t">
        <div className="container">
          <div className="footer-layout">
            <div className="footer-brand">
              <div className="footer-logo">
                <svg width="24" height="24" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect width="32" height="32" rx="8" fill="url(#purpleGradientFooter)"/>
                  <circle cx="9" cy="9" r="4" fill="white"/>
                  <rect x="5" y="14" width="8" height="12" rx="4" fill="white"/>
                  <rect x="19" y="6" width="8" height="12" rx="4" fill="white"/>
                  <circle cx="23" cy="23" r="4" fill="white"/>
                  <rect x="11" y="15.5" width="10" height="5" rx="2.5" fill="white"/>
                  <defs>
                    <linearGradient id="purpleGradientFooter" x1="0" y1="0" x2="32" y2="32" gradientUnits="userSpaceOnUse">
                      <stop stop-color="#6366F1"/>
                      <stop offset="1" stop-color="#8B5CF6"/>
                    </linearGradient>
                  </defs>
                </svg>
                HARDCOREAI
              </div>
              <p className="footer-desc">Building the reasoning layer for embedded engineering. Grounded logic, deterministic verification, complete engineer control.</p>
            </div>

            <div className="footer-nav">
              <div className="footer-nav-col">
                <h4>Navigation</h4>
                <ul>
                  <li><a href="#product">Product</a></li>
                  <li><a href="#how-it-works">How It Works</a></li>
                  <li><a href="#industries">Industries</a></li>
                  <li><a href="#about">About</a></li>
                </ul>
              </div>
              <div className="footer-nav-col">
                <h4>Connect</h4>
                <ul>
                  <li><a href="https://calendly.com/sricharan-srikrishna/30min" target="_blank">Book a Consultation</a></li>
                  <li><a href="mailto:sricharan.srikrishna@gmail.com">Email Support</a></li>
                  <li><a href="tel:+917010293396">Phone Contact</a></li>
                </ul>
              </div>
            </div>
          </div>

          <div className="footer-bottom">
            <p>&copy; 2026 HardcoreAI. All rights reserved.</p>
            <p className="mono-text">Standardizing Firmware Workflows for Hardware Teams.</p>
          </div>
        </div>
      </footer>

    </div>
  )
}
