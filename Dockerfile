# Use the official image as a parent image
FROM node:10

# Copy the rest of your app's source code from your host to your image filesystem.
COPY . .

# Run the command inside your image filesystem
RUN npm install

# Inform Docker that the container is listening on the specified port at runtime.
EXPOSE 9000

# Run the specified command within the container.
CMD ["npm", "start"]