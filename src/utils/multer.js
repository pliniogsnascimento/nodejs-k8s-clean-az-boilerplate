const multer = require('multer');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
    cb(null,'uploads');
    },
    filename: (req, file, cb) => {
    cb(null, 'PRODUTO_'+ req.params.id + '_' + file.originalname);
    }
});

const upload = multer({storage: storage});
module.exports = upload;