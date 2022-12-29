# Smallest official Node.js image compatible with dependencies
#  (Alpine images not officially supported, use recent LTS version of an official image)
FROM node:16.17.0-bullseye-slim

# Create app directory (see: https://www.pathname.com/fhs/pub/fhs-2.3.html#PURPOSE23)
WORKDIR /usr/local/src

# Package.json*.json specify NPM packages used by app
# Package-lock.json stipulates specific versions of required packages
COPY package*.json ./

# Remove this line and rebuild image before deploying to K8s
# With this .env, the app will load these hard-wired secrets
# (e.g. useful for Docker Desktop testing)
#
# COPY .env ./

# Install to monitor Express (the WSGI)?
RUN npm install -g nodemon 

# Option 1. Install for Production?, i.e. install strictly per package-lock.json, deleting node_modules beforehand
RUN npm ci --only=production

# Option 2. Install only for Development?
# RUN npm install

# Install app source
COPY index.js lib.js ./app/
COPY routes/*.js ./app/routes/

EXPOSE 3001
CMD ["node", "app/index.js"]
