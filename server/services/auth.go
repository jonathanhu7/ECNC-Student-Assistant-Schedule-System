package services

import (
	"ecnc-system-server/utils"
)

func GetSalt(username string) (string, error) {
	var salt string
	err := utils.DB.QueryRow("SELECT salt FROM login_credentials WHERE username = $1", username).Scan(&salt)
	return salt, err
}

func SignIn(username string, password string) error {
	err := utils.DB.QueryRow("SELECT * FROM login_credentials WHERE username = $1 AND password = $2", username, password).Err()
	return err
}
