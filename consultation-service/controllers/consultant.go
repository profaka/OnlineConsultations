package controllers

import (
	"consultation-service/config"
	"consultation-service/models"
	"github.com/gin-gonic/gin"
	"net/http"
	"time"
)

func CreateConsultant(c *gin.Context) {
	var consultant models.Consultant
	if err := c.ShouldBindJSON(&consultant); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	consultant.CreatedAt = time.Now()
	consultant.UpdatedAt = time.Now()

	if err := config.DB.Create(&consultant).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Consultant created successfully"})
}

func GetConsultants(c *gin.Context) {
	var consultants []models.Consultant
	if err := config.DB.Find(&consultants).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, consultants)
}
