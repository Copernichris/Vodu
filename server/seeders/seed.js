const db = require('../config/connection');
const { User, Vod } = require('../models');
const userSeeds = require('./userSeeds.json');
const vodSeeds = require('./vodSeeds.json');

db.once('open', async () => {
  try {
    await Vod.deleteMany({});
    await User.deleteMany({});

    await User.create(userSeeds);

    for (let i = 0; i < vodSeeds.length; i++) {
      const { _id, vodAuthor } = await Vod.create(vodSeeds[i]);
      const user = await User.findOneAndUpdate(
        { username: vodAuthor },
        {
          $addToSet: {
            vods: _id,
          },
        }
      );
    }
  } catch (err) {
    console.error(err);
    process.exit(1);
  }

  console.log('all done!');
  process.exit(0);
});
