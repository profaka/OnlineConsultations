package main

import (
	"auth-service/config"
	"auth-service/routes"
	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

func main() {
	config.InitDB()

	r := gin.Default()
	// Настройка CORS
	r.Use(cors.New(cors.Config{
		AllowOrigins:     []string{"http://localhost", "http://localhost:80"},
		AllowMethods:     []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
		AllowHeaders:     []string{"Origin", "Content-Type", "Authorization"},
		ExposeHeaders:    []string{"Content-Length"},
		AllowCredentials: true,
	}))

	routes.AuthRoutes(r)

	r.Run(":8000") // Сервис будет слушать на порту 8000
}
