

// Retrieve item from local storage
let savedImage = localStorage.getItem('savedImage');
let brandName = localStorage.getItem('brandName');


// Check if the item exists in local storage
if (savedImage) {
    // Display item in the console
    var iconElement = document.getElementById('brandIcon').innerHTML= '<img src="' + savedImage + '" alt="Saved Image">';
}
// Check if the item exists in local storage
if (brandName) {
  // Display item in the console
  document.getElementById("brandNameNavbar").textContent =  brandName ;

}


// add hovered class to selected list item
let list = document.querySelectorAll(".navigation li");

function activeLink() {
  list.forEach((item) => {
    item.classList.remove("hovered");
  });
  this.classList.add("hovered");
}

list.forEach((item) => item.addEventListener("mouseover", activeLink));

// Menu Toggle
let toggle = document.querySelector(".toggle");
let navigation = document.querySelector(".navigation");
let main = document.querySelector(".main");

toggle.onclick = function () {
  navigation.classList.toggle("active");
  main.classList.toggle("active");
};
