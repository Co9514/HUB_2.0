//ORACLE 접속을 위한 학생 비밀번호 암호화
import crypto from 'crypto';

export const encryptPassword = async (password: string) => {//패스워드암호화
  const result = await crypto
    .createHash('sha512')
    .update(password)
    .digest('base64');
  return result;
};
