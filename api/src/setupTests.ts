import mongoose from 'mongoose';
import config from 'config';

const { uri, options } = config.get('mongoose');

beforeEach(async () => {
  async function clearDB() {
    await Promise.all(
      Object.keys(mongoose.connection.collections).map(async key => {
        return mongoose.connection.collections[key].deleteMany({});
      }),
    );
  }

  if (mongoose.connection.readyState === 0) {
    await mongoose.connect(uri, options);
  }
  await clearDB();
});

afterEach(async () => {
  await mongoose.disconnect();
});
