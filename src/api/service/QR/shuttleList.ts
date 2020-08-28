import { Request, Response } from 'express-serve-static-core';
import { getRepository } from 'typeorm';
import { SHUTTLE_QR } from '../../../entity/ShuttleQR';

const shuttleQRlist = async (req: Request, res: Response) => {
  try {
    const student_id = req.query.sid;
    const result = await getRepository(SHUTTLE_QR).find({
      where: { STUDENT_ID: student_id },
      order: { IDX: 'DESC' },
    });
    return res.json({ QR_LIST: result });
  } catch (e) {
    res.json(e);
  }
};
export { shuttleQRlist };
