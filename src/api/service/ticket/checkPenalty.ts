// import 'reflect-metadata';
// import { TICKET_LIST } from '../../../entity/TicketList';
// import { getRepository } from 'typeorm';

// const getPenaltyTicketDAO = async () => {
//   try {
//     const result = await getRepository(TICKET_LIST)
//       .createQueryBuilder('ticket_list')
//       .select('ticket_list.STUDENT_ID')
//       .addSelect('ticket_list.TICKET_ID')
//       .where("BOARDING = '미탑승'")
//       .andWhere('TICKET_DATE = DATE(NOW())')
//       .andWhere(
//         'ticket_list.TICKET_TIME < DATE_SUB(TIME(NOW()),INTERVAL 3 HOUR) AND ticket_list.TICKET_TIME > DATE_SUB(TIME(NOW()),INTERVAL 4 HOUR)',
//       )
//       .getMany();
//     //시간값 수정하기
//     return result;
//   } catch (e) {
//     throw new Error(e);
//   }
// };

// export { getPenaltyTicketDAO };
