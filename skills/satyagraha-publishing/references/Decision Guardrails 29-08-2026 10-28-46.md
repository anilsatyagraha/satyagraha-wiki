# Decision Guardrails

## Purpose

Provide an auditable explanation of material AI-assisted work without exposing or depending on private hidden chain-of-thought.

## Required decision summary

For each material skill update or publishing decision, record:

1. **Objective** - the outcome requested.
2. **Evidence** - files inspected, commands run, standards consulted and observable results.
3. **Assumptions** - facts treated as true but not independently confirmed.
4. **Alternatives** - the realistic approaches considered and their material tradeoffs.
5. **Decision** - the selected approach and concise justification.
6. **Risks** - foreseeable failure, security, portability, accessibility or maintenance concerns.
7. **Guardrails** - constraints used to control those risks.
8. **Validation** - tests performed and their results.
9. **Uncertainty** - unresolved questions or work still requiring human approval.
10. **Skill impact** - whether a reusable skill changed, its new version and the rule added.

## Update threshold

Update a reusable skill only when the new information is:

- Relevant to the skill's purpose.
- General enough to help future work.
- Durable rather than temporary.
- Actionable as a clear instruction or check.
- Specific to Satyagraha's workflow or a discovered tool constraint.

If the evidence is uncertain or the change could materially alter other workflows, propose the update before applying it. Apply clear error-prevention and user-mandated guardrails immediately, then report the change.

## Disclosure boundary

Publish concise rationale and evidence that allow meaningful review. Do not expose hidden internal reasoning traces, private chain-of-thought, credentials, secrets, unrelated personal data or speculative internal deliberation. A reviewer should be able to reproduce the result from the documented evidence and validation without needing private model internals.
