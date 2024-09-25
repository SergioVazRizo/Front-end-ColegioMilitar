function setBaseURL() {
    return 'http://localhost:8082/api/';
}

const BASE_URL_BECA = setBaseURL();

// Función para cargar las becas
async function cargarBecas() {
    try {
        const response = await fetch(BASE_URL_BECA + "beca");
        if (!response.ok) {
            throw new Error('Error en la solicitud: ' + response.status);
        }
        const becas = await response.json();
        const tbody = document.getElementById('tablaCatalogoBeca').getElementsByTagName('tbody')[0];
            // Limpiar la tabla antes de llenarla
        tbody.innerHTML = '';

        // Agregar las becas a la tabla
        becas.forEach(beca => {
            const row = tbody.insertRow();
            row.innerHTML = `
                        <td>${beca.nombreBeca}</td>
                        <td>${beca.descripcion}</td>
                        <td>${beca.estatus}</td>
                        <td>
    <button id="btn-registrarse-${beca.becaId}" onclick="registrarse(${beca.becaId}, this)">Registrarse</button>
</td>

                    `;
        });
    } catch (error) {
        console.error('Error:', error);
    }
}

function registrarse(becaId) {
//    const alumnoId = localStorage.getItem('alumnoId');
//
//    if (!alumnoId) {
//        alert('No se encontró el ID del alumno en el localStorage.');
//        return;
//    }

    const solicitudBeca = {
        beca: {becaId: becaId},
        alumnoId: 1,
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
                alert(`Te has registrado para la beca con ID: ${becaId}`);
            })
            .catch(error => {
                console.error('Error:', error);
                alert('Hubo un error al registrar la solicitud de beca.');
            });
}


// Cargar las becas cuando la página se carga
window.onload = cargarBecas;