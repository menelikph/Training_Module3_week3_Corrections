const contenedor = document.getElementById("lista-productos");
const inputNombre = document.getElementById("nombre");
const inputPrecio = document.getElementById("precio");
const botonAgregar = document.getElementById("agregar");


fetch("http://localhost:3000/productos")
.then(function(respuesta){
    return respuesta.json();
})
.then(productos => {
    productos.forEach(producto => {
        const parrafo = document.createElement("p")
        parrafo.textContent = producto.nombre + " - $" + producto.precio;
        contenedor.appendChild(parrafo);
    });
})

botonAgregar.addEventListener("click", function () {
  const nuevoProducto = {
    nombre: inputNombre.value.trim(),
    precio: Number(inputPrecio.value)
  };

  if (!nuevoProducto.nombre || !nuevoProducto.precio) {
    console.log("❌ Debes escribir nombre y precio válidos.");
    return;
  }

  fetch("http://localhost:3000/productos", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(nuevoProducto)
  })
    .then(res => res.json())
    .then(data => {
      console.log("✅ Producto agregado:", data);
      inputNombre.value = "";
      inputPrecio.value = "";
      obtenerProductos(); // ← vuelve a mostrar la lista actualizada
    })
    .catch(error => {
      console.log("❌ Error al agregar:", error);
    });
});

