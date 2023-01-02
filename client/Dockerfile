# Smallest official Node.js image compatible with dependencies
#  (Alpine images not officially supported, use recent LTS version of an official image)
# Note: This first part is the 'builder' image
FROM node:16.17.0-bullseye-slim AS builder

# Create app directory (see: https://www.pathname.com/fhs/pub/fhs-2.3.html#PURPOSE23)
WORKDIR /usr/local/src

# Package.json*.json specify NPM packages used by app
# Package-lock.json stipulates specific versions of required packages
COPY package*.json /usr/local/src/

# Remove this line and rebuild image before deploying to K8s
# With this .env, the app will load these hard-wired secrets
# (e.g. useful for Docker Desktop testing)
#
COPY .env /usr/local/src/

# Option 1. Install for Production?, i.e. install strictly per package-lock.json, deleting node_modules beforehand
RUN npm ci --only=production

# Option 2. Install only for Development?
# RUN npm install

# Install app source, i.e. two main folders exactly matching necessary React folder structure
# https://create-react-app.dev/docs/folder-structure/
COPY public /usr/local/src/public
COPY src /usr/local/src/src

# Build the above 
RUN npm run build


# Note. This second part builds the main (nginx-serving) image
# implanting output of the builder (in /usr/local/src/build above)
# https://www.nginx.com/blog/deploying-nginx-nginx-plus-docker/
FROM nginx
# RUN rm /etc/nginx/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /usr/local/src/build /usr/share/nginx/html

# Deploy highly secure nginx config
# https://gist.github.com/plentz/6737338
# COPY conf /etc/nginx

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
