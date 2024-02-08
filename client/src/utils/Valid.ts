import { IUserRegister } from "./TypeScript";
import { IBlog } from "../redux/types/blogType";

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

  const check = checkPassword(password, confirmPassword);
  if (check) errors.push(check);

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

export const checkPassword = (password: string, confirmPassword: string) => {
  if (password.length < 6) {
    return "Password must be at least 6 chars.";
  } else if (password !== confirmPassword) {
    return "Confirm password did not match.";
  }
};

export const validCreateBlog = ({
  user,
  title,
  content,
  description,
  thumbnail,
  category,
}: IBlog) => {
  const errors: string[] = [];

  if (title.trim().length < 10) {
    errors.push("Title has at least 10 characters.");
  } else if (title.trim().length > 50) {
    errors.push("Title is up to 50 characters long.");
  }
  if (content.trim().length < 2000) {
    errors.push("Content has at least 2000 characters.");
  }

  if (description.trim().length < 50) {
    errors.push("Description has at least 50 characters.");
  } else if (description.trim().length > 200) {
    errors.push("Description is up to 200 characters long.");
  }

  if (!thumbnail) {
    errors.push("Thumbnail cannot be left blank.");
  }

  if (!category) {
    errors.push("Category cannot be left blank.");
  }

  return {
    errorMessage: errors,
    errorsLength: errors.length,
  };
};
