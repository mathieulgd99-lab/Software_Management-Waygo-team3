let itinerary = JSON.parse(localStorage.getItem("itinerary")) || [];

function saveItinerary() {
  localStorage.setItem("itinerary", JSON.stringify(itinerary));
}

function addToItinerary(id) {
  if (!id) return;
  const exists = itinerary.find(item => item.id === id);
  if (exists) {
    alert("This destination is already in your itinerary. Edit days in the panel below.");
    return;
  }
  itinerary.push({ id, days: 1 }); // default 1 day
  saveItinerary();
  displayItinerary();
  if (typeof fitMapToItinerary === "function") fitMapToItinerary();
  if (typeof updateBudgetDisplay === "function") updateBudgetDisplay();
}

function removeFromItinerary(id) {
  itinerary = itinerary.filter(x => x.id !== id);
  saveItinerary();
  displayItinerary();
  if (typeof fitMapToItinerary === "function") fitMapToItinerary();
  if (typeof updateBudgetDisplay === "function") updateBudgetDisplay();
}

function clearItinerary() {
  if (!confirm("Clear your itinerary?")) return;
  itinerary = [];
  saveItinerary();
  displayItinerary();
  if (typeof updateBudgetDisplay === "function") updateBudgetDisplay();
  if (typeof fitMapToItinerary === "function") fitMapToItinerary();
}

function updateDestinationDays(id, newDays) {
  const days = parseInt(newDays, 10);
  if (isNaN(days) || days < 1) {
    alert("Days must be at least 1.");
    return;
  }
  const item = itinerary.find(x => x.id === id);
  if (item) {
    item.days = days;
    saveItinerary();
    displayItinerary();
    if (typeof updateBudgetDisplay === "function") updateBudgetDisplay();
  }
}

function displayItinerary() {
  const ul = document.getElementById("itinerary-list");
  if (!ul) return;
  ul.innerHTML = "";

  if (!itinerary.length) {
    ul.innerHTML = "<li class='muted'>No stops yet. Add destinations from the search results.</li>";
    return;
  }

  let totalCost = 0;

  itinerary.forEach(item => {
    const d = (typeof destinations !== "undefined") ? destinations.find(x => x.id === item.id) : null;
    if (!d) return;

    const days = item.days || 1;
    const costPerDay = d.costPerDay || 0;
    const destinationTotal = costPerDay * days;
    totalCost += destinationTotal;

    const li = document.createElement("li");
    li.innerHTML = `
      <div class="it-actions">
        <strong>${escapeHtml(d.name)}</strong>
        <small>(${escapeHtml(d.country)})</small>
        <button  onclick="viewOnMap(${d.id})">View</button>
        <span class="cost-tag">${days} day(s) × $${costPerDay} = <strong>$${destinationTotal}</strong></span>
      </div>
      <div class="it-actions" style="display:flex; align-items:center; gap:6px;">
        <input type="number" min="1" value="${days}"
          onchange="updateDestinationDays(${d.id}, this.value)"
          style="width:45px; padding:2px; text-align:center;">
        <span>day(s)</span>
        <button onclick="removeFromItinerary(${d.id})">Remove</button>
      </div>
    `;
    ul.appendChild(li);
  });

  const totalLi = document.createElement("li");
  totalLi.className = "muted";
  totalLi.style.fontWeight = "bold";
  totalLi.innerHTML = `<em>💰 Total estimated trip cost: $${totalCost}</em>`;
  ul.appendChild(totalLi);
}

// Ensure display is initialized if script loaded after DOM
document.addEventListener("DOMContentLoaded", () => {
  displayItinerary();
});
