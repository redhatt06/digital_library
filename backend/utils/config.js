import dotenv from 'dotenv';

dotenv.config();

export default {
  PORT: process.env.PORT || 5000,
  POSTGRES_USERNAME: process.env.POSTGRES_USERNAME || 'admin',
  POSTGRES_PASSWORD: process.env.POSTGRES_PASSWORD || '162?_9482_stdswty1',
  JWT_SECRET: process.env.JWT_SECRET || 'digitalLibrary',
};
