const HttpError = require("../models/http-error");
const { validationResult } = require("express-validator");
const { v4: uuid } = require("uuid");

const DUMMY_USERS = [
  { id: "u1", username: "angela", email: "text@test.com", password: "pwdpwd" },
];

const getUsers = (req, res, next) => {
  res.json({ users: DUMMY_USERS });
};

const login = (req, res, next) => {
  const { email, password } = req.body;

  const identifiedUser = DUMMY_USERS.find((u) => u.email === email);
  if (!identifiedUser || identifiedUser.password !== password) {
    throw new HttpError("could not identify user,...", "401");
  }
  res.json({ message: "logged in!" });
};

const signup = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    console.log(errors);
    throw new HttpError("invalid input passed, plz check your data", 422);
  }

  const { username, email, password } = req.body;

  const hasUser = DUMMY_USERS.find((u) => u.email === email);
  if (hasUser) {
    throw new HttpError("email already exists.", 422);
  }

  const createdUser = {
    id: uuid(),
    username,
    email,
    password,
  };

  DUMMY_USERS.push(createdUser);
  res.status(201).json({ user: createdUser });
};

exports.getUsers = getUsers;
exports.login = login;
exports.signup = signup;
