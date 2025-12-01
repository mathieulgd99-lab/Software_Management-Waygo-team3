function addToFavorites(id) {
  let favs = JSON.parse(localStorage.getItem("favorites")) || [];
  if (!favs.includes(id)) {
    favs.push(id);
    localStorage.setItem("favorites", JSON.stringify(favs));
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
      <img src="${d.image}" alt="${escapeHtml(d.name)}">
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
