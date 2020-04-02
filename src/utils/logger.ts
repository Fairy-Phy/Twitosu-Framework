import {getLogger, Logger} from "log4js";

/**
 * Logger (Debug only)
 */
const logger: Logger = getLogger("Framework");

/* istanbul ignore next */
if (process.argv[2] == "debug") {
	logger.level = "debug";
}
else {
	logger.level = "info";
}

export default logger;