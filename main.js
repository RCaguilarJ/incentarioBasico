let inventario = [];

function agregarPar() {
  const color = document.getElementById("colorInput").value;
  const talla = document.getElementById("tallaInput").value;
  const modelo = document.getElementById("modeloInput").value;
  const cantidad = parseInt(document.getElementById("cantidadInput").value);

  const parExistente = inventario.find(
    (par) => par.color === color && par.talla === talla && par.modelo === modelo
  );

  if (parExistente) {
    parExistente.cantidad += cantidad;
  } else {
    inventario.push({ color, talla, modelo, cantidad });
  }

  localStorage.setItem("inventario", JSON.stringify(inventario));

  document.getElementById("colorInput").value = "";
  document.getElementById("tallaInput").value = "";
  document.getElementById("modeloInput").value = "";
  document.getElementById("cantidadInput").value = 1;

  actualizarInventario();
}

function quitarPar() {
  localStorage.setItem("inventario", JSON.stringify(inventario));

  const color = document.getElementById("colorInput").value;
  const talla = document.getElementById("tallaInput").value;
  const modelo = document.getElementById("modeloInput").value;

  // Buscar el par de tenis en el inventario
  const parExistente = inventario.find(
    (par) => par.color === color && par.talla === talla && par.modelo === modelo
  );

  if (parExistente && parExistente.cantidad > 0) {
    parExistente.cantidad--;
    actualizarInventario(); // Llamar a esta función para reflejar los cambios en la tabla
  }
}

function guardarInventario() {
  localStorage.setItem("inventario", JSON, stringify(inventario));
}

function recuperarInventario() {
  const inventarioGuardado = localStorage.getItem("inventario");
  if (inventarioGuardado) {
    inventario = JSON.parse(inventarioGuardado);
  }
}

window.addEventListener("load", recuperarInventario);

function actualizarInventario() {
  const inventarioTableBody = document.querySelector("#inventario tbody");
  inventarioTableBody.innerHTML = "";

  inventario.forEach((par) => {
    const fila = document.createElement("tr");
    fila.innerHTML = `
            <td>${par.color}</td>
            <td>${par.talla}</td>
            <td>${par.modelo}</td>
            <td>${par.cantidad}</td>
        `;
    inventarioTableBody.appendChild(fila);
  });
  guardarInventario();
}
