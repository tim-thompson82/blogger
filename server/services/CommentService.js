import mongoose from "mongoose"
const Schema = mongoose.Schema
const ObjectId = Schema.Types.ObjectId

const _model = new Schema({
    body: { type: String, required: true },
    author: { type: String, ref: 'User', required: false },
}, { timestamps: true })

export default class CommentService {
    get repository() {
        return mongoose.model('comment', _model)
    }
}