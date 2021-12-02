import dotenv from 'dotenv';

let envFile = '.dev.env';

if (process.env.NODE_ENV === 'prod') {
  envFile = '.env';
}

if (process.env.NODE_ENV === 'test') {
  envFile = '.test.env';
}

dotenv.config({
  path: envFile,
});
