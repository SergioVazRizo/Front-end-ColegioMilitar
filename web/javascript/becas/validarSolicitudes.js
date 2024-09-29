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
                    <a class="navbar-brand" href="../vistasPrincipales/vistaEstudiantes.html">Soy estudiante</a>
                    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>

                    <div class="collapse navbar-collapse" id="navbarNav">
                        <ul class="navbar-nav me-auto mb-2">
                            <li class="nav-item">
                                <a class="nav-link active" aria-current="page" href="../vistasPrincipales/vistaEstudiantes.html">Inicio</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" href="#">Link</a>
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
                    <a class="navbar-brand" href="../vistasPrincipales/vistaEstudiantes.html">Servicios Escolares</a>
                    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>

                    <div class="collapse navbar-collapse" id="navbarNav">
                        <ul class="navbar-nav me-auto mb-2">
                            <li class="nav-item">
                                <a class="nav-link active" aria-current="page" href="../vistasPrincipales/vistaEstudiantes.html">Inicio</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" href="#">Link</a>
                            </li>
                            <li class="nav-item dropdown">
                                <a class="nav-link dropdown-toggle" role="button" data-bs-toggle="dropdown" aria-expanded="false">Becas</a>
                                <ul class="dropdown-menu">
                                    <li><a class="dropdown-item" href="validarSolicitud.html">Validar Solicitudes</a></li>
                                    <li><a class="dropdown-item" href="ResultadosBecas.html">Resultados</a></li>
                                </ul>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        `;
    }
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
        alert('Solicitud actualizada con éxito');
        cargarSolicitudes(); // Recargar las solicitudes para reflejar cambios
    } else {
        alert('Error al actualizar la solicitud');
    }
}

// Cargar solicitudes al inicio
cargarSolicitudes();
cargarNavegacion();
