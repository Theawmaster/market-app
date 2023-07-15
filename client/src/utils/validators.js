export const validatePassword = (password) => {
    // Requires at least 8 characters, 1 uppercase letter, 1 number, and 1 special character
    const passwordRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");
    return passwordRegex.test(password);
  };
  
  export const validateFile = (file) => {
    const allowedTypes = ["application/pdf", "image/png", "image/jpeg", "image/jpg"];
    if (allowedTypes.includes(file.type)) {
      return true;
    }
    return false;
  };  
  