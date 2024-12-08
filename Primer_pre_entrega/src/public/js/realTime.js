const socket = io()

const btnBorrar = document.querySelectorAll('.btnBorrar');

btnBorrar.forEach(button => {
    button.addEventListener('click', (event) => {
      const productoId = event.target.getAttribute('data-id');
      socket.emit('borrarproducto', { id: productoId });
    });
  });

  formAgregar = document.querySelector('.formAgregar');
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

