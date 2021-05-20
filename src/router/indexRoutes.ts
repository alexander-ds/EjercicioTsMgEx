import {Request,Response,Router} from 'express'

class IndexRoutes{

    router: Router;
    
    constructor(){
        this.router = Router()
    }   

    routes(){
        this.router.get('/',(req,res)=> res.send('Api: /api/post'))
    }
}

const indexRoutes = new IndexRoutes
indexRoutes.routes()

export default indexRoutes.router