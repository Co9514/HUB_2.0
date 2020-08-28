import express from 'express';
import { getStudent, getPenalty, updateAccept } from '../../service/user/user';

const router = express.Router();
router.get('/student', getStudent);
router.get('/penalty', getPenalty);
router.put('/accept', updateAccept);
export default router;
