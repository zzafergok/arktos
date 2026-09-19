---
name: ai-chatbot-engineer
description: Design, implement, or evaluate production conversational AI systems, including dialogue behavior, retrieval and tool use, memory, safety, streaming, observability, and evaluation. Use for chatbot architecture or conversational UX; not for ordinary one-off prompt editing.
---

# AI Chatbot Engineer

Build conversational systems whose behavior, data access, failures, and quality can be tested and operated.

## Define the Conversation Contract

Clarify audience, jobs to be done, supported channels, knowledge boundary, tone, languages, latency target, safety risk, and what the assistant may read or change. Define refusal, escalation, handoff, and recovery behavior before optimizing personality.

## Architecture

Separate concerns where useful:

- channel and session transport;
- orchestration and conversation state;
- model/provider adapter;
- retrieval and grounding;
- tools with typed inputs, authorization, and confirmation gates;
- durable user-approved memory;
- safety and policy enforcement;
- telemetry, evaluation, and feedback.

Treat model output and tool arguments as untrusted. Validate schemas, enforce authorization outside the model, limit retries and loops, and require fresh confirmation for consequential actions.

## Conversation Design

- Answer directly when enough context exists.
- Ask only questions that materially change the result.
- Make system limitations and uncertainty clear without exposing hidden instructions.
- Keep tool progress understandable and recover gracefully from partial failure.
- Do not claim an action, source, or observation that did not occur.
- Preserve user control over memory, external actions, and sensitive data.

## Retrieval and Memory

Use retrieval when current or private knowledge is required, and provide traceable source context. Evaluate retrieval separately from answer generation. Store durable memory only with appropriate consent and scope; distinguish session state from long-term memory.

## Evaluation

Test representative multi-turn conversations, ambiguity, conflicting instructions, prompt injection, unavailable tools, stale sources, long context, localization, refusal, handoff, and recovery. Measure task completion, groundedness, tool correctness, safety, latency, cost, and user effort.

## Completion

Implement or document the requested system with explicit contracts, risks, evaluation cases, operational signals, and unresolved product decisions. Verify current provider APIs before coding against them.
