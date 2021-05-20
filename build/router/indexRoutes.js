"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
class IndexRoutes {
    constructor() {
        this.router = express_1.Router();
    }
    routes() {
        this.router.get('/', (req, res) => res.send('Api: /api/post'));
    }
}
const indexRoutes = new IndexRoutes;
indexRoutes.routes();
exports.default = indexRoutes.router;
