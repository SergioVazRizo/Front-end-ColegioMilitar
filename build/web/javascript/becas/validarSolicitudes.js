const solicitudes = []; // Almacena las solicitudes cargadas
const tableBody = document.getElementById('solicitudesBody');

// Función para cargar las solicitudes
async function cargarSolicitudes() {
    const response = await fetch('http://localhost:8082/api/solicitudBeca');
    const data = await response.json();
    solicitudes.length = 0; // Limpiar el array antes de agregar nuevos datos
    solicitudes.push(...data);
    renderizarTabla();
}

// Función para renderizar la tabla
function renderizarTabla() {
    tableBody.innerHTML = ''; // Limpiar la tabla
    solicitudes.forEach(solicitud => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${solicitud.idSolicitudBeca}</td>
            <td>${solicitud.alumnoId}</td>
            <td>${solicitud.beca.nombreBeca}</td>
            <td>
                <select data-id="${solicitud.idSolicitudBeca}" onchange="marcarComoCambiado(this)">
                    <option value="Pendiente" ${solicitud.estadoSolicitud === 'Pendiente' ? 'selected' : ''}>Pendiente</option>
                    <option value="Aprobada" ${solicitud.estadoSolicitud === 'Aprobada' ? 'selected' : ''}>Aprobada</option>
                    <option value="Rechazada" ${solicitud.estadoSolicitud === 'Rechazada' ? 'selected' : ''}>Rechazada</option>
                </select>
            </td>
            <td>
                <textarea data-id="${solicitud.idSolicitudBeca}" onchange="marcarComoCambiado(this)">${solicitud.comentariosSolicitud}</textarea>
            </td>
            <td>
                <button id="btnActualizar-${solicitud.idSolicitudBeca}" disabled onclick="actualizarSolicitud(${solicitud.idSolicitudBeca})">Actualizar</button>
            </td>
        `;
        tableBody.appendChild(row);
    });
}

// Función para marcar cambios
function marcarComoCambiado(input) {
    const button = document.getElementById(`btnActualizar-${input.dataset.id}`);
    button.disabled = false; // Habilitar el botón si hubo un cambio
}

// Función para actualizar la solicitud
async function actualizarSolicitud(id) {
    const row = document.querySelector(`select[data-id='${id}']`).parentElement.parentElement;
    const estadoSolicitud = row.querySelector('select').value;
    const comentariosSolicitud = row.querySelector('textarea').value;

    const response = await fetch(`http://localhost:8082/api/solicitudBeca/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            estadoSolicitud,
            comentariosSolicitud
        })
    });

    if (response.ok) {
        alert('Solicitud actualizada con éxito');
        cargarSolicitudes(); // Recargar las solicitudes para reflejar cambios
    } else {
        alert('Error al actualizar la solicitud');
    }
}

// Cargar solicitudes al inicio
cargarSolicitudes();
