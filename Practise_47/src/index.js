class Movies {
  constructor() {
    this.inputValue = "";
    this.page = 1;
    this.currentMovies = [];
    this.mode = "popular";
  }

  loadMore() {
    this.page += 1;
    this.fetchMoviesBySearchText();
  }

  setInputValue(value) {
    this.inputValue = value;
    this.page = 1;
    this.currentMovies =
      this.inputValue != "" && this.mode == "popular" ? [] : this.currentMovies;
    this.mode = this.inputValue == "" ? "popular" : "search";

    this.handleMovies();
  }

  async fetchMoviesBySearchText() {
    const loader = document.getElementById("loader");
    loader.style.display = "block";
    const response = await (
      await fetch(
        `https://api.themoviedb.org/3/search/movie?query=${this.inputValue}&api_key=c701d4a0a4435189958539ead8b38af4&page=${this.page}`,
        {
          method: "get",
          headers: {
            "content-type": "application/json",
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjNzAxZDRhMGE0NDM1MTg5OTU4NTM5ZWFkOGIzOGFmNCIsIm5iZiI6MTcyOTc5NTU1Ni41MzE2MzMsInN1YiI6IjY3MWE5MzNlNDI3YzVjMTlmMDI1Y2YyNCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Ip4vSk-3jN-tPLwxhWWgXsue9EU4EljzSAhigYmr_HM",
          },
        }
      )
    ).json();
    this.currentMovies =
      response.results.length == 0
        ? []
        : this.currentMovies.concat(response.results);
    this.loadMovies();
    loader.style.display = "none";
  }

  async fetchLikedMovies() {
    const loader = document.getElementById("loader");
    loader.style.display = "block";

    const likedMoviesIds = JSON.parse(localStorage.getItem("likedMovies"));
    const likedMovies = [];

    for (const movieIdentifier of likedMoviesIds) {
      const response = await (
        await fetch(`https://api.themoviedb.org/3/movie/${movieIdentifier}`, {
          method: "get",
          headers: {
            "content-type": "application/json",
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjNzAxZDRhMGE0NDM1MTg5OTU4NTM5ZWFkOGIzOGFmNCIsIm5iZiI6MTcyOTc5NTU1Ni41MzE2MzMsInN1YiI6IjY3MWE5MzNlNDI3YzVjMTlmMDI1Y2YyNCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Ip4vSk-3jN-tPLwxhWWgXsue9EU4EljzSAhigYmr_HM",
          },
        })
      ).json();
      likedMovies.push(response);
    }

    this.currentMovies = likedMovies;
    this.loadMovies();
    loader.style.display = "none";
  }

  async fetchPopularMovies() {
    const loader = document.getElementById("loader");
    loader.style.display = "block";
    const response = await (
      await fetch("https://api.themoviedb.org/3/movie/popular", {
        method: "get",
        headers: {
          "content-type": "application/json",
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjNzAxZDRhMGE0NDM1MTg5OTU4NTM5ZWFkOGIzOGFmNCIsIm5iZiI6MTcyOTc5NTU1Ni41MzE2MzMsInN1YiI6IjY3MWE5MzNlNDI3YzVjMTlmMDI1Y2YyNCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Ip4vSk-3jN-tPLwxhWWgXsue9EU4EljzSAhigYmr_HM",
        },
      })
    ).json();
    this.currentMovies = response.results.length == 0 ? [] : response.results;
    this.loadMovies();
    loader.style.display = "none";
  }

  handleMovies() {
    if (this.mode == "popular") {
      localStorage.removeItem("currentMovies");
      document.getElementById("app").innerHTML = "";
      document.getElementById("info").innerText = "Popular movies";
      this.fetchPopularMovies();
      document.getElementById("loadMoreButton").style.display = "none";
    } else if (this.mode == "liked") {
      document.getElementById("app").innerHTML = "";
      document.getElementById("info").innerText = "Bookmarks";
      this.fetchLikedMovies();
      document.getElementById("loadMoreButton").style.display = "none";
    } else {
      localStorage.removeItem("currentMovies");
      document.getElementById("app").innerHTML = "";
      document.getElementById("info").innerText = "Results";
      this.fetchMoviesBySearchText();
      document.getElementById("loadMoreButton").style.display = "inline-block";
    }
  }

  loadMovies() {
    if (this.currentMovies.length == 0) {
      document.getElementById("app").innerHTML =
        "<h3>We could not find any movies</h3>";
      document.getElementById("loadMoreButton").style.display = "none";
      return;
    }
    // if (localStorage.key(0) == "likedMovies") {
    //   localStorage.setItem("currentMovies", JSON.stringify(data));
    // } else {
    //   const curr = JSON.parse(localStorage.getItem("currentMovies")).concat(data);
    //   localStorage.setItem("currentMovies", JSON.stringify(curr));
    // }
    document.getElementById("app").innerHTML = "";
    for (const value of this.currentMovies) {
      // const movieIdentifier = value.title.replace(" ", "") + value.release_date;
      document.getElementById("app").innerHTML += `
      <section>
        <img style="width:300px;height:400px" src="https://image.tmdb.org/t/p/original${
          value.poster_path
        }">
        <div>
          <h3>Title: <u>${value.original_title}</u> / ${value.title}</h3>
          <p>Age restrictions: ${value.adult ? "18+" : "14+"}</p>
          <span><b>Description:</b> <br/>${value.overview}</span>
          <h4>Ratings:${value.vote_average}</h4>
          <h4>People rated: ${value.vote_count}</h4>
          ${
            this.isLiked(value.id)
              ? `<button onclick="movies.removeLike('${value.id}')"><svg xmlns="http://www.w3.org/2000/svg" style="width: 24px;fill:crimson;" viewBox="0 0 512 512"><!--!Font Awesome Free 6.6.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d="M47.6 300.4L228.3 469.1c7.5 7 17.4 10.9 27.7 10.9s20.2-3.9 27.7-10.9L464.4 300.4c30.4-28.3 47.6-68 47.6-109.5v-5.8c0-69.9-50.5-129.5-119.4-141C347 36.5 300.6 51.4 268 84L256 96 244 84c-32.6-32.6-79-47.5-124.6-39.9C50.5 55.6 0 115.2 0 185.1v5.8c0 41.5 17.2 81.2 47.6 109.5z"/></svg></button>`
              : `<button onclick="movies.setLiked('${value.id}')"><svg xmlns="http://www.w3.org/2000/svg" style="width: 24px; color" viewBox="0 0 512 512"><!--!Font Awesome Free 6.6.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d="M225.8 468.2l-2.5-2.3L48.1 303.2C17.4 274.7 0 234.7 0 192.8l0-3.3c0-70.4 50-130.8 119.2-144C158.6 37.9 198.9 47 231 69.6c9 6.4 17.4 13.8 25 22.3c4.2-4.8 8.7-9.2 13.5-13.3c3.7-3.2 7.5-6.2 11.5-9c0 0 0 0 0 0C313.1 47 353.4 37.9 392.8 45.4C462 58.6 512 119.1 512 189.5l0 3.3c0 41.9-17.4 81.9-48.1 110.4L288.7 465.9l-2.5 2.3c-8.2 7.6-19 11.9-30.2 11.9s-22-4.2-30.2-11.9zM239.1 145c-.4-.3-.7-.7-1-1.1l-17.8-20-.1-.1s0 0 0 0c-23.1-25.9-58-37.7-92-31.2C81.6 101.5 48 142.1 48 189.5l0 3.3c0 28.5 11.9 55.8 32.8 75.2L256 430.7 431.2 268c20.9-19.4 32.8-46.7 32.8-75.2l0-3.3c0-47.3-33.6-88-80.1-96.9c-34-6.5-69 5.4-92 31.2c0 0 0 0-.1 .1s0 0-.1 .1l-17.8 20c-.3 .4-.7 .7-1 1.1c-4.5 4.5-10.6 7-16.9 7s-12.4-2.5-16.9-7z"/></svg>
                </button>
                `
          }
          
        </div>
      </section>
      `;
    }
  }

  isLiked(id) {
    const res = JSON.parse(localStorage.getItem("likedMovies"));
    const copy = new Array(...res);
    return copy.length == 0 ? false : copy.includes(id.toString());
  }

  setLiked(id) {
    const res = JSON.parse(localStorage.getItem("likedMovies"));
    const copy = new Array(...res);
    copy.push(id);
    localStorage.setItem("likedMovies", JSON.stringify(copy));
    this.mode == "liked" ? this.handleMovies() : this.loadMovies();
  }

  removeLike(id) {
    const movies = JSON.parse(localStorage.getItem("likedMovies"));
    const copy = new Array(...movies);
    const newMovies = copy.filter((item) => item != id.toString());
    localStorage.setItem("likedMovies", JSON.stringify(newMovies));
    this.mode == "liked" ? this.handleMovies() : this.loadMovies();
  }
}

window.movies = new Movies();
movies.handleMovies();

localStorage.setItem(
  "likedMovies",
  localStorage.getItem("likedMovies") || JSON.stringify([])
);

const form = document.querySelector("form");
form.addEventListener("submit", (event) => {
  event.preventDefault();
  movies.setInputValue(event.currentTarget[0].value);
});

const popularButton = document.getElementById("popularButton");
const bookmarksButton = document.getElementById("bookmarksButton");

popularButton.addEventListener("click", (_e) => {
  popularButton.style.textDecoration = "underline";
  bookmarksButton.style.textDecoration = "none";
  movies.mode = "popular";
  movies.handleMovies();
});
bookmarksButton.addEventListener("click", (_e) => {
  bookmarksButton.style.textDecoration = "underline";
  popularButton.style.textDecoration = "none";
  movies.mode = "liked";
  movies.handleMovies();
});
