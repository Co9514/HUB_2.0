//hash 알고리즘을 통한 암호화
import bcryptjs from 'bcryptjs';
export const hashEncryptedPassword = async (password: string) => {
  const salt = await bcryptjs.genSalt(10);
  const result = await bcryptjs.hash(password, salt);
  return result;
};
