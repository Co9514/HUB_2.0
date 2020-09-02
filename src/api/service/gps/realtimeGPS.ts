import { Request, Response } from 'express-serve-static-core';
import { getRepository } from 'typeorm';
import { GPS } from '../../../entity/GPS';

const getGPS = async (req : Request, res : Response) => {
    try {
        const result = await getRepository(GPS).find({ where: { DIRECTION: req.query.line_name} });
        res.json({ gps : result });
    } catch (e) {
        res.json(e);
    }
}

const saveGPS = async (req: Request, res: Response) => {
    try {
        let date = new Date();
        let gps = new GPS();
        gps.TID = req.body.tid;
        gps.CLASSIFY = req.body.classify;
        gps.DIRECTION = req.body.direction;
        gps.LATITUDE = req.body.latitude;
        gps.LONGITUDE = req.body.longitude;
        gps.BUS_NUMBER = req.body.bus_number;
        gps.CAR_NUMBER = req.body.car_number;
        gps.DATE = date;
        gps.TIME = date;
        const result = getRepository(GPS).save(gps);
        res.json({ gps : result });
    } catch (e) {
        res.json(e);
    }
};
export { getGPS,saveGPS };
