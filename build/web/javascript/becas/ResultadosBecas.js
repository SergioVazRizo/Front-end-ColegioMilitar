const solicitudesAceptadas = [];
const solicitudesAceptadasBody = document.getElementById('solicitudesAceptadasBody');
const buscador = document.getElementById('buscador');

// Función para cargar las solicitudes aceptadas
async function cargarSolicitudesAceptadas() {
    try {
        const response = await fetch('http://localhost:8082/api/solicitudBeca');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        
        console.log('Datos obtenidos:', data); // Log de datos obtenidos
        
        const solicitudesFiltradas = data.filter(solicitud => solicitud.estadoSolicitud === 'Aprobada');
        
        // Verifica si hay solicitudes aceptadas
        if (solicitudesFiltradas.length === 0) {
            alert('No hay solicitudes aceptadas.');
        }
        
        solicitudesAceptadas.push(...solicitudesFiltradas);
        renderizarSolicitudesAceptadas();
    } catch (error) {
        console.error('Error al cargar las solicitudes:', error);
        alert('Error al cargar las solicitudes: ' + error.message);
    }
}

// Función para renderizar la tabla de solicitudes aceptadas
function renderizarSolicitudesAceptadas() {
    solicitudesAceptadasBody.innerHTML = ''; // Limpiar la tabla
    solicitudesAceptadas.forEach(solicitud => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${solicitud.idSolicitudBeca}</td>
            <td>${solicitud.alumnoId}</td>
            <td>${solicitud.beca ? solicitud.beca.nombreBeca : 'N/A'}</td>
            <td>${solicitud.estadoSolicitud}</td>
            <td>${solicitud.comentariosSolicitud}</td>
        `;
        solicitudesAceptadasBody.appendChild(row);
    });
}

// Función para filtrar solicitudes por ID del alumno
function filtrarSolicitudes() {
    const textoBusqueda = buscador.value.toLowerCase();
    const filas = solicitudesAceptadasBody.getElementsByTagName('tr');

    for (let i = 0; i < filas.length; i++) {
        const idAlumno = filas[i].getElementsByTagName('td')[1].textContent; // ID Alumno es la segunda columna
        if (idAlumno.toLowerCase().includes(textoBusqueda)) {
            filas[i].style.display = ''; // Mostrar fila
        } else {
            filas[i].style.display = 'none'; // Ocultar fila
        }
    }
}

// Cargar datos al inicio
cargarSolicitudesAceptadas();
