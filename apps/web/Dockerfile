FROM node:14-alpine

WORKDIR .

ADD package.json .
RUN yarn install

ADD . /app
RUN yarn run build


RUN yarn run start



ENTRYPOINT ['node','src/App.tsx']