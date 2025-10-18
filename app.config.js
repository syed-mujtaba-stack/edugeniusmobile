export default {
  expo: {
    name: 'EduGeniusMobile',
    // ... other expo config
    extra: {
      apiUrl: process.env.API_URL || 'http://localhost:5000/api',
    },
  },
};