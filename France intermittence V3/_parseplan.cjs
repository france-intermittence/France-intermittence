const fs = require('fs')
const p = 'C:/Users/DESOUS~1/AppData/Local/Temp/claude/C--Users-De-Sousa-Desktop-France-intermittence-V2/ea92c2f1-17f7-482f-8b8d-0bbcb84d6ace/tasks/wdbndhuau.output'
let s = fs.readFileSync(p, 'utf8')
const i = s.indexOf('{"audits"')
if (i >= 0) s = s.slice(i)
let obj
try { obj = JSON.parse(s) } catch (e) {
  const j = s.lastIndexOf('}')
  for (let k = j; k > 0; k--) { try { obj = JSON.parse(s.slice(0, k + 1)); break } catch (_) {} }
}
if (!obj) { console.log('PARSE_FAIL len=' + s.length); process.exit(1) }
const plan = obj.plan || {}
console.log('=== AUDITS ===')
;(obj.audits || []).forEach(a => console.log('- [' + a.target + '] ' + (a.findings ? a.findings.length : 0) + ' findings: ' + (a.summary || '').slice(0, 150)))
console.log('\n=== PLAN: ' + (plan.fixes ? plan.fixes.length : 0) + ' fixes ===')
;(plan.fixes || []).sort((a, b) => (a.priority || 99) - (b.priority || 99)).forEach(f => {
  console.log('\n#' + f.priority + ' [' + f.severity + '] (' + f.page + ') ' + f.file)
  console.log('  CHANGE: ' + f.change)
  if (f.rationale) console.log('  WHY: ' + f.rationale)
})
console.log('\n=== REJETES (contraintes) ===')
;(plan.rejected_for_constraints || []).forEach(r => console.log('- ' + r))
console.log('\n=== NOTES ===')
;(plan.notes || []).forEach(n => console.log('- ' + n))
