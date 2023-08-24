
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

//promesa
function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function convertir() {
  try {
    const valor = parseFloat(document.getElementById("valor").value);
    
    // Obtener tipo de cambio de la API
    const response = await fetch('https://api.bluelytics.com.ar/v2/latest');
    if (!response.ok) {
      throw new Error('No se pudo obtener los datos de conversión');
    }
    const data = await response.json();
    const dolarBlue = data.blue.value_avg;
    const euroBlue = data.blue_euro.value_avg;

    if (isNaN(valor) || valor <= 0) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Ingrese un número mayor a 0'
      });
      return;
    }

    await delay(1000);

    let resultado = 0;
    let conversion = {};

    if (document.getElementById("dolar").checked) {
      if (isNaN(dolarBlue)) {
        throw new Error('Valor de dolarBlue no válido');
      }
      resultado = (valor / dolarBlue).toFixed(2);
      const cambioMessage = `El cambio de Pesos a Dolar blue es de: $${resultado}`;

      conversion.tipo = "Peso a dolar";
      conversion.valorConvertido = `$${resultado}`;
      conversion.fechaFormateada = obtenerFecha();
      resultadosConversion.push(conversion);

      document.getElementById("mensajeResultado").textContent = cambioMessage;
    } else if (document.getElementById("euro").checked) {
      if (isNaN(euroBlue)) {
        throw new Error('Valor de euroBlue no válido');
      }
      resultado = (valor / euroBlue).toFixed(2);
      const cambioMessage = `El cambio de Pesos a Euro blue es de: €${resultado}`;

      conversion.tipo = "Peso a Euro";
      conversion.valorConvertido = `€${resultado}`;
      conversion.fechaFormateada = obtenerFecha();
      resultadosConversion.push(conversion);

      document.getElementById("mensajeResultado").textContent = cambioMessage;
    } else {
      document.getElementById("mensajeResultado").textContent = "Debes completar todos los campos";
    }

    localStorage.setItem("conversiones", JSON.stringify(resultadosConversion));
  } catch (error) {
    console.error('Error al realizar la conversión:', error);
  }
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
        conversion.fechaFormateada.includes(busquedaNormalizada)
    );

    if (resultados.length > 0) {
      let resultadosHtml = "Resultados de la búsqueda:";
      resultados.forEach((conversion) => {
        const { tipo, valorConvertido, fechaFormateada } = conversion;
        resultadosHtml += ` Tipo: ${tipo}, Valor: ${valorConvertido}, Fecha: ${fechaFormateada}<br>`;
      });
      // Sweet alert para busqueda encontrada
      Swal.fire({
        icon: 'success',
        title: 'Resultados de la búsqueda',
        html: resultadosHtml
    });
} else {
    // Sweet alert para busqueda no encontrada
    Swal.fire({
        icon: 'info',
        title: 'No se encontraron resultados',
        text: 'No se encontraron resultados para la búsqueda.'
    });
}}}
document.addEventListener("DOMContentLoaded", function() {

  document.getElementById("botonBuscar").addEventListener("click", buscarConversion);
});

async function obtenerDatosDeConversion() {
  try {
    const response = await fetch('https://api.bluelytics.com.ar/v2/latest'); //API
    if (!response.ok) {
      throw new Error('No se pudo obtener los datos de conversión');
    }

    const data = await response.json();

    // Accede al tipo de cambio para el "dólar blue" y el "euro blue"
    const dolarBlue = data.blue.value;
    const euroBlue = data.blue_euro.value;

    console.log('Dólar blue:', dolarBlue);
    console.log('Euro blue:', euroBlue);
  } catch (error) {
    console.error('Error al obtener datos de conversión:', error);
  }
}