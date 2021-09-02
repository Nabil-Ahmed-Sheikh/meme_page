import { Router } from 'express';
import { addMemeLink, uploadMeme, getMeme, getStats, deleteMeme } from '../controllers/memesController';
import { upload } from '../middleware/multerMiddleware';
const router = Router();



router.route('/').get(getMeme)
    .post(addMemeLink)
    .delete(deleteMeme)
router.route('/upload').post(upload.single('image') , uploadMeme);
router.route('/stats').get(getStats);


export default router;