//Task_1
const baseUrl = "https://jsonplaceholder.typicode.com";
const usersEndpoint = `${baseUrl}/users`;

fetch(usersEndpoint)
  .then(response => {
    if (!response.ok) {
      throw new Error("Network response was not ok " + response.statusText);
    }
    return response.json();
  })
  .then(users => {
    console.log("User list:", users);
  })
  .catch(error => {
    console.error("There was a problem with the fetch operation:", error);
  });
//Task_2
const baseUrl = "https://jsonplaceholder.typicode.com";
const userId = 10;
const albumsEndpoint = `${baseUrl}/users/${userId}/albums`;

fetch(albumsEndpoint)
  .then(response => {
    if (response.ok) {
      return response.json();
    }
    throw new Error("Network response was not ok: " + response.status);
  })
  .then(albums => {
    console.log("Albums of user with id 10:", albums);
  })
  .catch(error => {
    console.error("There was a problem with the fetch operation:", error);
  });
//Task_3
const baseUrl = "https://jsonplaceholder.typicode.com";
const newUser = {
  name: "Name LastName",
  username: "UserName",
  email: "usermail@gmail.com"
};

fetch(`${baseUrl}/users`, {
  method: "POST",
  headers: {
    "Content-Type": "application/json"
  },
  body: JSON.stringify(newUser)
})
  .then(response => {
    // Check if the response status is in the 200-299 range
    if (response.ok) {
      return response.json();
    }
    throw new Error(`Network response was not ok: ${response.status}`);
  })
  .then(createdUser => {
    console.log("Result:", createdUser);
  })
  .catch(error => {
    console.error("There was a problem with the fetch operation:", error);
  });
//Task_4
const baseUrl = "https://jsonplaceholder.typicode.com";

// Function to get a single album by id
function getAlbum(id) {
  return fetch(`${baseUrl}/albums/${id}`)
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(`Network response was not ok: ${response.status}`);
    })
    .catch(error => {
      console.error(`Error fetching album with id ${id}:`, error);
    });
}

// Function to get multiple albums based on an array of ids
function getSpecifiedAlbums(ids = []) {
  // Create an array of fetch promises for each id
  const albumPromises = ids.map(id => getAlbum(id));

  // Use Promise.all to wait for all promises to resolve
  return Promise.all(albumPromises)
    .then(results => {
      console.log("Results:", results);
      return results;
    })
    .catch(error => {
      console.error("Error fetching specified albums:", error);
    });
}

// Example usage
getSpecifiedAlbums([3, 5, 15]);
