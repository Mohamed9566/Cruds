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
}

const display = document.querySelector(".display");
const input = document.querySelector("#upload");
const slider = document.querySelector(".zoom-slider");
const saveButton = document.getElementById("save"); // Change to save button reference

let currentScale = 1;
let isDragging = false;
let initialX, initialY, offsetX = 0, offsetY = 0;

// Check if there's a saved image in local storage
const savedImage = localStorage.getItem("savedImage");
if (savedImage) { 
  const img = new Image();
  img.src = savedImage;
  img.onload = () => {
    display.innerHTML = ""; // Clear existing content
    display.appendChild(img); // Append the saved image to the display
    currentScale = parseFloat(localStorage.getItem("savedScale")) || 1; // Load saved scale value
    applyScale(); // Apply saved scale value
  };
}

input.addEventListener("change", () => {
  let reader = new FileReader();
  reader.readAsDataURL(input.files[0]);
  reader.addEventListener("load", () => {
    display.innerHTML = `<img src=${reader.result} alt=''/>`;
    currentScale = 1;
    applyScale();

    // Update savedImage in local storage
    localStorage.setItem("savedImage", reader.result); // Update savedImage with new image URL
  });
});


slider.addEventListener("input", () => {
  currentScale = parseFloat(slider.value) / 100;
  applyScale();
});

function applyScale() {
  const img = display.querySelector("img");
  if (img) {
    img.style.transform = `scale(${currentScale})`;
  }
}

display.addEventListener("mousedown", (event) => {
  if (event.target.tagName === "IMG") {
    isDragging = true;
    initialX = event.clientX - offsetX;
    initialY = event.clientY - offsetY;
    event.target.style.cursor = 'grabbing'; // Change cursor when dragging
  }
});

document.addEventListener("mouseup", () => {
  if (isDragging) {
    isDragging = false;
    const img = display.querySelector("img");
    img.style.cursor = 'grab'; // Restore cursor when dragging ends
  }
});

document.addEventListener("mousemove", (event) => {
  if (isDragging) {
    event.preventDefault();
    offsetX = event.clientX - initialX;
    offsetY = event.clientY - initialY;
    updatePosition();
  }
});

function updatePosition() {
  const img = display.querySelector("img");
  img.style.left = offsetX + "px";
  img.style.top = offsetY + "px";
}

let brandNameInput = document.getElementById("brandName");
let primaryPhoneInput = document.getElementById("primaryPhone");
let secondaryPhoneInput = document.getElementById("secondaryPhone");
let locationInput = document.getElementById("location");

let savedBrandName = localStorage.getItem('brandName');
let savedPrimaryPhone = localStorage.getItem('primaryPhone');
let savedSecondaryPhone = localStorage.getItem('secondaryPhone');
let savedLocation = localStorage.getItem('location');
    // Displaying brandName in the <span> element
    document.getElementById("brandNameSpan").textContent = '(' + savedBrandName + ')';
    document.getElementById("brandNameNavbar").textContent =   savedBrandName ;



saveButton.addEventListener("click", function(event) {
  event.preventDefault(); // This prevents the default behavior

   // Getting the values
   let brandName = brandNameInput.value;
   let primaryPhone = primaryPhoneInput.value;
   let secondaryPhone = secondaryPhoneInput.value;
   let location = locationInput.value;
 
   if (brandName === '') {
     alert('Please enter a Brand Name.'); // Display an alert for the error message
     brandNameInput.style.border = '1px solid red'; // Set red border to indicate the error
     return; // Exit the function if the brandName is empty
   } else {
     brandNameInput.style.border = ''; // Resetting border style
   }
 
   if (primaryPhone === '') {
     alert('Please enter a Primary Phone .'); // Display an alert for the error message
     primaryPhoneInput.style.border = '1px solid red'; // Set red border to indicate the error
     return; // Exit the function if the primaryPhone is empty
   } else {
     primaryPhoneInput.style.border = ''; // Resetting border style
   }
 
   if (location === '') {
     alert('Please enter Yout Location .'); // Display an alert for the error message
     locationInput.style.border = '1px solid red'; // Set red border to indicate the error
     return; // Exit the function if the primaryPhone is empty
   } else {
     locationInput.style.border = ''; // Resetting border style
   }
       // Saving variables in local storage
   localStorage.setItem('brandName', brandName);
   localStorage.setItem('primaryPhone', primaryPhone);
   localStorage.setItem('secondaryPhone', secondaryPhone);
   localStorage.setItem('location', location);
 
     // Setting the content of the span element with the updated brand name
     document.getElementById("brandNameSpan").textContent = '(' + brandName + ')';
     document.getElementById("brandNameNavbar").textContent =   brandName ;



  // Image saving functionality
  const img = display.querySelector("img");
  if (img) {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    canvas.width = img.width * currentScale;
    canvas.height = img.height * currentScale;
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    const dataURL = canvas.toDataURL(); // Get the data URL of the canvas
    localStorage.setItem("savedImage", dataURL); // Save the data URL to local storage
    localStorage.setItem("savedScale", currentScale); // Save the current scale value
    alert("Image saved to local storage!");
    // window.location.href = "page2.html"; // Redirect to another page
  } else {
    alert("No image to save!");
  }
});

let brandIcon=savedImage;
localStorage.setItem("savedImage", dataURL); // Save the data URL to local storage

console.log(brandIcon);
