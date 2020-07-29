/* Treehouse FSJS Techdegree
 * Project 5 - Public API Calls
 * scripts.js */

/*==================
*  Global variables
*=================*/

const peopleUrl = 'https://randomuser.me/api/?results=12&nat=US';
const employeeArray = [];

/*==================
*  Functions
*=================*/

/* checkStatus(response)
* Checks the status response from the API to verify the data is useable 
* @params {response} The response from the API */

function checkStatus(response){
  if (response.ok){
    return Promise.resolve(response);
  } else {
    return Promise.reject(new Error(response.statusText)); 
  }
};

/* generateEmployeeInfo(employees)
* Formats and inserts the employee data from the API call into the DOM
* @params {employees} The formatted JSON from the API */

const generateEmployeeInfo = (employees) => {
    const gallery = document.getElementById('gallery'); //selector for the gallery div
    
    employees.map(employee => { 
        // content for each individual card
        const card = `
            <div class='card'>
                <div class='card-img-container'>
                    <img class='card-img' src='${employee.picture.large}' alt='profile picture'>
                </div>
                <div class='card-info-container'>
                    <h3 id='name' class='card-name cap'>${employee.name.first} ${employee.name.last}</h3>
                    <p class='card-text'>${employee.email}</p>
                    <p class='card-text cap'>${employee.location.city}, ${employee.location.state}</p>
                </div>
            </div>
            `;
        employeeArray.push(card)
    })
    employeeArray.forEach(employee => {
        gallery.innerHTML += employee;
    })
    
    //Add an event listener on each card to generate modal windows on click
    
    const cardButton = document.querySelectorAll('.card');
    for( let i=0; i<cardButton.length; i++){
        cardButton[i].addEventListener('click', (e) =>{
            if(e.target === cardButton[i] || cardButton[i].contains(e.target)){
                generateModal(employees, i);
            }
        })
    }
}

/* generateModal(employees, index)
* Displays modal window for the employee selected by the user
* @params {employees} The formatted JSON from the API 
* @params {index} index value of the selected employee */

const generateModal = (employees, index) => {
    
    const employee = employees[index]; //Data of the employee the user clicked on
    
    const modalContainer = document.createElement('div'); //container for the window
    modalContainer.className = 'modal-container';
    
    let dob = `${employee.dob.date.substring(5, 7)}-${employee.dob.date.substring(8, 10)}-${employee.dob.date.substring(0, 4)}`; //reformatted date of birth
    
    //content for the modal window, to append to the container
    const modal = ` 
        <div class='modal'>
                <button type='button' id='modal-close-btn' class='modal-close-btn'><strong>X</strong></button>
                <div class='modal-info-container'>
                    <img class='modal-img' src='${employee.picture.large}' alt='profile picture'>
                    <h3 id='name' class='modal-name cap'>${employee.name.first} ${employee.name.last}</h3>
                    <p class='modal-text'>${employee.email}</p>
                    <p class='modal-text cap'>${employee.location.city}</p>
                    <hr>
                    <p class='modal-text'>${employee.phone}</p>
                    <p class='modal-text'>${employee.location.street.number} ${employee.location.street.name}<br> ${employee.location.city}, ${employee.location.state}<br> ${employee.location.postcode}</p>
                    <p class='modal-text'>Birthdate: ${dob}</p>
                </div>
            </div>
    `;
    
    modalContainer.innerHTML = modal;
    document.body.prepend(modalContainer);
    
    //event listener for the modal close button
    
    const closeButton  = document.getElementById('modal-close-btn');
    
    modalContainer.addEventListener('click', (e) =>{
       if(e.target === closeButton){
           document.body.removeChild(modalContainer);
           return;
       } 
    });
}

/*==================
*  On page load
*=================*/

//Fetch data from the API

fetch(peopleUrl)
    .then(checkStatus)
    .then(res => res.json())
    //.then(res => console.log(res))
    .then(data => generateEmployeeInfo(data.results))
    .catch(error => console.log('An error occured: ', error))