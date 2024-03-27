let userName=document.getElementById('username');
let passWord=document.getElementById('password');
let login=document.getElementById('login');

// Function to toggle password visibility
function togglePasswordVisibility() {
  let passwordInput = document.getElementById("password");
  let checkbox = document.getElementById("showPasswordCheckbox");
  
  // If the checkbox is checked, show the password
  if (checkbox.checked) {
    passwordInput.type = "text";
  } else {
    passwordInput.type = "password";
  }
}

// Add event listener to checkbox
document.getElementById("showPasswordCheckbox").addEventListener("change", togglePasswordVisibility);



// JavaScript for login functionality
document.addEventListener("DOMContentLoaded", function() {
  // Save the initial password to localStorage if not already present
  if (!localStorage.getItem("savedPassword")) {
      localStorage.setItem("savedPassword", "admin");
  }
});

// Login functionality
document.getElementById("login").addEventListener("click", function(event) {
  event.preventDefault(); // Prevent the default form submission
  var username = document.getElementById("username").value;
  var password = document.getElementById("password").value;

  // Check if username and password match
  if (username === "admin" && password === localStorage.getItem("savedPassword")) {
      // Redirect to another page
      window.location.href = "home/home.html";
  } else {
      alert("Invalid username or password. Please try again.");
  }
});
