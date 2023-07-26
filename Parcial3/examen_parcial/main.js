let form = document.getElementById("form");
let textInput = document.getElementById("textInput");
let dateInput = document.getElementById("dateInput");
let textarea = document.getElementById("textarea");
let msg = document.getElementById("msg");
let tasks = document.getElementById("tasks");
let add = document.getElementById("add");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  formValidation();
});

let formValidation = () => {
  if (textInput.value === "") {
    console.log("failure");
    msg.innerHTML = "Task cannot be blank";
  } else {
    console.log("success");
    msg.innerHTML = "";
    acceptData();
    add.setAttribute("data-bs-dismiss", "modal");
    add.click();

    (() => {
      add.setAttribute("data-bs-dismiss", "");
    })();
  }
};

let data = [{}];

let acceptData = () => {
  data.push({
    text: textInput.value,
    date: dateInput.value,
    description: textarea.value,
  });

  localStorage.setItem("data", JSON.stringify(data));

  console.log(data);
  createTasks();
};

let createTasks = () => {
  tasks.innerHTML = "";
  data.forEach((task, index) => {
    tasks.innerHTML += `
    <div data-text="${task.text}" data-date="${task.date}" data-description="${task.description}" id=${index}>
      <span class="fw-bold">${task.text}</span>
      <span class="small text-secondary">${task.date}</span>
      <p>${task.description}</p>
      <span class="options">
        <i onClick= "editTask(this)" data-bs-toggle="modal" data-bs-target="#form" class="fas fa-edit"></i>
        <i onClick ="deleteTask(this);createTasks()" class="fas fa-trash-alt"></i>
      </span>
    </div>
    `;
  });

  resetForm();
};


let deleteTask = (e) => {
  e.parentElement.parentElement.remove();
  data.splice(e.parentElement.parentElement.id, 1);
  localStorage.setItem("data", JSON.stringify(data));
  console.log(data);
  
};

let editTask = (e) => {

  let selectedTask = e.parentElement.parentElement;
  e.parentElement.parentElement.remove();

  textInput.value = selectedTask.getAttribute("data-text");
  dateInput.value = selectedTask.getAttribute("data-date");
  textarea.value = selectedTask.getAttribute("data-description");


};


let resetForm = () => {
  textInput.value = "";
  dateInput.value = "";
  textarea.value = "";
};

(() => {
  data = JSON.parse(localStorage.getItem("data")) || []
  console.log(data);
  createTasks();
})();