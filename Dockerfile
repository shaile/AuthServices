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

# ✅ Debug step: list all files to check if server.js and json are inside
RUN echo "---- FILES IN /app ----" && ls -alh /app && \
    echo "---- PACKAGE.JSON ----" && cat /app/package.json && \
    echo "---- LOOKING FOR SERVER.JS ----" && ls -l /app/server.js || echo "server.js MISSING"

# Expose the port Cloud Run expects
ENV PORT=8080

# Start the application
CMD ["npm", "start"]
