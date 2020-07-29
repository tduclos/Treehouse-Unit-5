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
    const gallery = document.getElementById("gallery");
    employees.map(employee => {
        const card = `
            <div class="card">
                <div class="card-img-container">
                    <img class="card-img" src="${employee.picture.large}" alt="profile picture">
                </div>
                <div class="card-info-container">
                    <h3 id="name" class="card-name cap">${employee.name.first} ${employee.name.last}</h3>
                    <p class="card-text">${employee.email}</p>
                    <p class="card-text cap">${employee.location.city}, ${employee.location.state}</p>
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
                console.log(`Clicked ${i}`);
                //generateModal(users, i);
            }
        })
    }
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
    .catch(error => console.log("An error occured: ", error))