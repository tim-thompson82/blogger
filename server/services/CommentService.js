import mongoose from "mongoose"
const Schema = mongoose.Schema
const ObjectId = Schema.Types.ObjectId

const _model = new Schema({
    blogId: { type: ObjectId, ref: 'User', required: true },
    body: { type: String, required: true },
    authorId: { type: ObjectId, ref: 'User', required: true },
    name: { type: String, required: false }
}, { timestamps: true })

export default class CommentService {
    get repository() {
        return mongoose.model('comment', _model)
    }
}