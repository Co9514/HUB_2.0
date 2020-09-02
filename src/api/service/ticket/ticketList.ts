import { Request, Response } from 'express-serve-static-core';
import { TICKET_LIST } from '../../../entity/TicketList';
import * as moment from 'moment-timezone';
import { getRepository } from 'typeorm';
import { PENALTY } from '../../../entity/Penalty';

//티켓ID를 통해 티켓 정보를 조회합니다.
const getTicket = async (req: Request, res: Response) => {
  try {
    const ticket_id = req.query.ticket_id;
    const result = await getRepository(TICKET_LIST).findOne(ticket_id);
    if (result)
      ((result.RESERVATION_DATE as unknown) as string) = moment
        .tz(result?.RESERVATION_DATE, 'Asia/Seoul')
        .format('YYYY-MM-DD HH:mm');
    res.json({ TICKET: result });
  } catch (e) {
    res.json(e);
  }
};

//페널티 티켓리스트들을 반환합니다.
const getPenaltyTickets = async (req: Request, res: Response) => {
  try {
    const sid = req.query.sid;
    const count = req.query.count;
    const ticket_id = await getRepository(PENALTY).find({
      select: ['TICKET_ID'],
      where: { STUDENT_ID: sid },
      order: { IDX: 'DESC' },
      take: count,
    });
    const result = await getRepository(TICKET_LIST).findByIds(ticket_id);
    if (result) {
      result.forEach(x => {
        ((x.RESERVATION_DATE as unknown) as string) = moment
          .tz(x.RESERVATION_DATE, 'Asia/Seoul')
          .format('YYYY-MM-DD HH:mm');
      });
    }
    res.json({ TICKET: result });
  } catch (e) {
    res.json(e);
  }
};

//가장 먼저 타게될 버스의 티켓을 반환합니다.
const getFirstTicket = async (req: Request, res: Response) => {
  try {
    const sid = req.query.sid;
    const result = await getRepository(TICKET_LIST)
                          .createQueryBuilder()
                          .where('STUDENT_ID = :sid', { sid: sid })
                          .andWhere(
                            `CASE WHEN TICKET_DATE > DATE(NOW()) 
                            THEN TRUE WHEN TICKET_DATE = DATE(NOW()) 
                            THEN TICKET_TIME >= DATE_SUB(NOW(),INTERVAL 3 HOUR) END`,
                          )
                          .orderBy('TICKET_DATE', 'ASC')
                          .addOrderBy('TICKET_TIME', 'ASC')
                          .limit(1)
                          .getOne();
    if (result)
      ((result.RESERVATION_DATE as unknown) as string) = moment
        .tz(result?.RESERVATION_DATE, 'Asia/Seoul')
        .format('YYYY-MM-DD HH:mm');
    res.json({ TICKET: result });
  } catch (e) {
    res.json(e);
  }
};

//예약했던 모든 티켓들을 반환합니다.
const getUserTicketListAll = async (req: Request, res: Response) => {
  try {
    const sid = req.query.sid;
    const result = await getRepository(TICKET_LIST).find({
      where: { STUDENT_ID: sid },
      order: { TICKET_ID: 'DESC', TICKET_TIME: 'ASC' },
    });
    if (result) {
      result.forEach(x => {
        ((x.RESERVATION_DATE as unknown) as string) = moment
          .tz(x.RESERVATION_DATE, 'Asia/Seoul')
          .format('YYYY-MM-DD HH:mm');
      });
    }
    res.json({ TICKET: result });
  } catch (e) {
    res.json(e);
  }
};

//등,하교 티켓을 리턴합니다.
const getSchoolTicketList = async (req: Request, res: Response) => {
  try {
    const type = req.query.type;
    const sid = req.query.sid;
    
    const busIdColumn = type == "등교" ? 'TL.END' : 'TL.START';
    const result = await getRepository(TICKET_LIST)
      .createQueryBuilder('TL')
      .where('TL.STUDENT_ID = :sid', { sid: sid })
      .andWhere(`${busIdColumn} IN('아산캠퍼스', '천안캠퍼스')`)
      .getMany();

    if (result) {
      result.forEach(x => {
        ((x.RESERVATION_DATE as unknown) as string) = moment
          .tz(x.RESERVATION_DATE, 'Asia/Seoul')
          .format('YYYY-MM-DD HH:mm');
      });
    }
    res.json({ TICKET: result });
  } catch (e) {
    res.json(e);
  }
};

//티켓 삭제
const deleteTicketList = async (req: Request, res: Response) => {
  try {
    const ticket_id = req.query.ticket_id;
    const result = await getRepository(TICKET_LIST).query(
      `DELETE FROM ticket_list where ticket_id = ?
    and CASE WHEN TICKET_DATE > DATE(NOW()) 
    THEN TRUE WHEN TICKET_DATE = DATE(NOW()) 
    THEN TICKET_TIME > date_add(TIME(NOW()),INTERVAL 1 HOUR) END`,
      [ticket_id],
    );
    res.json({ DELETE_TICKET: result.affectedRows });
  } catch (e) {
    res.json(e);
  }
};

//티켓 예약
const insertTicketList = async (req: Request, res: Response) => {
  try {
    let ticket = new TICKET_LIST();
    ticket.STUDENT_ID = req.body.sid;
    ticket.BUS_ID = req.body.bus_id;
    ticket.START = req.body.start;
    ticket.END = req.body.end;
    ticket.TICKET_DATE = req.body.ticket_date;
    ticket.TICKET_TIME = req.body.ticket_time;
    ticket.PRICE = req.body.price;
    ticket.SEAT = req.body.seat;
    ticket.BUS_LINE_NAME = req.body.bus_line_name;
    
    // 자리 체크 하는 부분
    const bus_id = req.body.bus_id;
    const ticket_date = req.body.ticket_date;
    const seat = req.body.seat;

    let check = await getRepository(TICKET_LIST).find({
      select: ['SEAT'],
      where: { BUS_ID: bus_id, TICKET_DATE: ticket_date, SEAT: seat },
    });
    if (check.length == 0) {
      const insert  = await getRepository(TICKET_LIST).insert(ticket);
      const result = insert.generatedMaps;
      return res.json({ INSERT_TICKET: result[0].TICKET_ID });
    }
    else {
      res.status(403).json({ message: '이미 예약된 좌석입니다.' })
    };
  } catch (e) {
    res.json(e);
  }
};

export {
  getFirstTicket,
  getUserTicketListAll,
  getSchoolTicketList,
  deleteTicketList,
  insertTicketList,
  getTicket,
  getPenaltyTickets,
};
