// Seleccionar elementos del DOM
const textArea = document.querySelector(".main__textarea"); // Área de texto donde el usuario ingresa el mensaje
const mensaje = document.getElementById("mensajeEncriptado"); // Elemento donde se muestra el mensaje encriptado
const botonCopia = document.getElementById("copiarMensaje"); // Botón para copiar el mensaje encriptado
botonCopia.style.visibility = "hidden";

// Agregar eventListener a los botones "Encriptar" y "Desencriptar"
const botonEncriptar = document.getElementById("encriptar"); // Botón "Encriptar"
console.log("La función btnEncriptar fue llamada");
const botonDesencriptar = document.getElementById("desencriptar"); // Botón "Desencriptar"
console.log("La función btnDesencriptar fue llamada");

// Funciones de manejo de eventos
function handleClickEncriptar() {
  btnEncriptar(); // Llamar a la función de encriptar cuando se hace clic en el botón "Encriptar"
}

function handleClickDesencriptar() {
  btnDesencriptar(); // Llamar a la función de desencriptar cuando se hace clic en el botón "Desencriptar"
}

function handleClickCopia() {
  let mensajeEncriptado = document.getElementById("mensajeEncriptado").innerText;
  let tempInput = document.createElement("input");
  tempInput.value = mensajeEncriptado;
  document.body.appendChild(tempInput);
  tempInput.select();
  document.execCommand("copy");
  document.body.removeChild(tempInput);
}

// Asignar las funciones de manejo de eventos a los botones correspondientes
botonEncriptar.addEventListener("click", handleClickEncriptar);
botonDesencriptar.addEventListener("click", handleClickDesencriptar);
botonCopia.addEventListener("click", handleClickCopia);

// Validar el texto ingresado por el usuario
function validarTexto() {
  let textoEscrito = textArea.value;
  let validador = textoEscrito.match(/^[a-z\s]*$/);

  if (!validador || validador.length === 0) {
    mostrarModal(); // Mostrar un modal de error si el texto no cumple con el formato esperado
    return true; // Devolver true para indicar que el texto no es válido
  }
  return false; // Devolver false para indicar que el texto es válido
}

// Mostrar el modal de error
function mostrarModal() {
  const modal = document.getElementById("modal"); // Elemento del modal de error
  modal.style.display = "block"; // Mostrar el modal

  const modalButton = document.getElementById("modalButton"); // Botón dentro del modal
  console.log(modalButton); /* Agregar esta línea */
  modalButton.addEventListener("click", () => {
    console.log("Botón Entendido presionado");
    modal.style.display = "none"; // Ocultar el modal cuando se hace clic en el botón
  });
}

// Encriptar el texto ingresado por el usuario
function btnEncriptar() {
  if (!validarTexto()) {
    const textoEncriptado = cifrar(textArea.value); // Encriptar el texto ingresado
    mensaje.innerText = textoEncriptado; // Mostrar el texto encriptado en el elemento mensaje
    console.log(mensaje.innerText);
    document
      .getElementById("mensajeEncontrado")
      .classList.remove("aside__content--none"); // Mostrar el mensaje encriptado en el aside
    document.getElementById("ningunMensaje").style.display = "none"; // Ocultar el mensaje de "ningún mensaje"
    mensaje.style.backgroundImage = "none"; // Quitar la imagen de fondo del mensaje
    textArea.value = ""; // Limpiar el área de texto
    botonCopia.style.visibility = "visible"; // Mostrar el botón de copiar mensaje
  }
}

// Claves de encriptación
// `e` se convierte en `enter`
// `i` se convierte en `imes`
// `a` se convierte en `ai`
// `o` se convierte en `ober`
// `u` se convierte en `ufat`

// Función para cifrar una cadena de texto
function cifrar(stringCifrada) {
  let matrizCodigo = [
    ["e", "enter"],
    ["i", "imes"],
    ["a", "ai"],
    ["o", "ober"],
    ["u", "ufat"],
  ];
  stringCifrada = stringCifrada.toLowerCase();

  for (let i = 0; i < matrizCodigo.length; i++) {
    if (stringCifrada.includes(matrizCodigo[i][0])) {
      stringCifrada = stringCifrada.replace(
        new RegExp(matrizCodigo[i][0], "g"),
        matrizCodigo[i][1]
      );
    }
  }
  return stringCifrada;
}

// Función para descifrar el texto ingresado por el usuario
function btnDesencriptar() {
  if (validarTexto()) {
    return;
  }

  let textoEscrito = mensaje.innerText;
  let matrizCodigo = [
    ["e", "enter"],
    ["i", "imes"],
    ["a", "ai"],
    ["o", "ober"],
    ["u", "ufat"],
  ];

  for (let i = 0; i < matrizCodigo.length; i++) {
    if (textoEscrito.includes(matrizCodigo[i][1])) {
      textoEscrito = textoEscrito.replace(
        new RegExp(matrizCodigo[i][1], "g"),
        matrizCodigo[i][0]
      );
    }
  }

  mensaje.innerText = textoEscrito;
  document
    .getElementById("mensajeEncontrado")
    .classList.remove("aside__content--none"); // Mostrar el mensaje desencriptado en el aside
  document.getElementById("ningunMensaje").style.display = "none"; // Ocultar el mensaje de "ningún mensaje"
  mensaje.style.backgroundImage = "none"; // Quitar la imagen de fondo del mensaje
  botonCopia.style.visibility = "visible"; // Mostrar el botón de copiar mensaje
}

// Alternar el modo oscuro
function toggleDarkMode() {
  var body = document.body;
  body.classList.toggle("dark-mode");
}
