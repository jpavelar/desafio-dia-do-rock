
function toggleNavbar() {
    var navbar = document.getElementById("navbar");
    navbar.classList.toggle("expanded");
}

function showSearch() {
    document.getElementById('plus-content').style.display = 'none';
    toggleContent('search-content')
}

function showPlus() {
    document.getElementById('search-content').style.display = 'none';
    toggleContent('plus-content')
}

function hiddenMenu() {
    document.getElementById('search-content').style.display = 'none';
    document.getElementById('plus-content').style.display = 'none';
}


function toggleContent(selector) {
    var content = document.getElementById(selector);
    if (content.style.display === 'none' || content.style.display === '') {
        content.style.display = 'block';
    } else {
        content.style.display = 'none';
    }
}

flatpickr("#eventDate", {
    enableTime: true,
    dateFormat: "Y-m-d H:i",
});

function setMinDateTime() {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0'); // Meses são 0-indexados
    const day = String(now.getDate()).padStart(2, '0');
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');

    const minDateTime = `${year}-${month}-${day}T${hours}:${minutes}`;
    document.getElementById('eventDate').setAttribute('min', minDateTime);
}

document.addEventListener('DOMContentLoaded', () => {
    // Função para obter o valor de um cookie
function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${encodeURIComponent(name)}=`);
    if (parts.length === 2) {
        return decodeURIComponent(parts.pop().split(';').shift());
    }
}
    const userDisplayName = getCookie('userDisplayName');
    const userEmail = getCookie('userEmail');
    const userPhotoURL = getCookie('userPhotoURL');

    if (!userDisplayName || !userEmail || !userPhotoURL) {
        window.location.href = "login.html";
    } else {
        console.log('Usuário:', userDisplayName);
        console.log('Email:', userEmail);
        console.log('URL da imagem:', userPhotoURL);
        document.getElementById('avatar').style.backgroundImage = `url('${decodeURIComponent(userPhotoURL)}')`;
    }
});
