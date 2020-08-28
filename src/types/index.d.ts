declare namespace Express {
  interface Request {
    userId: string;
    idxBusLine: number[];
  }
}
interface ISTUDENT {
  USER_ID: string;
  NM: string;
  DEPT_NM: string;
  SCHYR: string;
}

//커스텀 에러인터페이스 알아봐야함
// declare interface Error {
//   name: string;
//   message: string;
//   status: Number;
//   stack?: string;
// }

// interface ErrorConstructor {
//   new (status?: number, message?: string): Error;
//   (status?: number, message?: string): Error;
//   readonly prototype: Error;
// }
