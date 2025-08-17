# Use official Node.js LTS image
FROM node:20-slim

WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install only production dependencies
RUN npm install --omit=dev

# Copy the rest of the app
COPY . .

# Expose the port Cloud Run expects
EXPOSE 8080
ENV PORT=8080

# Start the application
CMD ["node", "server.js"]
