import express from 'express';
import { getGPS,saveGPS } from '../../service/gps/realtimeGPS';

const router = express.Router();

router.get('/', getGPS);
router.post('/', saveGPS);
export default router;
