import type { HttpContext } from '@adonisjs/core/http'
import { getMongoDb } from '#start/mongodb'
import { ObjectId } from 'mongodb'

export default class PlantController {
  public async index({ inertia }: HttpContext) {
    const db = getMongoDb()
    const plant = await db.collection('plants').find().toArray()

    return inertia.render('PlantList', {
      plant,
    })
  }

  public async show({ params, inertia }: HttpContext) {
    const db = getMongoDb()
    const plant = await db.collection('plants').findOne({ _id: new ObjectId(params.id) })

    return inertia.render('SevenStepChallenge', {   
      plant,
    })
  }
}
