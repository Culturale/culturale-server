# Base image
FROM node:14-alpine

# Create app directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install
# Build the app
RUN npm build

# Copy app source code
COPY . .

# Expose port 3000
EXPOSE 3000

# Set environment variables
ENV NODE_ENV production
ENV MONGODB_URI mongodb://mongo:27017/mydb

# Start the app
CMD [ "npm", "start"]