import express from 'express';
import { getBusTime, getTimetable } from '../../service/bus/busTime';
import { getBusLine } from '../../service/bus/busLine';
import { getBusStop, getStopPoint, getPrice } from '../../service/bus/busStop';
import { getReservationSeat } from '../../service/ticket/seat';
import { getSuttleStop } from '../../service/bus/suttleStop';

const router = express.Router();

router.get('/timetable', getTimetable);
router.get('/time', getBusTime);
router.get('/line', getBusLine);
router.get('/stop', getBusStop);
router.get('/point', getStopPoint);
router.get('/price', getPrice);
router.get('/seat', getReservationSeat);
router.get('/shuttle', getSuttleStop);

export default router;
