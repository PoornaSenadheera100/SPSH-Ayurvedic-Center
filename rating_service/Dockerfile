FROM node:16
WORKDIR /usr/src/app/rating_service
COPY package*.json ./
RUN npm install
COPY . .

EXPOSE 8071

CMD ["npm", "start"]