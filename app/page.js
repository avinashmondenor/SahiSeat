'use client'

import { useState, useRef, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import {
  GraduationCap,
  Sparkles,
  ArrowRight,
  TrendingUp,
  Target,
  ShieldCheck,
  ChevronRight,
  Trophy,
  ListChecks,
  Building2,
  BookOpen,
  ChevronDown,
  ChevronUp,
} from 'lucide-react'
import { abbreviateInstituteName } from './lib/formatters'

// Category dropdown: label shown to user, value used to match Seat Type in CSV.
const CATEGORIES = [
  { label: 'General (OPEN)', value: 'OPEN' },
  { label: 'EWS', value: 'EWS' },
  { label: 'OBC-NCL', value: 'OBC-NCL' },
  { label: 'SC', value: 'SC' },
  { label: 'ST', value: 'ST' },
  { label: 'General-PwD', value: 'OPEN (PwD)' },
  { label: 'EWS-PwD', value: 'EWS (PwD)' },
  { label: 'OBC-NCL-PwD', value: 'OBC-NCL (PwD)' },
  { label: 'SC-PwD', value: 'SC (PwD)' },
  { label: 'ST-PwD', value: 'ST (PwD)' },
]

const GENDERS = [
  { label: 'Gender-Neutral', value: 'Gender-Neutral' },
  { label: 'Female-only (including Supernumerary)', value: 'Female-only (including Supernumerary)' },
]

const STATES = [
  'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh',
  'Delhi', 'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jharkhand',
  'Karnataka', 'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Manipur',
  'Meghalaya', 'Mizoram', 'Nagaland', 'Odisha', 'Punjab', 'Rajasthan',
  'Sikkim', 'Tamil Nadu', 'Telangana', 'Tripura', 'Uttar Pradesh',
  'Uttarakhand', 'West Bengal', 'Chandigarh', 'Dadra & Nagar Haveli',
  'Daman & Diu', 'Jammu & Kashmir', 'Ladakh', 'Lakshadweep', 'Puducherry',
  'Andaman & Nicobar Islands',
]

function Nav({ hasResult, onReset }) {
  return (
    <header className="sticky top-0 z-50 w-full backdrop-blur-xl bg-background/60 border-b border-white/5">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <a href="#" className="flex items-center gap-2">
          <div className="relative flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-indigo-500 via-violet-500 to-fuchsia-500 shadow-lg shadow-violet-500/30">
            <GraduationCap className="h-4 w-4 text-white" />
          </div>
          <span className="text-base font-semibold tracking-tight">
            Sahi<span className="text-violet-400">Seat</span>
          </span>
        </a>
        <nav className="hidden md:flex items-center gap-7 text-sm text-muted-foreground">
          <a href="#predict" className="hover:text-foreground transition">Predictor</a>
          <a href="#features" className="hover:text-foreground transition">Features</a>
          <a href="#how" className="hover:text-foreground transition">How it works</a>
          <a href="#faq" className="hover:text-foreground transition">FAQ</a>
        </nav>
        {hasResult ? (
          <Button
            size="sm"
            onClick={onReset}
            className="rounded-full bg-violet-600 text-white hover:bg-violet-500 shadow-lg shadow-violet-600/20"
          >
            New Prediction
          </Button>
        ) : (
          <Button size="sm" className="rounded-full bg-white text-black hover:bg-white/90">
            Get started
            <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
          </Button>
        )}
      </div>
    </header>
  )
}

function Hero() {
  return (
    <section className="relative overflow-hidden pt-4 pb-2 md:pt-14 md:pb-8">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-0 h-[300px] w-[600px] md:h-[520px] md:w-[860px] -translate-x-1/2 rounded-full bg-violet-600/10 md:bg-violet-600/20 blur-[100px] md:blur-[140px]" />
      </div>
      <div
        className="pointer-events-none absolute inset-0 -z-10 opacity-[0.05] md:opacity-[0.07]"
        style={{
          backgroundImage:
            'linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)',
          backgroundSize: '48px 48px',
          maskImage: 'radial-gradient(ellipse at center, black 40%, transparent 75%)',
        }}
      />

      <div className="container mx-auto px-4">
        <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
          <div className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.03] px-2.5 py-0.5 text-[10px] md:text-xs text-muted-foreground">
            <Sparkles className="h-3 w-3 text-violet-400" />
            <span>CSAB 2026 — Special Round</span>
            <ChevronRight className="h-3 w-3" />
          </div>

          <h1 className="mt-2 text-3xl font-bold tracking-tight md:text-5xl lg:text-6xl">
            <span className="bg-gradient-to-b from-white to-white/60 bg-clip-text text-transparent">
              Sahi
            </span>
            <span className="bg-gradient-to-br from-indigo-400 via-violet-400 to-fuchsia-400 bg-clip-text text-transparent">
              Seat
            </span>
          </h1>

          <p className="mt-1 text-xs md:text-base text-muted-foreground font-medium">
            Smart CSAB College Analyzer
          </p>
          <p className="mt-1 max-w-lg text-xs md:text-sm text-muted-foreground/70 hidden sm:block">
            Enter your rank and we&apos;ll surface the colleges and branches you
            actually have a shot at — based purely on historical closing-rank data.
          </p>

          <div className="mt-4 flex items-center gap-3 hidden md:flex">
            <a href="#predict">
              <Button size="sm" className="rounded-full bg-white text-black hover:bg-white/90">
                Predict my colleges
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </a>
            <a href="#how">
              <Button
                size="sm"
                variant="outline"
                className="rounded-full border-white/10 bg-white/[0.02] text-foreground hover:bg-white/[0.06]"
              >
                How it works
              </Button>
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

function fmt(n) {
  if (n === null || n === undefined || n === '') return '—'
  return Number(n).toLocaleString()
}

function ResultCard({ rec, index, highlight = false }) {
  const [expanded, setExpanded] = useState(false);
  const shortInst = abbreviateInstituteName(rec.institute);
  return (
    <div
      className={`relative rounded-xl border p-3 sm:p-4 transition ${
        highlight
          ? 'border-violet-400/30 bg-gradient-to-br from-violet-500/[0.08] via-white/[0.02] to-transparent'
          : 'border-white/10 bg-white/[0.02] hover:bg-white/[0.04]'
      }`}
    >
      <div className="flex justify-between items-start gap-2 mb-1.5 sm:mb-2">
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-1.5 flex-wrap text-[10px] mb-1">
            <span className="inline-flex h-4.5 w-4.5 items-center justify-center rounded bg-white/[0.06] text-white/50 text-[9px] font-semibold">
              {index + 1}
            </span>
            {highlight && (
              <span className="inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded bg-violet-500/10 border border-violet-500/20 text-violet-200 font-semibold uppercase tracking-wider text-[8px] sm:text-[9px]">
                <Trophy className="h-2.5 w-2.5 shrink-0" /> Best Match
              </span>
            )}
            <span className="px-1.5 py-0.5 rounded bg-white/5 border border-white/5 text-white/40 text-[8px] sm:text-[9px] uppercase tracking-wider font-mono">
              R{rec.round}
            </span>
          </div>
          
          <h3 className="text-sm sm:text-base font-bold leading-snug text-white flex items-center gap-1.5">
            <Building2 className="h-3.5 w-3.5 shrink-0 text-violet-300 hidden sm:block" />
            <span className="truncate" title={rec.institute}>{shortInst}</span>
          </h3>
          <p className="mt-0.5 text-xs text-white/70 leading-snug flex items-center gap-1.5 font-medium">
            <BookOpen className="h-3 w-3 shrink-0 text-white/30 hidden sm:block" />
            <span className="line-clamp-1" title={rec.program}>{rec.program}</span>
          </p>
        </div>
        
        <div className="shrink-0 text-right">
          <div className="text-[10px] text-white/40 font-mono">
            CR: <strong className="text-white font-semibold">{fmt(rec.closingRank)}</strong>
          </div>
          <div className="text-xs sm:text-sm font-bold tabular-nums text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20 mt-0.5 inline-block">
            +{fmt(rec.rankGap)}
          </div>
        </div>
      </div>

      {/* Tags & Ranks Inline Strip */}
      <div className="mt-2 flex flex-wrap items-center justify-between gap-2 border-t border-white/5 pt-1.5 text-[10px]">
        {/* Compact Metadata Tags */}
        <div className="flex flex-wrap items-center gap-1.5 text-white/40 font-mono text-[8px] sm:text-[9px]">
          <span>{rec.quota}</span>
          <span>|</span>
          <span>{rec.seatType}</span>
          <span>|</span>
          <span className="truncate max-w-[80px]">
            {rec.gender === 'Female-only (including Supernumerary)' ? 'Female' : 'Gender-Neutral'}
          </span>
        </div>
        
        {/* Ranks (Desktop shows opening rank, Mobile shows details toggle) */}
        <div className="flex items-center gap-2">
          <div className="hidden sm:flex items-center gap-2 font-mono text-white/40 text-[9px] sm:text-[10px]">
            <span>Op: <strong className="text-white/80 font-normal">{fmt(rec.openingRank)}</strong></span>
          </div>
          
          <button
            type="button"
            onClick={() => setExpanded(!expanded)}
            className="text-[9px] sm:hidden text-violet-400 hover:text-violet-300 font-medium transition py-0.5 px-1.5 rounded bg-violet-500/5 border border-violet-500/10"
          >
            {expanded ? "Hide Details" : "Show Details"}
          </button>
        </div>
      </div>

      {/* Collapsible details on mobile viewports */}
      {expanded && (
        <div className="mt-2 p-2 rounded bg-black/40 border border-white/5 text-[10px] font-mono text-white/50 space-y-1 sm:hidden">
          <div>Opening Rank: <strong className="text-white">{fmt(rec.openingRank)}</strong></div>
          <div>Seat Type: <strong className="text-white">{rec.seatType}</strong></div>
          <div>Gender: <strong className="text-white">{rec.gender}</strong></div>
          <div>Quota: <strong className="text-white">{rec.quota}</strong></div>
        </div>
      )}
    </div>
  )
}

function Results({ result, query }) {
  const resultsRef = useRef(null)
  const [hsExpanded, setHsExpanded] = useState(false)

  useEffect(() => {
    if (result && resultsRef.current) {
      resultsRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }, [result])

  if (!result) return null

  const { 
    bestMatches = [], 
    goodOptions = [], 
    exploreMore = [], 
    homeStateNitOpportunities = [], 
    totalEligible = 0,
    totalEligibleColleges = 0 
  } = result

  const prefText = query.preferredBranches && query.preferredBranches.length > 0 
    ? query.preferredBranches.join(', ') 
    : 'None Selected'

  const firstNitName = homeStateNitOpportunities.length > 0 
    ? abbreviateInstituteName(homeStateNitOpportunities[0].institute) 
    : `NIT ${query.state}`

  return (
    <section ref={resultsRef} id="results" className="relative py-6 md:py-10">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-5xl">
          {/* Compact Results Summary Bar */}
          <div className="mb-6 p-4 rounded-xl border border-white/10 bg-white/[0.02] backdrop-blur-xl">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 text-xs">
              <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
                <div>
                  <span className="text-white/40">Rank:</span> <strong className="text-white font-mono">{Number(query.rank).toLocaleString()}</strong>
                </div>
                <div className="text-white/20 hidden md:block">|</div>
                <div>
                  <span className="text-white/40">Category:</span> <strong className="text-white">{query.category}</strong>
                </div>
                <div className="text-white/20 hidden md:block">|</div>
                <div>
                  <span className="text-white/40">Gender:</span> <strong className="text-white">{query.gender === 'Female-only (including Supernumerary)' ? 'Female' : 'Gender-Neutral'}</strong>
                </div>
                <div className="text-white/20 hidden md:block">|</div>
                <div>
                  <span className="text-white/40">Home State:</span> <strong className="text-white">{query.state}</strong>
                </div>
                {prefText !== 'None Selected' && (
                  <>
                    <div className="text-white/20 hidden md:block">|</div>
                    <div className="truncate max-w-[150px] sm:max-w-none">
                      <span className="text-white/45">Branches:</span> <strong className="text-violet-300" title={prefText}>{prefText}</strong>
                    </div>
                  </>
                )}
              </div>
              <div className="shrink-0 font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2.5 py-1 rounded text-center md:text-right">
                Eligible Colleges: {totalEligibleColleges.toLocaleString()} ({totalEligible.toLocaleString()} seats)
              </div>
            </div>

            {result.diagnostics && result.diagnostics.eligibleOldLogicCount !== undefined && (
              <div className="mt-2.5 pt-2 border-t border-white/5 text-[11px] text-violet-300 flex items-center gap-1.5">
                <span>⚡ <strong>Predictor comparison</strong>: Found <strong>{result.diagnostics.eligibleNewLogicCount?.toLocaleString()}</strong> matches using standard logic (<code className="text-white">Rank &le; Closing</code>) vs <strong>{result.diagnostics.eligibleOldLogicCount?.toLocaleString()}</strong> matches under old restrictive logic (<code className="text-white">Opening &le; Rank &le; Closing</code>).</span>
              </div>
            )}
          </div>

          {totalEligible === 0 ? (
            <Card className="border-white/10 bg-white/[0.02]">
              <CardContent className="p-8 text-center">
                <div className="text-base font-medium">No eligible seats found.</div>
                <p className="mt-1 text-sm text-muted-foreground">
                  Your rank is higher than every closing rank for the selected Seat Type
                  &amp; Gender. Try a different category or check rounds with more openings.
                </p>
              </CardContent>
            </Card>
          ) : (
            <>
              {/* Feature 1: Home State NIT Opportunities - Collapsible Premium Card */}
              <div className="mb-6">
                {homeStateNitOpportunities.length === 0 ? (
                  <div className="rounded-xl border border-white/10 bg-white/[0.01] p-4 flex items-center justify-between text-xs text-muted-foreground">
                    <div className="flex flex-col">
                      <span className="text-sm font-semibold text-white/60 flex items-center gap-1.5">
                        🏠 Your Home State Advantage
                      </span>
                      <span className="text-[11px] text-muted-foreground mt-0.5">
                        NIT {query.state} · 0 Eligible Programs
                      </span>
                    </div>
                    <span className="text-[10px] text-white/30 uppercase tracking-widest font-mono">No Options</span>
                  </div>
                ) : (
                  <div className="rounded-xl border border-violet-500/20 bg-gradient-to-r from-violet-500/[0.08] via-white/[0.02] to-transparent overflow-hidden">
                    <button
                      type="button"
                      onClick={() => setHsExpanded(!hsExpanded)}
                      className="w-full flex items-center justify-between p-4 text-left transition hover:bg-white/[0.02]"
                    >
                      <div className="flex flex-col">
                        <span className="text-sm sm:text-base font-bold text-white flex items-center gap-1.5">
                          🏠 Your Home State Advantage
                        </span>
                        <span className="text-xs text-violet-300 font-semibold mt-0.5">
                          {firstNitName} · {homeStateNitOpportunities.length} Eligible Program{homeStateNitOpportunities.length > 1 ? 's' : ''}
                        </span>
                      </div>
                      <div className="flex items-center gap-1 text-xs text-violet-300 font-semibold bg-violet-500/10 border border-violet-500/20 px-3 py-1 rounded-full transition hover:bg-violet-500/20">
                        <span>{hsExpanded ? "▲ Collapse" : "▼ Expand"}</span>
                      </div>
                    </button>
                    {hsExpanded && (
                      <div className="p-3 sm:p-4 border-t border-white/5 bg-black/20">
                        <div className="grid grid-cols-1 gap-2.5 md:grid-cols-2">
                          {homeStateNitOpportunities.map((rec, i) => (
                            <ResultCard key={`hs-nit-${i}`} rec={rec} index={i} highlight />
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Bucket 1: Best Matches */}
              <div className="mb-6">
                <div className="mb-2.5 flex items-center justify-between border-b border-white/5 pb-2">
                  <div className="flex items-center gap-2">
                    <span className="text-lg">🏆</span>
                    <h3 className="text-sm sm:text-base font-bold text-white tracking-tight">Best Matches</h3>
                    <span className="text-[10px] sm:text-xs text-white/40 font-normal">
                      · Top {bestMatches.length} recommended choices
                    </span>
                  </div>
                  <span className="px-2 py-0.5 rounded bg-violet-500/10 border border-violet-500/20 text-violet-300 text-[10px] font-semibold font-mono uppercase tracking-wider">Top Tier</span>
                </div>
                {bestMatches.length === 0 ? (
                  <p className="text-xs text-white/40 italic py-1">No matches in this bucket.</p>
                ) : (
                  <div className="grid grid-cols-1 gap-2.5 md:grid-cols-2">
                    {bestMatches.map((rec, i) => (
                      <ResultCard key={`best-${i}`} rec={rec} index={i} highlight />
                    ))}
                  </div>
                )}
              </div>

              {/* Bucket 2: Good Options */}
              <div className="mb-6">
                <div className="mb-2.5 flex items-center justify-between border-b border-white/5 pb-2">
                  <div className="flex items-center gap-2">
                    <span className="text-lg">🎯</span>
                    <h3 className="text-sm sm:text-base font-bold text-white tracking-tight">Good Options</h3>
                    <span className="text-[10px] sm:text-xs text-white/40 font-normal">
                      · Next {goodOptions.length} suitable choices
                    </span>
                  </div>
                  <span className="px-2 py-0.5 rounded bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-[10px] font-semibold font-mono uppercase tracking-wider">Suitable</span>
                </div>
                {goodOptions.length === 0 ? (
                  <p className="text-xs text-white/40 italic py-1">No matches in this bucket.</p>
                ) : (
                  <div className="grid grid-cols-1 gap-2.5">
                    {goodOptions.map((rec, i) => (
                      <ResultCard key={`good-${i}`} rec={rec} index={i + 10} />
                    ))}
                  </div>
                )}
              </div>

              {/* Bucket 3: Explore More */}
              <div className="mb-6">
                <div className="mb-2.5 flex items-center justify-between border-b border-white/5 pb-2">
                  <div className="flex items-center gap-2">
                    <span className="text-lg">🔍</span>
                    <h3 className="text-sm sm:text-base font-bold text-white tracking-tight">Explore More</h3>
                    <span className="text-[10px] sm:text-xs text-white/40 font-normal">
                      · {exploreMore.length} additional opportunities
                    </span>
                  </div>
                  <span className="px-2 py-0.5 rounded bg-fuchsia-500/10 border border-fuchsia-500/20 text-fuchsia-300 text-[10px] font-semibold font-mono uppercase tracking-wider">Explore</span>
                </div>
                {exploreMore.length === 0 ? (
                  <p className="text-xs text-white/40 italic py-1">No matches in this bucket.</p>
                ) : (
                  <div className="grid grid-cols-1 gap-2.5">
                    {exploreMore.map((rec, i) => (
                      <ResultCard key={`explore-${i}`} rec={rec} index={i + 30} />
                    ))}
                  </div>
                )}
              </div>

              {/* Technical Details / Collapsible Diagnostics Accordion */}
              {result.diagnostics && (
                <details className="mt-8 border border-white/5 bg-white/[0.01] rounded-xl overflow-hidden group">
                  <summary className="p-3 text-xs text-white/40 cursor-pointer hover:text-white/70 transition font-medium flex items-center justify-between select-none">
                    <span>🛠️ Technical Details & Diagnostics</span>
                    <ChevronDown className="h-4 w-4 transition group-open:rotate-180" />
                  </summary>
                  <div className="p-4 border-t border-white/5 bg-black/40 grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                    <div className="rounded-xl border border-white/5 bg-white/[0.02] p-2.5">
                      <div className="text-white/40 font-medium">Loaded Records</div>
                      <div className="mt-0.5 text-sm sm:text-base font-semibold text-white font-mono">{result.diagnostics.totalRecordsLoaded.toLocaleString()}</div>
                    </div>
                    <div className="rounded-xl border border-white/5 bg-white/[0.02] p-2.5">
                      <div className="text-white/40 font-medium">Eligible Options</div>
                      <div className="mt-0.5 text-sm sm:text-base font-semibold text-white font-mono">{result.diagnostics.totalEligibleBeforeSorting.toLocaleString()}</div>
                    </div>
                    <div className="rounded-xl border border-white/5 bg-white/[0.02] p-2.5">
                      <div className="text-white/40 font-medium">Eligible NITs</div>
                      <div className="mt-0.5 text-sm sm:text-base font-semibold text-violet-300 font-mono">{result.diagnostics.eligibleNitCount.toLocaleString()}</div>
                    </div>
                    <div className="rounded-xl border border-white/5 bg-white/[0.02] p-2.5">
                      <div className="text-white/40 font-medium">Eligible IIITs</div>
                      <div className="mt-0.5 text-sm sm:text-base font-semibold text-indigo-300 font-mono">{result.diagnostics.eligibleIiitCount.toLocaleString()}</div>
                    </div>
                    <div className="rounded-xl border border-white/5 bg-white/[0.02] p-2.5">
                      <div className="text-white/40 font-medium">Eligible GFTIs</div>
                      <div className="mt-0.5 text-sm sm:text-base font-semibold text-fuchsia-300 font-mono">{result.diagnostics.eligibleGftiCount.toLocaleString()}</div>
                    </div>
                    <div className="rounded-xl border border-white/5 bg-white/[0.02] p-2.5">
                      <div className="text-white/40 font-medium">Eligible Others</div>
                      <div className="mt-0.5 text-sm sm:text-base font-semibold text-emerald-300 font-mono">{result.diagnostics.eligibleOtherCount.toLocaleString()}</div>
                    </div>
                    <div className="rounded-xl border border-white/5 bg-white/[0.02] p-2.5">
                      <div className="text-white/40 font-medium">Eligible HS Seats</div>
                      <div className="mt-0.5 text-sm sm:text-base font-semibold text-rose-300 font-mono">{result.diagnostics.hsEligibleCount.toLocaleString()}</div>
                    </div>
                    <div className="rounded-xl border border-white/5 bg-white/[0.02] p-2.5">
                      <div className="text-white/40 font-medium">Eligible OS Seats</div>
                      <div className="mt-0.5 text-sm sm:text-base font-semibold text-sky-300 font-mono">{result.diagnostics.osEligibleCount.toLocaleString()}</div>
                    </div>
                  </div>
                </details>
              )}

              {totalEligible > 50 && (
                <p className="mt-6 text-center text-xs text-muted-foreground">
                  Showing the first 50 of {totalEligible.toLocaleString()} eligible records, prioritizing your preferred branches.
                </p>
              )}
            </>
          )}
        </div>
      </div>
    </section>
  )
}

function PredictForm({ onResult, hasResult, query }) {
  const [rank, setRank] = useState('')
  const [category, setCategory] = useState('')
  const [gender, setGender] = useState('')
  const [state, setState] = useState('')
  const [preferredBranches, setPreferredBranches] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const onSubmit = async (e) => {
    if (e && e.preventDefault) {
      e.preventDefault()
    }
    setError('')
    setLoading(true)
    try {
      const res = await fetch('/api/predict', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          rank: Number(rank),
          category,
          gender,
          state,
          preferredBranches,
        }),
      })
      const json = await res.json()
      if (!res.ok) {
        setError(json.error || 'Failed to predict')
        onResult(null, null)
      } else {
        onResult(json, { rank, category, gender, state, preferredBranches })
      }
    } catch (err) {
      setError(err.message || 'Network error')
      onResult(null, null)
    } finally {
      setLoading(false)
    }
  }

  const ready = rank && category && gender && state

  const isDirty = query && (
    Number(query.rank) !== Number(rank) ||
    query.category !== category ||
    query.gender !== gender ||
    query.state !== state ||
    JSON.stringify(query.preferredBranches) !== JSON.stringify(preferredBranches)
  )

  const showSticky = !hasResult || isDirty

  return (
    <section id="predict" className="relative py-6 md:py-10">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-3xl">
          <div className="mb-4 text-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-2.5 py-0.5 text-[10px] md:text-xs text-muted-foreground">
              <Target className="h-3 w-3 text-violet-400" />
              College Predictor
            </div>
            <h2 className="mt-2 text-xl md:text-3xl font-semibold tracking-tight">
              Enter your details
            </h2>
            <p className="mt-1 text-xs md:text-sm text-muted-foreground">
              We match your rank against official CSAB opening &amp; closing ranks.
            </p>
          </div>

          <Card className="relative overflow-hidden border-white/10 bg-gradient-to-b from-white/[0.04] to-white/[0.01] backdrop-blur-xl">
            <div className="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-inset ring-white/5" />
            <div className="pointer-events-none absolute -top-24 left-1/2 h-48 w-[80%] -translate-x-1/2 rounded-full bg-violet-500/20 blur-3xl" />

            <CardContent className="relative p-5 md:p-8">
              <form onSubmit={onSubmit} className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div className="md:col-span-2">
                  <Label htmlFor="rank" className="mb-1.5 block text-xs uppercase tracking-wider text-muted-foreground">
                    CRL / Category Rank
                  </Label>
                  <Input
                    id="rank"
                    inputMode="numeric"
                    pattern="[0-9]*"
                    placeholder="e.g. 24500"
                    value={rank}
                    onChange={(e) => setRank(e.target.value.replace(/[^0-9]/g, ''))}
                    className="h-11 rounded-xl border-white/10 bg-black/30 px-4 text-sm sm:text-base placeholder:text-muted-foreground/60 focus-visible:ring-violet-500/40"
                  />
                </div>

                <div>
                  <Label className="mb-1.5 block text-xs uppercase tracking-wider text-muted-foreground">
                    Category
                  </Label>
                  <Select value={category} onValueChange={setCategory}>
                    <SelectTrigger className="h-11 rounded-xl border-white/10 bg-black/30 text-sm sm:text-base">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent className="max-h-72">
                      {CATEGORIES.map((c) => (
                        <SelectItem key={c.value} value={c.value}>{c.label}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label className="mb-1.5 block text-xs uppercase tracking-wider text-muted-foreground">
                    Gender
                  </Label>
                  <Select value={gender} onValueChange={setGender}>
                    <SelectTrigger className="h-11 rounded-xl border-white/10 bg-black/30 text-sm sm:text-base">
                      <SelectValue placeholder="Select gender pool" />
                    </SelectTrigger>
                    <SelectContent>
                      {GENDERS.map((g) => (
                        <SelectItem key={g.value} value={g.value}>{g.label}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="md:col-span-2">
                  <Label className="mb-1.5 block text-xs uppercase tracking-wider text-muted-foreground">
                    Home State
                  </Label>
                  <Select value={state} onValueChange={setState}>
                    <SelectTrigger className="h-11 rounded-xl border-white/10 bg-black/30 text-sm sm:text-base">
                      <SelectValue placeholder="Select your home state" />
                    </SelectTrigger>
                    <SelectContent className="max-h-72">
                      {STATES.map((s) => (
                        <SelectItem key={s} value={s}>{s}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="md:col-span-2">
                  <Label className="mb-1.5 block text-xs uppercase tracking-wider text-muted-foreground">
                    Preferred Branches (Optional)
                  </Label>
                  <div className="flex flex-wrap gap-1.5 mt-1">
                    {['CSE', 'AI', 'IT', 'ECE', 'EE', 'Mechanical', 'Civil', 'Chemical', 'Biotechnology', 'Other'].map((branch) => {
                      const isSel = preferredBranches.includes(branch);
                      return (
                        <button
                          key={branch}
                          type="button"
                          onClick={() => {
                            if (isSel) {
                              setPreferredBranches(preferredBranches.filter(b => b !== branch));
                            } else {
                              setPreferredBranches([...preferredBranches, branch]);
                            }
                          }}
                          className={`px-2.5 py-1 rounded-full text-xs font-medium border transition ${
                            isSel
                              ? 'bg-violet-600 border-violet-500 text-white shadow-lg shadow-violet-500/20'
                              : 'bg-black/40 border-white/5 text-white/60 hover:border-white/20 hover:text-white'
                          }`}
                        >
                          {branch}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="md:col-span-2 mt-2">
                  <Button
                    type="submit"
                    disabled={!ready || loading}
                    className="group h-11 w-full rounded-xl bg-gradient-to-r from-indigo-500 via-violet-500 to-fuchsia-500 text-base font-medium text-white shadow-lg shadow-violet-600/30 transition hover:opacity-95 disabled:opacity-50"
                  >
                    {loading ? (
                      <span className="inline-flex items-center gap-2">
                        <span className="h-2 w-2 animate-pulse rounded-full bg-white" />
                        Analyzing…
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-2">
                        Predict Colleges
                        <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
                      </span>
                    )}
                  </Button>
                  {error && (
                    <p className="mt-2 text-center text-xs text-red-300">{error}</p>
                  )}
                  <p className="mt-2 text-center text-xs text-muted-foreground">
                    Matched against 1,400+ official CSAB cutoff records.
                  </p>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Sticky Mobile Predict Button */}
      {showSticky && (
        <div className="fixed bottom-0 left-0 right-0 z-40 bg-background/85 backdrop-blur-md border-t border-white/10 p-3 md:hidden">
          <Button
            type="button"
            onClick={onSubmit}
            disabled={!ready || loading}
            className="group h-11 w-full rounded-xl bg-gradient-to-r from-indigo-500 via-violet-500 to-fuchsia-500 text-sm font-medium text-white shadow-lg shadow-violet-600/30 transition hover:opacity-95 disabled:opacity-50"
          >
            {loading ? (
              <span className="inline-flex items-center gap-2 justify-center w-full">
                <span className="h-2 w-2 animate-pulse rounded-full bg-white" />
                Analyzing…
              </span>
            ) : (
              <span className="inline-flex items-center gap-1.5 justify-center w-full">
                Predict Colleges
                <ArrowRight className="h-4 w-4" />
              </span>
            )}
          </Button>
        </div>
      )}
    </section>
  )
}

function Features() {
  const items = [
    {
      icon: TrendingUp,
      title: 'Historical cutoff data',
      desc: 'Every match is grounded in official CSAB opening & closing ranks — no guesswork.',
    },
    {
      icon: Target,
      title: 'Smallest-gap matching',
      desc: 'Results are ranked by how tightly your rank fits the closing rank.',
    },
    {
      icon: ShieldCheck,
      title: 'No fluff. No AI noise.',
      desc: 'Pure deterministic filtering — same query gives same results, every time.',
    },
  ]
  return (
    <section id="features" className="py-6 md:py-10">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-2xl md:text-3xl font-semibold tracking-tight">
            Built for the special round.
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Stop guessing your CSAB choices. Start optimising them.
          </p>
        </div>
        <div className="mx-auto mt-10 grid max-w-5xl grid-cols-1 gap-4 md:grid-cols-3">
          {items.map(({ icon: Icon, title, desc }) => (
            <Card key={title} className="group relative overflow-hidden border-white/10 bg-white/[0.02] transition hover:bg-white/[0.04]">
              <CardContent className="p-6">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-indigo-500/20 to-fuchsia-500/20 ring-1 ring-white/10">
                  <Icon className="h-5 w-5 text-violet-300" />
                </div>
                <h3 className="mt-4 text-base font-medium">{title}</h3>
                <p className="mt-1.5 text-sm text-muted-foreground">{desc}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

function HowItWorks() {
  const steps = [
    { n: '01', t: 'Enter your details', d: 'CRL/category rank, category, gender, home state.' },
    { n: '02', t: 'We filter & sort', d: 'Closing Rank ≥ your rank, then ascending by (Closing − Your rank).' },
    { n: '03', t: 'Get your shortlist', d: 'Top 5 Best Matches + up to 40 eligible records.' },
  ]
  return (
    <section id="how" className="py-6 md:py-10">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-2xl md:text-3xl font-semibold tracking-tight">
            How SahiSeat works
          </h2>
        </div>
        <div className="mx-auto mt-10 grid max-w-5xl grid-cols-1 gap-4 md:grid-cols-3">
          {steps.map((s) => (
            <div key={s.n} className="relative rounded-2xl border border-white/10 bg-gradient-to-b from-white/[0.04] to-transparent p-6">
              <div className="text-xs font-medium tracking-widest text-violet-300">{s.n}</div>
              <div className="mt-2 text-lg font-medium">{s.t}</div>
              <p className="mt-1.5 text-sm text-muted-foreground">{s.d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer id="faq" className="border-t border-white/5 py-10">
      <div className="container mx-auto flex flex-col items-center justify-between gap-4 px-4 md:flex-row">
        <div className="flex items-center gap-2">
          <div className="flex h-7 w-7 items-center justify-center rounded-md bg-gradient-to-br from-indigo-500 via-violet-500 to-fuchsia-500">
            <GraduationCap className="h-3.5 w-3.5 text-white" />
          </div>
          <span className="text-sm font-medium">
            Sahi<span className="text-violet-400">Seat</span>
          </span>
        </div>
        <p className="text-xs text-muted-foreground">
          © {new Date().getFullYear()} SahiSeat. Not affiliated with NTA, JoSAA or CSAB.
        </p>
      </div>
    </footer>
  )
}

const App = () => {
  const [result, setResult] = useState(null)
  const [query, setQuery] = useState(null)

  const onResult = (r, q) => {
    setResult(r)
    setQuery(q)
  }

  const onReset = () => {
    setResult(null)
    setQuery(null)
    const element = document.getElementById("predict")
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <main className="relative min-h-screen bg-background text-foreground pb-20 md:pb-0">
      <Nav hasResult={!!result} onReset={onReset} />
      <Hero />
      <PredictForm onResult={onResult} hasResult={!!result} query={query} />
      {result && query && <Results result={result} query={query} />}
      <Features />
      <HowItWorks />
      <Footer />
    </main>
  )
}

export default App
