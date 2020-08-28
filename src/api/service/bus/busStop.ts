import { Request, Response } from 'express-serve-static-core';
import 'reflect-metadata';
import { BUS_STOP } from '../../../entity/BusStop';
import { getRepository } from 'typeorm';

const getBusStop = async (req: Request, res: Response) => {
  try {
    const result = await getRepository(BUS_STOP).find();
    res.json({ BUS_STOP: result });
  } catch (e) {
    res.json(e);
  }
};

const getStopPoint = async (req: Request, res: Response) => {
  try {
    const type = req.query.type;
    let Btype: string = type == 0 ? '등교' : '하교';
    const result = await getRepository(BUS_STOP)
      .createQueryBuilder('bus')
      .select('bus.BUS_STOP_NAME')
      .where('bus.CODE = :type', { type: Btype })
      .getMany();
    res.json({ BUS_STOP: result });
  } catch (e) {
    res.json(e);
  }
};

const getPrice = async (req: Request, res: Response) => {
  try {
    const type = req.query.type;
    const start = req.query.start;
    const end = req.query.end;

    let busStopId: string = type == '등교' ? start : end;
    let priceType: string =
      start == '하교' || end == '하교' ? 'bus.A_PRICE' : 'bus.C_PRICE';

    const result = await getRepository(BUS_STOP)
      .createQueryBuilder('bus')
      .select(priceType)
      .where('bus.BUS_STOP_NAME = :id', { id: busStopId })
      .getOne();
    // 출발정류장 또는 도착정류장에 따라서 다른 컬럼의 값을 담아서 보내주기 위함
    const price = start == '하교' || end == '하교' ? result?.A_PRICE : result?.C_PRICE;

    res.json({ PRICE: price });
  } catch (e) {
    res.json(e);
  }
};
export { getBusStop, getStopPoint, getPrice };
