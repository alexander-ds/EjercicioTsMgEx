import {Request,Response,Router} from 'express'
import User from '../models/user'

class UserRoutes {

    router: Router

    constructor(){
        this.router=Router()
        this.routes()
    }
    // se puede colocar un tipo de datos para que nos de un retorno 
    // pero como aca no necesitamos un retorno simplemente se coloca 
    // una promesa void pero como se ve funciona de las dos maneras
    async getUser(req: Request,res: Response){
        
        // devuelve los datos que se quieren del post para este caso 
        // son el titulo , url y el contenido
         
        // const user = await User.findOne({username: req.params.username}).populate('posts','title url content')
        const user = await User.findOne({username: req.params.username}).populate('posts')
        console.log(req.params.username)
        res.json(user)
    }

    async getUsers(req: Request,res: Response){
        const users = await User.find()
        res.json(users)
    }
    async createUser(req: Request,res: Response){
        const { name,email,password,username } = req.body
        const newUser = new User({name,email,password,username})
        await newUser.save()
        console.log(req.body)
        res.json({ data: newUser})
    }

    async updateUser(req: Request,res: Response){
        const { username } = req.params
        const user = await User.findOneAndUpdate({username: username}, req.body,{new: true})
        res.json(user)
    }

    async deleteUser(req: Request,res: Response){
        const { username } = req.params
        const user = await User.findOneAndDelete({username: username})
        res.json({"Deleted": "succesfulli" ,user})
    }
    
    routes(){
        this.router.get('/', this.getUsers)
        this.router.get('/:username',this.getUser)
        this.router.post('/',this.createUser)
        this.router.put('/:username',this.updateUser)
        this.router.delete('/:username',this.deleteUser)
    }
}
const userRoutes = new UserRoutes
export default userRoutes.router