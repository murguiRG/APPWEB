let form = document.getElementById("form");
let input = document.getElementById("input");
let msg = document.getElementById("msg");
let posts = document.getElementById("posts");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  console.log("button clicked");
  formValidation();
});

let formValidation = () => {
  if (input.value === "") {
    msg.innerHTML = "Post cannot be blank";
    console.log("failure");
  } else {
    if (input.value.length <= 255) {
      console.log("successs");
      msg.innerHTML = "";
      acceptData();
    }
    else {
      msg.innerHTML = "Post overflows maximum length";
      console.log("failure");
    }
  }
};

//Aquí declaro "data" como un objeto
let data = {}; 

let acceptData = () => {
//Le asigno al objeto data la propiedad "text" y le doy el valor
//del input
  data["text"] = input.value;
  console.log(data);  
  createPost();
};

let createPost = () => {
  if (posts.div > "400px") {
    posts.div.p.style.text-overflow="ellipsis",overflow="hidden";
  }
  posts.innerHTML += `
  <div tittle=${data.text}>
    <p>${data.text}</p>
    <span class="options">
      <i onClick="editPost(this)" class="fas fa-edit"></i>
      <i onClick="deletePost(this)" class="fas fa-trash-alt"></i>
    </span>
  </div>
  `;
  input.value = "";
};

let deletePost = (e) => {
  e.parentElement.parentElement.remove();
};

let editPost = (e) => {
  input.value = e.parentElement.previousElementSibling.innerHTML;
  e.parentElement.parentElement.remove();
};
