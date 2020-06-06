let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
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
    //render toys from db
    goFetch();
    //form submit event listener
    // const form = document.querySelector('form');
    // form.addEventListener('submit', function(e) {
    //   e.preventDefault();
    //   //store url and name from form input
    //   const toyImgUrl = document.querySelector("input[name=image]").value;
    //   const toyNameEntry = document.querySelector("input[name=name]").value;
    //   makeNewToy(toyImgUrl, toyNameEntry);
    // });
    //end DOMContentLoaded action
});

    function goFetch (){
    const toyDiv = document.getElementById('toy-collection');
    const toysUrl = 'http://localhost:3000/toys';
    return fetch(toysUrl)
    .then(res => res.json())
    .then(json => {
      for (let i=0; i<json.length; i++) {
        let thisToy = json[i];
          // createToyDiv(toyDiv);
          const div = document.createElement("div");
          div.className = "card";
          toyDiv.appendChild(div);
          // createH2(thisToy.name);
          let h2 = document.createElement('h2');
          h2.innerHTML = thisToy.name; 
          div.appendChild(h2);

          let img = document.createElement('img');
          img.src = thisToy.image;
          img.className = "toy-avatar";
          div.appendChild(img);

          let p = document.createElement('p');
          p.innerHTML = `${thisToy.likes} likes`;
          div.appendChild(p);   

          let button = document.createElement('button');
          button.innerHTML = "Like";
          button.className = "like-btn";
        //   button.addEventListener('click', function(e) {
        //     console.log('clicked on this toy', thisToy)
        //     patchToy(thisToy)
        //     // .then(res => res.json())
        //     // .then(updatedToy => {
        //     //   p.textContent = '99 Likes';
        //     // // p.innerText = `${updatedToy.likes} Likes`;
        //     // toy = updatedToy;
        //   // })
        // })
          div.appendChild(button);
    }
    })
}

function makeNewToy (img, name){
   //store to db via fetch
   return fetch('http://localhost:3000/toys', {
     method: 'POST',
     headers: {
         "Content-Type": "application/json"
         // Accept: "application/json"
     },
     body: JSON.stringify({
         "name": name,
         "image": img,
         "likes": 0
       })
   })
};

function patchToy(toy) {
  // console.log("its kinda working")
  return fetch(`http://localhost:3000/toys/${toy.id}`, {
      method: "PATCH",
      headers:{
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify({
        "likes": `${toy.likes} +1` 
      })
    })
    
}

