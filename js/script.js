'use strict';

 let precios = [];

class precioAlumno{
    constructor(producto,descripcion,precio){
        this.producto = producto;
        this.descripcion = descripcion;
        this.precio = precio;
    }
    
}

function validateFields(){
    if (document.getElementById('producto').value==""){
        alert('debe ingresar el producto');
        return false;
    }

    if (document.getElementById('descripcion').value==""){
        alert('debe ingresar el descripcion');
        return false;
    }
    if (document.getElementById('precio').value==""){
        alert('debe ingresar la precio');
        return false;
    }

    return true;
}


/// poblar arreglo
function addRecord(){

    let producto = document.getElementById('producto').value;
    let descripcion = document.getElementById('descripcion').value;
    let precio = document.getElementById('precio').value;

    precios.push( new precioAlumno(producto,descripcion,precio));
}

function showData(){

    let rows = "";
    for(let index = 0; index < precios.length; index++){

        rows += '<tr>'
        rows += '<td>' + precios[index].producto +'</td>'
        rows += '<td>' + precios[index].descripcion +'</td>'
        rows += '<td>' + precios[index].precio +'</td>'
        rows += '</tr>'
    }

    document.getElementById('listado').innerHTML = rows;

 
}

function addData(){

    if(validateFields()== false){
        return;
    }

     // poblar arreglo
     addRecord();
     // mostrar datos
     showData();



}


 