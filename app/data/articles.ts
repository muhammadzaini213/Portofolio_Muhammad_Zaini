export const articles = [
  {
    slug: "audio-system-design",
    title: "Designing an Audio System You Don’t Need to Remember",
    desc: "How I built an audio system so intuitive I only remember how to use it, not how it works.",
    content: `
## I built an audio system with one goal: remove thinking.

Instead of remembering structure, I focused on usage.

Play("SFX_HIT")
Play("BGM_BATTLE")

No lookup. No confusion.

System handles:
- pooling
- priority
- layering

Result:
I forgot how it works internally.
But I can use it instantly.
    `,
  },
  {
    slug: "game-feel-principles",
    title: "Game Feel Is Not Juice",
    desc: "Breaking down feedback, timing, and player perception.",
    content: `
Game feel is structure.

Not particles.
Not screenshake.

It is:
- response time
- input buffering
- feedback clarity

Juice is decoration.
Feel is system.
    `,
  },
];