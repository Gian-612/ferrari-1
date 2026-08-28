/* =====================================================
   FERRARI STORE
   JAVASCRIPT
   ===================================================== */


/* ================= DATOS DE LOS VEHICULOS ================= */

const vehiculos = [
    {
        id: 1,
        nombre: "Ferrari 296 GTB",
        categoria: "Deportivo",
        precio: 320000,
        potencia: "830 CV",
        velocidad: "330 km/h",
        aceleracion: "0-100 km/h en 2.9 s",
        motor: "V6 hibrido",
        imagen: "https://images.unsplash.com/photo-1592198084033-aade902d1aae?auto=format&fit=crop&w=1000&q=80",
        descripcion: "Deportivo de alto rendimiento con tecnología híbrida y diseño moderno."
    },

    {
        id: 2,
        nombre: "Ferrari Roma",
        categoria: "GT",
        precio: 250000,
        potencia: "620 CV",
        velocidad: "320 km/h",
        aceleracion: "0-100 km/h en 3.4 s",
        motor: "V8",
        imagen: "https://images.unsplash.com/photo-1503736334956-4c8f8e92946d?auto=format&fit=crop&w=1000&q=80",
        descripcion: "Gran turismo que combina elegancia italiana, comodidad y deportividad."
    },

    {
        id: 3,
        nombre: "Ferrari SF90 Stradale",
        categoria: "Deportivo",
        precio: 550000,
        potencia: "1000 CV",
        velocidad: "340 km/h",
        aceleracion: "0-100 km/h en 2.5 s",
        motor: "V8 híbrido",
        imagen: "https://images.unsplash.com/photo-1544829099-b9a0c07fad1a?auto=format&fit=crop&w=1000&q=80",
        descripcion: "Automóvil deportivo de tecnología híbrida y prestaciones extraordinarias."
    },

    {
        id: 4,
        nombre: "Ferrari Purosangue",
        categoria: "SUV",
        precio: 400000,
        potencia: "725 CV",
        velocidad: "310 km/h",
        aceleracion: "0-100 km/h en 3.3 s",
        motor: "V12",
        imagen: "https://images.unsplash.com/photo-1553440569-bcc63803a83d?auto=format&fit=crop&w=1000&q=80",
        descripcion: "Una interpretación diferente del automóvil deportivo de cuatro puertas."
    },

    {
        id: 5,
        nombre: "Ferrari 12Cilindri",
        categoria: "GT",
        precio: 420000,
        potencia: "830 CV",
        velocidad: "340 km/h",
        aceleracion: "0-100 km/h en 2.9 s",
        motor: "V12",
        imagen: "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?auto=format&fit=crop&w=1000&q=80",
        descripcion: "Gran turismo diseñado alrededor de la experiencia del motor de doce cilindros."
    },

    {
        id: 6,
        nombre: "Ferrari 812 Superfast",
        categoria: "Deportivo",
        precio: 380000,
        potencia: "800 CV",
        velocidad: "340 km/h",
        aceleracion: "0-100 km/h en 2.9 s",
        motor: "V12",
        imagen: "https://images.unsplash.com/photo-1566023888470-8a1c0d9e4e95?auto=format&fit=crop&w=1000&q=80",
        descripcion: "Deportivo de altas prestaciones enfocado en potencia y experiencia de conducción."
    }
];


/* ================= VARIABLES ================= */

let carrito = [];

let vehiculoSeleccionado = null;


/* ================= FORMATO DE MONEDA ================= */

function formatoMoneda(valor) {

    return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
        maximumFractionDigits: 0
    }).format(valor);

}


/* ================= MENÚ RESPONSIVE ================= */

function toggleMenu() {

    const nav = document.getElementById("nav");

    nav.classList.toggle("open");

}


/* ================= FILTRAR MODELOS ================= */

function filtrarModelos(categoria, boton) {

    const tarjetas = document.querySelectorAll(".car-card");

    const botones = document.querySelectorAll(".filter");

    botones.forEach(btn => {
        btn.classList.remove("active");
    });

    boton.classList.add("active");


    tarjetas.forEach(tarjeta => {

        const categoriaTarjeta = tarjeta.dataset.category;

        if (categoria === "todos" || categoriaTarjeta === categoria) {

            tarjeta.style.display = "block";

        } else {

            tarjeta.style.display = "none";

        }

    });

}


/* ================= VER DETALLES ================= */

