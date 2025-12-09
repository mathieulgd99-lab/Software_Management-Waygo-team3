// data.js - local "database"
// destinations.js - Waygo travel database
// Temporary, would be better to fetch from a real databases

const destinations = [
  {
    id: 1,
    name: "Tokyo",
    country: "Japan",
    description: "A dazzling mix of modern life and traditional temples, from neon-lit Shibuya to the quiet Meiji Shrine.",
    lat: 35.6762,
    lng: 139.6503,
    image: "images/tokyo.jpg",
    activities: ["Sushi making", "Visit temples", "Shibuya crossing"],
    costPerDay: 150
  },
  {
    id: 2,
    name: "Paris",
    country: "France",
    description: "The city of lights and love, filled with iconic landmarks and world-class cuisine.",
    lat: 48.8566,
    lng: 2.3522,
    image: "images/paris.jpg",
    activities: ["Eiffel Tower", "Louvre Museum", "Seine river cruise"],
    costPerDay: 120
  },
  {
    id: 3,
    name: "New York",
    country: "USA",
    description: "The city that never sleeps, bursting with culture, skyscrapers, and endless energy.",
    lat: 40.7128,
    lng: -74.0060,
    image: "images/newyork.jpg",
    activities: ["Central Park walk", "Broadway show", "Times Square"],
    costPerDay: 140
  },
  {
    id: 4,
    name: "Rome",
    country: "Italy",
    description: "A timeless city blending ancient ruins, art, and unforgettable cuisine.",
    lat: 41.9028,
    lng: 12.4964,
    image: "images/rome.jpg",
    activities: ["Colosseum tour", "Vatican visit", "Gelato tasting"],
    costPerDay: 100
  },
  {
    id: 5,
    name: "Bangkok",
    country: "Thailand",
    description: "A vibrant city where tradition meets modernity, full of temples, markets, and street food.",
    lat: 13.7563,
    lng: 100.5018,
    image: "images/bangkok.jpg",
    activities: ["Floating markets", "Street food tour", "Grand Palace"],
    costPerDay: 85
  },
  {
    id: 6,
    name: "Sydney",
    country: "Australia",
    description: "A coastal gem famous for its harbor, beaches, and relaxed atmosphere.",
    lat: -33.8688,
    lng: 151.2093,
    image: "images/sydney.jpg",
    activities: ["Surfing", "Sydney Opera House", "Harbor cruise"],
    costPerDay: 160
  },
  {
    id: 7,
    name: "Cairo",
    country: "Egypt",
    description: "Home of the pyramids and the Nile, Cairo offers ancient wonders and bustling bazaars.",
    lat: 30.0444,
    lng: 31.2357,
    image: "images/cairo.jpg",
    activities: ["Pyramids of Giza", "Nile cruise", "Egyptian Museum"],
    costPerDay: 90
  },
  {
    id: 8,
    name: "Rio de Janeiro",
    country: "Brazil",
    description: "A city full of rhythm and beauty, framed by beaches and mountains.",
    lat: -22.9068,
    lng: -43.1729,
    image: "images/rio.jpg",
    activities: ["Christ the Redeemer", "Copacabana", "Samba show"],
    costPerDay: 110
  },
  {
    id: 9,
    name: "Cape Town",
    country: "South Africa",
    description: "Spectacular landscapes where ocean, mountains, and culture meet.",
    lat: -33.9249,
    lng: 18.4241,
    image: "images/capetown.jpg",
    activities: ["Table Mountain", "Wine tasting", "Cape Point tour"],
    costPerDay: 105
  },
  {
    id: 10,
    name: "Vancouver",
    country: "Canada",
    description: "A clean, scenic city nestled between mountains and sea, perfect for outdoor lovers.",
    lat: 49.2827,
    lng: -123.1207,
    image: "images/vancouver.jpg",
    activities: ["Stanley Park", "Whale watching", "Ski trip"],
    costPerDay: 130
  },
  {
    id: 11,
    name: "Reykjavik",
    country: "Iceland",
    description: "Gateway to glaciers, geysers, and the Northern Lights.",
    lat: 64.1466,
    lng: -21.9426,
    image: "images/reykjavik.jpg",
    activities: ["Blue Lagoon", "Northern Lights", "Golden Circle tour"],
    costPerDay: 170
  },
  {
    id: 12,
    name: "Marrakech",
    country: "Morocco",
    description: "A colorful maze of markets, palaces, and desert adventures.",
    lat: 31.6295,
    lng: -7.9811,
    image: "images/marrakech.jpg",
    activities: ["Medina tour", "Desert camel ride", "Souk shopping"],
    costPerDay: 80
  },
  {
    id: 13,
    name: "Bali",
    country: "Indonesia",
    description: "A tropical paradise offering beaches, temples, and lush rice terraces.",
    lat: -8.3405,
    lng: 115.092,
    image: "images/bali.jpg",
    activities: ["Surf lessons", "Monkey Forest", "Waterfall trek"],
    costPerDay: 95
  },
  {
    id: 14,
    name: "San Francisco",
    country: "USA",
    description: "A vibrant coastal city known for the Golden Gate Bridge and rolling hills.",
    lat: 37.7749,
    lng: -122.4194,
    image: "images/sanfrancisco.jpg",
    activities: ["Golden Gate Bridge", "Alcatraz", "Cable car ride"],
    costPerDay: 135
  },
  {
    id: 15,
    name: "Athens",
    country: "Greece",
    description: "Ancient ruins meet lively modern culture in this historic city.",
    lat: 37.9838,
    lng: 23.7275,
    image: "images/athens.jpg",
    activities: ["Acropolis", "Greek cuisine tour", "Plaka district"],
    costPerDay: 100
  }
];
