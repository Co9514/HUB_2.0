import { Request, Response } from 'express-serve-static-core';
import { getRepository } from 'typeorm';
import { GPS } from '../../../entity/GPS';

const getGPS = async (req : Request, res : Response) => {
    try {
        const result = getRepository(GPS).find({ where: { DIRECTION: req.query.line_name} });
        res.json({ gps : result });
    } catch (e) {
        res.json(e);
    }
}

const saveGPS = async (req: Request, res: Response) => {
    try {
        const result = getRepository(GPS).save(req.body.gps);
        res.json({ gps : result });
    } catch (e) {
        res.json(e);
    }
};
export { getGPS,saveGPS };
