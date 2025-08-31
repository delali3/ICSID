// Contact form handling and dynamic content loading
async function initContact(){
  try {
    const res = await fetch('assets/data/contact.json');
    const contactData = await res.json();

    // Load contact information
    loadConferenceInfo(contactData.conference);
    loadOrganizers(contactData.organizers);
    loadDepartments(contactData.departments);
    loadOfficeHours(contactData.officeHours);
    loadEmergencyContacts(contactData.emergencyContacts);
    loadSocialMedia(contactData.socialMedia);
    loadFAQ(contactData.faq);

    // Initialize contact form
    initContactForm();

  } catch (error) {
    console.error('Error loading contact data:', error);
  }
}

function loadConferenceInfo(conference) {
  const container = document.getElementById('conference-info');
  if (!container) return;

  container.innerHTML = `
    <div class="contact-card conference-card">
      <h3>${conference.name}</h3>
      <p class="conference-full-name">${conference.fullName}</p>
      <div class="contact-details">
        <div class="contact-item">
          <strong>Email:</strong> <a href="mailto:${conference.email}">${conference.email}</a>
        </div>
        <div class="contact-item">
          <strong>Phone:</strong> <a href="tel:${conference.phone}">${conference.phone}</a>
        </div>
        <div class="contact-item">
          <strong>Website:</strong> <a href="${conference.website}" target="_blank">${conference.website}</a>
        </div>
        <div class="contact-address">
          <strong>Address:</strong><br>
          ${conference.address.organization}<br>
          ${conference.address.street}<br>
          ${conference.address.city}, ${conference.address.region}<br>
          ${conference.address.country} ${conference.address.postalCode}
        </div>
      </div>
    </div>
  `;
}

function loadOrganizers(organizers) {
  const container = document.getElementById('organizers-list');
  if (!container) return;

  container.innerHTML = organizers.map(organizer => `
    <div class="contact-card organizer-card">
      <h4>${organizer.name}</h4>
      <p class="organizer-title">${organizer.title}</p>
      <p class="organizer-affiliation">${organizer.department}<br>${organizer.institution}</p>
      <div class="contact-details">
        <div class="contact-item">
          <strong>Email:</strong> <a href="mailto:${organizer.email}">${organizer.email}</a>
        </div>
        <div class="contact-item">
          <strong>Phone:</strong> <a href="tel:${organizer.phone}">${organizer.phone}</a>
        </div>
      </div>
    </div>
  `).join('');
}

function loadDepartments(departments) {
  const container = document.getElementById('departments-list');
  if (!container) return;

  container.innerHTML = departments.map(dept => `
    <div class="contact-card department-card">
      <h4>${dept.name}</h4>
      <p class="department-description">${dept.description}</p>
      <div class="contact-details">
        <div class="contact-item">
          <strong>Email:</strong> <a href="mailto:${dept.email}">${dept.email}</a>
        </div>
        <div class="contact-item">
          <strong>Response Time:</strong> ${dept.responseTime}
        </div>
      </div>
    </div>
  `).join('');
}

function loadOfficeHours(hours) {
  const container = document.getElementById('office-hours');
  if (!container) return;

  container.innerHTML = `
    <div class="office-hours-card">
      <h4>Office Hours</h4>
      <div class="hours-info">
        <p><strong>${hours.weekdays}</strong></p>
        <p><strong>Timezone:</strong> ${hours.timezone}</p>
        <p class="hours-note">${hours.note}</p>
      </div>
    </div>
  `;
}

function loadEmergencyContacts(contacts) {
  const container = document.getElementById('emergency-contacts');
  if (!container) return;

  container.innerHTML = contacts.map(contact => `
    <div class="contact-card emergency-card">
      <h4>${contact.name}</h4>
      <p class="emergency-description">${contact.description}</p>
      <div class="contact-details">
        <div class="contact-item">
          <strong>Phone:</strong> <a href="tel:${contact.phone}">${contact.phone}</a>
        </div>
        <div class="contact-item">
          <strong>Available:</strong> ${contact.availability}
        </div>
      </div>
    </div>
  `).join('');
}

function loadSocialMedia(social) {
  const container = document.getElementById('social-media');
  if (!container) return;

  container.innerHTML = social.map(platform => `
    <a href="${platform.url}" target="_blank" class="social-link-card" aria-label="Follow us on ${platform.platform}">
      <h4>${platform.platform}</h4>
      <p class="social-handle">${platform.handle}</p>
      <p class="social-description">${platform.description}</p>
    </a>
  `).join('');
}

