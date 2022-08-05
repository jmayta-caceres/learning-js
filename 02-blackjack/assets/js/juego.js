/**
 * 2C = Two of Clubs (Tréboles)
 * 2D = Two of Diamonds (Diamantes)
 * 2H = Two of Hearts (Corazones)
 * 2S = Two of Spades (Espadas)
 */

let deck = [];
let tipos = ["C", "D", "H", "S"];
let especiales = ["A", "J", "Q", "K"];

const btnPedir = document.querySelector("#btnPedir");
const puntosHTML = document.querySelectorAll("small");
let puntosJugador = 0;
let puntosComputadora = 0;
const divJugadorCartas = document.querySelector("#jugador-cartas");
const divComputadoraCartas = document.querySelector("#computadora-cartas");

const crearDeck = () => {

    tipos.forEach(tipo => {
        for (let num = 2; num <= 10; num++) {
            deck.push(`${num}${tipo}`);
        }
        especiales.forEach(x => {
            deck.push(`${x}${tipo}`);
        });
    });

    console.log({deck});
    deck = _.shuffle(deck);
    console.log({deck});
};

crearDeck();


const pedirCarta = () => {
    if (deck.length === 0) {
        throw "No hay cartas en el deck";
    }
    const carta = deck.shift();
    console.log(carta);
    return carta;
};


const valorCarta = (carta) => {
    const valor = carta.substring(0, carta.length - 1);
    return isNaN(valor) ? (valor === "A") ? 11 : 10 : valor * 1;
};

// Computadora
const turnoComputadora = (puntosMinimos) => {
    do {
        const carta = pedirCarta();

        const imgCarta = document.createElement("img");
        imgCarta.src = `assets/cartas/${carta}.png`;
        imgCarta.classList.add("carta");
        divComputadoraCartas.append(imgCarta);

        puntosComputadora = puntosComputadora + valorCarta(carta);
        puntosHTML[1].innerText = puntosComputadora;
        console.log(puntosComputadora);

    } while (puntosMinimos > puntosComputadora && puntosComputadora <= 21);
};

// Eventos ---------------------------------

btnPedir.addEventListener("click", (e) => {
    const carta = pedirCarta();
    
    // <img class="carta" src="assets/cartas/2C.png">
    const imgCarta = document.createElement("img");
    imgCarta.src = `assets/cartas/${carta}.png`;
    imgCarta.classList.add("carta");
    divJugadorCartas.append(imgCarta);

    
    puntosJugador = valorCarta(carta) + puntosJugador;
    puntosHTML[0].innerText = puntosJugador;
    console.log(puntosJugador);
    
    if(puntosJugador > 21) {
        console.warn("Perdiste");
        btnPedir.disabled = true;
        turnoComputadora(puntosJugador);
    }

});
