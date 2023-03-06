class validateRegister {
  check = (username: string, password: string): string => {
    let regexpUsername = new RegExp(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/);
    let regexpPassword = new RegExp(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-1])(?=.*[!@#$%^?&*-])[a-zA-Z\d!@#$?%^&*-].{8,}$/
    );

    let resultUsername = regexpUsername.test(username);
    let resultPassword = regexpPassword.test(password);
    let result = '';

    if (resultUsername && resultPassword) {
      result = 'bothValid';
    } else if (!resultUsername && resultPassword) {
      result = 'usernameInvalid';
    } else if (resultUsername && !resultPassword) {
      result = 'passwordInvalid';
    } else if (!resultUsername && !resultPassword) {
      result = 'bothInvalid';
    }

    return result;
  };
}

export default new validateRegister();