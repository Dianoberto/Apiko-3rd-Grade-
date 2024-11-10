class Api {
  constructor() {
    this.apiKey = "e747027d90e987e818608b1a1e87b24e"; // Вставте ваш API ключ тут
    this.baseUrl = "https://api.themoviedb.org/3";
  }

  async fetchMoviesBySearchText(query, page = 1) {
    try {
      const response = await fetch(
        `${this.baseUrl}/search/movie?api_key=${this.apiKey}&query=${query}&page=${page}&language=en-US`
      );
      if (!response.ok) {
        throw new Error(`Failed to fetch movies for query: ${query}`);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching movies:", error);
      return { results: [], total_results: 0, total_pages: 0 };
    }
  }
}

const api = new Api();
const moviesContainer = document.getElementById("movies-container");
const searchInput = document.getElementById("search-input");
const loadMoreButton = document.getElementById("load-more-button");
const loadingText = document.getElementById("loading-text");

let currentQuery = "";
let currentPage = 1;
let totalPages = 1;

async function renderMovies(movies, container, clear = false) {
  if (clear) {
    container.innerHTML = "";
  }

  if (movies.length > 0) {
    movies.forEach((movie) => {
      const movieElement = document.createElement("div");
      movieElement.classList.add("movie");

      const moviePoster = document.createElement("img");
      moviePoster.src = movie.poster_path
        ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
        : "https://via.placeholder.com/200x300?text=No+Image";
      moviePoster.alt = movie.title;

      const movieTitle = document.createElement("h2");
      movieTitle.textContent = movie.original_title;

      movieElement.appendChild(moviePoster);
      movieElement.appendChild(movieTitle);
      container.appendChild(movieElement);
    });
  } else {
    container.innerHTML = `<p>No results for "${currentQuery}"</p>`;
  }
}

async function handleSearch(event) {
  if (event.key === "Enter" && searchInput.value.trim()) {
    currentQuery = searchInput.value.trim();
    currentPage = 1;

    loadingText.style.display = "block";
    loadMoreButton.style.display = "none";

    const data = await api.fetchMoviesBySearchText(currentQuery, currentPage);
    loadingText.style.display = "none";

    renderMovies(data.results, moviesContainer, true);

    const resultsCount = data.total_results;
    const resultsText =
      resultsCount > 0
        ? `Results (${resultsCount})`
        : `No results for "${currentQuery}"`;
    const resultsElement = document.createElement("h2");
    resultsElement.textContent = resultsText;
    moviesContainer.insertBefore(resultsElement, moviesContainer.firstChild);

    totalPages = data.total_pages;

    if (currentPage < totalPages) {
      loadMoreButton.style.display = "block";
    } else {
      loadMoreButton.style.display = "none";
    }

    searchInput.value = "";
  }
}

async function loadMoreMovies() {
  if (currentPage < totalPages) {
    currentPage += 1;
    const data = await api.fetchMoviesBySearchText(currentQuery, currentPage);
    renderMovies(data.results, moviesContainer, false);

    if (currentPage >= totalPages) {
      loadMoreButton.style.display = "none";
    }
  }
}

searchInput.addEventListener("keypress", handleSearch);
loadMoreButton.addEventListener("click", loadMoreMovies);
