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
                    mostrar += "<td>";
                    mostrar += "<button class='btn btn-dark btn-md font-weight-bold font-italic' onclick='eliminarGrupo(" + i + ");'><i class='bi bi-trash3-fill fa-lg'></i> Eliminar </button>";
                    mostrar += "</td>";
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

function eliminarGrupo(i) {
    let id_grupo = grupos[i].id_grupo;
    Swal.fire({
        title: "¿Está seguro de eliminar este grupo?",
        text: "Se eliminará el registro de todo el grupo",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Sí, eliminar",
        cancelButtonText: "Cancelar"
    }).then((result) => {
        if (result.isConfirmed) {

            fetch("http://localhost:8083/api/grupo/" + id_grupo, {
                method: "DELETE"
            })
                    .then(response => {
                        if (!response.ok) {
                            throw new Error("Error en la eliminación del grupo");
                        }
                        return response.json();
                    })
                    .then(response => {

                        Swal.fire({
                            title: "Eliminado",
                            text: "El grupo ha sido eliminado",
                            icon: "success"
                        });


                        getGrupos();
                    })
                    .catch(error => {
                        Swal.fire({
                            position: "center",
                            icon: "error",
                            title: "¡ERROR!",
                            html: "Error al eliminar el grupo: " + error.message,
                            showConfirmButton: true,
                            timer: 5000
                        });
                    });
        }
    });
}

