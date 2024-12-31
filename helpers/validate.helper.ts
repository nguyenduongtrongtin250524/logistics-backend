const validateEmail = (email: string) => {
  return email
    .toLowerCase()
    .match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
}

const validatePassword = (password: string) => {
  return password
    .match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/);
}

const validatePhoneNumber = (phoneNumber: string) => {
  if (phoneNumber.length !== 10) return false;
  if (phoneNumber[0] !== '0') return false;
 
  return true;
}

const validateDate = (date: Date) => {
  return !isNaN(date.getTime());
}

const validateHelper = {
  validateEmail,
  validatePassword,
  validatePhoneNumber,
  validateDate
};
export default validateHelper;