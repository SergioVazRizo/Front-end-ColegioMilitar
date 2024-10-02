function setBaseURL() {
    return 'http://localhost:8082/api/';
}

const BASE_URL_BECA = setBaseURL();

// Barre de navegacion
function cargarNavegacion() {
    const rol = localStorage.getItem('rol'); // Obtener el rol del usuario desde localStorage
    const navbarContainer = document.getElementById('navbar'); // Asumiendo que tienes un div con id "navbar" en tu HTML

    if (rol === 'ESTUDIANTE') {
        navbarContainer.innerHTML = `
            <nav class="navbar navbar-dark bg-dark">
                <div class="container-fluid">
                    <a class="navbar-brand" href="../PrincipalPrueba.html">Soy estudiante</a>

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


// Función para cargar las becas
async function cargarBecas() {
    try {
        const response = await fetch(BASE_URL_BECA + "beca");
        if (!response.ok) {
            throw new Error('Error en la solicitud: ' + response.status);
        }
        const becas = await response.json();
        const tbody = document.getElementById('tablaCatalogoBeca').getElementsByTagName('tbody')[0];
        tbody.innerHTML = '';

        // Obtener la matrícula del alumno desde el localStorage
        const alumnoId = localStorage.getItem('matricula');
        if (!alumnoId) {
            Swal.fire('Error', 'No se encontró el ID del alumno en el localStorage.', 'error');
            return;
        }

        // Agregar las becas a la tabla
        becas.forEach(async beca => {
            const row = tbody.insertRow();

            // Crear el botón y deshabilitarlo si ya está registrado
            const boton = document.createElement('button');
            boton.innerHTML = 'Registrarse';
            boton.id = `btn-registrarse-${beca.becaId}`;
            boton.onclick = function () {
                registrarse(beca.becaId);
            };

            // Verificar si el alumno ya está registrado en esta beca
            const registrado = await verificarRegistro(beca.becaId, alumnoId);
            if (registrado) {
                boton.disabled = true;
                boton.innerHTML = 'Ya registrado';
            }

            row.innerHTML = `
                <td>${beca.nombreBeca}</td>
                <td>${beca.descripcion}</td>
                <td>${beca.estatus}</td>
            `;

            const cell = row.insertCell();
            cell.appendChild(boton);
        });
    } catch (error) {
        console.error('Error:', error);
    }
}

// Función para verificar si un alumno ya está registrado en una beca
async function verificarRegistro(becaId, alumnoId) {
    try {
        const response = await fetch(`${BASE_URL_BECA}solicitudBeca/existe?becaId=${becaId}&alumnoId=${alumnoId}`);
        if (!response.ok) {
            throw new Error('Error en la solicitud de verificación: ' + response.status);
        }
        const data = await response.json();
        return data.registrado; // Respuesta del backend con el booleano 'registrado'
    } catch (error) {
        console.error('Error verificando el registro:', error);
        return false;
    }
}

function registrarse(becaId) {
    const alumnoId = localStorage.getItem('matricula');

    if (!alumnoId) {
        Swal.fire('Error', 'No se encontró el ID del alumno en el localStorage.', 'error');
        return;
    }

    const solicitudBeca = {
        beca: {becaId: becaId},
        alumnoId: alumnoId, // Usar el alumnoId desde localStorage
        estadoSolicitud: 'Pendiente',
        comentariosSolicitud: null
    };

    fetch(BASE_URL_BECA + "solicitudBeca", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(solicitudBeca),
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Error en la solicitud: ' + response.status);
        }
        Swal.fire('Éxito', `Te has registrado para la beca`, 'success');
        document.getElementById(`btn-registrarse-${becaId}`).disabled = true;
        document.getElementById(`btn-registrarse-${becaId}`).innerHTML = 'Ya registrado';
    })
    .catch(error => {
        console.error('Error:', error);
        Swal.fire('Error', 'Hubo un error al registrar la solicitud de beca.', 'error');
    });
}

// Cargar las becas cuando la página se carga
window.onload = cargarBecas, cargarNavegacion();
