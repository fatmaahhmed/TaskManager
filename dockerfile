# Use the official Node.js image as the base image
FROM node:latest

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install


# Copy the rest of the application code to the working directory
COPY . .

# Make the restart script executable
RUN chmod +x restart.sh

# Build the TypeScript code
RUN npm run build
# Expose the port the app runs on
EXPOSE 4000

# Define the command to run the application
# Define the command to run the application in production mode
CMD ["./restart.sh"]