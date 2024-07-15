# Dockerfile для consultation-service
FROM golang:1.22.2-alpine

WORKDIR /app

COPY . .

RUN go mod tidy
RUN go build -o consultation-service .

EXPOSE 8001

CMD ["./consultation-service"]
