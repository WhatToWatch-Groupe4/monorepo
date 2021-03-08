FROM node:14-alpine

ARG NEXT_PUBLIC_APP_URL
ARG NEXT_PUBLIC_API_URL
ARG NEXT_PUBLIC_KEYCLOAK_REALM
ARG NEXT_PUBLIC_KEYCLOAK_URL
ARG NEXT_PUBLIC_KEYCLOAK_CLIENT_ID
ARG NEXT_PUBLIC_ADMINISTRATION_URL
ARG NEXT_PUBLIC_ALGOLIA_APP_ID
ARG NEXT_PUBLIC_ALGOLIA_API_KEY
ARG NEXT_PUBLIC_GOOGLE_ANALYTICS_UA

ENV NODE_ENV=production
ENV PORT=80 

WORKDIR /app

# Copy all files, ignore apps folder
COPY [^a]* . 
COPY apps/web/package.json apps/web/package.json
COPY libs/eslint-config/package.json libs/eslint-config/package.json


RUN yarn install --frozen-lockfile --production && yarn cache clean

COPY apps/web apps/web
COPY libs libs

RUN yarn workspace web run lint && yarn workspace web run build

CMD ["node_modules/.bin/carco", "start", "apps/web"]