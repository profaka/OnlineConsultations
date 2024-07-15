# Установите ноду
FROM node:16-alpine as build-stage

WORKDIR /app

# Если у вас нет package-lock.json, используйте только package.json
COPY package.json ./
RUN npm install

COPY . .

RUN npm run build

# Установите nginx
FROM nginx:alpine as production-stage
COPY --from=build-stage /app/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
