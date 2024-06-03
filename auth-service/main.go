package main

import (
	"auth-service/config"
	"auth-service/routes"
	"github.com/gin-gonic/gin"
)

func main() {
	config.InitDB()

	r := gin.Default()
	routes.AuthRoutes(r)

	r.Run(":8000") // Сервис будет слушать на порту 8000
}
