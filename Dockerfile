FROM node:21-alpine AS builder

WORKDIR /app

ENV PATH /app/node_modules/.bin:$PATH

COPY package.json ./
COPY .env.docker ./.env
COPY yarn.lock ./
RUN yarn install
COPY . .
RUN yarn build

FROM nginx:latest

COPY --from=builder /app/dist /usr/share/nginx/html
COPY /docker/nginx-custom.conf /etc/nginx/conf.d/default.conf
COPY /docker/env.sh /docker-entrypoint.d/env.sh
RUN chmod +x /docker-entrypoint.d/env.sh

EXPOSE 80
