/* ==========================================================================
   EVENTPULSE AI - MAIN APPLICATION LOGIC (WITH CLEAN AUTHENTICATION MESSAGING)
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  if (window.lucide) {
    window.lucide.createIcons();
  }

  // Pre-loaded Registered Users DB
  const INITIAL_REGISTERED_USERS = [
    { name: 'Alex Rivera', email: 'user@eventpulse.ai', password: 'user123', role: 'user', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80' }
  ];

  const INITIAL_EVENTS = [
    {
      id: 'evt-101',
      title: 'Global Tech & AI Summit 2026',
      category: 'Tech & AI',
      format: 'Hybrid',
      date: 'Aug 24, 2026 • 09:00 AM PST',
      location: 'Moscone Center, San Francisco, CA',
      price: 149,
      image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&auto=format&fit=crop&q=80',
      rating: 4.9,
      attendees: 3420,
      speakers: [
        { name: 'Dr. Elena Vance', role: 'Head of AI Research', avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=120&auto=format&fit=crop&q=80' },
        { name: 'Marcus Chen', role: 'VP Engineering', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80' }
      ],
      description: 'The world\'s flagship gathering for AI architects, LLM engineers, and autonomous agent builders. Featuring live keynotes, hands-on lab workshops, and exclusive investor networking.'
    },
    {
      id: 'evt-102',
      title: 'Next-Gen UI/UX Design Systems Expo',
      category: 'Design',
      format: 'In-Person',
      date: 'Sep 05, 2026 • 10:00 AM EST',
      location: 'Javits Center, New York, NY',
      price: 89,
      image: 'https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=800&auto=format&fit=crop&q=80',
      rating: 4.8,
      attendees: 1850,
      speakers: [
        { name: 'Sofia Rodriguez', role: 'Principal Designer', avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=120&auto=format&fit=crop&q=80' }
      ],
      description: 'Master micro-animations, glassmorphic UI systems, and design tokens for multi-device web apps. Includes design critique panels and interactive prototyping labs.'
    },
    {
      id: 'evt-103',
      title: 'Web3 & Decentralized Cloud Conference',
      category: 'Web3 & Crypto',
      format: 'Virtual',
      date: 'Sep 18, 2026 • 02:00 PM UTC',
      location: 'Global Virtual Stream (Zoom HD & Spatial VR)',
      price: 0,
      image: 'https://images.unsplash.com/photo-1511578314322-379afb476865?w=800&auto=format&fit=crop&q=80',
      rating: 4.7,
      attendees: 5200,
      speakers: [
        { name: 'Kaelen Thorne', role: 'Crypto Architect', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&auto=format&fit=crop&q=80' }
      ],
      description: 'Explore zero-knowledge proofs, decentralized storage, and resilient cloud infrastructure. Free worldwide virtual access ticket.'
    },
    {
      id: 'evt-104',
      title: 'CyberPulse Music & Digital Arts Fest',
      category: 'Entertainment',
      format: 'In-Person',
      date: 'Oct 02, 2026 • 06:00 PM PST',
      location: 'LA Live Arena, Los Angeles, CA',
      price: 65,
      image: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=800&auto=format&fit=crop&q=80',
      rating: 4.9,
      attendees: 8400,
      speakers: [
        { name: 'DJ Synthetix', role: 'Audio Visual Artist', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=120&auto=format&fit=crop&q=80' }
      ],
      description: 'An immersive 3D projection-mapped synth festival blending electronic music, live generative art visuals, and spatial sound.'
    },
    {
      id: 'evt-105',
      title: 'SaaS Founder & Venture Pitch Summit',
      category: 'Business',
      format: 'Hybrid',
      date: 'Oct 14, 2026 • 09:30 AM CST',
      location: 'Merchandise Mart, Chicago, IL',
      price: 199,
      image: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=800&auto=format&fit=crop&q=80',
      rating: 4.6,
      attendees: 1200,
      speakers: [
        { name: 'Rachel Sterling', role: 'Managing Partner', avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=120&auto=format&fit=crop&q=80' }
      ],
      description: 'Connect seed and Series A tech founders with tier-1 VCs. Features live 3-minute pitch battles and 1-on-1 breakout tables.'
    },
    {
      id: 'evt-106',
      title: 'Robotics & Neural Hardware Expo',
      category: 'Tech & AI',
      format: 'In-Person',
      date: 'Nov 10, 2026 • 11:00 AM EST',
      location: 'Hynes Convention Center, Boston, MA',
      price: 120,
      image: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800&auto=format&fit=crop&q=80',
      rating: 4.9,
      attendees: 2100,
      speakers: [
        { name: 'Prof. Liam O\'Connor', role: 'Robotics Lab Director', avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=120&auto=format&fit=crop&q=80' }
      ],
      description: 'Witness live demonstrations of humanoid robots, neural processing chips, and bionic prosthetics. Interactive lab access included.'
    }
  ];

  const INITIAL_AGENDA = [
    { time: '09:00 AM', title: 'Opening Keynote: The Autonomous Era', speaker: 'Dr. Elena Vance', track: 'AI & Data', isLive: true },
    { time: '10:30 AM', title: 'Building Resilient Micro-Frontends', speaker: 'Marcus Chen', track: 'Cloud Architecture', isLive: false },
    { time: '01:00 PM', title: 'Design System Tokens & Accessibility', speaker: 'Sofia Rodriguez', track: 'Product Design', isLive: false },
    { time: '02:30 PM', title: 'Zero-Knowledge Proofs in Production', speaker: 'Kaelen Thorne', track: 'AI & Data', isLive: false }
  ];

  const INITIAL_QA = [
    { id: 1, author: 'Maya Lin', text: 'How will autonomous agents handle unexpected edge cases in safety-critical systems?', votes: 42, voted: false },
    { id: 2, author: 'David K.', text: 'Can we get early access to the new LLM benchmark dataset shown on slide 14?', votes: 29, voted: false },
    { id: 3, author: 'Priya Sharma', text: 'What is the recommended latency threshold for real-time spatial audio rendering?', votes: 18, voted: false }
  ];

  const INITIAL_POLL = {
    question: "What is your team's biggest challenge in deploying AI in 2026?",
    options: [
      { id: 'opt1', text: 'Model Inference Latency & Cost', votes: 420 },
      { id: 'opt2', text: 'Data Privacy & Regulatory Compliance', votes: 510 },
      { id: 'opt3', text: 'Integrating with Legacy APIs', votes: 230 },
      { id: 'opt4', text: 'Hiring Specialized AI Talent', votes: 180 }
    ],
    votedOption: null
  };

  const INITIAL_ROSTER = [
    { name: 'Alex Rivera', email: 'user@eventpulse.ai', eventTitle: 'Global Tech & AI Summit 2026', tier: 'VIP Pass', ticketId: 'EP-98214-VIP', checkedIn: true, avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80' },
    { name: 'Samantha Wu', email: 'sam.wu@design.io', eventTitle: 'Next-Gen UI/UX Design Expo', tier: 'General Access', ticketId: 'EP-44120-GEN', checkedIn: true, avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80' },
    { name: 'Michael Chang', email: 'm.chang@cloudnet.org', eventTitle: 'Web3 & Decentralized Cloud', tier: 'Virtual Pass', ticketId: 'EP-10928-VIRT', checkedIn: false, avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80' }
  ];

  // App State
  let state = {
    registeredUsers: JSON.parse(localStorage.getItem('ep_registered_users')) || INITIAL_REGISTERED_USERS,
    userSession: JSON.parse(localStorage.getItem('ep_session')) || null,
    activeTab: 'discover',
    events: JSON.parse(localStorage.getItem('ep_events')) || INITIAL_EVENTS,
    bookedTickets: JSON.parse(localStorage.getItem('ep_tickets')) || [
      {
        ticketId: 'EP-98214-VIP',
        eventId: 'evt-101',
        eventTitle: 'Global Tech & AI Summit 2026',
        date: 'Aug 24, 2026 • 09:00 AM PST',
        location: 'Moscone Center, San Francisco, CA',
        tier: 'VIP All-Access Pass',
        attendeeName: 'Alex Rivera',
        quantity: 1,
        pricePaid: 149
      }
    ],
    bookmarks: JSON.parse(localStorage.getItem('ep_bookmarks')) || ['evt-101', 'evt-102'],
    categoryFilter: 'all',
    formatFilter: 'all',
    searchQuery: '',
    sortBy: 'upcoming',
    qaList: INITIAL_QA,
    poll: INITIAL_POLL,
    roster: INITIAL_ROSTER,
    passesSubtab: 'booked'
  };

  function saveState() {
    localStorage.setItem('ep_events', JSON.stringify(state.events));
    localStorage.setItem('ep_tickets', JSON.stringify(state.bookedTickets));
    localStorage.setItem('ep_bookmarks', JSON.stringify(state.bookmarks));
    localStorage.setItem('ep_session', JSON.stringify(state.userSession));
    localStorage.setItem('ep_registered_users', JSON.stringify(state.registeredUsers));
  }

  function showToast(message, iconName = 'check-circle') {
    const container = document.getElementById('toastContainer');
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = `<i data-lucide="${iconName}"></i> <span>${message}</span>`;
    container.appendChild(toast);
    if (window.lucide) window.lucide.createIcons();

    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateX(100%)';
      setTimeout(() => toast.remove(), 300);
    }, 3000);
  }

  function showAuthError(message) {
    const errorAlert = document.getElementById('authErrorAlert');
    const errorMsg = document.getElementById('authErrorMsg');
    errorMsg.textContent = message;
    errorAlert.style.display = 'flex';
  }

  function clearAuthError() {
    const errorAlert = document.getElementById('authErrorAlert');
    errorAlert.style.display = 'none';
  }

  function generateSvgQrCode(text, size = 90) {
    let hash = 0;
    for (let i = 0; i < text.length; i++) {
      hash = (hash << 5) - hash + text.charCodeAt(i);
      hash |= 0;
    }
    const grid = 9;
    const cellSize = size / grid;
    let svgPaths = '';

    const drawFinder = (x, y) => {
      svgPaths += `<rect x="${x * cellSize}" y="${y * cellSize}" width="${3 * cellSize}" height="${3 * cellSize}" fill="#0A0D14" />`;
      svgPaths += `<rect x="${(x + 0.5) * cellSize}" y="${(y + 0.5) * cellSize}" width="${2 * cellSize}" height="${2 * cellSize}" fill="#FFFFFF" />`;
      svgPaths += `<rect x="${(x + 1) * cellSize}" y="${(y + 1) * cellSize}" width="${cellSize}" height="${cellSize}" fill="#0A0D14" />`;
    };

    drawFinder(0, 0);
    drawFinder(6, 0);
    drawFinder(0, 6);

    for (let r = 0; r < grid; r++) {
      for (let c = 0; c < grid; c++) {
        if ((r < 3 && c < 3) || (r < 3 && c >= 6) || (r >= 6 && c < 3)) continue;
        const bit = ((hash ^ (r * 17 + c * 31)) & 1) === 0;
        if (bit) {
          svgPaths += `<rect x="${c * cellSize}" y="${r * cellSize}" width="${cellSize}" height="${cellSize}" fill="#0A0D14" />`;
        }
      }
    }

    return `
      <svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg">
        <rect width="${size}" height="${size}" fill="#FFFFFF" rx="4" />
        ${svgPaths}
      </svg>
    `;
  }

  // ==========================================
  // AUTHENTICATION & UI STATE CONTROLLER
  // ==========================================
  function updateAuthUI() {
    const user = state.userSession;
    const isLoggedIn = !!user;
    const isAdmin = user && user.role === 'admin';

    document.getElementById('loggedOutActions').style.display = isLoggedIn ? 'none' : 'flex';
    document.getElementById('loggedInActions').style.display = isLoggedIn ? 'flex' : 'none';

    document.body.classList.toggle('role-admin', isAdmin);
    document.getElementById('adminModeBanner').style.display = isAdmin ? 'block' : 'none';

    document.querySelectorAll('.admin-only-tab').forEach(el => el.style.display = isAdmin ? 'flex' : 'none');
    document.querySelectorAll('.admin-only-action').forEach(el => el.style.display = isAdmin ? 'flex' : 'none');
    document.querySelectorAll('.admin-only-dropdown').forEach(el => el.style.display = isAdmin ? 'flex' : 'none');

    if (isLoggedIn) {
      document.getElementById('userNameLabel').textContent = user.name;
      document.getElementById('profileRoleTag').textContent = isAdmin ? 'System Admin' : 'Attendee';
      document.getElementById('userAvatarImg').src = user.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80';
      document.getElementById('dropdownName').textContent = user.name;
      document.getElementById('dropdownEmail').textContent = user.email;
      if (isAdmin) document.getElementById('adminBannerEmail').textContent = user.name;
    }

    document.getElementById('heroRoleTitle').textContent = isAdmin ? '⚡ Admin Portal Active' : isLoggedIn ? `Welcome, ${user.name}` : 'Smart Event Portal';

    if (!isAdmin && state.activeTab === 'dashboard') {
      switchTab('discover');
    } else {
      renderEventsGrid();
      if (state.activeTab === 'dashboard') renderDashboard();
    }
  }

  function checkAuthGuard(requiredRole = null) {
    if (!state.userSession) {
      openAuthModal();
      showToast('Please log in to continue.', 'lock');
      return false;
    }

    if (requiredRole === 'admin' && state.userSession.role !== 'admin') {
      openAuthModal();
      showAuthError("🔒 Administrator access required. Please log in with Admin credentials.");
      showToast("Admin access required.", 'shield-alert');
      return false;
    }

    return true;
  }

  const authModal = document.getElementById('authModal');
  
  function openAuthModal() {
    clearAuthError();
    document.getElementById('loginEmail').value = '';
    document.getElementById('loginPassword').value = '';
    document.getElementById('regName').value = '';
    document.getElementById('regEmail').value = '';
    document.getElementById('regPassword').value = '';
    
    authModal.classList.add('active');
  }

  function closeAuthModal() {
    clearAuthError();
    authModal.classList.remove('active');
  }

  document.getElementById('loginNavBtn').addEventListener('click', openAuthModal);
  document.getElementById('signUpNavBtn').addEventListener('click', () => {
    openAuthModal();
    setAuthTab('register');
  });
  document.getElementById('closeAuthModalBtn').addEventListener('click', closeAuthModal);

  function setAuthTab(tab) {
    clearAuthError();
    document.getElementById('tabLoginBtn').classList.toggle('active', tab === 'login');
    document.getElementById('tabRegisterBtn').classList.toggle('active', tab === 'register');
    document.getElementById('loginForm').style.display = tab === 'login' ? 'block' : 'none';
    document.getElementById('registerForm').style.display = tab === 'register' ? 'block' : 'none';
    document.getElementById('authModalTitle').textContent = tab === 'login' ? 'Portal Authentication' : 'Create User Account';
  }

  document.getElementById('tabLoginBtn').addEventListener('click', () => setAuthTab('login'));
  document.getElementById('tabRegisterBtn').addEventListener('click', () => setAuthTab('register'));

  // Strict Login Form Validation
  document.getElementById('loginForm').addEventListener('submit', (e) => {
    e.preventDefault();
    clearAuthError();

    const roleTarget = document.getElementById('loginRoleSelect').value;
    const inputUser = document.getElementById('loginEmail').value.trim();
    const inputPass = document.getElementById('loginPassword').value.trim();

    // 1. STRICT ADMIN AUTHENTICATION CHECK
    if (roleTarget === 'admin') {
      const isSnehaUser = inputUser.toLowerCase() === 'sneha' || inputUser.toLowerCase() === 'sneha@eventpulse.ai';
      const isSnehaPass = inputPass === 'sneha123';

      if (isSnehaUser && isSnehaPass) {
        state.userSession = {
          id: 'adm-sneha-001',
          name: 'Sneha',
          email: 'sneha@eventpulse.ai',
          role: 'admin',
          avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80'
        };
        saveState();
        updateAuthUI();
        closeAuthModal();
        showToast('Logged in as Administrator (Sneha)', 'shield-check');
      } else {
        showAuthError("Invalid credentials. Wrong username or password.");
      }
      return;
    }

    // 2. STRICT USER PORTAL AUTHENTICATION CHECK
    const foundUser = state.registeredUsers.find(u => u.email.toLowerCase() === inputUser.toLowerCase() || u.name.toLowerCase() === inputUser.toLowerCase());

    if (!foundUser) {
      showAuthError("You don't have an account yet! Please sign up first to create your account.");
      return;
    }

    if (foundUser.password !== inputPass) {
      showAuthError("Wrong password. Please try again.");
      return;
    }

    // Successful User Login
    state.userSession = {
      id: foundUser.id || `usr-${Date.now()}`,
      name: foundUser.name,
      email: foundUser.email,
      role: 'user',
      avatar: foundUser.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80'
    };

    saveState();
    updateAuthUI();
    closeAuthModal();
    showToast(`Welcome back, ${foundUser.name}!`, 'user-check');
  });

  // User Registration Form Submit
  document.getElementById('registerForm').addEventListener('submit', (e) => {
    e.preventDefault();
    clearAuthError();

    const name = document.getElementById('regName').value.trim();
    const email = document.getElementById('regEmail').value.trim();
    const password = document.getElementById('regPassword').value.trim();

    const existing = state.registeredUsers.find(u => u.email.toLowerCase() === email.toLowerCase());
    if (existing) {
      showAuthError("An account with this email already exists! Please log in.");
      return;
    }

    const newUser = {
      id: `usr-${Date.now()}`,
      name: name,
      email: email,
      password: password,
      role: 'user',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80'
    };

    state.registeredUsers.push(newUser);
    state.userSession = { id: newUser.id, name: newUser.name, email: newUser.email, role: 'user', avatar: newUser.avatar };
    
    saveState();
    updateAuthUI();
    closeAuthModal();
    showToast(`Account created successfully! Logged in as ${name}`, 'sparkles');
  });

  // Profile Dropdown Toggle
  const profileBadge = document.getElementById('userProfileBtn');
  const profileDropdown = document.getElementById('profileDropdown');

  profileBadge.addEventListener('click', (e) => {
    e.stopPropagation();
    profileDropdown.classList.toggle('active');
  });

  document.addEventListener('click', () => {
    profileDropdown.classList.remove('active');
  });

  // Logout Actions
  function logoutUser() {
    state.userSession = null;
    saveState();
    updateAuthUI();
    profileDropdown.classList.remove('active');
    showToast('Logged out of session', 'log-out');
  }

  document.getElementById('logoutBtn').addEventListener('click', logoutUser);
  document.getElementById('bannerLogoutBtn').addEventListener('click', logoutUser);

  document.getElementById('dropdownMyPassesBtn').addEventListener('click', () => {
    profileDropdown.classList.remove('active');
    switchTab('mypasses');
  });

  document.getElementById('dropdownAdminDashBtn').addEventListener('click', () => {
    profileDropdown.classList.remove('active');
    if (checkAuthGuard('admin')) switchTab('dashboard');
  });

  // ==========================================
  // TAB NAVIGATION
  // ==========================================
  function switchTab(tabId) {
    if (tabId === 'dashboard' && !checkAuthGuard('admin')) return;
    if (tabId === 'mypasses' && !checkAuthGuard()) return;

    state.activeTab = tabId;

    document.querySelectorAll('.nav-tab').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.tab === tabId);
    });

    document.querySelectorAll('.tab-view').forEach(view => {
      view.classList.toggle('active', view.id === `${tabId}View`);
    });

    if (tabId === 'discover') renderEventsGrid();
    if (tabId === 'livehub') renderLiveHub();
    if (tabId === 'mypasses') renderMyPasses();
    if (tabId === 'dashboard') renderDashboard();

    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  document.querySelectorAll('.nav-tab').forEach(btn => {
    btn.addEventListener('click', () => switchTab(btn.dataset.tab));
  });

  // ==========================================
  // DISCOVER EVENTS GRID
  // ==========================================
  function renderEventsGrid() {
    const grid = document.getElementById('eventsGrid');
    const resultsCount = document.getElementById('resultsCount');
    const isAdmin = state.userSession && state.userSession.role === 'admin';

    let filtered = state.events.filter(evt => {
      const matchesCategory = state.categoryFilter === 'all' || evt.category === state.categoryFilter;
      const matchesFormat = state.formatFilter === 'all' || evt.format === state.formatFilter;
      const q = state.searchQuery.toLowerCase();
      const matchesSearch = !q || evt.title.toLowerCase().includes(q) || evt.category.toLowerCase().includes(q) || evt.description.toLowerCase().includes(q);
      return matchesCategory && matchesFormat && matchesSearch;
    });

    if (state.sortBy === 'price-low') {
      filtered.sort((a, b) => a.price - b.price);
    } else if (state.sortBy === 'popular') {
      filtered.sort((a, b) => b.attendees - a.attendees);
    }

    resultsCount.textContent = `Showing ${filtered.length} curated event${filtered.length === 1 ? '' : 's'} (${isAdmin ? 'Admin Mode: Sneha' : 'Attendee Mode'})`;

    if (filtered.length === 0) {
      grid.innerHTML = `
        <div style="grid-column: 1/-1; text-align: center; padding: 4rem 1rem;">
          <i data-lucide="search-x" style="width: 48px; height: 48px; color: var(--text-muted); margin-bottom: 1rem;"></i>
          <h3>No events match your criteria</h3>
          <p style="color: var(--text-muted); margin-top: 0.5rem;">Try adjusting your filters or AI search keywords.</p>
        </div>
      `;
      if (window.lucide) window.lucide.createIcons();
      return;
    }

    grid.innerHTML = filtered.map(evt => {
      const isSaved = state.bookmarks.includes(evt.id);
      const isFree = evt.price === 0;

      return `
        <div class="event-card" data-id="${evt.id}">
          <div class="card-image-wrap">
            <img src="${evt.image}" alt="${evt.title}" loading="lazy" />
            <span class="badge-category">${evt.category}</span>
            <span class="badge-format">
              <i data-lucide="${evt.format === 'Virtual' ? 'video' : evt.format === 'In-Person' ? 'map-pin' : 'layers'}"></i>
              ${evt.format}
            </span>

            ${isAdmin ? `
              <div class="admin-card-actions">
                <button class="btn-admin-edit" data-id="${evt.id}" title="Edit Event Details"><i data-lucide="edit-3"></i> Edit</button>
                <button class="btn-admin-delete" data-id="${evt.id}" title="Delete Event"><i data-lucide="trash-2"></i></button>
              </div>
            ` : `
              <button class="bookmark-btn ${isSaved ? 'saved' : ''}" data-id="${evt.id}" title="${isSaved ? 'Remove Bookmark' : 'Bookmark Event'}">
                <i data-lucide="bookmark"></i>
              </button>
            `}
          </div>

          <div class="card-body">
            <div class="card-date">
              <i data-lucide="calendar"></i>
              <span>${evt.date}</span>
            </div>
            <h3 class="card-title">${evt.title}</h3>
            <div class="card-location">
              <i data-lucide="map-pin"></i>
              <span>${evt.location}</span>
            </div>

            <div class="card-speakers">
              <div class="speaker-stack">
                ${evt.speakers.map(s => `<img src="${s.avatar}" alt="${s.name}" title="${s.name} (${s.role})" />`).join('')}
              </div>
              <span class="speaker-label">${evt.speakers.length} Featured Speaker${evt.speakers.length > 1 ? 's' : ''}</span>
            </div>

            <div class="card-footer">
              <div class="card-price">
                <span class="price-val">${isFree ? 'FREE' : `$${evt.price}`}</span>
                <span class="price-lbl">${isFree ? 'Pass Included' : 'Per Ticket'}</span>
              </div>
              <button class="btn-book open-modal-btn" data-id="${evt.id}">
                <span>${isAdmin ? 'Admin View' : 'Book Ticket'}</span>
                <i data-lucide="arrow-right"></i>
              </button>
            </div>
          </div>
        </div>
      `;
    }).join('');

    if (window.lucide) window.lucide.createIcons();

    grid.querySelectorAll('.bookmark-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        if (!checkAuthGuard()) return;
        const id = btn.dataset.id;
        if (state.bookmarks.includes(id)) {
          state.bookmarks = state.bookmarks.filter(b => b !== id);
          showToast('Event removed from bookmarks', 'bookmark-minus');
        } else {
          state.bookmarks.push(id);
          showToast('Event saved to bookmarks!', 'bookmark-check');
        }
        saveState();
        updateBadgeCounts();
        renderEventsGrid();
      });
    });

    grid.querySelectorAll('.btn-admin-edit').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        if (checkAuthGuard('admin')) openEditModal(btn.dataset.id);
      });
    });

    grid.querySelectorAll('.btn-admin-delete').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        if (checkAuthGuard('admin')) deleteEvent(btn.dataset.id);
      });
    });

    grid.querySelectorAll('.open-modal-btn, .event-card').forEach(item => {
      item.addEventListener('click', (e) => {
        if (e.target.closest('.bookmark-btn') || e.target.closest('.admin-card-actions')) return;
        const id = item.dataset.id;
        openEventModal(id);
      });
    });
  }

  document.querySelectorAll('#categoryPills .pill-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('#categoryPills .pill-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      state.categoryFilter = btn.dataset.category;
      renderEventsGrid();
    });
  });

  document.querySelectorAll('.format-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.format-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      state.formatFilter = btn.dataset.format;
      renderEventsGrid();
    });
  });

  document.getElementById('sortSelect').addEventListener('change', (e) => {
    state.sortBy = e.target.value;
    renderEventsGrid();
  });

  const searchInput = document.getElementById('searchInput');
  searchInput.addEventListener('input', (e) => {
    state.searchQuery = e.target.value;
    renderEventsGrid();
  });

  document.querySelectorAll('.ai-tag-btn').forEach(tag => {
    tag.addEventListener('click', () => {
      searchInput.value = tag.dataset.query;
      state.searchQuery = tag.dataset.query;
      renderEventsGrid();
      showToast(`AI query filtered for "${tag.dataset.query}"`, 'sparkles');
    });
  });

  document.getElementById('aiSearchSubmitBtn').addEventListener('click', () => {
    state.searchQuery = searchInput.value;
    renderEventsGrid();
  });

  // ==========================================
  // EVENT DETAILS & BOOKING MODAL
  // ==========================================
  function openEventModal(eventId) {
    const evt = state.events.find(e => e.id === eventId);
    if (!evt) return;

    const modal = document.getElementById('eventModal');
    const content = document.getElementById('eventModalContent');
    const isAdmin = state.userSession && state.userSession.role === 'admin';

    content.innerHTML = `
      <div style="display: grid; grid-template-columns: 1.2fr 1fr; gap: 2rem;">
        <div>
          <span class="badge-category" style="position: static; display: inline-block; margin-bottom: 0.75rem;">${evt.category}</span>
          <h2 style="font-size: 1.75rem; margin-bottom: 0.75rem; line-height: 1.2;">${evt.title}</h2>
          
          <div style="display: flex; flex-direction: column; gap: 0.5rem; color: var(--text-secondary); font-size: 0.9rem; margin-bottom: 1.25rem;">
            <div><i data-lucide="calendar" style="color: var(--accent-violet);"></i> <strong>${evt.date}</strong></div>
            <div><i data-lucide="map-pin" style="color: var(--accent-cyan);"></i> <strong>${evt.location}</strong></div>
            <div><i data-lucide="users" style="color: var(--accent-emerald);"></i> <strong>${evt.attendees.toLocaleString()} Registered Attendees</strong></div>
          </div>

          <h4 style="margin-bottom: 0.5rem; font-size: 1rem;">About This Event</h4>
          <p style="color: var(--text-secondary); font-size: 0.9rem; line-height: 1.6; margin-bottom: 1.5rem;">${evt.description}</p>

          <h4 style="margin-bottom: 0.75rem; font-size: 1rem;">Keynote Speakers</h4>
          <div style="display: flex; flex-direction: column; gap: 0.75rem; margin-bottom: 1.5rem;">
            ${evt.speakers.map(s => `
              <div style="display: flex; align-items: center; gap: 0.75rem; background: rgba(255,255,255,0.03); border: 1px solid var(--border-light); padding: 0.6rem; border-radius: var(--radius-md);">
                <img src="${s.avatar}" alt="${s.name}" style="width: 42px; height: 42px; border-radius: 50%; object-fit: cover;" />
                <div>
                  <strong style="font-size: 0.9rem; display: block;">${s.name}</strong>
                  <span style="font-size: 0.75rem; color: var(--text-muted);">${s.role}</span>
                </div>
              </div>
            `).join('')}
          </div>
        </div>

        <div style="background: rgba(18, 24, 38, 0.9); border: 1px solid var(--border-glow); padding: 1.5rem; border-radius: var(--radius-lg);">
          <h3 style="font-size: 1.2rem; margin-bottom: 1rem; color: var(--text-primary);"><i data-lucide="ticket"></i> ${isAdmin ? 'Admin Controls' : 'Choose Pass Tier'}</h3>
          
          ${isAdmin ? `
            <div style="display: flex; flex-direction: column; gap: 1rem; margin-bottom: 1.5rem;">
              <button class="btn-secondary" id="modalEditBtn" style="justify-content: center;"><i data-lucide="edit-3"></i> Edit Event Metadata</button>
              <button class="btn-secondary" id="modalDeleteBtn" style="justify-content: center; border-color: rgba(239, 68, 68, 0.4); color: #EF4444;"><i data-lucide="trash-2"></i> Cancel / Delete Event</button>
            </div>
          ` : `
            <div class="tier-selector" style="display: flex; flex-direction: column; gap: 0.75rem; margin-bottom: 1.25rem;">
              <label class="tier-option active" style="display: flex; justify-content: space-between; padding: 0.85rem; border: 1px solid var(--accent-violet); border-radius: var(--radius-md); cursor: pointer; background: rgba(139, 92, 246, 0.15);">
                <div>
                  <strong style="display: block; font-size: 0.9rem;">VIP All-Access Pass</strong>
                  <span style="font-size: 0.75rem; color: var(--text-secondary);">Front-row seat, VR stream + Speaker Lounge</span>
                </div>
                <span style="font-weight: 800; color: var(--accent-cyan);">$${evt.price > 0 ? evt.price + 50 : 49}</span>
              </label>

              <label class="tier-option" style="display: flex; justify-content: space-between; padding: 0.85rem; border: 1px solid var(--border-light); border-radius: var(--radius-md); cursor: pointer;">
                <div>
                  <strong style="display: block; font-size: 0.9rem;">Standard Pass</strong>
                  <span style="font-size: 0.75rem; color: var(--text-secondary);">Main stage entry + digital materials</span>
                </div>
                <span style="font-weight: 800; color: var(--text-primary);">$${evt.price}</span>
              </label>
            </div>

            <div class="form-group" style="margin-bottom: 1.25rem;">
              <label>Attendee Full Name</label>
              <input type="text" id="modalAttendeeName" placeholder="Enter full name" value="${state.userSession ? state.userSession.name : ''}" required />
            </div>

            <div class="form-group" style="margin-bottom: 1.5rem;">
              <label>Quantity</label>
              <input type="number" id="modalQuantity" value="1" min="1" max="5" />
            </div>

            <button class="btn-primary-gradient" id="confirmCheckoutBtn" style="width: 100%; justify-content: center; padding: 0.85rem;">
              <i data-lucide="shield-check"></i>
              <span>Confirm & Issue Digital QR Pass</span>
            </button>
          `}
        </div>
      </div>
    `;

    modal.classList.add('active');
    if (window.lucide) window.lucide.createIcons();

    if (isAdmin) {
      document.getElementById('modalEditBtn').addEventListener('click', () => {
        modal.classList.remove('active');
        openEditModal(evt.id);
      });

      document.getElementById('modalDeleteBtn').addEventListener('click', () => {
        modal.classList.remove('active');
        deleteEvent(evt.id);
      });
    } else {
      document.getElementById('confirmCheckoutBtn').addEventListener('click', () => {
        if (!checkAuthGuard()) return;

        const name = document.getElementById('modalAttendeeName').value || state.userSession.name;
        const qty = parseInt(document.getElementById('modalQuantity').value) || 1;
        
        const newTicket = {
          ticketId: `EP-${Math.floor(10000 + Math.random() * 90000)}-VIP`,
          eventId: evt.id,
          eventTitle: evt.title,
          date: evt.date,
          location: evt.location,
          tier: 'VIP All-Access Pass',
          attendeeName: name,
          quantity: qty,
          pricePaid: (evt.price + 50) * qty
        };

        state.bookedTickets.unshift(newTicket);
        state.roster.unshift({
          name: name,
          email: state.userSession.email,
          eventTitle: evt.title,
          tier: 'VIP All-Access',
          ticketId: newTicket.ticketId,
          checkedIn: false,
          avatar: state.userSession.avatar
        });

        saveState();
        updateBadgeCounts();
        modal.classList.remove('active');

        showToast(`Pass issued for ${evt.title}!`, 'ticket');
        openTicketModal(newTicket);
      });
    }
  }

  document.getElementById('closeEventModalBtn').addEventListener('click', () => {
    document.getElementById('eventModal').classList.remove('active');
  });

  // ==========================================
  // DIGITAL QR PASS MODAL
  // ==========================================
  function openTicketModal(ticket) {
    const modal = document.getElementById('ticketModal');
    const content = document.getElementById('ticketModalContent');
    const qrSvg = generateSvgQrCode(ticket.ticketId, 110);

    content.innerHTML = `
      <div class="ticket-stub-card" style="margin: 0 auto; max-width: 440px;">
        <div class="stub-header">
          <div>
            <span class="brand-title" style="font-size: 1.1rem;"><i data-lucide="zap"></i> EventPulse AI</span>
            <span style="font-size: 0.7rem; opacity: 0.8; display: block;">Official Digital Event Pass</span>
          </div>
          <span class="stub-tier">${ticket.tier}</span>
        </div>

        <div class="stub-body">
          <h3 class="stub-title">${ticket.eventTitle}</h3>
          
          <div class="stub-detail">
            <i data-lucide="user" style="color: var(--accent-violet);"></i>
            <span>Attendee: <strong>${ticket.attendeeName}</strong></span>
          </div>
          <div class="stub-detail">
            <i data-lucide="calendar" style="color: var(--accent-cyan);"></i>
            <span>${ticket.date}</span>
          </div>
          <div class="stub-detail">
            <i data-lucide="map-pin" style="color: var(--accent-pink);"></i>
            <span>${ticket.location}</span>
          </div>

          <div class="stub-divider"></div>

          <div class="stub-qr-row">
            <div class="qr-box">
              ${qrSvg}
            </div>

            <div style="text-align: right;">
              <span class="stub-code" style="display: block; font-size: 0.85rem; font-weight: 800; margin-bottom: 0.25rem;">${ticket.ticketId}</span>
              <span style="font-size: 0.7rem; color: var(--accent-emerald); background: rgba(16,185,129,0.15); padding: 0.2rem 0.5rem; border-radius: var(--radius-pill); font-weight: 700;">VERIFIED PASS</span>
              <p style="font-size: 0.65rem; color: var(--text-muted); margin-top: 0.5rem;">Present QR code at gate scanner</p>
            </div>
          </div>
        </div>
      </div>

      <div style="display: flex; gap: 0.75rem; justify-content: center; margin-top: 1.5rem;">
        <button class="btn-secondary" id="downloadPassBtn">
          <i data-lucide="download"></i> Download Mobile Pass
        </button>
        <button class="btn-primary-gradient" id="goToMyPassesBtn">
          <i data-lucide="ticket"></i> View All My Passes
        </button>
      </div>
    `;

    modal.classList.add('active');
    if (window.lucide) window.lucide.createIcons();

    document.getElementById('downloadPassBtn').addEventListener('click', () => {
      showToast('Digital Pass downloaded to device wallet!', 'download');
    });

    document.getElementById('goToMyPassesBtn').addEventListener('click', () => {
      modal.classList.remove('active');
      switchTab('mypasses');
    });
  }

  document.getElementById('closeTicketModalBtn').addEventListener('click', () => {
    document.getElementById('ticketModal').classList.remove('active');
  });

  // ==========================================
  // LIVE HUB VIEW
  // ==========================================
  function renderLiveHub() {
    renderAgendaTimeline();
    renderQaFeed();
    renderPollCard();
  }

  function renderAgendaTimeline(trackFilter = 'all') {
    const list = document.getElementById('agendaList');
    let filtered = INITIAL_AGENDA;
    if (trackFilter !== 'all') {
      filtered = INITIAL_AGENDA.filter(a => a.track === trackFilter);
    }

    list.innerHTML = filtered.map(item => `
      <div class="agenda-item">
        <div class="agenda-time">
          ${item.time}
          ${item.isLive ? '<span class="pulse-chip" style="margin-left: 0.25rem; font-size: 0.55rem;">LIVE</span>' : ''}
        </div>
        <div class="agenda-info">
          <span class="agenda-track">${item.track}</span>
          <h4 class="agenda-title">${item.title}</h4>
          <span class="agenda-speaker"><i data-lucide="user"></i> ${item.speaker}</span>
        </div>
      </div>
    `).join('');

    if (window.lucide) window.lucide.createIcons();
  }

  document.querySelectorAll('.track-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.track-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      renderAgendaTimeline(btn.dataset.track);
    });
  });

  function renderQaFeed() {
    const feed = document.getElementById('qaFeed');
    feed.innerHTML = state.qaList.map(qa => `
      <div class="qa-card">
        <span class="qa-author">${qa.author}</span>
        <p class="qa-text">${qa.text}</p>
        <div class="qa-footer">
          <button class="btn-upvote ${qa.voted ? 'voted' : ''}" data-id="${qa.id}">
            <i data-lucide="thumbs-up"></i>
            <span>${qa.votes} Upvotes</span>
          </button>
        </div>
      </div>
    `).join('');

    if (window.lucide) window.lucide.createIcons();

    feed.querySelectorAll('.btn-upvote').forEach(btn => {
      btn.addEventListener('click', () => {
        if (!checkAuthGuard()) return;
        const qId = parseInt(btn.dataset.id);
        const item = state.qaList.find(q => q.id === qId);
        if (item) {
          item.voted ? (item.votes--, item.voted = false) : (item.votes++, item.voted = true);
          renderQaFeed();
        }
      });
    });
  }

  document.getElementById('sendQaBtn').addEventListener('click', () => {
    if (!checkAuthGuard()) return;

    const input = document.getElementById('qaInput');
    const text = input.value.trim();
    if (!text) return;

    state.qaList.unshift({
      id: Date.now(),
      author: state.userSession.name,
      text: text,
      votes: 1,
      voted: true
    });

    input.value = '';
    renderQaFeed();
    showToast('Question submitted to speaker queue!', 'send');
  });

  function renderPollCard() {
    const optionsContainer = document.getElementById('pollOptions');
    const totalVotesEl = document.getElementById('totalVotesCount');
    const totalVotes = state.poll.options.reduce((sum, opt) => sum + opt.votes, 0);

    totalVotesEl.textContent = `${totalVotes.toLocaleString()} votes cast`;

    optionsContainer.innerHTML = state.poll.options.map(opt => {
      const pct = totalVotes > 0 ? Math.round((opt.votes / totalVotes) * 100) : 0;
      const isSelected = state.poll.votedOption === opt.id;

      return `
        <button class="poll-opt-btn" data-id="${opt.id}">
          <div class="poll-fill" style="width: ${pct}%;"></div>
          <div class="poll-opt-content">
            <span>${isSelected ? '✓ ' : ''}${opt.text}</span>
            <span><strong>${pct}%</strong> (${opt.votes})</span>
          </div>
        </button>
      `;
    }).join('');

    optionsContainer.querySelectorAll('.poll-opt-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        if (!checkAuthGuard()) return;
        const optId = btn.dataset.id;
        if (state.poll.votedOption) return;

        state.poll.votedOption = optId;
        const target = state.poll.options.find(o => o.id === optId);
        if (target) target.votes++;

        renderPollCard();
        showToast('Vote cast successfully!', 'bar-chart-2');
      });
    });
  }

  document.querySelectorAll('.int-tab').forEach(tab => {
    tab.addEventListener('click', () => {
      document.querySelectorAll('.int-tab').forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      
      const target = tab.dataset.inttab;
      document.getElementById('qaPanel').classList.toggle('active', target === 'qa');
      document.getElementById('pollPanel').classList.toggle('active', target === 'poll');
    });
  });

  // ==========================================
  // MY PASSES VIEW
  // ==========================================
  function renderMyPasses() {
    const container = document.getElementById('passesContainer');
    
    if (state.passesSubtab === 'booked') {
      if (state.bookedTickets.length === 0) {
        container.innerHTML = `
          <div style="grid-column: 1/-1; text-align: center; padding: 4rem 1rem;">
            <i data-lucide="ticket" style="width: 48px; height: 48px; color: var(--text-muted); margin-bottom: 1rem;"></i>
            <h3>No Booked Passes Yet</h3>
            <p style="color: var(--text-muted); margin-top: 0.5rem;">Explore upcoming events and book your digital QR pass.</p>
          </div>
        `;
        if (window.lucide) window.lucide.createIcons();
        return;
      }

      container.innerHTML = state.bookedTickets.map(t => {
        const qrSvg = generateSvgQrCode(t.ticketId, 70);

        return `
          <div class="ticket-stub-card">
            <div class="stub-header">
              <span style="font-weight: 800; font-size: 0.9rem;">${t.eventTitle}</span>
              <span class="stub-tier">${t.tier}</span>
            </div>
            <div class="stub-body">
              <div class="stub-detail"><i data-lucide="user" style="color: var(--accent-violet);"></i> <span>${t.attendeeName}</span></div>
              <div class="stub-detail"><i data-lucide="calendar" style="color: var(--accent-cyan);"></i> <span>${t.date}</span></div>
              <div class="stub-detail"><i data-lucide="map-pin" style="color: var(--accent-pink);"></i> <span>${t.location}</span></div>
              
              <div class="stub-divider"></div>

              <div class="stub-qr-row">
                <div class="qr-box" style="width: 70px; height: 70px;">
                  ${qrSvg}
                </div>
                <div style="text-align: right;">
                  <span class="stub-code">${t.ticketId}</span>
                  <button class="btn-view-pass view-pass-btn" data-id="${t.ticketId}" style="margin-top: 0.5rem; display: block;">View Digital Pass</button>
                </div>
              </div>
            </div>
          </div>
        `;
      }).join('');

      container.querySelectorAll('.view-pass-btn').forEach(btn => {
        btn.addEventListener('click', () => {
          const ticket = state.bookedTickets.find(t => t.ticketId === btn.dataset.id);
          if (ticket) openTicketModal(ticket);
        });
      });

    } else {
      const savedEvents = state.events.filter(e => state.bookmarks.includes(e.id));
      if (savedEvents.length === 0) {
        container.innerHTML = `
          <div style="grid-column: 1/-1; text-align: center; padding: 4rem 1rem;">
            <i data-lucide="bookmark" style="width: 48px; height: 48px; color: var(--text-muted); margin-bottom: 1rem;"></i>
            <h3>No Bookmarked Events</h3>
            <p style="color: var(--text-muted); margin-top: 0.5rem;">Click the bookmark icon on any event card to save it here.</p>
          </div>
        `;
        if (window.lucide) window.lucide.createIcons();
        return;
      }

      container.innerHTML = savedEvents.map(evt => `
        <div class="event-card" data-id="${evt.id}">
          <div class="card-image-wrap">
            <img src="${evt.image}" alt="${evt.title}" />
            <span class="badge-category">${evt.category}</span>
          </div>
          <div class="card-body">
            <h3 class="card-title">${evt.title}</h3>
            <div class="card-date"><i data-lucide="calendar"></i> <span>${evt.date}</span></div>
            <button class="btn-book open-modal-btn" data-id="${evt.id}" style="margin-top: 1rem;">Book Ticket</button>
          </div>
        </div>
      `).join('');

      container.querySelectorAll('.open-modal-btn').forEach(btn => {
        btn.addEventListener('click', () => openEventModal(btn.dataset.id));
      });
    }

    if (window.lucide) window.lucide.createIcons();
  }

  document.getElementById('btnBookedPasses').addEventListener('click', () => {
    state.passesSubtab = 'booked';
    document.getElementById('btnBookedPasses').classList.add('active');
    document.getElementById('btnSavedEvents').classList.remove('active');
    renderMyPasses();
  });

  document.getElementById('btnSavedEvents').addEventListener('click', () => {
    state.passesSubtab = 'saved';
    document.getElementById('btnSavedEvents').classList.add('active');
    document.getElementById('btnBookedPasses').classList.remove('active');
    renderMyPasses();
  });

  function updateBadgeCounts() {
    document.getElementById('myPassesCount').textContent = state.bookedTickets.length;
    document.getElementById('passesCountBadge').textContent = state.bookedTickets.length;
    document.getElementById('bookmarksCountBadge').textContent = state.bookmarks.length;
  }

  // ==========================================
  // ADMIN DASHBOARD
  // ==========================================
  function renderDashboard() {
    document.getElementById('kpiActiveEvents').textContent = `${state.events.length} Events`;
    renderBarChart();
    renderDonutChart();
    renderRosterTable();
  }

  function renderBarChart() {
    const container = document.getElementById('barChartContainer');
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'];
    const sales = [120, 180, 240, 310, 280, 420, 390, 540];
    const max = Math.max(...sales);

    const svgWidth = 500;
    const svgHeight = 220;
    const barWidth = 34;

    const bars = sales.map((val, idx) => {
      const height = (val / max) * 150;
      const x = 30 + idx * (svgWidth / months.length);
      const y = svgHeight - 30 - height;

      return `
        <rect x="${x}" y="${y}" width="${barWidth}" height="${height}" fill="url(#barGrad)" rx="6" />
        <text x="${x + barWidth / 2}" y="${y - 8}" fill="#F8FAFC" font-size="11" font-weight="700" text-anchor="middle">${val}</text>
        <text x="${x + barWidth / 2}" y="${svgHeight - 10}" fill="#64748B" font-size="11" text-anchor="middle">${months[idx]}</text>
      `;
    }).join('');

    container.innerHTML = `
      <svg width="100%" height="100%" viewBox="0 0 ${svgWidth} ${svgHeight}" preserveAspectRatio="xMidYMid meet">
        <defs>
          <linearGradient id="barGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="#8B5CF6" />
            <stop offset="100%" stop-color="#06B6D4" />
          </linearGradient>
        </defs>
        ${bars}
      </svg>
    `;
  }

  function renderDonutChart() {
    const container = document.getElementById('donutChartContainer');
    container.innerHTML = `
      <svg width="220" height="220" viewBox="0 0 220 220">
        <circle cx="110" cy="110" r="75" fill="none" stroke="#101522" stroke-width="24" />
        <circle cx="110" cy="110" r="75" fill="none" stroke="#8B5CF6" stroke-width="24" stroke-dasharray="210 260" stroke-dashoffset="0" />
        <circle cx="110" cy="110" r="75" fill="none" stroke="#06B6D4" stroke-width="24" stroke-dasharray="140 330" stroke-dashoffset="-210" />
        <circle cx="110" cy="110" r="75" fill="none" stroke="#EC4899" stroke-width="24" stroke-dasharray="110 360" stroke-dashoffset="-350" />
        <text x="110" y="105" fill="#F8FAFC" font-size="22" font-weight="800" text-anchor="middle">1,845</text>
        <text x="110" y="125" fill="#64748B" font-size="11" text-anchor="middle">Total Attendees</text>
      </svg>
    `;
  }

  function renderRosterTable(query = '') {
    const tbody = document.getElementById('rosterTableBody');
    const filtered = state.roster.filter(r => {
      const q = query.toLowerCase();
      return !q || r.name.toLowerCase().includes(q) || r.ticketId.toLowerCase().includes(q) || r.eventTitle.toLowerCase().includes(q);
    });

    tbody.innerHTML = filtered.map(r => `
      <tr>
        <td>
          <div class="attendee-cell">
            <img src="${r.avatar}" alt="${r.name}" class="attendee-avatar" />
            <div>
              <strong style="display: block;">${r.name}</strong>
              <span style="font-size: 0.75rem; color: var(--text-muted);">${r.email}</span>
            </div>
          </div>
        </td>
        <td>${r.eventTitle}</td>
        <td><span style="font-weight: 700; color: var(--accent-violet);">${r.tier}</span></td>
        <td><code style="font-family: var(--font-mono); color: var(--accent-cyan);">${r.ticketId}</code></td>
        <td>
          <span class="status-badge ${r.checkedIn ? 'status-checked' : 'status-pending'}">
            <i data-lucide="${r.checkedIn ? 'check-circle-2' : 'clock'}"></i>
            ${r.checkedIn ? 'Checked-In' : 'Pending Gate'}
          </span>
        </td>
        <td>
          <button class="btn-toggle-status" data-id="${r.ticketId}">
            ${r.checkedIn ? 'Mark Pending' : 'Check In'}
          </button>
        </td>
      </tr>
    `).join('');

    if (window.lucide) window.lucide.createIcons();

    tbody.querySelectorAll('.btn-toggle-status').forEach(btn => {
      btn.addEventListener('click', () => {
        if (!checkAuthGuard('admin')) return;
        const item = state.roster.find(r => r.ticketId === btn.dataset.id);
        if (item) {
          item.checkedIn = !item.checkedIn;
          renderRosterTable(query);
          showToast(`Status updated for ${item.name}`, 'user-check');
        }
      });
    });
  }

  document.getElementById('rosterSearchInput').addEventListener('input', (e) => {
    renderRosterTable(e.target.value);
  });

  document.getElementById('exportDataBtn').addEventListener('click', () => {
    if (!checkAuthGuard('admin')) return;
    showToast('Platform analytics & attendee roster exported (CSV format)', 'download');
  });

  // ==========================================
  // ADMIN EVENT EDIT & DELETE
  // ==========================================
  const editModal = document.getElementById('editEventModal');
  const closeEditBtn = document.getElementById('closeEditModalBtn');
  const cancelEditBtn = document.getElementById('cancelEditBtn');

  function openEditModal(eventId) {
    if (!checkAuthGuard('admin')) return;
    const evt = state.events.find(e => e.id === eventId);
    if (!evt) return;

    document.getElementById('editEventId').value = evt.id;
    document.getElementById('editEventTitle').value = evt.title;
    document.getElementById('editEventCategory').value = evt.category;
    document.getElementById('editEventFormat').value = evt.format;
    document.getElementById('editEventDate').value = evt.date;
    document.getElementById('editEventPrice').value = evt.price;
    document.getElementById('editEventLocation').value = evt.location;
    document.getElementById('editEventDesc').value = evt.description || '';

    editModal.classList.add('active');
  }

  function closeEditModal() {
    editModal.classList.remove('active');
  }

  closeEditBtn.addEventListener('click', closeEditModal);
  cancelEditBtn.addEventListener('click', closeEditModal);

  document.getElementById('editEventForm').addEventListener('submit', (e) => {
    e.preventDefault();
    if (!checkAuthGuard('admin')) return;

    const id = document.getElementById('editEventId').value;
    const evt = state.events.find(e => e.id === id);

    if (evt) {
      evt.title = document.getElementById('editEventTitle').value;
      evt.category = document.getElementById('editEventCategory').value;
      evt.format = document.getElementById('editEventFormat').value;
      evt.date = document.getElementById('editEventDate').value;
      evt.price = parseFloat(document.getElementById('editEventPrice').value) || 0;
      evt.location = document.getElementById('editEventLocation').value;
      evt.description = document.getElementById('editEventDesc').value;

      saveState();
      closeEditModal();
      renderEventsGrid();
      if (state.activeTab === 'dashboard') renderDashboard();
      showToast(`Event "${evt.title}" updated successfully!`, 'save');
    }
  });

  function deleteEvent(eventId) {
    if (!checkAuthGuard('admin')) return;
    const evt = state.events.find(e => e.id === eventId);
    if (!evt) return;

    if (confirm(`Are you sure you want to cancel and delete "${evt.title}" from the platform?`)) {
      state.events = state.events.filter(e => e.id !== eventId);
      saveState();
      renderEventsGrid();
      if (state.activeTab === 'dashboard') renderDashboard();
      showToast(`Event "${evt.title}" deleted`, 'trash-2');
    }
  }

  // ==========================================
  // HOST / CREATE EVENT MODAL
  // ==========================================
  const createModal = document.getElementById('createEventModal');
  const createBtn = document.getElementById('createEventBtn');
  const dashCreateBtn = document.getElementById('dashCreateEventBtn');
  const closeCreateBtn = document.getElementById('closeCreateModalBtn');
  const cancelCreateBtn = document.getElementById('cancelCreateBtn');

  function openCreateModal() {
    if (!checkAuthGuard('admin')) return;
    createModal.classList.add('active');
  }

  function closeCreateModal() {
    createModal.classList.remove('active');
  }

  createBtn.addEventListener('click', openCreateModal);
  dashCreateBtn.addEventListener('click', openCreateModal);
  closeCreateBtn.addEventListener('click', closeCreateModal);
  cancelCreateBtn.addEventListener('click', closeCreateModal);

  document.getElementById('createEventForm').addEventListener('submit', (e) => {
    e.preventDefault();
    if (!checkAuthGuard('admin')) return;

    const title = document.getElementById('newEventTitle').value;
    const category = document.getElementById('newEventCategory').value;
    const format = document.getElementById('newEventFormat').value;
    const date = document.getElementById('newEventDate').value;
    const price = parseFloat(document.getElementById('newEventPrice').value) || 0;
    const location = document.getElementById('newEventLocation').value;
    const desc = document.getElementById('newEventDesc').value || 'An exciting new event published on EventPulse AI.';

    const newEvt = {
      id: `evt-${Date.now()}`,
      title,
      category,
      format,
      date,
      location,
      price,
      image: 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=800&auto=format&fit=crop&q=80',
      rating: 5.0,
      attendees: 1,
      speakers: [
        { name: `${state.userSession.name} (Host)`, role: 'Event Organizer', avatar: state.userSession.avatar }
      ],
      description: desc
    };

    state.events.unshift(newEvt);
    saveState();
    closeCreateModal();

    switchTab('discover');
    showToast(`Event "${title}" published successfully!`, 'sparkles');
  });

  // Initial UI Render
  updateBadgeCounts();
  updateAuthUI();
});
