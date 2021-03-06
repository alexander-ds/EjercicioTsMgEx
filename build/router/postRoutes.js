"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const post_1 = __importDefault(require("../models/post"));
class PostRoutes {
    constructor() {
        this.router = express_1.Router();
        this.routes();
    }
    // se puede colocar un tipo de datos para que nos de un retorno 
    // pero como aca no necesitamos un retorno simplemente se coloca 
    // una promesa void
    getPost(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const post = yield post_1.default.findOne({ url: req.params.url });
            console.log(req.params.url);
            res.json(post);
        });
    }
    getPosts(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const posts = yield post_1.default.find();
            res.json(posts);
        });
    }
    createPost(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { title, url, content, image } = req.body;
            const newPost = new post_1.default({ title, url, content, image });
            yield newPost.save();
            console.log(req.body);
            res.json({ data: newPost });
        });
    }
    updatePost(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { url } = req.params;
            const post = yield post_1.default.findOneAndUpdate({ url: url }, req.body, { new: true });
            res.json(post);
        });
    }
    deletePost(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { url } = req.params;
            const post = yield post_1.default.findOneAndDelete({ url: url });
            res.json({ "Deleted": "succesfulli", post });
        });
    }
    routes() {
        this.router.get('/', this.getPosts);
        this.router.get('/:url', this.getPost);
        this.router.post('/', this.createPost);
        this.router.put('/:url', this.updatePost);
        this.router.delete('/:url', this.deletePost);
    }
}
const postRoutes = new PostRoutes;
exports.default = postRoutes.router;
