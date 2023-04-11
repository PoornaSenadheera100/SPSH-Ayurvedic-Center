FROM node:16
WORKDIR /usr/src/app/frontend
COPY package*.json ./
RUN npm install
COPY . .

RUN npm uninstall buffer
RUN npm install buffer

EXPOSE 3000

CMD ["npm", "start"]