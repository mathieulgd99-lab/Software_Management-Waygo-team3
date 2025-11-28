function saveItineraryToHistory() {
  if (!itinerary.length) { alert("You need at least one destination in your itinerary before saving."); return; }
  const name = prompt("Enter a name for this trip:", "My Trip");
  if (!name) return;
  const date = new Date().toLocaleString();
  const totalCost = getItineraryCost();
  const destObjects = itinerary.map(id => {
    const d = destinations.find(x => x.id === id);
    return d ? { id: d.id, name: d.name, country: d.country, cost: d.cost || 0 } : { id, name: "Unknown", country: "", cost: 0 };
  });
  const trip = { id: Date.now(), name, destinations: destObjects, totalCost, date };
  const history = JSON.parse(localStorage.getItem("travelHistory")) || [];
  history.push(trip);
  localStorage.setItem("travelHistory", JSON.stringify(history));
  alert("Trip saved to your travel history!");
  displayHistory();
}

function displayHistory() {
  const container = document.getElementById("history-container");
  if (!container) return;
  container.innerHTML = "";
  const history = JSON.parse(localStorage.getItem("travelHistory")) || [];
  if (!history.length) { container.innerHTML = `<p class="muted">You have no saved trips yet.</p>`; return; }

  history.slice().reverse().forEach(trip => {
    const card = document.createElement("div");
    card.className = "history-card";
    const destListHtml = trip.destinations.map(d => `<li>${escapeHtml(d.name)} <small>(${escapeHtml(d.country)})</small> <span class="cost-tag">$${d.cost}</span></li>`).join("");
    card.innerHTML = `
      <h4>✈️ ${escapeHtml(trip.name)}</h4>
      <p>🗓️ ${escapeHtml(trip.date)} | 💰 $${trip.totalCost}</p>
      <ul>${destListHtml}</ul>
      <div class="card-actions">
        <button onclick="loadHistoryEntry(${trip.id})">📂 Load</button>
        <button onclick="shareHistoryEntry(${trip.id})">🔗 Share</button>
        <button onclick="deleteHistoryEntry(${trip.id})">🗑 Delete</button>
      </div>`;
    container.appendChild(card);
  });
}

function deleteHistoryEntry(id) {
  if (!confirm("Delete this saved trip?")) return;
  let history = JSON.parse(localStorage.getItem("travelHistory")) || [];
  history = history.filter(t => t.id !== id);
  localStorage.setItem("travelHistory", JSON.stringify(history));
  displayHistory();
}

function shareHistoryEntry(id) {
  const history = JSON.parse(localStorage.getItem("travelHistory")) || [];
  const trip = history.find(t => t.id === id);
  if (!trip) return;
  const payload = { name: trip.name, date: trip.date, ids: trip.destinations.map(d => d.id) };
  const b64 = btoa(encodeURIComponent(JSON.stringify(payload)));
  const shareUrl = `${window.location.origin}${window.location.pathname.replace(/index\.html|history\.html/, 'index.html')}?sharedTrip=${b64}`;
  navigator.clipboard.writeText(shareUrl).then(() => alert("Share link copied to clipboard!")).catch(() => {
    navigator.clipboard.writeText(JSON.stringify(trip, null, 2));
    alert("Could not copy link — trip JSON copied instead.");
  });
}

function loadHistoryEntry(id) {
  const history = JSON.parse(localStorage.getItem("travelHistory")) || [];
  const trip = history.find(t => t.id === id);
  if (!trip) { alert("Trip not found."); return; }
  itinerary = trip.destinations.map(d => d.id).filter(Boolean);
  localStorage.setItem("itinerary", JSON.stringify(itinerary));
  displayItinerary();
  fitMapToItinerary();
  alert(`Trip "${trip.name}" loaded into your itinerary.`);
}
