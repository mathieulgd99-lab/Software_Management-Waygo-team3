// script.js
// Just a generic file that combinates all the js files in this folder

function loadScripts() {
  const files = [
    "./escape_&_init.js",
    "./budget.js",
    "./favorites.js",
    "./history.js",
    "./itinerary.js",
    "./map.js",
    "./profil.js",
    "./search.js",
    "./review.js"
  ];

  files.forEach(file => {
    const script = document.createElement("script");
    script.src = file;
    script.defer = true;
    document.head.appendChild(script);
  });
}

loadScripts();