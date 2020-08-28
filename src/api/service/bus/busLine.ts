import { Request, Response } from 'express-serve-static-core';
import 'reflect-metadata';
import { BUS_LINE } from '../../../entity/BusLine';
import { getRepository } from 'typeorm';

const getBusLine = async (req: Request, res: Response) => {
  try {
    const result = await getRepository(BUS_LINE).find();
    res.json({ BUS_LINE: result });
  } catch (e) {
    res.json(e);
  }
};

export { getBusLine };
