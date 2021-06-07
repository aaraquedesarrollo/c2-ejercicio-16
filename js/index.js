/* PROBLEMONES

- Pintar la palabra en la pagina web substituida por barras bajas
- Pintar un boton por cada letra del abecedario
- Hacer que al pulsar un boton, se consuma un intento y ese boton ya no se puede utilizar mas
- Comprobar si la letra que se ha intentado coincide con alguna de la palabra y si es asi poner la letra en las barras bajas








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
const intentos = 10;

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

  console.log(palabra.split("")); /*
  console.log(barrasBajas.split("")); */
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

obtenerPalabraAPI();
printarBotones();
