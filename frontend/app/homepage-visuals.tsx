import { m } from "framer-motion";
import {
  ArrowUpRight,
  Bot,
  Cloud,
  Database,
  Layers3,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

const loopEase = [0.37, 0, 0.63, 1] as const;

function FloatingCluster({
  className,
  delay = 0,
  prefersReducedMotion,
}: {
  className: string;
  delay?: number;
  prefersReducedMotion: boolean;
}) {
  return (
    <m.div
      aria-hidden="true"
      className={className}
      animate={
        prefersReducedMotion
          ? undefined
          : {
              y: [0, -12, 0],
              x: [0, 6, 0],
              opacity: [0.45, 0.82, 0.5],
            }
      }
      transition={
        prefersReducedMotion
          ? { duration: 0 }
          : {
              duration: 12,
              delay,
              repeat: Number.POSITIVE_INFINITY,
              ease: loopEase,
            }
      }
    />
  );
}

export function HomepageHeroMedia({
  prefersReducedMotion,
}: {
  prefersReducedMotion: boolean;
}) {
  return (
    <div className="relative isolate min-h-[28rem] sm:min-h-[34rem]">
      <FloatingCluster
        prefersReducedMotion={prefersReducedMotion}
        className="absolute left-[8%] top-[10%] h-32 w-32 rounded-full bg-[var(--accent-soft)] blur-3xl"
      />
      <FloatingCluster
        prefersReducedMotion={prefersReducedMotion}
        delay={0.6}
        className="absolute right-[10%] top-[16%] h-36 w-36 rounded-full bg-[var(--secondary-soft)] blur-3xl"
      />
      <FloatingCluster
        prefersReducedMotion={prefersReducedMotion}
        delay={1.1}
        className="absolute bottom-[10%] left-[24%] h-28 w-28 rounded-full bg-[rgba(111,215,204,0.12)] blur-3xl"
      />

      <div className="absolute inset-0 rounded-[2.3rem] bg-[linear-gradient(145deg,rgba(255,255,255,0.08),rgba(255,255,255,0.02))]" />

      <m.div
        className="absolute inset-x-0 top-0 mx-auto w-full max-w-[39rem] rounded-[2.2rem] bg-[color:var(--surface-strong)]/85 p-3 shadow-[0_28px_80px_rgba(7,14,28,0.18)] backdrop-blur-2xl"
        animate={
          prefersReducedMotion
            ? undefined
            : {
                y: [0, -8, 0],
              }
        }
        transition={
          prefersReducedMotion
            ? { duration: 0 }
            : {
                duration: 9,
                repeat: Number.POSITIVE_INFINITY,
                ease: loopEase,
              }
        }
      >
        <div className="overflow-hidden rounded-[1.8rem] bg-[linear-gradient(180deg,rgba(10,18,34,0.98),rgba(17,30,52,0.92))] p-4 text-white">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="h-2.5 w-2.5 rounded-full bg-[#ff7a32]" />
              <span className="h-2.5 w-2.5 rounded-full bg-[rgba(255,255,255,0.24)]" />
              <span className="h-2.5 w-2.5 rounded-full bg-[rgba(255,255,255,0.16)]" />
            </div>
            <span className="text-[0.68rem] font-medium uppercase tracking-[0.28em] text-white/55">
              Live delivery view
            </span>
          </div>

          <div className="mt-4 grid gap-4 lg:grid-cols-[0.9fr_1.1fr]">
            <div className="space-y-4">
              <div className="rounded-[1.35rem] bg-white/6 p-4 ring-1 ring-white/8">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-[0.68rem] uppercase tracking-[0.24em] text-white/55">
                      Platform status
                    </p>
                    <p className="mt-2 text-lg font-medium text-white">
                      Release in motion
                    </p>
                  </div>
                  <Sparkles className="h-5 w-5 text-[#6fd7cc]" />
                </div>
                <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
                  <div className="rounded-[1rem] bg-white/6 px-3 py-3">
                    <p className="text-white/52">Systems</p>
                    <p className="mt-2 font-medium">12 active</p>
                  </div>
                  <div className="rounded-[1rem] bg-white/6 px-3 py-3">
                    <p className="text-white/52">Signals</p>
                    <p className="mt-2 font-medium">4 resolved</p>
                  </div>
                </div>
              </div>

              <div className="rounded-[1.35rem] bg-white/6 p-4 ring-1 ring-white/8">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-[0.95rem] bg-[rgba(255,178,74,0.18)]">
                    <Bot className="h-5 w-5 text-[#ffb24a]" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">AI workflow</p>
                    <p className="text-xs text-white/55">
                      Triage {"->"} draft {"->"} review {"->"} ship
                    </p>
                  </div>
                </div>
                <div className="mt-4 flex items-center gap-2">
                  {["Input", "Rules", "Review", "Release"].map((item) => (
                    <div
                      key={item}
                      className="rounded-full bg-white/6 px-3 py-1.5 text-[0.68rem] uppercase tracking-[0.18em] text-white/68"
                    >
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="rounded-[1.35rem] bg-white/6 p-4 ring-1 ring-white/8">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-[0.68rem] uppercase tracking-[0.24em] text-white/55">
                      Delivery analytics
                    </p>
                    <p className="mt-2 text-lg font-medium">Clearer project signals</p>
                  </div>
                  <ArrowUpRight className="h-4 w-4 text-[#6fd7cc]" />
                </div>
                <svg
                  viewBox="0 0 280 120"
                  aria-hidden="true"
                  className="mt-4 h-32 w-full"
                >
                  <defs>
                    <linearGradient id="hero-graph" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#6fd7cc" stopOpacity="0.2" />
                      <stop offset="100%" stopColor="#ffb24a" stopOpacity="0.7" />
                    </linearGradient>
                  </defs>
                  <path
                    d="M0 96 L40 84 L80 88 L120 58 L160 62 L200 44 L240 30 L280 18"
                    fill="none"
                    stroke="url(#hero-graph)"
                    strokeWidth="4"
                    strokeLinecap="round"
                  />
                  <path
                    d="M0 96 L40 84 L80 88 L120 58 L160 62 L200 44 L240 30 L280 18 V120 H0 Z"
                    fill="url(#hero-graph)"
                    opacity="0.16"
                  />
                </svg>
              </div>

              <div className="grid gap-4 sm:grid-cols-3">
                <div className="rounded-[1.2rem] bg-white/6 p-4 ring-1 ring-white/8">
                  <Cloud className="h-5 w-5 text-[#6fd7cc]" />
                  <p className="mt-3 text-sm font-medium">Cloud topology</p>
                  <p className="mt-2 text-xs text-white/55">Secure paths across regions.</p>
                </div>
                <div className="rounded-[1.2rem] bg-white/6 p-4 ring-1 ring-white/8">
                  <Database className="h-5 w-5 text-[#ffb24a]" />
                  <p className="mt-3 text-sm font-medium">Data layer</p>
                  <p className="mt-2 text-xs text-white/55">Operational data kept usable.</p>
                </div>
                <div className="rounded-[1.2rem] bg-white/6 p-4 ring-1 ring-white/8">
                  <ShieldCheck className="h-5 w-5 text-[#6fd7cc]" />
                  <p className="mt-3 text-sm font-medium">Security</p>
                  <p className="mt-2 text-xs text-white/55">Policies built into flow.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </m.div>

      <m.div
        className="absolute -bottom-1 left-[8%] w-[11rem] rounded-[1.8rem] bg-[color:var(--surface-elevated)]/88 p-3 shadow-[0_20px_60px_rgba(7,14,28,0.18)] backdrop-blur-2xl"
        animate={
          prefersReducedMotion
            ? undefined
            : {
                y: [0, 10, 0],
              }
        }
        transition={
          prefersReducedMotion
            ? { duration: 0 }
            : {
                duration: 10,
                delay: 0.5,
                repeat: Number.POSITIVE_INFINITY,
                ease: loopEase,
              }
        }
      >
        <div className="rounded-[1.35rem] bg-[linear-gradient(180deg,rgba(255,255,255,0.86),rgba(247,250,255,0.78))] p-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-[1rem] bg-[var(--secondary-soft)] text-[var(--secondary)]">
              <Layers3 className="h-5 w-5" />
            </div>
            <div>
              <p className="text-sm font-medium text-[color:var(--foreground)]">Mobile view</p>
              <p className="text-xs text-[color:var(--muted)]">Role-based tasks</p>
            </div>
          </div>
          <div className="mt-4 space-y-2">
            <div className="h-2.5 rounded-full bg-[var(--line)]" />
            <div className="h-2.5 w-4/5 rounded-full bg-[var(--line)]" />
            <div className="grid grid-cols-2 gap-2 pt-1">
              <div className="h-14 rounded-[1rem] bg-[var(--accent-soft)]" />
              <div className="h-14 rounded-[1rem] bg-[var(--secondary-soft)]" />
            </div>
          </div>
        </div>
      </m.div>
    </div>
  );
}

export function FeaturedWorkVisual({
  tone = "accent",
}: {
  tone?: "accent" | "secondary" | "mixed";
}) {
  const toneMap = {
    accent: {
      top: "bg-[var(--accent-soft)]",
      bottom: "bg-[rgba(255,178,74,0.18)]",
    },
    secondary: {
      top: "bg-[var(--secondary-soft)]",
      bottom: "bg-[rgba(111,215,204,0.2)]",
    },
    mixed: {
      top: "bg-[rgba(111,215,204,0.16)]",
      bottom: "bg-[rgba(255,178,74,0.14)]",
    },
  } as const;

  const palette = toneMap[tone];

  return (
    <div className="overflow-hidden rounded-[1.5rem] bg-[color:var(--surface-soft)] p-3">
      <div className="rounded-[1.25rem] bg-[color:var(--surface-elevated)] p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.4)]">
        <div className="flex items-center gap-2">
          <span className="h-2.5 w-2.5 rounded-full bg-[var(--accent)]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[var(--line)]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[var(--line)]" />
        </div>
        <div className="mt-4 grid gap-3 sm:grid-cols-[1.1fr_0.9fr]">
          <div className="space-y-3">
            <div className={`h-24 rounded-[1.15rem] ${palette.top}`} />
            <div className="grid grid-cols-3 gap-2">
              <div className="h-14 rounded-[1rem] bg-[var(--line)]/60" />
              <div className="h-14 rounded-[1rem] bg-[var(--line)]/45" />
              <div className={`h-14 rounded-[1rem] ${palette.bottom}`} />
            </div>
          </div>
          <div className="space-y-3">
            <div className="h-11 rounded-[1rem] bg-[var(--line)]/45" />
            <div className="h-11 rounded-[1rem] bg-[var(--line)]/55" />
            <div className={`h-20 rounded-[1rem] ${palette.top}`} />
          </div>
        </div>
      </div>
    </div>
  );
}
