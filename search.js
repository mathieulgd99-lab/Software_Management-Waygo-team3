function populateCountryFilter() {
    const sel = document.getElementById("filter-country");
    if (!sel) return;
    sel.innerHTML = "";
    const allOpt = document.createElement("option");
    allOpt.value = "";
    allOpt.textContent = "All countries";
    sel.appendChild(allOpt);
  
    const countries = [...new Set(destinations.map(d => d.country))].sort();
    countries.forEach(c => {
      const o = document.createElement("option");
      o.value = c;
      o.textContent = c;
      sel.appendChild(o);
    });
  }

// TODO : implement the search option

function searchDestinations() {
  const qEl = document.getElementById("search-input");
  const countryEl = document.getElementById("filter-country");
  const resultsEl = document.getElementById("results");
  if (!resultsEl) return;

  const query = (qEl && qEl.value || "").trim().toLowerCase();
  const country = (countryEl && countryEl.value) || "";

  if (!Array.isArray(destinations) || !destinations.length) {
    resultsEl.innerHTML = `<p class="muted">No destinations available.</p>`;
    return;
  }

  const filtered = destinations.filter(d => {
    if (country && d.country !== country) return false;
    if (!query) return true;

    // build a searchable string from a few common fields
    const hay = [
      d.name || "",
      d.country || "",
      (d.activities && Array.isArray(d.activities)) ? d.activities.join(" ") : "",
      d.description || ""
    ].join(" ").toLowerCase();

    return hay.includes(query);
  });

  if (!filtered.length) {
    resultsEl.innerHTML = `<p class="muted">No destinations match your search.</p>`;
    return;
  }

  // render results
  resultsEl.innerHTML = "";
  filtered.forEach(d => {
    const card = document.createElement("div");
    card.className = "result-card";
    const img = d.image ? `<img src="${escapeHtml(d.image)}" alt="${escapeHtml(d.name)}">` : "";
    const cost = d.cost ? `<span class="cost-tag">$${escapeHtml(String(d.cost))}</span>` : "";
    const desc = d.description ? `<p class="muted">${escapeHtml(d.description.slice(0, 120))}${d.description.length > 120 ? '…' : ''}</p>` : "";

    card.innerHTML = `
      ${img}
      <div class="result-info">
        <h4>${escapeHtml(d.name)}</h4>
        <small>${escapeHtml(d.country)}</small>
        ${cost}
        ${desc}
        <div class="actions">
          <button onclick="viewOnMap(${d.id})">View</button>
          <button onclick="addToItinerary(${d.id})">Add</button>
          <button onclick="addToFavorites(${d.id})">♥</button>
        </div>
      </div>
    `;

    resultsEl.appendChild(card);
  });
}