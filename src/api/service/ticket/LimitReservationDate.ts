import { Request, Response } from 'express-serve-static-core';
import * as moment from 'moment-timezone';

//티켓 예약할 수 있는 최대 날짜를 리턴해줍니다.
const getLimit = async (req: Request, res: Response) => {
  try {
    const limitDate = moment
      .tz(new Date(), 'Asia/Seoul')
      .add(14, 'days')
      .format('YYYY-MM-DD');
    res.json({ LIMIT: limitDate });
  } catch (e) {
    res.json(e);
  }
};

export { getLimit };
