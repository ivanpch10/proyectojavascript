
let temperatureLog = []

do {
    
let choice = prompt("Ingrese 1 para convertir Celsius -> Fahrenheit \nIngrese 2 para convertir Fahrenheit -> Celsius")


while (choice != 1 && choice != 2){
    choice = prompt ("Seleccione por favor una de las siguientes opciones:\n1 para convertir Celsius -> Fahrenheit \n2 para convertir Fahrenheit -> Celsius");
}

let temperature = prompt ("Ingrese Temperatura");


while (isNaN(temperature)) {
    temperature = prompt ("Valor invalido, por favor ingrese una temperatura.");
    
}

function celToFar (){
    const result = ((temperature * 1.8) + 32 ).toFixed(0); 
    const logEntry = temperature + "°C => " + result + "°F";
    temperatureLog.push(logEntry);
    alert ("La temperatura " + temperature + "°C " + "en Fahrenheit es de " + result + "°F");
}


function farToCel(){
    const result = ((temperature - 32) / 1.8 ).toFixed(1);
    const logEntry = temperature + "°F => " + result + "°C";
    temperatureLog.push(logEntry);
    alert ("La temperatura " + temperature + "°F " + "en Celsius es de " + result + "°C");
}


if (choice == 1){
    celToFar()
}
else {
    farToCel()
}

showTempLog = prompt('Ingrese 1 - Para seguir utilizando la app\nIngrese 2 - Para ver el historial de Conversiones') === '2';
    
}

while(!showTempLog){
    temperatureLog.sort()
    alert('Estas son las temperaturas de Menor a Mayor ' + '\n' + temperatureLog.join('\n'))
}