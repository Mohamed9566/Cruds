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



let current = document.getElementById('currentPassword');
let newPassword = document.getElementById('newPassword');
let confirmPassword = document.getElementById('confirmPassword');
let save = document.getElementById('save');

// Function to toggle password visibility
function togglePasswordVisibility() {
  let checkbox = document.getElementById("showPasswordCheckbox");
  
  // If the checkbox is checked, show the password
  if (checkbox.checked) {
    current.type = "text";
    newPassword.type = "text";
    confirmPassword.type = "text";
  } else {
    current.type = "password";
    newPassword.type = "password";
    confirmPassword.type = "password";
  }
}



// Add event listener to checkbox
document.getElementById("showPasswordCheckbox").addEventListener("change", togglePasswordVisibility);

// JavaScript for updating password functionality
document.getElementById("save").addEventListener("click", function(event) {
  event.preventDefault(); // Prevent the default form submission
  let currentPassword = document.getElementById('currentPassword').value;
  let newPassword = document.getElementById('newPassword').value;
  let confirmPassword = document.getElementById('confirmPassword').value;

  // Check if the current password matches the one stored in localStorage
  if (currentPassword === localStorage.getItem("savedPassword")) {
      // Check if the new password matches the confirm password
      if (newPassword === confirmPassword) {
          // Update the password in localStorage
          localStorage.setItem("savedPassword", newPassword);
          alert("Password updated successfully!");
      } else {
          alert("New password and confirm password do not match.");
      }
  } else {
      alert("Current password is incorrect.");
      

  }
});
