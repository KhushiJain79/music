 function toggleSidebar() {
    const sidebar = document.getElementById("Sidebar");
    sidebar.classList.toggle("show");
  }

  const toggleBtn = document.getElementById('themeToggle');
  const waveImage = document.getElementById('wave');

toggleBtn.addEventListener('click', () => {
  document.body.classList.add('theme-transition');

  // Toggle theme class
  document.body.classList.toggle('light-theme');

  // Change toggle icon
  toggleBtn.textContent = document.body.classList.contains('light-theme') ? '🌞' : '🌙';

  // Change wave icon
  const waves = document.getElementById('wave');
  if (document.body.classList.contains('light-theme')) {
    waves.src = 'https://cdn-icons-png.flaticon.com/128/4287/4287943.png';
  } else {
    waves.src = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSO_d-O6ZaaUOFD4XziP70sQXRcl1pUXTNwfg&s';
  }

  setTimeout(() => {
    document.body.classList.remove('theme-transition');
  }, 800); 
});
