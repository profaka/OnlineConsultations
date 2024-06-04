# Используем базовый образ Node.js для разработки
FROM node:14 AS build-stage

# Устанавливаем рабочую директорию
WORKDIR /app

# Копируем package.json и package-lock.json
COPY package*.json ./

# Устанавливаем зависимости
RUN npm install

# Копируем остальные файлы
COPY . .

# Сборка приложения
RUN npm run build

# Используем базовый образ Nginx для сервировки статических файлов
FROM nginx:alpine

# Копируем кастомную конфигурацию Nginx
COPY nginx.conf /etc/nginx/nginx.conf
COPY default.conf /etc/nginx/conf.d/default.conf

# Копируем статические файлы
COPY --from=build-stage /app/build /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
