import express from 'express';
import { getNoticeList,getNoticeImage, insertNotice,getNoticeFile } from '../../service/notice/notice';
import multer from 'multer';

const router = express.Router();

let storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'notice_upload/') // cb 콜백함수를 통해 전송된 파일 저장 디렉토리 설정
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname) // cb 콜백함수를 통해 전송된 파일 이름 설정
    }
  })
const upload = multer({storage : storage});

router.post('/upload',upload.fields([{name : 'file', maxCount : 5},{name : 'image', maxCount : 5}]),insertNotice);
router.get('/list',getNoticeList);
router.get('/image',getNoticeImage);
router.get('/file',getNoticeFile);

export default router;
