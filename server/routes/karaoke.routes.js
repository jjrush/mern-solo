const KaraokeController = require('../controllers/karaoke.controller');

module.exports = (app) => {
    app.get('/api/karaoke', KaraokeController.getAll);
    app.post('/api/karaoke', KaraokeController.create);
    app.get('/api/karaoke/:id', KaraokeController.getOne);
    app.put('/api/karaoke/:id', KaraokeController.update);
    app.delete('/api/karaoke/:id', KaraokeController.delete);
}