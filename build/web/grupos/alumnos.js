var alumnos;
function cargarAlumnos() {
    fetch("http://localhost:8083/api/alumno").
            then(response => response.json()).
            then(response => {
                let alumnos = response;
                let datosAlumnos = "";
                datosAlumnos += "<option value='' disabled selected>";
                datosAlumnos += "Seleccione los alumnos del grupo";
                datosAlumnos += "</option>";
                for (let i = 0; i < alumnos.length; i++) {
                    datosAlumnos += "<option value='" + alumnos[i].nombreCompleto + "'>";
                    datosAlumnos += alumnos[i].nombreCompleto;
                    datosAlumnos += "</option>";
                }
                document.getElementById("alumnos_grupo_agregar").innerHTML = datosAlumnos;
            });
            }
            
function cargarAlumnosMod() {
    fetch("http://localhost:8083/api/alumno").
            then(response => response.json()).
            then(response => {
                let alumnos = response;
                let datosAlumnos = "";
                datosAlumnos += "<option value='' disabled selected>";
                datosAlumnos += "Seleccione los alumnos del grupo";
                datosAlumnos += "</option>";
                for (let i = 0; i < alumnos.length; i++) {
                    datosAlumnos += "<option value='" + alumnos[i].nombreCompleto + "'>";
                    datosAlumnos += alumnos[i].nombreCompleto;
                    datosAlumnos += "</option>";
                }
                document.getElementById("alumnos_grupo").innerHTML = datosAlumnos;
            });
            }