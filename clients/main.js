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



let clientName = document.getElementById('clientName');
let phoneNumber = document.getElementById('phoneNumber');
let region = document.getElementById('region');
let salesVolume=document.getElementById('salesVolume');
let mood = 'create';
let tmp;

//Create Client 
let dataClient ;

if(localStorage.client != null ){
  dataClient = JSON.parse(localStorage.client)
}else{
  dataClient = [];
}



create.onclick = function() {
  // Check if clientName is empty
  if (clientName.value === '') {
      alert('Please enter a Client Name.'); // Display an alert for the error message
      clientName.style.border = '1px solid red'; // Set red border to indicate the error
      return; // Exit the function if the clientName is empty
  } else {
      clientName.style.border = ''; // Remove the border style entirely
  }

  // Check if phoneNumber is empty
  if (phoneNumber.value === '') {
      alert('Please enter a Phone Number.'); // Display an alert for the error message
      phoneNumber.style.border = '1px solid red'; // Set red border to indicate the error
      return; // Exit the function if the phoneNumber is empty
  } else {
      phoneNumber.style.border = ''; // Remove the border style entirely
  }

  // Check if salesVolume is empty
  if (region.value === '') {
      alert('Please enter a Region.'); // Display an alert for the error message
      region.style.border = '1px solid red'; // Set red border to indicate the error
      return; // Exit the function if the salesVolume is empty
  } else {
      region.style.border = ''; // Remove the border style entirely
  }

  let newClient = {
      clientName: clientName.value.toLowerCase(),
      phoneNumber: phoneNumber.value,
      region: region.value.toLowerCase(),
      salesVolume: salesVolume.value,
      
  };

  if (clientName.value !== '' && phoneNumber.value !== '' && region.value !== '') {
      if (mood === 'create') {
          dataClient.push(newClient);
      } else {
          dataClient[tmp] = newClient;
          mood = 'create';
          create.innerHTML = 'create';
      }
      clearData();
  }

  localStorage.setItem('client', JSON.stringify(dataClient));
  showData();
};



function clearData(){
  clientName.value='';
  phoneNumber.value='';
  region.value='';
  
}




function showData(){
  let table = '';

  for(let i=0; i < dataClient.length; i++){
    table +=`
      <tr>
                <td>${i+1}</td>
                <td>${dataClient[i].clientName}</td>
                <td>${dataClient[i].phoneNumber}</td>
                <td>${dataClient[i].region}</td>
                <td>${dataClient[i].salesVolume}</td>
                
                <td><button onclick="updateData(${i})" id="update">update</button></td>
                <td><button onclick="deleteData( ${i}) " id="delete">delete</button></td>
              </tr>
    `
  }
  document.getElementById('tbody').innerHTML=table;
  let btnDelete = document.getElementById('deleteAll');
  if(dataClient.length > 0) {
    btnDelete.innerHTML= `
    <button onclick="deleteAll()" id="deleteAll">Delete All (${dataClient.length})</button>
    `
  }else { btnDelete.innerHTML = '' ;

  }
  
}

//DELETE 

function deleteData(i) {
  if(mood==='create'){
    if (confirm("Are you sure you want to delete this item?")) {
      dataClient.splice(i,1);
      localStorage.client=JSON.stringify(dataClient);
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
        dataClient.splice(0);
        showData()
    }
  }

}

//update data

function updateData(i){
  clientName.value=dataClient[i].clientName;
  phoneNumber.value=dataClient[i].phoneNumber;
  region.value=dataClient[i].region;
  

  create.innerHTML='update';
  mood='update';
  tmp=i;

  scroll({
    top:0,
    behavior:'smooth'
  })
}




  function searchData(value) {
    let table = '';
    for (let i = 0; i < dataClient.length; i++) {
        if (dataClient[i].clientName.toLowerCase().includes(value.toLowerCase())) {
            table += `
                <tr>
                    <td>${i + 1}</td>
                    <td>${dataClient[i].clientName}</td>
                    <td>${dataClient[i].phoneNumber}</td>
                    <td>${dataClient[i].region}</td>
                    <td>${dataClient[i].salesVolume}</td>
                    <td><button onclick="updateData(${i})" id="update">update</button></td>
                    <td><button onclick="deleteData(${i})" id="delete">delete</button></td>
                </tr>
            `;
        }
    }
    document.getElementById('tbody').innerHTML = table;
    showData(); // Assuming this function exists
}




// Search

function searchData(value) {
  let filteredData = dataClient.filter(client =>
      client.clientName.toLowerCase().includes(value.trim().toLowerCase())
  );
  let table = '';
  filteredData.forEach((client, index) => {
      table += `
          <tr>
              <td>${index + 1}</td>
              <td>${client.clientName}</td>
              <td>${client.phoneNumber}</td>
              <td>${client.region}</td>
              <td>${client.salesVolume}</td>
              <td><button onclick="updateClient(${index})">Update</button></td>
              <td><button onclick="deleteClient(${index})">Delete</button></td>
          </tr>
      `;
  });
  document.getElementById('tbody').innerHTML = table;
}

showData();


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
let clients = document.querySelector(".clients");

toggle.onclick = function () {
  navigation.classList.toggle("active");
  clients.classList.toggle("active");
};
