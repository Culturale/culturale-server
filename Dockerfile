# Base image
FROM node:14-alpine

# Create app directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./
RUN npm install
COPY tsconfig-paths-bootstrap.js ./
COPY tsconfig.json ./

COPY src ./src

RUN ls -a

RUN npm run build

CMD ["npm","run","start"]
