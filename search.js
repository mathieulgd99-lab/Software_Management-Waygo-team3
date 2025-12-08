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
  const inputEl = document.getElementById("search-input");
  const selEl = document.getElementById("filter-country");
  const q = inputEl ? inputEl.value.trim().toLowerCase() : "";
  const countryFilter = selEl ? selEl.value : "";
  const results = document.getElementById("results");
  if (!results) return;
  results.innerHTML = "";

  const filtered = destinations.filter(d => {
    const matchesQuery = q === "" ||
      d.name.toLowerCase().includes(q) ||
      d.country.toLowerCase().includes(q) ||
      (d.description && d.description.toLowerCase().includes(q)) ||
      (d.activities && d.activities.join(" ").toLowerCase().includes(q));
    const matchesCountry = countryFilter === "" || d.country === countryFilter;
    return matchesQuery && matchesCountry;
  });

  if (!filtered.length) {
    results.innerHTML = `<p class="muted">No results found.</p>`;
    return;
  }

  filtered.forEach(d => {
    const card = document.createElement("div");
    card.className = "destination-card";
    const actsHtml = d.activities ? d.activities.map(a => `<li>${escapeHtml(a)}</li>`).join("") : "";
    card.innerHTML = `
      <div class="thumb">
        <img src="${d.image}" alt="${escapeHtml(d.name)}" loading="lazy" onerror="this.style.opacity=0.6; this.nextElementSibling && (this.nextElementSibling.style.display='block')">
      </div>
      <div class="card-body">
        <h4>${escapeHtml(d.name)} <span class="country">(${escapeHtml(d.country)})</span></h4>
        <p class="desc">${escapeHtml(d.description)}</p>
        <div class="activities"><strong>Activities:</strong><ul>${actsHtml}</ul></div>
        <div class="card-actions">
          <button onclick="addToFavorites(${d.id})">❤ Favorite</button>
          <button onclick="addToItinerary(${d.id})">➕ Add to itinerary</button>
          <button onclick="viewOnMap(${d.id})">📍 View on map</button>
        </div>
      </div>`;
    results.appendChild(card);
  });
}