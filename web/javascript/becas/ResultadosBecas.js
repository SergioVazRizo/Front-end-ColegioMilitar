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
                    <a class="navbar-brand" href="../vistasPrincipales/vistaEstudiantes.html">ColegioMilitar</a>
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
                    <a class="navbar-brand" href="../vistasPrincipales/vistaEstudiantes.html">ColegioMilitar</a>
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
    } else {
        // Puedes manejar un caso por defecto o una navegación para roles no reconocidos
        navbarContainer.innerHTML = `
            <nav class="navbar navbar-dark bg-dark">
                <div class="container-fluid">
                    <a class="navbar-brand" href="#">ColegioMilitar</a>
                    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>

                    <div class="collapse navbar-collapse" id="navbarNav">
                        <ul class="navbar-nav me-auto mb-2">
                            <li class="nav-item">
                                <a class="nav-link active" aria-current="page" href="#">Inicio</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        `;
    }
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
            alert('No hay solicitudes aceptadas.');
        }
        
        solicitudesAceptadas.push(...solicitudesFiltradas);
        renderizarSolicitudesAceptadas();
    } catch (error) {
        console.error('Error al cargar las solicitudes:', error);
        alert('Error al cargar las solicitudes: ' + error.message);
    }
}

// Función para cargar las solicitudes aceptadas
async function cargarSolicitudesRechazadas() {
    try {
        const response = await fetch('http://localhost:8082/api/solicitudBeca');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        
        console.log('Datos obtenidos:', data); 
        
        const solicitudesFiltradas = data.filter(solicitud => solicitud.estadoSolicitud === 'Rechazada');
        
        // Verifica si hay solicitudes aceptadas
        if (solicitudesFiltradas.length === 0) {
            alert('No hay solicitudes aceptadas.');
        }
        
        solicitudesAceptadas.push(...solicitudesFiltradas);
        renderizarSolicitudesAceptadas();
    } catch (error) {
        console.error('Error al cargar las solicitudes:', error);
        alert('Error al cargar las solicitudes: ' + error.message);
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
