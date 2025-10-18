declare namespace NodeJS {
  interface ProcessEnv {
    // API Configuration
    readonly API_URL?: string;
    
    // Environment
    readonly NODE_ENV?: 'development' | 'production' | 'test';
    
    // Add other environment variables here as needed
    // For example:
    // readonly SENTRY_DSN?: string;
    // readonly GOOGLE_API_KEY?: string;
  }
}

declare const __DEV__: boolean;
