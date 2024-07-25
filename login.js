// Configuração do Firebase
const firebaseConfig = {
    apiKey: "AIzaSyDRjuWoJu8TEKZTRewNGtsC0TeOOsjXAdg",
    authDomain: "desafio-rock.firebaseapp.com",
    projectId: "desafio-rock",
    storageBucket: "desafio-rock.appspot.com",
    messagingSenderId: "19599960113",
    appId: "1:19599960113:web:e163261c076b4647ae0d10",
    measurementId: "G-9J11D259E4"
};

// Inicializar Firebase
firebase.initializeApp(firebaseConfig);

// Configuração do Auth do Firebase
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

// Função de login com Google
document.getElementById('googleLogin').addEventListener('click', () => {
    auth.signInWithPopup(provider)
        .then((result) => {
            const user = result.user;
            console.log('Login bem-sucedido:', user);

            // Informações do usuário
            const userInfo = {
                displayName: user.displayName,
                email: user.email,
                photoURL: user.photoURL
            };

            // Armazenar as informações em cookies
            setCookie('userDisplayName', userInfo.displayName, 1);
            setCookie('userEmail', userInfo.email, 1);
            setCookie('userPhotoURL', userInfo.photoURL, 1);

            // Redirecionar para a página principal após o login bem-sucedido
            window.location.href = "index.html";
        })
        .catch((error) => {
            console.error('Erro de login:', error);
        });
});

// Função para definir cookies
function setCookie(name, value, days) {
    const expires = new Date(Date.now() + days * 864e5).toUTCString();
    document.cookie = `${encodeURIComponent(name)}=${encodeURIComponent(value)}; expires=${expires}; path=/`;
}