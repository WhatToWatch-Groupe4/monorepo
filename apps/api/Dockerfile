FROM node:14-alpine

ARG DB_HOST
ARG DB_PORT
ARG DB_USERNAME
ARG DB_PASSWORD
ARG DB_DATABASE
ARG MOVIEDB_API_KEY


ENV NODE_ENV=production
ENV PORT=80

WORKDIR /app

# Copy all files, ignore apps folder
COPY [^a]* .
COPY apps/api/package.json apps/api/package.json
COPY libs/eslint-config/package.json libs/eslint-config/package.json


RUN yarn install --frozen-lockfile --production && yarn cache clean

COPY apps/api apps/api
COPY libs libs

RUN yarn workspace api run lint && yarn workspace api run build

CMD ["node_modules/.bin/nest", "start", "apps/api"]