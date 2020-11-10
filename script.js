///// VARIABLES

var employees = [];
const urlAPI = `https://randomuser.me/api/?results=12&inc=name,picture,email,location,phone,dob&noinfo&nat=US`;
const gridContainer = document.querySelector(".grid-container");
const overlay = document.querySelector(".overlay");
const modalContainer = document.querySelector(".modal-content");
const modalClose = document.querySelector(".modal-close");
const searchName = document.querySelector(".search-input");
const arrowRight = document.querySelector(".arrow-right");
const arrowLeft = document.querySelector(".arrow-left");

/************************
 DISPLAY FUNCTIONS
************************/

function displayEmployees(employeeData) {
  employees = employeeData;

  let employeeHTML = '';

  employees.forEach((employee, index) => {
    let name = employee.name;
    let email = employee.email;
    let location = employee.location;
    let picture = employee.picture;

  // add employees to html
    employeeHTML += `
    <div class="card" data-index="${index}">
      <img class="avatar" src="${picture.large}" alt="">
      <div class="text-container">
        <h2 class="name">${name.first} ${name.last}</h2>
        <p class="email">${email}</p>
        <p class="address">${location.city}</p>
      </div>
    </div>
    `
  });

  gridContainer.innerHTML = employeeHTML;

}

function displayModal (index) {
  let { name, dob, phone, email, location: {city, street, state, postcode}, picture } = employees[index];
  let date = new Date(dob.date);

  const modalHTML= `
    <img class="avatar" src="${picture.large}" alt="">
    <div class="text-container ">
      <h2 class="name">${name.first} ${name.last}</h2>
      <p class="email">${email}</p>
      <p class="address">${city}</p>
      <hr>
      <p class="phone">${phone}</p>
      <p class="address">${street.number} ${street.name}</p>
      <p class="birthdate">${date.getMonth()}/${date.getDate()}/${date.getFullYear()}</p>
    </div>
  `
  overlay.classList.remove("hidden");

  modalContainer.innerHTML = modalHTML;
  modalContainer.setAttribute('data-index', `${index}`);
}

/************************
  FETCH API
************************/

fetch(urlAPI)
  .then(res => res.json())
  .then(res => res.results)
  .then(data => {
    displayEmployees(data);
    employees = data;
    console.log(employees);
  })
  .catch(error => console.log('Sorry. There was an error with retreiving your data.', error))

/************************
MODAL EVENT LISTENER
************************/

gridContainer.addEventListener('click', e => {
  let selectedEmployee = e.target.closest('.card');
  let index = selectedEmployee.getAttribute('data-index');

  displayModal(index);
})

modalClose.addEventListener('click', () => {
  overlay.classList.add("hidden");
})

/************************
 MODAL ARROW BUTTONS
************************/

overlay.addEventListener('click', e => {
  let arrow = e.target;
  let index = parseInt(modalContainer.getAttribute('data-index'));
  if (arrow === arrowRight && index < employees.length) {
    index += 1;
    displayModal(index);
  } else if (arrow === arrowLeft && index !== 0) {
    index -= 1;
    displayModal(index);
  }
})

/************************
 SEARCH BAR
************************/

searchName.addEventListener('keyup', () => {

// Translate user's (case insensitive) search input to RegExp

  let searchTerm = searchName.value;
  let regexSearchTerm = new RegExp(`${searchTerm}`, 'i');
  const employeeList = document.querySelectorAll(".card");

// Iterate through employees array to test RegExp against each caption

  employeeList.forEach( (employee, i) => {
    let employeeName = employeeList[i].querySelector(".name").innerHTML;
    if (regexSearchTerm.test(employeeName)) {
      // Show only images that match
      employeeList[i].classList.remove("hidden")
    } else {
      employeeList[i].classList.add("hidden")
    }
  });
});
