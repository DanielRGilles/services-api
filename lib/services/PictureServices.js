const Picture = require('../models/Picture');
const { getPictureOfDay } = require('../utils/nasa');

// get todays image

module.exports = class PictureServices {
  static async getImage() {
    const picture = await getPictureOfDay();

    return picture;
  }
  static async createUser(user_name){
    const picture = await PictureServices.getImage();

    const userPicture = await Picture.createUser({
      user_name,
      img_url: picture.url,
    });
    return userPicture;
  }
};
