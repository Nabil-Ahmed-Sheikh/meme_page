import { RequestHandler } from 'express';
import validator from 'validator';
import Meme from '../models/meme';
import { dateFromDay } from '../helperFunctions/dateFunction';
import { isValidObjectId } from 'mongoose';
import fs from 'fs';


// DESC Add a meme url
// POST /api/meme
// Public
const addMemeLink: RequestHandler = async (req, res) => {
    const url = (req.body as {url: string}).url;

    if(!validator.isURL(url)){
        return res.status(400).json({
            message: 'Bad Request'
        })    
    };

    let newMeme = new Meme();
    newMeme.url = url;

    try {
        await newMeme.save();
        res.status(201).json({
            message: "Meme upload successful"
        });
    } catch (error) {
        res.status(500).json({
            message: "Something went wrong"
        })
    }

};

// DESC Upload a Meme
// POST /api/meme/upload
// Public
const uploadMeme: RequestHandler = async (req, res) => {
    const url = (req.file as {path: string}).path;

    let newMeme = new Meme();
    newMeme.url = url;

    try {
        await newMeme.save();
        res.status(201).json({
            message: "Meme upload successful"
        });
    } catch (error) {
        res.status(500).json({
            message: "Something went wrong"
        })
    };
};

// DESC Get all memes
// GET /api/meme/
// Public
const getMeme: RequestHandler = async (req, res) => {
    let memeList = await Meme.find().sort({_id: -1});
    res.status(200).json(memeList);
};

// DESC Get uploaded memes stats of last seven days
// GET /api/meme/stats
// Public
const getStats: RequestHandler = async (req, res) => {
    
    let stats = await Meme.aggregate([
        {
            '$match': {
                'createdAt': {'$gte': new Date((new Date().getTime() - (7 * 24 * 60 * 60 * 1000)))}
            },
        },
        { '$group': { 
                _id: { '$dayOfYear': "$createdAt"},
                uploaded: { $sum: 1 } 
            } 
        },
        {
            '$sort': {'_id': 1}
        }
        ]);
    
    const result = stats.map((stat) => {
        return {date: dateFromDay(stat._id), uploaded: stat.uploaded}
    });
    

    res.status(200).json(result);

};

// DESC Delete a meme
// DELETE /api/meme
// Public
const deleteMeme: RequestHandler = async (req, res) => {
    let id = req.params.id
    if(!id || !isValidObjectId(id)){
        return res.status(400).json({
            message: 'Bad Request'
        })
    };

    try {
        //check if meme exists
        let meme:any = await Meme.findOne({'_id': id})
        if(!meme){
            return res.status(403).json({
                message: 'Not Found'
            })
        }

        //delete meme file
        let url = meme.url
        if(url.split('\\')[0] === 'uploads'){
            try {
                fs.unlink(url, () => {})
            } catch (error) {
                //do nothing
                console.log(error);
                
            }
        }
        
        //delete from database
        await Meme.deleteOne({'_id': id})
        res.status(200).json({
            message: "Meme deleted"
        });
    } catch (error) {
        res.status(500).json({
            message: "Something went wrong"
        })
    };
};

export {addMemeLink, uploadMeme, getMeme, getStats, deleteMeme};