const categories = ["All", "Electronics", "Fashion", "Home", "Fitness", "Accessories"];

const products = [
  // Electronics
  {
    id: 1,
    name: "Wireless ANC Headphones",
    category: "Electronics",
    price: 299,
    rating: 4.8,
    reviews: 142,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: 2,
    name: "Smart Watch Ultra GPS",
    category: "Electronics",
    price: 399,
    rating: 4.9,
    reviews: 89,
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: 3,
    name: "Mechanical Tactile Keyboard",
    category: "Electronics",
    price: 149,
    rating: 4.7,
    reviews: 210,
    image: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: 4,
    name: "Precision Wireless Gaming Mouse",
    category: "Electronics",
    price: 79,
    rating: 4.6,
    reviews: 95,
    image: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: 5,
    name: "4K Cinema Projector",
    category: "Electronics",
    price: 599,
    rating: 4.9,
    reviews: 67,
    image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: 6,
    name: "Noise Cancelling Earbuds",
    category: "Electronics",
    price: 159,
    rating: 4.5,
    reviews: 180,
    image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&w=600&q=80"
  },

  // Fashion
  {
    id: 7,
    name: "Minimalist Leather Backpack",
    category: "Fashion",
    price: 179,
    rating: 4.6,
    reviews: 64,
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: 8,
    name: "Polarized Clubmaster Sunglasses",
    category: "Fashion",
    price: 89,
    rating: 4.5,
    reviews: 112,
    image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: 9,
    name: "Classic Denim Trucker Jacket",
    category: "Fashion",
    price: 120,
    rating: 4.7,
    reviews: 88,
    image: "https://images.unsplash.com/photo-1576995853123-5a10305d93c0?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: 10,
    name: "Urban Streetwear Sneakers",
    category: "Fashion",
    price: 135,
    rating: 4.8,
    reviews: 204,
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: 11,
    name: "Tailored Slim-Fit Blazer",
    category: "Fashion",
    price: 210,
    rating: 4.4,
    reviews: 43,
    image: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=600&q=80"
  },

  // Home
  {
    id: 12,
    name: "Smart Ambient LED Lamp",
    category: "Home",
    price: 69,
    rating: 4.4,
    reviews: 53,
    image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: 13,
    name: "Ergonomic Lumbar Office Chair",
    category: "Home",
    price: 289,
    rating: 4.8,
    reviews: 175,
    image: "https://images.unsplash.com/photo-1580481072645-022f9a6d83d0?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: 14,
    name: "Ceramic Minimalist Coffee Mug",
    category: "Home",
    price: 24,
    rating: 4.9,
    reviews: 310,
    image: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: 15,
    name: "Ultrasonic Essential Oil Diffuser",
    category: "Home",
    price: 45,
    rating: 4.6,
    reviews: 128,
    image: "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: 16,
    name: "Automatic Espresso Machine",
    category: "Home",
    price: 499,
    rating: 4.9,
    reviews: 94,
    image: "https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?auto=format&fit=crop&w=600&q=80"
  },

  // Fitness
  {
    id: 17,
    name: "Insulated Thermal Water Flask",
    category: "Fitness",
    price: 39,
    rating: 4.9,
    reviews: 320,
    image: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: 18,
    name: "Non-Slip Eco Yoga Mat",
    category: "Fitness",
    price: 49,
    rating: 4.7,
    reviews: 156,
    image: "https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: 19,
    name: "Adjustable Cast Iron Dumbbell Set",
    category: "Fitness",
    price: 199,
    rating: 4.8,
    reviews: 215,
    image: "https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: 20,
    name: "Heavy Duty Resistance Bands",
    category: "Fitness",
    price: 29,
    rating: 4.6,
    reviews: 82,
    image: "https://images.unsplash.com/photo-1598289431512-b97b0917affc?auto=format&fit=crop&w=600&q=80"
  },

  // Accessories
  {
    id: 21,
    name: "Full-Grain Leather Bifold Wallet",
    category: "Accessories",
    price: 55,
    rating: 4.8,
    reviews: 140,
    image: "https://images.unsplash.com/photo-1627123424574-724758594e93?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: 22,
    name: "Chronograph Stainless Steel Watch",
    category: "Accessories",
    price: 249,
    rating: 4.9,
    reviews: 78,
    image: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: 23,
    name: "Canvas Travel Duffle Bag",
    category: "Accessories",
    price: 110,
    rating: 4.6,
    reviews: 91,
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: 24,
    name: "Sleek Aluminum Laptop Stand",
    category: "Accessories",
    price: 42,
    rating: 4.7,
    reviews: 163,
    image: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?auto=format&fit=crop&w=600&q=80"
  }
];

class Database {
  constructor() {
    this.dbName = "FlashBuyProDB";
    this.db = null;
  }

  init() {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(this.dbName, 1);

      request.onupgradeneeded = (e) => {
        const db = e.target.result;
        if (!db.objectStoreNames.contains("users")) {
          db.createObjectStore("users", { keyPath: "email" });
        }
      };

      request.onsuccess = (e) => {
        this.db = e.target.result;
        resolve();
      };

      request.onerror = () => reject("Failed to initialize IndexedDB.");
    });
  }

  addUser(user) {
    return new Promise((resolve, reject) => {
      const tx = this.db.transaction("users", "readwrite");
      const store = tx.objectStore("users");
      const req = store.add(user);
      req.onsuccess = () => resolve(true);
      req.onerror = () => reject("Account with this email already exists.");
    });
  }

  getUser(email) {
    return new Promise((resolve) => {
      const tx = this.db.transaction("users", "readonly");
      const store = tx.objectStore("users");
      const req = store.get(email);
      req.onsuccess = () => resolve(req.result);
      req.onerror = () => resolve(null);
    });
  }
}
