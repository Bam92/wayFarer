// Sign Up
   if (document.getElementById("firstName", "lastName", "email", "password") != null) {
       const firstName = document.getElementById("firstName");
       const lastName = document.getElementById("lastName");
       const email = document.getElementById("email");
       const password = document.getElementById("password");

   firstName.addEventListener("blur", function(e) {
      const firstNameHelp = document.getElementById("helpFirstName");

      if (e.target.value === '') firstNameHelp.textContent = "Field cannot be empty";      
      if (e.target.value.length === 1) firstNameHelp.textContent = "Field must contain at least 2 letters";
      else if (e.target.value.length > 1) firstNameHelp.textContent = ""
   });
   
   lastName.addEventListener("blur", function(e) {
      const lastNameHelp = document.getElementById("helpLastName");
   
      if (e.target.value === "") lastNameHelp.textContent = "Field cannot be empty";      
      if (e.target.value.length === 1) lastNameHelp.textContent = "Field must contain at least 2 letters";
      else if (e.target.value.length > 1) lastNameHelp.textContent = ""
   });
   
   email.addEventListener("blur", function(e) {
      // must be a string as this you@domain.com
      const emailHelp = document.getElementById("helpEmail");
      const regEmail = /.+@.+\..+/;
      
      if (e.target.value === '') emailHelp.textContent = "Field cannot be empty"; 
      else if (!regEmail.test(e.target.value)) emailHelp.textContent = "Invalid email address";
      else if (regEmail.test(e.target.value)) emailHelp.textContent = "";
   });
   
   password.addEventListener("blur", function(e) {
      const passwordHelp = document.getElementById("helpPassword");
      
      if (e.target.value === '') passwordHelp.textContent = "Field cannot be empty"; 
      else if (e.target.value.length < 9) passwordHelp.textContent = "Field must contain at least 9 charactors";
      else if (e.target.value.length >= 9) passwordHelp.textContent = "";
   });
   }

/* Form submission */
const form = document.querySelector('form');

// login user
const loginUser = (login, pass) => {
  if (login && pass && login !== '' && pass !== '') window.location.replace('./dashboard.html');
}

// register user
const RegisterUser = (login, first, last, pass) => {
  if (login && pass && first && last && login !== '' && pass !== '' && first !== '' && last !== '') window.location.replace('./dashboard.html');
}

if (form) {
   form.addEventListener('submit', (e) => {
      const login = form.elements.email.value;
      const password = form.elements.password.value;
      if (form.elements.length > 3) {
      const first = form.elements.firstName.value;
      const last = form.elements.lastName.value;}
      e.preventDefault();

      loginUser(login, password);
      if (first && last) RegisterUser(login, first, last, password);
   });
}


// User Dashboard
const userMenu = document.getElementById('menu__user')
if (userMenu) {
userMenu.addEventListener('click', () => {
   const sub = document.getElementById('sub__menu')
   if ( sub.classList.contains('menu__hide') ) sub.classList.remove('menu__hide');
   else sub.classList.add('menu__hide');
});
}
  
// View trips
const show = document.getElementById('trips__show')
if (show) {
show.addEventListener('click', () => {
   const elts = document.getElementsByClassName('trips__all')

   while (elts[0]) elts[0].classList.remove('trips__all')
  
   show.id = 'trips__hide'
   show.innerHTML = 'View less trips (3)'
});
}

const hide = document.getElementById('trips__hide')

console.log('test')
if (hide) {
hide.addEventListener('click', () => {
   console.log('ok')
   const elts = document.getElementsByClassName('list__toggle')
   console.log(elts.length)
   
   while (elts[0]) {
      elts[0].classList.add('trips__all')
   }

   hide.id = 'trips__show'
   hide.innerHTML = 'View all trips'
});
}

