const winston = require('winston');

const config = require('./config');

const _format = winston.format.combine(winston.format.timestamp(), winston.format.prettyPrint());

const options = {
    fileUnhandled: {
        format: _format,
        level: 'error',
        filename: `${config.LOGS_DIR}/exceptions.log`,
        handleExceptions: true,
        json: true,
        maxsize: 1024 * 5000,
        maxFiles: 5,
        colorize: false
    },
    fileError: {
        format: _format,
        level: 'error',
        filename: `${config.LOGS_DIR}/errors.log`,
        json: true,
        maxsize: 1024 * 5000,
        maxFiles: 5,
        colorize: false
    },
    fileInfo: {
        format: _format,
        level: 'info',
        filename: `${config.LOGS_DIR}/app.log`,
        handleExceptions: true,
        json: true,
        maxsize: 1024 * 5000,
        maxFiles: 5,
        colorize: false
    }
};

const logger = winston.createLogger({
    // transports: [new winston.transports.File(options.fileError), new winston.transports.File(options.fileInfo)],
    // exceptionHandlers: [new winston.transports.File(options.fileUnhandled)]
});

console.log('=========================>', process.env.NODE_ENV);

if (process.env.NODE_ENV === 'development') {
    logger.add(
        new winston.transports.Console({
            level: 'debug',
            format: winston.format.combine(winston.format.colorize(), winston.format.cli()),
            handleExceptions: true,
            colorize: true
        })
    );
}

logger.stream = {
    write: (message) => logger.info(message)
};

module.exports = logger;
