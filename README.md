# family-feud

A web-based implementation of the classic Family Feud game show.

## Features
- Single-player mode
- Two-player mode
- Score tracking and leaderboard support
- Built with PHP, HTML, CSS, and JavaScript

## Project Structure
- `index.php` — main landing page
- `login.php`, `register.php`, `logout.php`, `profile.php` — user authentication and profile flow
- `app/config/database.php` — database connection settings
- `games/family_feud/` — game assets, styles, scripts, and API endpoints
- `public/` — public assets for CSS, JavaScript, and images

## Installation
1. Copy the project into your web server root (for example `C:\xampp\htdocs\Game-Library2`).
2. Configure your database settings in `app/config/database.php`.
3. Import `database/family_feud.sql` into your MySQL server.
4. Open the app in your browser via `http://localhost/Game-Library2`.

## Notes
- Add your own database credentials and ensure the database user has permissions.
- Do not commit sensitive files such as `.env` or local credentials.
