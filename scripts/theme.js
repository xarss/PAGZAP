const themes = {
    light: {
        name      : "light",
        iconName  : "light_mode",
        text      : "#000000",
        foreground: "#0dc142",
        background: "#EEF7F7",
        backextra : "#EEF7F7",
        foreextra : "#d8e0e0",
        error     : "#ce3957"
    },
    dark : {
        name      : "dark",
        iconName  : "dark_mode",
        text      : "#F0F0F0",
        foreground: "#0dc142",
        foreextra: "#2d2c2c",
        background: "#0d0d0d",
        backextra : "#1d1d1d",
        error     : "#ce3957"
    }
}

var style = document.querySelector(':root');

var currentTheme = themes.light
if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    currentTheme = themes.dark
}

function switchTheme() {
    currentTheme = currentTheme.name === themes.dark.name ? themes.light : themes.dark;
    refreshTheme()
}

function refreshTheme() {
    document.documentElement.style.setProperty("--background", currentTheme.background);
    document.documentElement.style.setProperty("--backextra", currentTheme.backextra);

    document.documentElement.style.setProperty("--foreground", currentTheme.foreground);
    document.documentElement.style.setProperty("--foreextra", currentTheme.foreextra);

    document.documentElement.style.setProperty("--text", currentTheme.text);
    
    document.documentElement.style.setProperty("--error", currentTheme.error);
    
    // This part changes the icons for the theme buttons. This should be done differently in each project
    document.getElementsByName("themeButton").forEach(element => element.innerHTML = currentTheme.iconName)
}

// --- On Startup
refreshTheme();