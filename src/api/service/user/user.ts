import 'reflect-metadata';
import { Request, Response } from 'express-serve-static-core';
import * as moment from 'moment-timezone';
import { STUDENT } from '../../../entity/Student';
import { getRepository, Between, In, LessThan } from 'typeorm';
import ISTUDENT from '../../../interface/ISTUDENT';
import { PENALTY } from '../../../entity/Penalty';
import IPENALTY from '../../../interface/IPENALTY';

const getStudent = async (req: Request, res: Response) => {
  try {
    const sid = req.query.sid;
    const result = await getStudentDAO(sid);
    res.json({ STUDENT: result });
  } catch (e) {
    res.json(e);
  }
};

const getPenalty = async (req: Request, res: Response) => {
  try {
    const sid = req.query.sid;
    const result = await getStudentDAO(sid);
    const penalty: boolean = result!.PENALTY_COUNT > 0 ? true : false;
    if (result)
      ((result.PENALTY_END as unknown) as string) = moment
        .tz(result?.PENALTY_END, 'Asia/Seoul')
        .format('YYYY-MM-DD HH:mm');
    res.json({
      PENALTY: {
        existence: penalty,
        PENALTY_COUNT: result?.PENALTY_COUNT,
        PENALTY_END: result?.PENALTY_END,
      },
    });
  } catch (e) {
    res.json(e);
  }
};

// const getPenaltyTicket = async (req: Request, res: Response) => {
//   try {
//     const sid = req.query.sid;
//     const cnt = req.query.cnt;
//     const result = await getUserPenaltyDAO(sid, cnt);
//     res.json({ PENALTY_TICKET: result });
//   } catch (e) {
//     res.json(e);
//   }
// };

const updateAccept = async (req: Request, res: Response) => {
  try {
    const sid = req.query.sid;
    const result = await getRepository(STUDENT).update(
      { STUDENT_ID: sid },
      { ACCEPT: '동의' },
    );
    res.json({ ACCEPT_UPDATE: result.raw.changedRows });
  } catch (e) {
    res.json(e);
  }
};
// 학생정보 조회
const getStudentDAO = async (sid: string) => {
  try {
    const result = await getRepository(STUDENT).findOne({ STUDENT_ID: sid });
    return result;
  } catch (e) {
    throw new Error(e);
  }
};
// const createStudentDAO = async (student: STUDENT) => {
//   try {
//     //객체를 insert해주는 typeorm 명령 성공하면 테이블에 추가된 row가 리턴된다.
//     const result = await getRepository(STUDENT).save(student); //마리아 디비에 저장(save) -> 고유키값이 없으면 insert / 있으면 update
//     //DB커넥션을 닫아준다.
//     //리턴해주도록 한다.
//     return result;
//   } catch (e) {
//     throw new Error(e);
//   }
// };


//오라클 연결 학생체크
// const getSchoolUserDAO = async (sid: string, pwd: string) => {
//   try {
//     const conn: oracledb.Connection = await oracleCon.connection();
//     const result: oracledb.Result<ISTUDENT> = await conn.execute(
//       'SELECT USER_ID,NM,DEPT_NM,SCHYR FROM HUB_USER WHERE USER_ID = :sid AND PASSWD = :pwd',
//       [sid, pwd],
//       {
//         outFormat: oracledb.OUT_FORMAT_OBJECT,
//       },
//     );
//     conn.close();
//     return result.rows;
//   } catch (e) {
//     throw new Error(e);
//   }
// };

// const getUserPenaltyDAO = async (sid: string, cnt: number) => {
//   try {
//     const result = await getRepository(PENALTY)
//       .createQueryBuilder()
//       .where('PENALTY_END >= DATE(NOW())')
//       .andWhere('STUDENT_ID = :sid')
//       .orderBy('TICKET_ID', 'DESC')
//       .limit(cnt)
//       .setParameters({ sid: sid })
//       .getMany();
//     return result;
//   } catch (e) {
//     throw new Error(e);
//   }
// };

// const insertPenaltyDAO = async (penalty_list: IPENALTY[]) => {
//   try {
//     const result = await getRepository(PENALTY).insert(penalty_list);
//     return result;
//   } catch (e) {
//     throw new Error(e);
//   }
// };

// const updatePenaltyCountDAO = async (sid: Array<string>) => {
//   try {
//     const result = await getRepository(STUDENT).query(
//       `
// UPDATE student SET PENALTY_DATE =
// CASE WHEN PENALTY_COUNT = 0 THEN NOW() ELSE PENALTY_DATE END,
// PENALTY_END = 
// CASE WHEN PENALTY_COUNT = 0 THEN DATE_ADD(NOW() , INTERVAL 1 DAY)
//  WHEN  PENALTY_COUNT > 0 AND PENALTY_COUNT < 3 
//  THEN DATE_ADD(PENALTY_END , INTERVAL 1 DAY) 
//  ELSE DATE_ADD(PENALTY_DATE , INTERVAL ((PENALTY_COUNT+1)*2) DAY) END
//  ,PENALTY_COUNT = PENALTY_COUNT+1
//  WHERE STUDENT_ID IN(?);`,
//       sid,
//     );
//     return result;
//   } catch (e) {
//     throw new Error(e);
//   }
// };

// const resetPenaltyDAO = async () => {
//   try {
//     const result = await getRepository(STUDENT).update(
//       {
//         PENALTY_END: LessThan(new Date()),
//       },
//       { PENALTY_COUNT: 0 },
//     );
//     return result;
//   } catch (e) {
//     console.log(e);
//   }
// };

// const updateAcceptDAO = async (sid: string) => {
//   try {
    
//   } catch (e) {
//     console.log(e);
//     throw new Error(e);
//   }
// };
export {
  getStudentDAO
};


export { getStudent, getPenalty, updateAccept/*, getPenaltyTicket */};
