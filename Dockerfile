FROM node:20-bullseye

WORKDIR /palitra

COPY package*.json ./

RUN npm install

COPY . .

ENV PORT 5000

EXPOSE $PORT

CMD ["npm", "run", "start:dev"]