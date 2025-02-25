// Theme Switcher Functionality

// Store the selected theme in localStorage
function setTheme(themeId) {
    localStorage.setItem('selectedTheme', themeId);
}

// Get the selected theme from localStorage
function getTheme() {
    return localStorage.getItem('selectedTheme') || 'default';
}

// Apply theme colors to CSS variables
function applyTheme(themeData) {
    const root = document.documentElement;
    
    // Set CSS variables based on theme colors
    root.style.setProperty('--primary-color', themeData.colors.primary);
    root.style.setProperty('--secondary-color', themeData.colors.secondary);
    root.style.setProperty('--accent-color', themeData.colors.accent);
    root.style.setProperty('--dark-color', themeData.colors.dark);
    root.style.setProperty('--light-color', themeData.colors.light);
    root.style.setProperty('--text-color', themeData.colors.text);
    root.style.setProperty('--white', themeData.colors.white);
    
    // Additional variables for specific designs
    root.style.setProperty('--gradient-start', themeData.colors.primary);
    root.style.setProperty('--gradient-end', themeData.colors.secondary);
    
    // Special handling for dark mode to ensure text contrast
    if (themeData.id === 'dark') {
        // Ensure text is visible on dark backgrounds
        document.querySelectorAll('.service-item, .stat-item, .card-content, .content-inner').forEach(el => {
            el.style.color = '#f5f5f5';
        });
        
        document.querySelectorAll('.service-item h3, .card-title, .section-title, .stat-number').forEach(el => {
            el.style.color = '#ffffff';
        });
    } else {
        // Reset any inline styles when switching away from dark mode
        document.querySelectorAll('.service-item, .stat-item, .card-content, .content-inner, .service-item h3, .card-title, .section-title, .stat-number').forEach(el => {
            el.style.color = '';
        });
    }
}

// Load color schemes from JSON file
async function loadColorSchemes() {
    try {
        const response = await fetch('/assets/color-schemes.json');
        const data = await response.json();
        return data.schemes;
    } catch (error) {
        console.error('Error loading color schemes:', error);
        return [];
    }
}

// Initialize theme switcher
async function initThemeSwitcher() {
    const colorSchemes = await loadColorSchemes();
    const selectedThemeId = getTheme();
    
    // Find the selected theme data
    const selectedTheme = colorSchemes.find(scheme => scheme.id === selectedThemeId) || colorSchemes[0];
    
    // Apply the selected theme
    applyTheme(selectedTheme);
    
    // If we're on the main index page, populate the theme selector
    const themeSelector = document.getElementById('themeSelector');
    if (themeSelector) {
        // Clear existing options
        themeSelector.innerHTML = '';
        
        // Add options for each color scheme
        colorSchemes.forEach(scheme => {
            const option = document.createElement('option');
            option.value = scheme.id;
            option.textContent = scheme.name;
            option.selected = scheme.id === selectedThemeId;
            themeSelector.appendChild(option);
        });
        
        // Add event listener to theme selector
        themeSelector.addEventListener('change', async function() {
            const newThemeId = this.value;
            setTheme(newThemeId);
            
            // Find and apply the new theme
            const newTheme = colorSchemes.find(scheme => scheme.id === newThemeId);
            if (newTheme) {
                applyTheme(newTheme);
            }
        });
    }
    
    // Add back to home button if not on the main index page
    if (!window.location.pathname.endsWith('index.html') || window.location.pathname.includes('/design')) {
        addBackToHomeButton();
    }
}

// Add back to home button
function addBackToHomeButton() {
    // Create the button element
    const backButton = document.createElement('a');
    backButton.href = '/index.html';
    backButton.className = 'back-to-home';
    backButton.innerHTML = '<i class="fas fa-home"></i>';
    backButton.title = 'Back to Home';
    
    // Create and add styles for the button
    const style = document.createElement('style');
    style.textContent = `
        .back-to-home {
            position: fixed;
            bottom: 20px;
            left: 20px;
            width: 50px;
            height: 50px;
            background-color: var(--primary-color);
            color: var(--white);
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            text-decoration: none;
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
            z-index: 1000;
            transition: all 0.3s ease;
        }
        
        .back-to-home:hover {
            transform: translateY(-5px);
            box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
            background-color: var(--accent-color);
        }
    `;
    
    // Add the style and button to the document
    document.head.appendChild(style);
    document.body.appendChild(backButton);
}

// Initialize when the DOM is loaded
document.addEventListener('DOMContentLoaded', initThemeSwitcher);