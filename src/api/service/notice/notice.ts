import { Request, Response } from 'express-serve-static-core';
import { getRepository } from 'typeorm';
import { NOTICE } from '../../../entity/Notice';

const getNotice = async (req: Request, res: Response) => {
  try {
    const result = getRepository(NOTICE).find();
    res.json({ notice: result });
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
    let imageArray = [];
    if(files.image != undefined){
        for(let i = 0 ; i < files.image.length; i++){
            let filename = "./notice_upload/" + files.image[i].originalname;
            imageArray.push(filename);
        }
    }
    if(files.file != undefined){
        for(let i = 0 ; i < files.file.length; i++){
            let filename = "./notice_upload/" + files.file[i].originalname;
            fileArray.push(filename);
        }
    }
    notice.IMAGE = imageArray;
    notice.FILE = fileArray;
    const result = getRepository(NOTICE).insert(notice);
    res.json({notice : result});
  } catch(e){
    res.json(e);
  }
}

export { getNotice,insertNotice };
  