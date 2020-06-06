let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyForm = document.querySelector(".container");
  const toyDiv = document.querySelector("#toy-collection")
  const form = document.querySelector(".add-toy-form")


  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyForm.style.display = "block";
    } else {
      toyForm.style.display = "none";
    }
  });

  fetch("http://localhost:3000/toys")
  .then(res => res.json())
  .then(toys => {
    toys.forEach(toy => {
      createToy(toy)
    })
  })


  function createToy(toy){
  // console.log(toy)
  //  <div class="card">
  //   <h2>Woody</h2>
  //   <img src=toy_image_url class="toy-avatar" />
  //   <p>4 Likes </p>
  //   <button class="like-btn">Like <3</button>
  // </div>


  const div = document.createElement('div')
  div.className = "card"

  const h2 = document.createElement('h2')
  h2.innerText = toy.name

  const img = document.createElement('img')
  img.src = toy.image
  img.className = "toy-avatar"

  const p = document.createElement('p')
  p.innerText = `${toy.likes} Likes`

  const btn = document.createElement('button')
  btn.innerText = "Like <3"
  btn.className = "like-btn"

  btn.addEventListener("click", () => {

    fetch("http://localhost:3000/toys/"+toy.id, {
      method: "PATCH",
      headers:{
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify({
        // likes: toy.likes++ //toy.likes = toy.likes + 1
        likes: toy.likes + 1
        // likes: ++toy.likes //toy.likes = toy.likes + 1
        // likes: toy.likes+=1 //toy.likes = toy.likes + 1
      })
    })
    .then(res => res.json())
    .then(updatedToy => {
      // debugger
      p.innerText = `${updatedToy.likes} Likes`
      toy = updatedToy
    })


  })

  div.append(h2,img,p,btn)
  toyDiv.append(div)
  }

  //add a new toy
  // form.addEventListener("submit", addToy(e,form,toyForm))
  form.addEventListener("submit", (e) => {
    e.preventDefault()

    let name = e.target[0].value
    let url = e.target[1].value

    // debugger

    fetch("http://localhost:3000/toys", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify({
        name: name,
        image: url,
        likes: 0
      })
    })
    .then(res => res.json())
    // .then(idk => {debugger})
    .then(newToy => {
      createToy(newToy)

      //extra user experience
      form.reset()
      toyForm.style.display = "none"
      addToy = !addToy
    })
  })

});
