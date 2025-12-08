// ---------- REVIEWS (simple client-only version you wanted) ----------
const REVIEWS_STORAGE_KEY = "waygo_reviews";
let selectedRating = 0;
let reviews = [];
let currentRatingFilter = 0;
// mode de tri actuel
// relevance_desc = plus pertinent → moins pertinent
// date_desc      = plus récent → moins récent
let currentSortMode = "relevance_desc";


// récupère l'utilisateur courant depuis localStorage (login.html)
function getCurrentUserInfo() {
  try {
    const stored = JSON.parse(localStorage.getItem("user") || "null");
    if (!stored) return { name: "Guest", email: null };
    return {
      name: stored.name || "Guest",
      email: stored.email || null,
    };
  } catch (e) {
    return { name: "Guest", email: null };
  }
}

// charge les avis depuis localStorage
function loadReviewsFromStorage() {
  try {
    const raw = localStorage.getItem(REVIEWS_STORAGE_KEY);
    const parsed = raw ? JSON.parse(raw) : [];
    reviews = Array.isArray(parsed) ? parsed : [];
  } catch (e) {
    console.warn("Could not parse reviews from localStorage", e);
    reviews = [];
  }
}

// sauvegarde les avis dans localStorage
function saveReviewsToStorage() {
  try {
    localStorage.setItem(REVIEWS_STORAGE_KEY, JSON.stringify(reviews));
  } catch (e) {
    console.warn("Could not save reviews to localStorage", e);
  }
}

// affiche les avis dans le <div id="user-reviews">
function renderUserReviews() {
  const container = document.getElementById("user-reviews");
  if (!container) return;

  container.innerHTML = "";

  if (!reviews.length) {
    container.innerHTML = `<p class="muted">No reviews yet. Be the first to share your experience!</p>`;
    renderReviewSummary();
    return;
  }

  const { email: currentEmail } = getCurrentUserInfo();

  // 🔥 on récupère la liste filtrée + triée
  const listToDisplay = getFilteredAndSortedReviews();

  if (!listToDisplay.length) {
    // ça veut dire qu’il n’y a pas d’avis correspondant au filtre d’étoiles
    container.innerHTML = `<p class="muted">No reviews with ${currentRatingFilter} stars yet.</p>`;
    renderReviewSummary();
    return;
  }

  listToDisplay.forEach((r) => {
    const card = document.createElement("div");
    card.className = "review-card";

    const stars = "★".repeat(r.rating) + "☆".repeat(5 - r.rating);

    const dateLabel = new Date(Number(r.createdAt)).toLocaleDateString(undefined, {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });

    const canDelete = !!currentEmail && currentEmail === r.userEmail;

    card.innerHTML = `
      <strong>${escapeHtml(r.userName)}</strong>
      <span class="review-date">(${escapeHtml(dateLabel)})</span>
      <div class="review-stars">${stars}</div>
      <p>${escapeHtml(r.comment)}</p>
      ${canDelete ? `<button class="small-ghost" data-review-id="${r.id}">Delete</button>` : ""}
    `;

    if (canDelete) {
      const btn = card.querySelector("button[data-review-id]");
      btn.addEventListener("click", () => deleteReview(r.id));
    }

    container.appendChild(card);
  });

  // résumé / distribution façon Amazon
  renderReviewSummary();
}



