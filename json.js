var estudiantes = [];


// Contructor que permite formar objetos JSON


function Estudiante(codigo, nombre, nota) {
    this.codigo = codigo;
    this.nombre = nombre;
    this.nota = nota;
}


// Evento listener que permite la creación del json y la inserción a la tabla


document.getElementById("registrar").addEventListener("click", function() {
    var cod = document.getElementById("code").value;
    var nombre = document.getElementById("name").value;
    var nota = parseInt(document.getElementById("score").value);

    if (isNaN(nota)) {
        alert("La nota debe ser una nota del 1 al 100");
        return;
    } else {
        var nuevoEstudiante = new Estudiante(cod, nombre, nota);
        if (guardarJSON(nuevoEstudiante) == false) {
            return;
        }
        var tabla = document.getElementById("myTable");
        var i;
        var filaFinal;
        var fila;

        filaFinal = tabla.rows.length;
        fila = tabla.insertRow(filaFinal);

        var celda0 = fila.insertCell(0);
        var celda1 = fila.insertCell(1);
        var celda2 = fila.insertCell(2);

        celda0.innerHTML = nuevoEstudiante.codigo;
        celda1.innerHTML = nuevoEstudiante.nombre;
        celda2.innerHTML = nuevoEstudiante.nota;

        document.getElementById("code").value = "";
        document.getElementById("name").value = "";
        document.getElementById("score").value = "";
    }
});


// Funcion que permite guardar un json al arreglo 


function guardarJSON(json) {
    for (i = 0; i < estudiantes.length; i++) {
        if (estudiantes[i].codigo == json.codigo) {
            alert("No pueden haber dos estudiantes con el mismo código");
            return false;
        }
    }
    estudiantes[estudiantes.length] = json;
    return true;
}


// Mostrar todos los objetos del JSON con sus respectivas propiedades en pantalla.


function leerJSON(json) {
    var out = "---------------------------- Estudiantes ----------------------------<br>";
    var i;
    for (i = 0; i < json.length; i++) {
        out += "Codigo: " + json[i].codigo + " - " + "Nombre: " + json[i].nombre + " - " + "Nota: " + json[i].nota + "<br>";
    }
    document.getElementById("students").innerHTML = out;
}

function mostrarStudents() {
    leerJSON(estudiantes);
}


// Calcular la nota promedio y mostrarla en pantalla.


function calcularPromedio(json) {
    var average = 0.0;
    for (i = 0; i < json.length; i++) {
        average += json[i].nota / json.length;
    }
    document.getElementById("average").innerHTML = "El promedio de notas es de:" + average;
}

function promedio() {
    calcularPromedio(estudiantes);
}


// Mostrar en pantalla el estudiante con la nota mayor.


function calcularMejorNota(json) {
    var score = 0;
    var pos = 0;
    var aux = "";
    for (i = 0; i < json.length; i++) {
        if (json[i].nota > score) {
            nota = json[i].nombre;
			score = json[i].nota;
            pos = i;
            aux = json[pos].nombre + "<br>";
        }
    }
    document.getElementById("best").innerHTML = "La mejor nota fue la de " + aux;
}

function mejorNota() {
    calcularMejorNota(estudiantes);
}


// Mostrar en pantalla el estudiante con la menor nota de todas.

function calcularPeorNota(json) {
    var score = json.nota;
    var pos = 0;
    var aux = "";
    for (i = 0; i < json.length; i++) {
        if (score = json[i].nota > score) {
            nota = json[i].nombre;
            pos = i;
            aux = aux + json[pos].nombre + "<br>";
        }
    }
    document.getElementById("worst").innerHTML = "La peor nota fue la de " + aux;
}

function peorNota() {
    calcularPeorNota(estudiantes);
}
