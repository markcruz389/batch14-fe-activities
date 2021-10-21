const urlSearchParams = new URLSearchParams(window.location.search);
const params = Object.fromEntries(urlSearchParams.entries());
const spanEmail = document.querySelector('#submitted-email');

spanEmail.innerHTML = params.email;

console.log (params)