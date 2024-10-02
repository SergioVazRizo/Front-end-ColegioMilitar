var profedores;
function cargarProfesores() {
    fetch("http://localhost:8083/api/profesor").
            then(response => response.json()).
            then(response => {
                let profesores = response;
                let datosProf = "";
                datosProf += "<option value='' disabled selected>";
                datosProf += "Selecciona al profesor designado";
                datosProf += "</option>";
                for (let i = 0; i < profesores.length; i++) {
                    datosProf += "<option value='" + profesores[i].nombreCompleto + "'>";
                    datosProf += profesores[i].nombreCompleto;
                    datosProf += "</option>";
                }
                document.getElementById("profesorAgregar").innerHTML = datosProf;
            });
            }
            




