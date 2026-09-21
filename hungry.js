// ---------------------------
// INTRO ANIMATION (ZOOM FROM ENVELOPE)
// ---------------------------

const envelope = document.getElementById("envelope-img");
const letter = document.getElementById("letter-box");
const continueBtn = document.getElementById("continue-btn");

// When envelope fade-in finishes, zoom in the letter
envelope.addEventListener("animationend", () => {
  letter.classList.add("show");
  envelope.classList.add("fade-out");
});

// Auto-continue after 30 seconds
let autoTimer = setTimeout(() => {
  startGameScreen();
}, 30000);

// Manual continue
continueBtn.onclick = () => {
  clearTimeout(autoTimer);
  startGameScreen();
};

function startGameScreen() {
  document.getElementById("intro-screen").style.display = "none";
  document.querySelector(".food-game").style.display = "flex";
  startGame();
}


// ---------------------------
// GLOBAL FOOD DATA
// ---------------------------

// BREAKFAST
const breakfastFoods = [
  "Pancakes", "Waffles", "French Toast", "Bagel & Cream Cheese",
  "Omelette", "Breakfast Burrito", "Smoothie Bowl", "Avocado Toast",
  "Cereal & Milk", "Yogurt Parfait"
];

// COUNTRIES
const countries = [
  "Jamaica", "Trinidad", "Haiti", "Dominican Republic", "Cuba", "Puerto Rico",
  "Mexico", "Brazil", "Nigeria", "Ghana", "Ethiopia",
  "Japan", "China", "Korea", "Thailand", "India", "Vietnam",
  "Italy", "France", "Greece", "Spain", "Turkey"
];

// ⭐ FIX: store selected country safely
let selectedCountry = null;

// FLAVOR PROFILES
const flavorProfiles = {
  Jamaica: ["Spicy", "Savory", "Grilled"],
  Trinidad: ["Spicy", "Savory", "Street Food"],
  Haiti: ["Savory", "Hearty", "Fried"],
  "Dominican Republic": ["Savory", "Comfort", "Fried"],
  Cuba: ["Savory", "Grilled", "Hearty"],
  "Puerto Rico": ["Savory", "Fried", "Comfort"],

  Mexico: ["Spicy", "Fresh", "Savory"],
  Brazil: ["Savory", "Grilled", "Comfort"],

  Nigeria: ["Spicy", "Hearty", "Rich"],
  Ghana: ["Spicy", "Savory", "Stewed"],
  Ethiopia: ["Spicy", "Rich", "Vegetarian"],

  Japan: ["Umami", "Light", "Comfort"],
  China: ["Spicy", "Savory", "Sweet"],
  Korea: ["Spicy", "BBQ", "Comfort"],
  Thailand: ["Spicy", "Sweet", "Fresh"],
  India: ["Spicy", "Creamy", "Rich"],
  Vietnam: ["Fresh", "Light", "Savory"],

  Italy: ["Savory", "Cheesy", "Herby"],
  France: ["Rich", "Buttery", "Classic"],
  Greece: ["Fresh", "Savory", "Herby"],
  Spain: ["Savory", "Seafood", "Comfort"],
  Turkey: ["Savory", "Grilled", "Hearty"]
};

