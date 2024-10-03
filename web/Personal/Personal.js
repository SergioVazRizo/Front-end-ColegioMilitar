// Barre de navegacion
function cargarNavegacion() {
    const rol = localStorage.getItem('rol'); // Obtener el rol del usuario desde localStorage
    const navbarContainer = document.getElementById('navbar'); // Asumiendo que tienes un div con id "navbar" en tu HTML

    if (rol === 'ESTUDIANTE') {
        navbarContainer.innerHTML = `
            <nav class="navbar navbar-dark bg-dark">
    <div class="container-fluid">
        <a class="navbar-brand" href="PrincipalPrueba.html">Servicios Escolares</a>

        <div class="ms-auto d-flex align-items-center"> <!-- Contenedor para alinear los elementos a la derecha -->
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
                    <a class="nav-link active" aria-current="page" href="PrincipalPrueba.html">Inicio</a>
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
    } else if (rol === 'ESCOLAR') {
        navbarContainer.innerHTML = `
            <nav class="navbar navbar-dark bg-dark">
                <div class="container-fluid">
                    <a class="navbar-brand" href="PrincipalPrueba.html">Servicios Escolares</a>

                    <div class="ms-auto d-flex align-items-center"> <!-- Contenedor para alinear los elementos a la derecha -->
                        <button class="navbar-toggler me-2" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                            <span class="navbar-toggler-icon"></span>
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
                                <a class="nav-link active" aria-current="page" href="PrincipalPrueba.html">Inicio</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link active" aria-current="page" href="grupos/grupos.html">grupos</a>
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
    }else if (rol === 'RH') {
        navbarContainer.innerHTML = `
            <nav class="navbar navbar-dark bg-dark">
                <div class="container-fluid">
                    <a class="navbar-brand" href="../PrincipalPrueba.html">Recursos Humanos</a>

                    <div class="ms-auto d-flex align-items-center"> <!-- Contenedor para alinear los elementos a la derecha -->
                        <button class="navbar-toggler me-2" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                            <span class="navbar-toggler-icon"></span>
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
                                <a class="nav-link active" aria-current="page" href="AdministracionPersonal.html">Personal</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        `;
    } 
    else {
        navbarContainer.innerHTML = `
            <nav class="navbar navbar-dark bg-dark">
                <div class="container-fluid">
                    <a class="navbar-brand" href="PrincipalPrueba.html">No entramos tu rol</a>

                    <div class="ms-auto d-flex align-items-center"> <!-- Contenedor para alinear los elementos a la derecha -->
                        <button class="navbar-toggler me-2" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                            <span class="navbar-toggler-icon"></span>
                        </button>
                        <button class="Btn" onclick="cerrarSesion()">
                            <div class="sign">
                              <svg viewBox="0 0 512 512"><path d="M377.9 105.9L500.7 228.7c7.2 7.2 11.3 17.1 11.3 27.3s-4.1 20.1-11.3 27.3L377.9 406.1c-6.4 6.4-15 9.9-24 9.9c-18.7 0-33.9-15.2-33.9-33.9l0-62.1-128 0c-17.7 0-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32l128 0 0-62.1c0-18.7 15.2-33.9 33.9-33.9c9 0 17.6 3.6 24 9.9zM160 96L96 96c-17.7 0-32 14.3-32 32l0 256c0 17.7 14.3 32 32 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-64 0c-53 0-96-43-96-96L0 128C0 75 43 32 96 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32z"></path></svg>
                            </div>
                            <div class="text">Cerrar sesión</div>
                          </button>
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

window.onload = cargarNavegacion;

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


// Cargar empleados en la tabla
async function loadEmpleados() {
    try {
        const response = await fetch(`http://localhost:8084/api/empleado`); // Cambiar a comillas invertidas
        const empleados = await response.json();
        const empleadosTable = document.getElementById('empleadosTable').querySelector('tbody');

        empleadosTable.innerHTML = '';
        empleados.forEach(empleado => {
            if (empleado.estatus === "Activo") { // Solo mostrar empleados activos
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
                    <td>${empleado.area}</td>
                    <td>
                        <button onclick="prepareEdit(${empleado.idEmpleado})">Modificar</button>
                        <button onclick="deactivateEmpleado(${empleado.idEmpleado})">Dar Baja</button>
                    </td>
                `;
                empleadosTable.appendChild(row);
            }
        });
    } catch (error) {
        console.error('Error al cargar los empleados:', error);
    }
}

// Preparar la edición de un empleado
async function prepareEdit(empleadoId) {
    empleadoIdToEdit = empleadoId;
    try {
        const response = await fetch(`http://localhost:8084/api/empleado/${empleadoId}`); // Cambiar a comillas invertidas
        const empleado = await response.json();

        // Rellenar el formulario con los datos del empleado
        document.getElementById('nombre').value = empleado.nombre;
        document.getElementById('correo').value = empleado.correo;
        document.getElementById('telefono').value = empleado.telefono;
        document.getElementById('curp').value = empleado.curp;
        document.getElementById('numeroEmpleado').value = empleado.numeroEmpleado;
        document.getElementById('tipoContrato').value = empleado.tipoContrato;
        document.getElementById('fechaIngreso').value = empleado.fechaIngreso.split('T')[0]; // Formatear fecha
        document.getElementById('grupo').value = empleado.grupo;
        document.getElementById('estatus').value = empleado.estatus;
        document.getElementById('area').value = empleado.area;

        // Mostrar botones adecuados
        document.getElementById('registerButton').style.display = 'none';
        document.getElementById('updateButton').style.display = 'inline-block';
    } catch (error) {
        console.error('Error al obtener empleado:', error);
    }
}

// Registrar nuevo empleado
document.getElementById('registerButton').addEventListener('click', async function () {
    const empleadoData = {
        nombre: document.getElementById('nombre').value,
        correo: document.getElementById('correo').value,
        telefono: document.getElementById('telefono').value,
        curp: document.getElementById('curp').value,
        numeroEmpleado: document.getElementById('numeroEmpleado').value,
        tipoContrato: document.getElementById('tipoContrato').value,
        fechaIngreso: document.getElementById('fechaIngreso').value,
        grupo: document.getElementById('grupo').value,
        estatus: 'Activo', // Al registrar, se establece el estatus como "Activo"
        area: document.getElementById('area').value
    };

    try {
        await fetch(`http://localhost:8084/api/empleado`, { // Cambiar a comillas invertidas
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(empleadoData),
        });

        loadEmpleados(); // Recargar la tabla
        document.getElementById('empleadoForm').reset(); // Reiniciar el formulario
    } catch (error) {
        console.error('Error al registrar empleado:', error);
    }
});

// Actualizar empleado
document.getElementById('updateButton').addEventListener('click', async function () {
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
        area: document.getElementById('area').value
    };

    try {
        await fetch(`http://localhost:8084/api/empleado/${empleadoIdToEdit}`, { // Cambiar a comillas invertidas
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(empleadoData),
        });

        loadEmpleados(); // Recargar la tabla
        document.getElementById('empleadoForm').reset(); // Reiniciar el formulario

        // Reiniciar el ID para evitar conflictos en futuras ediciones
        empleadoIdToEdit = null;

        // Mostrar botones adecuados
        document.getElementById('registerButton').style.display = 'inline-block';
        document.getElementById('updateButton').style.display = 'none';
    } catch (error) {
        console.error('Error al actualizar empleado:', error);
    }
});

// Dar baja a empleado (cambiar estatus a inactivo)
async function deactivateEmpleado(empleadoId) {
    if (confirm('¿Estás seguro de que deseas dar de baja a este empleado?')) {
        try {
            await fetch(`http://localhost:8084/api/empleado/${empleadoId}`, { // Cambiar a comillas invertidas
                method: 'DELETE', // Cambia a DELETE para que coincida con la ruta de desactivación
            });
            loadEmpleados(); // Recargar la tabla
        } catch (error) {
            console.error('Error al dar de baja empleado:', error);
        }
    }
}

// Cargar empleados al iniciar
window.onload = loadEmpleados;
window.onload = cargarNavegacion;
