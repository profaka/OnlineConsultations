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

func GetBookings(c *gin.Context) {
	userID, role, err := utils.GetUserIDAndRoleFromToken(c)
	if err != nil {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Invalid token"})
		return
	}

	var bookings []models.Booking
	if role == "client" {
		if err := config.DB.Where("client_id = ?", userID).Find(&bookings).Error; err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
			return
		}
	} else if role == "consultant" {
		var consultations []models.Consultation
		if err := config.DB.Where("consultant_id = ?", userID).Find(&consultations).Error; err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
			return
		}
		var consultationIDs []uint
		for _, consultation := range consultations {
			consultationIDs = append(consultationIDs, consultation.ID)
		}
		if err := config.DB.Where("consultation_id IN (?)", consultationIDs).Find(&bookings).Error; err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
			return
		}
	} else {
		c.JSON(http.StatusForbidden, gin.H{"error": "Invalid role"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"bookings": bookings})
}

func UpdateBookingStatus(c *gin.Context) {
	userID, role, err := utils.GetUserIDAndRoleFromToken(c)
	if err != nil {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Invalid token"})
		return
	}

	if role != "consultant" {
		c.JSON(http.StatusForbidden, gin.H{"error": "Only consultants can update booking status"})
		return
	}

	var booking models.Booking
	id := c.Param("id")
	if err := config.DB.Where("id = ?", id).First(&booking).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Booking not found"})
		return
	}

	var consultation models.Consultation
	if err := config.DB.Where("id = ? AND consultant_id = ?", booking.ConsultationID, userID).First(&consultation).Error; err != nil {
		c.JSON(http.StatusForbidden, gin.H{"error": "You do not have permission to update this booking"})
		return
	}

	var input struct {
		Status string `json:"status"`
	}

	if err := c.ShouldBindJSON(&input); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	booking.Status = input.Status
	booking.UpdatedAt = time.Now()

	if err := config.DB.Save(&booking).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Booking status updated successfully"})
}
