import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Task from 'App/Models/Task'

export default class TasksController {
    public async index({ response }: HttpContextContract) {
        const  tasks : Task[] = await Task.all()
        return response.json(tasks)
      }
    
      public async show({ params, response }: HttpContextContract) {
        const task = await Task.find(params.id)
        return response.json(task)
      }
    
      public async store({ request, response }: HttpContextContract) {
        const data = request.only(['title', 'completed'])
        const task = await Task.create(data)
        return response.json(task)
      }
    
      public async update({ params, request, response }: HttpContextContract) {
        const task = await Task.findOrFail(params.id)
        const data = request.only(['title', 'completed'])
        task.merge(data)
        await task.save()
        return response.json(task)
      }
    
      public async destroy({ params, response }: HttpContextContract) {
        const task = await Task.findOrFail(params.id)
        await task.delete()
        return response.json({ message: 'task have been deleted' })
      }
}