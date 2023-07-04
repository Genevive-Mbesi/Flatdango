const film = document.querySelector(".film");

   // Function to render movie posts on the page

const renderPosts = async () => {
  // Fetch movie data from the server
  let url = "http://localhost:3000/films";

  const res = await fetch(url);
  const films = await res.json();

  let template = "";
  // Generate HTML template for each film
  films.forEach((film) => {
    let ticketsLeft = film.capacity - film.tickets_sold;

    template += `
      <div class="movies">
        <h2 class="movie-title">${film.title}</h2>
        <div class="movie-details" style="display: none;">
          <p>Starts: ${film.showtime}</p>
          <p>Duration: ${film.runtime} minutes</p>
          <p>Seats: ${film.capacity}</p>
          <p>Tickets sold: ${film.tickets_sold}</p>
          <p>Tickets left: <span class="tickets-left">${ticketsLeft}</span></p>
          <p>Description: ${film.description}</p>
          <button class="btn">Buy Ticket</button>
          <img src="${film.poster}">
        </div>
      </div>
    `;
  });

  film.innerHTML = template;
  // Add event listener to the "Home" menu item

  const homeMenuItem = document.getElementById("home");
  homeMenuItem.addEventListener("click", () => {
    const movieTitles = document.querySelectorAll(".movie-title");
    // Toggle display of movie titles and hide movie details
    movieTitles.forEach((title) => {
      title.style.display = title.style.display === "none" ? "block" : "none";
      const movieDetails = title.nextElementSibling;
      movieDetails.style.display = "none";
    });
    const filmSection = document.querySelector(".film");
    filmSection.style.display = "block";
  });

  const movieTitles = document.querySelectorAll(".movie-title");

  //Add click event listener to each movie title

  movieTitles.forEach((title) => {
    title.addEventListener("click", () => {
      const movieDetails = title.nextElementSibling;
      movieDetails.style.display = movieDetails.style.display === "none" ? "block" : "none";
    });
  });

// Add click event listener to each "Buy Ticket" button
  const ticketBtn = document.querySelectorAll(".btn");
  ticketBtn.forEach((btn, index) => {
    btn.addEventListener("click", () => {
      const ticketsLeftElement = document.querySelectorAll(".tickets-left")[index];
      let ticketsLeft = parseInt(ticketsLeftElement.textContent);

      if (ticketsLeft > 0) {
        ticketsLeft--;
        ticketsLeftElement.textContent = ticketsLeft;

        const filmData = films[index];
        filmData.tickets_sold++;
      } else {
        alert("SOLD OUT!!");
      }
    });
  });
};

film.style.display = "none";
// Trigger rendering of movie posts when the DOM is fully loaded
window.addEventListener("DOMContentLoaded", renderPosts); 