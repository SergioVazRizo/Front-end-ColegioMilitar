// Barre de navegacion
function cargarNavegacion() {
const rol = localStorage.getItem('rol'); // Obtener el rol del usuario desde localStorage
        const navbarContainer = document.getElementById('navbar'); // Asumiendo que tienes un div con id "navbar" en tu HTML

        if (rol === 'ESTUDIANTE') {
navbarContainer.innerHTML = `
            <nav class="navbar navbar-dark bg-dark">
                <div class="container-fluid">
                    <a class="navbar-brand" href="PrincipalPrueba.html">Soy estudiante</a>
                    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>

                    <div class="collapse navbar-collapse" id="navbarNav">
                        <ul class="navbar-nav me-auto mb-2">
                            <li class="nav-item">
                                <a class="nav-link active" aria-current="page" href="PrincipalPrueba.html">Inicio</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" href="#">Link</a>
                            </li>
                            <li class="nav-item dropdown">
                                <a class="nav-link dropdown-toggle" role="button" data-bs-toggle="dropdown" aria-expanded="false">Becas</a>
                                <ul class="dropdown-menu">
                                    <li><a class="dropdown-item" href="becas/CatalogoBecas.html">Registrarse</a></li>
                                    <li><a class="dropdown-item" href="becas/ResultadosBecas.html">Resultados</a></li>
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
                    <a class="navbar-brand" href="PrincipalPrueba.html">Servicios Escolares</a>
                    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>

                    <div class="collapse navbar-collapse" id="navbarNav">
                        <ul class="navbar-nav me-auto mb-2">
                            <li class="nav-item">
                                <a class="nav-link active" aria-current="page" href="PrincipalPrueba.html">Inicio</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" href="#">Link</a>
                            </li>
                            <li class="nav-item dropdown">
                                <a class="nav-link dropdown-toggle" role="button" data-bs-toggle="dropdown" aria-expanded="false">Becas</a>
                                <ul class="dropdown-menu">
                                    <li><a class="dropdown-item" href="becas/validarSolicitud.html">Validar Solicitudes</a></li>
                                    <li><a class="dropdown-item" href="becas/ResultadosBecas.html">Resultados</a></li>
                                    <li><a class="dropdown-item" href="becas/agregarBecas.html">Nuevas Becas</a></li>
                                </ul>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        `;
        } 
}

window.onload = cargarNavegacion();


const apiBaseUrl = 'http://localhost:8084/api'; // Cambia según tu backend

// Cargar áreas en el formulario de empleados y la tabla de áreas
async function loadAreas() {
    try {
        const response = await fetch(`${apiBaseUrl}/area`);
        const areas = await response.json();
        const areaSelect = document.getElementById('area');
        const areasTable = document.getElementById('areasTable').querySelector('tbody');

        areasTable.innerHTML = '';
        areaSelect.innerHTML = '';

        areas.forEach(area => {
            // Llenar el select de áreas en el formulario de empleado
            const option = document.createElement('option');
            option.value = area.areaId;
            option.textContent = area.nombre;
            areaSelect.appendChild(option);

            // Llenar la tabla de áreas
            const row = document.createElement('tr');
            row.innerHTML = `<td>${area.nombre}</td>`;
            areasTable.appendChild(row);
        });
    } catch (error) {
        console.error('Error al cargar las áreas:', error);
    }
}

// Cargar empleados en la tabla
async function loadEmpleados() {
    try {
        const response = await fetch(`${apiBaseUrl}/empleado`);
        const empleados = await response.json();
        const empleadosTable = document.getElementById('empleadosTable').querySelector('tbody');

        empleadosTable.innerHTML = '';
        empleados.forEach(empleado => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${empleado.nombre}</td>
                <td>${empleado.correo}</td>
                <td>${empleado.telefono}</td>
                <td>${empleado.curp}</td>
                <td>${empleado.numeroEmpleado}</td>
                <td>${empleado.tipoContrato}</td>
                <td>${empleado.fechaIngreso}</td>
                <td>${empleado.grupo}</td>
                <td>${empleado.estatus}</td>
                <td>${empleado.area.nombre}</td>
            `;
            empleadosTable.appendChild(row);
        });
    } catch (error) {
        console.error('Error al cargar los empleados:', error);
    }
}

// Registrar nuevo empleado
document.getElementById('empleadoForm').addEventListener('submit', async function (event) {
    event.preventDefault();
    const empleadoData = {
        nombre: document.getElementById('nombre').value,
        correo: document.getElementById('correo').value,
        telefono: document.getElementById('telefono').value,
        curp: document.getElementById('curp').value,
        numeroEmpleado: document.getElementById('numeroEmpleado').value,
        tipoContrato: document.getElementById('tipoContrato').value,
        fechaIngreso: document.getElementById('fechaIngreso').value,
        grupo: document.getElementById('grupo').value,
        estatus: document.getElementById('estatus').value,
        area: { areaId: document.getElementById('area').value }
    };

    try {
        await fetch(`${apiBaseUrl}/empleado`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(empleadoData),
        });
        loadEmpleados(); // Recargar la tabla
    } catch (error) {
        console.error('Error al registrar empleado:', error);
    }
});

// Registrar nueva área
document.getElementById('areaForm').addEventListener('submit', async function (event) {
    event.preventDefault();
    const areaData = {
        nombre: document.getElementById('nombreArea').value,
    };

    try {
        await fetch(`${apiBaseUrl}/area`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(areaData),
        });
        loadAreas(); // Recargar la tabla y el select de áreas
    } catch (error) {
        console.error('Error al registrar área:', error);
    }
});

// Inicializar la carga de datos
loadAreas();
loadEmpleados();
