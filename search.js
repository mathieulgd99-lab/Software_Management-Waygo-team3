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

}