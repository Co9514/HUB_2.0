import express from 'express';
import authRouter from './controller/auth/index';
import userRouter from './controller/user/index';
import busRouter from './controller/bus/index';
import ticketRouter from './controller/ticket/index';
import qrRouter from './controller/QR/index';
import PDFRouter from './controller/pdf/index';
import noticeRouter from './controller/notice/index';
import gpsRouter from './controller/gps/index';
import nfcRouter from './controller/nfc/index';
/********요청에 대한 컨트롤러 연결**********/
const router = express.Router();

router.use('/auth', authRouter);
router.use('/user', userRouter);
router.use('/bus', busRouter);
router.use('/ticket', ticketRouter);
router.use('/QR', qrRouter);
router.use('/PDF', PDFRouter);
router.use('/notice',noticeRouter);
router.use('/gps',gpsRouter);
router.use('/nfc',nfcRouter);
export default router;
