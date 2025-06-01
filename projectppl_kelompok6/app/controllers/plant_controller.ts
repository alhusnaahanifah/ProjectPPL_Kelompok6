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

  public async show({ params, inertia, session }: HttpContext) {
    const db = getMongoDb()
    const plantId = params.id
    const user = session.get('user')
    if (!user) {
      return { success: false, message: 'User not authenticated' };
    }
    const userId = user.id

    const plant = await db.collection('plants').findOne({ _id: new ObjectId(plantId) })

    // Ambil progress user untuk plant ini
    const progress = await db.collection('user_plant_progress')
      .find({ user_id: userId, plant_id: plantId })
      .toArray()

    return inertia.render('SevenStepChallenge', {
      plant,
      progress
    })
  }



    // Tandai challenge selesai
  public async completeChallenge({ response, params, session }: HttpContext) {
    const db = getMongoDb()
    const plantId = params.plantId
    const stepId = params.stepId
    const challengeId = params.challengeId
    const user = session.get('user')

    await db.collection('user_plant_progress').updateOne(
      {
        user_id: user.id,
        plant_id: plantId,
        step_id: parseInt(stepId),
        challenge_id: parseInt(challengeId),
      },
      {
        $set: {
          completed: true,
          completedAt: new Date(),
        },
      },
      { upsert: true }
    )

    return response.redirect().back()
  }

  // Simpan catatan
  public async saveNote({ response, params, request, session }: HttpContext) {
    const db = getMongoDb()
    const plantId = params.plantId
    const stepId = params.stepId
    const challengeId = params.challengeId
    const { note } = request.only(['note']);
    const user = session.get('user')

    await db.collection('user_plant_progress').updateOne(
      {
        user_id: user.id,
        plant_id: plantId,
        step_id: parseInt(stepId),
        challenge_id: parseInt(challengeId),
      },
      {
        $set: {
          note
        },
      },
      { upsert: true }
    )
    return response.redirect().back()
  }

}
