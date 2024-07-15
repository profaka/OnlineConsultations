package routes

import (
	"consultation-service/controllers"
	"github.com/gin-gonic/gin"
)

func ConsultantRoutes(r *gin.Engine) {
	r.POST("/consultants", controllers.CreateConsultant)
	r.GET("/consultants", controllers.GetConsultants)
}
