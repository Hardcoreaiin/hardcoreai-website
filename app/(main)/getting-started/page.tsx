'use client'

import { useProjectStore } from '@/lib/store'
import { NewProjectModal } from '@/components/projects/NewProjectModal'
import {
  Cpu,
  Search,
  Wand2,
  CheckCircle2,
  Zap,
  RefreshCw,
  ArrowRight,
  ArrowDown,
  Sparkles,
  BookOpen,
  Plus,
  Terminal,
  ShieldCheck,
} from 'lucide-react'
import Link from 'next/link'

export default function GettingStartedPage() {
  const { openNewProjectModal } = useProjectStore()

  const workflowSteps = [
    { title: '1. Select Board', desc: 'MCU & peripheral setup', icon: Cpu },
    { title: '2. Define Project', desc: 'Datasheets & schematics', icon: FileTextIcon },
    { title: '3. Research Mode', desc: 'Pins, clocks & registers', icon: Search },
    { title: '4. Review Config', desc: 'Hardware boundaries', icon: ShieldCheck },
    { title: '5. Generate Firmware', desc: 'Verified C/C++ drivers', icon: Wand2 },
    { title: '6. Build & Check', desc: 'Compilation verification', icon: CheckCircle2 },
    { title: '7. Flash', desc: 'Upload to target board', icon: Zap },
    { title: '8. Test on Hardware', desc: 'Signal & protocol check', icon: Terminal },
    { title: '9. Debug / Iterate', desc: 'Closed-loop analysis', icon: RefreshCw },
  ]

  return (
    <div className="max-w-5xl mx-auto w-full space-y-10 animate-in fade-in duration-300 pb-16">
      {/* Header */}
      <div className="border-b border-zinc-800 pb-6">
        <div className="flex items-center gap-3 mb-2">
          <div className="h-10 w-10 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400">
            <BookOpen size={20} />
          </div>
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-white">Getting Started</h1>
            <p className="text-zinc-400 text-sm mt-0.5">
              Guide to the HardcoreAI hardware-first firmware engineering workflow.
            </p>
          </div>
        </div>
        <p className="text-zinc-300 text-sm leading-relaxed mt-4 max-w-3xl">
          Welcome to <strong className="text-white">HardcoreAI</strong>, your AI-powered firmware engineering platform. HardcoreAI understands your hardware and its documentation before generating firmware, helping you move from board selection → research → firmware → hardware.
        </p>
      </div>

      {/* Golden Rule Highlight Banner */}
      <div className="bg-gradient-to-r from-purple-950/60 via-zinc-900 to-purple-950/40 border border-purple-500/30 rounded-2xl p-6 relative overflow-hidden shadow-xl">
        <div className="flex items-start gap-4">
          <div className="h-12 w-12 rounded-xl bg-purple-500/20 border border-purple-500/40 flex items-center justify-center text-purple-300 shrink-0">
            <Sparkles size={24} />
          </div>
          <div>
            <span className="text-xs uppercase font-bold tracking-wider text-purple-400 block mb-1">
              THE GOLDEN RULE
            </span>
            <h2 className="text-xl font-extrabold text-white tracking-tight">
              &ldquo;Research first. Generate second. Flash last.&rdquo;
            </h2>
            <p className="text-sm text-zinc-300 mt-2 leading-relaxed">
              HardcoreAI is designed to understand the hardware and documentation before generating firmware. That is what makes the workflow fundamentally different from simply asking an AI to write generic embedded C code.
            </p>
          </div>
        </div>
      </div>

      {/* Recommended Workflow Flowchart */}
      <div className="bg-zinc-900/80 border border-zinc-800 rounded-2xl p-6 space-y-4">
        <h3 className="text-base font-semibold text-white flex items-center gap-2">
          <Zap size={18} className="text-purple-400" />
          Recommended HardcoreAI Workflow
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-3 gap-3 pt-2">
          {workflowSteps.map((step, idx) => (
            <div
              key={step.title}
              className="bg-zinc-950 border border-zinc-800/90 rounded-xl p-3.5 flex items-center justify-between"
            >
              <div className="flex items-center gap-3">
                <div className="h-8 w-8 rounded-lg bg-zinc-900 border border-zinc-700/60 flex items-center justify-center text-purple-400 shrink-0">
                  <step.icon size={16} />
                </div>
                <div>
                  <div className="text-xs font-bold text-white">{step.title}</div>
                  <div className="text-[11px] text-zinc-500">{step.desc}</div>
                </div>
              </div>
              {idx < workflowSteps.length - 1 && (
                <ArrowRight size={14} className="text-zinc-600 hidden sm:block shrink-0" />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Step by Step Detail Cards */}
      <div className="space-y-6">
        {/* STEP 1 */}
        <div className="bg-zinc-900/70 border border-zinc-800 rounded-2xl p-6 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex items-center gap-3">
              <span className="h-8 w-8 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-400 font-bold text-xs flex items-center justify-center">
                01
              </span>
              <h3 className="text-lg font-bold text-white">STEP 1 — SELECT YOUR BOARD</h3>
            </div>
            <button
              onClick={openNewProjectModal}
              className="bg-white text-zinc-950 px-3.5 py-1.5 rounded-lg text-xs font-semibold hover:bg-zinc-200 transition-colors flex items-center shadow self-start sm:self-auto"
            >
              <Plus size={14} className="mr-1.5" />
              Select Board / Create Project
            </button>
          </div>
          <p className="text-sm text-zinc-300 leading-relaxed">
            Start by selecting the development board or MCU you are working with. Choose your:
          </p>
          <ul className="list-disc list-inside text-xs text-zinc-400 space-y-1.5 pl-2">
            <li>Development board (e.g. STM32, ESP32, nRF52, NXP, Microchip, RISC-V)</li>
            <li>Microcontroller target & family</li>
            <li>Required peripherals (USART, I2C, SPI, TIM, ADC, DMA)</li>
            <li>Hardware configuration details</li>
          </ul>
          <div className="bg-zinc-950 border border-zinc-800/80 rounded-xl p-3 text-xs text-zinc-400">
            <strong className="text-purple-300">Tip:</strong> If your exact board isn&apos;t listed, select the closest supported MCU/board configuration and verify the hardware details before generating firmware.
          </div>
        </div>

        {/* STEP 2 */}
        <div className="bg-zinc-900/70 border border-zinc-800 rounded-2xl p-6 space-y-4">
          <div className="flex items-center gap-3">
            <span className="h-8 w-8 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-400 font-bold text-xs flex items-center justify-center">
              02
            </span>
            <h3 className="text-lg font-bold text-white">STEP 2 — RESEARCH YOUR PROJECT</h3>
          </div>
          <p className="text-sm text-zinc-300 leading-relaxed">
            Before generating firmware, use <strong>Research Mode</strong>. Tell HardcoreAI what you want to build and upload relevant project documentation:
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs text-zinc-400">
            <span className="bg-zinc-950 border border-zinc-800 px-2.5 py-1.5 rounded-md text-center">Datasheets</span>
            <span className="bg-zinc-950 border border-zinc-800 px-2.5 py-1.5 rounded-md text-center">Reference Manuals</span>
            <span className="bg-zinc-950 border border-zinc-800 px-2.5 py-1.5 rounded-md text-center">Pinouts & Schematics</span>
            <span className="bg-zinc-950 border border-zinc-800 px-2.5 py-1.5 rounded-md text-center">Sensor Modules</span>
          </div>

          <div className="bg-zinc-950 border border-zinc-800 rounded-xl p-4 space-y-2">
            <span className="text-xs font-semibold text-purple-300 block">Recommended Prompt Example:</span>
            <p className="text-xs text-zinc-300 font-mono italic">
              &ldquo;I want to interface an MPU6050 over I2C1 and send the sensor data over USART2. Research the required hardware configuration and identify the relevant pins, clocks and peripherals.&rdquo;
            </p>
          </div>
        </div>

        {/* STEP 3 */}
        <div className="bg-zinc-900/70 border border-zinc-800 rounded-2xl p-6 space-y-4">
          <div className="flex items-center gap-3">
            <span className="h-8 w-8 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-400 font-bold text-xs flex items-center justify-center">
              03
            </span>
            <h3 className="text-lg font-bold text-white">STEP 3 — GENERATE FIRMWARE</h3>
          </div>
          <p className="text-sm text-zinc-300 leading-relaxed">
            Once research is complete, ask HardcoreAI to generate the firmware drivers. Specify required functionality, communication protocols, interrupts, and timing constraints.
          </p>
          <Link
            href="/dashboard"
            className="inline-flex items-center text-xs text-purple-400 hover:text-purple-300 font-medium"
          >
            Go to Projects Workspace to Generate <ArrowRight size={14} className="ml-1" />
          </Link>
        </div>

        {/* STEP 4 */}
        <div className="bg-zinc-900/70 border border-zinc-800 rounded-2xl p-6 space-y-4">
          <div className="flex items-center gap-3">
            <span className="h-8 w-8 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-400 font-bold text-xs flex items-center justify-center">
              04
            </span>
            <h3 className="text-lg font-bold text-white">STEP 4 — BUILD & CHECK</h3>
          </div>
          <p className="text-sm text-zinc-300 leading-relaxed">
            Build the generated code using your toolchain (GCC, STM32CubeIDE, ESP-IDF, Keil). Check for compilation errors, warnings, missing dependencies, or register conflicts.
          </p>
          <div className="bg-zinc-950 border border-zinc-800 rounded-xl p-3 text-xs text-zinc-400">
            If the build fails, paste the compiler error log back into HardcoreAI. HardcoreAI will cross-reference the error against the hardware datasheet to produce the exact fix.
          </div>
        </div>

        {/* STEP 5 */}
        <div className="bg-zinc-900/70 border border-zinc-800 rounded-2xl p-6 space-y-4">
          <div className="flex items-center gap-3">
            <span className="h-8 w-8 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-400 font-bold text-xs flex items-center justify-center">
              05
            </span>
            <h3 className="text-lg font-bold text-white">STEP 5 — FLASH TO YOUR BOARD</h3>
          </div>
          <p className="text-sm text-zinc-300 leading-relaxed">
            Connect your target development board via ST-Link, J-Link, or USB serial. Select the interface, flash the binary, reset the board, and verify expected behavior.
          </p>
          <div className="flex items-center gap-2 text-xs font-mono font-semibold text-purple-300">
            <span>Generate</span> &rarr; <span>Build</span> &rarr; <span>Flash</span> &rarr; <span>Test</span>
          </div>
        </div>

        {/* STEP 6 */}
        <div className="bg-zinc-900/70 border border-zinc-800 rounded-2xl p-6 space-y-4">
          <div className="flex items-center gap-3">
            <span className="h-8 w-8 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-400 font-bold text-xs flex items-center justify-center">
              06
            </span>
            <h3 className="text-lg font-bold text-white">STEP 6 — DEBUG & ITERATE</h3>
          </div>
          <p className="text-sm text-zinc-300 leading-relaxed">
            If the hardware output does not match expected signals, tell HardcoreAI what happened (e.g. &ldquo;The firmware builds and flashes, but USART2 produces no output&rdquo;). HardcoreAI will trace clock enable bits, pin multiplexing, and peripheral registers to fix the issue.
          </p>
        </div>
      </div>

      <NewProjectModal />
    </div>
  )
}

function FileTextIcon(props: any) {
  return (
    <svg
      {...props}
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      viewBox="0 0 24 24"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M14 2v6h6M16 13H8M16 17H8M10 9H8" />
    </svg>
  )
}
