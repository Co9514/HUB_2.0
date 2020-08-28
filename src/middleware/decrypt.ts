import * as Crypto from 'crypto-js';
import { Request, Response } from 'express-serve-static-core';
// export const encryptedMessage = async (req: Request, res: Response) => {
//   try {
//     const result = Crypto.AES.encrypt(
//       req.body.url,
//       process.env.ENCRYPTION_KEY || 'test',
//     ).toString();
//     return console.log(result);
//   } catch (e) {
//     console.log(e);
//   }
// };
export const decryptedMessage = async (encryptedMsg: string) => {
  try {
    const decryptionMsg = await Crypto.AES.decrypt(
      encryptedMsg,
      Crypto.enc.Utf8.parse('HUBHUBHUBHUBHUBHUBHUBHUBHUBHUBHU'),
      {
        iv: Crypto.enc.Utf8.parse('1234567890123456'),
        mode: Crypto.mode.CBC,
      },
    ).toString(Crypto.enc.Utf8);
    return decryptionMsg;
  } catch (e) {
    console.log(e);
    return e;
  }
};
