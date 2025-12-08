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
    if (document.readyState === "interactive" || document.readyState === "complete") {
      document.dispatchEvent(new Event("DOMContentLoaded"));
    }
  });
}

loadScripts();