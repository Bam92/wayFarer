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

if (form) {
   form.addEventListener('submit', (e) => {
      const login = form.elements.email.value;
      const password = form.elements.password.value;
      const first = form.elements.firstName.value
      const last = form.elements.lastName

      if (login !== null && password !== null && first !== null  && last !== null) {
            e.preventDefault();
            window.location.replace('./dashboard.html');
            return false;
      }
   });
}

