FROM node:10

# create app directory
WORKDIR /usr/src/app

COPY package*.json ./

#RUN npm clean cache
RUN npm install

COPY . .
EXPOSE 4201
CMD ["npm", "test"]
#CMD ["npm", "start"]
