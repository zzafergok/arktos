---
name: voice-ai-development
description: Design, implement, or evaluate real-time voice AI systems involving speech recognition, synthesis, conversational models, WebRTC or streaming audio, interruption, and telephony. Use for production voice-agent architecture or voice UX; verify current provider models, APIs, pricing, and regional behavior.
---

# Voice AI Development

Build voice interactions around an explicit latency, quality, safety, and turn-taking contract rather than a collection of provider SDK calls.

## Establish Requirements

Clarify channel, languages, accents, acoustic environment, concurrency, expected call length, interruption behavior, response latency, transcription needs, recording policy, accessibility, escalation, and regulated or sensitive data.

Inspect the project's selected providers and current SDK versions. Do not introduce additional vendors without considering privacy, routing, cost, and operational complexity.

## Architecture

Separate transport, audio processing, turn detection, transcription, conversation orchestration, tools, synthesis, session state, and observability. Define audio codec, sample rate, buffering, backpressure, reconnect, cancellation, and cleanup.

Keep tool authorization and consequential actions on the trusted backend. Treat transcripts, model output, and tool arguments as untrusted.

## Conversational Behavior

- Minimize time to first meaningful audio without speaking before the system has enough confidence.
- Support barge-in by stopping synthesis and cancelling obsolete work.
- Handle silence, noise, crosstalk, partial transcripts, corrections, and dropped connections.
- Use concise spoken responses and signal long-running actions.
- Provide confirmation for sensitive, costly, or irreversible actions.
- Offer text or human alternatives when voice is inaccessible or unreliable.

## Privacy and Safety

Obtain required consent for recording or transcription. Minimize retained audio and transcripts, define deletion, protect credentials, and avoid logging sensitive content. Make provider data handling and regional routing explicit. Provide emergency or human handoff appropriate to the domain.

## Evaluation

Test representative devices, networks, accents, languages, background noise, interruption, silence, long sessions, provider throttling, tool failure, and reconnect. Measure end-to-end response latency, transcription quality for the task, interruption success, task completion, cost, and user effort.

## Verification

Use current official provider documentation for endpoints, models, codecs, limits, and authentication. Report measured behavior and untested conditions rather than generic latency claims.
