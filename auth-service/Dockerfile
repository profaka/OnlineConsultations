# Устанавливаем базовый образ
FROM golang:1.22.2-alpine

# Устанавливаем рабочую директорию
WORKDIR /app

# Копируем файлы go.mod и go.sum
COPY go.mod go.sum ./

# Устанавливаем зависимости
RUN go mod download

# Копируем остальные файлы
COPY . .

# Сборка приложения
RUN go build -o /auth-service

# Запуск приложения
CMD ["/auth-service"]
