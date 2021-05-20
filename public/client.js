const socket = io.connect();
let btnAdd = document.getElementById('btnForm');
let title = document.getElementById('title');

socket.on('all-productos', (data) => {
    
    console.log('data en cliente',data);
    if (data == "") {
        sinProd()
    } else {
        renderProducto(data)
    }
});

function renderProducto(data) {
    let prod = data.map((elem, id) => {
        return (
            `<tr><td>${elem.id}</td>
        <td>${elem.title}</td>
        <td>${elem.price}</td>
        <td><img src=${elem.thumbnail} style="width:32px; heigth:32px"></td></tr>`)
    });
    document.getElementById('tableProd').innerHTML = prod
}

function sinProd() {
    let aviso = document.getElementById('aviso');
    aviso.innerHTML = `<h3 class="alert alert-warning">No hay productos cargados</h3>`
    table.style.display = "none";
}

let btnUpdate = document.getElementById('btnUpdate');

btnUpdate.addEventListener('click', () => {
    socket.emit('update')
});

socket.on('updateProductos', async (data) => {
    renderProducto(await data)
})

let botonChat = document.getElementById('btnChat');
let pantalla = document.getElementById('pantalla');

botonChat.addEventListener('click', () => { validar() });

function validar() {
    let usuario = document.getElementById('email').value
    let mensaje = document.getElementById('mensajeUsuario').value
    if (mensaje === "" || usuario === "") {
        alert(`CAMPOS REQUERIDOS`)
    } else {
        let nuevoMensaje = {
            usuario: document.getElementById('email').value,
            mensaje: document.getElementById('mensajeUsuario').value
        };
        socket.emit('new-message', nuevoMensaje);
        document.getElementById('mensajeUsuario').value = ""
    }
}

let date = new Date()
newDate = [
    date.getDate(),
    date.getMonth() + 1,
    date.getFullYear()].join('/') + ' ' +
    [date.getHours(),
    date.getMinutes(),
    date.getSeconds()].join(':');
console.log(newDate);

function renderMessage(data) {
    let html = data.map((elem, i) => {
        return (`
        <div>
        Usuario: <strong style="color:blue">${elem.usuario}</strong></span>
        (a las <span>${newDate.toString()}</span>): <i style="color:green">${elem.mensaje}</i></div>`);
    }).join(' ');
    document.getElementById('pantalla').innerHTML = html;
}

socket.on('message', (data) => {
    renderMessage(data)
});




