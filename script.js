// Top Links Web Page - Interactive JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Initialize the page
    initializePage();
    
    // Add click tracking for analytics
    setupClickTracking();
    
    // Add keyboard navigation
    setupKeyboardNavigation();
    
    // Add search functionality
    setupSearch();
    
    // Add theme toggle
    setupThemeToggle();
});

function initializePage() {
    // Add loading animation to stats
    const statNumbers = document.querySelectorAll('.stat-number');
    statNumbers.forEach((stat, index) => {
        setTimeout(() => {
            stat.classList.add('loading');
            // Simulate loading data
            setTimeout(() => {
                stat.classList.remove('loading');
                // Generate random stats for demonstration
                const randomValue = Math.floor(Math.random() * 100) + 1;
                stat.textContent = randomValue;
            }, 500 + (index * 200));
        }, 1000 + (index * 300));
    });
    
    // Add entrance animation to cards
    const cards = document.querySelectorAll('.link-card');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });
    
    cards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'all 0.6s ease-out';
        observer.observe(card);
    });
}

function setupClickTracking() {
    const linkCards = document.querySelectorAll('.link-card');
    
    linkCards.forEach(card => {
        card.addEventListener('click', function(e) {
            // Add click effect
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
            
            // Track click (you can integrate with analytics here)
            const platform = this.querySelector('h3').textContent;
            console.log(`Clicked on ${platform}`);
            
            // Add to local storage for visit tracking
            const visits = JSON.parse(localStorage.getItem('linkVisits') || '{}');
            visits[platform] = (visits[platform] || 0) + 1;
            localStorage.setItem('linkVisits', JSON.stringify(visits));
            
            // Update visit count display
            updateVisitCount(platform);
        });
    });
}

function updateVisitCount(platform) {
    const visits = JSON.parse(localStorage.getItem('linkVisits') || '{}');
    const card = Array.from(document.querySelectorAll('.link-card')).find(card => 
        card.querySelector('h3').textContent === platform
    );
    
    if (card) {
        const visitStat = card.querySelector('.stat:first-child .stat-number');
        if (visitStat) {
            visitStat.textContent = visits[platform];
        }
    }
}

function setupKeyboardNavigation() {
    const linkCards = document.querySelectorAll('.link-card');
    
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Tab') {
            // Add focus styles
            linkCards.forEach(card => {
                card.addEventListener('focus', function() {
                    this.style.outline = '3px solid #667eea';
                    this.style.outlineOffset = '2px';
                });
                
                card.addEventListener('blur', function() {
                    this.style.outline = 'none';
                });
            });
        }
    });
}

function setupSearch() {
    // Create search input
    const searchContainer = document.createElement('div');
    searchContainer.className = 'search-container';
    searchContainer.innerHTML = `
        <div class="search-box">
            <i class="fas fa-search search-icon"></i>
            <input type="text" placeholder="Search links..." class="search-input">
            <button class="search-clear" style="display: none;">
                <i class="fas fa-times"></i>
            </button>
        </div>
    `;
    
    // Insert search after header
    const header = document.querySelector('.header');
    header.parentNode.insertBefore(searchContainer, header.nextSibling);
    
    const searchInput = searchContainer.querySelector('.search-input');
    const searchClear = searchContainer.querySelector('.search-clear');
    const linkCards = document.querySelectorAll('.link-card');
    
    // Search functionality
    searchInput.addEventListener('input', function() {
        const query = this.value.toLowerCase().trim();
        
        linkCards.forEach(card => {
            const title = card.querySelector('h3').textContent.toLowerCase();
            const description = card.querySelector('p').textContent.toLowerCase();
            
            if (title.includes(query) || description.includes(query)) {
                card.style.display = 'flex';
                card.style.animation = 'slideInUp 0.3s ease-out';
            } else {
                card.style.display = 'none';
            }
        });
        
        // Show/hide clear button
        searchClear.style.display = query ? 'block' : 'none';
    });
    
    // Clear search
    searchClear.addEventListener('click', function() {
        searchInput.value = '';
        searchInput.focus();
        linkCards.forEach(card => {
            card.style.display = 'flex';
        });
        this.style.display = 'none';
    });
    
    // Add search styles
    addSearchStyles();
}

