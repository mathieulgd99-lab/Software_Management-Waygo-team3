function escapeHtml(str) {
  return String(str).replace(/[&<>"']/g, m => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'})[m]);
}

function _runWaygoInit() {
  // try to initialize the map — retry a few times if map script hasn't loaded yet
  (function tryInitMap(attempt = 0) {
    if (typeof initMap === 'function') {
      tryInitMap._called = true;
      try { initMap(); } catch (e) { console.warn('initMap failed', e); }
      return;
    }
    if (attempt < 10) {
      setTimeout(() => tryInitMap(attempt + 1), 150);
    } else {
      console.warn('initMap not available after retries; map will not be initialized.');
    }
  })();

  try { populateCountryFilter(); } catch (e) { console.warn('populateCountryFilter error', e); }
  try { displayFavorites(); } catch (e) { console.warn('displayFavorites error', e); }
  try { displayItinerary(); } catch (e) { console.warn('displayItinerary error', e); }
  try { loadBudget(); } catch (e) { console.warn('loadBudget error', e); }
  try { applyProfileUI(); } catch (e) { console.warn('applyProfileUI error', e); }
  try { initReviews(); } catch (e) { console.warn('initReviews error', e); }

  const results = document.getElementById("results");
  if (results) results.innerHTML = `<p class="muted">🔍
    Use the search box above to find destinations!</p>`;
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', _runWaygoInit);
} else {
  // script loaded after DOMContentLoaded — run init immediately
  _runWaygoInit();
}