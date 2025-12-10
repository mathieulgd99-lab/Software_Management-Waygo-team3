function applyProfileUI() {
  const user = JSON.parse(localStorage.getItem("user"));
  const sessionActive = localStorage.getItem("isLoggedIn") === "true";

  const profileLink = document.getElementById("profile-link");
  const logoutBtn = document.getElementById("logout-btn");

    // List of nav items to show/hide based on login status
  const restrictedLinks = ["nav-itinerary", "nav-budget", "nav-favorites", "nav-history"];

  if (sessionActive) {
    // --- CONNECTED USER ---
    const displayName = (user && user.name) ? user.name : "Profile";
    if (profileLink) {
      profileLink.textContent = displayName;
      profileLink.href = "#";
    }
    if (logoutBtn) logoutBtn.style.display = "inline-block";

    restrictedLinks.forEach(id => {
      const el = document.getElementById(id);
      if (el) el.style.display = "block";
    });

    const itPanel = document.getElementById("itinerary-panel");
    if (itPanel) itPanel.style.display = "block";
    const budgetEl = document.getElementById("budget");
    if (budgetEl) budgetEl.style.display = "block";
    const favEl = document.getElementById("favorites");
    if (favEl) favEl.style.display = "block";
  } else {
    // --- GUEST ---
    if (profileLink) {
      profileLink.textContent = "Login / Sign Up";
      profileLink.href = "login.html";
    }
    if (logoutBtn) logoutBtn.style.display = "none";

    restrictedLinks.forEach(id => {
      const el = document.getElementById(id);
      if (el) el.style.display = "none";
    });

    const itPanel = document.getElementById("itinerary-panel");
    if (itPanel) itPanel.style.display = "none";
    const budgetEl = document.getElementById("budget");
    if (budgetEl) budgetEl.style.display = "none";
    const favEl = document.getElementById("favorites");
    if (favEl) favEl.style.display = "none";
  }
}

function checkLoginStatus() {
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
  if (!isLoggedIn) {
    alert("🔒 You must be logged in to use this feature!");
    // debug trace to find who triggers redirects
    console.trace('checkLoginStatus: redirecting to login.html');
    window.location.href = "login.html";
    return false;
  }
  return true;
}

function logout() {
  if (!confirm("Do you really want to log out?")) return;
  localStorage.removeItem("isLoggedIn"); 
  applyProfileUI();
  window.location.href = "login.html";
}
