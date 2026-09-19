---
name: threejs-skill
description: Build, debug, optimize, or review interactive 3D web experiences with Three.js. Use for scenes, cameras, lighting, animation, asset loading, shaders, PBR materials, XR, games, data visualization, or configurators; verify current Three.js and browser APIs before version-sensitive implementation.
---

# Three.js

Create a 3D experience that meets the product goal and target-device performance budget rather than maximizing scene complexity.

## Establish Constraints

Identify target browsers and devices, input methods, frame-rate goal, loading budget, accessibility alternative, asset pipeline, visual requirements, and whether WebGL, WebGPU, or XR behavior is actually required. Inspect the installed Three.js version and existing renderer architecture.

## Scene Architecture

- Keep scene setup, asset loading, interaction, animation, and application state separable.
- Reuse geometries, materials, textures, and GPU resources where possible.
- Dispose resources when objects or routes are removed.
- Centralize the render loop and update only systems that need a frame.
- Handle resize, device pixel ratio, visibility changes, context loss, and reduced motion.
- Use stable object identity and explicit coordinate conventions.

## Assets and Rendering

Choose asset formats, compression, texture sizes, color spaces, tone mapping, lights, shadows, and post-processing based on measured quality and performance. Avoid shipping editor-scale assets directly. Provide progress, error, cancellation, and fallback behavior for asset loading.

For custom shaders, document uniforms, spaces, precision, fallback behavior, and the visual reason the shader is necessary. Treat shader source and generated values as untrusted when user-controlled.

## Interaction and Accessibility

Define pointer, touch, keyboard, controller, and XR input as required. Make selection and focus states visible. Provide a meaningful non-3D representation or equivalent controls when the experience communicates essential information.

## Performance

Measure before optimizing. Inspect frame time, draw calls, triangles, texture memory, shader compilation, asset transfer, CPU work, and garbage collection. Apply level of detail, instancing, culling, batching, simplified materials, or lower render resolution only where evidence supports them.

## Verification

Test representative devices and browsers, slow loading, failed assets, resize, background and foreground transitions, navigation cleanup, reduced motion, input modes, and context recovery. Report observed metrics rather than generic performance claims.
