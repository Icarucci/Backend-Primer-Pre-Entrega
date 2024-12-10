const socket = io();

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
  const contenedor = document.querySelector('.row');
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

  //Asigno el evento de eliminación al botón de eliminar
  const newBtnBorrar = document.querySelector(`.btnBorrar[data-id="${nuevoProducto.id}"]`);
  newBtnBorrar.addEventListener('click', (event) => {
    const productoId = event.target.getAttribute('data-id');
    socket.emit('borrarproducto', { id: productoId });

    //Eliminamos el producto del DOM
    const cardToRemove = event.target.closest('.col-md-4');
    if (cardToRemove) {
      cardToRemove.remove();
    }
  });
});

//Escuchamos el evento de eliminación de un producto desde el servidor
socket.on('productoEliminado', (productoId) => {
  const productoCard = document.querySelector(`[data-id="${productoId}"]`);
  if (productoCard) {
    const cardBorrar = productoCard.closest('.col-md-4');
    if (cardBorrar) {
      cardBorrar.remove();
    }
  }
});