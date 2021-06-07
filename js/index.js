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
let intentos = 11;

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

  console.log(`Solución super secreta: ${palabra.split("")}`);
  const palabraElemento = document.querySelector(".palabra");
  const intentosElemento = document.querySelector(".intentos");
  palabraElemento.textContent = barrasBajas;
  intentosElemento.textContent = `Intentos restantes : ${intentos}`;
};

const actualiarPalabra = (nuevaPalabra) => {
  const palabraElemento = document.querySelector(".palabra");
  barrasBajas = nuevaPalabra;
  palabraElemento.textContent = barrasBajas;
};

const errorIntento = () => {
  --intentos;
  const intentosElemento = document.querySelector(".intentos");
  intentosElemento.textContent = `Intentos restantes : ${intentos}`;

  const hangman = document.querySelector("#hangman");
  const paso = hangman.querySelector(".off");
  paso.classList.remove("off");
  paso.classList.add("on");
};

const ganar = () => {
  const resultadoElemento = document.querySelector(".resultado");
  resultadoElemento.textContent = `OLE OLE LOS CARACOLES HAS GANADO`;
  desactivarBotones();
};

const perder = () => {
  const resultadoElemento = document.querySelector(".resultado");
  resultadoElemento.textContent = `No has acertado a tiempo y Luis se ha suicidado, ahora toda su familia te culpa de lo ocurrido
  y tu lo llevas como puedes, al cabo de un tiempo no podras con el peso en tu consiencia y serás el siguiente en ese cuadradito`;
  desactivarBotones();
};

const desactivarBotones = () => {
  const botones = document.querySelectorAll(".boton button");

  for (const boton of botones) {
    boton.disabled = true;
  }
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
  elementoBoton.disabled = true;
  if (palabra.toLowerCase().includes(intento.toLowerCase())) {
    const tempBarrasBajas = barrasBajas.split("");

    for (const indice in palabra) {
      if (palabra[indice].toLowerCase() === intento.toLowerCase()) {
        tempBarrasBajas[indice] = intento;
      }
    }
    actualiarPalabra(tempBarrasBajas.join(""));
  } else {
    errorIntento();
  }
  if (intentos === 0) {
    perder();
  }
  if (!barrasBajas.includes("_")) {
    ganar();
  }
};

obtenerPalabraAPI();
printarBotones();
