// Wait until DOM loads
document.addEventListener('DOMContentLoaded', () => {
  // Dark mode toggle
  const toggleDarkBtn = document.getElementById('toggleDark');
  const body = document.body;
  const darkModeStorageKey = 'healthhive-darkmode';

  // Load dark mode preference
  if (localStorage.getItem(darkModeStorageKey) === 'enabled') {
    body.classList.add('dark');
    toggleDarkBtn.textContent = '☀️';
  } else {
    toggleDarkBtn.textContent = '🌙';
  }

  toggleDarkBtn.addEventListener('click', () => {
    if (body.classList.contains('dark')) {
      body.classList.remove('dark');
      toggleDarkBtn.textContent = '🌙';
      localStorage.setItem(darkModeStorageKey, 'disabled');
    } else {
      body.classList.add('dark');
      toggleDarkBtn.textContent = '☀️';
      localStorage.setItem(darkModeStorageKey, 'enabled');
    }
  });

  // Articles data — in real app this would come from backend or API
  const articles = [
    {
      id: 1,
      title: "5 Tips for a Healthy Lifestyle",
      summary: "Discover simple daily habits that can dramatically improve your health and well-being.",
      content:
        "1. Eat a balanced diet rich in fruits, vegetables, and whole grains.\n" +
        "2. Stay hydrated by drinking plenty of water throughout the day.\n" +
        "3. Exercise regularly — at least 30 minutes of moderate activity most days.\n" +
        "4. Prioritize sleep by aiming for 7-9 hours each night.\n" +
        "5. Manage stress through mindfulness, hobbies, or professional help.",
    },
    {
      id: 2,
      title: "Understanding Mental Health",
      summary: "Mental health is as important as physical health. Learn signs to look out for and how to seek help.",
      content:
        "Mental health affects how we think, feel, and act.\n" +
        "Common issues include anxiety, depression, and stress.\n" +
                "Seek professional support if you experience persistent feelings of sadness or hopelessness.",
            }
          ];
        });
