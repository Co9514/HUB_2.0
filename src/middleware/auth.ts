// //토큰 유효성 체크 미들웨어
import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import ISTUDENT from '../interface/ISTUDENT';

interface IPayload extends ISTUDENT {
  USER_ID: string;
  NM: string;
  DEPT_NM: string;
  SCHYR: string;
  iat: number;
  exp: number;
}

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const token = req.header('x-access-token');//토큰값이 들어있음

  if (!token) {
    return res.status(401).json({
      success: false,
      message: 'not logged in',
    });
  }
  const payload = jwt.verify(//유효성체크 함수
    token,
    process.env.JWT_SECRET || 'test token',
  ) as IPayload;
  next();//정상이면 next로 넘어감
};
