import mongoose from 'mongoose';
import config from 'config';

const { uri, options }: { uri: string; options: {} } = config.get('mongoose');

export default {
  connect: () => {
    mongoose.connect(uri, options);
  },
};
