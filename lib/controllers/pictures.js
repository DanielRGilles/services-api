const { Router } = require('express');
const picture = require('../models/picture');


module.exports = Router()
  .post('/', async (req, res) => {
    const picture = await Picture.insert(req.body);
    res.json(picture);
  })

  .get('/:id', async (req, res) => {
    const { id } = req.params;
    const picture = await Picture.getById(id);
    res.json(picture);
  })

  .get('/', async (req, res) => {
    const picture = await Picture.getAll();
    res.json(picture);
  })

  .patch('/:id', async (req, res, next) => {
    const { id } = req.params;
    const { img_url } = req.body;
   
    try {
      const picture = await Picture.updateById(id, { title, species, lifespan, environment, img_url });
      res.json(picture);
    } catch(err) {
      next(err);
    }
  })

  .delete('/:id', async (req, res) => {
    try {
      const picture = await Picture.deleteById(req.params.id);
      res.json(picture);
    } catch(err) {
      res(err);
    }
  });
