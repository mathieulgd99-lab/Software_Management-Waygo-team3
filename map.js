let map;
let markers = {};

function initMap() {
  if (map) return;
  if (typeof L === "undefined") {
    console.error("Leaflet not found. Make sure leaflet.js is loaded.");
    return;
  }
  map = L.map('map', { zoomControl: true }).setView([20, 0], 2);
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 18 }).addTo(map);

  destinations.forEach(dest => {
    try {
      const m = L.marker([dest.lat, dest.lng]).addTo(map)
        .bindPopup(`<strong>${escapeHtml(dest.name)}</strong><br>${escapeHtml(dest.country)}`);
      markers[dest.id] = m;
    } catch (err) {
      console.warn("Failed to add marker for", dest.name, err);
    }
  });

  if (itinerary.length) fitMapToItinerary();
}

function viewOnMap(id) {
  const dest = destinations.find(d => d.id === id);
  if (!dest) return;
  if (!map) initMap();
  map.setView([dest.lat, dest.lng], 10, { animate: true });
  if (markers[id] && typeof markers[id].openPopup === "function") {
    markers[id].openPopup();
  }
}

function fitMapToItinerary() {
  if (!map || !itinerary.length) return;
  const latlngs = itinerary.map(id => {
    const d = destinations.find(x => x.id === id);
    return d ? [d.lat, d.lng] : null;
  }).filter(Boolean);
  if (latlngs.length) map.fitBounds(L.latLngBounds(latlngs).pad(0.2));
}