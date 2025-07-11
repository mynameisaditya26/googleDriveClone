const mongoose = require('mongoose');

const FileSchema = new mongoose.Schema({
  filename: String,
  path: String,
  folder: { type: mongoose.Schema.Types.ObjectId, ref: 'Folder', default: null },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
});

module.exports = mongoose.model('File', FileSchema);
