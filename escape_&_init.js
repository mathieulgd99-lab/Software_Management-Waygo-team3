function escapeHtml(str) {
  return String(str).replace(/[&<>"']/g, m => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'})[m]);
}

document.addEventListener("DOMContentLoaded", () => {
  initMap();
  populateCountryFilter();
  displayFavorites();
  displayItinerary();
  loadBudget();
  applyProfileUI();
  initReviews();

  const results = document.getElementById("results");
  if (results) results.innerHTML = `<p class="muted">🔍
    Use the search box above to find destinations!</p>`;
});