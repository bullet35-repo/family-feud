<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Family Feud Game Portal</title>
    <link rel="stylesheet" href="public/assets/css/style.css">
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800;900&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css">
    <style>
        :root {
            --stage-navy: #071a3d;
            --panel-blue: #0b3b82;
            --feud-red: #c41220;
            --gold: #f7b731;
            --teal: #13a8a8;
            --ink: #111827;
            --muted: #64748b;
            --surface: #ffffff;
            --line: #dbe3ef;
        }

        * {
            letter-spacing: 0;
        }

        html {
            scroll-behavior: smooth;
        }

        body {
            background: #f3f6fb;
            color: var(--ink);
        }

        .site-header {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            z-index: 20;
            background: rgba(6, 19, 45, 0.84);
            border-bottom: 1px solid rgba(255, 255, 255, 0.14);
            backdrop-filter: blur(14px);
            box-shadow: 0 18px 45px rgba(0, 0, 0, 0.18);
        }

        .site-nav {
            width: min(1180px, calc(100% - 2rem));
            margin: 0 auto;
            min-height: 72px;
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 1rem;
        }

        .brand {
            display: inline-flex;
            align-items: center;
            gap: 0.75rem;
            color: #fff;
            text-decoration: none;
            font-weight: 900;
            font-size: 1.15rem;
            text-transform: uppercase;
        }

        .brand-mark {
            width: 38px;
            height: 38px;
            border-radius: 8px;
            display: inline-flex;
            align-items: center;
            justify-content: center;
            background: var(--gold);
            color: var(--stage-navy);
            box-shadow: inset 0 -4px 0 rgba(0, 0, 0, 0.14);
        }

        .nav-actions {
            display: flex;
            align-items: center;
            gap: 0.85rem;
        }

        .nav-link {
            color: rgba(255, 255, 255, 0.84);
            text-decoration: none;
            font-weight: 700;
            font-size: 0.95rem;
        }

        .nav-link:hover {
            color: #fff;
        }

        .button {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            gap: 0.55rem;
            min-height: 46px;
            padding: 0 1.2rem;
            border: 0;
            border-radius: 999px;
            text-decoration: none;
            font-weight: 800;
            line-height: 1;
            transition: transform 0.2s ease, box-shadow 0.2s ease, background 0.2s ease;
        }

        .button-primary {
            background: var(--feud-red);
            color: #fff;
            box-shadow: 0 16px 34px rgba(196, 18, 32, 0.28);
        }

        .button-primary:hover {
            background: #a90f1b;
            transform: translateY(-2px);
            box-shadow: 0 20px 42px rgba(196, 18, 32, 0.36);
        }

        .button-secondary {
            color: #fff;
            border: 1px solid rgba(255, 255, 255, 0.55);
            background: rgba(255, 255, 255, 0.1);
        }

        .button-secondary:hover {
            background: rgba(255, 255, 255, 0.18);
            transform: translateY(-2px);
        }

        .hero {
            min-height: 100vh;
            padding: 8.5rem 1rem 5rem;
            color: #fff;
            display: flex;
            align-items: center;
            position: relative;
            overflow: hidden;
            background:
                linear-gradient(90deg, rgba(3, 11, 28, 0.96) 0%, rgba(7, 26, 61, 0.86) 43%, rgba(7, 26, 61, 0.18) 100%),
                url("games/family_feud/assets/images/Family-Feud.jpg") center / cover no-repeat;
        }

        .hero::before {
            content: "";
            position: absolute;
            inset: 0;
            background-image:
                linear-gradient(rgba(255, 255, 255, 0.08) 1px, transparent 1px),
                linear-gradient(90deg, rgba(255, 255, 255, 0.08) 1px, transparent 1px);
            background-size: 52px 52px;
            mask-image: linear-gradient(90deg, #000 0%, rgba(0, 0, 0, 0.5) 52%, transparent 100%);
            opacity: 0.34;
        }

        .hero::after {
            content: "";
            position: absolute;
            left: 0;
            right: 0;
            bottom: 0;
            height: 7rem;
            background: linear-gradient(180deg, rgba(243, 246, 251, 0), #f3f6fb);
        }

        .hero-inner {
            width: min(1180px, 100%);
            margin: 0 auto;
            position: relative;
            z-index: 2;
            display: grid;
            grid-template-columns: minmax(0, 1.05fr) minmax(320px, 0.95fr);
            gap: 2.5rem;
            align-items: center;
        }

        .hero-copy {
            max-width: 690px;
        }

        .eyebrow {
            display: inline-flex;
            align-items: center;
            gap: 0.55rem;
            margin-bottom: 1rem;
            color: var(--gold);
            font-weight: 900;
            text-transform: uppercase;
            font-size: 0.82rem;
        }

        h1 {
            margin: 0;
            color: inherit;
            font-size: clamp(3.1rem, 7vw, 6.4rem);
            line-height: 0.92;
            font-weight: 900;
            text-transform: uppercase;
        }

        .hero-copy p {
            max-width: 650px;
            margin: 1.25rem 0 1.8rem;
            color: rgba(255, 255, 255, 0.9);
            font-size: 1.1rem;
        }

        .hero-actions {
            display: flex;
            flex-wrap: wrap;
            gap: 0.85rem;
        }

        .score-preview {
            justify-self: end;
            width: min(440px, 100%);
            border: 1px solid rgba(255, 255, 255, 0.18);
            border-radius: 8px;
            background: rgba(3, 11, 28, 0.64);
            box-shadow: 0 34px 80px rgba(0, 0, 0, 0.4);
            backdrop-filter: blur(10px);
            overflow: hidden;
        }

        .score-header {
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 1rem;
            background: linear-gradient(90deg, #0b3b82, #123f75);
            border-bottom: 4px solid var(--gold);
            font-weight: 900;
            text-transform: uppercase;
        }

        .score-header span:last-child {
            color: var(--gold);
        }

        .answer-board {
            display: grid;
            gap: 0.7rem;
            padding: 1rem;
        }

        .answer-row {
            display: grid;
            grid-template-columns: 42px 1fr 58px;
            align-items: center;
            min-height: 50px;
            border: 1px solid rgba(255, 255, 255, 0.16);
            border-radius: 8px;
            background: linear-gradient(90deg, rgba(15, 71, 153, 0.92), rgba(8, 39, 92, 0.92));
            overflow: hidden;
        }

        .answer-row span {
            padding: 0.8rem;
            font-weight: 800;
        }

        .answer-row .rank,
        .answer-row .points {
            text-align: center;
            background: rgba(0, 0, 0, 0.18);
            color: var(--gold);
        }

        .hero-badges {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 0.7rem;
            padding: 0 1rem 1rem;
        }

        .hero-badge {
            min-height: 76px;
            border-radius: 8px;
            background: rgba(255, 255, 255, 0.1);
            border: 1px solid rgba(255, 255, 255, 0.12);
            padding: 0.8rem;
        }

        .hero-badge strong {
            display: block;
            color: var(--gold);
            font-size: 1.35rem;
            line-height: 1;
        }

        .hero-badge span {
            display: block;
            margin-top: 0.4rem;
            color: rgba(255, 255, 255, 0.78);
            font-size: 0.8rem;
        }

        .section {
            width: min(1180px, calc(100% - 2rem));
            margin: 0 auto;
            padding: 4rem 0;
        }

        .section-heading {
            display: flex;
            justify-content: space-between;
            align-items: end;
            gap: 1rem;
            margin-bottom: 1.5rem;
        }

        .section-heading h2 {
            margin: 0;
            color: var(--stage-navy);
            font-size: clamp(1.9rem, 4vw, 3.1rem);
            line-height: 1;
        }

        .section-heading p {
            max-width: 500px;
            margin: 0;
            color: var(--muted);
        }

        .mode-grid {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 1rem;
        }

        .mode-card {
            display: grid;
            grid-template-columns: 104px 1fr;
            gap: 1rem;
            align-items: center;
            padding: 1.1rem;
            border-radius: 8px;
            background: var(--surface);
            border: 1px solid var(--line);
            box-shadow: 0 18px 45px rgba(15, 23, 42, 0.08);
        }

        .mode-card img {
            width: 104px;
            aspect-ratio: 1;
            object-fit: contain;
            border-radius: 8px;
            background: #eef4ff;
            padding: 0.75rem;
        }

        .mode-card h3 {
            margin: 0 0 0.35rem;
            color: var(--stage-navy);
            font-size: 1.18rem;
        }

        .mode-card p {
            margin: 0;
            color: var(--muted);
            font-size: 0.95rem;
        }

        .spotlight {
            display: grid;
            grid-template-columns: 0.9fr 1.1fr;
            gap: 2rem;
            align-items: center;
            padding: 2rem;
            border-radius: 8px;
            background: #fff;
            border: 1px solid var(--line);
            box-shadow: 0 22px 60px rgba(15, 23, 42, 0.1);
        }

        .spotlight-media {
            min-height: 380px;
            border-radius: 8px;
            background:
                linear-gradient(180deg, rgba(7, 26, 61, 0.1), rgba(7, 26, 61, 0.64)),
                url("games/family_feud/assets/images/logo.png") center / cover no-repeat;
            border: 1px solid #cbd5e1;
        }

        .spotlight-copy h2 {
            color: var(--stage-navy);
            font-size: clamp(2rem, 4vw, 3rem);
            line-height: 1.02;
            margin: 0 0 1rem;
        }

        .spotlight-copy p {
            color: var(--muted);
            margin-bottom: 1.5rem;
        }

        .mini-steps {
            display: grid;
            gap: 0.8rem;
            margin-bottom: 1.5rem;
        }

        .mini-step {
            display: grid;
            grid-template-columns: 38px 1fr;
            gap: 0.85rem;
            align-items: center;
            color: #334155;
        }

        .mini-step span {
            width: 38px;
            height: 38px;
            border-radius: 8px;
            display: inline-flex;
            align-items: center;
            justify-content: center;
            background: #e9f5f5;
            color: var(--teal);
            font-weight: 900;
        }

        footer {
            background: var(--stage-navy);
            color: rgba(255, 255, 255, 0.78);
            border-top: 4px solid var(--gold);
        }

        @media (max-width: 900px) {
            .hero-inner,
            .spotlight,
            .mode-grid {
                grid-template-columns: 1fr;
            }

            .score-preview {
                justify-self: stretch;
            }

            .section-heading {
                display: block;
            }

            .section-heading p {
                margin-top: 0.7rem;
            }
        }

        @media (max-width: 620px) {
            .site-nav {
                min-height: 64px;
            }

            .brand {
                font-size: 0.98rem;
            }

            .nav-link {
                display: none;
            }

            .hero {
                padding-top: 7.5rem;
            }

            .hero-actions,
            .button {
                width: 100%;
            }

            .hero-badges,
            .mode-card {
                grid-template-columns: 1fr;
            }

            .mode-card img {
                width: 86px;
            }

            .spotlight {
                padding: 1rem;
            }

            .spotlight-media {
                min-height: 240px;
            }
        }
    </style>
</head>
<body>
    <header class="site-header">
        <nav class="site-nav">
            <a href="index.php" class="brand">
                <span class="brand-mark"><i class="fas fa-gamepad"></i></span>
                Family Feud Portal
            </a>
            <div class="nav-actions">
                <a href="#modes" class="nav-link">Modes</a>
                <a href="#play" class="nav-link">How It Plays</a>
                <a href="login.php" class="button button-primary">Get Started</a>
            </div>
        </nav>
    </header>

    <main>
        <section class="hero">
            <div class="hero-inner">
                <div class="hero-copy">
                    <span class="eyebrow"><i class="fas fa-bolt"></i> Survey answers. Fast rounds. Big reactions.</span>
                    <h1>Family Feud Game Portal</h1>
                    <p>Enter a game-show style trivia arena where every question has a crowd favorite answer. Play solo, face off with a friend, or jump in as a guest when you just want the fun.</p>
                    <div class="hero-actions">
                        <a href="login.php" class="button button-primary"><i class="fas fa-play"></i> Start Playing</a>
                        <a href="#play" class="button button-secondary"><i class="fas fa-circle-info"></i> See The Game</a>
                    </div>
                </div>

                <aside class="score-preview" aria-label="Family Feud score preview">
                    <div class="score-header">
                        <span>Top Answers</span>
                        <span>Round 1</span>
                    </div>
                    <div class="answer-board">
                        <div class="answer-row">
                            <span class="rank">1</span>
                            <span>Pizza</span>
                            <span class="points">20</span>
                        </div>
                        <div class="answer-row">
                            <span class="rank">2</span>
                            <span>Movie Night</span>
                            <span class="points">15</span>
                        </div>
                        <div class="answer-row">
                            <span class="rank">3</span>
                            <span>Road Trip</span>
                            <span class="points">8</span>
                        </div>
                        <div class="answer-row">
                            <span class="rank">4</span>
                            <span>Beach Day</span>
                            <span class="points">5</span>
                        </div>
                    </div>
                    <div class="hero-badges">
                        <div class="hero-badge">
                            <strong>3</strong>
                            <span>Main rounds</span>
                        </div>
                        <div class="hero-badge">
                            <strong>2</strong>
                            <span>Game modes</span>
                        </div>
                        <div class="hero-badge">
                            <strong>100</strong>
                            <span>Survey style</span>
                        </div>
                    </div>
                </aside>
            </div>
        </section>

        <section class="section" id="modes">
            <div class="section-heading">
                <h2>Choose Your Match</h2>
                <p>Family Feud is structured for quick play, whether you want a solo score chase or a louder head-to-head round.</p>
            </div>
            <div class="mode-grid">
                <article class="mode-card">
                    <img src="games/family_feud/assets/images/singlePlayer.png" alt="Single player icon">
                    <div>
                        <h3>Single Player</h3>
                        <p>Clear each survey board, collect points, and push through all three rounds before the mistakes catch up.</p>
                    </div>
                </article>
                <article class="mode-card">
                    <img src="games/family_feud/assets/images/2_player.png" alt="Two player icon">
                    <div>
                        <h3>Two Player</h3>
                        <p>Enter family names, buzz in, steal answers, and race to control the board with a friend.</p>
                    </div>
                </article>
            </div>
        </section>

        <section class="section" id="play">
            <div class="spotlight">
                <div class="spotlight-media" role="img" aria-label="Family Feud game logo"></div>
                <div class="spotlight-copy">
                    <h2>Built like a game-show night.</h2>
                    <p>The portal keeps the entry simple: sign in if you want profile and points tracking, or use Play as Guest from the login screen to get straight to the board.</p>
                    <div class="mini-steps">
                        <div class="mini-step">
                            <span>1</span>
                            <strong>Pick a mode and enter the round.</strong>
                        </div>
                        <div class="mini-step">
                            <span>2</span>
                            <strong>Guess the top survey answers before time runs out.</strong>
                        </div>
                        <div class="mini-step">
                            <span>3</span>
                            <strong>Stack points and climb the leaderboard.</strong>
                        </div>
                    </div>
                    <a href="login.php" class="button button-primary"><i class="fas fa-arrow-right"></i> Get Started</a>
                </div>
            </div>
        </section>
    </main>

    <footer>
        <p>&copy; 2024 Family Feud Game Portal. All rights reserved.</p>
    </footer>
</body>
</html>
