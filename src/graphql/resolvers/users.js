const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { UserInputError } = require('apollo-server');

const {
  validateRegisterInput,
  validateLoginInput,
} = require('../../utils/validators');
const { SECRET_KEY } = require('../../config');
const User = require('../../models/User');

module.exports = {
  Mutation: {
    async login(parent, { username, password }) {
      const { errors, valid } = validateLoginInput(username, password);

      if (!valid) {
        throw new UserInputError('Errors', { errors });
      }

      const user = await User.findOne({ username });

      if (!user) {
        errors.general = 'User Not Found';
        throw new UserInputError('User Not Found', { errors });
      }

      const match = await bcrypt.compare(password, user.password);
      if (!match) {
        errors.general = 'Wrong Credentials';
        throw new UserInputError('Wrong Credentials', { errors });
      }
      const token = generateToken(user);

      return {
        ...user._doc,
        id: user._id,
        token,
      };
    },
    async registerUser(
      parent,
      { registerInput: { username, email, password, confirmPassword } },
      context,
      info
    ) {
      // TODO validate user data
      const { errors, valid } = validateRegisterInput(
        username,
        email,
        password,
        confirmPassword
      );
      if (!valid) {
        throw new UserInputError('Errors', { errors });
      }
      // TODO validate user existance
      const takenUser = await User.findOne({ username });
      const takenEmail = await User.findOne({ email });
      if (takenUser) {
        throw new UserInputError('Username is already taken', {
          errors: {
            username: 'This username is already taken ',
          },
        });
      } else if (takenEmail) {
        throw new UserInputError('Email is already taken', {
          errors: {
            email: 'This Email is already taken ',
          },
        });
      }

      //hash password and save user
      password = await bcrypt.hash(password, 12);
      const newUser = new User({
        username,
        email,
        password,
        confirmPassword,
        createdAt: new Date().toISOString(),
      });

      const res = await newUser.save();

      const token = generateToken(res);
      return {
        ...res._doc,
        id: res._id,
        token,
      };
    },
  },
};

const generateToken = user => {
  return jwt.sign(
    {
      id: user.id,
      email: user.email,
      username: user.username,
    },
    SECRET_KEY,
    { expiresIn: '1h' }
  );
};
