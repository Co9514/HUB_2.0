import express, { Request, Response, NextFunction } from 'express';
import 'reflect-metadata';
import indexRouter from './api/router';
import { stream } from './configs/winston';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import helmet from 'helmet';
import { createConnection, getRepository } from 'typeorm';
import connectionOptions from './common/mariaInfo';
import https from 'https';
import fs from 'fs';
import schedule from 'node-schedule';
import IPENALTY from './interface/IPENALTY';
import { TICKET_LIST } from './entity/TicketList';
import winston from 'winston';

createConnection(connectionOptions)
  .then(async connection => {
    const app = express();
    interface Error {
      status?: number;
      message?: string;
    }

    //helmet을 이용한 헤더에 대한 보안취약점을 보완
    app.use(helmet());
    app.use(helmet.noCache());
    app.disable('x-powered-by');
    //body-parser 호출
    app.use(bodyParser.json());
    app.use(
      bodyParser.urlencoded({
        extended: true,
      }),
    );
    //페널티 체크를 위한 node-schedule 호출
    // let scheduler = schedule.scheduleJob('0 0 5-22 * * *', async () => {
    //   try {
    //     //페널티 인원들의 티켓 리턴
    //     const TodayPenalty = await getRepository(TICKET_LIST)
    //     .createQueryBuilder('ticket_list')
    //     .select('ticket_list.STUDENT_ID')
    //     .addSelect('ticket_list.TICKET_ID')
    //     .where("BOARDING = '미탑승'")
    //     .andWhere('TICKET_DATE = DATE(NOW())')
    //     .andWhere(
    //       'ticket_list.TICKET_TIME < DATE_SUB(TIME(NOW()),INTERVAL 3 HOUR) AND ticket_list.TICKET_TIME > DATE_SUB(TIME(NOW()),INTERVAL 4 HOUR)',
    //     )
    //     .getMany();
    //   //시간값 수정하기;
    //     const TodayPenaltyType: IPENALTY[] = TodayPenalty;
    //     const StudentIdList = TodayPenalty.map(
    //       (x: TICKET_LIST) => x.STUDENT_ID,
    //     );
    //     //페널티 테이블에 추가
    //     if (StudentIdList.length > 0) {
    //       await insertPenaltyDAO(TodayPenaltyType);
    //       //페널티 인원들 카운팅 증가
    //       await updatePenaltyCountDAO(StudentIdList);
    //     }
    //   } catch (err) {
    //     console.log(err);
    //   }
    // });

    //페널티 초기화 스케쥴러 '0/10 5-22 * * *'
    // let penaltyResetScheduler = schedule.scheduleJob('0/10 5-22 * * *', () => {
    //   try {
    //     //페널티 끝난 학생들 초기화
    //     resetPenaltyDAO();
    //   } catch (err) {
    //     console.log(err);
    //   }
    // });

    //express-winston과 winstonDaily를 이용한 로그 파일화
    // app.use(infoLogger);
    // app.use(errorLogger);
    //winston을 이용해 생성된 로그 파일을 morgan을 이용한 로그 출력
    app.use(morgan('combined', { stream }));

    //요청 url을 처리할 컨트롤러 router에 연결
    app.use(indexRouter);

    // error handler
    app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
      // set locals, only providing error in development
      res.locals.message = err.message;
      res.locals.error = process.env.NODE_ENV === 'development' ? err : {};
      res.status(err.status || 500);
      res.json(err);
    });

    //서버 실행(개발자환경)
    if (process.env.NODE_ENV == 'development') {
      app.listen(process.env.PORT, () => {
        console.log(`server start port is ${process.env.PORT}`);
      });
    } else if (process.env.NODE_ENV == 'product') {
      //실제 서버
      const httpsOptions = {
        ca: [fs.readFileSync(process.env.HTTPS_CA!)],
        key: fs.readFileSync(process.env.HTTPS_KEY!),
        cert: fs.readFileSync(process.env.HTTPS_CERT!),
        passphrase: process.env.HTTPS_PASSPHRASE,
      };
      const server = https.createServer(httpsOptions, app);
      server.listen(process.env.PORT, () => {
        console.log(`https server start port is ${process.env.PORT}`);
      });
    }
  })
  .catch(error => console.log('TypeORM connection error: ', error));
