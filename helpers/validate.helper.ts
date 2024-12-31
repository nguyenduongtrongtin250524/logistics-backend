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

const validateVehicleLicensePlate = (licensePlate: string) => {
  return licensePlate
    .match(/^[0-9]{2}-[A-BD-FG-HKLMNPST-U-VXYZ]{1,2}[0-9]{0,1}[0-9]{5}$/);
}

const validateHelper = {
  validateEmail,
  validatePassword,
  validatePhoneNumber,
  validateDate,
  validateVehicleLicensePlate
};
export default validateHelper;