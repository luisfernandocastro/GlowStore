// Product Data (Women's Clothing Catalog)
const productos = [
    {
        id: 1,
        nombre: "Blusa crop para mujer",
        precio: 139.900,
        imagen: "https://elaco.vtexassets.com/arquivos/ids/877353/_AMO9515.jpg?v=639057257476970000",
        descripcion: "Blusa de tiras largo crop elaborada en lentejuelas blusa crop para muje"
    },
    {
        id: 2,
        nombre: "Blusa tejida manga corta tipo polo",
        precio: 149.900,
        imagen: "https://elaco.vtexassets.com/arquivos/ids/832592/BLUSA-NAVY-E174457-3.jpg?v=638920740136400000",
        descripcion: "Blusa manga corta tejida con cuello tipo polo viscosa 65% poliéster 35%"
    },
    {
        id: 3,
        nombre: "Bolso de mano costero",
        precio: 149.900,
        imagen: "https://elaco.vtexassets.com/arquivos/ids/815770/5-MARZO9237.jpg.jpg?v=638882014195100000",
        descripcion: "Bolso de mano costero elaborado en sintético con manijas en contraste y herrajes dorados."
    },
    {
        id: 4,
        nombre: "Enterizo para mujer manga corta",
        precio: 179.900,
        imagen: "https://elaco.vtexassets.com/arquivos/ids/811400/ENTERIZO-MOKA-E123006-2.jpg?v=638917591311030000",
        descripcion: "Enterizo para mujer manga corta elaborado en sintético con manijas en contraste y herrajes dorados."
    },
    {
        id: 5,
        nombre: "Enterizo short mc para mujer",
        precio: 99.450,
        imagen: "https://elaco.vtexassets.com/arquivos/ids/844046/ENTERIZO-VINOTINTO-E123026-1.jpg?v=638961419812830000",
        descripcion: "Elegancia atemporal para cualquier ocasión."
    },
    {
        id: 6,
        nombre: "Chaqueta biker en suede para mujer",
        precio: 229.900,
        imagen: "https://elaco.vtexassets.com/arquivos/ids/863589/Chaquetas-BEIGE-E076041-3.jpg?v=639002912619170000",
        descripcion: "Chaqueta manga larga tipo biker elaborada en tejido efecto suede poliéster 100% 100.00% poliéster/polyester."
    },
    // --------------------------
    {
        id: 7,
        nombre: "Bolso de mano costero",
        precio: 149.900,
        imagen: "https://elaco.vtexassets.com/arquivos/ids/876267/Bolsosycarteras-CAMEL-E402682-2.jpg?v=639050594822870000",
        descripcion: "Bolso de mano costero combinacion de materiales bolso de mano costero"
    },
    {
        id: 8,
        nombre: "Chaqueta acolchada con estampado",
        precio: 500.000,
        imagen: "https://www.versace.com/dw/image/v2/BGWN_PRD/on/demandware.static/-/Sites-ver-master-catalog/default/dwe80e6e28/original/90_1022414-1A16815_5Y570_10_PrintedPaddedJacket-Jackets-Versace-online-store_0_1.jpg?sw=850&q=85&strip=true",
        descripcion: "Una chaqueta acolchada corta con un estampado Barocco, una capucha elástica extraíble con cordón y botones de Medusa decorativos."
    },
    {
        id: 9,
        nombre: "Zapatillas greca con plataforma",
        precio: 320.000,
        imagen: "https://www.versace.com/dw/image/v2/BGWN_PRD/on/demandware.static/-/Sites-ver-master-catalog/default/dw33340b2c/original/90_1022346-1A15305_2PS80_22_LaGrecaSuedePlatformSneakers-Sneakers-Versace-online-store_0_2.jpg?sw=850&q=85&strip=true",
        descripcion: "Zapatillas de caña baja confeccionadas en ante que se caracterizan por un motivo de Greca en el mismo tono bordado en el lateral."
    }

    
];

let carrito = [];

// DOM Elements
const contenedorProductos = document.getElementById('contenedor-productos');
const contadorCarrito = document.getElementById('contador-carrito');
const itemsCarrito = document.getElementById('items-carrito');
const totalPrecio = document.getElementById('total-precio');
const btnVaciar = document.getElementById('vaciar-carrito');

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    renderizarProductos();
    actualizarCarrito(); // To initialize 0 state if any saved data logic is added later
});

// Render Products
function renderizarProductos() {
    contenedorProductos.innerHTML = '';
    productos.forEach(producto => {
        const div = document.createElement('div');
        div.classList.add('col-md-4', 'mb-5');
        div.innerHTML = `
            <div class="card h-100 shadow-sm border-0 mt-5" style="background-color: #C3C3E6;">
                <img src="${producto.imagen}" class="card-img-top" alt="${producto.nombre}" style="height: 300px; object-fit: cover;">
                <div class="card-body p-4">
                    <div class="text-center">
                        <h5 class="fw-bolder">${producto.nombre}</h5>
                        <p class="text-muted small">${producto.descripcion}</p>
                        <span class="text-muted text-decoration-line-through me-2">$${(producto.precio * 1.2).toFixed(3)}</span>
                        <span class="fw-bold fs-5">$${producto.precio.toFixed(3)}</span>
                    </div>
                </div>
                <div class="card-footer p-4 pt-0 border-top-0 bg-transparent">
                    <div class="text-center">
                        <button class="btn btn-outline-dark mt-auto" onclick="agregarAlCarrito(${producto.id})">
                            Agregar al carrito
                        </button>
                    </div>
                </div>
            </div>
        `;
        contenedorProductos.appendChild(div);
    });
}

// Add to Cart
function agregarAlCarrito(id) {
    const producto = productos.find(p => p.id === id);
    if (producto) {
        carrito.push(producto);
        actualizarCarrito();
    }
}

// Update Cart UI
function actualizarCarrito() {
    // Update Badge Count
    contadorCarrito.innerText = carrito.length;

    // Render Cart Items in Modal
    itemsCarrito.innerHTML = '';

    if (carrito.length === 0) {
        itemsCarrito.innerHTML = '<p class="text-center text-muted">Tu carrito está vacío.</p>';
    } else {
        carrito.forEach((producto, index) => {
            const div = document.createElement('div');
            div.classList.add('d-flex', 'justify-content-between', 'align-items-center', 'mb-3', 'border-bottom', 'pb-2');
            div.innerHTML = `
                <div>
                    <h6 class="mb-0">${producto.nombre}</h6>
                    <small class="text-muted">$${producto.precio.toFixed(3)}</small>
                </div>
                <button class="btn btn-sm btn-danger" onclick="eliminarDelCarrito(${index})">
                    <i class="fas fa-trash-alt"></i> X
                </button>
            `;
            itemsCarrito.appendChild(div);
        });
    }

    // Update Total Price
    const total = carrito.reduce((acc, prod) => acc + prod.precio, 0);
    totalPrecio.innerText = total.toFixed(3);
}

// Remove Item from Cart
function eliminarDelCarrito(index) {
    carrito.splice(index, 1);
    actualizarCarrito();
}

// Empty Cart
btnVaciar.addEventListener('click', () => {
    carrito = [];
    actualizarCarrito();
});
