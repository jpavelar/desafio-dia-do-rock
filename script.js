function toggleTheme() {
    if (document.documentElement.getAttribute('data-theme') === 'dark') {
        document.documentElement.removeAttribute('data-theme');
    } else {
        document.documentElement.setAttribute('data-theme', 'dark');
    }
}

function toggleNavbar() {
    var navbar = document.getElementById("navbar");
    navbar.classList.toggle("expanded");
}

function showSearch() {
    document.querySelector('.default-content').style.display = 'none';
    document.querySelector('.plus-content').style.display = 'none';
    document.querySelector('.search-content').style.display = 'block';
}

function showMap() {
    document.querySelector('.default-content').style.display = 'none';
    document.querySelector('.search-content').style.display = 'none';
    document.querySelector('.plus-content').style.display = 'block';
}

function hiddenMenu() {
    document.querySelector('.default-content').style.display = 'none';
    document.querySelector('.search-content').style.display = 'none';
    document.querySelector('.plus-content').style.display = 'none';
}
