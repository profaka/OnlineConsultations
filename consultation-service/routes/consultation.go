package routes

import (
	"consultation-service/controllers"
	"github.com/gin-gonic/gin"
)

func ConsultationRoutes(r *gin.Engine) {
	r.POST("/consultations", controllers.CreateConsultation)
	r.GET("/consultations", controllers.GetConsultations)
	r.PUT("/consultations/:id/approve", controllers.ApproveConsultation)
}
