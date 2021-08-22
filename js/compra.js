//Variables Globales
const compra = new Carrito();
const listaCompra = document.querySelector("#lista-compra tbody");
const carrito = document.getElementById('carrito');
const procesarCompraBtn = document.getElementById('procesar-compra');
const cliente = document.getElementById('cliente');
const correo = document.getElementById('correo');


cargarEventos();

function cargarEventos() 
{
    //Envia los productosdel carrito a la ventana de compra
    document.addEventListener('DOMContentLoaded', compra.leerLocalStorageCompra());

    //llama al Evento Eliminar productos del carrito y de la localStorage
    carrito.addEventListener('click', (e) => { compra.eliminarProducto(e) });

    //llamamos al evento de calcular el total de la compra
    compra.calcularTotal();

    //cuando se selecciona procesar Compra
    procesarCompraBtn.addEventListener('click', procesarCompra);

    carrito.addEventListener('change', (e) => { compra.obtenerEvento(e) });
    carrito.addEventListener('keyup', (e) => { compra.obtenerEvento(e) });

}

function procesarCompra() 
{
    // e.preventDefault();

    //manejo de exepciones donde verificamos si no tenemos producto en carrito nos notifica
    if (compra.obtenerProductosLocalStorage().length === 0) 
    {
        Swal.fire
        ({
            type: 'error',
            title: 'Oops...',
            text: 'No hay productos, selecciona alguno',
            showConfirmButton: true,
        })
        
        .then(function () {
            window.location = "index.html";
        })
    }

    //manejo de exepciones donde verificamos si no tenemos producto en carrito nos notifica
    else if (cliente.value === '' || correo.value === '') 
    {
        Swal.fire
            (
                {
                    type: 'error',
                    title: 'Oops...',
                    text: 'Alguna casilla esta vacia ',
                    showConfirmButton: true,
                    footer: '<a>Las casilla requieren informacion para procesar!</a>',

                }
            )
    }
    else {

        //aqui se coloca el user id generado en el emailJS
       /* (function () {
            emailjs.init("user_CEozz2F39lJJOLF5mJiDA");
        })();*/

        //El campo {{detalleCompra}} es el que se añadió en la plantilla de emailjs 
        /* 
        Hola {{destinatario}},

        Hemos recibido tu pedido de compra, en un plazo de 1 semana te enviaremos los productos solicitados.

        El monto total de su compra es : {{monto}}.

        {{detalleCompra}}


        Erick Cerna
        */

        /* AGREGAR DATOS DE FORMA RAPIDA A UN TEXT AREA */
        let cadena = "";
        productosLS = compra.obtenerProductosLocalStorage();
        productosLS.forEach(function (producto) {
            cadena += `
                 Producto : ${producto.titulo}
                 Precio : ${producto.precio}
                 Cantidad: ${producto.cantidad}
                 
                `;
        });
        document.getElementById('detalleCompra').innerHTML = cadena;
        /* ------------------------- */

        var myform = $("form#procesar-pago");

        myform.submit((event) => {
            event.preventDefault();

            // Change to your service ID, or keep using the default service
            var service_id = "default_service";
            var template_id = "template_3SA9LsqQ";

            const cargandoGif = document.querySelector('#cargando');
            cargandoGif.style.display = 'block';

            const enviado = document.createElement('img');
            enviado.src = 'img/mail.gif';
            enviado.style.display = 'block';
            enviado.width = '150';

            emailjs.sendForm(service_id, template_id, myform[0])
                .then(() => {
                    cargandoGif.style.display = 'none';
                    document.querySelector('#loaders').appendChild(enviado);

                    setTimeout(() => {
                        compra.vaciarLocalStorage();
                        enviado.remove();
                        window.location = "index.html";
                    }, 2000);


                }, (err) => {
                    alert("Error al enviar el email\r\n Response:\n " + JSON.stringify(err));
                    // myform.find("button").text("Send");
                });

            return false;

        });

    }
}

