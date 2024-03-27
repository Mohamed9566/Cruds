
let title = document.getElementById('title');
let price = document.getElementById('price');
let taxes = document.getElementById('taxes');
let ads = document.getElementById('ads');
let discount = document.getElementById('discount');
let total = document.getElementById('total');
let create = document.getElementById('create');
let count = document.getElementById('count');
let category = document.getElementById('category');
let mood = 'create';
let tmp;

//getTotal function
if (location.reload){
  clearData();
}

function getTotal() { 
  if(price.value!=''){
    let result = ( +price.value + +taxes.value + +ads.value )
     - +discount.value ;
    total.innerHTML=result;
    total.style.background = '#040';
  } else{
    total.innerHTML="";
    total.style.background='red';
  }
}

//Create product 
let dataPro ;

if(localStorage.product != null ){
  dataPro = JSON.parse(localStorage.product)
}else{
  dataPro = [];
}





create.onclick = function() {
  // Check if title is empty
  if (title.value === '') {
      alert('Please enter a title.'); // Display an alert for the error message
      title.style.border = '1px solid red'; // Set red border to indicate the error
      return; // Exit the function if the title is empty
  } else {
      title.style.border = ''; // Remove the border style entirely
  }

  // Check if price is empty
  if (price.value === '') {
      alert('Please enter a price.'); // Display an alert for the error message
      price.style.border = '1px solid red'; // Set red border to indicate the error
      return; // Exit the function if the price is empty
  } else {
      price.style.border = ''; // Remove the border style entirely
  }

  // Check if category is empty
  if (category.value === '') {
      alert('Please enter a category.'); // Display an alert for the error message
      category.style.border = '1px solid red'; // Set red border to indicate the error
      return; // Exit the function if the category is empty
  } else {
      category.style.border = ''; // Remove the border style entirely
  }

  let newPro = {
      title: title.value.toLowerCase(),
      price: price.value,
      taxes: taxes.value,
      ads: ads.value,
      discount: discount.value,
      count: count.value,
      total: total.innerHTML,
      category: category.value.toLowerCase(),
  };

  if (title.value !== '' && price.value !== '' && category.value !== '') {
      if (mood === 'create') {
          dataPro.push(newPro);
      } else {
          dataPro[tmp] = newPro;
          mood = 'create';
          create.innerHTML = 'create';
      }
      clearData();
  }

  localStorage.setItem('product', JSON.stringify(dataPro));
  showData();
};







// Clear Data

function clearData(){
  title.value='';
  price.value='';
  taxes.value='';
  ads.value='';
  discount.value='';
  total.innerHTML='';
  count.value='';
  category.value='';
}

//Read

function showData(){
  getTotal()
  let table = '';

  for(let i=0; i < dataPro.length; i++){
    table +=`
      <tr>
                <td>${i+1}</td>
                <td>${dataPro[i].title}</td>
                <td>${dataPro[i].price}</td>
                <td>${dataPro[i].taxes}</td>
                <td>${dataPro[i].ads}</td>
                <td>${dataPro[i].discount}</td>
                <td>${dataPro[i].total}</td>
                <td>${dataPro[i].category}</td>
                <td>${dataPro[i].count}</td>
                <td><button onclick="updateData(${i})" id="update">update</button></td>
                <td><button onclick="deleteData( ${i}) " id="delete">delete</button></td>
              </tr>
    `
  }
  document.getElementById('tbody').innerHTML=table;
  let btnDelete = document.getElementById('deleteAll');
  if(dataPro.length > 0) {
    btnDelete.innerHTML= `
    <button onclick="deleteAll()" id="deleteAll">Delete All (${dataPro.length})</button>
    `
  }else { btnDelete.innerHTML = '' ;

  }
  
}


//DELETE 

function deleteData(i) {
  if(mood==='create'){
      if (confirm("Are you sure you want to delete this item?")) {
    dataPro.splice(i,1);
    localStorage.product=JSON.stringify(dataPro);
    showData();
    } 
  }
  

}
showData()

