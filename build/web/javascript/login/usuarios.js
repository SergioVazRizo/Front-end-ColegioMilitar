function cargarRoles() {
    fetch("http://localhost:8081/api/getAllRoles")
            .then(response => response.json())
            .then(response => {
                let roles = response;
                let datosSuc = "<option value='' disabled selected>Roles</option>";
                for (let i = 0; i < roles.length; i++) {
                    datosSuc += "<option value='" + roles[i].rolId + "'>";
                    datosSuc += roles[i].nombreRol;
                    datosSuc += "</option>";
                }
                document.getElementById("rol").innerHTML = datosSuc;
            });
}


function cargarUsuarios() {
    fetch("http://localhost:8081/api/getAllUsuarios")
            .then(response => response.json())
            .then(response => {
                let mostrar = "";

                for (let i = 0; i < response.length; i++) {
                    let datos1 = response[i].nombreEstudiante;
                    let datos2 = response[i].matricula;
                    let datos3 = response[i].correo;
                    let datos4 = response[i].estatus;
                    let datos5 = response[i].rol.nombreRol;
                    let datos6 = response[i].nombreUsuario;
                    let datos7 = response[i].contraseña;
                    mostrar += "<tr onclick='seleccionarUsuario(\"" + datos1 + "\", \"" + datos2 + "\", \"" + datos3 + "\", \"" + datos4 + "\", \"" + datos5 + "\", \"" + datos6 + "\", \"" + datos7 + "\")'>";
                    mostrar += "<td>" + datos1 + "</td>";
                    mostrar += "<td>" + datos2 + "</td>";
                    mostrar += "<td>" + datos3 + "</td>";
                    mostrar += "<td>" + datos4 + "</td>";
                    mostrar += "<td>" + datos5 + "</td>";
                    mostrar += "<td>" + datos6 + "</td>";
                    mostrar += "<td>" + datos7 + "</td>";
                    mostrar += "</tr>";
                }
                document.getElementById("tblUsuarios").innerHTML = mostrar;
            });
}



function clean() {
    document.getElementById("nombreUsuario").value = "";
    document.getElementById("matricula").value = "";
    document.getElementById("correo").value = "";
    document.getElementById("estatus").value = "";
    document.getElementById("usuario").value = "";
    document.getElementById("contraseña").value = "";
    const rolSelect = document.getElementById("rol");
    rolSelect.value = "";
}

function agregarUsuario() {

    const nombreUsuario = document.getElementById("usuario").value;
    const nombreEstudiante = document.getElementById("nombreUsuario").value;
    const contraseña = document.getElementById("contraseña").value;
    const correo = document.getElementById("correo").value;
    const matricula = document.getElementById("matricula").value;
    const estatus = document.getElementById("estatus").value;
    const rolId = document.getElementById("rol").value;


    const usuarioData = {
        nombreUsuario: nombreUsuario,
        nombreEstudiante: nombreEstudiante,
        contraseña: contraseña,
        correo: correo,
        matricula: matricula,
        estatus: estatus,
        rol: {
            rolId: parseInt(rolId)
        }
    };


    fetch("http://localhost:8081/api/addUsuario", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(usuarioData)
    })
            .then(response => {
                if (response.ok) {
                    return response.text();
                } else {
                    throw new Error(`Error ${response.status}: ${response.statusText}`);
                }
            })
            .then(message => {

                let tam = message.length;
                //alert(tam);
                if (tam === 32) {
                    Swal.fire(message, "¡Operación fallida!", "danger");
                } else if (tam === 25) {

                    Swal.fire(message, "¡Operación fallida!", "danger");

                } else if (tam === 30) {
                    Swal.fire(message, "¡Operación Exitosa!", "success");
                    clean();
                    cargarUsuarios();
                }


            })
            .catch(error => {
                console.error('Error:', error);
                Swal.fire("Error al agregar el usuario: " + error.message, "Error", "error");
            });
}


let selectedMatricula = "";

function openModal() {
    const modal = document.getElementById("updatePasswordModal");
    modal.style.display = "block";
}

function closeModal() {
    const modal = document.getElementById("updatePasswordModal");
    modal.style.display = "none";
}

function seleccionarUsuario(nombre, matricula, correo, estatus, rolNombre, usuario, contraseña) {
    document.getElementById("nombreUsuario").value = nombre;
    document.getElementById("matricula").value = matricula;
    document.getElementById("correo").value = correo;
    document.getElementById("estatus").value = estatus;
    document.getElementById("usuario").value = usuario;
    document.getElementById("contraseña").value = contraseña;

    selectedMatricula = matricula;

    const rolSelect = document.getElementById("rol");
    rolSelect.value = "";

    for (let option of rolSelect.options) {
        if (option.text === rolNombre) {
            rolSelect.value = option.value;
            break;
        }
    }
}

function actualizarContraseña() {

    const newPassword = document.getElementById("newPassword").value;
    document.getElementById("newPassword").value = "";
    const requestBody = {
        matricula: selectedMatricula,
        newPassword: newPassword
    };

    fetch("http://localhost:8081/api/actualizarPost", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(requestBody)
    })
            .then(response => {
                if (response.ok) {
                    return response.text();
                } else {
                    throw new Error(`Error ${response.status}: ${response.statusText}`);
                }
            })
            .then(message => {
                Swal.fire(message, "", "success");
                closeModal();
                cargarUsuarios();
                clean();
            })
            .catch(error => {
                Swal.fire("Error al actualizar la contraseña: " + error.message, "", "error");
            });
}


function validarContraseña() {
    const nombreUsuario = document.getElementById("usuario").value;
    const nombreEstudiante = document.getElementById("nombreUsuario").value;
    const contraseña = document.getElementById("contraseña").value;

    if (nombreEstudiante === "" && nombreUsuario === "" && contraseña === "") {
        Swal.fire({
            title: "Selecciona un usuario",
            icon: "error",
            animation: true,
            customClass: {
                popup: 'animated bounce'
            }
        });
    } else {
        openModal();
    }
}

function cerrarSesion() {
    window.location.href = "http://localhost:8080/colegioMilitarFront/";
}

function openModal1() {
    const modal = document.getElementById("abrirModal");
    modal.style.display = "block";
}

function closeModal1() {
    const modal = document.getElementById("abrirModal");
    modal.style.display = "none";
}

function agregarRol() {

    const nombreRol = document.getElementById("rolAdd").value.trim();


    if (!nombreRol) {
        Swal.fire("El nombre del rol es obligatorio", "Error", "warning");
        return;
    }

    const rolData = {
        nombreRol: nombreRol
    };

    fetch("http://localhost:8081/api/addRol", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(rolData)
    })
            .then(response => {
                if (response.ok) {
                    return response.text();
                } else {
                    throw new Error(`Error ${response.status}: ${response.statusText}`);
                }
            })
            .then(message => {
            
                Swal.fire(message, "", "success");

                document.getElementById("rolAdd").value = "";
                closeModal1();
                cargarRoles();

            })
            .catch(error => {
                console.error('Error:', error);
                Swal.fire("Error al agregar el rol: " + error.message, "Error", "error");
            });
}
