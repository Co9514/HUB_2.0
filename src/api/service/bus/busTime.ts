import { Request, Response } from 'express-serve-static-core';
import moment from 'moment';
import tz from 'moment-timezone';
import 'reflect-metadata';
import { BUS_TIME } from '../../../entity/BusTime';
import { getRepository, getManager } from 'typeorm';
import { BUS_LINE } from '../../../entity/BusLine';
import { TICKET_LIST } from '../../../entity/TicketList';

const getBusTime = async (req: Request, res: Response) => {
  try {
    const result = await getRepository(BUS_TIME).find();
    res.json({ TIME_TABLE: result });
  } catch (e) {
    res.json(e);
  }
};
const getTimetable = async (req: Request, res: Response) => {
  try {
    //선택한 날짜에 예매한 티켓이 있는지를 체크한다.
    const end = req.query.end;
    const start = req.query.start;
    const type = req.query.type;
    const sid = req.query.sid;
    const ticket_date = req.query.ticket_date;
    const week = req.query.week;
    const date = moment.tz('2020-07-18', 'Asia/Seoul').format('YYYY-MM-DD');

    // if (req.query.user == 'worker' && ticket_date != date) {
    //   return res.status(200).json({ message: '교직원 예매 날짜가 아닙니다.' });
    // }

    //  if (ticket_date >= date) {
    //   return res.status(200).json({ AVAILABLE_TIMETABLE: [] });
    // }
    //예약한 티켓이 있는지를 체크한다.
    let busType: string = type == "등교" ? 'END' : 'START';
    const check = await getRepository(TICKET_LIST)
      .createQueryBuilder('TICKET_LIST')
      .where('TICKET_DATE = :date')
      .andWhere('STUDENT_ID = :sid')
      .andWhere(busType + ' IN (:...busstop)')
      .setParameters({
        date: ticket_date,
        sid: sid,
        busstop: ['아산캠퍼스', '천안캠퍼스'],
      })
      .getCount();
    
    if (!check) {
      //사용자가 선택한 출발지와 도착지에 대한 정확한 노선과 정류장에 대한 키 리턴.
      const idxBusLine = await getRepository(BUS_LINE)
                                .createQueryBuilder('b1')
                                .innerJoin('bus_line', 'b2', 'b2.bus_stop_name = :id1', {
                                  id1: end,
                                })
                                .select('b1.IDX_BUS_LINE')
                                .addSelect('b1.BUS_LINE_NAME')
                                .where('b1.bus_stop_name = :id2', { id2: start })
                                .andWhere('b1.bus_line_name = b2.bus_line_name')
                                .getMany();
      //리턴 받은 값을 배열로 담아준다.
      let idxBusLinemap = idxBusLine?.map((x: any) => x.IDX_BUS_LINE);
      let BusLineNamemap = idxBusLine?.map((x: any) => x.BUS_LINE_NAME);
      //시간표를 리턴
      const limit = 44;
      let result = new Map();
      for(let i = 0; i < idxBusLine.length ; i++){
        result.set(BusLineNamemap[i], await getManager().query(
          `SELECT BT.BUS_ID,BT.WEEK_OF_DAY,BUS_TIME,case when B.seat is NULL then ${limit} else ${limit} - B.seat end as seat
          FROM bus_time BT LEFT JOIN
          (SELECT count(seat) as seat,TL.bus_id
          FROM ticket_list TL 
          WHERE ticket_date = ?
          GROUP BY bus_id) AS B ON BT.bus_id = B.bus_id 
          WHERE idx_bus_line = ? AND week_of_day = ?
          AND CASE WHEN DATE(NOW()) = ? THEN BT.BUS_TIME >= TIME(NOW()) ELSE BT.BUS_TIME END
          `,
          [ticket_date, idxBusLinemap[i], week, ticket_date],
         ));
      }
      type timetableResult = {
        [key: string]: string
    }
      let mapToObject : timetableResult = {};
      result.forEach((value, key) => mapToObject[key] = value);
      res.json({ AVAILABLE_TIMETABLE: mapToObject });
    } else {
      res.status(403).json({ message: '이미 예약한 날짜입니다.' });
    }
  } catch (e) {
    res.json(e);
  }
};

export { getBusTime, getTimetable };
