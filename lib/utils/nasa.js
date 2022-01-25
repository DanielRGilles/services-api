const request = require('superagent');

const API_KEY = 'xtP5D1cemubUKuEGTYr6Nmy8NGgcIdixXCViichS';
const URL_KEY = 'https://api.nasa.gov/planetary/apod?';



const getPictureOfDay = async () => {
  const picture = await request.get(`${URL_KEY}api_key=${API_KEY}`);
  return picture.json;
};

module.exports = { getPictureOfDay };