// affiche les stats (moyenne / nombre d’avis) dans #review-stats (si présent)
function renderReviewSummary() {
  const statsEl = document.getElementById("review-stats");
  if (!statsEl) return;

  const total = reviews.length;

  if (!total) {
    statsEl.innerHTML = `<p class="muted">No ratings yet.</p>`;
    return;
  }

  // compter combien d’avis pour 1,2,3,4,5 étoiles
  const counts = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
  let sum = 0;

  reviews.forEach((r) => {
    const rating = Number(r.rating) || 0;
    if (rating >= 1 && rating <= 5) {
      counts[rating]++;
      sum += rating;
    }
  });

  const avg = sum / total;

  const rowsHtml = [5, 4, 3, 2, 1].map((stars) => {
    const count = counts[stars];
    const percent = total ? Math.round((count * 100) / total) : 0;
    return `
      <div class="rating-row" data-rating="${stars}">
        <span class="rating-label">${stars} star${stars > 1 ? "s" : ""}</span>
        <div class="rating-bar">
          <div class="rating-bar-fill" style="width:${percent}%;"></div>
        </div>
        <span class="rating-percent">${percent}%</span>
      </div>
    `;
  }).join("");

  statsEl.innerHTML = `
    <div class="review-summary-header">
      <div class="avg-score-big">${avg.toFixed(1)} / 5</div>
      <div class="avg-stars-big">
        ${"★".repeat(Math.round(avg)) + "☆".repeat(5 - Math.round(avg))}
      </div>
      <div class="review-count-text">${total} rating${total > 1 ? "s" : ""} in total</div>
      ${currentRatingFilter !== 0 ? `<button id="clear-rating-filter" class="small-ghost">Show all ratings</button>` : ""}
    </div>
    <div class="rating-distribution">
      ${rowsHtml}
    </div>
  `;

  // clic sur chaque ligne pour filtrer
  const rows = statsEl.querySelectorAll(".rating-row");
  rows.forEach((row) => {
    row.addEventListener("click", () => {
      const rating = Number(row.getAttribute("data-rating"));
      // si on clique deux fois sur la même note → on enlève le filtre
      currentRatingFilter = (currentRatingFilter === rating ? 0 : rating);
      renderUserReviews();
    });
  });

  const clearBtn = statsEl.querySelector("#clear-rating-filter");
  if (clearBtn) {
    clearBtn.addEventListener("click", () => {
      currentRatingFilter = 0;
      renderUserReviews();
    });
  }
}

function getFilteredAndSortedReviews() {
  // copie pour ne pas modifier l’original
  let list = reviews.slice();

  // 1) on applique le filtre par nombre d’étoiles (si actif)
  if (currentRatingFilter !== 0) {
    list = list.filter(r => Number(r.rating) === currentRatingFilter);
  }

  // 2) on trie en fonction du mode choisi
  list.sort((a, b) => {
    const ra = Number(a.rating) || 0;
    const rb = Number(b.rating) || 0;
    const da = Number(a.createdAt);
    const db = Number(b.createdAt);

    switch (currentSortMode) {
      case "date_asc":
        // du plus ancien au plus récent
        return da - db;
      case "date_desc":
        // du plus récent au plus ancien
        return db - da;
      case "relevance_asc":
        // moins pertinent = note plus basse, plus ancien
        if (ra !== rb) return ra - rb;
        return da - db;
      case "relevance_desc":
      default:
        // plus pertinent = note plus haute, plus récent
        if (ra !== rb) return rb - ra;
        return db - da;
    }
  });

  return list;
}


// appelée par le bouton "Submit" dans index.html
function addReview() {
  const input = document.getElementById("review-input");
  if (!input) return;

  const comment = input.value.trim();
  if (!comment || selectedRating === 0) {
    alert("Please add both a rating and a comment!");
    return;
  }

  const { name, email } = getCurrentUserInfo();

  const review = {
    id: Date.now(),
    userName: name || "Guest",
    userEmail: email || null,
    rating: Number(selectedRating),
    comment,
    createdAt: Date.now(),
  };

  reviews.push(review);
  saveReviewsToStorage();

  // reset formulaire
  input.value = "";
  selectedRating = 0;
  const starsEls = document.querySelectorAll("#rating span");
  starsEls.forEach((s) => s.classList.remove("selected"));

  renderUserReviews();
}

// suppression d’un avis (seulement possible sur ses avis si connecté)
function deleteReview(id) {
  reviews = reviews.filter((r) => r.id !== id);
  saveReviewsToStorage();
  renderUserReviews();
}

// initialisation de la section reviews
function initReviews() {
  const stars = document.querySelectorAll("#rating span");
  if (stars.length) {
    stars.forEach((star) => {
      star.addEventListener("click", () => {
        selectedRating = parseInt(star.getAttribute("data-value"), 10);
        stars.forEach((s) => s.classList.remove("selected"));
        for (let i = 0; i < selectedRating; i++) {
          stars[i].classList.add("selected");
        }
      });
    });
  }

  // 🔗 écouteur sur le select de tri
  const sortSelect = document.getElementById("review-sort");
  if (sortSelect) {
    sortSelect.addEventListener("change", (e) => {
      currentSortMode = e.target.value;
      renderUserReviews();
    });
  }

  loadReviewsFromStorage();
  renderUserReviews();
}
