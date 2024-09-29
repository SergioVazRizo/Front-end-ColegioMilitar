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
                    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>

                    <div class="collapse navbar-collapse" id="navbarNav">
                        <ul class="navbar-nav me-auto mb-2">
                            <li class="nav-item">
                                <a class="nav-link active" aria-current="page" href="../PrincipalPrueba.html">Inicio</a>
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
                    <a class="navbar-brand" href="../PrincipalPrueba.html">Servicios Escolares</a>
                    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>

                    <div class="collapse navbar-collapse" id="navbarNav">
                        <ul class="navbar-nav me-auto mb-2">
                            <li class="nav-item">
                                <a class="nav-link active" aria-current="page" href="../PrincipalPrueba.html">Inicio</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" href="#">Link</a>
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
    }
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
