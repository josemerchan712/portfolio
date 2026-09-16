---
target: full portfolio SPA (Hero/About/Projects/Contact/Footer)
total_score: 25
max_score: 36
na_heuristics: 10
p0_count: 2
p1_count: 2
target_identity: "file:C:\\Users\\X420\\OneDrive\\Escritorio\\portfolio\\full portfolio SPA (Hero\\About\\Projects\\Contact\\Footer)"
timestamp: 2026-09-16T23-03-05Z
slug: io-spa-hero-about-projects-contact-footer-8ca5d989
---
# Critique — Portfolio full SPA

Method: dual-agent (A: design review · B: detector/browser evidence)

## Design Health Score

| # | Heuristic | Score | Key Issue |
|---|-----------|-------|-----------|
| 1 | Visibility of System Status | 3/4 | No :active feedback anywhere in the CSS |
| 2 | Match System / Real World | 3/4 | Plain bilingual copy, standard icons |
| 3 | User Control and Freedom | 2/4 | Mobile nav removed with no replacement |
| 4 | Consistency and Standards | 3/4 | --text-muted vs --cream-muted used interchangeably |
| 5 | Error Prevention | 4/4 | No forms, no destructive actions |
| 6 | Recognition Rather Than Recall | 3/4 | Icons labeled, nav visible on desktop |
| 7 | Flexibility and Efficiency | 2/4 | Language persists, but mobile nav accelerator removed |
| 8 | Aesthetic and Minimalist Design | 2/4 | Minimal palette but informationally busy cards |
| 9 | Error Recovery | 3/4 | Mostly n/a |
| 10 | Help and Documentation | n/a | Not applicable to one-page portfolio |
| Total | | 25/36 | Acceptable, bordering Good (69%) |

## Design Specificity Verdict
Template, not a design — dark navy/gold consultant-template aesthetic with no code/engineering visual motif. The one real evidence point (TDD metric) is styled identically to decorative skill tags. Deterministic scan (impeccable detect) returned 0 findings but Assessment B proved the JSX/CSS regex engine misses even blatant synthetic anti-patterns, so this is a tooling coverage gap, not a clean bill of health. No browser automation tool was available this session, so visual overlays/screenshots could not run — both assessments worked from full static code reads instead.

## Priority Issues
- [P0] Metadata bar has zero internal hierarchy, defeating the 10-second goal (all 5 meta-chips identical weight)
- [P0] No resting-state depth anywhere — all elevation is hover-only, invisible on touch (zero box-shadow in codebase)
- [P1] Mobile nav loses all section links with no replacement (display:none, no hamburger)
- [P1] Type scale collapses to one 11.5-16.8px band below the hero, right where content gets dense (Projects)
- [P2] --navy-soft token defined and never used — an abandoned 3-tier depth system
- [P3] Inconsistent --text-muted vs --cream-muted usage for the same semantic role

## Persona Red Flags
Jordan (skimming recruiter): must read 5 identical meta-chips serially; demo vs non-demo project cards look structurally identical; mobile nav can't reach Projects/Contact.
Casey (distracted mobile user): all "alive" signals are hover-gated and never fire on touch; no :active state anywhere means taps give zero feedback.

## Minor Observations
Nav's frosted-glass treatment is the only real depth cue in the whole design — reuse that recipe elsewhere. impeccable detect has a confirmed blind spot on JSX/CSS (regex-only mode) — a clean result here should not be read as "no issues."

## Questions to Consider
- Why is depth spent on hover-only desktop interactions when the audience is majority-mobile?
- Should the whole system reorganize around "proof vs decoration" instead of "navy vs gold"?
- Is finishing the already-planned 3-tier navy system a smaller fix than a from-scratch depth redesign?
