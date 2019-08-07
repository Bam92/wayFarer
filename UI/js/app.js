// Sign Up
if (document.getElementById('firstName', 'lastName', 'email', 'password') != null) {
  const firstName = document.getElementById('firstName');
  const lastName = document.getElementById('lastName');
  const email = document.getElementById('email');
  const password = document.getElementById('password');

  firstName.addEventListener('blur', (e) => {
    const firstNameHelp = document.getElementById('helpFirstName');

    if (e.target.value === '') firstNameHelp.textContent = 'Field cannot be empty';
    if (e.target.value.length === 1) firstNameHelp.textContent = 'Field must contain at least 2 letters';
    else if (e.target.value.length > 1) firstNameHelp.textContent = '';
  });

  lastName.addEventListener('blur', (e) => {
    const lastNameHelp = document.getElementById('helpLastName');

    if (e.target.value === '') lastNameHelp.textContent = 'Field cannot be empty';
    if (e.target.value.length === 1) lastNameHelp.textContent = 'Field must contain at least 2 letters';
    else if (e.target.value.length > 1) lastNameHelp.textContent = '';
  });

  email.addEventListener('blur', (e) => {
    // must be a string as this you@domain.com
    const emailHelp = document.getElementById('helpEmail');
    const regEmail = /.+@.+\..+/;

    if (e.target.value === '') emailHelp.textContent = 'Field cannot be empty';
    else if (!regEmail.test(e.target.value)) emailHelp.textContent = 'Invalid email address';
    else if (regEmail.test(e.target.value)) emailHelp.textContent = '';
  });

  password.addEventListener('blur', (e) => {
    const passwordHelp = document.getElementById('helpPassword');

    if (e.target.value === '') passwordHelp.textContent = 'Field cannot be empty';
    else if (e.target.value.length < 9) passwordHelp.textContent = 'Field must contain at least 9 charactors';
    else if (e.target.value.length >= 9) passwordHelp.textContent = '';
  });
}

/* Form submission */
const form = document.querySelector('form');

// login user
const loginUser = (login, pass) => {
  if (login && pass && login !== '' && pass !== '') window.location.replace('./book.html');
  if (login && pass && login === 'admin@wayfarer.cd' && pass === 'admin123@') window.location.replace('./admin-trips.html');
};

// register user
const RegisterUser = (login, first, last, pass) => {
  if (login && pass && first && last && login !== '' && pass !== '' && first !== '' && last !== '') window.location.replace('./book.html');
};

if (form) {
  form.addEventListener('submit', (e) => {
    const login = form.elements.email.value;
    const password = form.elements.password.value;
    if (form.elements.length > 3) {
      const first = form.elements.firstName.value;
      const last = form.elements.lastName.value;
    }
    e.preventDefault();

    loginUser(login, password);
    if (first && last) RegisterUser(login, first, last, password);
  });
}

// User Dashboard
const userMenu = document.getElementById('menu__user');
if (userMenu) {
  userMenu.addEventListener('click', () => {
    const sub = document.getElementById('sub__menu');
    if (sub.classList.contains('menu__hide')) {
      sub.classList.remove('menu__hide');
      document.getElementById('popover__menu').style.display = 'block';
    } else {
      sub.classList.add('menu__hide');
      document.getElementById('popover__menu').style.display = 'none';
    }
  });
}

// Confirm deletion
const deleteButton = document.querySelector('[deleteBooking]');
if (deleteButton) {
  deleteButton.addEventListener('click', () => {
    alert('Are you sure you want to delete this booking');
    //document.write('Booking deleted');
  });
}

// View trips
const show = document.getElementById('trips__show');
if (show) {
  show.addEventListener('click', () => {
    const elts = document.getElementsByClassName('trips__all');

    while (elts[0]) elts[0].classList.remove('trips__all');

    show.id = 'trips__hide';
    show.innerHTML = 'View less trips (3)';
  });
}

const hide = document.getElementById('trips__hide');

if (hide) {
  hide.addEventListener('click', () => {
    const elts = document.getElementsByClassName('list__toggle');

    while (elts[0]) {
      elts[0].classList.add('trips__all');
    }

    hide.id = 'trips__show';
    hide.innerHTML = 'View all trips';
  });
}

const getTripCards = document.querySelectorAll('.card__trip__bloc1');
if (getTripCards) {

  for (let i = 0; i < getTripCards.length; i += 1) {
    console.log(getTripCards[i])
    getTripCards[i].style.background = `url("../images/trips/${i+1}.jpg")`;
    getTripCards[i].style.backgroundSize = 'cover';
    getTripCards[i].style.backgroundPosition = 'center';
    getTripCards[i].style.backgroundRepeat = 'no-repeat';
  }
}

// Modal
const modal = document.getElementById('modal');
const openModal1 = document.getElementById('modal__call1');
const openModal2 = document.getElementById('modal__call2');
const openModal3 = document.getElementById('modal__call3');
const openModal4 = document.getElementById('modal__call4');
const openModal5 = document.getElementById('modal__call5');
const openModal6 = document.getElementById('modal__call6');
const closeModal = document.getElementsByClassName('close')[0];

if (openModal1) {
  openModal1.addEventListener('click', () => {
    modal.style.display = 'block';
  });
}

if (openModal2) {
  openModal2.addEventListener('click', () => {
    modal.style.display = 'block';
  });
}

if (openModal3) {
  openModal3.addEventListener('click', () => {
    modal.style.display = 'block';
  });
}

if (openModal4) {
  openModal4.addEventListener('click', () => {
    modal.style.display = 'block';
  });
}

if (openModal5) {
  openModal5.addEventListener('click', () => {
    modal.style.display = 'block';
  });
}

if (openModal6) {
  openModal6.addEventListener('click', () => {
    modal.style.display = 'block';
  });
}

if (closeModal) {
  closeModal.addEventListener('click', () => {
    modal.style.display = 'none';
  });
}

window.addEventListener('click', e => {
  if (e.target === modal) modal.style.display = 'none';
});
