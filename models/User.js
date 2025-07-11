const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const UserSchema = new mongoose.Schema({
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true }
});

UserSchema.pre('save', async function () {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 10);
  }
});

UserSchema.methods.compare = function (pwd) {
  return bcrypt.compare(pwd, this.password);
};

module.exports = mongoose.model('User', UserSchema);
