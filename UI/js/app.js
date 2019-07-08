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
      // must be a string as this you@domain.com
      const passwordHelp = document.getElementById("helpPassword");
      const regPassword = /.+@.+\..+/;
      
      if (e.target.value === '') passwordHelp.textContent = "Field cannot be empty"; 
      else if (e.target.value.length < 9) passwordHelp.textContent = "Field must contain at least 9 charactors";
   });
   }

   const userCategory = document.getElementsByName('usr-login');
   
   for(let i = 0; i < userCategory.length; i += 1) {
  userCategory[i].addEventListener('change', (e) => {
         console.log(e.target.value);
    if (e.target.value === 'Admin') window.location.replace('./templates/adminDash.html');
         else if (e.target.value === 'User') window.location.replace('./templates/usrAccount.html');
      });

   }

/* Form submission */
const form = document.querySelector('form');

if (form) {
   form.addEventListener('submit', (e) => {
      const login = form.elements.email.value;
      const password = form.elements.password.value;
      const usrCategoy = form.elements.usrLogin.value;
      //console.log(usrCategoy);

      if (login !== null && password !== null && usrCategoy !== null) {
         if (usrCategoy === 'User') {
            e.preventDefault();
            window.location.replace('./templates/usrAccount.html');
            return false;

         } else if (usrCategoy === 'Admin') {
            e.preventDefault();
            window.location.replace('./adminDash.html');
            return false;
         }
      }
   });
}

// User Dashboard
document.getElementById('menu__user').addEventListener('click', () => {
   const sub = document.getElementById('sub__menu')
   if ( sub.classList.contains('menu__hide') ) sub.classList.remove('menu__hide');
   else sub.classList.add('menu__hide');
});