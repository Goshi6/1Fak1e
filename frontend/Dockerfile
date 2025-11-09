# Stage 1: Build the app
FROM node:20 AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Stage 2: Serve the built app with Nginx
FROM nginx:alpine

# Копируем свой nginx.conf (должен лежать рядом с Dockerfile) внутрь контейнера и использовать его как default.conf
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Копируем сборку
COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80
