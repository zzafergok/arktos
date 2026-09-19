---
name: gemini-skill
description: Integrate or use Google Gemini models through an official Google SDK or an explicitly selected compatible provider. Use when the user requests Gemini for text, code, image, audio, video, structured output, tool use, or large-context workflows; verify current models and SDK APIs before implementation.
---

# Gemini

Use Gemini through the provider and SDK already chosen by the project. Model names, capabilities, pricing, limits, and API shapes change, so consult current official documentation for implementation-critical facts.

## Establish the Integration

Determine:

- runtime and language;
- official Google API, Vertex AI, or an explicitly selected third-party gateway;
- required modalities and output format;
- latency, quality, region, privacy, and cost constraints;
- existing provider abstraction, retry policy, observability, and secret handling.

Do not route traffic through a third party or replace an existing provider solely because Gemini is available.

## Model Selection

Choose from the models currently available to the user's account and provider. Match the model to modality, context, quality, latency, tool-use, structured-output, and budget needs. Avoid hard-coding a model based on a remembered alias; centralize configuration and record why the choice fits.

## Implementation Principles

- Keep credentials in the server or trusted runtime.
- Validate input size, type, and provenance before upload.
- Use provider-supported structured output when downstream code requires a schema, and validate the result locally.
- Bound retries and timeouts; handle throttling and safety refusals explicitly.
- Stream only when the product can render partial output safely.
- Preserve provider request identifiers and useful latency or token metrics without logging sensitive prompts.
- Treat model output as untrusted data before execution, persistence, or display.

## Multimodal Work

Optimize media before transmission when quality permits. Preserve MIME type, ordering, and user intent. For large files, follow the current provider's upload and lifecycle mechanism. When analyzing images, audio, or video, distinguish observable content from inference.

## Evaluation

Create representative examples and edge cases for the actual task. Measure task success, schema validity, groundedness where relevant, latency, cost, and safety behavior. Compare candidate models using the same evaluation set rather than anecdotal prompts.

## Verification

Run the integration with the installed SDK and configured provider. Test invalid credentials, unsupported media, large input, timeout, rate limit, malformed structured output, refusal, and provider outage behavior. Cite the official model or SDK documentation used for drift-prone choices.
