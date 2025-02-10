document.addEventListener("DOMContentLoaded", () => {
    const modal = document.getElementById("modal");
    const openModalBtn = document.getElementById("openModalBtn");
    const closeModalBtn = document.getElementById("closeModalBtn");
    const saveBtn = document.getElementById("saveBtn");
    const appointmentsDiv = document.getElementById("appointments");

    openModalBtn.addEventListener("click", () => modal.classList.remove("hidden"));
    closeModalBtn.addEventListener("click", () => modal.classList.add("hidden"));

    saveBtn.addEventListener("click", function () {
        const title = document.getElementById("title").value;
        const date = document.getElementById("date").value;
        const startTime = document.getElementById("start-time").value;
        const endTime = document.getElementById("end-time").value;

        if (!title || !date || !startTime || !endTime) {
            alert("Please fill all fields!");
            return;
        }

        const newAppointment = { id: Date.now(), title, date, startTime, endTime, status: "confirmed" };

        let appointments = JSON.parse(localStorage.getItem("appointments")) || [];
        appointments.push(newAppointment);
        localStorage.setItem("appointments", JSON.stringify(appointments));

        modal.classList.add("hidden");
        displayAppointments();
    });

    function displayAppointments() {
        let appointments = JSON.parse(localStorage.getItem("appointments")) || [];
        appointmentsDiv.innerHTML = "";

        appointments.forEach((appt) => {
            const apptDiv = document.createElement("div");
            apptDiv.classList.add("p-4", "bg-white", "shadow", "rounded-lg", "flex", "justify-between", "items-center");

            apptDiv.innerHTML = `
                <div>
                    <p class="text-lg font-semibold">${appt.title} (${appt.startTime} - ${appt.endTime})</p>
                    <p class="text-sm text-gray-500">${appt.date}</p>
                </div>
                <button class="bg-red-500 text-white px-4 py-1 rounded" onclick="cancelAppointment(${appt.id})">Cancel</button>
            `;

            appointmentsDiv.appendChild(apptDiv);
        });
    }

    window.cancelAppointment = function (id) {
        let appointments = JSON.parse(localStorage.getItem("appointments")) || [];
        appointments = appointments.filter(appt => appt.id !== id);
        localStorage.setItem("appointments", JSON.stringify(appointments));
        displayAppointments();
    };

    displayAppointments();
});
