# version of node to use
FROM node:20W

# Directory to save image
WORKDIR /app

# Installs app dependencies
# A wildcard is used to ensure that both packages(package.json, package-lock.json) are being copied
COPY package*.json ./
RUN npm install

# Copies all files to /app
COPY . .

# Server port
EXPOSE 3000

# Starts the app
CMD ["npm", "run", "start"]