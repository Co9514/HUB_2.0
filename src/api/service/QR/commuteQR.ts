import { Request, Response } from 'express-serve-static-core';
import moment from 'moment-timezone';
import { getRepository } from 'typeorm';
import { TICKET_LIST } from '../../../entity/TicketList';
const updateCommute = async (req: Request, res: Response) => {
  try {
    const ticketId = req.query.ticket_id;
    const destination = await getRepository(TICKET_LIST).findOne(ticketId);
    let check: boolean;
    let addLimitTime;
    const destinationTime = destination!.TICKET_TIME.toString();
    const limitDate = moment.tz(new Date(), 'Asia/Seoul').format('YYYY-MM-DD');
    const limitTime = moment
      .tz(new Date(), 'Asia/Seoul')
      .format('HH:mm');
    //날짜 비교
    if (limitDate != destination!.TICKET_DATE.toString()) {
      throw new Error('티켓 탑승 날짜가 아닙니다.');
    }
    //탑승 여부 확인
    else if (destination?.BOARDING == '탑승') {
      throw new Error('이미 탑승한 티켓입니다.');
    }
    // 시간 비교
    else {
      switch (destination?.END) {
        case '아산캠퍼스' || '천안캠퍼스':
          //'등교' 3시간  리미트
          addLimitTime = moment
            .tz(destinationTime, 'Asia/Seoul')
            .add(3, 'hours')
            .format('HH:mm');
          check =
	  destinationTime <= limitTime && limitTime <= addLimitTime
              ? true
              : false;
          break;
        default:
          //'하교' 30분 리미트
          const subLimitTime = moment
            .tz(destinationTime, 'Asia/Seoul')
            .subtract(120, 'minutes')
            .format('HH:mm');
          check =
	  limitTime <= subLimitTime && limitTime <= destinationTime 
              ? true
              : false;
          break;
      }
      if (check) {
      const result = await getRepository(TICKET_LIST)
                .createQueryBuilder()
                .update(TICKET_LIST)
                .set({ BOARDING: '탑승' })
                .where('TICKET_ID = :id', {
                  id: ticketId,
                })
                .execute();
        res.json({ message: "티켓 탑승 처리되었습니다." });
      } else {
        throw new Error('티켓 탑승 시간이 아닙니다.');
      }
    }
  } catch (e) {
    res.json({ message: e.message });
  }
};
export { updateCommute };
