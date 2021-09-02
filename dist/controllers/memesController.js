"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteMeme = exports.getStats = exports.getMeme = exports.uploadMeme = exports.addMemeLink = void 0;
const validator_1 = __importDefault(require("validator"));
const meme_1 = __importDefault(require("../models/meme"));
const dateFunction_1 = require("../helperFunctions/dateFunction");
const mongoose_1 = require("mongoose");
const fs_1 = __importDefault(require("fs"));
// DESC Add a meme url
// POST /api/meme
// Public
const addMemeLink = async (req, res) => {
    const url = req.body.url;
    if (!validator_1.default.isURL(url)) {
        return res.status(400).json({
            message: 'Bad Request'
        });
    }
    ;
    let newMeme = new meme_1.default();
    newMeme.url = url;
    try {
        await newMeme.save();
        res.status(201).json({
            message: "Meme upload successful"
        });
    }
    catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};
exports.addMemeLink = addMemeLink;
// DESC Upload a Meme
// POST /api/meme/upload
// Public
const uploadMeme = async (req, res) => {
    const url = req.file.path;
    let newMeme = new meme_1.default();
    newMeme.url = url;
    try {
        await newMeme.save();
        res.status(201).json({
            message: "Meme upload successful"
        });
    }
    catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
    ;
};
exports.uploadMeme = uploadMeme;
// DESC Get all memes
// GET /api/meme/
// Public
const getMeme = async (req, res) => {
    let memeList = await meme_1.default.find().sort({ _id: -1 });
    res.status(200).json(memeList);
};
exports.getMeme = getMeme;
// DESC Get uploaded memes stats of last seven days
// GET /api/meme/stats
// Public
const getStats = async (req, res) => {
    let stats = await meme_1.default.aggregate([
        {
            '$match': {
                'createdAt': { '$gte': new Date((new Date().getTime() - (7 * 24 * 60 * 60 * 1000))) }
            },
        },
        { '$group': {
                _id: { '$dayOfYear': "$createdAt" },
                uploaded: { $sum: 1 }
            }
        },
        {
            '$sort': { '_id': 1 }
        }
    ]);
    const result = stats.map((stat) => {
        return { date: dateFunction_1.dateFromDay(stat._id), uploaded: stat.uploaded };
    });
    res.status(200).json(result);
};
exports.getStats = getStats;
// DESC Delete a meme
// DELETE /api/meme
// Public
const deleteMeme = async (req, res) => {
    let id = req.params.id;
    if (!id || !mongoose_1.isValidObjectId(id)) {
        return res.status(400).json({
            message: 'Bad Request'
        });
    }
    ;
    try {
        //check if meme exists
        let meme = await meme_1.default.findOne({ '_id': id });
        if (!meme) {
            return res.status(403).json({
                message: 'Not Found'
            });
        }
        //delete meme file
        let url = meme.url;
        if (url.split('\\')[0] === 'uploads') {
            try {
                fs_1.default.unlink(url, () => { });
            }
            catch (error) {
                //do nothing
                console.log(error);
            }
        }
        //delete from database
        await meme_1.default.deleteOne({ '_id': id });
        res.status(200).json({
            message: "Meme deleted"
        });
    }
    catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
    ;
};
exports.deleteMeme = deleteMeme;
