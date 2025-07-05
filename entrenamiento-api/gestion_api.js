function obtenerProductos() {
  fetch("http://localhost:3000/productos")
    .then((respuesta) => respuesta.json()) //*retorna el json si los datos son obtenidos
    .then((datos) => {
      console.log("los datos obtenidos son:", datos);
    })
    .catch((error) => {
      console.log("ocurrio un error", error);
    });
}

obtenerProductos();

function crearProducto(nuevoProducto) {
  if (!nuevoProducto.nombre || typeof nuevoProducto.nombre !== "string") {
    console.log("❌ El nombre del producto es inválido.");
    return;
  }
  if (typeof nuevoProducto.precio !== "number" || !nuevoProducto.precio) {
    console.log("❌ El precio debe ser un número mayor a 0.");
    return;
  }
  fetch("http://localhost:3000/productos", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(nuevoProducto),
  })
    .then(function (respuesta) {
      return respuesta.json();
    })
    .then(function (data) {
      console.log("✅ Producto agregado con éxito:", data);
    })
    .catch(function (error) {
      console.log("❌ Error al agregar el producto:", error);
    });
}

function actualizarProducto (id, datosActualizados){
    if(typeof id !== "number" || id <= 0 ){
        console.log("❌ El ID debe ser un número válido.");
        return
    }
    if(typeof datosActualizados.nombre !== "string" || !datosActualizados.nombre){
        console.log("❌ El nombre del producto es inválido.");
        return;
    }
    if(typeof datosActualizados.precio !== "number" || !datosActualizados.precio){
        console.log("❌ El precio debe ser un número mayor a 0.");
        return;
    }
    fetch("http://localhost:3000/ID", {
        method: "PUT",
        headers: {
            "content-Type": "application/JSON"
        },
        body: JSON.stringify(datosActualizados)
    })
    .then(function(respuesta){
        return respuesta.JSON;
    })
    .then(function(data){
        console.log("✅ Producto actualizado con éxito:", data);
    })
    .catch(function(error){
        console.log("❌ Error al actualizar el producto:", error);
    })
}

function eliminarProducto(id){
  if((typeof id !== "number" && typeof id !== "string") || !id){
    console.log("❌ El ID debe ser un número válido.");
    return;
  }
  fetch(`http://localhost:3000/productos/${id}`, {
    method: "DELETE"
  })
  .then(function(respuesta){
    if (respuesta.ok){
      console.log(`🗑️ Producto con ID ${id} eliminado con éxito.`)
    }else{
      console.log("❌ No se pudo eliminar el producto.");
    }
  })
  .catch (function (error){
    console.log("❌ Error al eliminar el producto:", error);
  });
}

eliminarProducto("a86b")