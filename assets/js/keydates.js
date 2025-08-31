// Key Dates page functionality
async function initKeyDates() {
    try {
        const res = await fetch('assets/data/keydates.json');
        const keyDatesData = await res.json();

        // Load all sections
        loadConferenceTimeline(keyDatesData.timeline);
        loadRegistrationDeadlines(keyDatesData.registration);
        loadPaperSubmissionTimeline(keyDatesData.submission);
        loadConferenceSchedule(keyDatesData.schedule);
        loadImportantNotices(keyDatesData.notices);

        // Update hero stats
        updateHeroStats(keyDatesData.stats);

    } catch (error) {
        console.error('Error loading key dates data:', error);
        showErrorMessage();
    }
}

function loadConferenceTimeline(timeline) {
    const container = document.getElementById('conference-timeline');
    if (!container) return;

    const timelineHTML = timeline.map((item, index) => `
        <div class="timeline-item ${item.status}" data-date="${item.date}">
            <div class="timeline-marker">
                <div class="timeline-dot"></div>
                <div class="timeline-line"></div>
            </div>
            <div class="timeline-content">
                <div class="timeline-date">${formatDate(item.date)}</div>
                <h3 class="timeline-title">${item.title}</h3>
                <p class="timeline-description">${item.description}</p>
                ${item.details ? `<div class="timeline-details">${item.details}</div>` : ''}
                <div class="timeline-status ${item.status}">
                    <span class="status-badge">${getStatusText(item.status)}</span>
                </div>
            </div>
        </div>
    `).join('');

    container.innerHTML = timelineHTML;
}

function loadRegistrationDeadlines(registration) {
    const container = document.getElementById('registration-deadlines');
    if (!container) return;

    const deadlinesHTML = registration.map(deadline => `
        <div class="deadline-card ${deadline.status}">
            <div class="deadline-header">
                <h3>${deadline.title}</h3>
                <div class="deadline-price">${deadline.price}</div>
            </div>
            <div class="deadline-date">
                <strong>Deadline:</strong> ${formatDate(deadline.date)}
            </div>
            <div class="deadline-description">${deadline.description}</div>
            <div class="deadline-benefits">
                <h4>Benefits:</h4>
                <ul>
                    ${deadline.benefits.map(benefit => `<li>${benefit}</li>`).join('')}
                </ul>
            </div>
            <div class="deadline-status ${deadline.status}">
                <span class="status-badge">${getStatusText(deadline.status)}</span>
            </div>
        </div>
    `).join('');

    container.innerHTML = deadlinesHTML;
}

function loadPaperSubmissionTimeline(submission) {
    const container = document.getElementById('paper-submission-timeline');
    if (!container) return;

    const submissionHTML = submission.map((item, index) => `
        <div class="submission-item ${item.status}">
            <div class="submission-step">
                <div class="step-number">${index + 1}</div>
                <div class="step-connector"></div>
            </div>
            <div class="submission-content">
                <div class="submission-date">${formatDate(item.date)}</div>
                <h3 class="submission-title">${item.title}</h3>
                <p class="submission-description">${item.description}</p>
                ${item.requirements ? `
                    <div class="submission-requirements">
                        <h4>Requirements:</h4>
                        <ul>
                            ${item.requirements.map(req => `<li>${req}</li>`).join('')}
                        </ul>
                    </div>
                ` : ''}
                <div class="submission-status ${item.status}">
                    <span class="status-badge">${getStatusText(item.status)}</span>
                </div>
            </div>
        </div>
    `).join('');

    container.innerHTML = submissionHTML;
}

function loadConferenceSchedule(schedule) {
    const container = document.getElementById('conference-schedule');
    if (!container) return;

    const scheduleHTML = schedule.map(day => `
        <div class="schedule-day">
            <div class="day-header">
                <h3>${day.date}</h3>
                <span class="day-theme">${day.theme}</span>
            </div>
            <div class="day-events">
                ${day.events.map(event => `
                    <div class="schedule-event">
                        <div class="event-time">${event.time}</div>
                        <div class="event-details">
                            <h4 class="event-title">${event.title}</h4>
                            <p class="event-description">${event.description}</p>
                            ${event.speaker ? `<div class="event-speaker">Speaker: ${event.speaker}</div>` : ''}
                        </div>
                    </div>
                `).join('')}
            </div>
        </div>
    `).join('');

    container.innerHTML = scheduleHTML;
}

