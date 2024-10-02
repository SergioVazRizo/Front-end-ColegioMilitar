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
                                <a class="nav-link active" aria-current="page" href="grupos.html">grupos</a>
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
    } else {
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


var grupos;
var id_grupo;
function getGrupos() {
    const url = "http://localhost:8083/api/grupo";
    fetch(url)
            .then(response => response.json())
            .then(response => {
                let mostrar = "";
                grupos = response;
                for (let i = 0; i < response.length; i++) {
                    datos0 = response[i].id_grupo;
                    let datos1 = response[i].alumnos_grupo;
                    let datos2 = response[i].carrera;
                    let datos3 = response[i].nombre_grupo;
                    let datos4 = response[i].periodo;
                    let datos5 = response[i].profesor;
                    datos1 = datos1.join(', ').replace(/,/g, '<br>'); 
                    mostrar += "<tr>";
                    mostrar += "<td> " + datos3 + " </td> ";
                    mostrar += "<td> " + datos4 + "</td>";
                    mostrar += "<td> " + datos2 + " </td> ";
                    mostrar += "<td> " + datos5 + " </td> ";
                    mostrar += "<td> " + datos1  +"</td> ";
                    mostrar += "</tr>";
                }
                document.getElementById("tblGrupos").innerHTML = mostrar;

            });
}


function agregarGrupo() {
    let nombreGrupo = document.getElementById("nombreGrupoAgregar").value;
    let periodo = document.getElementById("periodoAgregar").value;
    let carrera = document.getElementById("carreraAgregar").value;
    let profesor = document.getElementById("profesorAgregar").value;
    
    let alumnosSeleccionados = document.getElementById("alumnos_grupo_agregar");
    let alumnos = Array.from(alumnosSeleccionados.selectedOptions).map(option => option.value);

    let grupos = {
        alumnos_grupo: alumnos, 
        carrera: carrera, 
        nombre_grupo: nombreGrupo,
        periodo: periodo,
        profesor: profesor
    };

    let ruta = "http://localhost:8083/api/grupo";
    fetch(ruta, {
        method: "POST",
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(grupos)
    })
            .then(response => response.json())
            .then(response => {
                if (response.result) {
                    Swal.fire({
                        position: "center",
                        icon: "success",
                        title: "¡Éxito!",
                        html: "Nuevo grupo insertado",
                        showConfirmButton: true,
                        timer: 5000
                    });
                } else if (response.error) {
                    Swal.fire({
                        position: "center",
                        icon: "error",
                        title: "¡ERROR!",
                        html: "Error al registrar el grupo",
                        showConfirmButton: true,
                        timer: 5000
                    });
                }
                getGrupos();
               
            })
            .catch(error => {
                console.error("Error:", error);
                Swal.fire({
                    position: "center",
                    icon: "error",
                    title: "¡ERROR!",
                    html: "Error al realizar la solicitud",
                    showConfirmButton: true,
                    timer: 5000
                });
            });
         
}


