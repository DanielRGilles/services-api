const { Router } = require('express');
const PictureServices = require('../servieces/PictureServices');


module.exports = Router()
  .post('/', async (req, res) => {
    const picture = await PictureServices.getImage();
    res.json(picture);
  })

  .get('/', async (req, res) => {
    const { id } = req.params;
    const picture = await PictureServices.getAllUsers(id);
    res.json(picture);
  });

