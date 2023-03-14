# Base image
FROM node:14-alpine

# Create app directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./
COPY tsconfig.json ./
COPY tsconfig-paths-bootstrap.js ./

# Copy app source code
COPY ./src .

# Install dependencies
RUN npm install
# Build the app
RUN npm build

# Expose port 3000
EXPOSE 3000

# Start the app
CMD ["npm", "start"]