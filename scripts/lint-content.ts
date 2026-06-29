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
 * Rationale: em/en dashes are the clearest tell that text was machine-written —
 * they aren't an easy keyboard motion, so humans rarely type them. We treat
 * them (and non-breaking spaces, another paste/AI artifact) as hard errors, and
 * flag a curated set of AI-cliche phrases as warnings for a human to judge.
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

// --- Files to scan -----------------------------------------------------------
// All markdown under content/, plus the prose-bearing data files.
const DATA_FILES = ['data/episodes.ts', 'data/hosts.ts', 'data/blog.ts']

function walk(dir: string, out: string[] = []): string[] {
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry)
    if (statSync(full).isDirectory()) walk(full, out)
    else if (full.endsWith('.md')) out.push(full)
  }
  return out
}

// --- Rules -------------------------------------------------------------------
// ERROR rules: single-character checks applied to every line.
const CHAR_RULES: { rule: string; re: RegExp; message: string }[] = [
  { rule: 'no-em-dash', re: /—/, message: 'Em dash (—) reads as machine-written; use a comma, colon, parentheses, or two sentences.' },
  { rule: 'no-en-dash', re: /–/, message: 'En dash (–); use a hyphen for ranges (1 to 5) or rewrite.' },
  { rule: 'no-nbsp', re: / /, message: 'Non-breaking space (U+00A0), usually a paste artifact; use a normal space.' },
  { rule: 'no-horizontal-ellipsis', re: /…/, message: 'Unicode ellipsis (…); use three periods (...).' },
]

// WARN rules: AI-cliche phrases. High-signal, deliberately short to limit noise.
// These do not fail the build — they prompt a human to reword.
const PHRASE_RULES: { rule: string; re: RegExp; message: string }[] = [
  { rule: 'ai-cliche', re: /\b(delve|delving) into\b/i, message: '"delve into" is a strong AI tell.' },
  { rule: 'ai-cliche', re: /\btapestry\b/i, message: '"tapestry" is a strong AI tell.' },
  { rule: 'ai-cliche', re: /\bit'?s worth noting\b/i, message: '"it\'s worth noting" is filler / an AI tell.' },
  { rule: 'ai-cliche', re: /\bin today'?s (fast-paced|ever-evolving|digital) /i, message: 'Opening cliche; cut or rewrite.' },
  { rule: 'ai-cliche', re: /\bever-evolving\b/i, message: '"ever-evolving" is an AI tell.' },
  { rule: 'ai-cliche', re: /\ba testament to\b/i, message: '"a testament to" is an AI tell.' },
  { rule: 'ai-cliche', re: /\b(navigating|navigate) the (complex|ever|landscape|world of)\b/i, message: '"navigating the…" is an AI tell.' },
  { rule: 'ai-cliche', re: /\bunderscore(s|d)?\b/i, message: '"underscore" (as a verb) is an AI tell; try "shows" / "highlights".' },
  { rule: 'ai-cliche', re: /\bseamless(ly)?\b/i, message: '"seamless(ly)" is an overused AI adjective.' },
  { rule: 'ai-cliche', re: /\bin the realm of\b/i, message: '"in the realm of" is an AI tell.' },
]

// Skip fenced code blocks in markdown (``` … ```) — code legitimately differs.
function isFence(line: string): boolean {
  return /^\s*```/.test(line)
}

function lintFile(file: string): Finding[] {
  const findings: Finding[] = []
  const lines = readFileSync(file, 'utf8').split('\n')
  const isMd = file.endsWith('.md')
  let inFence = false

  lines.forEach((raw, i) => {
    if (isMd && isFence(raw)) { inFence = !inFence; return }
    if (inFence) return

    for (const { rule, re, message } of CHAR_RULES) {
      const m = re.exec(raw)
      if (m) findings.push(mk(file, i, m.index, 'error', rule, message, raw))
    }
    for (const { rule, re, message } of PHRASE_RULES) {
      const m = re.exec(raw)
      if (m) findings.push(mk(file, i, m.index, 'warn', rule, message, raw))
    }
  })
  return findings
}

function mk(file: string, lineIdx: number, col: number, level: 'error' | 'warn', rule: string, message: string, raw: string): Finding {
  const start = Math.max(0, col - 30)
  const snippet = (start > 0 ? '…' : '') + raw.slice(start, col + 30).trim()
  return { file, line: lineIdx + 1, col: col + 1, level, rule, message, snippet }
}

// --- Run ---------------------------------------------------------------------
const targets = [...walk('content'), ...DATA_FILES]
const findings = targets.flatMap(lintFile)

const errors = findings.filter((f) => f.level === 'error')
const warns = findings.filter((f) => f.level === 'warn')

const RED = '\x1b[31m'; const YEL = '\x1b[33m'; const DIM = '\x1b[2m'; const RST = '\x1b[0m'

for (const f of findings) {
  const tag = f.level === 'error' ? `${RED}error${RST}` : `${YEL}warn ${RST}`
  console.log(`${tag} ${f.file}:${f.line}:${f.col}  ${DIM}${f.rule}${RST}  ${f.message}`)
  console.log(`      ${DIM}${f.snippet}${RST}`)
}

console.log('')
console.log(`Scanned ${targets.length} files — ${errors.length} error(s), ${warns.length} warning(s).`)

if (errors.length > 0) {
  console.log(`${RED}✗ Content lint failed.${RST}`)
  process.exit(1)
} else {
  console.log('✓ Content lint passed (no errors).')
}
