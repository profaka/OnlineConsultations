package utils

import (
	"errors"
	"strings"

	"github.com/dgrijalva/jwt-go"
	"github.com/gin-gonic/gin"
)

// Ваш секретный ключ
var jwtKey = []byte("your_secret_key")

// Структура, которая будет декодироваться из токена
type Claims struct {
	UserID uint   `json:"user_id"`
	Role   string `json:"role"`
	jwt.StandardClaims
}

// Функция для извлечения UserID и роли из токена
func GetUserIDAndRoleFromToken(c *gin.Context) (uint, string, error) {
	authHeader := c.GetHeader("Authorization")
	if authHeader == "" {
		return 0, "", errors.New("no token found")
	}

	tokenString := strings.TrimPrefix(authHeader, "Bearer ")

	claims := &Claims{}

	token, err := jwt.ParseWithClaims(tokenString, claims, func(token *jwt.Token) (interface{}, error) {
		return jwtKey, nil
	})

	if err != nil || !token.Valid {
		return 0, "", errors.New("invalid token")
	}

	return claims.UserID, claims.Role, nil
}
