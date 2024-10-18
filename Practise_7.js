//Task_1
// Отримати список користувачів з віддаленого ресурсу /users.
// Використати fetch.
// Очікуваний результат - масив користувачів.

fetch("https://jsonplaceholder.typicode.com/albums")
  .then((response) => {
    if (response.ok) {
      return response.json();
    }

    throw new Error();
  })
  .then((value) => console.log(value))
  .catch((err) => console.error(err.message));
//Task_2
// Отримати список усіх альбомів які належать користувачу з id - 10.
// Використати fetch.
// Після отримання відповіді від API, перевірити чи запит виконався успішно (чи знаходиться код відповіді в діапазоні 200-299).
// Вивести у консоль результат.

const baseURL = "https://jsonplaceholder.typicode.com";

fetch(`${baseURL}/users/10/albums`)
  .then((response) => {
    if (response.ok) {
      return response.json();
    }

    throw new Error();
  })
  .then((value) => console.log(value))
  .catch((err) => console.error(err.message));
//Task_3
// Створити нового користувача - зробити POST запит на ендпоінт 'https://jsonplaceholder.typicode.com/users'.
// Використати fetch.
// Для нового користувача вказати поля name, username, email.
// Оскільки дане API працює з JSON то body запиту повинне бути у JSON форматі.
// Вказати для запиту заголовок 'Content-type' з значенням 'application/json'.
// Після отримання відповіді від API, перевірити чи запит виконався успішно.
// Вивести у консоль результат.

const user = {
  name: "FirstName LastName",
  username: "UserName",
  email: "usermail@gmail.com",
};

const baseURL = "https://jsonplaceholder.typicode.com";

fetch(`${baseURL}/users`, {
  method: "POST",
  headers: {
    "Content-type": "application/json",
  },
  body: JSON.stringify(user),
})
  .then((response) => {
    if (response.ok) {
      return response.json();
    }

    throw new Error();
  })
  .then((value) => console.log(value))
  .catch((err) => console.log(err.message));
//Task_4
// Написати функцію getAlbum(id), яка буде приймати id альбому який потрібно отримати.
// Функція getAlbum повинна повертати проміс, який у разі успішного виконання повертає дані альбому.
// Написати функцію getSpecifiedAlbums(ids = []), яка буде приймати масив ids з значеннями id для альбомів які потрібно отримати.
// Функція getSpecifiedAlbums() повинна повертати проміс, який у разі успішного виконання повертає масив вказаних альбомів.
// У разі успішного виконання промісу з getSpecifiedAlbums, вивести у консоль результат.

function getAlbum(id) {
  return fetch(`https://jsonplaceholder.typicode.com/albums/${id}`)
    .then((response) => {
      if (response.ok) {
        return response.json();
      }

      throw new Error();
    })
    .catch((err) => Promise.reject(err));
}

function getAlbums(ids) {
  return Promise.all(ids.map((id) => getAlbum(id)));
}

getAlbums([1, 15]).then(
  (values) => console.log(values),
  (err) => console.error(err.message),
);
