"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const memesController_1 = require("../controllers/memesController");
const multerMiddleware_1 = require("../middleware/multerMiddleware");
const router = express_1.Router();
router.route('/').get(memesController_1.getMeme)
    .post(memesController_1.addMemeLink)
    .delete(memesController_1.deleteMeme);
router.route('/upload').post(multerMiddleware_1.upload.single('image'), memesController_1.uploadMeme);
router.route('/stats').get(memesController_1.getStats);
exports.default = router;
