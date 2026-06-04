<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Family Feud Game Portal</title>
    <link rel="stylesheet" href="public/assets/css/style.css">
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css">
    <style>
        body {
            background: #f5f7fb;
        }

        .landing-header {
            background: rgba(255, 255, 255, 0.94);
            box-shadow: 0 10px 30px rgba(17, 24, 39, 0.08);
            backdrop-filter: blur(12px);
        }

        .landing-nav {
            max-width: 1180px;
            margin: 0 auto;
            padding: 0 1.5rem;
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 1rem;
        }

        .brand {
            display: flex;
            align-items: center;
            gap: 0.7rem;
            color: #172554;
            text-decoration: none;
            font-weight: 800;
            font-size: 1.25rem;
        }

        .brand i {
            color: #c1121f;
        }

        .nav-actions {
            display: flex;
            align-items: center;
            gap: 0.75rem;
        }

        .nav-link {
            color: #1f2937;
            text-decoration: none;
            font-weight: 600;
        }

        .nav-cta,
        .landing-button {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            gap: 0.55rem;
            border: 0;
            border-radius: 999px;
            background: #c1121f;
            color: #fff;
            text-decoration: none;
            font-weight: 700;
            box-shadow: 0 14px 30px rgba(193, 18, 31, 0.24);
            transition: transform 0.2s ease, box-shadow 0.2s ease, background 0.2s ease;
        }

        .nav-cta {
            padding: 0.75rem 1.15rem;
        }

        .landing-button {
            padding: 1rem 1.35rem;
        }

        .nav-cta:hover,
        .landing-button:hover {
            background: #a30f1a;
            transform: translateY(-2px);
            box-shadow: 0 18px 34px rgba(193, 18, 31, 0.3);
        }

        .landing-hero {
            min-height: calc(100vh - 72px);
            padding: 8.5rem 1.5rem 5rem;
            color: #fff;
            background:
                linear-gradient(90deg, rgba(5, 18, 45, 0.9) 0%, rgba(5, 18, 45, 0.72) 42%, rgba(5, 18, 45, 0.28) 100%),
                url("games/family_feud/assets/images/Family-Feud.jpg") center / cover no-repeat;
            display: flex;
            align-items: center;
            position: relative;
        }

        .landing-hero::after {
            content: "";
            position: absolute;
            left: 0;
            right: 0;
            bottom: 0;
            height: 6rem;
            background: linear-gradient(180deg, rgba(245, 247, 251, 0), #f5f7fb);
        }

        .hero-inner {
            width: min(1180px, 100%);
            margin: 0 auto;
            position: relative;
            z-index: 1;
        }

        .hero-copy {
            max-width: 680px;
        }

        .hero-kicker {
            display: inline-flex;
            align-items: center;
            gap: 0.5rem;
            margin-bottom: 1.1rem;
            color: #fbbf24;
            font-weight: 700;
            text-transform: uppercase;
            letter-spacing: 0.08em;
            font-size: 0.86rem;
        }

        .landing-hero h1 {
            margin: 0 0 1rem;
            font-size: clamp(2.6rem, 6vw, 5.4rem);
            line-height: 0.98;
            letter-spacing: 0;
        }

        .landing-hero p {
            margin: 0 0 1.8rem;
            max-width: 620px;
            color: rgba(255, 255, 255, 0.9);
            font-size: 1.08rem;
        }

        .hero-actions {
            display: flex;
            flex-wrap: wrap;
            gap: 0.85rem;
        }

        .secondary-button {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            gap: 0.55rem;
            padding: 1rem 1.35rem;
            border-radius: 999px;
            border: 1px solid rgba(255, 255, 255, 0.55);
            color: #fff;
            text-decoration: none;
            font-weight: 700;
            background: rgba(255, 255, 255, 0.1);
            backdrop-filter: blur(8px);
        }

        .landing-section {
            max-width: 1180px;
            margin: -2.25rem auto 0;
            padding: 0 1.5rem 4rem;
            position: relative;
            z-index: 2;
        }

        .feature-panel {
            display: grid;
            grid-template-columns: 1.05fr 0.95fr;
            gap: 2rem;
            align-items: center;
            background: #fff;
            border: 1px solid #e5e7eb;
            border-radius: 8px;
            box-shadow: 0 20px 60px rgba(15, 23, 42, 0.12);
            overflow: hidden;
        }

        .feature-copy {
            padding: 2rem;
        }

        .feature-copy h2 {
            color: #172554;
            font-size: clamp(1.8rem, 3vw, 2.6rem);
            line-height: 1.08;
            margin-bottom: 0.85rem;
        }

        .feature-copy p {
            color: #4b5563;
            margin-bottom: 1.3rem;
        }

        .feature-stats {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 0.75rem;
            margin-top: 1.5rem;
        }

        .stat {
            border: 1px solid #e5e7eb;
            border-radius: 8px;
            padding: 0.85rem;
            background: #f8fafc;
        }

        .stat strong {
            display: block;
            color: #c1121f;
            font-size: 1.25rem;
        }

        .stat span {
            color: #475569;
            font-size: 0.86rem;
        }

        .feature-image {
            width: 100%;
            height: 100%;
            min-height: 360px;
            object-fit: cover;
        }

        @media (max-width: 780px) {
            .landing-nav {
                padding: 0 1rem;
            }

            .nav-link {
                display: none;
            }

            .landing-hero {
                padding-top: 7rem;
                align-items: flex-start;
            }

            .feature-panel,
            .feature-stats {
                grid-template-columns: 1fr;
            }

            .feature-image {
                min-height: 230px;
                order: -1;
            }
        }
    </style>
</head>
<body>
    <header class="landing-header">
        <nav class="landing-nav">
            <a href="index.php" class="brand">
                <i class="fas fa-gamepad"></i>
                Family Feud Portal
            </a>
            <div class="nav-actions">
                <a href="#game" class="nav-link">Game</a>
                <a href="login.php" class="nav-cta">Get Started</a>
            </div>
        </nav>
    </header>

    <main>
        <section class="landing-hero">
            <div class="hero-inner">
                <div class="hero-copy">
                    <span class="hero-kicker"><i class="fas fa-bolt"></i> Survey answers, fast rounds, bragging rights</span>
                    <h1>Family Feud Game Portal</h1>
                    <p>Step into a fast party trivia game built around everyday survey questions. Play solo, challenge another player, and chase the top answers across multiple rounds.</p>
                    <div class="hero-actions">
                        <a href="login.php" class="landing-button"><i class="fas fa-arrow-right"></i> Get Started</a>
                        <a href="#game" class="secondary-button"><i class="fas fa-circle-info"></i> View Game</a>
                    </div>
                </div>
            </div>
        </section>

        <section class="landing-section" id="game">
            <div class="feature-panel">
                <div class="feature-copy">
                    <h2>Guess the answers everyone else is thinking.</h2>
                    <p>Family Feud turns familiar questions into quick, tense rounds. Log in to keep your player profile, or use Play as Guest on the login page when you just want to jump in.</p>
                    <a href="login.php" class="landing-button"><i class="fas fa-play"></i> Play Family Feud</a>
                    <div class="feature-stats">
                        <div class="stat">
                            <strong>3</strong>
                            <span>Main rounds</span>
                        </div>
                        <div class="stat">
                            <strong>2</strong>
                            <span>Play modes</span>
                        </div>
                        <div class="stat">
                            <strong>100</strong>
                            <span>Survey style</span>
                        </div>
                    </div>
                </div>
                <img src="games/family_feud/assets/images/logo.png" alt="Family Feud logo" class="feature-image">
            </div>
        </section>
    </main>

    <footer>
        <p>&copy; 2024 Family Feud Game Portal. All rights reserved.</p>
    </footer>
</body>
</html>
