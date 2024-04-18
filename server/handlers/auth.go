package handlers

import (
	"database/sql"
	"ecnc-system-server/models"
	"ecnc-system-server/services"
	"errors"
	"log"
	"net/http"

	"github.com/gin-gonic/gin"
)

func SignIn(c *gin.Context) {
	// 从请求体中解析用户名和密码
	var signInRequest models.SignInRequest
	err := c.BindJSON(&signInRequest)
	if err != nil {
		log.Println(err)
		c.JSON(http.StatusBadRequest, gin.H{"message": "请求体不合法"})
		return
	}
	username, password := signInRequest.Username, signInRequest.Password
	// 登录
	err = services.SignIn(username, password)
	if err != nil {
		log.Println(err)
		if errors.Is(err, sql.ErrNoRows) {
			c.JSON(http.StatusUnauthorized, gin.H{"message": "用户名或密码错误"})
			return
		}
		c.JSON(http.StatusInternalServerError, gin.H{"message": "登录验证时后端服务器内部错误"})
		return
	}
	// 获取用户信息
	nickname, role, err := services.GetUserInfo(username)
	if err != nil {
		log.Println(err)
		if errors.Is(err, sql.ErrNoRows) {
			c.JSON(http.StatusNotFound, gin.H{"message": "没有找到该用户"})
			return
		}
		c.JSON(http.StatusInternalServerError, gin.H{"message": "获取用户信息时后端服务器内部错误"})
		return
	}
	// 成功登录
	c.JSON(http.StatusOK, gin.H{"message": "登录成功", "user": gin.H{"username": username, "nickname": nickname, "role": role}})
}
