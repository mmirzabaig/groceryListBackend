# Use the official image as a parent image
FROM node:13.8.0-alpine3.11

ENV PORT 9000
# Copy the rest of your app's source code from your host to your image filesystem.
RUN mkdir -p /usr/src/app

WORKDIR /usr/src/app

COPY package.json /usr/src/app/
RUN npm install

# Bundle app source
COPY . /usr/src/app

# Inform Docker that the container is listening on the specified port at runtime.
EXPOSE 9000

# Run the specified command within the container.
CMD ["node", "server.js"]