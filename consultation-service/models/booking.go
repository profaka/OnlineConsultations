package models

import (
	"time"

	"gorm.io/gorm"
)

type Booking struct {
	ID             uint `gorm:"primaryKey"`
	ConsultationID uint `gorm:"index"`
	ClientID       uint `gorm:"index"`
	ScheduledAt    time.Time
	Status         string `gorm:"size:50"` // 'pending', 'confirmed', 'cancelled', etc.
	CreatedAt      time.Time
	UpdatedAt      time.Time
	DeletedAt      gorm.DeletedAt `gorm:"index"`
}

func (b *Booking) BeforeCreate(tx *gorm.DB) (err error) {
	b.CreatedAt = time.Now()
	b.UpdatedAt = time.Now()
	return
}

func (b *Booking) BeforeUpdate(tx *gorm.DB) (err error) {
	b.UpdatedAt = time.Now()
	return
}
