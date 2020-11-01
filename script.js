///// VARIABLES

var employees = [];
const urlAPI = `https://randomuser.me/api/?results=12&inc=name,picture,email,location,phone,dob&noinfo&nat=US`;
const gridContainer = document.querySelector(".grid-container");
const overlay = document.querySelector(".overlay");
const modalContainer = document.querySelector("modal-content");
const modalClose = document.querySelector(".modal-close");

///// DISPLAY FUNCTIONS

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
    <div class="text-container">
      <h2 class="name">${name.first} ${name.last}</h2>
      <p class="email">${email}</p>
      <p class="address">${location.city}</p>
      <hr>
      <p class="phone">${phone}</p>
      <p class="address">${location.street}</p>
      <p class="birthdate">${date.getMonth()}/${date.getDate()}/${date.getFullYear()}</p>
    </div>
  `
  overlay.classList.remove("hidden");
  modalContainer.innerHTML = modalHTML;
}

///// FETCH API

fetch(urlAPI)
  .then(res => res.json())
  .then(res => res.results)
  .then(data => {
    displayEmployees(data);
    employees = data;
  })
  .catch(error => console.log('Sorry. There was an error with retreiving your data.', error))

  console.log(employees);

///// MODAL CLICK EVENT

gridContainer.addEventListener('click', e => {
  let selectedEmployee = e.target.closest('.card');
  let index = selectedEmployee.getAttribute('data-index');

  displayModal(index);
})

modalClose.addEventListener('click', () => {
  overlay.classList.add("hidden");
})
