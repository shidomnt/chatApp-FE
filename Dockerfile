FROM node:14.19.0 AS build

COPY package* /app/

WORKDIR /app

RUN npm install

COPY . /app

RUN npm run build

FROM nginx

COPY --from=build /app/build /usr/share/nginx/html/
