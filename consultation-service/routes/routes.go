package routes

import (
	"consultation-service/controllers"
	"github.com/gin-gonic/gin"
)

func ConsultationRoutes(r *gin.Engine) {
	consultationGroup := r.Group("/consultations")
	{
		consultationGroup.POST("/", controllers.CreateConsultation)
		consultationGroup.GET("/", controllers.GetConsultations)
		consultationGroup.POST("/book", controllers.BookConsultation)
		consultationGroup.GET("/bookings", controllers.GetBookings)             // Новый маршрут для получения бронирований
		consultationGroup.PUT("/bookings/:id", controllers.UpdateBookingStatus) // Новый маршрут для обновления статуса бронирования

	}
}
