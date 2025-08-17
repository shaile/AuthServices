# Use official Node.js LTS image
FROM node:20-slim

# Set working directory
WORKDIR /app

# Copy package.json first
COPY package*.json ./

# Install dependencies
RUN npm install --production

# Copy *everything else* including server.js
COPY . .

# Expose the port Cloud Run expects
ENV PORT=8080

# Start the application
CMD ["npm", "start"]