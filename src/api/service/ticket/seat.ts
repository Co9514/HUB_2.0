import { Request, Response } from 'express-serve-static-core';
import { getRepository } from 'typeorm';
import { TICKET_LIST } from '../../../entity/TicketList';
//요청 버스의 예약된 좌석들을 리턴
const getReservationSeat = async (req: Request, res: Response) => {
  try {
    const bus_id = req.query.bus_id;
    const ticket_date = req.query.ticket_date;
    const result = await getRepository(TICKET_LIST).find({
      select: ['SEAT'],
      where: { BUS_ID: bus_id, TICKET_DATE: ticket_date },
    });
    res.json({ RESERVED_SEAT: result });
  } catch (e) {
    res.json(e);
  }
};

export { getReservationSeat };
