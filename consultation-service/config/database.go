package config

import (
	"consultation-service/models"
	"log"
	"time"

	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

var DB *gorm.DB

func InitDB() {
	var err error
	dsn := "host=" + "auth-db" + " user=" + "user" + " password=" + "password" + " dbname=" + "auth_db" + " port=" + "5432" + " sslmode=disable TimeZone=Asia/Almaty"

	for i := 0; i < 3; i++ {
		DB, err = gorm.Open(postgres.Open(dsn), &gorm.Config{})
		if err == nil {
			log.Println("Connected to database")
			err = DB.AutoMigrate(&models.Booking{}, &models.Consultation{})
			if err != nil {
				log.Fatalf("Failed to migrate database: %v", err)
			} else {
				log.Println("Migrated successfully")
			}
			return
		}

		log.Printf("Failed to connect to database: %v\n", err)
		time.Sleep(2 * time.Second)
	}

	log.Fatalf("Could not connect to the database. Exiting. Error: %v\n", err)

}
