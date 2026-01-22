// Global scripts for public pages

document.addEventListener('DOMContentLoaded', () => {
    // Mobile Menu Toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const navUl = document.querySelector('nav ul');
    
    if(menuToggle && navUl) {
        menuToggle.addEventListener('click', () => {
            navUl.classList.toggle('active');
        });
    }

    // Load Dynamic Content
    loadNewsPreview();
    loadEventsPreview();
    
    // Contact Form Handler
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const formData = new FormData(contactForm);
            const data = Object.fromEntries(formData);
            
            // Save to LocalStorage (mock sending)
            const messages = JSON.parse(localStorage.getItem('messages') || '[]');
            messages.push({ ...data, date: new Date().toISOString() });
            localStorage.setItem('messages', JSON.stringify(messages));
            
            alert('Message sent successfully!');
            contactForm.reset();
        });
    }
});

function loadNewsPreview() {
    const newsContainer = document.getElementById('latest-news-preview');
    if (!newsContainer) return;

    // Default data if empty
    let news = JSON.parse(localStorage.getItem('newsData') || '[]');
    if (news.length === 0) {
        news = [
            { 
                title: 'School Wins Science Fair', 
                date: '2025-05-15', 
                summary: 'Our students took home the gold medal in the regional science competition...',
                image: 'https://images.unsplash.com/photo-1564066399954-463222d91721?auto=format&fit=crop&q=80&w=800'
            },
            { 
                title: 'New Library Opening', 
                date: '2025-04-20', 
                summary: 'We are excited to announce the opening of our state-of-the-art library facility...',
                image: 'https://images.unsplash.com/photo-1521587760476-6c12a4b040da?auto=format&fit=crop&q=80&w=800'
            },
            {
                title: 'Annual Sports Day Results',
                date: '2025-05-01',
                summary: 'An incredible day of competition and sportsmanship as houses battled for the trophy...',
                image: 'https://images.unsplash.com/photo-1576489922094-2cfe89fb1733?auto=format&fit=crop&q=80&w=800'
            }
        ];
        localStorage.setItem('newsData', JSON.stringify(news));
    }

    // Sort by date desc
    const latestNews = news.sort((a, b) => new Date(b.date) - new Date(a.date)).slice(0, 3);

    if (latestNews.length === 0) {
        newsContainer.innerHTML = '<p>No news yet.</p>';
        return;
    }

    newsContainer.innerHTML = latestNews.map(item => `
        <div class="card">
            ${item.image ? `<img src="${item.image}" alt="${item.title}" onerror="this.parentElement.innerHTML = '<div class=\\'img-placeholder\\'></div>' + this.parentElement.innerHTML; this.remove();">` : '<div class="img-placeholder"></div>'}
            <p class="date">${new Date(item.date).toLocaleDateString()}</p>
            <h3>${item.title}</h3>
            <p>${item.summary || (item.content ? item.content.substring(0, 100) : '')}...</p>
            <a href="news.html" class="btn">Read More</a>
        </div>
    `).join('');
}

function loadEventsPreview() {
    const eventsContainer = document.getElementById('upcoming-events-preview');
    if (!eventsContainer) return;

    let events = JSON.parse(localStorage.getItem('eventsData') || '[]');
    if (events.length === 0) {
        events = [
            { title: 'Summer Sports Day', date: '2025-06-10', location: 'Main Field' },
            { title: 'Parent Teacher Conference', date: '2025-05-25', location: 'Main Hall' }
        ];
        localStorage.setItem('eventsData', JSON.stringify(events));
    }

    // Sort by date asc, filter future
    const upcoming = events
        //.filter(e => new Date(e.date) >= new Date()) // Show all for demo
        .sort((a, b) => new Date(a.date) - new Date(b.date))
        .slice(0, 3);

    if (upcoming.length === 0) {
        eventsContainer.innerHTML = '<p>No upcoming events.</p>';
        return;
    }

    eventsContainer.innerHTML = upcoming.map(item => `
        <div class="card">
            <div class="event-date">
                <strong>${new Date(item.date).toLocaleDateString()}</strong>
            </div>
            <h3>${item.title}</h3>
            <p>${item.location || 'School Hall'}</p>
        </div>
    `).join('');
}
