const consoleController = require('../controllers/console.controller');
const upload = require('../utils/multer');
module.exports = (app, repository) => {

    const controller = new consoleController(repository)

    app.get('/api/v1/consoles', (req, res) => {
        controller.getAllConsoles(req, res);
    });

    
    app.get('/api/v1/consoles/:id', (req, res) => {
        controller.getConsoleByID(req, res);
    });

    //insere console
    app.post('/api/v1/consoles', (req, res) => {
        controller.postConsole(req, res);
    });

    //atualiza console
    app.patch('/api/v1/consoles/:id', (req, res) => {
        controller.updateConsole(req, res);
    });

    //remove console
    app.delete('/api/v1/consoles/:id', (req, res) => {
        controller.deleteConsole(req, res);
    });

    //Middleware para checar se arquivo existe
    app.patch('/api/v1/consoles/:id/imagens', (req, res, next) => {
        controller.checkExistence(req, res, next);
    });


    app.patch('/api/v1/consoles/:id/imagens', upload.single('imagem'), (req, res) => {
        controller.insertImage(req,res);
    });

}

