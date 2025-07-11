const router = require('express').Router();
const ctrl = require('../controllers/driveController');
const auth = require('../middlewares/authMiddleware');

router.use(auth);
router.get('/', ctrl.dashboard);
router.post('/folder', ctrl.createFolder);
router.post('/upload', ctrl.uploadFile);
router.post('/rename', ctrl.rename);
router.post('/delete', ctrl.delete);
router.get('/download/:fileId', ctrl.download);

module.exports = router;
