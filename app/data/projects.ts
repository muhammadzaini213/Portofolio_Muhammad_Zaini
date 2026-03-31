export const projects = [
  {
    slug: "yappie-cleaning-service",
    title: "Yappie Cleaning Service",
    role: "Unity Programmer · UI Designer",
    desc: "A chaotic co-op cleaning game where you manage a team of quirky robots keeping a messy household spotless.",
    img: "/images/yappie.png",
    link: "https://sleepymor.itch.io/yappie-cleaning-service",
    featured: true,
    homeDisplay: false,
    content: `
Yappie Cleaning Service started as a game jam project with one goal: make co-op chaotic and fun.

The core design challenge was making players feel the pressure of a messy house without the game feeling unfair. Every object spawns on a weighted random system — frequently touched areas generate more mess, so players naturally develop routes.

On the programming side, I focused on UI that communicates urgency without overwhelming. Color saturation increases as cleanliness drops. Sound pitch shifts subtly when time is running out. None of it is explained — it just feels right.

The biggest lesson: feedback should be felt, not read.
    `,
  },
  {
    slug: "solar-siege",
    title: "Solar Siege",
    role: "Game Designer · Unity Programmer",
    desc: "Top-down bullet hell with performance-focused systems and procedural wave design.",
    img: "/images/solar-siege.png",
    link: "https://lordzaini.itch.io/solar-siege",
    featured: false,
    homeDisplay: true,
    content: `
Solar Siege is a top-down bullet hell built around one constraint: 60fps on potato hardware.

Every system was written with cache coherency in mind. Bullets use a flat array pool. Enemy AI runs on a simplified FSM with shared spatial hashing so raycasts are almost free.

The wave system is procedural — not random. Difficulty curves are authored as data, then interpolated based on player performance metrics gathered silently during play. If you're dying too fast, the system backs off. If you're breezing through, it escalates.

The result is a game that feels handcrafted but scales to any skill level.
    `,
  },
  {
    slug: "deck-of-ascent",
    title: "Deck of Ascent",
    role: "Unity Programmer",
    desc: "A roguelite deckbuilder where your choices between runs reshape the card pool permanently.",
    img: "/images/doa.png",
    link: "https://sleepymor.itch.io/deck-of-ascent",
    featured: false,
    homeDisplay: true,
    content: `
Deck of Ascent is a roguelite deckbuilder with a twist: cards you earn persist between runs, but so do the curses you accumulate.

The architecture centers on a serializable card state system. Every card is a ScriptableObject with modifier slots — buffs and debuffs attach as components, not hardcoded values. This made balancing significantly easier because effects could be tuned in data, not code.

The meta-progression layer tracks player tendencies and subtly nudges card offers toward underused archetypes, encouraging experimentation without forcing it.

Building a fair but punishing economy was the core design puzzle. The solution was making every loss feel like information, not failure.
    `,
  },
  {
    slug: "4d-tic-tac-toe",
    title: "4D Tic Tac Toe With Simultaneous Turn",
    role: "Game Designer · Unity Programmer",
    desc: "Tic Tac Toe expanded into four dimensions with simultaneous turns, removing analysis paralysis.",
    img: "/images/4d-tic-tac-toe.png",
    link: "https://lordzaini.itch.io/4d-tic-tac-toe-with-simultaneous-turn",
    featured: false,
    homeDisplay: true,
    content: `
Classic Tic Tac Toe has a solved strategy. This project's question: what breaks that?

Expanding to 4D creates a board too complex to solve mentally. Adding simultaneous turns removes the ability to react — both players commit before seeing the result.

The UI was the hardest part. Representing 4D space in 2D without losing spatial intuition required iteration. The final solution uses a 4x4 grid of 4x4 boards, color-coded by depth dimension with a subtle perspective transform to hint at the third and fourth axes.

Playtesting revealed something unexpected: players developed intuition for 4D space faster than anticipated. The game works because the mind adapts.
    `,
  },
  {
    slug: "absolute-zero",
    title: "Absolute Zero",
    role: "Game Designer",
    desc: "A minimal puzzle game about temperature, entropy, and the cost of order.",
    img: "/images/absolute-zero.png",
    link: "https://lordzaini.itch.io/absolute-zero",
    featured: false,
    homeDisplay: true,
    content: `
Absolute Zero is a puzzle game built on a single mechanic: heat transfer.

Every element on the board has a temperature. Move a cold object near a hot one — energy flows. The goal is always to reach absolute zero, but the path is never obvious.

The design constraint was no UI numbers. Temperature is communicated entirely through color and particle density. Players learn the system by feel, not by reading.

This was an exercise in teaching through environment, not instruction. The hardest puzzles were designed last, after watching enough players fail in predictable ways. Each failure mode became a puzzle that teaches the mechanic that caused it.
    `,
  },
];
