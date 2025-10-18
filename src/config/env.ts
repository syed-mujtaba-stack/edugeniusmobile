// Load environment variables from .env file
const ENV = {
  // API Configuration
  API_URL: process.env.API_URL || 'http://localhost:5000/api',
  
  // Add other environment variables here
  NODE_ENV: process.env.NODE_ENV || 'development',
  
  // Add any other environment variables your app needs
  // For example:
  // SENTRY_DSN: process.env.SENTRY_DSN,
  // GOOGLE_API_KEY: process.env.GOOGLE_API_KEY,
} as const;

export default ENV;
