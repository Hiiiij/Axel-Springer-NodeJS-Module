//loads variable
import dotenv from 'dotenv';

// Load environment variables from the .env file into process.env
dotenv.config();

export const port = process.env.PORT || 4000;

export const customMsg = process.env.CUSTOM_MESSAGE || `Hello, what's up!`;

