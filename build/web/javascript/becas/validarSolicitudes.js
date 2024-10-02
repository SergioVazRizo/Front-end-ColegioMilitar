const solicitudes = []; // Almacena las solicitudes cargadas
const tableBody = document.getElementById('solicitudesBody');

// Barre de navegacion
function cargarNavegacion() {
    const rol = localStorage.getItem('rol'); // Obtener el rol del usuario desde localStorage
    const navbarContainer = document.getElementById('navbar'); // Asumiendo que tienes un div con id "navbar" en tu HTML

    if (rol === 'ESTUDIANTE') {
        navbarContainer.innerHTML = `
            <nav class="navbar navbar-dark bg-dark">
                <div class="container-fluid">
                    <a class="navbar-brand" href="../PrincipalPrueba.html">Soy estudiante</a>
        <div class="ms-auto d-flex align-items-center">
                    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>
<button class="Btn" onclick="cerrarSesion()">
                <div class="sign">
                    <svg viewBox="0 0 512 512"><path d="M377.9 105.9L500.7 228.7c7.2 7.2 11.3 17.1 11.3 27.3s-4.1 20.1-11.3 27.3L377.9 406.1c-6.4 6.4-15 9.9-24 9.9c-18.7 0-33.9-15.2-33.9-33.9l0-62.1-128 0c-17.7 0-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32l128 0 0-62.1c0-18.7 15.2-33.9 33.9-33.9c9 0 17.6 3.6 24 9.9zM160 96L96 96c-17.7 0-32 14.3-32 32l0 256c0 17.7 14.3 32 32 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-64 0c-53 0-96-43-96-96L0 128C0 75 43 32 96 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32z"></path></svg>
                </div>
                <div class="text">Salir</div>
            </button>
  </div>
                    <div class="collapse navbar-collapse" id="navbarNav">
                        <ul class="navbar-nav me-auto mb-2">
                            <li class="nav-item">
                                <a class="nav-link active" aria-current="page" href="../PrincipalPrueba.html">Inicio</a>
                            </li>
                            <li class="nav-item dropdown">
                                <a class="nav-link dropdown-toggle" role="button" data-bs-toggle="dropdown" aria-expanded="false">Becas</a>
                                <ul class="dropdown-menu">
                                    <li><a class="dropdown-item" href="../becas/CatalogoBecas.html">Registrarse</a></li>
                                    <li><a class="dropdown-item" href="../becas/ResultadosBecas.html">Resultados</a></li>
                                </ul>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        `;
    } else if (rol === 'ESCOLAR') {
        navbarContainer.innerHTML = `
            <nav class="navbar navbar-dark bg-dark">
                <div class="container-fluid">
                    <a class="navbar-brand" href="../PrincipalPrueba.html">Servicios Escolares</a>
        <div class="ms-auto d-flex align-items-center">
                    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>
<button class="btn btn-outline-light" onclick="cerrarSesion()">Cerrar sesión</button>
  </div>
                    <div class="collapse navbar-collapse" id="navbarNav">
                        <ul class="navbar-nav me-auto mb-2">
                            <li class="nav-item">
                                <a class="nav-link active" aria-current="page" href="../PrincipalPrueba.html">Inicio</a>
                            </li>
                            <li class="nav-item dropdown">
                                <a class="nav-link dropdown-toggle" role="button" data-bs-toggle="dropdown" aria-expanded="false">Becas</a>
                                <ul class="dropdown-menu">
                                    <li><a class="dropdown-item" href="../becas/validarSolicitud.html">Validar Solicitudes</a></li>
                                    <li><a class="dropdown-item" href="../becas/ResultadosBecas.html">Resultados</a></li>
                                    <li><a class="dropdown-item" href="../becas/agregarBecas.html">Nuevas Becas</a></li>
                                </ul>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        `;
    } else {
        navbarContainer.innerHTML = `
            <nav class="navbar navbar-dark bg-dark">
                <div class="container-fluid">
                    <a class="navbar-brand" href="PrincipalPrueba.html">No entramos tu rol</a>

                    <div class="ms-auto d-flex align-items-center"> <!-- Contenedor para alinear los elementos a la derecha -->
                        <button class="navbar-toggler me-2" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                            <span class="navbar-toggler-icon"></span>
                        </button>
                        <button class="btn btn-outline-light" onclick="cerrarSesion()">Cerrar sesión</button>
                    </div>

                    <div class="collapse navbar-collapse" id="navbarNav">
                        <ul class="navbar-nav me-auto mb-2">
                            <li class="nav-item">
                                <a class="nav-link active" aria-current="page" href="PrincipalPrueba.html">Inicio</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        `;
    }
}


