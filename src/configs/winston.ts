import expressWinston from 'express-winston';
import winston, { addColors } from 'winston'; //로그관련 라이브러리
import winstonDaily from 'winston-daily-rotate-file';
import moment from 'moment';

const logDir = __dirname + '/../logs';
const { combine, timestamp, colorize, prettyPrint, printf } = winston.format;

// express-winston logger makes sense BEFORE the router

//express-winston request white and black list
// expressWinston.requestWhitelist.push('body');
// expressWinston.bodyBlacklist.push('pwd');

// //info level log
// const infoLogger = expressWinston.logger({
//   transports: [
//     new winstonDaily({
//       filename: 'server-%DATE%.log',
//       datePattern: 'YYYY-MM-DD',
//       dirname: logDir,
//       level: 'info',
//       maxFiles: 1000,
//       maxSize: 50000000,
//       handleExceptions: true,
//     }),
//   ],
//   colorize: true,
//   format: winston.format.combine(
//     winston.format.prettyPrint(),
//     winston.format.printf(info => {
//       let bodyFormat = '';
//       for (const key in info.meta.req.body) {
//         if (info.meta.req.body.hasOwnProperty(key)) {
//           const element = info.meta.req.body[key];
//           bodyFormat += ' ' + key + ':' + element + '';
//         }
//       }
//       let queryFormat = '';
//       for (const key in info.meta.req.query) {
//         if (info.meta.req.query.hasOwnProperty(key)) {
//           const element = info.meta.req.query[key];
//           queryFormat += ' ' + key + ':' + element + '';
//         }
//       }
//       return `[level]${info.level} [useragent]${info.meta.req.headers['user-agent']} req : [method]${info.meta.req.method} [url]${info.meta.req.url} [body]{${bodyFormat}} [query]{${queryFormat}} res : [statusCode]${info.meta.res.statusCode} [resTime]${info.meta.responseTime}`;
//     }),
//   ),
//   expressFormat: true,
// });

// //express-winston and winstonDaily error logger
// const errorLogger = expressWinston.errorLogger({
//   transports: [
//     new winstonDaily({
//       level: 'error',
//       filename: 'error-%DATE%.log',
//       datePattern: 'YYYY-MM-DD',
//       dirname: logDir,
//       maxFiles: 1000,
//       maxSize: 50000000,
//       handleExceptions: true,
//     }),
//   ],
// });
//error level log
const errorTransport = new winston.transports.File({
  filename: 'error.log',
  dirname: logDir,
  level: 'error',
  handleExceptions: true,
});

const logger = winston.createLogger({
  transports: [errorTransport],
});

const stream = {
  write: (message: string) => {
    logger.info(message);
  },
};

export { logger, stream };
