package utils

import (
	"errors"
	"github.com/dgrijalva/jwt-go"
	"github.com/gin-gonic/gin"
	"strings"
)

var jwtKey = []byte("your_secret_key")

type Claims struct {
	UserID uint   `json:"user_id"`
	Email  string `json:"email"`
	Role   string `json:"role"`
	jwt.StandardClaims
}

func GetUserIDAndRoleFromToken(c *gin.Context) (uint, string, error) {
	tokenString := c.GetHeader("Authorization")
	tokenString = strings.Replace(tokenString, "Bearer ", "", 1)

	token, err := jwt.ParseWithClaims(tokenString, &Claims{}, func(token *jwt.Token) (interface{}, error) {
		return jwtKey, nil
	})

	if err != nil {
		return 0, "", err
	}

	if claims, ok := token.Claims.(*Claims); ok && token.Valid {
		return claims.UserID, claims.Role, nil
	}

	return 0, "", errors.New("invalid token")
}
