/**
 * Configurations of logger.
 */
const { format, createLogger, transports } = require("winston");
const { combine, timestamp, label, printf, colorize } = format;
require("winston-daily-rotate-file");

//Using the printf format.
const customFormat = printf(
  ({ level, message, timestamp, meta, ...metadata }) => {
    return `${level}: ${message} ${
      meta ? (typeof meta === "object" ? JSON.stringify(meta) : meta) : ""
    }`;
  }
);

//DailyRotateFile func()
const fileRotateTransport = new transports.DailyRotateFile({
  filename: "./logs/%DATE%.log",
  datePattern: "YYYY-MM-DD",
  maxFiles: "30d",
  format: format.combine(timestamp(), format.json()),
});

const logger = createLogger({
  level: "debug",
  transports: [fileRotateTransport],
});

logger.add(
  new transports.Console({
    format: format.combine(format.colorize(), format.splat(), customFormat),
  })
);

module.exports = {
  info: function (message, ...sub) {
    sub = sub && sub.length > 1 ? sub : sub[0];
    const meta = typeof sub === "object" ? JSON.stringify(sub) : sub;
    logger.info(message, { meta });
  },
  error: function (...sub) {
    let msg = "";
    let error = sub.splice(-1)[0];

    if (typeof error !== "object") {
      error = new Error(error);
    }

    if (error?.stack) {
      msg = `${error.stack}`;
    } else if (error?.message) {
      msg = error.message;
    } else {
      try {
        msg = JSON.stringify(error);
      } catch (err) {
        msg = error;
      }
    }

    logger.error(msg, {
      meta: sub && "\n" + (sub.length > 1 ? sub.join(", ") : sub[0]),
    });
  },
  warn: function (message, sub = "") {
    logger.warn(message, { meta: sub });
  },
  debug: function (message, sub = "") {
    logger.debug(message, { meta: sub });
  },
  http: function (message, sub = "") {
    logger.http(message, { meta: sub });
  },
  verbose: function (message, sub = "") {
    logger.verbose(message, { meta: sub });
  },
  silly: function (message, sub = "") {
    logger.silly(message, { meta: sub });
  },
};