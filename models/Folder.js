const mongoose = require('mongoose');

const FolderSchema = new mongoose.Schema({
  name: String,
  parent: { type: mongoose.Schema.Types.ObjectId, ref: 'Folder', default: null },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
});

module.exports = mongoose.model('Folder', FolderSchema);