//Delete All Data 

function deleteAll(){
  if(mood==='create'){
    if (confirm("Are you sure you want to delete all items?")) {
    localStorage.clear();
    dataPro.splice(0);
    showData()
} 
  }
}

//update data

function updateData(i){
  title.value=dataPro[i].title;
  price.value=dataPro[i].price;
  taxes.value=dataPro[i].taxes;
  ads.value=dataPro[i].ads;
  discount.value=dataPro[i].discount;
  category.value=dataPro[i].category;
  count.value=dataPro[i].count;

  getTotal()

  create.innerHTML='update';
  mood='update';
  tmp=i;

  scroll({
    top:0,
    behavior:'smooth'
  })
}

// Search

let searchMood = 'title';
function getSearchMood(id){
  let search = document.getElementById('search');
  if (id=='searchTitle'){
    searchMood = 'title';
    search.placeholder = ('Search By Title');
  }else{
    searchMood = 'category';
    search.placeholder = ('Search By Category');
  }
  search.value='';
  showData()
  search.focus()
}

function searchData(value){
  let table = '';
  for(let i=0 ; i<dataPro.length; i++){
    if(searchMood == 'title'){
        if(dataPro[i].title.includes(value.toLowerCase())){
          table +=`
              <tr>
                        <td>${i+1}</td>
                        <td>${dataPro[i].title}</td>
                        <td>${dataPro[i].price}</td>
                        <td>${dataPro[i].taxes}</td>
                        <td>${dataPro[i].ads}</td>
                        <td>${dataPro[i].discount}</td>
                        <td>${dataPro[i].total}</td>
                        <td>${dataPro[i].category}</td>
                        <td>${dataPro[i].count}</td>
                        <td><button onclick="updateData(${i})" id="update">update</button></td>
                        <td><button onclick="deleteData( ${i}) " id="delete">delete</button></td>
                      </tr>
            ` ;
        }
      
    }else{
      
        if(dataPro[i].category.includes(value.toLowerCase())){
          table +=`
              <tr>
                        <td>${i+1}</td>
                        <td>${dataPro[i].title}</td>
                        <td>${dataPro[i].price}</td>
                        <td>${dataPro[i].taxes}</td>
                        <td>${dataPro[i].ads}</td>
                        <td>${dataPro[i].discount}</td>
                        <td>${dataPro[i].total}</td>
                        <td>${dataPro[i].category}</td>
                        <td>${dataPro[i].count}</td>
                        <td><button onclick="updateData(${i})" id="update">update</button></td>
                        <td><button onclick="deleteData( ${i}) " id="delete">delete</button></td>
                      </tr>
            ` ;
        }
      
    }
  }
    document.getElementById('tbody').innerHTML=table;

}

function openForm() {
  document.getElementById("myForm").style.display = "block";
  let overlay =document.getElementById('overlay');
  overlay.classList.add("show");

}

function closeForm() {
  document.getElementById("myForm").style.display = "none";
  let overlay =document.getElementById('overlay');
  overlay.classList.remove("show");
}



function addCategoryOption() {
  // Get the input element
  var categoryNameInput = document.getElementById("categoryName");
  
  // Get the select element
  var categorySelect = document.getElementById("category");
  
  // Get the value entered in the input field
  var categoryName = categoryNameInput.value;
  
  // Create a new option element
  var newOption = document.createElement("option");
  
  // Set the value and text of the new option
  newOption.value = categoryName;
  newOption.text = categoryName;
  
  // Append the new option to the select element
  categorySelect.appendChild(newOption);
  
  // Optionally, you can clear the input field after adding the option
  categoryNameInput.value = "";
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
let crud = document.querySelector(".crud");

toggle.onclick = function () {
  navigation.classList.toggle("active");
  crud.classList.toggle("active");
};


