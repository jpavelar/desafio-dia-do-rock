import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.3/firebase-app.js";
import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/10.12.3/firebase-firestore.js";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDRjuWoJu8TEKZTRewNGtsC0TeOOsjXAdg",
    authDomain: "desafio-rock.firebaseapp.com",
    projectId: "desafio-rock",
    storageBucket: "desafio-rock.appspot.com",
    messagingSenderId: "19599960113",
    appId: "1:19599960113:web:e163261c076b4647ae0d10",
    measurementId: "G-9J11D259E4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
console.log(db);
console.log(app);

document.getElementById("eventForm").addEventListener("submit", async (e) => {
    e.preventDefault();
    
    const eventName = document.getElementById("eventName").value;
    const eventDate = document.getElementById("eventDate").value;
    const eventAddress = document.getElementById("eventAddress").value;

    try {
        await addDoc(collection(db, "events"), {
            nomeDoEvento: eventName,
            dataDoEvento: new Date(eventDate),
            enderecoDoEvento: eventAddress
        });
        document.getElementById("status").textContent = "Evento adicionado com sucesso!";
    } catch (e) {
        document.getElementById("status").textContent = "Erro ao adicionar evento: " + e;
    }

    document.getElementById("eventForm").reset();
});