## Overview

StrokeNet is a Pictionary-style multiplayer drawing and guessing game for up to 6 players over a LAN, built in C++ with SFML on a custom, server-authoritative UDP protocol. One player draws a secret word on a shared canvas while the others race to guess it in chat.

## My Role

On a team of 4, I worked on the networking and game logic, building features across both client and server, and built most of the client's drawing tools.

- **Account system:** Built login and account creation from end to end. The client finds the server over LAN broadcast and logs in with a timeout; the server authenticates against a persistent JSON user store and rejects duplicate logins.
- **Scoreboard protocol:** Designed the scoreboard notification packet (player names, scores, the current drawer and each player's index) and implemented the server broadcast and client handling.
- **Canvas synchronisation:** Implemented the request and notification messages for clearing the canvas, with acknowledgements and session validation.
- **Game logic and stability:** Fixed guess-spam and drawer-guessing exploits, round and counter bugs, and threading issues, including a mutex bug and a deadlock.
- **Drawing tools:** Wrote the stroke renderer (quad segments with joined ends for smooth lines), the canvas, a tool picker with brush and eraser and a live cursor preview, the colour picker, and the clear button.
- **UI:** Built the login screen and the scoreboard display.