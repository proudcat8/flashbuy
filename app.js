const state = {
  category: "All",
  searchQuery: "",
  sortBy: "featured",
  selectedDonation: null,
  currentUser: JSON.parse(sessionStorage.getItem('flashbuy_session')) || null,
  cart: JSON.parse(localStorage.getItem('flashbuy_cart')) || [],
  wishlist: JSON.parse(localStorage.getItem('flashbuy_wishlist')) || []
};

const db = new Database();

function showToast(message, type = "info") {
  const container = document.getElementById('toast-container');
  const toast = document.createElement('div');
  
  const bgClass = type === "success" 
    ? "bg-slate-900 border-emerald-500/50 text-emerald-400" 
    : type === "error" ? "bg-slate-900 border-red-500/50 text-red-400" : "bg-slate-900 border-orange-500/50 text-orange-400";

  toast.className = `pointer-events-auto px-4 py-3 rounded-2xl border ${bgClass} shadow-xl flex items-center gap-2 text-xs font-bold toast-animate`;
  toast.innerHTML = `<i data-lucide="${type === 'success' ? 'check-circle' : 'info'}" class="w-4 h-4"></i> ${message}`;
  
  container.appendChild(toast);
  lucide.createIcons();

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(100%)';
    toast.style.transition = 'all 0.25s ease-out';
    setTimeout(() => toast.remove(), 250);
  }, 3000);
}

function renderCategories() {
  const container = document.getElementById('category-buttons');
  container.innerHTML = categories.map(cat => `
    <button data-category="${cat}" class="cat-btn px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${state.category === cat ? 'bg-orange-500 text-slate-950 shadow-lg shadow-orange-500/20' : 'bg-slate-900 text-slate-400 hover:bg-slate-800 hover:text-slate-200 border border-slate-800'}">
      ${cat}
    </button>
  `).join('');

  container.querySelectorAll('.cat-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      state.category = e.currentTarget.dataset.category;
      renderCategories();
      renderProducts();
    });
  });
}

function getProcessedProducts() {
  let list = [...products];

  if (state.category !== "All") {
    list = list.filter(p => p.category === state.category);
  }

  if (state.searchQuery.trim() !== "") {
    const q = state.searchQuery.toLowerCase();
    list = list.filter(p => p.name.toLowerCase().includes(q) || p.category.toLowerCase().includes(q));
  }

  if (state.sortBy === "price-low") list.sort((a, b) => a.price - b.price);
  if (state.sortBy === "price-high") list.sort((a, b) => b.price - a.price);
  if (state.sortBy === "rating") list.sort((a, b) => b.rating - a.rating);

  return list;
}

function renderProducts() {
  const items = getProcessedProducts();
  const grid = document.getElementById('product-grid');
  document.getElementById('category-title').innerHTML = `<i data-lucide="grid" class="text-orange-500"></i> ${state.category} Catalog`;
  document.getElementById('product-count').innerText = `${items.length} items available`;

  if (items.length === 0) {
    grid.innerHTML = `
      <div class="col-span-full py-16 text-center text-slate-500">
        <i data-lucide="package-search" class="w-12 h-12 mx-auto mb-3 text-slate-600"></i>
        <p class="text-base font-semibold">No products found matching your filter criteria.</p>
      </div>
    `;
    lucide.createIcons();
    return;
  }

  grid.innerHTML = items.map(p => {
    const isWished = state.wishlist.includes(p.id);
    return `
      <div class="bg-slate-900/60 rounded-3xl overflow-hidden border border-slate-800/80 hover:border-orange-500/40 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-2xl hover:shadow-orange-500/10 flex flex-col justify-between group">
        <div class="relative overflow-hidden h-52 bg-slate-950">
          <img src="${p.image}" alt="${p.name}" onerror="this.src='https://images.unsplash.com/photo-1560343090-f0409e92791a?auto=format&fit=crop&w=600&q=80'" class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105">
          <span class="absolute top-3 left-3 bg-slate-950/80 backdrop-blur-md text-orange-400 text-[10px] font-bold px-2.5 py-1 rounded-lg border border-orange-500/20 uppercase tracking-wider">${p.category}</span>
          
          <button data-id="${p.id}" class="wish-btn absolute top-3 right-3 p-2 rounded-xl bg-slate-950/80 backdrop-blur-md border border-slate-800 text-slate-400 hover:text-red-400 transition-all active:scale-90">
            <i data-lucide="heart" class="w-4 h-4 ${isWished ? 'fill-red-500 text-red-500' : ''}"></i>
          </button>
        </div>

        <div class="p-5 flex-1 flex flex-col justify-between">
          <div>
            <div class="flex items-center gap-1 mb-2">
              <i data-lucide="star" class="w-3.5 h-3.5 text-amber-400 fill-amber-400"></i>
              <span class="text-xs font-bold text-slate-200">${p.rating}</span>
              <span class="text-xs text-slate-500">(${p.reviews})</span>
            </div>
            <h3 class="font-bold text-base mb-1 text-slate-100 group-hover:text-orange-400 transition-colors">${p.name}</h3>
            <p class="text-xl font-black text-orange-400 mb-4">$${p.price}</p>
          </div>

          <button data-id="${p.id}" class="add-cart-btn w-full bg-slate-800 hover:bg-orange-500 hover:text-slate-950 text-slate-100 font-bold py-2.5 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 active:scale-95">
            <i data-lucide="plus" class="w-4 h-4"></i> Add to Cart
          </button>
        </div>
      </div>
    `;
  }).join('');

  lucide.createIcons();
  attachProductEvents();
}

