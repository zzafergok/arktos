---
name: deep-research
description: Conduct an evidence-backed investigation for complex, uncertain, or high-impact questions that require multiple sources and careful synthesis. Use when a quick lookup is insufficient; do not trigger for simple factual questions or ordinary codebase inspection.
---

# Deep Research

Investigate a difficult question until the evidence supports a useful conclusion, while keeping uncertainty and source quality visible.

## Scope the Question

Convert the request into a decision-oriented research question. Identify:

- intended audience and decision;
- relevant timeframe, geography, domain, and definitions;
- required depth and acceptable uncertainty;
- exclusions, constraints, and requested deliverable;
- facts likely to have changed and therefore requiring current verification.

If ambiguity would materially change the research, ask one focused question. Otherwise, state the chosen interpretation.

## Research Strategy

1. Start with the user's materials and authoritative primary sources.
2. Build a small set of subquestions that collectively answer the main question.
3. Search using terminology variants and disconfirming queries, not only queries that support the first hypothesis.
4. Prefer standards, official documentation, research papers, filings, datasets, and direct statements over summaries.
5. Use high-quality secondary sources for context, comparison, and independent scrutiny.
6. Trace important claims back to their original evidence when practical.
7. Stop when additional sources repeat established information and remaining uncertainty is explicit.

Parallel investigation is useful only when the subquestions are genuinely independent and the available environment supports it. It is not a requirement.

## Evaluate Evidence

For consequential claims, consider authority, recency, methodology, incentives, sample quality, and whether independent sources agree. Distinguish:

- verified fact;
- source claim;
- inference from multiple facts;
- estimate based on assumptions;
- unresolved or conflicting evidence.

Do not manufacture precision, citations, quotes, consensus, or access to unavailable material. If evidence conflicts, explain the disagreement and which interpretation is better supported.

## Synthesize

Lead with the answer or most decision-relevant finding. Then provide:

- key evidence and reasoning;
- meaningful alternatives or counterevidence;
- limitations and confidence;
- implications or recommended next steps;
- citations located next to the claims they support.

Use tables only when they make comparisons easier to inspect. Keep raw search logs and tangential facts out of the final deliverable unless the user requests an audit trail.

## Safety and Authorization

Research is read-only unless the user separately authorizes implementation or external actions. Do not interpret a request to investigate as permission to change code, contact people, purchase services, or modify external systems.
