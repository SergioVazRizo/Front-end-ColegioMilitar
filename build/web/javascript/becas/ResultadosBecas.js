const solicitudesAceptadas = [];
const solicitudesAceptadasBody = document.getElementById('solicitudesAceptadasBody');
const buscador = document.getElementById('buscador');

// Barre de navegacion
function cargarNavegacion() {
    const rol = localStorage.getItem('rol'); // Obtener el rol del usuario desde localStorage
    const navbarContainer = document.getElementById('navbar'); // Asumiendo que tienes un div con id "navbar" en tu HTML

    if (rol === 'ESTUDIANTE') {
        navbarContainer.innerHTML = `
            <nav class="navbar navbar-dark bg-dark">
                <div class="container-fluid">
                    <a class="navbar-brand" href="../PrincipalPrueba.html">Soy Estudiante</a>

                    <div class="ms-auto d-flex align-items-center"> <!-- Alineación a la derecha -->
                        <button class="navbar-toggler me-2" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
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
                                    <li class="nav-item">
                                <a class="nav-link active" aria-current="page" href="grupos.html">grupos</a>
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

                    <div class="ms-auto d-flex align-items-center"> <!-- Alineación a la derecha -->
                        <button class="navbar-toggler me-2" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
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

// Función para cargar las solicitudes aceptadas
async function cargarSolicitudesAceptadas() {
    try {
        const response = await fetch('http://localhost:8082/api/solicitudBeca');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        
        console.log('Datos obtenidos:', data); // Log de datos obtenidos
        
        const solicitudesFiltradas = data.filter(solicitud => solicitud.estadoSolicitud === 'Aprobada');
        
        // Verifica si hay solicitudes aceptadas
        if (solicitudesFiltradas.length === 0) {
            Swal.fire({
                icon: 'info',
                title: 'Sin solicitudes aceptadas',
                text: 'No hay solicitudes aceptadas en este momento.',
            });
        }
        
        solicitudesAceptadas.push(...solicitudesFiltradas);
        renderizarSolicitudesAceptadas();
    } catch (error) {
        console.error('Error al cargar las solicitudes:', error);
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Error al cargar las solicitudes: ' + error.message,
        });
    }
}

// Función para cargar las solicitudes rechazadas
async function cargarSolicitudesRechazadas() {
    try {
        const response = await fetch('http://localhost:8082/api/solicitudBeca');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        
        console.log('Datos obtenidos:', data); 
        
        const solicitudesFiltradas = data.filter(solicitud => solicitud.estadoSolicitud === 'Rechazada');
        
        solicitudesAceptadas.push(...solicitudesFiltradas);
        renderizarSolicitudesAceptadas();
    } catch (error) {
        console.error('Error al cargar las solicitudes:', error);
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Error al cargar las solicitudes: ' + error.message,
        });
    }
}


// Función para renderizar la tabla de solicitudes aceptadas
function renderizarSolicitudesAceptadas() {
    solicitudesAceptadasBody.innerHTML = ''; // Limpiar la tabla
    solicitudesAceptadas.forEach(solicitud => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${solicitud.idSolicitudBeca}</td>
            <td>${solicitud.alumnoId}</td>
            <td>${solicitud.beca ? solicitud.beca.nombreBeca : 'N/A'}</td>
            <td>${solicitud.estadoSolicitud}</td>
            <td>${solicitud.comentariosSolicitud}</td>
        `;
        solicitudesAceptadasBody.appendChild(row);
    });
}

// Función para filtrar solicitudes por ID del alumno
function filtrarSolicitudes() {
    const textoBusqueda = buscador.value.toLowerCase();
    const filas = solicitudesAceptadasBody.getElementsByTagName('tr');

    for (let i = 0; i < filas.length; i++) {
        const idAlumno = filas[i].getElementsByTagName('td')[1].textContent; // ID Alumno es la segunda columna
        if (idAlumno.toLowerCase().includes(textoBusqueda)) {
            filas[i].style.display = ''; // Mostrar fila
        } else {
            filas[i].style.display = 'none'; // Ocultar fila
        }
    }
}

// Cargar datos al inicio
cargarSolicitudesAceptadas();
cargarSolicitudesRechazadas();
window.onload = cargarNavegacion;
