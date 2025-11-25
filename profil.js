function applyProfileUI() {
  const user = JSON.parse(localStorage.getItem("user"));
  const profileLink = document.getElementById("profile-link");
  const logoutBtn = document.getElementById("logout-btn");
  if (!profileLink) return;
  if (user && user.name) {
    profileLink.textContent = user.name;
    profileLink.href = "#";
    if (logoutBtn) logoutBtn.style.display = "inline-block";
  } else {
    profileLink.textContent = "Profile";
    profileLink.href = "login.html";
    if (logoutBtn) logoutBtn.style.display = "none";
  }
}

function logout() {
  if (!confirm("Do you really want to log out?")) return;
  localStorage.removeItem("user");
  applyProfileUI();
  window.location.href = "login.html";
}
