// DOM Elements
const settingsBtn = document.getElementById('settingsBtn');
const settingsModal = document.getElementById('settingsModal');
const modalExitButton = document.querySelector('.modal-exit-button');
const darkModeToggle = document.getElementById('darkModeToggle');
const animationsToggle = document.getElementById('animationsToggle');
const qualitySelect = document.getElementById('qualitySelect');
const saveSettingsBtn = document.getElementById('saveSettings');
const resetSettingsBtn = document.getElementById('resetSettings');
const searchInput = document.querySelector('.search input');
const gameCards = document.querySelectorAll('.game-card');
const playFeaturedGameBtn = document.getElementById('playFeaturedGame');
const accountButton = document.querySelector('.account-button');
const dropdownMenu = document.querySelector('.dropdown-menu');

// Settings state
let settings = {
    darkMode: false,
    animations: true,
    quality: 'medium'
};

// Load settings from localStorage
function loadSettings() {
    const savedSettings = localStorage.getItem('gameLibrarySettings');
    if (savedSettings) {
        settings = JSON.parse(savedSettings);
        applySettings();
    }
}

// Save settings to localStorage
function saveSettings() {
    localStorage.setItem('gameLibrarySettings', JSON.stringify(settings));
    showToast('Settings saved successfully!');
}

// Apply settings to the UI
function applySettings() {
    // Dark mode
    if (settings.darkMode) {
        document.body.classList.add('dark-mode');
    } else {
        document.body.classList.remove('dark-mode');
    }
    darkModeToggle.checked = settings.darkMode;

    // Animations
    if (!settings.animations) {
        document.body.classList.add('animations-disabled');
    } else {
        document.body.classList.remove('animations-disabled');
    }
    animationsToggle.checked = settings.animations;

    // Quality
    qualitySelect.value = settings.quality;
    document.body.setAttribute('data-quality', settings.quality);
}

// Show toast notification
function showToast(message, type = 'success') {
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.textContent = message;
    document.body.appendChild(toast);

    setTimeout(() => {
        toast.classList.add('show');
    }, 100);

    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => {
            document.body.removeChild(toast);
        }, 300);
    }, 3000);
}

// Modal functions
function openModal(modal) {
    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
}

function closeModal(modal) {
    modal.classList.add('closing');
    setTimeout(() => {
        modal.style.display = 'none';
        modal.classList.remove('closing');
        document.body.style.overflow = '';
    }, 300);
}

// Search functionality
function filterGames(searchTerm) {
    searchTerm = searchTerm.toLowerCase();
    gameCards.forEach(card => {
        const title = card.querySelector('h3').textContent.toLowerCase();
        const description = card.querySelector('.game-description').textContent.toLowerCase();
        const category = card.querySelector('.category').textContent.toLowerCase();

        if (title.includes(searchTerm) || description.includes(searchTerm) || category.includes(searchTerm)) {
            card.style.display = '';
        } else {
            card.style.display = 'none';
        }
    });
}

// Event Listeners
settingsBtn.addEventListener('click', () => openModal(settingsModal));
modalExitButton.addEventListener('click', () => closeModal(settingsModal));

// Close modal when clicking outside
settingsModal.addEventListener('click', (e) => {
    if (e.target === settingsModal) {
        closeModal(settingsModal);
    }
});

// Settings changes
darkModeToggle.addEventListener('change', () => {
    settings.darkMode = darkModeToggle.checked;
    applySettings();
});

animationsToggle.addEventListener('change', () => {
    settings.animations = animationsToggle.checked;
    applySettings();
});

qualitySelect.addEventListener('change', () => {
    settings.quality = qualitySelect.value;
    applySettings();
});

saveSettingsBtn.addEventListener('click', () => {
    saveSettings();
    closeModal(settingsModal);
});

resetSettingsBtn.addEventListener('click', () => {
    settings = {
        darkMode: false,
        animations: true,
        quality: 'medium'
    };
    applySettings();
    showToast('Settings reset to default');
});

// Search input
searchInput.addEventListener('input', (e) => {
    filterGames(e.target.value);
});

// Account dropdown
accountButton.addEventListener('click', () => {
    dropdownMenu.classList.toggle('show');
});

// Close dropdown when clicking outside
document.addEventListener('click', (e) => {
    if (!e.target.closest('.user-account')) {
        dropdownMenu.classList.remove('show');
    }
});

// Game card hover effects
gameCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
        if (settings.animations) {
            card.style.transform = 'translateY(-5px)';
        }
    });

    card.addEventListener('mouseleave', () => {
        if (settings.animations) {
            card.style.transform = 'translateY(0)';
        }
    });
});

// Play featured game
playFeaturedGameBtn.addEventListener('click', () => {
    const featuredGame = document.querySelector('.game-card[data-game="family-feud"]');
    if (featuredGame) {
        const playButton = featuredGame.querySelector('.play-button');
        playButton.click();
    }
});

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    loadSettings();
}); 
