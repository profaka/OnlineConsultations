package controllers

import (
	"consultation-service/config"
	"consultation-service/models"
	"github.com/gin-gonic/gin"
	"net/http"
	"time"
)

func CreateConsultation(c *gin.Context) {
	var consultation models.Consultation
	if err := c.ShouldBindJSON(&consultation); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	consultation.CreatedAt = time.Now()
	consultation.UpdatedAt = time.Now()

	if err := config.DB.Create(&consultation).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Consultation created successfully"})
}

func GetConsultations(c *gin.Context) {
	var consultations []models.Consultation
	if err := config.DB.Find(&consultations).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, consultations)
}

func ApproveConsultation(c *gin.Context) {
	id := c.Param("id")
	var consultation models.Consultation
	if err := config.DB.First(&consultation, id).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Consultation not found"})
		return
	}

	// Логика для генерации ссылки на Zoom
	zoomLink := "https://zoom.us/your-meeting-id" // пример

	consultation.Status = "approved"
	consultation.ZoomLink = zoomLink
	consultation.UpdatedAt = time.Now()

	if err := config.DB.Save(&consultation).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, consultation)
}
