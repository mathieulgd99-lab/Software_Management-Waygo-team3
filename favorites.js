function addToFavorites(id) {
  let favs = JSON.parse(localStorage.getItem("favorites")) || [];
  
  if (!favs.includes(id)) {
    favs.push(id);
    localStorage.setItem("favorites", JSON.stringify(favs));
    
    const dest = destinations.find(d => d.id === id);
    const name = dest ? dest.name : "Destination";
    alert(`❤️ "${name}" has been added to your favorites!`);
    // -----------------------------------------------
    
  } else {
    alert("This destination is already in your favorites.");
  }
  
  displayFavorites();
}

function displayFavorites() {
  const container = document.getElementById("favorites-container");
  if (!container) return;
  container.innerHTML = "";
  const favs = JSON.parse(localStorage.getItem("favorites")) || [];
  favs.forEach(id => {
    const d = destinations.find(x => x.id === id);
    if (!d) return;
    const el = document.createElement("div");
    el.className = "fav-item";
    el.innerHTML = `
      <img src="${d.image}" alt="${escapeHtml(d.name)}" onerror="this.onerror=null;this.src='data:image/svg+xml;utf8,<svg xmlns=\'http://www.w3.org/2000/svg\' width=\'400\' height=\'300\'><rect width=\'100%\' height=\'100%\' fill=\'%23ddd\'/><text x=\'50%\' y=\'50%\' dominant-baseline=\'middle\' text-anchor=\'middle\' fill=\'%23666\' font-size=\'20\'>No image</text></svg>'">
      <div>
        <strong>${escapeHtml(d.name)}</strong><br>
        <small>${escapeHtml(d.country)}</small><br>
        <button onclick="viewOnMap(${d.id})">View</button>
        <button onclick="removeFavorite(${d.id})">Remove</button>
      </div>`;
    container.appendChild(el);
  });
}

function removeFavorite(id) {
  let favs = JSON.parse(localStorage.getItem("favorites")) || [];
  favs = favs.filter(x => x !== id);
  localStorage.setItem("favorites", JSON.stringify(favs));
  displayFavorites();
}

function clearAllFavorites() {
  if (!checkLoginStatus()) return;

  const favs = JSON.parse(localStorage.getItem("favorites")) || [];
  
  if (favs.length === 0) {
    alert("Your favorites list is already empty.");
    return;
  }

  if (confirm(`Are you sure you want to remove all ${favs.length} favorites? This cannot be undone.`)) {
    localStorage.setItem("favorites", JSON.stringify([]));
    
    displayFavorites();
    
    const results = document.getElementById("results");
    if (results && results.innerHTML !== "") {
        searchDestinations(); 
    }
  }
}

function exportFavoritesToText() {
  if (!checkLoginStatus()) return;

  const favs = JSON.parse(localStorage.getItem("favorites")) || [];
  if (favs.length === 0) {
    alert("Nothing to export!");
    return;
  }

  let exportText = "✈️ My Waygo Wishlist:\n\n";
  
  favs.forEach(id => {
    const d = destinations.find(x => x.id === id);
    if (d) {
      exportText += `- ${d.name} (${d.country}): Approx. $${d.cost}\n`;
    }
  });

  exportText += "\nPlan your trip on Waygo!";

  navigator.clipboard.writeText(exportText).then(() => {
    alert("📋 Favorites list copied to clipboard! You can paste it in an email or message.");
  }).catch(err => {
    console.error("Failed to copy", err);
    alert("Failed to copy automatically. Please check permissions.");
  });
}