function addSearchStyles() {
    const style = document.createElement('style');
    style.textContent = `
        .search-container {
            text-align: center;
            margin-bottom: 40px;
            animation: fadeInUp 1s ease-out 0.6s both;
        }
        
        .search-box {
            position: relative;
            display: inline-flex;
            align-items: center;
            background: rgba(255, 255, 255, 0.95);
            border-radius: 50px;
            padding: 12px 20px;
            box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
            backdrop-filter: blur(10px);
            border: 1px solid rgba(255, 255, 255, 0.2);
            max-width: 400px;
            width: 100%;
        }
        
        .search-icon {
            color: #a0aec0;
            margin-right: 12px;
            font-size: 16px;
        }
        
        .search-input {
            border: none;
            background: transparent;
            outline: none;
            font-size: 16px;
            color: #2d3748;
            flex: 1;
            font-family: inherit;
        }
        
        .search-input::placeholder {
            color: #a0aec0;
        }
        
        .search-clear {
            background: none;
            border: none;
            color: #a0aec0;
            cursor: pointer;
            padding: 4px;
            border-radius: 50%;
            transition: all 0.2s ease;
            margin-left: 8px;
        }
        
        .search-clear:hover {
            background: rgba(160, 174, 192, 0.1);
            color: #4a5568;
        }
        
        @media (max-width: 768px) {
            .search-container {
                margin-bottom: 30px;
            }
            
            .search-box {
                max-width: 300px;
                padding: 10px 16px;
            }
        }
    `;
    document.head.appendChild(style);
}

function setupThemeToggle() {
    // Create theme toggle button
    const themeToggle = document.createElement('button');
    themeToggle.className = 'theme-toggle';
    themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
    themeToggle.title = 'Toggle theme';
    
    // Insert theme toggle in header
    const header = document.querySelector('.header');
    header.appendChild(themeToggle);
    
    // Theme toggle functionality
    themeToggle.addEventListener('click', function() {
        document.body.classList.toggle('dark-theme');
        const isDark = document.body.classList.contains('dark-theme');
        
        // Update icon
        this.innerHTML = isDark ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
        this.title = isDark ? 'Switch to light theme' : 'Switch to dark theme';
        
        // Save preference
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
    });
    
    // Load saved theme preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark' || (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
        document.body.classList.add('dark-theme');
        themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
        themeToggle.title = 'Switch to light theme';
    }
    
    // Add theme toggle styles
    addThemeToggleStyles();
}

function addThemeToggleStyles() {
    const style = document.createElement('style');
    style.textContent = `
        .theme-toggle {
            position: absolute;
            top: 20px;
            right: 20px;
            background: rgba(255, 255, 255, 0.2);
            border: 1px solid rgba(255, 255, 255, 0.3);
            color: white;
            border-radius: 50%;
            width: 50px;
            height: 50px;
            cursor: pointer;
            transition: all 0.3s ease;
            backdrop-filter: blur(10px);
            font-size: 18px;
        }
        
        .theme-toggle:hover {
            background: rgba(255, 255, 255, 0.3);
            transform: scale(1.1);
        }
        
        .dark-theme {
            background: linear-gradient(135deg, #1a202c 0%, #2d3748 100%);
        }
        
        .dark-theme .link-card {
            background: rgba(45, 55, 72, 0.95);
            color: #e2e8f0;
            border-color: rgba(255, 255, 255, 0.1);
        }
        
        .dark-theme .card-content h3 {
            color: #e2e8f0;
        }
        
        .dark-theme .card-content p {
            color: #a0aec0;
        }
        
        .dark-theme .stat-number {
            color: #e2e8f0;
        }
        
        .dark-theme .card-arrow {
            color: #a0aec0;
        }
        
        .dark-theme .link-card:hover .card-arrow {
            color: #e2e8f0;
        }
        
        .dark-theme .search-box {
            background: rgba(45, 55, 72, 0.95);
            border-color: rgba(255, 255, 255, 0.1);
        }
        
        .dark-theme .search-input {
            color: #e2e8f0;
        }
        
        .dark-theme .search-input::placeholder {
            color: #718096;
        }
        
        @media (max-width: 768px) {
            .theme-toggle {
                top: 15px;
                right: 15px;
                width: 45px;
                height: 45px;
                font-size: 16px;
            }
        }
    `;
    document.head.appendChild(style);
}

// Add some additional interactive features
function addExtraFeatures() {
    // Add visit counter to page title
    let visitCount = localStorage.getItem('pageVisits') || 0;
    visitCount = parseInt(visitCount) + 1;
    localStorage.setItem('pageVisits', visitCount);
    
    // Add welcome message for returning visitors
    if (visitCount > 1) {
        const welcomeMsg = document.createElement('div');
        welcomeMsg.className = 'welcome-message';
        welcomeMsg.innerHTML = `Welcome back! This is your ${visitCount}${visitCount === 2 ? 'nd' : visitCount === 3 ? 'rd' : 'th'} visit.`;
        
        const header = document.querySelector('.header');
        header.appendChild(welcomeMsg);
        
        // Add welcome message styles
        const style = document.createElement('style');
        style.textContent = `
            .welcome-message {
                background: rgba(255, 255, 255, 0.2);
                color: white;
                padding: 8px 16px;
                border-radius: 20px;
                font-size: 0.9rem;
                margin-top: 16px;
                backdrop-filter: blur(10px);
                border: 1px solid rgba(255, 255, 255, 0.3);
                animation: fadeInUp 1s ease-out 0.9s both;
            }
        `;
        document.head.appendChild(style);
    }
}

// Initialize extra features
setTimeout(addExtraFeatures, 2000);