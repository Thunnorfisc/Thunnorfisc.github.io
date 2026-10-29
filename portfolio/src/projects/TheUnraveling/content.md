## Overview

A 2D top-down narrative horror game built entirely in our custom NAgine engine.

The game uses stealth mechanics with sanity management, using puzzle solving and environmental storytelling to push the story forward.

## My Role

I was the technical lead for both the engine and the game, leading a team of 8 (6 engine programmers, 2 designers). I wrote guides and supported the designers in using the engine and its scripting, and worked with our product manager to scope features and hit milestones.

On the game side, I built:

 - **Enemy AI:** Co-developed tile-based A* pursuit with line-of-sight tracking and a momentum system, so the enemy speeds up on straightaways and loses speed on corners. After losing the player, it searches their last known position and then the nearest locker before returning to patrol.
 - **Obstacle registry:** A tag-driven system that finds every object tagged "Obstacle" in a room and projects it onto an AI-only navigation layer, so pathfinding and line of sight route around furniture without affecting physics. It replaced hard-coded obstacle lists in each room.
 - **Sanity system:** Sanity acts as the player's health and shrinks their field of view as it drops, with candles that restore it.
 - **Struggle minigame:** A button-mashing escape when the enemy catches the player, with decay, cooldowns, a short invulnerability window, and a scalable struggle bar UI.
 - **Player controller:** Movement, sprinting, and the caught/escape states.
 - **Dialogue system:** Loads scripted lines and character portraits from text files, with its UI.
 - **Room transitions:** Fade transitions between rooms that carry the player's vision level and spawn point into the next scene.