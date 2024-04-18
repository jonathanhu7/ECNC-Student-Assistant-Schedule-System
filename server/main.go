package main

import (
	"ecnc-system-server/handlers"
	"ecnc-system-server/utils"

	"github.com/gin-gonic/gin"
)

func main() {
	utils.ReadConfig()
	utils.InitDB()
	r := gin.Default()

	r.POST("/auth/signIn", handlers.SignIn)

	r.Run(":8080")
}
