import {Request,Response,Router} from 'express'
import Post from '../models/post'
class PostRoutes {

    router: Router

    constructor(){
        this.router=Router()
        this.routes()
    }
    // se puede colocar un tipo de datos para que nos de un retorno 
    // pero como aca no necesitamos un retorno simplemente se coloca 
    // una promesa void
    async getPost(req: Request,res: Response): Promise<void>{
        const post = await Post.findOne({url: req.params.url})
        console.log(req.params.url)
        res.json(post)
    }

    async getPosts(req: Request,res: Response): Promise<void>{
        const posts = await Post.find()
        res.json(posts)
    }
    async createPost(req: Request,res: Response): Promise<void>{
        const { title , url , content , image } = req.body
        const newPost = new Post({title , url , content , image})
        await newPost.save()
        console.log(req.body)
        res.json({ data: newPost})
    }

    async updatePost(req: Request,res: Response): Promise<void>{
        const { url } = req.params
        const post = await Post.findOneAndUpdate({url: url}, req.body,{new: true})
        res.json(post)
    }

    async deletePost(req: Request,res: Response): Promise<void>{
        const { url } = req.params
        const post = await Post.findOneAndDelete({url: url})
        res.json({"Deleted": "succesfulli" ,post})
    }
    
    routes(){
        this.router.get('/', this.getPosts)
        this.router.get('/:url',this.getPost)
        this.router.post('/',this.createPost)
        this.router.put('/:url',this.updatePost)
        this.router.delete('/:url',this.deletePost)
    }
}
const postRoutes = new PostRoutes
export default postRoutes.router