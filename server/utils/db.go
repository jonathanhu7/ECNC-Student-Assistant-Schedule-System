package utils

import (
	"database/sql"
	"fmt"
	"log"

	_ "github.com/lib/pq"
)

var DB *sql.DB

// 从 config.yaml 文件中读取数据库连接信息并连接数据库
func InitDB() {
	dsn := fmt.Sprintf("host=%s port=%d user=%s password=%s dbname=%s sslmode=%s",
		CFG.Database.Host, CFG.Database.Port, CFG.Database.User, CFG.Database.Password, CFG.Database.DBName, CFG.Database.Sslmode)

	var err error
	DB, err = sql.Open("postgres", dsn)
	if err != nil {
		log.Fatalf("无法打开数据库: %s", err)
	}

	err = DB.Ping()
	if err != nil {
		log.Fatalf("无法连接数据库: %s", err)
	}
	fmt.Println("数据库连接成功")
}
