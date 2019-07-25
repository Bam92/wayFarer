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
   });
   
   lastName.addEventListener("blur", function(e) {
      const firstNameHelp = document.getElementById("helpLastName");
   
      if (e.target.value === "") firstNameHelp.textContent = "Field cannot be empty";      
      if (e.target.value.length === 1) firstNameHelp.textContent = "Field must contain at least 2 letters";
   });
   
   email.addEventListener("blur", function(e) {
      // must be a string as this you@domain.com
      const emailHelp = document.getElementById("helpEmail");
      const regEmail = /.+@.+\..+/;
      
      if (e.target.value === '') emailHelp.textContent = "Field cannot be empty"; 
      else if (!regEmail.test(e.target.value)) emailHelp.textContent = "Invalid email address";
   });
   
   password.addEventListener("blur", function(e) {
      const passwordHelp = document.getElementById("helpPassword");
      const regPassword = /.+@.+\..+/;
      
      if (e.target.value === '') passwordHelp.textContent = "Field cannot be empty"; 
      else if (e.target.value.length < 9) passwordHelp.textContent = "Field must contain at least 9 charactors";
   });
   }

/* Form submission */
const form = document.querySelector('form');

if (form) {
   form.addEventListener('submit', (e) => {
      const login = form.elements.email.value;
      const password = form.elements.password.value;

      if (login !== null && password !== null && usrCategoy !== null) {
         if (usrCategoy === 'User') {
            e.preventDefault();
            window.location.replace('./templates/usrAccount.html');
            return false;

      if (login !== null && password !== null) {
            e.preventDefault();
            window.location.replace('./dashboard.html');
            return false;
      }
   });
}

// User Dashboard
/*document.getElementById('menu__user').addEventListener('click', () => {
   const sub = document.getElementById('sub__menu')
   if ( sub.classList.contains('menu__hide') ) sub.classList.remove('menu__hide');
   else sub.classList.add('menu__hide');
});*/

// View trips
const show = document.getElementById('trips__show')
show.addEventListener('click', () => {
   const elts = document.getElementsByClassName('trips__all')

   while (elts[0]) {
      elts[0].classList.remove('trips__all')
   }

   show.id = 'trips__hide'
   show.innerHTML = 'View less trips'
});

const hide = document.getElementById('trips__hide')
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