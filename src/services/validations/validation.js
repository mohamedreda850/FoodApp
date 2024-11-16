export const EMAIL_VALIDATION = {
  required: "Email is required",
  pattern: {
    value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g,
    message: "Invalid email address",
  },
};
export const PASSWORD_VALIDATION = {
  required: "Password is required",
  pattern: {
    value:
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
    message:
      "Password must be at least 8 characters long, contain at least one uppercase letter, one lowercase letter, one number, and one special character",
  },
};

export const PHONE_NUMBER_VALIDATION = {
    required: "Phone number is required",
    pattern: {
      value: /^(010|011|012|015)[0-9]{8}$/,
      message: "please enter egyption number",
    },
  };export const NAME_VALIDATION = {
    required: "Name is required",
    pattern: {
      value: /^(?=.*\d)[^\s]{1,8}$/,
      message: "Name must be up to 8 characters long, contain at least one number, and not contain any spaces",
    },
  };