package models

type Config struct {
	Database struct {
		Host     string `yaml:"host"`
		Port     int    `yaml:"port"`
		User     string `yaml:"user"`
		Password string `yaml:"password"`
		DBName   string `yaml:"dbname"`
		Sslmode  string `yaml:"sslmode"`
	} `yaml:"database"`
	JWT struct {
		Secret string `yaml:"secret"`
	} `yaml:"jwt"`
}
