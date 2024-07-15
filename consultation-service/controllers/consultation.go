package controllers

import (
	"consultation-service/config"
	"consultation-service/models"
	"consultation-service/utils"
	"net/http"
	"time"

	"github.com/gin-gonic/gin"
)

func CreateConsultation(c *gin.Context) {
	// Извлечение информации из токена
	userID, role, err := utils.GetUserIDAndRoleFromToken(c)
	if err != nil {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Invalid token"})
		return
	}

	// Проверка роли пользователя
	if role != "consultant" {
		c.JSON(http.StatusForbidden, gin.H{"error": "Only consultants can create consultations"})
		return
	}

	var consultation models.Consultation
	if err := c.ShouldBindJSON(&consultation); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// Использование ID пользователя из токена
	consultation.ConsultantID = userID

	if err := config.DB.Create(&consultation).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Consultation created successfully", "consultation": consultation})
}
func GetConsultations(c *gin.Context) {
	var consultations []models.Consultation
	if err := config.DB.Find(&consultations).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, consultations)
}

func BookConsultation(c *gin.Context) {
	// Извлечение информации из токена
	userID, role, err := utils.GetUserIDAndRoleFromToken(c)
	if err != nil {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Invalid token"})
		return
	}

	// Проверка роли пользователя
	if role != "client" {
		c.JSON(http.StatusForbidden, gin.H{"error": "Only clients can book consultations"})
		return
	}

	var booking models.Booking
	if err := c.ShouldBindJSON(&booking); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// Использование ID клиента из токена
	booking.ClientID = userID
	booking.Status = "pending"
	booking.CreatedAt = time.Now()
	booking.UpdatedAt = time.Now()

	if err := config.DB.Create(&booking).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Booking created successfully", "booking": booking})
}
