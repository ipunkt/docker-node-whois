FROM node:8.7-alpine
RUN apk add --update whois

# Create app directory
RUN mkdir -p /var/www/app
WORKDIR /var/www/app

# Install app dependencies
COPY package.json /var/www/app
RUN npm install

# Copy app source
COPY ./src /var/www/app/src

# Start the app
EXPOSE 80
CMD [ "npm", "start" ]
