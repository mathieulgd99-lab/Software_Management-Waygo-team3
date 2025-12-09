function loadScripts() {
  const files = [
      "./data.js",       
      "./itinerary.js",     
      "./map.js",           
      "./budget.js",        
      "./history.js",       
      "./favorites.js",     
      "./search.js",        
      "./reviews.js",       
      "./profil.js",        
      "./escape_&_init.js"  
    ];

  let chain = Promise.resolve();

  files.forEach(file => {
    chain = chain.then(() => {
      return new Promise((resolve, reject) => {
        const script = document.createElement("script");
        script.src = file;
        script.async = false; //Forces synchronous loading
        script.onload = () => {
          console.log(`Loaded: ${file}`);
          resolve();
        };
        script.onerror = (e) => {
          console.error(`Error loading: ${file}`, e);
          reject(e);
        };
        document.head.appendChild(script);
      });
    });
  });

  chain.then(() => {
    console.log("All scripts loaded.");
    // signal explicit pour les pages qui s'appuient sur l'ordre de chargement
    try {
      window.WAYGO_SCRIPTS_LOADED = true;
      document.dispatchEvent(new Event("waygo:allScriptsLoaded"));
      // ancien comportement (conserver si utile)
      if (document.readyState === "interactive" || document.readyState === "complete") {
        document.dispatchEvent(new Event("DOMContentLoaded"));
      }
    } catch (e) {
      console.warn("Could not dispatch scriptsLoaded event", e);
    }
  });
}

loadScripts();