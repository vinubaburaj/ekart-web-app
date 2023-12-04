export const emailValidator = (email) => {
  const emailRegex = /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/;
  return emailRegex.test(email);
}

export const checkPassword = (password, confirmPassword) => {
  return password === confirmPassword;
}