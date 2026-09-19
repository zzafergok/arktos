---
name: brand-guidelines
description: >
  Mobile application brand identity creation and application guide.
  Brand voice and tone, colour palette standards, typography system,
  icon and visual language, App Store assets, and consistency across all
  touchpoints. Use when: defining brand voice, tone of voice, copywriting
  standards, writing App Store descriptions, push notification copy,
  onboarding copy, error message writing, brand colours, logo usage,
  visual identity consistency.
allowed-tools: Read, Glob, Grep
---

# Brand Guidelines — Mobile Application Brand Identity

> A consistent brand experience builds user trust and recognition.
> This guide ensures that everyone — from developers to content writers —
> produces the same voice and visual presentation.

---

## 1. Brand Voice

Voice is fixed and reflects the same personality across all platforms and content types. Tone adjusts based on context.

### Defining the Voice Character

A brand's voice is defined by three to five adjectives. For each adjective, "what it means" and "what it does not mean" are established with concrete examples.

**Example: Productivity application**

Trustworthy — but not arrogant. A trustworthy statement reads "Your data is encrypted and stored on your device." An arrogant one reads "We are the most secure app on the market."

Clear — but not dry. A clear statement reads "Get started in three steps." A dry one reads "The onboarding process offers an optimised experience."

Human — but not informal. A human statement reads "Great — you've completed the first item on your list." An informal one reads "Yo! First task done 🔥🔥"

### Tone Adjustment by Context

While voice remains constant, tone is flexible. Five distinct situations call for different tone adjustments.

For **success messages**, use short, measured energy. Avoid over-celebration. "Done." or "Saved — you're ready." are appropriate.

For **error messages**, use non-blaming, solution-oriented, concise language. "Connection lost. Try again." is preferable to "An error has occurred."

For **onboarding**, use a welcoming and guiding tone, presenting steps one at a time. Avoid overwhelming the user with choices.

For **empty states**, use hopeful and action-oriented language. "No tasks yet. Add your first one to get started."

For **push notifications**, lead with value. Do not manufacture urgency unless a genuine deadline exists. "Your weekly report is ready."

---

## 2. Writing Standards

### General Rules

Address users with "you" in a direct, friendly manner — mobile applications call for a degree of informality. Sentences are kept short; long text is not read on a mobile screen. Active voice is preferred over passive. Technical jargon is avoided unless the target audience is known to be familiar with it.

### App Store Description Writing

The first sentence must contain the application category and the primary benefit. The description presents a list of outcomes, not a list of features. Rather than "Task list", say "Tasks you can complete without losing focus."

Keywords are embedded organically throughout the description. Keyword stuffing is penalised by the App Store algorithm.

### Onboarding Text Framework

Every onboarding step follows three elements: what the user is looking at, why it matters, and what the next action is.

```
Headline: "Set your daily goal"
Body:     "Choosing a single priority each day
           is enough to stay focused."
Button:   "Set my goal"
```

### Error Message Framework

A well-formed error message answers three questions: what did not happen, the likely reason, and what the user can do next. The third element is the most important — without a clear exit, the user has nowhere to go.

```
Poor:  "Error 403: Unauthorised access."
Good:  "You don't have permission to view this content.
        Check your account settings."

Poor:  "Transaction could not be completed."
Good:  "Payment failed. Check your card details
        and try again."
```

The formula is: what did not happen + possible reason + what the user can do.

---

## 3. Visual Identity Standards

### Colour Palette

Three usage rules are established for each brand colour: primary use, secondary use, and prohibited use.

Brand colours are defined as semantic tokens in the `AppColors` class. This creates a bridge between the design tool (Figma) and developer code — both sides reference the same token names.

```dart
static const brandPrimary   = Color(0xFF...);  // Primary action colour
static const brandSecondary = Color(0xFF...);  // Supporting colour
static const brandAccent    = Color(0xFF...);  // Emphasis points
```

### Contrast Requirements

Text and background combinations must meet the WCAG AA standard, which requires a minimum contrast ratio of 4.5:1. When a brand colour is used as a background, this ratio must be verified; the shade is adjusted if the requirement is not met.

### Typography Selection

Brand typography encompasses three decisions. The display font establishes character and commands attention. It is used for large headings, splash screens, and marketing materials. The body font prioritises readability and is used in lists, descriptions, and form fields. On iOS, deviating from the system font (SF Pro) can weaken the user experience. The mono font is used for numerical content such as code, prices, and data tables.

---

## 4. Visual Language

### Icon Style

All icons come from a single style — outline or filled, not both at the same time. Size and padding are consistent. SF Symbols is the preferred choice for iOS, as it is familiar to iOS users and supports dynamic sizing.

### Visual Content (Photography and Illustration)

When photography is used, a consistent style must be maintained: whether a dark or light background is preferred, whether filters are applied, and the framing logic are all defined and applied uniformly.

When illustration is used, stroke weight, colour palette alignment, and corner rounding must remain consistent with the brand system.

### Animation Personality

Animations carry the brand voice as much as copy does. A professional or enterprise brand uses low, elegant motion with long ease-out curves (400–600 ms). An energetic or youth-focused brand uses fast, bouncy spring animations. A minimal or calm brand uses fade-only transitions with minimal movement (200–300 ms).

---

## 5. App Store Visual Assets

### Application Icon

iOS and Android must be evaluated independently, as the background colour renders differently in the App Store and Play Store.

The iOS App Store applies rounded corners automatically; the icon is submitted as a square. This means no critical visual elements should be placed near the corners of the icon.

### Screenshots

Each screenshot carries a single message. Attempting to demonstrate multiple features in a single frame weakens clarity. Text overlays must be large, readable, and compliant with contrast requirements.

### App Preview Video

The first three seconds determine whether the video is watched. The strongest feature is therefore placed at the very beginning. The video must be comprehensible without sound, since the App Store defaults to muted playback.

---

## 6. Consistency Checklist

Every new touchpoint — a new screen, a new notification, a new App Store text update — is reviewed against the following checklist.

**Voice and Tone.** Is the content aligned with the brand voice adjectives? Is the tone appropriate for the context? Is the language free of blame or unnecessary complexity?

**Visual.** Are brand colour tokens used? Is the typography hierarchy consistent? Does the icon style match the others?

**Copy.** Does the first sentence contain a value proposition? Is the call to action clear and singular? Is the readability at an appropriate level for a general audience?
