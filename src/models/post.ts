import { Schema,model } from "mongoose"

const PostSchema = new Schema({
    title: { type: String , required: true },
    url: { type: String, required: true , unique: true , lowcase: true},
    content: { type: String, required: true },
    image: String ,
    createDat: { type: Date, default: Date.now },
    uoDateDat: Date
})

export default model('Post',PostSchema)