function attachProductEvents() {
  document.querySelectorAll('.add-cart-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const id = parseInt(e.currentTarget.dataset.id);
      addToCart(id);
    });
  });

  document.querySelectorAll('.wish-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const id = parseInt(e.currentTarget.dataset.id);
      toggleWishlist(id);
    });
  });
}

function toggleWishlist(id) {
  const index = state.wishlist.indexOf(id);
  if (index > -1) {
    state.wishlist.splice(index, 1);
    showToast("Removed from wishlist");
  } else {
    state.wishlist.push(id);
    showToast("Saved to wishlist!", "success");
  }
  localStorage.setItem('flashbuy_wishlist', JSON.stringify(state.wishlist));
  updateWishlistUI();
  renderProducts();
}

function updateWishlistUI() {
  const badge = document.getElementById('wishlist-count');
  badge.innerText = state.wishlist.length;
  badge.style.opacity = state.wishlist.length > 0 ? "1" : "0";
}

function addToCart(id) {
  const existing = state.cart.find(item => item.id === id);
  if (existing) {
    existing.qty += 1;
  } else {
    const item = products.find(p => p.id === id);
    state.cart.push({ ...item, qty: 1 });
  }
  saveCart();
  showToast("Added to shopping cart", "success");
  toggleCart(true);
}

function saveCart() {
  localStorage.setItem('flashbuy_cart', JSON.stringify(state.cart));
  updateCartUI();
}

function updateCartUI() {
  const totalQty = state.cart.reduce((sum, item) => sum + item.qty, 0);
  const totalPrice = state.cart.reduce((sum, item) => sum + (item.price * item.qty), 0);

  document.getElementById('cart-count').innerText = totalQty;
  document.getElementById('cart-subtotal').innerText = `$${totalPrice.toFixed(2)}`;
  document.getElementById('cart-total').innerText = `$${totalPrice.toFixed(2)}`;

  const container = document.getElementById('cart-items');
  if (state.cart.length === 0) {
    container.innerHTML = `<p class="text-slate-500 text-center py-16 text-sm font-medium">Your shopping cart is currently empty.</p>`;
  } else {
    container.innerHTML = state.cart.map(item => `
      <div class="flex items-center justify-between bg-slate-950/60 p-3 rounded-2xl border border-slate-800">
        <div class="flex items-center gap-3">
          <img src="${item.image}" class="w-12 h-12 rounded-xl object-cover">
          <div>
            <h4 class="font-bold text-xs text-slate-200 line-clamp-1">${item.name}</h4>
            <p class="text-xs text-orange-400 font-semibold">$${item.price} × ${item.qty}</p>
          </div>
        </div>
        <div class="flex items-center gap-2">
          <div class="flex items-center bg-slate-900 border border-slate-800 rounded-lg">
            <button data-id="${item.id}" data-action="dec" class="qty-btn px-2 py-0.5 text-xs text-slate-400 hover:text-white">-</button>
            <span class="text-xs font-bold px-1 text-slate-200">${item.qty}</span>
            <button data-id="${item.id}" data-action="inc" class="qty-btn px-2 py-0.5 text-xs text-slate-400 hover:text-white">+</button>
          </div>
          <button data-id="${item.id}" class="remove-btn text-slate-500 hover:text-red-400 p-1"><i data-lucide="trash-2" class="w-4 h-4"></i></button>
        </div>
      </div>
    `).join('');
  }

  lucide.createIcons();
  attachCartEvents();
}

function attachCartEvents() {
  document.querySelectorAll('.qty-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const id = parseInt(e.currentTarget.dataset.id);
      const action = e.currentTarget.dataset.action;
      const item = state.cart.find(i => i.id === id);
      if (!item) return;

      if (action === 'inc') item.qty += 1;
      if (action === 'dec') {
        item.qty -= 1;
        if (item.qty <= 0) state.cart = state.cart.filter(i => i.id !== id);
      }
      saveCart();
    });
  });

  document.querySelectorAll('.remove-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const id = parseInt(e.currentTarget.dataset.id);
      state.cart = state.cart.filter(i => i.id !== id);
      saveCart();
      showToast("Item removed from cart");
    });
  });
}

