const addBtn = document.querySelector('#new-toy-btn');
const toyForm = document.querySelector('.container');
// div for displaying toys
const toyDiv = document.querySelector('#toy-collection');
const baseURL = "http://localhost:3000/toys";
let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  // const toyDiv = document.querySelector('#toy-collection');
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });
});

// getting toys using fetch
fetch(baseURL)
.then(res => res.json())
.then(toys => {
  toys.forEach(toy => {
    renderToy(toy)
  })
})

function renderToy(toy) {

  const div = document.createElement("div")
  div.className = "card"

  const h2 = document.createElement("h2")
  h2.innerText = toy.name

  const image = document.createElement("img")
  image.className = "toy-avatar"
  // img.setAttribute("src", toy.image)
  image.src = toy.image

  const p = document.createElement("p")
  p.innerText = `${toy.likes} Likes`

  const btn = document.createElement("button")
  btn.className = "like-btn"
  btn.innerText = "Like <3"

  btn.addEventListener("click", () => {
    likes(toy, p)
  })

  div.append(h2, image, p, btn)
  toyDiv.append(div)
}

//on div we are expecting submit event when form's button is clicked
toyForm.addEventListener("submit", e => {
  e.preventDefault

  fetch(baseURL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify({
      "name": e.target[0].value,
      "image": e.target[1].value,
      "likes": 0
    })
  })
  .then(res => res.json())
  .then(toy => {
    renderToy(toy)
    // e.target.reset()
  })
})

function likes(toy, p) {
  fetch(`${baseURL}/${toy.id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify({
      "likes": ++toy.likes
    })
  })
  .then(res => res.json())
  .then(updatedToy => {
    p.innerText = `${updatedToy.likes} Likes`
  })
}