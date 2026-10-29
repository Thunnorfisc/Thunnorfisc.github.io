## Overview

Short Circuit is a 2D roguelike written in C with the CProcessing framework. Players travel across a procedurally generated map of branching paths, choosing between battles, item events and shops on the way to each world's boss, and fight by building spells from circuit pieces.

## My Role

On a team of 5 with no formal roles, I helped drive the game's technical design, proposing the core systems and how they fit together, and I owned the world system: the map and the structure of each run. I also drew art for the game, including the map nodes, item sprites and world background.

- **Procedural map generation:** Designed and built a generator for branching, Slay the Spire-style maps. It places nodes column by column, fills each column under an event budget, then links every node to its nearest neighbour in the next column, with a backward check that guarantees every node can be reached. Event types are drawn at random from per-type limits loaded from a file.
- **World scene:** Rendered the node map with connecting paths, hover tooltips and clickable nodes, and moved the player between worlds after each boss.
- **Save/load:** Saved the map, its connections, the player's currency and their inventory to a file, and restored them on load.
- **Items and shop:** Built random item generation from a data file, the item event, and the shop.
- **Data structures:** Wrote a general-purpose linked list in C, used to store each node's connections.
- **Art:** Drew the map node icons, world background, all item sprites and the currency icon.