FROM node:18

WORKDIR /palitra

COPY package*.json ./

RUN npm install

COPY . .

CMD ["npm", "run", "start:dev"]