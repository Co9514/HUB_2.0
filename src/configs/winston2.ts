import expressWinston from 'express-winston';
import winston, { addColors } from 'winston'; //로그관련 라이브러리
import winstonDaily from 'winston-daily-rotate-file';
import moment from 'moment';
const logDir = __dirname + '/../logs';
const { combine, timestamp, label, colorize, prettyPrint, printf } = winston.format;

const myFormat = printf(({level, message, label, timestamp}) => {
  return `${timestamp} [${label}] ${level}: ${message}`; //log 출력 포맷 정의
});

//로거설정
const infologger = winston.createLogger({
  level:'info',
  transports:[
    new winstonDaily({
      filename: 'test-server-%DATE%.log',
      datePattern: 'YYYY-MM-DD',
      dirname: logDir,
      level: 'info',
      maxFiles: 1000,
      maxSize: 50000000,
      handleExceptions: true,
      format:winston.format.combine(
        winston.format.prettyPrint(),
        winston.format.printf(info => {
          let bodyFormat = '';
          for (const key in info.meta.req.body) {
            if (info.meta.req.body.hasOwnProperty(key)) {
              const element = info.meta.req.body[key];
              bodyFormat += ' ' + key + ':' + element + '';
            }
          }
          let queryFormat = '';
          for (const key in info.meta.req.query) {
            if (info.meta.req.query.hasOwnProperty(key)) {
              const element = info.meta.req.query[key];
              queryFormat += ' ' + key + ':' + element + '';
            }
          }
          return `[level]${info.level} [useragent]${info.meta.req.headers['user-agent']} req : [method]${info.meta.req.method} [url]${info.meta.req.url} [body]{${bodyFormat}} [query]{${queryFormat}} res : [statusCode]${info.meta.res.statusCode} [resTime]${info.meta.responseTime}`;
        }),
      ),
    }),
    new winston.transports.Console({
      format: winston.format.printf(
          info => '${info.message}')
  })

]
});
const stream = {
  write: (message:string) => {
    infologger.info(message); // 단순히 message를 default 포맷으로 출력
  },
};

export {infologger,stream}

// const options = {
//   // log파일
//   infologger: {
//     level: 'info',
//     filename: `server-%DATE%.log`, // 로그파일을 남길 경로
//     dirnae:logDir,
//     handleExceptions: true,
//     json: false,
//     maxsize: 5242880, // 5MB
//     maxFiles: 5,
//     colorize: false,
//     format: combine(
//       label({ label: 'winston-test' }),
//       timestamp(),
//       myFormat    // log 출력 포맷
//     )
//   },
//   file2:{

//   },
//   // 개발 시 console에 출력
//   console: {
//     level: 'debug',
//     handleExceptions: true,
//     json: false, // 로그형태를 json으로도 뽑을 수 있다.
//     colorize: true,
//     format: combine(
//       label({ label: 'nba_express' }),
//       timestamp(),
//       myFormat
//     )
//   }
// }

 
// const logger = winston.createLogger({
//   transports: [
//     new winston.transports.File(options.infologger) // 중요! 위에서 선언한 option으로 로그 파일 관리 모듈 transport
//   ],
//   exitOnError: false, 
// });
 
// if(process.env.NODE_ENV !== 'production'){
//   logger.add(new winston.transports.Console(options.console)) // 개발 시 console로도 출력
// }
 
// module.exports = logger;
