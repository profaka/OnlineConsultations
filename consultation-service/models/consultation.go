package models

import (
	"time"

	"gorm.io/gorm"
)

type Consultation struct {
	ID           uint    `gorm:"primaryKey"`
	ConsultantID uint    `gorm:"index"`
	Title        string  `gorm:"size:255"`
	Description  string  `gorm:"size:1024"`
	Price        float64 `gorm:"type:decimal(10,2)"`
	Duration     int     `gorm:"type:int"` // Duration in minutes
	CreatedAt    time.Time
	UpdatedAt    time.Time
	DeletedAt    gorm.DeletedAt `gorm:"index"`
}

func (c *Consultation) BeforeCreate(tx *gorm.DB) (err error) {
	c.CreatedAt = time.Now()
	c.UpdatedAt = time.Now()
	return
}

func (c *Consultation) BeforeUpdate(tx *gorm.DB) (err error) {
	c.UpdatedAt = time.Now()
	return
}
