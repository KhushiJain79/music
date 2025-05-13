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
    const waves=document.getElementById('wave');
      if (document.body.classList.contains('light-theme')) {
    waves.src = 'https://cdn-icons-png.flaticon.com/128/4287/4287943.png';
  } else {
     waves.src = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSO_d-O6ZaaUOFD4XziP70sQXRcl1pUXTNwfg&s';
   
  }
  });

  document.getElementById('face-scanner').addEventListener('click', function () {
    fetch('/recommend', {
        method: 'POST'
    })
    .then(response => response.json())
    .then(data => {
        console.log("Recommended songs:", data);
        // Optionally redirect or update UI with results
    })
    .catch(error => {
        console.error('Error recommending songs:', error);
    });
});

