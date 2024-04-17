package utils

import (
	"time"

	"github.com/dgrijalva/jwt-go"
)

func GenerateJWT(username string) (string, error) {
	// 获取密钥
	jwtSecret := CFG.JWT.Secret
	jwtKey := []byte(jwtSecret)

	// token 的有效期为 24 小时
	expirationTime := time.Now().Add(24 * time.Hour)
	claims := &jwt.StandardClaims{
		Subject:   username,
		ExpiresAt: expirationTime.Unix(),
		Issuer:    "ecnc-system",
	}

	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
	tokenString, err := token.SignedString(jwtKey)
	if err != nil {
		return "", err
	}

	return tokenString, nil
}