function toggleCart(forceOpen = false) {
  const drawer = document.getElementById('cart-drawer');
  const isOpen = drawer.classList.contains('drawer-open');

  if (isOpen && !forceOpen) {
    drawer.classList.remove('drawer-open');
  } else {
    drawer.classList.add('drawer-open');
  }
}

function openDonateModal() {
  state.selectedDonation = null;
  document.getElementById('custom-donate-input').value = "";
  document.querySelectorAll('.donate-option-btn').forEach(btn => {
    btn.classList.remove('border-emerald-500', 'bg-emerald-500/10');
  });
  document.getElementById('donate-modal').classList.add('modal-open');
}

function closeDonateModal() {
  document.getElementById('donate-modal').classList.remove('modal-open');
}

function handleDonation() {
  const customAmount = document.getElementById('custom-donate-input').value;
  const finalAmount = customAmount ? parseFloat(customAmount) : state.selectedDonation;

  if (!finalAmount || finalAmount <= 0) {
    return showToast("Please select or enter a valid donation amount", "error");
  }

  confetti({ particleCount: 100, spread: 60, origin: { y: 0.6 } });
  closeDonateModal();
  showToast(`Thank you so much for your donation of ₹${finalAmount}! ❤️`, "success");
}

function updateAuthUI() {
  const container = document.getElementById('auth-actions');
  if (state.currentUser) {
    container.innerHTML = `
      <div class="flex items-center gap-2 bg-slate-900 border border-slate-800 px-3 py-1.5 rounded-xl">
        <i data-lucide="user" class="w-4 h-4 text-orange-400"></i>
        <span class="text-xs font-bold text-slate-200">${state.currentUser.name}</span>
        <button id="logout-btn" class="ml-2 text-slate-500 hover:text-red-400"><i data-lucide="log-out" class="w-4 h-4"></i></button>
      </div>
    `;
    document.getElementById('logout-btn').addEventListener('click', logout);
  } else {
    container.innerHTML = `
      <button id="login-modal-btn" class="text-xs font-bold px-3 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-800 transition-all">Log In</button>
      <button id="signup-modal-btn" class="text-xs font-bold px-3 py-2 rounded-xl bg-orange-500 hover:bg-orange-600 text-slate-950 transition-all">Sign Up</button>
    `;
    document.getElementById('login-modal-btn').addEventListener('click', () => openAuthModal('login'));
    document.getElementById('signup-modal-btn').addEventListener('click', () => openAuthModal('signup'));
  }
  lucide.createIcons();
}

function openAuthModal(mode = 'login') {
  const container = document.getElementById('auth-form-container');
  if (mode === 'signup') {
    container.innerHTML = `
      <h3 class="text-2xl font-black mb-1 text-orange-400">Create Account</h3>
      <p class="text-xs text-slate-400 mb-5">Save cart items and preferences locally.</p>
      <form id="signup-form" class="space-y-3">
        <input type="text" id="signup-name" placeholder="Full Name" required class="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-sm text-slate-100 focus:outline-none focus:border-orange-500">
        <input type="email" id="signup-email" placeholder="Email Address" required class="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-sm text-slate-100 focus:outline-none focus:border-orange-500">
        <input type="password" id="signup-password" placeholder="Password" required class="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-sm text-slate-100 focus:outline-none focus:border-orange-500">
        <button type="submit" class="w-full bg-orange-500 hover:bg-orange-600 text-slate-950 font-extrabold py-3 rounded-xl transition-all text-sm mt-2">Sign Up</button>
      </form>
      <p class="text-xs text-center text-slate-400 mt-4">Already registered? <a href="#" id="switch-to-login" class="text-orange-400 font-bold underline">Log In</a></p>
    `;
    document.getElementById('signup-form').addEventListener('submit', handleSignUp);
    document.getElementById('switch-to-login').addEventListener('click', (e) => { e.preventDefault(); openAuthModal('login'); });
  } else {
    container.innerHTML = `
      <h3 class="text-2xl font-black mb-1 text-orange-400">Welcome Back</h3>
      <p class="text-xs text-slate-400 mb-5">Log in to your local account.</p>
      <form id="login-form" class="space-y-3">
        <input type="email" id="login-email" placeholder="Email Address" required class="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-sm text-slate-100 focus:outline-none focus:border-orange-500">
        <input type="password" id="login-password" placeholder="Password" required class="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-sm text-slate-100 focus:outline-none focus:border-orange-500">
        <button type="submit" class="w-full bg-orange-500 hover:bg-orange-600 text-slate-950 font-extrabold py-3 rounded-xl transition-all text-sm mt-2">Log In</button>
      </form>
      <p class="text-xs text-center text-slate-400 mt-4">Need an account? <a href="#" id="switch-to-signup" class="text-orange-400 font-bold underline">Sign Up</a></p>
    `;
    document.getElementById('login-form').addEventListener('submit', handleLogin);
    document.getElementById('switch-to-signup').addEventListener('click', (e) => { e.preventDefault(); openAuthModal('signup'); });
  }
  document.getElementById('auth-modal').classList.add('modal-open');
}

