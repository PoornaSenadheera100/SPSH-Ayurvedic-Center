FROM node:16
WORKDIR /usr/src/app/email_service
COPY package*.json ./
RUN npm install
COPY . .

EXPOSE 8072

CMD ["npm", "start"]