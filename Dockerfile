# Use official Node.js LTS image
FROM node:20-slim

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json if exists
COPY package*.json ./

# Install dependencies (only production dependencies)
RUN npm install --production

# Copy the rest of the app
COPY . .

# Expose the port Cloud Run expects
ENV PORT=8080

# Run in dev mode
CMD ["npm", "run", "dev"]

