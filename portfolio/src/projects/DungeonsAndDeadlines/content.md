## Overview

HyperLink is a 2D top-down dungeon crawler built in C++ on DigiPen's Alpha Engine. Players explore an overworld and its dungeons, switching between Knight and Mage mid-run, unlocking abilities through a skill tree, and fighting their way past slimes to a multi-phase Tank boss.

## My Role

Built mostly by 2 people, there was no formal technical lead role on this project, but I took it on in practice and drove the technical side. I set up the project and its structure early, designed the core architecture the rest of the team built on, and set our code standards: warning level /W4, C++17, and a warning-free build by submission. Near the deadline I led the stabilisation push, tracking down crashes and memory leaks so we shipped a clean build.

I built:

- **Game framework:** A stack-based scene manager for the overworld, dungeons, boss room and menus, and an entity system that every game object inherits from. Spawns and deletions are queued until a safe point in the frame, so objects can be created or destroyed mid-update without crashing.
- **Event system:** A publish-subscribe event bus that kept gameplay systems decoupled, with listeners cleaned up automatically when their owner is destroyed. It drives player damage, deaths, scene resets and door keys.
- **Prefabs:** Templates for the player, enemies, projectiles, tiles and NPCs, set up once and copied when the game spawns them.
- **Animation:** A sprite-sheet animation system that plays forwards or backwards, used for every animated character, projectile and death effect in the game.
- **Enemy AI:** A state-machine enemy base class (idle, patrol, chase, attack, dead), the slime enemy, and the integration of our A* pathfinding into enemy movement.
- **Tank boss:** A boss base class and the Tank, which fires bombs and rockets, charges at the player, and becomes enraged at low health, with shorter cooldowns and faster, denser attacks.
- **Player systems:** The player's state machine and the Knight/Mage job-swap system.
- **Camera:** Smooth-follow camera with interpolation and bounded scroll-wheel zoom.