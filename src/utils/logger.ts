import { CategoryProvider, Category } from "typescript-logging-category-style"
import { LogLevel } from "typescript-logging"
import localConfigs from "./globalConfig"

const getLoggingLevel = (): LogLevel => {
	const cfg = localConfigs()
	const level = cfg.logger.level.toLowerCase()
	switch (level) {
		case "trace":
			return LogLevel.Trace
		case "debug":
			return LogLevel.Debug
		case "info":
			return LogLevel.Info
		case "warn":
			return LogLevel.Warn
		case "error":
			return LogLevel.Error
		case "fatal":
			return LogLevel.Fatal
		case "off":
			return LogLevel.Off
		default:
			provider
				.getCategory("mainLogger")
				.warn("Invalid logging level, defaulting to info")
			return LogLevel.Info
	}
}

const provider = CategoryProvider.createProvider("mainLogger", {
	level: getLoggingLevel()
})

export function getLogger(name?: string): Category {
	return provider.getCategory(name ?? "mainLogger")
}
