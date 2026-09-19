---
name: vertex-ai-media-master
description: Design or implement multimodal media workflows on Google Cloud Vertex AI for image, audio, video, and text. Use when a project has selected Vertex AI and needs media understanding or generation, batch processing, evaluation, safety, or production integration; verify current models, regions, quotas, and APIs.
license: MIT
---

# Vertex AI Media

Build production media workflows using the Vertex AI capabilities currently available to the project and region. Product names, model identifiers, limits, and SDK methods change; verify them in current Google Cloud documentation before implementation.

## Establish Requirements

Determine:

- understanding, generation, editing, transcription, synthesis, or combined workflow;
- input and output media types, sizes, duration, quality, and volume;
- interactive latency versus asynchronous batch processing;
- target region, data residency, privacy, licensing, and retention constraints;
- quality, safety, grounding, and human-review requirements;
- existing Google Cloud project, identity, storage, and observability setup.

Do not assume every model or preview feature is enabled in every region or account.

## Architecture

Keep uploads and credentials in trusted infrastructure. Use least-privilege service identities, approved storage locations, explicit lifecycle policies, and signed access where appropriate. Separate ingestion, preprocessing, model invocation, post-processing, review, and publishing so failures can be retried without repeating the entire workflow.

For long-running jobs, use durable job state, idempotency, bounded retries, progress events, cancellation, and cost controls. Validate MIME type and content rather than trusting filenames.

## Media Guidance

- **Images:** preserve aspect ratio and color needs; document generation provenance and editing constraints.
- **Video:** sample or segment only when it preserves the task; retain timestamps for traceable findings.
- **Audio:** record language, channel, diarization, timing, and quality requirements.
- **Combined media:** preserve ordering and relationships between text, frames, audio, and metadata.

Distinguish direct observations from model inference. Do not present generated or inferred media attributes as verified facts.

## Evaluation and Safety

Build an evaluation set that reflects real media quality, languages, edge cases, and failure modes. Measure task success, hallucination or grounding, temporal accuracy, visual quality, latency, throughput, and cost. Include human review for subjective quality or consequential publication.

Apply content policy, consent, rights, brand, disclosure, and moderation requirements before publishing generated media. Preserve audit information without logging sensitive content unnecessarily.

## Verification

Test unsupported formats, corrupted files, large inputs, regional unavailability, quota errors, timeout, partial batch failure, safety blocks, and downstream publishing failure. Cite the current model and API documentation used for any drift-prone implementation choice.
