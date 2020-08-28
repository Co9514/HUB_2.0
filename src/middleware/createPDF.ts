import pdf, { CreateOptions } from 'html-pdf';
import fs from 'fs';
import { Response } from 'express-serve-static-core';
let options: CreateOptions = {
  format: 'A4',
  border: {
    top: '0.1in',
    right: '0.7in',
    bottom: '0.5in',
    left: '0.7in',
  },
};
export const createPDF = async (res: Response, sid: string, html: string) => {
  try {
    await pdf.create(html, options).toStream((err, stream) => {
      if (err) return res.json(err);
      res.type('pdf');
      stream.pipe(fs.createWriteStream('./pdf/' + sid + '.pdf'));
      stream.pipe(res);
    });
  } catch (e) {
    res.status(e.status).json(e);
  }
};