function verDetalles(id) {
    const vehiculo = vehiculos.find(auto => auto.id === id);

    if (!vehiculo) {
        return;
    }

    const contenido = document.getElementById("detalleContenido");

    contenido.innerHTML = [
        '<div class="detail-content">',
        '<p class="section-subtitle">' + vehiculo.categoria.toUpperCase() + '</p>',
        '<h2>' + vehiculo.nombre + '</h2>',
        '<div class="detail-grid">',
        '<div class="detail-image"><img src="' + vehiculo.imagen + '" alt="' + vehiculo.nombre + '" /></div>',
        '<div class="detail-info">',
        '<h3>' + formatoMoneda(vehiculo.precio) + '</h3>',
        '<p>' + vehiculo.descripcion + '</p>',
        '<div class="detail-specs">',
        '<div class="detail-spec"><span>Potencia</span><strong>' + vehiculo.potencia + '</strong></div>',
        '<div class="detail-spec"><span>Velocidad</span><strong>' + vehiculo.velocidad + '</strong></div>',
        '<div class="detail-spec"><span>Aceleración</span><strong>' + vehiculo.aceleracion + '</strong></div>',
        '<div class="detail-spec"><span>Motor</span><strong>' + vehiculo.motor + '</strong></div>',
        '</div></div></div>',
        '<button class="btn btn-primary btn-full" onclick="abrirCompra(' + vehiculo.id + ')">COMPRAR ESTE VEHÍCULO</button>',
        '</div>'
    ].join('');

    abrirModal("modalDetalles");

}


/* ================= ABRIR COMPRA ================= */

function abrirCompra(id) {

    const vehiculo = vehiculos.find(auto => auto.id === id);

    if (!vehiculo) {
        return;
    }


    vehiculoSeleccionado = vehiculo;


    document.getElementById("autoSeleccionado").innerHTML = `

        <strong>${vehiculo.nombre}</strong><br>

        <span>
            Precio base:
            ${formatoMoneda(vehiculo.precio)}
        </span>

    `;


    document.getElementById("cantidad").value = 1;

    document.getElementById("clienteNombre").value = "";

    document.getElementById("clienteCorreo").value = "";

    document.getElementById("metodoPago").value = "";


    calcularPrevisualizacion();


    cerrarModal("modalDetalles");

    abrirModal("modalCompra");

}


/* ================= CALCULAR PREVISUALIZACIÓN ================= */

function calcularPrevisualizacion() {

    if (!vehiculoSeleccionado) {
        return;
    }


    const cantidad = Number(
        document.getElementById("cantidad").value
    );


    if (cantidad < 1) {
        return;
    }


    const subtotal = vehiculoSeleccionado.precio * cantidad;

    const descuento = calcularDescuento(subtotal);

    const total = subtotal - descuento;


    document.getElementById("precioPreview").innerHTML = `

        <div class="price-row">
            <span>Precio unitario</span>
            <strong>${formatoMoneda(vehiculoSeleccionado.precio)}</strong>
        </div>

        <div class="price-row">
            <span>Cantidad</span>
            <strong>${cantidad}</strong>
        </div>

        <div class="price-row">
            <span>Subtotal</span>
            <strong>${formatoMoneda(subtotal)}</strong>
        </div>

        <div class="price-row discount">
            <span>Descuento</span>
            <strong>- ${formatoMoneda(descuento)}</strong>
        </div>

        <div class="price-row total">
            <span>Total</span>
            <strong>${formatoMoneda(total)}</strong>
        </div>

    `;

}


/* ================= ALGORITMO DE DESCUENTO ================= */

function calcularDescuento(subtotal) {

    let porcentaje = 0;


    /*
        ALGORITMO CONDICIONAL:

        Si la compra es mayor o igual a $1,000,000
        se aplica 10%.

        Si es mayor o igual a $500,000
        se aplica 7%.

        Si es mayor o igual a $300,000
        se aplica 5%.

        En cualquier otro caso no se aplica descuento.
    */


    if (subtotal >= 1000000) {

        porcentaje = 0.10;

    } else if (subtotal >= 500000) {

        porcentaje = 0.07;

    } else if (subtotal >= 300000) {

        porcentaje = 0.05;

    } else {

        porcentaje = 0;

    }


    return subtotal * porcentaje;

}


/* ================= PROCESAR COMPRA ================= */

function procesarCompra(evento) {

    evento.preventDefault();


    if (!vehiculoSeleccionado) {

        alert("No has seleccionado ningún vehículo.");

        return;

    }


    const nombre = document
        .getElementById("clienteNombre")
        .value
        .trim();


    const correo = document
        .getElementById("clienteCorreo")
        .value
        .trim();


    const metodoPago = document
        .getElementById("metodoPago")
        .value;


    const cantidad = Number(
        document.getElementById("cantidad").value
    );


    /* VALIDACIÓN */

    if (
        nombre === "" ||
        correo === "" ||
        metodoPago === "" ||
        cantidad < 1
    ) {

        alert("Por favor, completa todos los campos.");

        return;

    }


    /* CÁLCULOS */

    const subtotal = vehiculoSeleccionado.precio * cantidad;

    const descuento = calcularDescuento(subtotal);

    const total = subtotal - descuento;


    /* AGREGAR AL CARRITO */

    const compra = {

        id: Date.now(),

        vehiculoId: vehiculoSeleccionado.id,

        nombreVehiculo: vehiculoSeleccionado.nombre,

        precio: vehiculoSeleccionado.precio,

        cantidad: cantidad,

        subtotal: subtotal,

        descuento: descuento,

        total: total,

        cliente: nombre,

        correo: correo,

        metodoPago: metodoPago

    };


    carrito.push(compra);


    actualizarContadorCarrito();


    /* MOSTRAR RESULTADO */

    mostrarResultado(compra);


    cerrarModal("modalCompra");

}


