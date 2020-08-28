//토큰 생성 미들웨어
import jwt from 'jsonwebtoken';
import ISTUDENT from '../interface/ISTUDENT';

const createJsonWebToken = async (student: ISTUDENT) => {
  const token = await jwt.sign(
    student,
    process.env.JWT_SECRET || 'token test',
    {
      algorithm: 'HS512',
      expiresIn: '7d',//7일동안
      issuer: 'UCK',//토큰발급자
      subject: 'userInfo',//토큰설명
    },
  );
  return token;
};

export { createJsonWebToken };
