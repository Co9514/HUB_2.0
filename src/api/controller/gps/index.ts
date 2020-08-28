import express from 'express';
import { getGPS } from '../../service/gps/realtimeGPS';

const router = express.Router();

router.get('/', getGPS);
export default router;