/* ================= MOSTRAR RESULTADO ================= */

function mostrarResultado(compra) {

    const metodoTexto =
        compra.metodoPago === "contado"
            ? "Pago al contado"
            : "Financiamiento";


    document.getElementById("resultadoCompra").innerHTML = `

        <div class="result-box">

            <p>
                <strong>Cliente:</strong>
                ${compra.cliente}
            </p>

            <p>
                <strong>Vehículo:</strong>
                ${compra.nombreVehiculo}
            </p>

            <p>
                <strong>Cantidad:</strong>
                ${compra.cantidad}
            </p>

            <p>
                <strong>Subtotal:</strong>
                ${formatoMoneda(compra.subtotal)}
            </p>

            <p>
                <strong>Descuento:</strong>
                ${formatoMoneda(compra.descuento)}
            </p>

            <p>
                <strong>Forma de pago:</strong>
                ${metodoTexto}
            </p>

            <p>
                <strong>Total:</strong>
                ${formatoMoneda(compra.total)}
            </p>

        </div>

    `;


    abrirModal("modalResultado");

}


/* ================= CARRITO ================= */

function actualizarContadorCarrito() {

    const contador = document.getElementById("contadorCarrito");

    const cantidad = carrito.reduce(
        (total, compra) => total + compra.cantidad,
        0
    );


    contador.textContent = cantidad;

}


/* ================= ABRIR CARRITO ================= */

function abrirCarrito() {

    const contenido = document.getElementById("contenidoCarrito");


    if (carrito.length === 0) {

        contenido.innerHTML = `

            <div class="empty-cart">

                <h3>Tu carrito está vacío</h3>

                <p>
                    Selecciona un vehículo para comenzar.
                </p>

            </div>

        `;

        abrirModal("modalCarrito");

        return;

    }


    let html = "";

    let totalCarrito = 0;


    carrito.forEach((compra, indice) => {

        const vehiculo = vehiculos.find(
            auto => auto.id === compra.vehiculoId
        );


        totalCarrito += compra.total;


        html += `

            <div class="cart-item">

                <img
                    src="${vehiculo.imagen}"
                    alt="${vehiculo.nombre}"
                >

                <div class="cart-item-info">

                    <h4>
                        ${compra.nombreVehiculo}
                    </h4>

                    <p>
                        Cantidad:
                        ${compra.cantidad}
                    </p>

                    <p>
                        Total:
                        ${formatoMoneda(compra.total)}
                    </p>

                </div>

                <button
                    class="cart-remove"
                    onclick="eliminarDelCarrito(${indice})"
                >
                    Eliminar
                </button>

            </div>

        `;

    });


    html += `

        <div class="price-preview">

            <div class="price-row total">

                <span>Total del carrito</span>

                <strong>
                    ${formatoMoneda(totalCarrito)}
                </strong>

            </div>

        </div>

    `;


    contenido.innerHTML = html;


    abrirModal("modalCarrito");

}


/* ================= ELIMINAR CARRITO ================= */

function eliminarDelCarrito(indice) {

    carrito.splice(indice, 1);

    actualizarContadorCarrito();

    abrirCarrito();

}


/* ================= MODALES ================= */

function abrirModal(id) {

    const modal = document.getElementById(id);

    modal.classList.add("show");

    document.body.style.overflow = "hidden";

}


function cerrarModal(id) {

    const modal = document.getElementById(id);

    modal.classList.remove("show");

    document.body.style.overflow = "auto";

}


/* ================= CERRAR MODAL AL HACER CLICK AFUERA ================= */

window.addEventListener("click", function(evento) {

    if (evento.target && evento.target.classList && evento.target.classList.contains("modal")) {

        evento.target.classList.remove("show");

        document.body.style.overflow = "auto";

    }

});


/* ================= CONTACTO ================= */

function enviarContacto(evento) {

    evento.preventDefault();


    const nombre = document
        .getElementById("nombreContacto")
        .value
        .trim();


    if (nombre === "") {

        alert("Por favor, ingresa tu nombre.");

        return;

    }


    alert(
        `Gracias ${nombre}. Tu mensaje ha sido enviado correctamente.`
    );


    document
        .querySelector(".contact-form")
        .reset();

}


/* ================= INICIO ================= */

document.addEventListener("DOMContentLoaded", function() {

    actualizarContadorCarrito();

});