// MEALS
const meals = {
  Jamaica: {
    Spicy: ["Jerk Chicken", "Jerk Pork", "Pepper Shrimp", "Curry Goat", "Jerk Wings"],
    Savory: ["Oxtail", "Brown Stew Chicken", "Escovitch Fish", "Stew Peas", "Ackee & Saltfish"],
    Grilled: ["Jerk Chicken", "Grilled Snapper", "BBQ Chicken", "Festival & Fish", "Jerk Pork"]
  },

  Ethiopia: {
  Spicy: ["Doro Wat", "Sega Wat", "Awaze Tibs", "Key Wat", "Zilzil Tibs"],
  Rich: ["Kitfo", "Dulet", "Alicha Wat", "Yebeg Tibs", "Gored Gored"],
  Vegetarian: ["Shiro Wat", "Misir Wat", "Gomen", "Atkilt Wat", "Fasolia"]
},

  Turkey: {
    Savory: ["Lahmacun", "Pide", "Menemen","Manti","Börek"],
    Grilled: ["Kebab", "Kuzu Pirzola", "Köfte"],
    Hearty: ["Etli Güveç","Karnıyarık","Testi Kebab"]
    },


  Trinidad: {
    Spicy: ["Doubles", "Aloo Pie", "Bake & Shark", "Curry Chicken", "Curry Goat"],
    Savory: ["Pelau", "Roti", "Stew Chicken", "Buss Up Shut", "Callaloo"],
    "Street Food": ["Doubles", "Pholourie", "Saheena", "Corn Soup", "Bake & Shark"]
  },

  Haiti: {
    Savory: ["Griot", "Tassot", "Legume", "Bouillon", "Diri Kole"],
    Hearty: ["Soup Joumou", "Bouillon", "Stewed Chicken", "Rice & Beans", "Fried Pork"],
    Fried: ["Griot", "Marinad", "Fried Plantains", "Fritay", "Tassot"]
  },

  "Dominican Republic": {
    Savory: ["La Bandera", "Pollo Guisado", "Mangú", "Sancocho", "Chicharrón"],
    Comfort: ["Mangú", "Sancocho", "Pastelón", "Habichuelas Guisadas", "Arroz con Pollo"],
    Fried: ["Tostones", "Chicharrón", "Yaniqueques", "Fried Fish", "Pastelitos"]
  },

  Cuba: {
    Savory: ["Ropa Vieja", "Picadillo", "Arroz con Pollo", "Vaca Frita", "Cuban Sandwich"],
    Grilled: ["Grilled Pork", "Pollo a la Plancha", "Grilled Fish", "Churrasco", "Pernil"],
    Hearty: ["Ropa Vieja", "Fricase de Pollo", "Congri", "Tamales", "Ajiaco"]
  },

  "Puerto Rico": {
    Savory: ["Arroz con Gandules", "Pernil", "Pollo Guisado", "Carne Guisada", "Mofongo"],
    Fried: ["Tostones", "Alcapurrias", "Pastelillos", "Bacalaitos", "Rellenos de Papa"],
    Comfort: ["Sancocho", "Asopao", "Mofongo", "Pasteles", "Arroz con Pollo"]
  },

  Mexico: {
    Spicy: ["Tacos", "Enchiladas", "Birria", "Pozole Rojo", "Chilaquiles"],
    Fresh: ["Tostadas", "Ceviche", "Guacamole & Chips", "Elote", "Sopes"],
    Savory: ["Quesadillas", "Burritos", "Carnitas", "Mole", "Tamales"]
  },

  Brazil: {
    Savory: ["Feijoada", "Picanha", "Moqueca", "Coxinha", "Pastel"],
    Grilled: ["Churrasco", "Picanha", "Linguiça", "Grilled Chicken", "BBQ Skewers"],
    Comfort: ["Feijoada", "Moqueca", "Rice & Beans", "Farofa", "Empadão"]
  },

  Nigeria: {
    Spicy: ["Jollof Rice", "Pepper Soup", "Suya", "Spicy Stew", "Egusi Soup"],
    Hearty: ["Pounded Yam & Egusi", "Jollof Rice", "Moi Moi", "Beans & Plantain", "Okra Soup"],
    Rich: ["Egusi", "Banga Soup", "Ofe Nsala", "Oha Soup", "Afang Soup"]
  },

  Japan: {
    Umami: ["Ramen", "Sushi", "Katsu", "Okonomiyaki", "Takoyaki"],
    Light: ["Soba", "Onigiri", "Miso Soup", "Tamago Sando", "Cold Udon"],
    Comfort: ["Curry Rice", "Udon", "Katsu Don", "Gyudon", "Ramen"]
  },

  China: {
    Spicy: ["Mapo Tofu", "Kung Pao Chicken", "Hot Pot", "Dan Dan Noodles", "Sichuan Fish"],
    Savory: ["Lo Mein", "Fried Rice", "Dumplings", "Bao", "Beef & Broccoli"],
    Sweet: ["Sweet & Sour Chicken", "Honey Walnut Shrimp", "Orange Chicken", "Sweet Buns", "Mango Pudding"]
  },

  Korea: {
    Spicy: ["Tteokbokki", "Kimchi Stew", "Spicy Ramen", "Bibimbap", "Buldak Chicken"],
    BBQ: ["Korean BBQ", "Galbi", "Bulgogi", "Pork Belly", "BBQ Chicken"],
    Comfort: ["Kimchi Fried Rice", "Kimbap", "Ramen", "Soft Tofu Stew", "Jajangmyeon"]
  },

  Thailand: {
    Spicy: ["Pad Kra Pao", "Tom Yum", "Green Curry", "Red Curry", "Drunken Noodles"],
    Sweet: ["Pad Thai", "Mango Sticky Rice", "Thai Tea", "Sweet Curry", "Fried Bananas"],
    Fresh: ["Papaya Salad", "Spring Rolls", "Larb", "Fresh Noodles", "Herb Chicken"]
  },

  India: {
    Spicy: ["Vindaloo", "Tikka Masala", "Madras Curry", "Chili Chicken", "Biryani"],
    Creamy: ["Butter Chicken", "Korma", "Paneer Tikka", "Dal Makhani", "Saag Paneer"],
    Rich: ["Biryani", "Rogan Josh", "Chole", "Malai Kofta", "Naan & Curry"]
  },

  Vietnam: {
    Fresh: ["Pho", "Spring Rolls", "Banh Mi", "Vermicelli Bowl", "Herb Chicken"],
    Light: ["Pho Ga", "Rice Paper Rolls", "Clear Soup", "Steamed Fish", "Light Noodles"],
    Savory: ["Bun Bo Hue", "Com Tam", "Fried Rice", "Caramel Pork", "Garlic Noodles"]
  }, 

Ghana: {
  Spicy: ["Kelewele", "Waakye & Shito", "Chichinga", "Pepper Soup", "Shito & Fried Yam"],
  Savory: ["Ghana Jollof", "Fufu & Light Soup", "Banku & Tilapia", "Kenkey & Fried Fish", "Omo Tuo"],
  Stewed: ["Red Red", "Palm Nut Soup", "Groundnut Soup", "Kontomire Stew", "Okra Stew"]
},

Italy: {
  Savory: ["Lasagna", "Osso Buco", "Saltimbocca", "Risotto alla Milanese", "Arancini"],
  Cheesy: ["Margherita Pizza", "Cacio e Pepe", "Eggplant Parmigiana", "Gnocchi Quattro Formaggi", "Calzone"],
  Herby: ["Pesto Pasta", "Bruschetta", "Rosemary Focaccia", "Porchetta", "Spaghetti Aglio e Olio"]
},

France: {
  Rich: ["Boeuf Bourguignon", "Cassoulet", "Duck Confit", "Coq au Vin", "Foie Gras"],
  Buttery: ["Croissant", "Sole Meunière", "Escargots", "Pommes Purée", "Gratin Dauphinois"],
  Classic: ["Ratatouille", "French Onion Soup", "Quiche Lorraine", "Croque Monsieur", "Steak Frites"]
},

Greece: {
  Fresh: ["Greek Salad", "Tzatziki & Pita", "Grilled Octopus", "Dolmades", "Grilled Sardines"],
  Savory: ["Moussaka", "Souvlaki", "Gyro", "Pastitsio", "Spanakopita"],
  Herby: ["Lemon Herb Chicken", "Lamb Kleftiko", "Fasolada", "Briam", "Keftedes"]
},

Spain: {
  Savory: ["Paella", "Tortilla Española", "Jamón Ibérico", "Patatas Bravas", "Chorizo al Vino"],
  Seafood: ["Gambas al Ajillo", "Pulpo a la Gallega", "Paella de Mariscos", "Calamares", "Boquerones"],
  Comfort: ["Cocido Madrileño", "Fabada Asturiana", "Croquetas", "Albóndigas", "Sopa de Ajo"]
}};

