document.addEventListener("DOMContentLoaded", function() {
    loadAppointments();
    document.getElementById("appointmentForm").addEventListener("submit", function(event) {
        event.preventDefault();
        createAppointment();
        document.getElementById("appointmentForm").reset(); // ล้างข้อมูลหลังเพิ่มนัดหมาย
    });
});

function loadAppointments() {
    let appointments = JSON.parse(localStorage.getItem("appointments")) || [];
    const today = new Date().toISOString().split('T')[0];
    appointments = appointments.filter(app => app.date >= today);
    localStorage.setItem("appointments", JSON.stringify(appointments));
    displayAppointments(appointments);
}

function createAppointment() {
    const title = document.getElementById("title").value;
    const date = document.getElementById("date").value;
    const startTime = document.getElementById("startTime").value;
    const endTime = document.getElementById("endTime").value;

    let appointments = JSON.parse(localStorage.getItem("appointments")) || [];
    const id = Date.now().toString();
    const newAppointment = { id, title, date, startTime, endTime, status: "confirmed" };

    let conflict = appointments.some(app => app.date === date &&
        ((startTime >= app.startTime && startTime < app.endTime) ||
        (endTime > app.startTime && endTime <= app.endTime)));

    appointments.push(newAppointment);
    localStorage.setItem("appointments", JSON.stringify(appointments));
    displayAppointments(appointments);

    if (conflict) alert("⚠️ พบการซ้อนทับของเวลานัดหมาย!");
}

function displayAppointments(appointments) {
    const tbody = document.querySelector("#appointmentTable tbody");
    tbody.innerHTML = "";
    appointments.sort((a, b) => a.date.localeCompare(b.date) || a.startTime.localeCompare(b.startTime));

    appointments.forEach(app => {
        const row = tbody.insertRow();
        row.innerHTML = `
            <td>${app.title}</td>
            <td>${app.date}</td>
            <td>${app.startTime}</td>
            <td>${app.endTime}</td>
            <td class="${app.status === 'cancelled' ? 'cancelled' : ''}">${app.status}</td>
            <td class="action-buttons">
                <button onclick="cancelAppointment('${app.id}')">❌ ยกเลิก</button>
                <button class="delete-btn" onclick="deleteAppointment('${app.id}')">🗑️ ลบ</button>
            </td>
        `;
        if (checkTimeConflict(app, appointments)) row.classList.add("conflict");
    });
}

function checkTimeConflict(newApp, appointments) {
    return appointments.some(app => app.id !== newApp.id && app.date === newApp.date &&
        ((newApp.startTime >= app.startTime && newApp.startTime < app.endTime) ||
        (newApp.endTime > app.startTime && newApp.endTime <= app.endTime)));
}

function cancelAppointment(id) {
    let appointments = JSON.parse(localStorage.getItem("appointments")) || [];
    appointments = appointments.map(app => {
        if (app.id === id) {
            app.status = "cancelled";
        }
        return app;
    });
    localStorage.setItem("appointments", JSON.stringify(appointments));
    displayAppointments(appointments);
}

function deleteAppointment(id) {
    let appointments = JSON.parse(localStorage.getItem("appointments")) || [];
    appointments = appointments.filter(app => app.id !== id);
    localStorage.setItem("appointments", JSON.stringify(appointments));
    displayAppointments(appointments);
}