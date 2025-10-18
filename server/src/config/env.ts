const ENV = {
  API_URL: process.env.API_URL || 'http://localhost:5000/api',
  NODE_ENV: process.env.NODE_ENV || 'development',
  PORT: process.env.PORT || '5000',
  JWT_SECRET: process.env.JWT_SECRET || 'your-secret-key',
  JWT_EXPIRE: process.env.JWT_EXPIRE || '30d',
  JWT_COOKIE_EXPIRE: process.env.JWT_COOKIE_EXPIRE || '30',
  MONGODB_URI: process.env.MONGODB_URI || 'mongodb://localhost:27017/edugenius',
} as const;

export default ENV;