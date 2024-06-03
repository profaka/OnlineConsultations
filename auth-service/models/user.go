package models

import (
	"time"
)

type User struct {
	ID        uint   `gorm:"primaryKey"`
	Name      string `gorm:"size:255"`
	Email     string `gorm:"uniqueIndex;size:255"`
	Password  string `gorm:"size:255"`
	Role      string `gorm:"size:50"` // 'consultant' or 'client'
	CreatedAt time.Time
	UpdatedAt time.Time
}
