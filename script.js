const form = document.getElementById("appointment-form");
const appointmentsDiv = document.getElementById("appointments");

form.addEventListener("submit", function (e) {
    e.preventDefault();
    const title = document.getElementById("title").value;
    const date = document.getElementById("date").value;
    const startTime = document.getElementById("start-time").value;
    const endTime = document.getElementById("end-time").value;

    const appointment = { title, date, startTime, endTime, status: "confirmed" };

    let appointments = JSON.parse(localStorage.getItem("appointments")) || [];
    appointments.push(appointment);
    localStorage.setItem("appointments", JSON.stringify(appointments));

    displayAppointments();
});

function displayAppointments() {
    let appointments = JSON.parse(localStorage.getItem("appointments")) || [];
    appointmentsDiv.innerHTML = "";
    appointments.forEach((appt, index) => {
        const apptDiv = document.createElement("div");
        apptDiv.innerHTML = `${appt.date} ${appt.startTime}-${appt.endTime}: ${appt.title}`;
        appointmentsDiv.appendChild(apptDiv);
    });
}

displayAppointments();
