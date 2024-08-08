const winston = require('winston');
const path = require('path');

// Define the log file path
const logFilePath = path.join(__dirname, 'logs', 'app.log');

// Create a winston logger instance
const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.printf(({ timestamp, level, message }) => {
      return `${timestamp} [${level}]: ${message}`;
    })
  ),
  transports: [
    // Write logs to a file
    new winston.transports.File({ filename: logFilePath }),
    // Also log to console
    new winston.transports.Console()
  ],
});

module.exports = logger;
