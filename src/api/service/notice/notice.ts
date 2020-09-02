import { Request, Response } from 'express-serve-static-core';
import { getRepository } from 'typeorm';
import { NOTICE } from '../../../entity/Notice';
import fs from 'fs';

const getNoticeList = async (req: Request, res: Response) => {
  try {
    const result = getRepository(NOTICE).find({order: { IDX: 'DESC' }});
    res.json({ notice: result });
  } catch (e) {
    res.json(e);
  }
};

const getNoticeImage = async (req: Request, res: Response) => {
  try {
    let filePath = req.query.image;
    let file = await fs.createReadStream(filePath);
    file.pipe(res);
  } catch (e) {
    res.json(e);
  }
};

const getNoticeFile = async (req: Request, res: Response) => {
  try {
    res.download(req.query.file);
  } catch (e) {
    res.json(e);
  }
};

const insertNotice =  async (req : Request, res : Response) => {
  try {
    let notice = new NOTICE();
    notice.TITLE = req.body.title;
    notice.CONTENTS = req.body.contents;
    notice.TIME = new Date();
    const files = req.files as { [fieldname: string]: Express.Multer.File[] };
    let fileArray = [];
    if(files.image != undefined){
       notice.IMAGE = "./notice_upload/" + files.image[0].originalname;
    }
    if(files.file != undefined){
        for(let i = 0 ; i < files.file.length; i++){
            let filename = "./notice_upload/" + files.file[i].originalname;
            fileArray.push(filename);
        }
    }
    notice.FILE = fileArray;
    const result = getRepository(NOTICE).insert(notice);
    res.json({notice : result});
  } catch(e){
    res.json(e);
  }
}

export { getNoticeList,getNoticeImage,insertNotice,getNoticeFile };
  