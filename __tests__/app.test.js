const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');
const PictureServices = require('../lib/services/PictureServices');

describe('backend routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  afterAll(() => {
    pool.end();
  });

  it('should add user and image', async () => {
    const res = await PictureServices.createUser(
      'julius');

    expect(res).toEqual({
      id: expect.any(String),
      user_name: 'julius',
      img_url: 'https://www.youtube.com/embed/s6IpsM_HNcU?rel=0',
    });
  });
});
