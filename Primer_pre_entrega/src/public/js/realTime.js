const socket = io();

//Delegación de eventos para la eliminación de productos
document.querySelector('.contenedorDeProductos').addEventListener('click', (event) => {
  if (event.target && event.target.classList.contains('btnBorrar')) {
    const productoId = event.target.getAttribute('data-id');
    console.log('Producto a eliminar:', productoId);

    socket.emit('borrarproducto', { id: productoId });

    //Eliminar el producto del DOM con el data-id
    const cardToRemove = document.querySelector(`[data-id="${productoId}"]`);
    if (cardToRemove) {
      cardToRemove.remove();
    }
  }
});

//Envio del formulario
const formAgregar = document.querySelector('.formAgregar');
formAgregar.addEventListener('submit', (e) => {
  e.preventDefault();
  const formData = new FormData(formAgregar);
  const datosProducto = {};

  formData.forEach((value, key) => {
    if (key === "precio" || key === "stock") {
      datosProducto[key] = parseFloat(value);
    } else {
      datosProducto[key] = value;
    }
  });

  datosProducto["status"] = true;
  socket.emit('agregarProducto', datosProducto);
  console.log(datosProducto);
  formAgregar.reset();
});

//Para visualizar el nuevo producto agregado en el FrontEnd
socket.on('productoAgregado', (nuevoProducto) => {
  const contenedor = document.querySelector('.contenedorDeProductos');
  const productoCard = `
      <div class="col-md-4 mb-4" data-id="${nuevoProducto.id}">
          <div class="card" style="width: 18rem;">
              <img class="card-img-top" src="${nuevoProducto.imagen}" alt="Card image cap">
              <div class="card-body">
                  <h5 class="card-title">${nuevoProducto.titulo}</h5>
                  <p class="card-text">${nuevoProducto.descripcion}</p>
              </div>
              <ul class="list-group list-group-flush">
                  <li class="list-group-item">Código: ${nuevoProducto.codigo}</li>
                  <li class="list-group-item">Categoria: ${nuevoProducto.categoria}</li>
                  <li class="list-group-item">Precio: ${nuevoProducto.precio}</li>
                  <li class="list-group-item">Stock: ${nuevoProducto.stock}</li>
              </ul>
              <button class="btn btn-danger w-100 py-2 mt-2 hover-shadow-lg btnBorrar" data-id="${nuevoProducto.id}">Eliminar</button>
          </div>
      </div>
  `;
  contenedor.innerHTML += productoCard;
});

//Escuchar el evento de eliminación desde el servidor
socket.on('productoEliminado', (productoId) => {
  const productoCard = document.querySelector(`[data-id="${productoId}"]`);
  if (productoCard) {
    productoCard.remove();  // Directamente eliminamos el contenedor del producto
  }
});