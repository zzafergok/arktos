---
name: ux-writing
description: >
  UX writing guide for mobile application interface copy (microcopy).
  Button labels, error messages, empty state copy, notifications, onboarding
  flows, form labels, headings, and App Store descriptions. Use when writing:
  button text, error messages, push notification copy, onboarding copy,
  empty screen copy, modal headings, form placeholders, loading state text,
  success messages, App Store descriptions, tooltips, in-app messages,
  or dialog box copy.
allowed-tools: Read, Glob, Grep
---

# UX Writing — Mobile Application Microcopy Guide

> Every word is a decision. The right word moves the user forward;
> the wrong word stops them, confuses them, or makes them anxious.

---

## Four Core Principles

The quality of UX copy is measured against four questions. These questions should be run through for every new piece of text before it is finalised.

**Purposeful.** Does this text help the user reach their goal, or does it simply fill space? **Concise.** Can I communicate the same meaning with fewer words? **Conversational.** Would a real person say this to someone in front of them? **Clear.** Is there any possible way to misread this?

---

## Copy Patterns

### Headings

Headings tell the user where they are. They are written as noun phrases in sentence case. On screens that require an action, the heading clearly states what the task is.

"Account settings" and "Choose a payment method" are effective headings. "Settings" is too broad. "Please make a selection" is unnecessarily formal.

### Buttons and Links

The verb-plus-object structure is used throughout. The button label names the action it triggers. Context-free labels such as "OK", "Yes", or "Next" are avoided.

"Save changes", "Delete account", and "Proceed to payment" are clear button labels. "Submit" and "Confirm" often leave users uncertain about what will happen. For destructive actions such as deletion or cancellation, the label must clearly reflect the consequence — the user needs to know what they are about to lose.

### Error Messages

An error message covers three things: what did not happen, the likely reason, and what the user can do next. The third element is the most important — without a recovery path, the user is stuck.

```
Poor:  "An error occurred."
Good:  "Payment failed. Check your card details and try again."

Poor:  "Invalid input."
Good:  "Email address must include @."

Poor:  "Request timed out."
Good:  "Connection lost. Check your internet connection and try again."
```

Error messages must never use language that blames the user, expose technical codes or jargon, or leave the user with no way to proceed.

**Validation error (inline, below the field).** Short, specific, and neutral in tone. "Phone number must be 10 digits."

**System error (modal or banner).** Empathetic, with a clear recovery step. "Something went wrong. Try again or contact us."

**Blocking error (full screen).** Direct and unambiguous, presenting a single action. "Your session has ended. Sign in again to continue."

### Success Messages

Short, specific, and written in the past tense. The message confirms what happened and, where relevant, what it means.

"Saved", "Profile updated — your changes are live", and "Order received — estimated delivery: 3–5 business days" are all well-formed success messages. "The operation was completed successfully!" is unnecessarily long, and "Bravo!" is disproportionate.

### Empty State Copy

An empty screen should answer three questions: why is it empty, what can the user do, and what is the value of taking that action?

"No favourites yet. Tap the heart icon on any product to save it here." and "Your inbox is clear. New messages will appear here." both follow this structure well. "No data found." and "Empty." provide no useful information and no path forward.

### Onboarding Copy

Each step communicates a single concept. The text is written to prompt action, not to teach. The user came to use the application, not to read about it.

```
Headline: "Create your first list"
Body:     "Organising tasks into lists makes
           it easier to stay focused."
Button:   "Create a list"
```

Contrast this with: "This feature is a powerful organisational tool that helps you manage your tasks. Click the button below to continue." That approach overloads the user and buries the call to action.

### Push Notifications

Value is presented first. Urgency is not manufactured unless a genuine deadline exists — artificial urgency is one of the most reliable causes of users disabling notifications.

"Your weekly report is ready." and "Your order has shipped." are value-forward notifications. "Come back! We miss you. 🥺" is manipulative. "Important notification!" communicates nothing.

### Form Labels and Helper Text

Labels describe what goes in the field — they do not ask questions. Placeholders show an example format; they do not carry required information, because they disappear when the user begins typing.

The label "Phone number" is correct. "Your phone number?" adds an unnecessary question mark. The placeholder "07XXX XXX XXX" illustrates the expected format correctly. Using "Phone number" as a placeholder simply repeats the label and adds no value. Helper text such as "Enter without the country code." provides specific, useful guidance. "This field is required." states the obvious and clutters the interface.

---

## Copy Length Reference

| Element                 | Limit                                |
| ----------------------- | ------------------------------------ |
| Button label            | 2–4 words (ideal), 6 words maximum   |
| Screen heading          | 40 characters maximum                |
| Error message           | 12–18 words (including the solution) |
| Push notification title | 50 characters maximum                |
| Push notification body  | 100 characters maximum               |
| Empty state text        | 1–2 short sentences                  |
| Onboarding step body    | 25 words maximum                     |

---

## Editing Process

Every piece of copy passes through four stages. The purpose check asks whether the text helps the user achieve their goal and what is lost if it is removed. The shortening stage asks whether the same meaning can be communicated with fewer words — "at this point in time" becomes "now", and "in order to" becomes "to". The voice test involves reading the text aloud to assess whether it sounds natural. The clarity check asks whether any interpretation other than the intended one is possible, and whether any technical term is present that the audience may not know.

---

## App Store Description Writing

The first three lines of an App Store description appear before the "Read more" button. The majority of users never scroll past this point. The strongest value proposition must therefore appear here, accompanied by a call to action.

The description structure follows this sequence: the opening sentence is a single-sentence value proposition, followed by three primary benefits framed as outcomes rather than features, and a closing line providing social proof or a call to action.

Keywords are embedded organically. On iOS, the title carries the highest-volume keyword and is limited to 30 characters. The subtitle holds the second-priority keyword and a supporting value statement, also within 30 characters.

---

## Accessibility

All images must have a `semanticLabel`. The label describes the meaning of the image, not the image itself.

```dart
// ❌ Wrong
Image(semanticLabel: 'heart icon'),

// ✅ Correct
Image(semanticLabel: 'Add to favourites'),
Image(semanticLabel: 'Remove from favourites'),
```

Colour must never be the sole carrier of information. Error states should always combine colour with an icon, text, or shape change. The minimum contrast ratio for body text under WCAG AA is 4.5:1.
