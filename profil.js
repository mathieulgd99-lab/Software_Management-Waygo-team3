function applyProfileUI() {
  const user = JSON.parse(localStorage.getItem("user"));
  const sessionActive = localStorage.getItem("isLoggedIn") === "true";

  const profileLink = document.getElementById("profile-link");
  const logoutBtn = document.getElementById("logout-btn");

    // List of nav items to show/hide based on login status
  const restrictedLinks = ["nav-itinerary", "nav-budget", "nav-favorites", "nav-history"];

  if (user && user.name && sessionActive) {
    // --- CONNECTED USER ---
    profileLink.textContent = user.name;
    profileLink.href = "#";
    if (logoutBtn) logoutBtn.style.display = "inline-block";

    restrictedLinks.forEach(id => {
        const el = document.getElementById(id);
        if(el) el.style.display = "block"; // 
    });

    document.getElementById("itinerary-panel").style.display = "block";
    document.getElementById("budget").style.display = "block";
    document.getElementById("favorites").style.display = "block";

  } else {
    // --- GUEST ---
    profileLink.textContent = "Login / Sign Up";
    profileLink.href = "login.html";
    if (logoutBtn) logoutBtn.style.display = "none";

    restrictedLinks.forEach(id => {
        const el = document.getElementById(id);
        if(el) el.style.display = "none";
    });

    document.getElementById("itinerary-panel").style.display = "none";
    document.getElementById("budget").style.display = "none";
    document.getElementById("favorites").style.display = "none";
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
