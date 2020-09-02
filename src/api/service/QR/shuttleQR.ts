import { Request, Response } from 'express-serve-static-core';
import { SHUTTLE_QR } from '../../../entity/ShuttleQR';
import { decryptedMessage } from '../../../middleware/decrypt';
import { getRepository } from 'typeorm';
const insertShuttleQR = async (req: Request, res: Response) => {
  try {
    let Qrdecryp: any = await decryptedMessage(req.body.url);
    const time = Qrdecryp.substring(8, 22); // 복호화 된 값에서 시간 값을 추출
    let sid: any = Qrdecryp.substring(0, 8); 
    if(sid[0] == '0' && sid[1] == '0') {sid = sid.substring(2);}
    const year: any = time.substring(0, 4);
    const month: any = time.substring(4, 6);
    const day: any = time.substring(6, 8);
    const hour: any = time.substring(8, 10);
    const minute: any = time.substring(10, 12);
    const second: any = time.substring(12, 14);

    const timef = new Date(year, month - 1, day, hour, minute, second, 0); //받은 시간의 날짜를 데이트 객체로 포맷
    const limitTime = new Date(timef.setSeconds(timef.getSeconds() + 60)); //받은 시간의 날짜 기준 리미트 60초
    const serverTime = new Date(); //서버의 현재시간
    if (serverTime < limitTime) {
      let date = new Date();
      let shuttleQRObject = new SHUTTLE_QR();
      shuttleQRObject.STUDENT_ID = sid;
      shuttleQRObject.SHUTTLE_STOP_NAME = req.body.shuttle_stop_name;
      shuttleQRObject.STATE = req.body.state;
      shuttleQRObject.DATE = date;
      shuttleQRObject.TIME = date;
      const result = await getRepository(SHUTTLE_QR).insert(shuttleQRObject);
      res.json({ message: '정상 탑승 되었습니다.' }); //정상적으로 QR이 읽혔을때 결과값
    } else {
      res.json({ message: 'QR코드가 만료되었습니다.' });
    }
  } catch (e) {
    res.json(e);
  }
};

const insertShuttleNFC = async (req: Request, res: Response) => {
  try {
    let date = new Date();
    let shuttleQRObject = new SHUTTLE_QR();
    shuttleQRObject.STUDENT_ID = req.body.sid;
    shuttleQRObject.CLASSIFY = req.body.classify;
    shuttleQRObject.DIRECTION = req.body.direction;
    shuttleQRObject.BUS_NUMBER = req.body.bus_number;
    shuttleQRObject.CAR_NUMBER = req.body.car_number;
    shuttleQRObject.DATE = date;
    shuttleQRObject.TIME = date;
    const result = await getRepository(SHUTTLE_QR).insert(shuttleQRObject);
    res.json({ message: '정상 탑승 되었습니다.' });
  } catch (e) {
    res.json(e);
  }
};
export { insertShuttleQR,insertShuttleNFC };
