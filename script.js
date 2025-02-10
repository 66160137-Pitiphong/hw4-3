let appointments = [];

function addAppointment() {
    const title = document.getElementById("title").value;
    const date = document.getElementById("date").value;
    const startTime = document.getElementById("startTime").value;
    const endTime = document.getElementById("endTime").value;

    if (!title || !date || !startTime || !endTime) {
        alert("กรุณากรอกข้อมูลให้ครบ");
        return;
    }

    const newAppointment = {
        id: Date.now(),
        title,
        date,
        startTime,
        endTime,
        status: "confirmed"
    };

    appointments.push(newAppointment);
    renderAppointments();
}

function renderAppointments() {
    const appointmentList = document.getElementById("appointmentList");
    appointmentList.innerHTML = "";

    appointments.forEach((appointment) => {
        const row = document.createElement("tr");

        row.innerHTML = `
            <td>${appointment.title}</td>
            <td>${appointment.date}</td>
            <td>${appointment.startTime}</td>
            <td>${appointment.endTime}</td>
            <td class="${appointment.status === 'cancelled' ? 'cancelled' : ''}">${appointment.status}</td>
            <td>
                <button class="cancel" onclick="cancelAppointment(${appointment.id})">ยกเลิก</button>
                <button class="delete" onclick="deleteAppointment(${appointment.id})">ลบ</button>
            </td>
        `;

        appointmentList.appendChild(row);
    });
}

function cancelAppointment(id) {
    appointments = appointments.map(app => 
        app.id === id ? { ...app, status: "cancelled" } : app
    );
    renderAppointments();
}

function deleteAppointment(id) {
    appointments = appointments.filter(app => app.id !== id);
    renderAppointments();
}
