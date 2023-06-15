//1a
document.getElementById("demo").innerHTML = "This is a nice text";
//1b
const input1 = document.getElementById("intro");
//1c
document.getElementById("demo").innerHTML="Your name goes here";
//1d
document.getElementById("tittle").innerHTML = "This is a good tittle";

//2a
let pElements = document.getElementsByName("paragraph");
console.log(`La cantidad de elementos <p> en el HTML es:
${pElements.length}`)
//2b
let main = document.getElementById("main");
console.log(main);
let p = main.getElementsByTagName("p");
console.log(p);

//3a
let className = document.getElementsByClassName("intro");
console.log(className);

//4a
let className2 = document.querySelectorAll("p.intro");
//4b
let listItems = document.querySelectorAll("ul > li");
console.log(listItems);
//4c
let h1Element = document.querySelector("h1");
console.log(h1Element);
//4d
let list = document.querySelector(".list");
console.log(list);
//4e
let liElements = document.querySelectorAll("ul > li");
liElements.forEach(item => {
    console.log(item);
})
//4f
let h1 = document.querySelector("h1");
h1.style.color = "green";

//5a
let form = document.getElementById["form1"];
let formValues = "";
for (let i = 0; i < form.elements.length; i++) {
    formValues += form.elements[i].value + "<br>";    
}
document.getElementById("formContent").innerHTML = formValues;
console.log(form);

//6a
let list1 = document.createElement("ul");
document.body.appendChild(list1);

let li1 = document.createElement("li");
li1.textContent = "Jaguar";
list1.appendChild(li1);

let li2 = document.createElement("li");
li2.textContent = "Jenko";
list1.appendChild(li2);
