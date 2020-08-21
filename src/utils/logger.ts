import {getLogger, Logger} from "log4js";

/**
 * Logger (Debug only)
 */
const logger: Logger = getLogger("Framework");

/* istanbul ignore next */
if (process.argv[2].toLowerCase() == "debug") {
	logger.level = "debug";
}

export default logger;