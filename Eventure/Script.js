// DARK MODE TOGGLE
const darkModeToggle = document.getElementById('darkModeToggle');
darkModeToggle.addEventListener('click', () => {
  document.body.classList.toggle('dark');
  // Change icon
  if(document.body.classList.contains('dark')) {
    darkModeToggle.textContent = '☀️';
  } else {
    darkModeToggle.textContent = '🌙';
  }
});

// SAMPLE EVENTS DATA (you can expand or fetch dynamically)
const events = [
  {
    id: 1,
    title: "Innovate Hackathon 2025",
    date: "2025-06-10",
    category: "hackathon",
    description: "A 24-hour hackathon to innovate and create amazing solutions.",
    image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=800&q=60"
  },
  {
    id: 2,
    title: "AI & ML Workshop",
    date: "2025-07-05",
    category: "workshop",
    description: "Hands-on workshop on AI and Machine Learning basics and applications.",
    image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=800&q=60"
  },
  {
    id: 3,
    title: "Cybersecurity Seminar",
    date: "2025-08-12",
    category: "seminar",
    description: "Expert talks and discussions on the latest in cybersecurity.",
    image: "https://images.unsplash.com/photo-1515377905703-c4788e51af15?auto=format&fit=crop&w=800&q=60"
  },
  {
    id: 4,
    title: "Web Development Webinar",
    date: "2025-09-01",
    category: "webinar",
    description: "Learn the latest trends in web development from industry pros.",
    image: "https://images.unsplash.com/photo-1523475496153-3dbd9a7a1187?auto=format&fit=crop&w=800&q=60"
  }
];

// DOM elements
const eventsContainer = document.getElementById('eventsContainer');
const searchInput = document.getElementById('searchInput');
const filterCategory = document.getElementById('filterCategory');
const eventSelect = document.getElementById('eventSelect');
const registrationForm = document.getElementById('registrationForm');
const registrationMessage = document.getElementById('registrationMessage');
const contactForm = document.getElementById('contactForm');
const contactResponse = document.getElementById('contactResponse');

// FUNCTION: Render event cards based on filters/search
function renderEvents(filter = 'all', search = '') {
  eventsContainer.innerHTML = '';

  const filteredEvents = events.filter(event => {
    const matchesCategory = filter === 'all' || event.category === filter;
    const matchesSearch = event.title.toLowerCase().includes(search.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  if (filteredEvents.length === 0) {
    eventsContainer.innerHTML = '<p>No events found matching your criteria.</p>';
    return;
  }

  filteredEvents.forEach(event => {
    const card = document.createElement('div');
    card.classList.add('event-card');
    card.innerHTML = `
      <img src="${event.image}" alt="${event.title}" class="event-image" />
      <div class="event-content">
        <h3 class="event-title">${event.title}</h3>
        <p class="event-date">${new Date(event.date).toLocaleDateString()}</p>
        <p class="event-description">${event.description}</p>
        <button class="register-btn" data-id="${event.id}">Register</button>
      </div>
    `;
    eventsContainer.appendChild(card);
  });

  // Add event listeners to Register buttons
  document.querySelectorAll('.register-btn').forEach(btn => {
    btn.addEventListener('click', e => {
      const eventId = e.target.getAttribute('data-id');
      eventSelect.value = eventId;
      window.location.hash = '#register-section';
      registrationForm.scrollIntoView({behavior: "smooth"});
    });
  });
}

// Populate eventSelect options dynamically
function populateEventSelect() {
  eventSelect.innerHTML = '<option value="" disabled selected>Select an event</option>';
  events.forEach(event => {
    const option = document.createElement('option');
    option.value = event.id;
    option.textContent = event.title;
    eventSelect.appendChild(option);
  });
}

// SEARCH & FILTER HANDLERS
searchInput.addEventListener('input', () => {
  renderEvents(filterCategory.value, searchInput.value);
});

filterCategory.addEventListener('change', () => {
  renderEvents(filterCategory.value, searchInput.value);
});

// REGISTRATION FORM SUBMISSION
registrationForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const name = registrationForm.name.value.trim();
  const email = registrationForm.email.value.trim();
  const college = registrationForm.college.value.trim();
  const eventId = registrationForm.eventSelect.value;

  if (!name || !email || !college || !eventId) {
    registrationMessage.style.color = 'red';
    registrationMessage.textContent = 'Please fill in all fields.';
    return;
  }

  // Basic email validation
  if (!/\S+@\S+\.\S+/.test(email)) {
    registrationMessage.style.color = 'red';
    registrationMessage.textContent = 'Please enter a valid email.';
    return;
  }

  // You can add AJAX here to submit to a server or backend API.
  // For now, we simulate success.
  registrationMessage.style.color = '#16a34a';
  registrationMessage.textContent = `Thank you, ${name}! You have registered for "${events.find(ev => ev.id == eventId).title}".`;

  registrationForm.reset();
});

// CONTACT FORM SUBMISSION
contactForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const name = contactForm.contactName.value.trim();
  const email = contactForm.contactEmail.value.trim();
  const message = contactForm.contactMessage.value.trim();

  if (!name || !email || !message) {
    contactResponse.style.color = 'red';
    contactResponse.textContent = 'Please fill in all fields.';
    return;
  }

  if (!/\S+@\S+\.\S+/.test(email)) {
    contactResponse.style.color = 'red';
    contactResponse.textContent = 'Please enter a valid email.';
    return;
  }

  // Simulate sending message
  contactResponse.style.color = '#16a34a';
  contactResponse.textContent = `Thanks for reaching out, ${name}! We'll get back to you soon.`;

  contactForm.reset();
});

// INITIAL RENDER
populateEventSelect();
renderEvents();

// Optional: Smooth scroll for nav links
document.querySelectorAll('nav a').forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    const targetID = link.getAttribute('href').slice(1);
    const targetSection = document.getElementById(targetID);
    if(targetSection) {
      targetSection.scrollIntoView({behavior: 'smooth'});
    }
  });
});
