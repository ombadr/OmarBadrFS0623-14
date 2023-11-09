const numeriEstratti = []
const numeriGiocatore = []

// funzione per creare il tabellone principale con i numeri da 1 a 76
const creaTabellonePrincipale = () => {
    const tabelloneContenitore = document.getElementById('tabellone');
    for (let i = 0; i < 76; i++) {
        const numeroContenitore = document.createElement('div')
        const cellaNumero = document.createElement('h3')
        cellaNumero.innerText = i + 1
        numeroContenitore.appendChild(cellaNumero)
        tabelloneContenitore.appendChild(numeroContenitore)
    }
}

// handler per i numeri inseriti dal giocatore
const inserisciNumeroGiocatore = () => {
    const tabellaContenitore = document.getElementById('tabella-giocatore')
    const input = document.getElementById('new-number')
    const button = document.getElementById('new-number-btn')

    button.addEventListener('click', (e) => {
        e.preventDefault();
        const numChoosen = parseInt(input.value)
        if (numChoosen > 76) {
            alert('Inserisci un numero fino a 76')
            input.value = ''
            return false
        }
        if (numeriGiocatore.length > 23) {
            alert('Hai già inserito tutti i numeri')
            input.value = ''
            return false
        }
        if (numeriGiocatore.includes(numChoosen)) {
            alert('Hai già inserito questo numero. Scegli un altro numero')
            input.value = ''
            return false
        }

        const numeroContenitore = document.createElement('div')
        const cellaNumero = document.createElement('h3')
        cellaNumero.innerText = numChoosen
        numeroContenitore.appendChild(cellaNumero)
        tabellaContenitore.appendChild(numeroContenitore)
        numeriGiocatore.push(numChoosen)
        input.value = ''

        console.log(numeriGiocatore)
    })

}


const estraiNumero = () => {
    const button = document.querySelector("#generatore-numero > button");
    button.addEventListener('click', () => {

        if (numeriGiocatore.length < 24) {
            alert('Scegliere tutti i numeri prima di comininciare l\'estrazione')
            return false
        }

        // while loop finchè non trova numero che non è ancora stato estratto
        let nuovoNumero;
        do {
            nuovoNumero = Math.floor(Math.random() * 76) + 1;
        } while (numeriEstratti.includes(nuovoNumero));

        const tabelloneNumeri = document.querySelectorAll('#tabellone h3');
        const tabellaGiocatoreNumeri = document.querySelectorAll('#tabella-giocatore h3');

        // applica la classe 'selected' al numero che è stato estratto sul tabellone
        tabelloneNumeri.forEach((cellaNumero, i) => {
            const numeroTabellone = i + 1;
            if (nuovoNumero === numeroTabellone) {
                cellaNumero.classList.add('selected');
            }
        });

        // applica la classe 'selected' al numero che è stato estratto sul tabellone del giocatore
        tabellaGiocatoreNumeri.forEach((cellaNumero, i) => {
            const numeroTabellone = i + 1;
            if (nuovoNumero === numeroTabellone) {
                cellaNumero.classList.add('selected');
            }
        });

        numeriEstratti.push(nuovoNumero);
        console.log(tabelloneNumeri);
        console.log(numeriEstratti);


        // Check se il giocatore ha vinto. Se tutti i numeri del giocatore hanno
        // la classe selected significa che il giocatore ha vinto
        // NOTA: tabellaGiocatoreNumeri è un NodeList quindi è stato usato Array.from per convertire in un semplice array

        const giocatoreHaVinto = Array.from(tabellaGiocatoreNumeri).every(cellaNumero =>
            cellaNumero.classList.contains('selected')
        );

        if (giocatoreHaVinto) {
            alert('Hai vinto!');
        }

        const test = Array.from(tabellaGiocatoreNumeri)
        console.log('test', test)

    });
};


creaTabellonePrincipale();
inserisciNumeroGiocatore()
estraiNumero();
