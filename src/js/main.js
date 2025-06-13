// Theme switching functionality
console.log('Theme switcher script loaded');

document.addEventListener('DOMContentLoaded', () => {
  console.log('DOM fully loaded');
  
  const themeToggle = document.getElementById('theme-toggle');
  const html = document.documentElement;
  const THEME_KEY = 'theme-preference';
  
  console.log('Theme toggle element:', themeToggle);
  
  // Initialize theme from localStorage or system preference
  const savedTheme = localStorage.getItem(THEME_KEY);
  const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  
  console.log('Saved theme:', savedTheme);
  console.log('System prefers dark:', systemPrefersDark);
  
  // Set initial theme
  if (savedTheme) {
    html.setAttribute('data-theme', savedTheme);
    console.log('Set theme from localStorage:', savedTheme);
  } else if (systemPrefersDark) {
    html.setAttribute('data-theme', 'dark');
    console.log('Set theme to dark (system preference)');
  } else {
    html.setAttribute('data-theme', 'light');
    console.log('Set theme to light (default)');
  }
  
  // Handle theme toggle click
  if (themeToggle) {
    console.log('Adding click event listener to theme toggle');
    
    themeToggle.addEventListener('click', (e) => {
      console.log('Theme toggle clicked');
      e.preventDefault();
      e.stopPropagation();
      
      const currentTheme = html.getAttribute('data-theme');
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      
      console.log('Current theme:', currentTheme, 'New theme:', newTheme);
      
      // Update the theme
      html.setAttribute('data-theme', newTheme);
      localStorage.setItem(THEME_KEY, newTheme);
      
      console.log('Theme updated to:', newTheme);
      
      // Update ARIA label for accessibility
      themeToggle.setAttribute('aria-label', `Toggle ${currentTheme === 'dark' ? 'light' : 'dark'} mode`);
      
      // Force a repaint
      document.body.offsetHeight;
    });
  } else {
    console.error('Theme toggle button not found!');
  }
  
  // Listen for system theme changes
  const colorSchemeQuery = window.matchMedia('(prefers-color-scheme: dark)');
  const handleColorSchemeChange = (e) => {
    if (!localStorage.getItem(THEME_KEY)) { // Only if user hasn't set a preference
      const newTheme = e.matches ? 'dark' : 'light';
      console.log('System color scheme changed, setting theme to:', newTheme);
      html.setAttribute('data-theme', newTheme);
    }
  };
  
  colorSchemeQuery.addEventListener('change', handleColorSchemeChange);
  
  console.log('Theme switcher initialized');
});