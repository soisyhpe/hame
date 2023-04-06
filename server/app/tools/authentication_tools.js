const EMAIL = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/g
const FIRSTNAME = /^\w{1,32}$/g;
const LASTNAME = /^\w{1,64}$/g;
const BIRTHDATE = /^((0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[012])\/(?:19|20)\d\d)$/g;
const USERNAME = /^\w{3,16}$/g;
const PASSWORD = /^((?=\S*?[A-Z])(?=\S*?[a-z])(?=\S*?[0-9]).{6,})\S$/g;

function checkEmail(email) {
  return EMAIL.test(email)
}

function checkFirstName(firstName) {
  return FIRSTNAME.test(firstName);
}

function checkLastName(lastName) {
  return LASTNAME.test(lastName);
}

function checkBirthDate(birthDate) {
  return true;
}

function checkUserName(userName) {
  return USERNAME.test(userName);
}

function checkPassword(password) {
  return PASSWORD.test(password);
}

// specify which functions should be accessed from outside
module.exports = { checkEmail, checkFirstName, checkLastName, checkBirthDate, checkUserName, checkPassword }