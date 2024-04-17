package handlers

import (
	"database/sql"
	"ecnc-system-server/models"
	"ecnc-system-server/services"
	"ecnc-system-server/utils"
	"log"
	"net/http"

	"github.com/gin-gonic/gin"
)

func GetSalt(c *gin.Context) {
	username := c.Param("username")
	salt, err := services.GetSalt(username)

	if err != nil {
		if err == sql.ErrNoRows {
			c.JSON(http.StatusNotFound, gin.H{"message": "没有找到该用户"})
			return
		}
		c.JSON(http.StatusInternalServerError, gin.H{"message": "后端服务器内部错误"})
	}
	c.JSON(http.StatusOK, gin.H{"salt": salt})
}

func SignIn(c *gin.Context) {
	// 从请求体中解析用户名和密码
	var signInRequest models.SignInRequest
	c.BindJSON(&signInRequest)
	username, password := signInRequest.Username, signInRequest.Password
	// 登录
	err := services.SignIn(username, password)
	if err != nil {
		log.Println(err)
		if err == sql.ErrNoRows {
			c.JSON(http.StatusUnauthorized, gin.H{"message": "用户名或密码错误"})
			return
		}
		c.JSON(http.StatusInternalServerError, gin.H{"message": "后端服务器内部错误"})
		return
	}
	// 获取用户信息
	nickname, role, err := services.GetUserInfo(username)
	if err != nil {
		log.Println(err)
		if err == sql.ErrNoRows {
			c.JSON(http.StatusNotFound, gin.H{"message": "没有找到该用户"})
			return
		}
		c.JSON(http.StatusInternalServerError, gin.H{"message": "后端服务器内部错误"})
		return
	}
	// 生成 JWT
	token, err := utils.GenerateJWT(username)
	if err != nil {
		log.Println(err)
		c.JSON(http.StatusInternalServerError, gin.H{"message": "后端服务器内部错误"})
		return
	}
	// 成功登录
	c.JSON(http.StatusOK, gin.H{"message": "登录成功", "token": token, "user": gin.H{"username": username, "nickname": nickname, "role": role}})
}
