export const projects = [
  {
    slug: "yappie-cleaning-service",
    title: "Yappie Cleaning Service",
    role: "Unity Programmer · UI Designer",
    desc: "A chaotic 2D top-down RPG focused on beach cleaning and environmental awareness, developed for GEMASTIK 2025.",
    img: "/images/projects/yappie.png",
    link: "https://sleepymor.itch.io/yappie-cleaning-service",
    featured: false,
    homeDisplay: true,
    content: `
Originally developed for the **GEMASTIK 2025** competition, **Yappie Cleaning Service** is a 2D top-down RPG designed to blend chaotic fun with a meaningful message about environmental awareness.

The project challenged me to balance fast-paced task-based progression with an intuitive player flow. As a programmer and UI designer, I was responsible for translating complex environmental mechanics into seamless gameplay features.

### Key Contributions:
* **Core Mechanics:** Designed and implemented the interactive cleaning systems, ensuring the "feel" of gathering waste was satisfying and responsive.
* **Dynamic UI Systems:** Developed a UI that supports clarity amidst chaos, using visual cues to guide players through exploration and task-based goals.
* **System Integration:** Bridged the gap between game design concepts and technical execution, ensuring all gameplay systems worked cohesively within the 2D RPG structure.

The core design philosophy was simple: **feedback should be felt, not just read.** By using subtle shifts in color saturation and audio pitching as cleanliness levels changed, we created an urgency that players understood instinctively.

**Yappie Cleaning Service** isn't just about cleaning; it’s about making the act of environmental stewardship engaging through interactive storytelling and polished mechanics.
    `,
  },
  {
    slug: "solar-siege",
    title: "Solar Siege",
    role: "Game Designer · Unity Programmer",
    desc: "A high-octane space combat bullet hell where you control a weaponized planet defending against alien invaders.",
    img: "/images/projects/solar-siege.png",
    link: "https://lordzaini.itch.io/solar-siege",
    featured: false,
    homeDisplay: true,
    content: `
Developed for the **Planet Game Jam**, **Solar Siege** puts a twist on the genre: you don't just fly a ship; you control **Earth Prime**, a weaponized planet defending the solar system.

My dual role as Game Designer and Programmer focused on making "planetary combat" feel heavy yet responsive. I designed the core shooting systems and environmental hazards to ensure that defending against alien invaders felt like a true orbital siege.

### Technical & Design Highlights:
* **Performance First:** Built to maintain 60fps even on "potato hardware." I implemented a flat array pool for bullets and used spatial hashing for enemy AI, making intensive raycasts virtually free.
* **Modular AI & Combat:** Designed and programmed the enemy AI and modular combat systems, allowing for diverse invader types that interact dynamically with the player.
* **Procedural Wave Design:** Instead of pure randomness, difficulty curves are authored as data. The game silently tracks player performance, interpolating difficulty in real-time—escalating when you're winning and backing off when things get too intense.

### Game Jam Synergy:
Working in a high-pressure jam environment, I focused on building modular, parallel systems. This allowed the team to iterate on gameplay hazards and environmental interactions without breaking the core combat loop.

The final result is a game that balances handcrafted tactical design with systems that scale to any skill level.
    `,
  },
  {
    slug: "the-hero-is-on-the-way",
    title: "The Hero Is On The Way",
    role: "Game Designer · Unity Programmer · Narrative Designer",
    desc: "A short narrative-driven game about a regular knight that protects the city while the hero is on the way to help.",
    img: "/images/projects/thiotw.png",
    link: "https://lordzaini.itch.io/the-hero-is-on-the-way",
    featured: false,
    homeDisplay: true,
    content: `
The Hero Is On The Way is a short-form narrative game built around one core idea: holding the line matters.

Instead of playing as the hero, the player controls a regular knight tasked with defending the city while the hero is still on the way. The design intentionally shifts focus from power fantasy to responsibility under pressure.

The core system revolves around two competing variables: Hero Arrival and Demon Pressure.

Every action the player takes — especially calling for support — directly affects these values. Support makes survival easier, but delays the hero. Playing efficiently accelerates the hero’s arrival, but increases risk.

This creates a deterministic branching system with three outcomes:
- The hero arrives early and takes over.
- The knight is overwhelmed and the city falls.
- A final last stand where the knight, heavily injured, continues fighting until the very end.

The final phase removes most player abilities, reducing control to movement and a single attack. This is intentional. The game shifts from mechanical mastery to emotional persistence.

Dialogue is minimal and delivered through black screen typewriter text. The knight never speaks until the very end:
“I’m sorry, Theresa… I won’t be home tonight.”

No exposition, no flashbacks. Meaning is left for the player to interpret.

The entire experience is designed to be completed in under 10 minutes. Not as a limitation, but as a constraint to enforce pacing, clarity, and impact within a game jam environment.

The result is a tightly scoped narrative system where player decisions are small, but their consequences are absolute.

Stand proud. You held the line.
  `,
  },
  {
    slug: "deck-of-ascent",
    title: "Deck of Ascent",
    role: "Unity Programmer",
    desc: "A tactical turn-based grid strategy game that blends deckbuilding mechanics with roguelite progression.",
    img: "/images/projects/doa.png",
    link: "https://sleepymor.itch.io/projects/deck-of-ascent",
    featured: false,
    homeDisplay: true,
    content: `
Developed for the **GIMERSIA Game Jam**, **Deck of Ascent** is a unique fusion of tactical grid-based strategy and card-driven mechanics. The challenge was to marry the spatial thinking of a board game with the unpredictable nature of a roguelite deckbuilder.

As the primary Unity Programmer, my focus was on building a robust foundation that could handle complex turn-based logic while remaining flexible enough for the rapid iteration required during a game jam.

### Technical Implementation:
* **Grid & Turn Systems:** Engineered the core turn-based framework and hexagonal/grid movement logic, ensuring seamless interaction between card effects and unit positioning.
* **Architecture:** Developed a serializable card state system using **ScriptableObjects**. This allowed for modular modifiers where buffs and debuffs were treated as components rather than hardcoded values, making real-time balancing much more efficient.
* **Meta-Progression Logic:** Implemented a system where choices persist between runs. The game tracks player tendencies to subtly nudge card offers toward underused archetypes, encouraging tactical experimentation.

### Design into Function:
The core puzzle was creating a "fair but punishing" economy. I focused on translating abstract design ideas—like accumulating curses alongside power—into functional in-game mechanics that ensure every loss feels like a learning experience rather than a failure.

By building reliable, modular systems under tight constraints, we delivered a polished tactical experience that rewards both long-term planning and on-the-fly card management.
    `,
  },
  {
    slug: "4d-tic-tac-toe",
    title: "4D Tic Tac Toe: Simultaneous Conflict",
    role: "Game Designer · Unity Programmer",
    desc: "An experimental 4D strategy prototype featuring an 81-cell board and simultaneous turn resolution.",
    img: "/images/projects/4d-tic-tac-toe.png",
    link: "https://lordzaini.itch.io/4d-tic-tac-toe-with-simultaneous-turn",
    featured: false,
    homeDisplay: true,
    content: `
Classic Tic Tac Toe is a solved game. This project was an experiment to break that certainty by expanding the board into four dimensions ($3 \times 3 \times 3 \times 3$) and replacing traditional turn order with simultaneous action.

With 81 cells to manage, the game moves away from simple pattern recognition toward high-level spatial strategy and risk management.

### Key Mechanics & Innovation:
* **Simultaneous Commitment:** Both players lock in their moves at the same time, removing the ability to simply react to an opponent's play.
* **Conflict Resolution:** If both players target the same cell, the game triggers a **Rock–Paper–Scissors** resolution. This introduces a layer of psychological play and uncertainty without relying on twitch reflexes. A draw in this sub-game temporarily stalls the cell, adding a tactical "lock" mechanic.
* **Point-Based Victory:** Unlike the original game, a single line doesn't end the match. Players compete to accumulate the most points across the entire 4D space until no moves remain, forcing a focus on long-term board control.

### The UI Challenge:
Representing 4D space on a 2D screen without causing immediate cognitive overload was the primary hurdle. The final design uses nested grids with subtle perspective transforms and color-coding to help players develop an intuition for the extra axes.

The result is a prototype where players don't just calculate moves—they adapt to a shifting, multi-dimensional battlefield where the mind learns to see patterns across dimensions faster than expected.
    `,
  },
  {
    slug: "absolute-zero",
    title: "Absolute Zero",
    role: "Game Designer",
    desc: "A tense, slow-burn survival game where light, shadow, and limited resources are your only allies.",
    img: "/images/projects/absolute-zero.png",
    link: "https://lordzaini.itch.io/absolute-zero",
    featured: false,
    homeDisplay: true,
    content: `
In **Absolute Zero**, you aren't a hero or a soldier. You are an ordinary person with shaking hands and a revolver you barely know how to use. This project was an exercise in designing "vulnerability" rather than power.

The core design philosophy: **combat is a last resort.** I wanted to move away from typical shooter tropes to create a tense experience where running is almost always the smarter choice.

### Key Gameplay Pillars:
* **Unstable Combat:** To simulate fear, the aiming system is intentionally difficult. Your sights sway, and while holding your breath improves accuracy, it leaves you dangerously exposed. Every bullet is a heavy decision.
* **Light as a Mechanic:** Light and shadow are more than just visuals; they are your primary survival tools. Players must use darkness to disappear or use light beams as a tactical distraction to lure threats away.
* **Environmental Storytelling:** Without relying on heavy UI or tutorials, the game teaches you to "read" the environment. A wrong step or a loud noise has a higher cost than a missed shot.

The challenge in designing **Absolute Zero** was balancing the player's frustration with tension. By emphasizing the "cost of order" through limited resources and environmental hazards, the game forces players to value survival over victory.

It’s a survival game where the loudest thing in the room is your own heartbeat.
    `,
  },
  {
    slug: "intern-of-the-cosmos",
    title: "Intern of the Cosmos",
    role: "Lead Programmer · Asset Artist · Audio Engineer",
    desc: "A physics-based puzzle game where you manipulate gravity to guide a fragile human through a deadly dimensional void.",
    img: "/images/projects/intern-of-the-cosmos.png", 
    link: "https://lordzaini.itch.io/intern-of-the-cosmos",
    featured: true,
    homeDisplay: true,
    content: `
Developed for the **GDGOC Game Jam 2026**, **Intern of the Cosmos** is a "rage-quit" style physics puzzle that explores the concept of indirect control. 

Instead of moving the character, you take on the role of an apprentice god who can only influence the environment by placing planets to create gravitational pulls. The challenge was to create a game that felt "slippery" and punishing, yet fair enough to keep players trying.

### Key Contributions & Technical Depth:
* **Indirect Gravity Mechanics:** Engineered a custom physics system where the player’s only interaction is through gravitational fields. I focused on the math of orbital momentum to ensure that slingshot maneuvers felt satisfyingly precise.
* **Alien AI & Hazard Systems:** Implemented "Alien Patrol" units that use raycasting and predictive shooting. This forced the player to use gravity not just for movement, but as a defensive tool to shield the human from incoming projectiles.
* **Technical Sound Design:** Managed the full audio pipeline, implementing a persistent audio system with high-fidelity SFX that provides crucial feedback when gravity fields are activated or when a "close call" with an alien occurs.

### Design Philosophy:
The core design focused on The Friction of Choice." By limiting the player's ability to directly save the human, every planet placement becomes a high-stakes gamble. 

Working with a randomized team, we synchronized our vision to bring out 120% of our potential. The result is a prototype that balances high-difficulty spatial reasoning with the unpredictable nature of physics-driven gameplay.

You aren't just an intern; you are the only thing standing between a fragile human and the cold, unforgiving laws of the universe.

**Now, all three of us have brought out 120% of our true potential.**
    `,
  },

];
