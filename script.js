function toggleTheme() {
    document.documentElement.getAttribute('data-theme') === 'dark' ? document.documentElement.removeAttribute('data-theme') : document.documentElement.setAttribute('data-theme', 'dark')
}

function toggleNavbar() {
    var navbar = document.getElementById("navbar");
    navbar.classList.toggle("expanded");
}

function showSearch() {
    document.querySelector('.plus-content').style.display = 'none';
    toggleContent('.search-content')
}

function showPlus() {
    document.querySelector('.search-content').style.display = 'none';
    toggleContent('.plus-content')
}

function hiddenMenu() {
    document.querySelector('.search-content').style.display = 'none';
    document.querySelector('.plus-content').style.display = 'none';
}


function toggleContent(selector) {
    var content = document.querySelector(selector);
    if (content.style.display === 'none' || content.style.display === '') {
        content.style.display = 'block';
    } else {
        content.style.display = 'none';
    }
}