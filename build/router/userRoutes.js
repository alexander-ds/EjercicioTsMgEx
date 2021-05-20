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
const user_1 = __importDefault(require("../models/user"));
class UserRoutes {
    constructor() {
        this.router = express_1.Router();
        this.routes();
    }
    // se puede colocar un tipo de datos para que nos de un retorno 
    // pero como aca no necesitamos un retorno simplemente se coloca 
    // una promesa void pero como se ve funciona de las dos maneras
    getUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            // devuelve los datos que se quieren del post para este caso 
            // son el titulo , url y el contenido
            // const user = await User.findOne({username: req.params.username}).populate('posts','title url content')
            const user = yield user_1.default.findOne({ username: req.params.username }).populate('posts');
            console.log(req.params.username);
            res.json(user);
        });
    }
    getUsers(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const users = yield user_1.default.find();
            res.json(users);
        });
    }
    createUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { name, email, password, username } = req.body;
            const newUser = new user_1.default({ name, email, password, username });
            yield newUser.save();
            console.log(req.body);
            res.json({ data: newUser });
        });
    }
    updateUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { username } = req.params;
            const user = yield user_1.default.findOneAndUpdate({ username: username }, req.body, { new: true });
            res.json(user);
        });
    }
    deleteUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { username } = req.params;
            const user = yield user_1.default.findOneAndDelete({ username: username });
            res.json({ "Deleted": "succesfulli", user });
        });
    }
    routes() {
        this.router.get('/', this.getUsers);
        this.router.get('/:username', this.getUser);
        this.router.post('/', this.createUser);
        this.router.put('/:username', this.updateUser);
        this.router.delete('/:username', this.deleteUser);
    }
}
const userRoutes = new UserRoutes;
exports.default = userRoutes.router;
