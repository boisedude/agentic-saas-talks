/**
 * Content linter — catches "written-by-AI" tells and typographic noise in the
 * site's prose (markdown blog posts + the human-readable strings in data files).
 *
 * ESLint only covers our JS/TS source; it does not see the markdown in
 * `content/` or treat string literals as prose. This script fills that gap.
 *
 * Run: `npm run lint:content`  (also chained into `npm run lint`)
 * Exit code 1 if any ERROR-level findings exist; WARN findings never fail.
 *
 * Design (from research on AI-writing tells, 2024-2026):
 *   - Structural/rhetorical tells (contrastive negation, significance formulas,
 *     generation leaks) are durable and low false-positive -> ERROR.
 *   - Single "AI words" (delve, tapestry, meticulous) are high-signal but decay
 *     as labs train them out -> ERROR, but review hit-rates periodically.
 *   - SaaS-native vocabulary (leverage, robust, seamless, unlock, empower) is
 *     legitimately common in real marketing copy -> never per-instance; only
 *     flagged by DENSITY (too many in one piece) as WARN.
 *   - Typography that betrays paste/LLM output (em/en dash, NBSP, emoji bullets)
 *     -> ERROR.
 */
import { readdirSync, readFileSync, statSync } from 'fs'
import { join } from 'path'

interface Finding {
  file: string
  line: number
  col: number
  level: 'error' | 'warn'
  rule: string
  message: string
  snippet: string
}

const DATA_FILES = ['data/episodes.ts', 'data/hosts.ts', 'data/blog.ts']

function walk(dir: string, out: string[] = []): string[] {
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry)
    if (statSync(full).isDirectory()) walk(full, out)
    else if (full.endsWith('.md')) out.push(full)
  }
  return out
}

interface Rule { rule: string; re: RegExp; message: string }

