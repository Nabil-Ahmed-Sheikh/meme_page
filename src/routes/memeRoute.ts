import { Router } from 'express';
import { addMemeLink, uploadMeme, getMeme, getStats, deleteMeme } from '../controllers/memesController';
import { upload } from '../middleware/multerMiddleware';
const router = Router();



router.route('/').get(getMeme)
    .post(addMemeLink);
router.route('/upload').post(upload.single('image') , uploadMeme);
router.route('/stats').get(getStats);
router.route('/:id').delete(deleteMeme);


export default router;