// Admin logic

// Auth Check
if (!localStorage.getItem('adminLoggedIn') && !window.location.href.includes('admin-login.html')) {
    window.location.href = 'admin-login.html';
}

document.addEventListener('DOMContentLoaded', () => {
    // Login Handling
    const loginForm = document.getElementById('admin-login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const username = loginForm.username.value;
            const password = loginForm.password.value;
            
            // Hardcoded credentials for demo as requested (simple username/password)
            if (username === 'admin' && password === 'admin') {
                localStorage.setItem('adminLoggedIn', 'true');
                window.location.href = 'admin-dashboard.html';
            } else {
                alert('Invalid credentials (try admin/admin)');
            }
        });
    }

    // Dashboard Logic
    if (window.location.href.includes('admin-dashboard.html')) {
        renderDashboard();
    }
});

function logout() {
    localStorage.removeItem('adminLoggedIn');
    window.location.href = 'admin-login.html';
}

function renderDashboard() {
    loadAdminNews();
    loadAdminEvents();
    loadAdminStaff();
    loadAdminGallery();
    
    // Add event listeners for forms
    const newsForm = document.getElementById('add-news-form');
    if(newsForm) newsForm.addEventListener('submit', addNews);

    const eventForm = document.getElementById('add-event-form');
    if(eventForm) eventForm.addEventListener('submit', addEvent);

    const staffForm = document.getElementById('add-staff-form');
    if(staffForm) staffForm.addEventListener('submit', addStaff);

    const galleryForm = document.getElementById('add-gallery-form');
    if(galleryForm) galleryForm.addEventListener('submit', addGallery);
}

// News Management
function loadAdminNews() {
    const list = document.getElementById('admin-news-list');
    if (!list) return;
    const news = JSON.parse(localStorage.getItem('newsData') || '[]');
    list.innerHTML = news.map((item, index) => `
        <div class="admin-item">
            <div>
                <strong>${item.title}</strong> (${item.date})
            </div>
            <button onclick="deleteNews(${index})">Delete</button>
        </div>
    `).join('');
}

function addNews(e) {
    e.preventDefault();
    const form = e.target;
    const newItem = {
        title: form.title.value,
        date: form.date.value,
        summary: form.summary.value,
        content: form.content.value
    };
    
    const news = JSON.parse(localStorage.getItem('newsData') || '[]');
    news.push(newItem);
    localStorage.setItem('newsData', JSON.stringify(news));
    form.reset();
    loadAdminNews();
}

window.deleteNews = function(index) {
    if(!confirm('Are you sure?')) return;
    const news = JSON.parse(localStorage.getItem('newsData') || '[]');
    news.splice(index, 1);
    localStorage.setItem('newsData', JSON.stringify(news));
    loadAdminNews();
}

// Events Management
function loadAdminEvents() {
    const list = document.getElementById('admin-events-list');
    if (!list) return;
    const events = JSON.parse(localStorage.getItem('eventsData') || '[]');
    list.innerHTML = events.map((item, index) => `
        <div class="admin-item">
            <div>
                <strong>${item.title}</strong> (${item.date}) - ${item.location}
            </div>
            <button onclick="deleteEvent(${index})">Delete</button>
        </div>
    `).join('');
}

function addEvent(e) {
    e.preventDefault();
    const form = e.target;
    const newItem = {
        title: form.title.value,
        date: form.date.value,
        location: form.location.value
    };
    
    const events = JSON.parse(localStorage.getItem('eventsData') || '[]');
    events.push(newItem);
    localStorage.setItem('eventsData', JSON.stringify(events));
    form.reset();
    loadAdminEvents();
}

window.deleteEvent = function(index) {
    if(!confirm('Are you sure?')) return;
    const events = JSON.parse(localStorage.getItem('eventsData') || '[]');
    events.splice(index, 1);
    localStorage.setItem('eventsData', JSON.stringify(events));
    loadAdminEvents();
}

// Staff Management
function loadAdminStaff() {
    const list = document.getElementById('admin-staff-list');
    if (!list) return;
    const staff = JSON.parse(localStorage.getItem('staffData') || '[]');
    list.innerHTML = staff.map((item, index) => `
        <div class="admin-item">
            <div>
                <strong>${item.name}</strong> - ${item.role}
            </div>
            <button onclick="deleteStaff(${index})">Delete</button>
        </div>
    `).join('');
}

function addStaff(e) {
    e.preventDefault();
    const form = e.target;
    const newItem = {
        name: form.name.value,
        role: form.role.value
    };
    
    const staff = JSON.parse(localStorage.getItem('staffData') || '[]');
    staff.push(newItem);
    localStorage.setItem('staffData', JSON.stringify(staff));
    form.reset();
    loadAdminStaff();
}

window.deleteStaff = function(index) {
    if(!confirm('Are you sure?')) return;
    const staff = JSON.parse(localStorage.getItem('staffData') || '[]');
    staff.splice(index, 1);
    localStorage.setItem('staffData', JSON.stringify(staff));
    loadAdminStaff();
}

// Gallery Management
function loadAdminGallery() {
    const list = document.getElementById('admin-gallery-list');
    if (!list) return;
    const gallery = JSON.parse(localStorage.getItem('galleryData') || '[]');
    list.innerHTML = gallery.map((item, index) => `
        <div class="admin-item">
            <div style="display: flex; align-items: center; gap: 10px;">
                <img src="${item.image}" style="width: 50px; height: 50px; object-fit: cover;">
                <div>
                    <strong>${item.title}</strong> (${item.category})
                </div>
            </div>
            <button onclick="deleteGallery(${index})">Delete</button>
        </div>
    `).join('');
}

function addGallery(e) {
    e.preventDefault();
    const form = e.target;
    const newItem = {
        title: form.title.value,
        category: form.category.value,
        image: form.image.value
    };
    
    const gallery = JSON.parse(localStorage.getItem('galleryData') || '[]');
    gallery.push(newItem);
    localStorage.setItem('galleryData', JSON.stringify(gallery));
    form.reset();
    loadAdminGallery();
}

window.deleteGallery = function(index) {
    if(!confirm('Are you sure?')) return;
    const gallery = JSON.parse(localStorage.getItem('galleryData') || '[]');
    gallery.splice(index, 1);
    localStorage.setItem('galleryData', JSON.stringify(gallery));
    loadAdminGallery();
}
