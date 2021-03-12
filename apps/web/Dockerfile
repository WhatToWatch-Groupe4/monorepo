FROM node:14-alpine as builder

ARG REACT_APP_API_BASE_URL

ENV NODE_ENV=production
ENV PORT=80 

WORKDIR /app

# Copy all files, ignore apps folder
COPY [^a]* ./
COPY apps/web/package.json apps/web/package.json
COPY libs/eslint-config/package.json libs/eslint-config/package.json


RUN yarn install --frozen-lockfile --production && yarn cache clean

COPY apps/web apps/web
COPY libs libs

RUN yarn workspace web run build

FROM nginx:1.19
COPY --from=builder /app/apps/web/build/ /usr/share/nginx/html