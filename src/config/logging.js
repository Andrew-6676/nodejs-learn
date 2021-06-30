const { createLogger, format, transports } = require('winston');
const { combine, timestamp } = format;

const winston = require('winston');

const config = require('./config');

const myFormat = combine(timestamp());

const commonOptions = {
    format: myFormat,
    timestamp: true,
    json: true,
    maxsize: 1024 * 5000,
    maxFiles: 5,
    colorize: false
};

const options = {
    fileUnhandled: {
        filename: `${config.LOGS_DIR}/exceptions.log`,
        handleExceptions: true,
        level: 'error',
        ...commonOptions
    },
    fileError: {
        filename: `${config.LOGS_DIR}/errors.log`,
        level: 'error',
        ...commonOptions
    },
    fileInfo: {
        filename: `${config.LOGS_DIR}/app.log`,
        level: 'info',
        handleExceptions: true,
        ...commonOptions
    }
};

const logger = createLogger({
    transports: [new transports.File(options.fileError), new transports.File(options.fileInfo)],
    exceptionHandlers: [new transports.File(options.fileUnhandled)]
});

// const myFormat2 = format((info, opts) => {
//     console.log('=====>', info, opts);
//     return info;
// });

if (process.env.NODE_ENV === 'development') {
    logger.add(
        new winston.transports.Console({
            level: 'debug',
            handleExceptions: true,
            colorize: true,
            format: winston.format.combine(
                // myFormat2(),
                format.splat(),
                timestamp(),
                winston.format.cli()
            )
        })
    );
}

logger.debug(`ENV =========================> ${process.env.NODE_ENV}`);

// logger.stream = {
//     write: (message) => logger.info(message)
// };

module.exports = logger;