function closeAuthModal() {
  document.getElementById('auth-modal').classList.remove('modal-open');
}

async function handleSignUp(e) {
  e.preventDefault();
  const name = document.getElementById('signup-name').value;
  const email = document.getElementById('signup-email').value;
  const password = document.getElementById('signup-password').value;

  try {
    await db.addUser({ name, email, password });
    state.currentUser = { name, email };
    sessionStorage.setItem('flashbuy_session', JSON.stringify(state.currentUser));
    updateAuthUI();
    closeAuthModal();
    showToast(`Account registered! Welcome, ${name}`, "success");
  } catch (err) {
    showToast(err, "error");
  }
}

async function handleLogin(e) {
  e.preventDefault();
  const email = document.getElementById('login-email').value;
  const password = document.getElementById('login-password').value;

  const user = await db.getUser(email);
  if (user && user.password === password) {
    state.currentUser = { name: user.name, email: user.email };
    sessionStorage.setItem('flashbuy_session', JSON.stringify(state.currentUser));
    updateAuthUI();
    closeAuthModal();
    showToast(`Welcome back, ${user.name}!`, "success");
  } else {
    showToast("Invalid login credentials", "error");
  }
}

function logout() {
  sessionStorage.removeItem('flashbuy_session');
  state.currentUser = null;
  updateAuthUI();
  showToast("Logged out successfully");
}

function checkout() {
  if (state.cart.length === 0) return showToast("Your cart is empty", "error");
  if (!state.currentUser) {
    toggleCart();
    openAuthModal('login');
    return showToast("Please log in to complete checkout", "info");
  }

  confetti({ particleCount: 150, spread: 80, origin: { y: 0.6 } });
  state.cart = [];
  saveCart();
  toggleCart();
  showToast(`Order completed! Thank you, ${state.currentUser.name}.`, "success");
}

document.addEventListener('DOMContentLoaded', async () => {
  await db.init();
  renderCategories();
  renderProducts();
  updateCartUI();
  updateWishlistUI();
  updateAuthUI();

  const bindSearch = (inputEl) => {
    inputEl.addEventListener('input', (e) => {
      state.searchQuery = e.target.value;
      renderProducts();
    });
  };
  bindSearch(document.getElementById('search-input'));
  bindSearch(document.getElementById('mobile-search-input'));

  document.getElementById('sort-select').addEventListener('change', (e) => {
    state.sortBy = e.target.value;
    renderProducts();
  });

  document.getElementById('logo-btn').addEventListener('click', () => {
    state.category = "All";
    state.searchQuery = "";
    document.getElementById('search-input').value = "";
    renderCategories();
    renderProducts();
  });

  document.getElementById('cart-btn').addEventListener('click', () => toggleCart());
  document.getElementById('close-cart-btn').addEventListener('click', () => toggleCart());
  document.getElementById('cart-backdrop').addEventListener('click', () => toggleCart());

  document.getElementById('close-auth-btn').addEventListener('click', closeAuthModal);
  document.getElementById('auth-backdrop').addEventListener('click', closeAuthModal);
  document.getElementById('checkout-btn').addEventListener('click', checkout);

  document.getElementById('donate-btn').addEventListener('click', openDonateModal);
  document.getElementById('close-donate-btn').addEventListener('click', closeDonateModal);
  document.getElementById('donate-backdrop').addEventListener('click', closeDonateModal);
  document.getElementById('confirm-donate-btn').addEventListener('click', handleDonation);

  document.querySelectorAll('.donate-option-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      document.querySelectorAll('.donate-option-btn').forEach(b => b.classList.remove('border-emerald-500', 'bg-emerald-500/10'));
      e.currentTarget.classList.add('border-emerald-500', 'bg-emerald-500/10');
      state.selectedDonation = parseFloat(e.currentTarget.dataset.amount);
      document.getElementById('custom-donate-input').value = "";
    });
  });

  document.getElementById('custom-donate-input').addEventListener('input', () => {
    document.querySelectorAll('.donate-option-btn').forEach(b => b.classList.remove('border-emerald-500', 'bg-emerald-500/10'));
    state.selectedDonation = null;
  });
});
