function toggleNavbar() {
    var navbar = document.getElementById("navbar");
    navbar.classList.toggle("expanded");
}

function showSearch() {
    document.querySelector('.default-content').style.display = 'none';
    document.querySelector('.plus-content').style.display = 'none';
    document.querySelector('.map-content').style.display = 'none';
    document.querySelector('.search-content').style.display = 'block';
}

function showMap() {
    document.querySelector('.default-content').style.display = 'none';
    document.querySelector('.search-content').style.display = 'none';
    document.querySelector('.map-content').style.display = 'none';
    document.querySelector('.plus-content').style.display = 'block';
}

function hiddenMenu() {
    document.querySelector('.default-content').style.display = 'none';
    document.querySelector('.search-content').style.display = 'none';
    document.querySelector('.plus-content').style.display = 'none';
    document.querySelector('.map-content').style.display = 'block';
}
