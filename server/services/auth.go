package services

import (
	"ecnc-system-server/utils"
)

func SignIn(username string, password string) error {
	err := utils.DB.QueryRow("SELECT username FROM login_credentials WHERE username = $1 AND password = $2", username, password).Scan(&username)
	return err
}
