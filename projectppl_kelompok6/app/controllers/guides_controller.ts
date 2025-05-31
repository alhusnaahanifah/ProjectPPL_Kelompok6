import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Guide from 'App/Models/Guide'

export default class GuidesController {
  public async index({ request }: HttpContextContract) {
    const tipe = request.input('tipe')
    const query = Guide.query()
    if (tipe) query.where('tipe', tipe)
    const guides = await query
    return guides
  }

  public async show({ params }: HttpContextContract) {
    const guide = await Guide.findOrFail(params.id)
    return guide
  }

  public async store({ request }: HttpContextContract) {
    const data = request.only(['title', 'link', 'durasi', 'deskripsi', 'tipe'])
    const guide = await Guide.create(data)
    return guide
  }

  public async update({ params, request }: HttpContextContract) {
    const guide = await Guide.findOrFail(params.id)
    const data = request.only(['title', 'link', 'durasi', 'deskripsi', 'tipe'])
    guide.merge(data)
    await guide.save()
    return guide
  }

  public async destroy({ params }: HttpContextContract) {
    const guide = await Guide.findOrFail(params.id)
    await guide.delete()
    return { message: 'Guide deleted' }
  }
}