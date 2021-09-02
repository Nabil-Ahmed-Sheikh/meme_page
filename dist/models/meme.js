"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const { Schema, model } = mongoose_1.default;
const memeSchema = new Schema({
    url: {
        type: String,
        required: true
    }
}, { timestamps: true });
const MemeModel = model('Meme', memeSchema);
exports.default = MemeModel;