// === ERROR rules: near-certain tells, low false-positive on tech/SaaS copy ====
const ERROR_RULES: Rule[] = [
  // -- Typography / paste & LLM artifacts --
  { rule: 'no-em-dash', re: /—/, message: 'Em dash (—) reads as machine-written; use a comma, colon, parentheses, or two sentences.' },
  { rule: 'no-en-dash', re: /–/, message: 'En dash (–); use a hyphen for ranges (1 to 5) or rewrite.' },
  { rule: 'no-nbsp', re: / /, message: 'Non-breaking space (U+00A0), usually a paste artifact; use a normal space.' },
  { rule: 'no-ellipsis-char', re: /…/, message: 'Unicode ellipsis (…); use three periods (...).' },
  { rule: 'no-emoji-heading', re: /^#{1,6}\s.*\p{Extended_Pictographic}/u, message: 'Emoji in a heading is a slop tell; drop it.' },
  { rule: 'no-emoji-bullet', re: /^[\s>]*[*\-+]\s*\p{Extended_Pictographic}/u, message: 'Emoji-led bullet is a slop tell; drop it.' },
  { rule: 'no-glyph-bullet', re: /^[\s>]*[*\-+]?\s*[✅✔→➜▶✨🚀🔍📊]/u, message: 'Decorative glyph bullet (✅/→/🚀…) is a markdown-export tell.' },

  // -- Generation / chatbot leaks (if present, near-certain) --
  { rule: 'no-generation-leak', re: /\b(as an ai\b|as of my last (update|knowledge)|i hope this helps|i cannot fulfill|certainly! here)/i, message: 'Chatbot generation leak; remove.' },
  { rule: 'no-generation-leak', re: /(utm_source=chatgpt|oaicite|citeturn|contentReference|\[your name\]|\[insert [^\]]+\])/i, message: 'Generation artifact / unfilled placeholder; remove.' },

  // -- Structural: the durable, high-signal rhetorical tells --
  { rule: 'no-contrastive-negation', re: /\bit'?s not (just |merely |only )?[^.?!]{1,60}?,\s*it'?s\b/i, message: 'Contrastive negation ("it\'s not just X, it\'s Y") is the strongest AI-writing tell; rewrite as a direct claim.' },
  { rule: 'no-contrastive-negation', re: /\bisn'?t (just |merely )?about [^.?!]{1,60}?,\s*it'?s about\b/i, message: 'Contrastive negation ("isn\'t about X, it\'s about Y"); rewrite as a direct claim.' },
  { rule: 'no-significance-formula', re: /\b(stands?|serves?) as a testament\b|\bis a testament to\b/i, message: 'Significance-inflation formula ("a testament to"); state the point plainly.' },
  { rule: 'no-plays-a-role', re: /\bplays? a (crucial|vital|pivotal|key|significant|central) role\b/i, message: '"plays a [crucial] role" is an AI filler formula; name the actual effect.' },
  { rule: 'no-hedging-opener', re: /\bin today'?s [\w-]*\s*(world|landscape|era|economy|market|environment|age|climate)\b/i, message: 'Empty scene-setting opener ("in today\'s [fast-paced] world…"); cut it.' },
  { rule: 'no-hedging-opener', re: /\bin (an era|a world) (where|of)\b/i, message: 'Dramatic scene-setting opener ("in a world where…"); state the condition directly.' },
  { rule: 'no-hedging-opener', re: /\bin the (ever-evolving|fast-paced|rapidly (changing|evolving)|dynamic) (world|landscape|era|market|environment|space)\b/i, message: 'Empty scene-setting opener ("in the ever-evolving landscape…"); cut it.' },
  { rule: 'no-navigating', re: /\bnavigat(e|es|ing) the (complex|complexit|landscape|world|realm|nuance|intricac)/i, message: '"navigating the [complexities]…" is a signature AI metaphor; rewrite.' },

  // -- Lexical: high-signal AI words rare in real product copy --
  { rule: 'no-delve', re: /\bdelv(e|es|ed|ing)\b/i, message: '"delve" is the canonical AI tell; use "dig into" / "look at".' },
  { rule: 'no-decorative-noun', re: /\b(tapestry|treasure trove|bustling|nestled|symphony)\b/i, message: 'Decorative AI noun; cut or replace with a plain term.' },
  { rule: 'no-meticulous', re: /\bmeticulous(ly)?\b/i, message: '"meticulous(ly)" is a top AI excess adjective; usually deletable.' },
  { rule: 'no-underscore-verb', re: /\bunderscor(e|es|ed|ing)\b/i, message: '"underscore" (as a verb) is an AI tell; try "shows" / "highlights".' },
]

// === WARN rules: judgment calls; never fail the build ========================
const WARN_RULES: Rule[] = [
  { rule: 'ai-cliche', re: /\bit'?s worth noting\b/i, message: '"it\'s worth noting" is filler.' },
  { rule: 'ai-cliche', re: /\bever-evolving\b/i, message: '"ever-evolving" is an AI tell.' },
  { rule: 'ai-cliche', re: /\bin the realm of\b/i, message: '"in the realm of" is an AI tell.' },
  { rule: 'ai-cliche', re: /\bseamless(ly)?\b/i, message: '"seamless(ly)" is an overused AI adjective.' },
  { rule: 'ai-cliche', re: /\bboasts?\b/i, message: '"boasts" is a promotional AI tic; use "has" / "includes".' },
  { rule: 'ai-cliche', re: /\bwhen it comes to\b/i, message: '"when it comes to" is an AI connective; often cuttable.' },
  { rule: 'ai-antithesis', re: /\bnot only\b[^.?!]{0,60}?\bbut( also)?\b/i, message: '"not only… but also" is AI antithesis cadence; consider rewriting.' },
  { rule: 'ai-signpost', re: /(^|\n)\s*>?\s*(moreover|furthermore|additionally|notably|importantly)\b/i, message: 'Sentence-initial signposting (Moreover/Furthermore/…) is an AI tell.' },
  { rule: 'ai-conclusion', re: /(^|\n)\s*#*\s*(in conclusion|in summary|all in all|at the end of the day)\b/i, message: 'Formulaic wrap-up opener; cut or rewrite.' },
  { rule: 'ai-copula-avoid', re: /\b(serves as a|stands as a|represents a)\b/i, message: 'Copula avoidance (serves/stands as a…); plain "is" is usually better.' },
  { rule: 'ai-pseudo-analysis', re: /,\s*(highlighting|underscoring|emphasizing|reflecting|showcasing|ensuring)\b/i, message: 'Trailing "-ing" significance clause is an AI superficial-analysis tell.' },
  { rule: 'ai-vague-attribution', re: /\b(experts|observers|critics|industry reports)\s+(believe|argue|say|suggest|claim)\b/i, message: 'Vague attribution; name the source.' },
  { rule: 'ai-audience-span', re: /\bwhether you'?re (a |an )?[\w\s]{2,30}?\bor\b/i, message: '"whether you\'re X or Y" is an audience-spanning template.' },
]

// === DENSITY clusters: SaaS-native vocab — only WARN when over-concentrated ===
const DENSITY_CLUSTERS: { rule: string; words: string[]; perWords: number; message: string }[] = [
  {
    rule: 'ai-vocab-density',
    words: ['pivotal', 'intricate', 'intricacies', 'interplay', 'vibrant', 'enduring', 'garner', 'bolster', 'showcase', 'crucial', 'robust', 'comprehensive', 'holistic', 'synergy', 'leverage'],
    perWords: 500,
    message: 'High concentration of AI-favored vocabulary (pivotal/robust/leverage/…); vary the wording.',
  },
  {
    rule: 'ai-verb-density',
    words: ['elevate', 'unlock', 'harness', 'unleash', 'empower', 'supercharge'],
    perWords: 500,
    message: 'High concentration of marketing power-verbs (unlock/empower/harness/…); dial it back.',
  },
]

function isFence(line: string): boolean { return /^\s*```/.test(line) }

function mk(file: string, lineIdx: number, col: number, level: 'error' | 'warn', rule: string, message: string, raw: string): Finding {
  const start = Math.max(0, col - 30)
  const snippet = (start > 0 ? '…' : '') + raw.slice(start, col + 40).trim()
  return { file, line: lineIdx + 1, col: col + 1, level, rule, message, snippet }
}

function lintFile(file: string): Finding[] {
  const findings: Finding[] = []
  const text = readFileSync(file, 'utf8')
  const lines = text.split('\n')
  const isMd = file.endsWith('.md')
  let inFence = false

  lines.forEach((raw, i) => {
    if (isMd && isFence(raw)) { inFence = !inFence; return }
    if (inFence) return
    for (const { rule, re, message } of ERROR_RULES) {
      const m = re.exec(raw)
      if (m) findings.push(mk(file, i, m.index, 'error', rule, message, raw))
    }
    for (const { rule, re, message } of WARN_RULES) {
      const m = re.exec(raw)
      if (m) findings.push(mk(file, i, m.index, 'warn', rule, message, raw))
    }
  })

  // Density clusters: count across the whole file, normalize per N words.
  const words = (text.match(/\b[\w'-]+\b/g) || []).length
  for (const c of DENSITY_CLUSTERS) {
    const re = new RegExp(`\\b(${c.words.join('|')})\\b`, 'gi')
    const hits = (text.match(re) || []).length
    if (words > 0 && hits / words * c.perWords >= 3) {
      findings.push({
        file, line: 1, col: 1, level: 'warn', rule: c.rule,
        message: `${c.message} (${hits} hits in ~${words} words).`, snippet: '',
      })
    }
  }
  return findings
}

const RED = '\x1b[31m'; const YEL = '\x1b[33m'; const DIM = '\x1b[2m'; const RST = '\x1b[0m'
const targets = [...walk('content'), ...DATA_FILES]
const findings = targets.flatMap(lintFile)
const errors = findings.filter((f) => f.level === 'error')
const warns = findings.filter((f) => f.level === 'warn')

for (const f of findings) {
  const tag = f.level === 'error' ? `${RED}error${RST}` : `${YEL}warn ${RST}`
  console.log(`${tag} ${f.file}:${f.line}:${f.col}  ${DIM}${f.rule}${RST}  ${f.message}`)
  if (f.snippet) console.log(`      ${DIM}${f.snippet}${RST}`)
}

console.log('')
console.log(`Scanned ${targets.length} files — ${errors.length} error(s), ${warns.length} warning(s).`)
if (errors.length > 0) {
  console.log(`${RED}✗ Content lint failed.${RST}`)
  process.exit(1)
} else {
  console.log('✓ Content lint passed (no errors).')
}