function validateGameData() {
  countries.forEach(country => {
    const flavors = flavorProfiles[country];
    if (!flavors || flavors.length === 0) {
      console.warn(`Missing flavorProfiles for ${country}`);
      return;
    }
    flavors.forEach(flavor => {
      const list = meals[country]?.[flavor];
      if (!list || list.length === 0) {
        console.warn(`Missing meals: ${country} → ${flavor}`);
      }
    });
  });
}
validateGameData();

// ---------------------------
// GAME ENGINE
// ---------------------------

let timerInterval;

function startTimer(callback) {
  let time = 30;
  const timer = document.getElementById("timer");
  timer.textContent = time;

  clearInterval(timerInterval);
  timerInterval = setInterval(() => {
    time--;
    timer.textContent = time;

    if (time <= 0) {
      clearInterval(timerInterval);
      callback();
    }
  }, 1000);
}

function renderOptions(title, options, callback) {
  document.getElementById("game-title").textContent = title;

  const container = document.getElementById("options");
  container.innerHTML = "";

  options.forEach(option => {
    const btn = document.createElement("button");
    btn.textContent = option;
    btn.onclick = () => {
      clearInterval(timerInterval);
      callback(option);
    };
    container.appendChild(btn);
  });

  startTimer(() => {
    const randomPick = options[Math.floor(Math.random() * options.length)];
    callback(randomPick);
  });
}

function startGame() {
  renderOptions("Breakfast, Lunch, or Dinner?", ["Breakfast", "Lunch/Dinner"], chooseMealType);
}

function chooseMealType(choice) {
  if (choice === "Breakfast") {
    renderOptions("Choose a breakfast:", breakfastFoods, finishGame);
  } else {
    renderOptions("Pick a country:", countries, chooseCountry);
  }
}

function chooseCountry(country) {
  selectedCountry = country; // ⭐ FIXED
  renderOptions(`What type of ${country} food?`, flavorProfiles[country], chooseFlavor);
}

function chooseFlavor(flavor) {
  renderOptions(`Choose your meal:`, meals[selectedCountry][flavor], finishGame);
}

function finishGame(finalMeal) {
  clearInterval(timerInterval);
  document.getElementById("game-title").textContent = `Final Choice: ${finalMeal}`;
  document.getElementById("options").innerHTML = "";
  document.getElementById("timer").textContent = "";
}

function chooseFlavor(flavor) {
  const options = meals[selectedCountry]?.[flavor];
  if (!options || options.length === 0) {
    console.warn(`No meals for ${selectedCountry} → ${flavor}. Please hmu so I can fix it.`);
    renderOptions("Pick a country:", countries, chooseCountry);
    return;
  }
  renderOptions("Choose your meal:", options, finishGame);
}

// START GAME
startGame();
