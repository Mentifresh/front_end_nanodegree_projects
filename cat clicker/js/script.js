const catSection = $(".cat-collection");

// MODEL

let cats = [{
  "name": "bob",
  "picture": "img/1.jpg",
  "clicks": 0
},{
  "name": "flop",
  "picture": "img/2.jpg",
  "clicks": 0
},{
  "name": "bonkers",
  "picture": "img/3.jpg",
  "clicks": 0
},{
  "name": "johnny",
  "picture": "img/4.jpg",
  "clicks": 0
},{
  "name": "sneeky",
  "picture": "img/5.jpg",
  "clicks": 0
},{
  "name": "chip",
  "picture": "img/6.jpg",
  "clicks": 0
}
];


// OCTOPUS

let catNav = `<ul id="cat-list">`;
for (let i=0 ; i<cats.length; i++ ){
    catNav += `<li id="${cats[i].name}">${cats[i].name}</li>`;

}
catNav += `</ul>`;
catSection.html(catNav);

init();

document.getElementById("cat-list").addEventListener("click", function(event) {
  const catImage = document.getElementById("cat-image");
  removeClass();
  addClass(event);
  for (let cat of cats) {
    if (cat.name === event.target.id) {
      catImage.src = cat.picture;
      catImage.className = cat.name;
      document.getElementById("counter").innerHTML  = cat.clicks;
    }
  }
});

document.getElementById("cat-image").addEventListener("click", function(event) {
  for (let cat of cats) {
    if (cat.name === event.target.className) {
      cat.clicks++;
      document.getElementById("counter").innerHTML  = cat.clicks;
    }
  }
});

function removeClass() {
  $("#cat-list>li").removeClass("selected");
}

function addClass(event) {
  event.target.setAttribute("class", "selected");
}

function init() {
  catSection.append(`<p id="counter">${cats[0].clicks}</p>`);
  catSection.append(`<img class="${cats[0].name}" id="cat-image" src=${cats[0].picture}>`);
  document.getElementsByTagName("li")[0].className = "selected";
}
