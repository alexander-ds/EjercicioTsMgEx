"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const PostSchema = new mongoose_1.Schema({
    title: { type: String, required: true },
    url: { type: String, required: true, unique: true, lowcase: true },
    content: { type: String, required: true },
    image: String,
    createDat: { type: Date, default: Date.now },
    uoDateDat: Date
});
exports.default = mongoose_1.model('Post', PostSchema);
