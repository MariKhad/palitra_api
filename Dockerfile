FROM node:18

WORKDIR /palitra

COPY package*.json ./

RUN npm install

COPY . .

ENV PORT 5000

CMD ["npm", "run", "start:dev"]