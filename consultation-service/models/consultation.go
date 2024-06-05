package models

import (
	"gorm.io/gorm"
	"time"
)

type Consultation struct {
	gorm.Model
	ClientID     uint      `gorm:"not null"`
	ConsultantID uint      `gorm:"not null"`
	Topic        string    `gorm:"size:255;not null"`
	Description  string    `gorm:"size:1000"`
	ScheduledAt  time.Time `gorm:"not null"`
	Status       string    `gorm:"size:50;default:'pending'"`
	ZoomLink     string    `gorm:"size:255"`
}
