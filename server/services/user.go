package services

import "ecnc-system-server/utils"

func GetUserInfo(username string) (string, string, error) {
	var nickname, role string
	err := utils.DB.QueryRow("SELECT nickname, role FROM user_info WHERE username = $1", username).Scan(&nickname, &role)
	return nickname, role, err
}
