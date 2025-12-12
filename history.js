function saveItineraryToHistory() {
  // Read the itinerary from localStorage (do not depend on a global variable)
  const itineraryLocal = JSON.parse(localStorage.getItem("itinerary")) || [];
  if (!itineraryLocal.length) {
    alert("You need at least one destination in your itinerary before saving.");
    return;
  }

  const name = prompt("Enter a name for this trip:", "My Trip");
  if (!name) return;

  const date = new Date().toLocaleString();
  const totalCost = (typeof getItineraryCost === "function") ? getItineraryCost() : itineraryLocal.reduce((s, it) => {
    const d = (typeof destinations !== "undefined") ? destinations.find(x => x.id === it.id) : null;
    const days = it.days || 1;
    return s + (d ? (d.costPerDay || 0) * days : 0);
  }, 0);

  const destObjects = itineraryLocal.map(item => {
    const d = (typeof destinations !== "undefined") ? destinations.find(x => x.id === item.id) : null;
    const days = item.days || 1;
    const costPerDay = d ? d.costPerDay : 0;
    return {
      id: item.id,
      name: d ? d.name : "Unknown",
      country: d ? d.country : "",
      costPerDay,
      days,
      totalCost: costPerDay * days
    };
  });

  const trip = { id: Date.now(), name, destinations: destObjects, totalCost, date };
  const historyArr = JSON.parse(localStorage.getItem("travelHistory")) || [];
  historyArr.push(trip);
  localStorage.setItem("travelHistory", JSON.stringify(historyArr));
  console.log("saveItineraryToHistory: saved trip", trip);
  alert("Trip saved to your travel history!");
}

function displayHistory() {
  console.log("displayHistory() called");
  const container = document.getElementById("history-container");
  if (!container) {
    console.warn("displayHistory: #history-container not found");
    return;
  }
  container.innerHTML = "";
  const history = JSON.parse(localStorage.getItem("travelHistory")) || [];
  if (!history.length) {
    container.innerHTML = `<p class="muted">You have no saved trips yet.</p>`;
    return;
  }

  history.slice().reverse().forEach(trip => {
    const card = document.createElement("div");
    card.className = "history-card";
    const destListHtml = trip.destinations.map(d =>
      `<li>${escapeHtml(d.name)} <small>(${escapeHtml(d.country)})</small>
        <span class="cost-tag">${d.days} days × $${d.costPerDay} = $${d.totalCost}</span></li>`
    ).join("");
    card.innerHTML = `
      <h4>✈️ ${escapeHtml(trip.name)}</h4>
      <p>🗓️ ${escapeHtml(trip.date)} | 💰 $${trip.totalCost}</p>
      <ul>${destListHtml}</ul>
      <div class="card-actions">
        <button onclick="loadHistoryEntry(${trip.id})">Load</button>
        <button onclick="shareHistoryEntry(${trip.id})">Share</button>
        <button onclick="deleteHistoryEntry(${trip.id})">Delete</button>
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
  const payload = { name: trip.name, date: trip.date, itinerary: trip.destinations.map(d => ({ id: d.id, days: d.days })) };
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
  const newItin = trip.destinations.map(d => ({ id: d.id, days: d.days })).filter(Boolean);
  localStorage.setItem("itinerary", JSON.stringify(newItin));
  // attempt to update UI if functions exist
  if (typeof displayItinerary === "function") displayItinerary();
  if (typeof fitMapToItinerary === "function") fitMapToItinerary();
  if (typeof updateBudgetDisplay === "function") updateBudgetDisplay();
  alert(`Trip "${trip.name}" loaded into your itinerary.`);
}
