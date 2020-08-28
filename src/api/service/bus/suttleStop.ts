import { Request, Response } from 'express-serve-static-core';
import { getConnection } from 'typeorm';
import { SHUTTLE_STOP } from '../../../entity/ShuttleStop';

const getSuttleStop = async (req: Request, res: Response) => {
  try {
    const conn = await getConnection();
    const result = await conn.getRepository(SHUTTLE_STOP).find();
    res.json({ result });
  } catch (e) {
    console.log(e);
  }
};

// const getSuttleStopPoint = async (req: Request, res: Response) => {
//   try {
//     const conn = await getConnection();
//     const type = req.query.type;
//     const result = await getShuttleStopPointDAO(type, conn);
//     res.json(result);
//   } catch (e) {
//     res.json(e);
//   }
// };

// const getSuttlePrice = async (req: Request, res: Response) => {
//   try {
//     const conn = await getConnection();
//     const type = req.query.type;
//     const start = req.query.start;
//     const end = req.query.end;
//     const result = await getShuttlePriceDAO(type, start, end, conn);
//     res.json(result);
//   } catch (e) {
//     res.json(e);
//   }
// };
export { getSuttleStop };
