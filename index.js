
let choice = prompt("Ingrese 1 para convertir Celsius -> Fahrenheit \nIngrese 2 para convertir Fahrenheit -> Celsius")


while (choice != 1 && choice != 2){
    choice = prompt ("Seleccione por favor una de las siguientes opciones:\n1 para convertir Celsius -> Fahrenheit \n2 para convertir Fahrenheit -> Celsius");
    1
}

let temperature = prompt ("Ingrese Temperatura");


while (isNaN(temperature)) {
    temperature = prompt ("Valor invalido, por favor ingrese una temperatura.");
    
}

function celToFar (){
    const result = (temperature * 1.8) + 32; 
    alert ("La temperatura " + temperature + "°C " + "en Fahrenheit es de " + result + "°F");
}


function farToCel(){
    const result = (temperature - 32) / 1.8;
    alert ("La temperatura " + temperature + "°F " + "en Celsius es de " + result + "°C");
}


if (choice == 1){
    celToFar()
}
else {
    farToCel()
}