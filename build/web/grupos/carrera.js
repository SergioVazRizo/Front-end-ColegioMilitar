var carreras;
function cargarCarreas() {
    fetch("http://localhost:8083/api/carrera").
            then(response => response.json()).
            then(response => {
                let carreras = response;
                let datosCarrera = "";
                datosCarrera += "<option value='' disabled selected>";
                datosCarrera += "Selecciona la carrera";
                datosCarrera += "</option>";
                for (let i = 0; i < carreras.length; i++) {
                    datosCarrera += "<option value='" + carreras[i].nombre + "'>";
                    datosCarrera += carreras[i].nombre;
                    datosCarrera += "</option>";
                }
                document.getElementById("carreraAgregar").innerHTML = datosCarrera;
            });
            }
            
function cargarCarreasMod() {
    fetch("http://localhost:8083/api/carrera").
            then(response => response.json()).
            then(response => {
                let carreras = response;
                let datosCarrera = "";
                datosCarrera += "<option value='' disabled selected>";
                datosCarrera += "Selecciona la carrera";
                datosCarrera += "</option>";
                for (let i = 0; i < carreras.length; i++) {
                    datosCarrera += "<option value='" + carreras[i].nombre + "'>";
                    datosCarrera += carreras[i].nombre;
                    datosCarrera += "</option>";
                }
                document.getElementById("carrera").innerHTML = datosCarrera;
            });
            }


