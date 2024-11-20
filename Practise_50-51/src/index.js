import "./styles.css";

import { Popular } from "./pages/popular";
import { NotFound } from "./pages/notfound";
import { Bookmarks } from "./pages/bookmarks";
import { Search } from "./pages/search";
import { Movies } from "./pages/movies";

localStorage.setItem(
  "likedMovies",
  localStorage.getItem("likedMovies") || JSON.stringify([])
);

const routes = [
  {
    match: (url) => {
      return url === "/";
    },
    renderRoute: Popular,
  },
  {
    match: (url) => {
      return url.includes("/search");
    },
    renderRoute: Search,
  },
  {
    match: (url) => {
      return url.includes("/movies");
    },
    renderRoute: Movies,
  },
  {
    match: (url) => {
      return url === "/bookmarks";
    },
    renderRoute: Bookmarks,
  },
  {
    match: () => true,
    renderRoute: NotFound,
  },
];

class Router {
  constructor(routes) {
    this._routes = routes;

    window.history.pushState = (data, title, url) => {
      History.prototype.pushState.apply(window.history, [data, title, url]);
      this.reroute();
    };

    window.onpopstate = () => {
      this.reroute();
    };
  }

  reroute() {
    const matchedRoute = this._routes.find((route) => {
      const matched = route.match(window.location.pathname);

      return matched;
    });

    matchedRoute.renderRoute();
  }
}

const router = new Router(routes);

router.reroute();
