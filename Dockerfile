# Use Node.js LTS
FROM node:18

# Set working dir
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install --omit=dev

# Copy all source
COPY . .

# Expose port 8080
EXPOSE 8080

# Start app
CMD ["node", "server.js"]
