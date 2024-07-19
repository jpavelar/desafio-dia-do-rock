
// Objeto para armazenar funções relacionadas ao banco de dados
const event_database = {};

(function () {
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

    // Inicializa o Firebase
    firebase.initializeApp(firebaseConfig);
    const db = firebase.firestore();


    async function search_Events(searchTerm) {
        try {
            const prefix = searchTerm.toLowerCase();
            const suffix = prefix + '\uf8ff';

            // Construa a consulta para encontrar documentos
            const querySnapshot = await db.collection('events')
                .where('eventBandLower', '>=', prefix)
                .where('eventBandLower', '<=', suffix)
                .get();

            // Verifica se há documentos
            const results = [];
            querySnapshot.forEach((doc) => {
                const data = doc.data();
                // Filtra os resultados para verificar se o nome contém a substring
                if (data.eventBandLower.toLowerCase().includes(searchTerm.toLowerCase())) {
                    results.push(data);
                }
            });
            if (results.length == 0) {
                displayNoResults()
            }
            // Exibe os resultados na tela
            displayResults(results);

        } catch (error) {
            console.error('Erro ao buscar eventos:', error);
        }
    }

    function displayNoResults() {
        console.log("noresults")

        const resultsContainer = document.getElementById('results');
        resultsContainer.innerHTML = '';
        resultsContainer.innerHTML = `
                    <div class="result flex flex-row items-center space-x-8 h-20 mb-2 hover-bg-black-100" >
                        <div class="flex flex-col">
                            <h4 class="max-w-7 text-xs c-white">
                                Não encontramos shows dessa banda.
                            </h4>
                        </div>
                    </div>
            `;
    }

    function displayResults(results) {
        const resultsContainer = document.getElementById('results');
        resultsContainer.innerHTML = ''; // Limpa resultados anteriores

        results.forEach(event => {


            const eventDiv = document.createElement('div');
            eventDiv.classList.add('result', 'flex', 'flex-row', 'items-center', 'space-x-8', 'h-20');
            eventDiv.innerHTML = `
                    <div class="result flex flex-row items-center space-x-8 h-20 mb-2 hover-bg-black-100" onclick="geocodeAddress('${event.eventAdress}')" >
                        <div class="ml-5">
                            <img class="min-w-10" src="src/images/Avatar.png" alt="band logo">
                        </div>
                        <div class="flex flex-col">
                            <h1 class="max-w-7 text-xl font-semibold c-white">
                                ${event.eventPlaceName}
                            </h1>
                            <h4 class="max-w-7 text-xs c-white">
                                ${event.eventAdress}
                            </h4>
                        </div>
                        <div class="flex items-center justify-center h-16 w-16">
                            <h2 class="text-center text-xl mr-4 c-white">${new Date(event.eventDate).toLocaleString()}</h2>
                        </div>
                    </div>
            `;
            resultsContainer.appendChild(eventDiv);
        });
    }

    function clearForm() {
        document.getElementById('eventForm').reset();
    }

    async function post_EventData(event) {
        event.preventDefault();

        const eventBand = document.getElementById('eventBand').value;
        const eventDate = document.getElementById('eventDate').value;
        const eventPlaceName = document.getElementById('eventPlaceName').value;
        const eventAdress = document.getElementById('eventAdress').value;

        try {
            showLoadingBar()
            await db.collection('events').add({
                eventBand: eventBand,
                eventBandLower: eventBand.toLowerCase(),
                eventDate: eventDate,
                eventPlaceName: eventPlaceName,
                eventAdress: eventAdress,
            }).then((docRef) => {
                hideLoadingBar()
                showEventSucess()
            }).catch((e) => {
                showEventError()
                console.log('Erro ao adicionar o documento: ', e);
            })

        } catch (e) {
            hideLoadingBar()
            showEventError()
            console.log('Erro ao adicionar o documento: ', e);
        }
        finally {
            hideLoadingBar()
        }
        clearForm()
    }


    event_database.searchEvents = search_Events;
    event_database.postEventData = post_EventData;

})();


function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}


function showLoadingBar() {
    document.getElementById('loadingBar').classList.remove('hidden');
    document.getElementById('eventHelp').classList.add('hidden');
    document.getElementById('eventSubmiter').classList.add('hidden');
    document.getElementById('plus-content').classList.add('pointer-events-none');
    document.getElementById('plus-content').classList.add('opacity-50');

}

function hideLoadingBar() {
    document.getElementById('loadingBar').classList.add('hidden');
    document.getElementById('eventHelp').classList.remove('hidden');
    document.getElementById('eventSubmiter').classList.remove('hidden');
    document.getElementById('plus-content').classList.remove('pointer-events-none');
    document.getElementById('plus-content').classList.remove('opacity-50');
}

function hideEventSucess() {
    document.getElementById('sucess-content').classList.add('hidden');
}
function showEventSucess() {
    document.getElementById('plus-content').style.display = 'none';
    document.getElementById('sucess-content').classList.remove('hidden');
}

function hideEventError() {
    document.getElementById('error-content').classList.add('hidden');
}
function showEventError() {
    document.getElementById('plus-content').style.display = 'none';
    document.getElementById('error-content').classList.remove('hidden');
}


document.getElementById('band').addEventListener('keydown', function (event) {
    if (event.key === 'Enter') {
        event.preventDefault();

        const inputValue = document.getElementById('band').value;

        event_database.searchEvents(inputValue);
    }
});

document.getElementById('eventSubmiter').addEventListener('click', event_database.postEventData);
document.getElementById('eventSucessClose').addEventListener('click', hideEventSucess);
document.getElementById('eventErrorClose').addEventListener('click', hideEventError);
