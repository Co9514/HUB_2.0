import express from 'express';
import { authMiddleware } from '../../../middleware/auth';
import { Request, Response } from 'express-serve-static-core';
import { createJsonWebToken } from '../../../middleware/jwt';
import { encryptPassword } from '../../../middleware/encryptPassword';
import ISTUDENT from '../../../interface/ISTUDENT';
import { STUDENT } from '../../../entity/Student';
import { getStudentDAO } from '../../service/user/user';
import oracleCon from '../../../common/oracleCon';
import oracledb from 'oracledb';
import 'reflect-metadata';
import { getRepository } from 'typeorm';

const router = express.Router();

//LOGIN구간
router.post('/login', async (req: Request, res: Response) => {
  const sid = req.body.sid;
  const pwd = await encryptPassword(req.body.pwd);

  const conn: oracledb.Connection = await oracleCon.connection();
  const result_oracle: oracledb.Result<ISTUDENT> = await conn.execute(
    'SELECT USER_ID,NM,DEPT_NM,SCHYR FROM HUB_USER WHERE USER_ID = :sid AND PASSWD = :pwd',
    [sid, pwd],
    {
      outFormat: oracledb.OUT_FORMAT_OBJECT,
    },
  );
  conn.close();

  const student = result_oracle.rows;
  
  if (!student || student.length == 0) {
    return res
      .status(403)
      .json({ message: '아이디 또는 비밀번호를 확인해주세요.' });
  }
  let OracleStudent: ISTUDENT = {
    USER_ID: student[0].USER_ID,
    NM: student[0].NM,
    DEPT_NM: student[0].DEPT_NM,
    //교직원일 경우 null이 리턴되기 때문에 구분을 위해 0으로 설정
    SCHYR: student[0].SCHYR || '0',
  };

  const token = await createJsonWebToken(OracleStudent);

  //entity폴더에 정의된 User모델을 만들어 주기 위해 User객체를 생성하여 변수에 담아준다.
  const MariaStudentInfo = await getStudentDAO(sid);
  
  let studentObject = new STUDENT();
  //User 객체 생성을 위한 값들을 대입하여준다.
  studentObject.STUDENT_ID = OracleStudent.USER_ID!;
  studentObject.STUDENT_NAME = OracleStudent.NM!;
  studentObject.STUDENT_DEPT = OracleStudent.DEPT_NM!;
  studentObject.STUDENT_SCHYR = OracleStudent.SCHYR!;
  /******************************************************************** */
  //객체를 insert해주는 typeorm 명령 성공하면 테이블에 추가된 row가 리턴된다.
  const insertStudent = await getRepository(STUDENT).save(studentObject); //마리아 디비에 저장(save) -> 고유키값이 없으면 insert / 있으면 update
  //DB커넥션을 닫아준다.
  //리턴해주도록 한다.
  const result = {
    token: token,
    STUDNET_ID: OracleStudent.USER_ID,
    STUDENT_NAME: OracleStudent.NM,
    ACCEPT: MariaStudentInfo?.ACCEPT || '미동의',
  };

  res.status(200).json({
    message: 'logged in successfully',
    insertStudent,
    student: result,
  });
});

//CHECK구간
router.post('/check', authMiddleware,async (req: Request, res: Response) => {
    res.json({
      success: true,
      message: 'Success',
    });
  });
export default router;
