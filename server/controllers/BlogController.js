import express from 'express'
import BlogService from '../services/BlogService';
import { Authorize } from '../middleware/authorize.js'

let _blogService = new BlogService().repository

export default class BlogController {
  constructor() {
    this.router = express.Router()
      //NOTE all routes after the authenticate method will require the user to be logged in to access
      .get('', this.getAll)
      .get('/:id', this.getById)
      .use(Authorize.authenticated)
      .post('', this.create)
      .put('/:id', this.edit)
      .delete('/:id', this.delete)
  }

  async getAll(req, res, next) {
    try {
      let data = await _blogService.find({})
      return res.send(data)
    } catch (error) { next(error) }

  }

  async getById(req, res, next) {
    try {
      let data = await _blogService.findById(req.params.id)
      if (!data) {
        throw new Error("Invalid Id")
      }
      res.send(data)
    } catch (error) { next(error) }
  }

  async create(req, res, next) {
    try {
      //NOTE the user id is accessable through req.body.uid, never trust the client to provide you this information
      req.body.authorId = req.session.uid
      let data = await _blogService.create(req.body)
      res.send(data)
    } catch (error) { next(error) }
  }

  async edit(req, res, next) {
    try {
      let data = await _blogService.findOneAndUpdate({ _id: req.params.id, authorId: req.session.uid }, req.body, { new: true })
      if (data) {
        return res.send(data)
      }
      throw new Error("invalid id")
    } catch (error) {
      next(error)
    }
  }

  async delete(req, res, next) {
    try {
      let data = await _blogService.findOneAndRemove({ _id: req.params.id, authorId: req.session.uid })
      if (!data) {
        throw new Error("invalid id")
      }
      res.send("deleted blog")
    } catch (error) { next(error) }

  }

}