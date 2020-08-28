import express from 'express';
import { insertShuttleNFC } from '../../service/QR/shuttleQR';

const router = express.Router();

router.post('/', insertShuttleNFC);
export default router;
