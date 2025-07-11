const jwt = require('jsonwebtoken');
const User = require('../models/User');

exports.registerPage = (req, res) => res.render('register');
exports.loginPage = (req, res) => res.render('login');

exports.register = async (req, res) => {
  const { email, password } = req.body;
  await new User({ email, password }).save();
  res.redirect('/auth/login');
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user || !(await user.compare(password))) return res.redirect('/auth/login');

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
  res.cookie('token', token).redirect('/');
};

exports.logout = (req, res) => {
  res.clearCookie('token').redirect('/auth/login');
};
