const timeSlotsContainer = document.getElementById("timeSlots");
const appointmentForm = document.getElementById("appointmentForm");
const confirmationBox = document.getElementById("confirmation");

const availableSlots = {
    "2025-08-15": ["09:00 AM", "10:30 AM", "1:00 PM", "3:00 PM"],
    "2025-08-16": ["10:00 AM", "11:00 AM", "2:00 PM"],
    "2025-08-17": ["9:30 AM", "12:00 PM", "4:00 PM"]
};

let selectedSlot = null;

// Update time slots when date changes
document.getElementById("date").addEventListener("change", (e) => {
    const date = e.target.value;
    renderSlots(date);
});

function renderSlots(date) {
    timeSlotsContainer.innerHTML = "";
    selectedSlot = null;

    if (!availableSlots[date]) {
        timeSlotsContainer.innerHTML = "<p>No available slots for this date.</p>";
        return;
    }

    availableSlots[date].forEach(slot => {
        const slotDiv = document.createElement("div");
        slotDiv.textContent = slot;
        slotDiv.classList.add("slot");
        slotDiv.addEventListener("click", () => selectSlot(slotDiv));
        timeSlotsContainer.appendChild(slotDiv);
    });
}

function selectSlot(slotElement) {
    document.querySelectorAll(".slot").forEach(s => s.classList.remove("selected"));
    slotElement.classList.add("selected");
    selectedSlot = slotElement.textContent;
}

// Handle form submission
appointmentForm.addEventListener("submit", (e) => {
    e.preventDefault();
    if (!selectedSlot) {
        alert("Please select a time slot.");
        return;
    }

    confirmationBox.classList.remove("hidden");
    appointmentForm.reset();
    timeSlotsContainer.innerHTML = "";
    selectedSlot = null;
});