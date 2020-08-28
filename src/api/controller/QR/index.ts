import express from 'express';
import { updateCommute } from '../../service/QR/commuteQR';
import { insertShuttleQR } from '../../service/QR/shuttleQR';
import { shuttleQRlist } from '../../service/QR/shuttleList';

const router = express.Router();

router.patch('/commute', updateCommute);
router.patch('/shuttle', insertShuttleQR);
router.get('/shuttle', shuttleQRlist);
export default router;
