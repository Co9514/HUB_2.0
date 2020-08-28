// import 'reflect-metadata';
// import { SHUTTLE_LINE } from '../../../entity/ShuttleLine';
// import { Connection } from 'typeorm';

// const getShuttleLineDAO = async (conn: Connection) => {
//   try {
//     const result = await conn.getRepository(BUS_LINE).find();
//     return result;
//   } catch (e) {
//     throw new Error(e);
//   }
// };

// const getIdxBusLineDAO = async (
//   end: number,
//   start: number,
//   conn: Connection,
// ) => {
//   try {
//     const result = await conn
//       .getRepository(BUS_LINE)
//       .createQueryBuilder('b1')
//       .innerJoin('bus_line', 'b2', 'b2.bus_stop_id = :id1', {
//         id1: end,
//       })
//       .select('b1.IDX_BUS_LINE')
//       .where('b1.bus_stop_id = :id2', { id2: start })
//       .andWhere('b1.bus_line_id = b2.bus_line_id')
//       .getMany();
//     return result;
//   } catch (e) {
//     throw new Error(e);
//   }
// };
// export { getBusLineDAO, getIdxBusLineDAO };
