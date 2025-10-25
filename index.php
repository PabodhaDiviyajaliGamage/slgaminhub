<?php
session_start(); // Start session for login system
?>
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>SL Gaming Hub - Buy Gaming Diamonds</title>

    <!-- Bootstrap 5 CSS -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet" />

    <!-- Font Awesome for Icons -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" />

    <!-- Google Fonts -->
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700;800&display=swap" rel="stylesheet" />

    <!-- Custom CSS -->
    <link rel="stylesheet" href="./assets/style.css" />
</head>

<body>
    <!-- Navbar Section -->
    <nav class="navbar navbar-expand-lg navbar-dark fixed-top">
        <div class="container-fluid px-4">
            <a class="navbar-brand d-flex align-items-center" href="index.php">
                <img src="./assets/log.jpeg" alt="SL Gaming Hub Logo" class="logo-img" />
                <span class="brand-text ms-2">SL Gaming Hub</span>
            </a>

            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
                <span class="navbar-toggler-icon"></span>
            </button>

            <div class="collapse navbar-collapse" id="navbarNav">
                <ul class="navbar-nav ms-auto align-items-center">
                    <?php if(isset($_SESSION['user'])): ?>
                    <li class="nav-item">
                        <a class="nav-link active" href="logout.php">Logout (<?= $_SESSION['user'] ?>)</a>
                    </li>
                    <?php else: ?>
                    <li class="nav-item">
                        <a class="nav-link active" href="login.php">Login</a>
                    </li>
                    <?php endif; ?>
                </ul>
            </div>
        </div>
    </nav>

    <!-- Hero Section -->
    <section class="hero-section" id="home">
        <div class="hero-banner-wrapper">
            <img src="./assets/banner.jpg" alt="Gaming Hero Banner" class="hero-banner-image" />
            <div class="hero-overlay"></div>
        </div>
    </section>

    <!-- Games Section -->
    <section class="games-section" id="games">
        <div class="container">
            <div class="section-header text-center mb-5">
                <p class="section-description">
                    Select your favorite game and top up instantly with secure payment
                </p>
            </div>

            <div class="row g-4 justify-content-center">
                <!-- Free Fire SG -->
                <div class="col-lg-4 col-md-6">
                    <div class="game-card" data-game="freefire-sg">
                        <div class="game-card-image">
                            <img src="./assets/FreeFire.jpg" />
                            <div class="game-card-overlay">
                                <div class="game-card-badge badge-global">
                                    <i class="fas fa-globe"></i><span>SG</span>
                                </div>
                            </div>
                        </div>
                        <div class="game-card-content">
                            <h3 class="game-card-title">Free Fire (SG)</h3>
                            <p class="game-card-description">Global server top-up</p>
                            <ul class="game-features">
                                <li><i class="fas fa-check-circle"></i> Instant Delivery</li>
                                <li><i class="fas fa-check-circle"></i> 24/7 Support</li>
                            </ul>
                            <a href="freefire-sg.php" class="btn-topup"><span>Top Up Now</span><i
                                    class="fas fa-arrow-right"></i></a>
                        </div>
                    </div>
                </div>

                <!-- Free Fire Indonesia -->
                <div class="col-lg-4 col-md-6">
                    <div class="game-card featured" data-game="freefire-indonesia">
                        <div class="game-card-image">
                            <img src="./assets/FreeFire.jpg" />
                            <div class="game-card-overlay">
                                <div class="game-card-badge badge-featured">
                                    <i class="fas fa-star"></i><span>Featured</span>
                                </div>
                            </div>
                        </div>
                        <div class="game-card-content">
                            <h3 class="game-card-title">Free Fire (Indonesia)</h3>
                            <p class="game-card-description">Fastest processing time</p>
                            <ul class="game-features">
                                <li><i class="fas fa-check-circle"></i> Instant Delivery</li>
                                <li><i class="fas fa-check-circle"></i> Best Rates</li>
                            </ul>
                            <a href="freefire-indonesia.php" class="btn-topup"><span>Top Up Now</span><i
                                    class="fas fa-arrow-right"></i></a>
                        </div>
                    </div>
                </div>

                <!-- PUBG -->
                <div class="col-lg-4 col-md-6">
                    <div class="game-card" data-game="pubg-mobile">
                        <div class="game-card-image">
                            <img src="./assets/PBG.png" />
                            <div class="game-card-overlay">
                                <div class="game-card-badge badge-global">
                                    <i class="fas fa-globe"></i><span>Global</span>
                                </div>
                            </div>
                        </div>
                        <div class="game-card-content">
                            <h3 class="game-card-title">PUBG Mobile (Global)</h3>
                            <p class="game-card-description">UC & Elite Pass</p>
                            <ul class="game-features">
                                <li><i class="fas fa-check-circle"></i> All Regions</li>
                                <li><i class="fas fa-check-circle"></i> Fast Process</li>
                            </ul>
                            <a href="pubg-mobile.php" class="btn-topup"><span>Top Up Now</span><i
                                    class="fas fa-arrow-right"></i></a>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    </section>

    <!-- Payment Support Section -->
    <?php include "payment-support.php"; ?>

    <!-- Footer -->
    <?php include "footer.php"; ?>

    <!-- Scripts -->
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
    <script src="./assets/script.js"></script>
</body>

</html>