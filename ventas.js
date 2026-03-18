const tabla = document.getElementById("tabla-productos");
const totalFinal = document.getElementById("total-final");

let ventas = [];
let gastos = 0;

// Renderizar tabla
function cargarTabla() {
    tabla.innerHTML = "";

    productos.forEach(prod => {
        const fila = document.createElement("tr");

        fila.innerHTML = `
            <td>${prod.nombre}</td>
            <td>${prod.precio.toFixed(3)}</td>
            <td>${prod.costo.toFixed(3)}</td>
            <td><input type="number" min="0" value="0" onchange="calcularTotal()"></td>
            <td class="venta">0</td>
            <td class="ganancia">0</td>
            <td class="porcentaje">0%</td>
        `;

        tabla.appendChild(fila);
    });
}
cargarTabla();

// Calcular total
function calcularTotal() {
    let totalVentas = 0;
    let totalGanancia = 0;

    const filas = tabla.querySelectorAll("tr");

    filas.forEach((fila, i) => {
        const precio = productos[i].precio;
        const costo = productos[i].costo;
        const cantidad = fila.children[3].children[0].value;

        const totalVenta = precio * cantidad;
        const totalCosto = costo * cantidad;
        const ganancia = totalVenta - totalCosto;

        let porcentaje = 0;
        if (totalCosto > 0) {
            porcentaje = (ganancia / totalCosto) * 100;
        }

        fila.children[4].innerText = totalVenta.toFixed(3);
        fila.children[5].innerText = ganancia.toFixed(3);
        fila.children[6].innerText = porcentaje.toFixed(1) + "%";

        totalVentas += totalVenta;
        totalGanancia += ganancia;
    });

    // aplicar descuento
    let descuento = document.getElementById("descuento").value;
    totalVentas = totalVentas - (totalVentas * (descuento / 100));

    document.getElementById("total-final").innerText = totalVentas.toFixed(3);

    // MOSTRAR GANANCIA TOTAL
    document.getElementById("ganancia-total").innerText = totalGanancia.toFixed(3);
}

// Registrar venta
function registrarVenta() {
    let total = totalFinal.innerText;
    let promo = document.getElementById("promo").value;

    ventas.push({ total, promo });

    const lista = document.getElementById("ventas-dia");
    const li = document.createElement("li");

    li.innerText = `Venta: $${total} | Promo: ${promo}`;
    lista.appendChild(li);
}

// Gastos
function agregarGasto() {
    let valor = parseFloat(document.getElementById("gasto-input").value);
    gastos += valor;

    document.getElementById("total-gastos").innerText = gastos;
}

// Crédito
function calcularCredito() {
    let porcentaje = document.getElementById("porcentaje-credito").value;
    let total = parseFloat(totalFinal.innerText);

    let credito = total * (porcentaje / 100);

    document.getElementById("credito").innerText = credito.toFixed(0);
}