function loadFAQ(faq) {
  const container = document.getElementById('faq-list');
  if (!container) return;

  container.innerHTML = faq.map((item, index) => `
    <div class="faq-item">
      <button class="faq-question" aria-expanded="false" aria-controls="faq-answer-${index}">
        <span>${item.question}</span>
        <svg class="faq-toggle" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <polyline points="6,9 12,15 18,9"></polyline>
        </svg>
      </button>
      <div class="faq-answer" id="faq-answer-${index}" aria-hidden="true">
        <p>${item.answer}</p>
      </div>
    </div>
  `).join('');

  // Add FAQ toggle functionality
  initFAQToggle();
}

function initFAQToggle() {
  const faqQuestions = document.querySelectorAll('.faq-question');

  faqQuestions.forEach(button => {
    button.addEventListener('click', () => {
      const isExpanded = button.getAttribute('aria-expanded') === 'true';
      const answer = document.getElementById(button.getAttribute('aria-controls'));

      button.setAttribute('aria-expanded', !isExpanded);
      answer.setAttribute('aria-hidden', isExpanded);

      // Toggle answer visibility
      if (isExpanded) {
        answer.style.maxHeight = '0';
        answer.style.opacity = '0';
      } else {
        answer.style.maxHeight = answer.scrollHeight + 'px';
        answer.style.opacity = '1';
      }

      // Rotate toggle icon
      const toggle = button.querySelector('.faq-toggle');
      toggle.style.transform = isExpanded ? 'rotate(0deg)' : 'rotate(180deg)';
    });
  });
}

function initContactForm() {
  const form = document.getElementById('contact-form');
  if (!form) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const formData = new FormData(form);
    const submitButton = form.querySelector('button[type="submit"]');
    const originalText = submitButton.textContent;

    // Show loading state
    submitButton.textContent = 'Sending...';
    submitButton.disabled = true;

    try {
      // Simulate form submission (replace with actual API call)
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Show success message
      showFormMessage('Thank you for your message! We\'ll get back to you within 24-48 hours.', 'success');

      // Reset form
      form.reset();

    } catch (error) {
      console.error('Form submission error:', error);
      showFormMessage('Sorry, there was an error sending your message. Please try again or contact us directly.', 'error');
    } finally {
      // Reset button
      submitButton.textContent = originalText;
      submitButton.disabled = false;
    }
  });

  // Add form validation
  const emailInput = form.querySelector('input[type="email"]');
  emailInput.addEventListener('blur', validateEmail);

  const requiredInputs = form.querySelectorAll('input[required], textarea[required]');
  requiredInputs.forEach(input => {
    input.addEventListener('blur', validateRequired);
  });
}

function validateEmail(e) {
  const email = e.target.value;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (email && !emailRegex.test(email)) {
    showFieldError(e.target, 'Please enter a valid email address');
  } else {
    clearFieldError(e.target);
  }
}

function validateRequired(e) {
  const value = e.target.value.trim();

  if (!value) {
    showFieldError(e.target, 'This field is required');
  } else {
    clearFieldError(e.target);
  }
}

function showFieldError(field, message) {
  clearFieldError(field);

  const errorDiv = document.createElement('div');
  errorDiv.className = 'field-error';
  errorDiv.textContent = message;

  field.classList.add('field-error-input');
  field.parentNode.appendChild(errorDiv);
}

function clearFieldError(field) {
  field.classList.remove('field-error-input');
  const existingError = field.parentNode.querySelector('.field-error');
  if (existingError) {
    existingError.remove();
  }
}

function showFormMessage(message, type) {
  const form = document.getElementById('contact-form');
  const existingMessage = form.querySelector('.form-message');

  if (existingMessage) {
    existingMessage.remove();
  }

  const messageDiv = document.createElement('div');
  messageDiv.className = `form-message ${type}`;
  messageDiv.textContent = message;

  form.insertBefore(messageDiv, form.firstChild);

  // Auto-hide success messages after 5 seconds
  if (type === 'success') {
    setTimeout(() => {
      messageDiv.remove();
    }, 5000);
  }
}

// Initialize contact page when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  if (document.getElementById('conference-info')) {
    initContact().catch(console.error);
  }
});
