const username = "gargi24dey-cmd";
const container = document.getElementById("project-container");

fetch(`https://api.github.com/users/${username}/repos?sort=updated`)
  .then(response => response.json())
  .then(repos => {
    container.innerHTML = ""; // clear "Loading..."

    repos.forEach(repo => {
      // Skip the portfolio repo itself
      if (repo.name === `${username}.github.io`) return;

      const card = document.createElement("div");
      card.className = "project-card";
      card.innerHTML = `
        <h3>${repo.name}</h3>
        <p>${repo.description ? repo.description : "No description added yet."}</p>
        <a href="${repo.html_url}" target="_blank">View on GitHub</a>
      `;
      container.appendChild(card);
    });
  })
  .catch(error => {
    container.innerHTML = "<p>Couldn't load projects right now.</p>";
    console.error(error);
  });
const toggleBtn = document.getElementById("theme-toggle");

// Apply saved theme on page load
if (localStorage.getItem("theme") === "dark") {
  document.body.classList.add("dark-mode");
  toggleBtn.textContent = "☀️ Light Mode";
}

toggleBtn.addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");

  if (document.body.classList.contains("dark-mode")) {
    toggleBtn.textContent = "☀️ Light Mode";
    localStorage.setItem("theme", "dark");
  } else {
    toggleBtn.textContent = "🌙 Dark Mode";
    localStorage.setItem("theme", "light");
  }
});
