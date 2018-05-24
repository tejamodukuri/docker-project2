FROM node:9.11.1

COPY api /api

WORKDIR /api

EXPOSE 6060

RUN npm install

CMD npm start
