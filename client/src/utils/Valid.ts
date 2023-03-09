import { IUserRegister } from "./TypeScript";

export const validRegister = (userRegister: IUserRegister) => {
  const { name, account, password, confirmPassword } = userRegister;

  const errors: string[] = [];

  if (!name) {
    errors.push("Please add your name.");
  } else if (name.length > 20) {
    errors.push("Your name is up to 20 chars long.");
  }

  if (!account) {
    errors.push("Please add your email or phone number.");
  } else if (!validPhoneNumber(account) && !validateEmail(account)) {
    errors.push("Email or phone number format is incorrect.");
  }

  if (password.length < 6) {
    errors.push("Password must be at least 6 chars.");
  } else if (password !== confirmPassword) {
    errors.push("Confirm password did not match.");
  }
  return {
    errorMessage: errors,
    errorLength: errors.length,
  };
};

export const validPhoneNumber = (phoneNumber: string) => {
  const re = /([\+84|84|0]+(3|5|7|8|9|1[2|6|8|9]))+([0-9]{8})\b/g;
  return re.test(phoneNumber);
};

export const validateEmail = (email: string) => {
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
};
