const { Router } = require('express');
const PictureServices = require('../servieces/PictureServices');


module.exports = Router()
  .post('/', async (req, res) => {
    const picture = await PictureServices.insert(req.body);
    res.json(picture);
  })

  .get('/:id', async (req, res) => {
    const { id } = req.params;
    const picture = await PictureServices.getById(id);
    res.json(picture);
  })

  .get('/', async (req, res) => {
    const picture = await PictureServices.getAll();
    res.json(picture);
  })

  .patch('/:id', async (req, res, next) => {
    const { id } = req.params;
    const { img_url } = req.body;
   
    try {
      const picture = await PictureServices.updateById(id, { title, species, lifespan, environment, img_url });
      res.json(picture);
    } catch(err) {
      next(err);
    }
  })

  .delete('/:id', async (req, res) => {
    try {
      const picture = await PictureServices.deleteById(req.params.id);
      res.json(picture);
    } catch(err) {
      res(err);
    }
  });
