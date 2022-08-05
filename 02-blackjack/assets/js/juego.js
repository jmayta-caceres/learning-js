(() => {
    "use strict";

    let deck = [];
    let tipos = ["C", "D", "H", "S"];
    let especiales = ["A", "J", "Q", "K"];
    
    let puntosJugador = 0;
    let puntosComputadora = 0;
    
    const btnNuevo = document.querySelector("#btnNuevo");
    const btnPedir = document.querySelector("#btnPedir");
    const btnDetener = document.querySelector("#btnDetener");
    
    const puntosHTML = document.querySelectorAll("small");
    
    const divJugadorCartas = document.querySelector("#jugador-cartas");
    const divComputadoraCartas = document.querySelector("#computadora-cartas");
    
    // Crea deck
    const crearDeck = () => {
        for (const tipo of tipos) {
            for (let num = 2; num <= 10; num++) {
                // carga la combinación entre numeros (del 2 al 10) y tipos
                // ex: 2C, 2D, 2H, etc...
                deck.push(`${num}${tipo}`);
            }
            for (const especial of especiales) {
                // carga la combinación entre letras (del A al K) y tipos
                // ex: AC, QD, JH, KS, etc...
                deck.push(`${especial}${tipo}`);
            }
        }
    
        // baraja el deck
        deck = _.shuffle(deck);
    };
    
    crearDeck();
    
    // Extrae una carta del deck
    const pedirCarta = () => {
        if (deck.length === 0) {
            throw "No hay cartas en el deck";
        }
        const carta = deck.shift();
        return carta;
    };
    
    // Obtiene el valor de una carta
    const valorCarta = (carta) => {
        // A = 11  y  J, Q, K = 10
        const valor = carta.substring(0, carta.length - 1);
        return isNaN(valor) ? (valor === "A") ? 11 : 10 : valor * 1;
    };
    
    const generaImgCarta = (carta) => {
        const imgCarta = document.createElement("img");
        imgCarta.src = `assets/cartas/${carta}.png`;
        imgCarta.classList.add("carta");
        return imgCarta;
    }
    
    
    
    // Computadora ---------------------------------
    
    const turnoComputadora = (puntajeMinimo) => {
        do {
            const carta = pedirCarta();
    
            const imgCarta = generaImgCarta(carta);
            divComputadoraCartas.append(imgCarta);
    
            puntosComputadora = puntosComputadora + valorCarta(carta);
            puntosHTML[1].innerText = puntosComputadora;
            console.log(puntosComputadora);
    
            if(puntajeMinimo > 21) {
                break;
            } else if(puntosComputadora > 21) {
                console.warn("Jugador Gana!");
            } else if(puntajeMinimo < puntosComputadora) {
                console.warn("Computadora Gana!");
            } else if(puntajeMinimo == puntosComputadora == 21 ) {
                console.warn("Empate");
            }
    
        } while (puntosComputadora <= puntajeMinimo && puntajeMinimo <= 21);
    };
    
    // Eventos ---------------------------------
    
    btnPedir.addEventListener("click", () => {
        const carta = pedirCarta();
        
        // <img class="carta" src="assets/cartas/2C.png">
        const imgCarta = generaImgCarta(carta);
        divJugadorCartas.append(imgCarta);
    
        
        puntosJugador = valorCarta(carta) + puntosJugador;
        puntosHTML[0].innerText = puntosJugador;
        console.log(puntosJugador);
        
        if(puntosJugador > 21 ) {
            console.warn("Perdiste");
            btnPedir.disabled = true;
            btnDetener.disabled = true;
            turnoComputadora(puntosJugador);
        } else if(puntosJugador == 21) {
            btnPedir.disabled = true;
            btnDetener.disabled = true;
            turnoComputadora(puntosJugador);
        }
    
    });
    
    btnDetener.addEventListener("click", () => {
        btnPedir.disabled = true;
        btnDetener.disabled = true;
        turnoComputadora(puntosJugador);
    });
    
    btnNuevo.addEventListener("click", () => {
        btnPedir.disabled = false;
        btnDetener.disabled = false;
        puntosJugador = 0;
        puntosComputadora = 0;
        divJugadorCartas.innerHTML = "";
        divComputadoraCartas.innerHTML = "";
        puntosHTML[0].innerText = 0;
        puntosHTML[1].innerText = 0;
        deck = [];
        crearDeck();
        console.log({deck});
    });
    
})()