import mongoose from "mongoose"
const Schema = mongoose.Schema
const ObjectId = Schema.Types.ObjectId

const _model = new Schema({
  //i need to populate "name" from userservice "name"
  authorId: { type: ObjectId, ref: 'User', required: true },
  author: { type: String, required: false },
  title: { type: String, required: true, maxlength: 60 },
  summary: { type: String, required: false, maxlength: 120 },
  img: { type: String, required: false },
  body: { type: String, required: false },
}, { timestamps: true })

export default class BlogService {
  get repository() {
    return mongoose.model('blog', _model)
  }
}
