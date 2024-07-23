
function initialize() {
    setMinDateTime()
    applyTheme(() => { return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'; });
}

function applyTheme(theme) {
    theme === 'light' ? document.documentElement.removeAttribute('data-theme') : document.documentElement.setAttribute('data-theme', 'dark');

}

function toggleTheme() {
    document.documentElement.getAttribute('data-theme') === 'dark' ? document.documentElement.removeAttribute('data-theme') : document.documentElement.setAttribute('data-theme', 'dark')
}


document.addEventListener('DOMContentLoaded', initialize);