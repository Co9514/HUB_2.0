import express from 'express';
import {
  getFirstTicket,
  deleteTicketList,
  insertTicketList,
  getSchoolTicketList,
  getUserTicketListAll,
  getTicket,
  getPenaltyTickets,
} from '../../service/ticket/ticketList';
import { getLimit } from '../../service/ticket/LimitReservationDate';
const router = express.Router();

router.delete('/', deleteTicketList);
router.post('/', insertTicketList);
router.get('/', getTicket);
router.get('/limit', getLimit);
router.get('/penalty', getPenaltyTickets);
router.get('/list', getFirstTicket);
router.get('/lists', getSchoolTicketList);
router.get('/lists/all', getUserTicketListAll);
export default router;
