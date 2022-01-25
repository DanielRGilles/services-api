const Picture = require('../models/Picture');
const { getPictureOfDay } = require('../utils/nasa');

// get todays image

module.exports = class PictureServices {
  static async getImage() {
    const picture = await getPictureOfDay();
    await Picture.createUser(picture.url);
    

  }
};
