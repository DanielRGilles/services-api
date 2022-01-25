const { Router } = require('express');
const PictureServices = require('../services/PictureServices');
const Picture = require('../models/Picture');

module.exports = Router()
  .post('/', async (req, res) => {
   const userPicture = await PictureServices.createUser(req.body.user_name)

    res.json(userPicture);
  })

  .get('/', async (req, res) => {
    const picture = await Picture.getAll();
    res.json(picture);
  });
