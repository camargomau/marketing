import path from "path"
import fs from "fs"

interface IConfig {
	db: {
		host: string
		port: number
		user: string
		password: string
		database: string
	}
	logger: {
		level: string
	}
}

export default (): IConfig => {
	// Primero leemos el archivo de configuración como un string
	const config = fs.readFileSync(
		path.join(__dirname, "../../localSettings.json"),
		"utf8"
	)
	// Entonces lo convertimos en un json propiamente y lo retornamos
	return JSON.parse(config)
}
