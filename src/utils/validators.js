module.exports.validateRegisterInput = (
  username,
  email,
  password,
  confirmPassoword
) => {
  const errors = {};

  if (username.trim() === '') {
    errors.username = 'Username must not be empty';
  }

  if (email.trim() === '') {
    errors.email = 'Email must not be empty';
  } else {
    const emailRegEx = /^([0-9a-zA-Z]([-.\w]*[0-9a-zA-Z])*@([0-9a-zA-Z][-\w]*[0-9a-zA-Z]\.)+[a-zA-Z]{2,9})$/;
    if (!email.match(emailRegEx)) {
      errors.email = 'Email must be a valid email format';
    }
  }

  if (password.trim() === '') {
    errors.password = 'Password must not be empty';
  } else if (password !== confirmPassoword) {
    errors.confirmPassword = 'Password must match with confirmation';
  }

  return {
    errors,
    valid: Object.keys(errors).length < 1,
  };
};

module.exports.validateLoginInput = (username, password) => {
  const errors = {};

  if (username.trim() === '') {
    errors.username = 'Username must not be empty';
  }
  if (password.trim() === '') {
    errors.password = 'Password must not be empty';
  }

  return {
    errors,
    valid: Object.keys(errors).length < 1,
  };
};