function loadImportantNotices(notices) {
    const container = document.getElementById('important-notices');
    if (!container) return;

    const noticesHTML = notices.map(notice => `
        <div class="notice-card ${notice.priority}">
            <div class="notice-header">
                <div class="notice-icon">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <circle cx="12" cy="12" r="10"></circle>
                        <line x1="12" y1="8" x2="12" y2="12"></line>
                        <line x1="12" y1="16" x2="12.01" y2="16"></line>
                    </svg>
                </div>
                <h3 class="notice-title">${notice.title}</h3>
            </div>
            <p class="notice-content">${notice.content}</p>
            <div class="notice-meta">
                <span class="notice-date">${formatDate(notice.date)}</span>
                <span class="notice-priority ${notice.priority}">${getPriorityText(notice.priority)}</span>
            </div>
        </div>
    `).join('');

    container.innerHTML = noticesHTML;
}

function updateHeroStats(stats) {
    const statElements = document.querySelectorAll('.stat-number');
    if (statElements.length >= 3) {
        // Calculate actual days to conference
        const conferenceDate = new Date('2026-07-30');
        const today = new Date();
        const daysUntil = Math.ceil((conferenceDate - today) / (1000 * 60 * 60 * 24));
        
        // Animate the numbers
        animateNumber(statElements[0], 0, Math.max(0, daysUntil), 1000);
        statElements[1].textContent = stats.conferenceDates;
        statElements[2].textContent = stats.edition;
    }
}

function animateNumber(element, start, end, duration) {
    const range = end - start;
    const startTime = performance.now();
    
    function updateNumber(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const current = Math.floor(start + (range * easeOutCubic(progress)));
        
        element.textContent = current;
        
        if (progress < 1) {
            requestAnimationFrame(updateNumber);
        }
    }
    
    requestAnimationFrame(updateNumber);
}

function easeOutCubic(t) {
    return 1 - Math.pow(1 - t, 3);
}

function formatDate(dateString) {
    const date = new Date(dateString);
    const options = {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    };
    return date.toLocaleDateString('en-US', options);
}

function getStatusText(status) {
    const statusMap = {
        'upcoming': 'Upcoming',
        'current': 'Current',
        'completed': 'Completed',
        'urgent': 'Urgent',
        'extended': 'Extended'
    };
    return statusMap[status] || status;
}

function getPriorityText(priority) {
    const priorityMap = {
        'high': 'High Priority',
        'medium': 'Medium Priority',
        'low': 'Low Priority'
    };
    return priorityMap[priority] || priority;
}

function showErrorMessage() {
    const containers = [
        'conference-timeline',
        'registration-deadlines',
        'paper-submission-timeline',
        'conference-schedule',
        'important-notices'
    ];

    containers.forEach(id => {
        const container = document.getElementById(id);
        if (container) {
            container.innerHTML = `
                <div class="error-message">
                    <h3>Unable to Load Data</h3>
                    <p>Please refresh the page or contact us if the problem persists.</p>
                </div>
            `;
        }
    });
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    initKeyDates();
    initScrollAnimations();
});

function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'fadeInUp 0.6s ease forwards';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe timeline items, cards, and other elements
    document.querySelectorAll('.timeline-item, .deadline-card, .submission-item, .schedule-day, .notice-card').forEach(el => {
        el.style.opacity = '0';
        observer.observe(el);
    });
    
    // Add staggered animation delays
    document.querySelectorAll('.deadline-card').forEach((card, index) => {
        card.style.animationDelay = `${index * 0.1}s`;
    });
    
    document.querySelectorAll('.notice-card').forEach((card, index) => {
        card.style.animationDelay = `${index * 0.15}s`;
    });
}
