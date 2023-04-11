FROM node:16
WORKDIR /usr/src/app/backend
COPY package*.json ./
RUN npm install
COPY . .

EXPOSE 8070

CMD ["npm", "start"]