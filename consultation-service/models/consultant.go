package models

import (
	"gorm.io/gorm"
)

type Consultant struct {
	gorm.Model
	Name         string `gorm:"size:100;not null"`
	Bio          string `gorm:"size:1000"`
	Achievements string `gorm:"size:1000"`
}
