# Use an official Node.js LTS image
FROM node:18-alpine

# Create and switch to the app directory
WORKDIR /app

# Copy package.json and package-lock.json first (for efficient caching)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Expose the port your app runs on (3000 by default)
EXPOSE 3000

# Set the start command
CMD ["npm", "start"]