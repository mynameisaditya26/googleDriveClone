const Folder = require('../models/Folder');
const File = require('../models/File');
const multer = require('multer');

const storage = multer.diskStorage({
  destination: './uploads',
  filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname)
});

const upload = multer({ storage }).single('file');

exports.dashboard = async (req, res) => {
  const folders = await Folder.find({ user: req.user.id });
  const files = await File.find({ user: req.user.id });
  res.render('dashboard', { folders, files });
};

exports.createFolder = async (req, res) => {
  await new Folder({ name: req.body.name, user: req.user.id }).save();
  res.redirect('/');
};

exports.uploadFile = (req, res) => {
  upload(req, res, async () => {
    await new File({
      filename: req.file.originalname,
      path: req.file.path,
      user: req.user.id
    }).save();
    res.redirect('/');
  });
};

exports.rename = async (req, res) => {
  const { id, name, type } = req.body;
  if (type === 'file') await File.findByIdAndUpdate(id, { filename: name });
  else await Folder.findByIdAndUpdate(id, { name });
  res.redirect('/');
};

exports.delete = async (req, res) => {
  const { id, type } = req.body;
  if (type === 'file') await File.findByIdAndDelete(id);
  else await Folder.findByIdAndDelete(id);
  res.redirect('/');
};

exports.download = async (req, res) => {
  const file = await File.findById(req.params.fileId);
  res.download(file.path, file.filename);
};
