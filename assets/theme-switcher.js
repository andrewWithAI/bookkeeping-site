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
        // Add a class to the body for dark mode
        document.body.classList.add('dark-mode');
        
        // Apply light text color to all text elements
        const textElements = [
            'p', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'a', 'span', 'li', 'label',
            '.service-item', '.stat-item', '.card-content', '.content-inner',
            '.section-text', '.section-intro', '.profession', '.tagline',
            '.contact-details p', '.contact-details h4', '.stat-label',
            '.footer-logo p', '.copyright p', '.nav-menu a'
        ];
        
        // Set light text color for all text elements
        document.querySelectorAll(textElements.join(', ')).forEach(el => {
            el.style.color = '#f5f5f5';
        });
        
        // Set white color for headings and important elements
        document.querySelectorAll('.service-item h3, .card-title, .section-title, .stat-number, .logo h1, .tagline, .footer-logo h2').forEach(el => {
            el.style.color = '#ffffff';
        });
        
        // Ensure form inputs have proper contrast
        document.querySelectorAll('input, textarea').forEach(el => {
            if (!el.closest('.split-form')) { // Don't change inputs in the contact form that already have styling
                el.style.color = '#f5f5f5';
                el.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
                el.style.borderColor = 'rgba(255, 255, 255, 0.2)';
            }
        });
    } else {
        // Remove dark mode class
        document.body.classList.remove('dark-mode');
        
        // Reset all inline styles when switching away from dark mode
        const allElements = [
            'p', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'a', 'span', 'li', 'label',
            '.service-item', '.stat-item', '.card-content', '.content-inner',
            '.section-text', '.section-intro', '.profession', '.tagline',
            '.contact-details p', '.contact-details h4', '.stat-label',
            '.footer-logo p', '.copyright p', '.nav-menu a',
            '.service-item h3', '.card-title', '.section-title', '.stat-number',
            '.logo h1', '.tagline', '.footer-logo h2', 'input', 'textarea'
        ];
        
        document.querySelectorAll(allElements.join(', ')).forEach(el => {
            el.style.color = '';
            el.style.backgroundColor = '';
            el.style.borderColor = '';
        });
    }
}

// Get color schemes directly (avoiding CORS issues with file:// protocol)
function loadColorSchemes() {
    // Return a promise to maintain the same interface
    return Promise.resolve([
        {
            "id": "default",
            "name": "Default Blue",
            "colors": {
                "primary": "#0f4c81",
                "secondary": "#3a7ca5",
                "accent": "#16c79a",
                "dark": "#2c3e50",
                "light": "#f6f9fc",
                "text": "#333333",
                "white": "#ffffff"
            }
        },
        {
            "id": "purple",
            "name": "Modern Purple",
            "colors": {
                "primary": "#5e3b73",
                "secondary": "#9d65c9",
                "accent": "#d789d7",
                "dark": "#2d2b3a",
                "light": "#f8f5fd",
                "text": "#333333",
                "white": "#ffffff"
            }
        },
        {
            "id": "green",
            "name": "Nature Green",
            "colors": {
                "primary": "#2e7d32",
                "secondary": "#4caf50",
                "accent": "#8bc34a",
                "dark": "#1b5e20",
                "light": "#f1f8e9",
                "text": "#333333",
                "white": "#ffffff"
            }
        },
        {
            "id": "dark",
            "name": "Dark Mode",
            "colors": {
                "primary": "#121212",
                "secondary": "#2d2d2d",
                "accent": "#bb86fc",
                "dark": "#000000",
                "light": "#2a2a2a",
                "text": "#f5f5f5",
                "white": "#ffffff"
            }
        },
        {
            "id": "warm",
            "name": "Warm Sunset",
            "colors": {
                "primary": "#e65100",
                "secondary": "#f57c00",
                "accent": "#ffb74d",
                "dark": "#bf360c",
                "light": "#fff8e1",
                "text": "#333333",
                "white": "#ffffff"
            }
        }
    ]);
}

// Initialize theme switcher
async function initThemeSwitcher() {
    const colorSchemes = await loadColorSchemes();
    const selectedThemeId = getTheme();
    
    // Find the selected theme data
    const selectedTheme = colorSchemes.find(scheme => scheme.id === selectedThemeId) || colorSchemes[0];
    
    // Apply the selected theme
    applyTheme(selectedTheme);
    
    // Set up the theme selector
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
    backButton.href = '../index.html';
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