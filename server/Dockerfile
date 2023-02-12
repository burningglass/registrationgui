# Create and run the Express app builder image
# Node.js alpine image include apk to install extra packages
# https://stackoverflow.com/questions/45857340/docker-nginx-error-openssl-command-not-found
#
FROM node:16.17-alpine

# Create app directory (see: https://www.pathname.com/fhs/pub/fhs-2.3.html#PURPOSE23)
#
WORKDIR /usr/local/src

# Install/ initialize Nginx
#
RUN apk update \
      && apk add nginx
RUN mkdir -p /etc/nginx/ssl
RUN mkdir -p /var/.cert

# Replace default (less secure) nginx configs with a highly secure config
# https://gist.github.com/plentz/6737338
#
RUN rm /etc/nginx/nginx.conf
COPY nginx.conf /etc/nginx/

# Note. Install of .nginx-selfsigned.key and .nginx-selfsigned.crt below can be removed
# IF you are:
# - Deploying to K8s
# - And need to generate valid Internet certificates
# - And therefore need to use your own .key and.crt file names
# In which case, you must store your files as additional Google Secrets
# and enhance Deployment.yaml to deploy these during container init
# (note. you will also need to amend nginx.conf before Dockerizing to ref. your filenames)
#
# Default RUN uses openssl to generate platform-specific dhparams.pem & *self-signed* key/cert material
# copying these to nginx folders
# (needed by nginx TLS config, where these aren't injected by K8s init)
#
RUN apk update \
      && apk add openssl \
      && openssl dhparam -out /etc/nginx/ssl/dhparam.pem 2048 \
      && openssl req -x509 -nodes -days 365 -subj "/C=CA/ST=QC/O=Company, Inc./CN=mydomain.com" -addext "subjectAltName=DNS:mydomain.com" -newkey rsa:2048 -keyout /var/.cert/.nginx-selfsigned.key -out /var/.cert/.nginx-selfsigned.crt

# Package.json*.json specify NPM packages used by app
# Package-lock.json stipulates specific versions of required packages
#
COPY package*.json /usr/local/src/

# Comment lines and rebuild image before deploying to K8s
# With this .env and empty (secrets).cfg.json, the app will load hard-wired secrets and config
# (e.g. useful for Docker Desktop testing)
#
# COPY .env /usr/local/src/
# COPY .cfg.json /var/.props/

# Option 1. Install for Production?, i.e. install strictly per package-lock.json, deleting node_modules beforehand
#
RUN npm ci --only=production

# Option 2. Install only for Development?
#
# RUN npm install

# Install app source
#
COPY index.js lib.js /usr/local/src/
COPY routes/*.js /usr/local/src/routes/

EXPOSE 443
CMD nginx -g 'daemon off;' & node /usr/local/src/index.js
