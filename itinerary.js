let itinerary = JSON.parse(localStorage.getItem("itinerary")) || [];

function addToItinerary(id) {
  if (!itinerary.includes(id)) {
    itinerary.push(id);
    localStorage.setItem("itinerary", JSON.stringify(itinerary));
    displayItinerary();
    fitMapToItinerary();
  } else {
    alert("This destination is already in your itinerary.");
  }
}

function removeFromItinerary(id) {
  itinerary = itinerary.filter(x => x !== id);
  localStorage.setItem("itinerary", JSON.stringify(itinerary));
  displayItinerary();
  fitMapToItinerary();
}

function clearItinerary() {
  if (!confirm("Clear your itinerary?")) return;
  itinerary = [];
  localStorage.setItem("itinerary", JSON.stringify(itinerary));
  displayItinerary();
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

  itinerary.forEach(id => {
    const d = destinations.find(x => x.id === id);
    if (!d) return;
    const li = document.createElement("li");
    const cost = d.cost || 0;
    totalCost += cost;
    li.innerHTML = `
      <strong>${escapeHtml(d.name)}</strong>
      <small>(${escapeHtml(d.country)})</small>
      <span class="cost-tag">$${cost}</span>
      <div class="it-actions">
        <button onclick="viewOnMap(${d.id})">View</button>
        <button onclick="removeFromItinerary(${d.id})">Remove</button>
      </div>`;
    ul.appendChild(li);
  });

  const totalLi = document.createElement("li");
  totalLi.className = "muted";
  totalLi.innerHTML = `<em>Total estimated trip cost: $${totalCost}</em>`;
  ul.appendChild(totalLi);
}
