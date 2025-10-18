import Constants from 'expo-constants';

const ENV = {
  API_URL: Constants.expoConfig?.extra?.apiUrl || 'http://localhost:5000/api',
};

export default ENV;