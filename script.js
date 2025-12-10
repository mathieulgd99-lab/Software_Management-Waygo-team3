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

    // append scripts sequentially to guarantee execution order (important for globals)
    function loadNext(i) {
      if (i >= files.length) return;
      const script = document.createElement('script');
      script.src = files[i];
      // ensure scripts execute in order and are not async
      script.async = false;
      script.onload = () => loadNext(i + 1);
      script.onerror = (e) => {
        console.error('Failed to load script', files[i], e);
        // still try to continue
        loadNext(i + 1);
      };
      document.head.appendChild(script);
    }

    loadNext(0);
}

loadScripts();