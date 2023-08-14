
const confirmarNombre = () => {
  const nombre = document.getElementById("nombre").value;
  const mensaje = nombre !== "" ? `Bienvenido/a ${nombre} al conversor de Divisas` : "";
  document.getElementById("mensajeBienvenida").textContent = mensaje;
};

//array para guardar los resultados de conversion
let resultadosConversion = [];

// funcion para obtener dia de la semana
function obtenerFecha() {
  const fechaActual = new Date();
  const dia = fechaActual.getDate();
  const mes = fechaActual.getMonth() + 1; // Los meses en JavaScript se cuentan desde 0 (enero) hasta 11 (diciembre)
  const año = fechaActual.getFullYear();

  const fechaFormateada = `${dia < 10 ? '0' : ''}${dia}/${mes < 10 ? '0' : ''}${mes}/${año}`;
  return fechaFormateada;
}
function saberFecha() {
  const respuesta = document.getElementById("respuestaFecha").value;
  
  if (respuesta !== "") {
    const respuestaNormalizada = respuesta.trim().toLowerCase();
  
    const fechaFormateada = obtenerFecha();
    const fechaMessage = respuestaNormalizada === "sí" || respuestaNormalizada === "si" ? `Hoy es ${fechaFormateada}` : "¡Ok! No te mostraré la fecha actual.";
    document.getElementById("mensajeFecha").textContent = fechaMessage;
  }
}

document.addEventListener("DOMContentLoaded", function() {
  document.getElementById("botonFecha").addEventListener("click", saberFecha);
});


function convertir() {
  const valor = parseFloat(document.getElementById("valor").value);
  let resultado = 0;
  const dolar = 695;
  const euro = 750;

  if (isNaN(valor) || valor <= 0) {
    document.getElementById("mensajeResultado").textContent = "Ingrese un número mayor a 0";
    return;
  }

  let conversion = {};

  if (document.getElementById("dolar").checked) {
    resultado = (valor / dolar).toFixed(2);
    const cambioMessage = `El cambio de Pesos a Dolar blue es de: $${resultado}`;

    conversion.tipo = "Peso a dolar";
    conversion.valorConvertido = `$${resultado}`;
    conversion.fecha = new Date().toISOString();
    resultadosConversion.push(conversion);

    document.getElementById("mensajeResultado").textContent = cambioMessage;
  } else if (document.getElementById("euro").checked) {
    resultado = (valor / euro).toFixed(2);
    const cambioMessage = `El cambio de Pesos a Euro oficial es de: €${resultado}`;

    conversion.tipo = "Peso a Euro";
    conversion.valorConvertido = `€${resultado}`;
    conversion.fecha = new Date().toISOString();
    resultadosConversion.push(conversion);

    document.getElementById("mensajeResultado").textContent = cambioMessage;
  } else {
    document.getElementById("mensajeResultado").textContent = "Debes completar todos los campos";
  }

  // se guarda el resultado de la conversion al local storage
  localStorage.setItem("conversiones", JSON.stringify(resultadosConversion));
}

// carga resultados de conversion desde el local storage
if (localStorage.getItem("conversiones")) {
  resultadosConversion = JSON.parse(localStorage.getItem("conversiones"));
}

document.addEventListener("DOMContentLoaded", function() {
  // Agregar el event listener después de que el DOM esté completamente cargado
  document.getElementById("botonConvertir").addEventListener("click", convertir);
});
;

// funcion para buscar las conversiones en el array
function buscarConversion() {
  const busqueda = document.getElementById("busqueda").value;
  if (busqueda) {
    const busquedaNormalizada = busqueda.trim().toLowerCase();
    const resultados = resultadosConversion.filter(
      (conversion) =>
        conversion.tipo.toLowerCase().includes(busquedaNormalizada) ||
        conversion.fecha.includes(busquedaNormalizada)
    );

    if (resultados.length > 0) {
      let resultadosHtml = "Resultados de la búsqueda:";
      resultados.forEach((conversion) => {
        const { tipo, valorConvertido, fecha } = conversion;
        resultadosHtml += `Tipo: ${tipo}, Valor Convertido: ${valorConvertido}, Fecha: ${fecha}<br>`;
      });
      document.getElementById("resultadosBusqueda").innerHTML = resultadosHtml;
    } else {
      document.getElementById("resultadosBusqueda").innerHTML = "No se encontraron resultados para la búsqueda.";
    }
  } else {
    document.getElementById("resultadosBusqueda").innerHTML = "Búsqueda inválida.";
  }
}
document.addEventListener("DOMContentLoaded", function() {

  document.getElementById("botonBuscar").addEventListener("click", buscarConversion);
});

