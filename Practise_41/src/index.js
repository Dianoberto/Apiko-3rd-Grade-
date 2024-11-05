import "./styles.css";

const fetchPopularMovies = async () => {
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
  for (const key in response.results) {
    const value = response.results[key];

    document.getElementById("app").innerHTML += `
    <div class="module" style="margin:4px;padding:5px 20px;">
      <h3>Title: <u>${value.original_title}</u> / ${value.title}</h3>
      <img style="width:300px;height:400px" src="https://image.tmdb.org/t/p/original${
        value.poster_path
      }">
      <p>Age restrictions: ${value.adult ? "18+" : "14+"}</p>
      <span><b>Description:</b> <br/>${value.overview}</span>
      <h3>Ratings:${value.vote_average}</h3>
      <h4>People rated: ${value.vote_count}</h4>
    </div>
    `;
  }
};
fetchPopularMovies();
