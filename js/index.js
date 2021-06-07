/* PROBLEMONES

- Pintar la palabra en la pagina web substituida por barras bajas


*/

const urlAPI = "http://localhost:3001/palabras";
const alfabeto = [
  "a",
  "b",
  "c",
  "d",
  "e",
  "f",
  "g",
  "h",
  "i",
  "j",
  "k",
  "l",
  "m",
  "n",
  "o",
  "p",
  "q",
  "r",
  "s",
  "t",
  "u",
  "v",
  "w",
  "x",
  "y",
  "z",
];
let palabra = "";
let barrasBajas = "";
let intentos = 10;

// Clona el elemento y sus hijos, le quita la clase y lo devuelve
const clonarElemento = (clase) => {
  const elemento = document.querySelector(`.${clase}`).cloneNode(true);
  elemento.classList.remove(`${clase}`);
  return elemento;
};

// Consulta la API y obtiene una palabra elegida aleatoriamente del array de palabras
const obtenerPalabraAPI = async () => {
  const palabras = await fetch(`${urlAPI}`).then((response) => response.json());

  palabra = palabras.lista[Math.floor(Math.random() * palabras.lista.length)];

  barrasBajas = palabra.replace(/[a-z]/gi, "_");

  console.log(palabra.split(""));
  const palabraElemento = document.querySelector(".palabra");
  palabraElemento.textContent = barrasBajas;

  /*

  console.log(barrasBajas.split("")); */
};

const actualiarPalabra = (nuevaPalabra) => {
  const palabraElemento = document.querySelector(".palabra");
  barrasBajas = nuevaPalabra;
  palabraElemento.textContent = barrasBajas;
};

const printarBotones = () => {
  const botonesElemento = document.querySelector(".botones");
  const botonElemento = clonarElemento("boton-dummy");

  for (const caracter of alfabeto) {
    botonElemento.querySelector("button").textContent = caracter.toUpperCase();

    botonesElemento.append(botonElemento.cloneNode(true));
  }
  for (const boton of document.querySelectorAll("button")) {
    boton.addEventListener("click", () =>
      comprobarAcierto(boton, boton.textContent)
    );
  }
};

const comprobarAcierto = (elementoBoton, intento) => {
  if (palabra.toLowerCase().includes(intento.toLowerCase())) {
    const tempBarrasBajas = barrasBajas.split("");
    elementoBoton.disabled = true;

    for (const indice in palabra) {
      if (palabra[indice].toLowerCase() === intento.toLowerCase()) {
        tempBarrasBajas[indice] = intento;
      }
    }
    actualiarPalabra(tempBarrasBajas.join(""));
    console.log(barrasBajas);
  } else {
    --intentos;
  }
};

obtenerPalabraAPI();
printarBotones();
