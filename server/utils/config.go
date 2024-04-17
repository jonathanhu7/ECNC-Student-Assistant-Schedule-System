package utils

import (
	"ecnc-system-server/models"
	"log"
	"os"

	"gopkg.in/yaml.v2"
)

var CFG models.Config

func ReadConfig() {
	data, err := os.ReadFile("config.yaml")
	if err != nil {
		log.Fatalf("无法读取文件: %s", err)
	}
	err = yaml.Unmarshal(data, &CFG)
	if err != nil {
		log.Fatalf("无法解析文件: %s", err)
	}
}
