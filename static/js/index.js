 function toggleSidebar() {
    const sidebar = document.getElementById("Sidebar");
     sidebar.classList.toggle("show");
    // sidebar.classList.toggle("d-none");
    // sidebar.classList.toggle("d-flex");
  }


  const toggleBtn = document.getElementById('themeToggle');
  toggleBtn.addEventListener('click', () => {
    document.body.classList.toggle('light-theme');
    toggleBtn.textContent = document.body.classList.contains('light-theme') ? '🌞' : '🌙';
  });

