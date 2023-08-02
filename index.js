
let nombre = "";
do {
  nombre = prompt("Ingrese su nombre");
} while (!isNaN(nombre));
console.log("Bienvenido/a " + nombre + " al conversor de Divisas");

// Se define el array que almacena resultados de la conversión
let resultadosConversion = [];

// Función para obtener el día de la semana
function obtenerDia() {
  const diasSemana = ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];
  const fechaActual = new Date();
  const diaSemana = diasSemana[fechaActual.getDay()];
  return diaSemana;
}

// Función para preguntar si desea saber la fecha actual
function saberFecha() {
  const respuesta = prompt("¿Deseas saber la fecha actual? (Sí / No)");

  if (respuesta !== null) {
    const respuestaNormalizada = respuesta.trim().toLowerCase();

    if (respuestaNormalizada === "sí" || respuestaNormalizada === "si") {
      const diaSemana = obtenerDia();
      console.log("Hoy es " + diaSemana);
    } else {
      console.log("¡Ok! No te mostraré la fecha actual.");
    }
  }
}

saberFecha();

function convertir() {
  let valor = 0;
  let resultado = 0;
  let dolar = 550;
  let euro = 650;

  //compruebo el numero
  valor = parseFloat(document.getElementById("valor").value);

  if (isNaN(valor) || valor <= 0) {
    return console.log("Ingrese un número mayor a 0 ");
  }

  let conversion = {}; // cree un objeto vacio para almacenar los detalles de conversion 

  // dolar a peso
  if (document.getElementById("uno").checked) {
    resultado = valor / dolar;
    resultado = resultado.toFixed(2);
    console.log("El cambio de Pesos a Dolar blue es de: $" + resultado);

    conversion.tipo = "Peso a dolar";
    conversion.valorConvertido = "$" + resultado;
    conversion.fecha = new Date().toISOString(); // almacena la fecha y hora actual
    resultadosConversion.push(conversion);
  }

  // peso a euro
  else if (document.getElementById("dos").checked) {
    resultado = valor / euro;
    resultado = resultado.toFixed(2);
    console.log("El cambio de Pesos a Euro oficial es de: €" + resultado);

    conversion.tipo = "Peso a Euro";
    conversion.valorConvertido = "€" + resultado;
    conversion.fecha = new Date().toISOString(); 
    resultadosConversion.push(conversion);
  } else {
    console.log("Debes completar todos los campos");
  }
}

console.log("Resultados de conversion:", resultadosConversion);

// funcion para buscar las conversiones en el array 
function buscarConversion() {
  const busqueda = prompt("Ingrese la búsqueda (por tipo o fecha):"); //peso a dolar/ peso a euro o fecha yyyy-mm-dd...
  if (busqueda) {
    const busquedaNormalizada = busqueda.trim().toLowerCase();
    const resultados = resultadosConversion.filter(
      (conversion) =>
        conversion.tipo.toLowerCase().includes(busquedaNormalizada) ||
        conversion.fecha.includes(busquedaNormalizada)
    );

    if (resultados.length > 0) {
      console.log("Resultados de la búsqueda:");
      resultados.forEach((conversion) => {
        console.log(
          `Tipo: ${conversion.tipo}, Valor Convertido: ${conversion.valorConvertido}, Fecha: ${conversion.fecha}` 
        );
      });
    } else {
      console.log("No se encontraron resultados para la búsqueda.");
    }
  } else {
    console.log("Búsqueda inválida.");
  }
}