function cerrarSesion() {
    Swal.fire({
        title: '¿Estás seguro?',
        text: "Estás a punto de cerrar sesión",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí, cerrar sesión',
        cancelButtonText: 'Cancelar'
    }).then((result) => {
        if (result.isConfirmed) {
            window.location.href = "http://localhost:8080/colegioMilitarFront/";
        }
    });
}

// Función para cargar las solicitudes
async function cargarSolicitudes() {
    const response = await fetch('http://localhost:8082/api/solicitudBeca');
    const data = await response.json();
    solicitudes.length = 0; // Limpiar el array antes de agregar nuevos datos
    solicitudes.push(...data);
    renderizarTabla();
}

// Función para renderizar la tabla
function renderizarTabla() {
    tableBody.innerHTML = ''; // Limpiar la tabla
    solicitudes.forEach(solicitud => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${solicitud.idSolicitudBeca}</td>
            <td>${solicitud.alumnoId}</td>
            <td>${solicitud.beca.nombreBeca}</td>
            <td>
                <select data-id="${solicitud.idSolicitudBeca}" onchange="marcarComoCambiado(this)">
                    <option value="Pendiente" ${solicitud.estadoSolicitud === 'Pendiente' ? 'selected' : ''}>Pendiente</option>
                    <option value="Aprobada" ${solicitud.estadoSolicitud === 'Aprobada' ? 'selected' : ''}>Aprobada</option>
                    <option value="Rechazada" ${solicitud.estadoSolicitud === 'Rechazada' ? 'selected' : ''}>Rechazada</option>
                </select>
            </td>
            <td>
                <textarea data-id="${solicitud.idSolicitudBeca}" onchange="marcarComoCambiado(this)">${solicitud.comentariosSolicitud}</textarea>
            </td>
            <td>
                <button id="btnActualizar-${solicitud.idSolicitudBeca}" disabled onclick="actualizarSolicitud(${solicitud.idSolicitudBeca})">Actualizar</button>
            </td>
        `;
        tableBody.appendChild(row);
    });
}

// Función para marcar cambios
function marcarComoCambiado(input) {
    const button = document.getElementById(`btnActualizar-${input.dataset.id}`);
    button.disabled = false; // Habilitar el botón si hubo un cambio
}

// Función para actualizar la solicitud
async function actualizarSolicitud(id) {
    const row = document.querySelector(`select[data-id='${id}']`).parentElement.parentElement;
    const estadoSolicitud = row.querySelector('select').value;
    const comentariosSolicitud = row.querySelector('textarea').value;

    const response = await fetch(`http://localhost:8082/api/solicitudBeca/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            estadoSolicitud,
            comentariosSolicitud
        })
    });

    if (response.ok) {
        // Usar SweetAlert para mostrar éxito
        Swal.fire({
            title: '¡Éxito!',
            text: 'Solicitud actualizada con éxito',
            icon: 'success',
            confirmButtonText: 'Aceptar'
        });
        cargarSolicitudes(); // Recargar las solicitudes para reflejar cambios
    } else {
        // Usar SweetAlert para mostrar error
        Swal.fire({
            title: 'Error',
            text: 'Hubo un problema al actualizar la solicitud',
            icon: 'error',
            confirmButtonText: 'Aceptar'
        });
    }
}


// Cargar solicitudes al inicio
cargarSolicitudes();
cargarNavegacion();
