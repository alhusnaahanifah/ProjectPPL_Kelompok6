import type { HttpContext } from '@adonisjs/core/http'
import hash from '@adonisjs/core/services/hash'
import { getMongoDb } from '#start/mongodb'
import { ObjectId } from 'mongodb'

export default class ProfileController {
  public async update({ request, response, session }: HttpContext) {
    const sessionUser = session.get('user')

    if (!sessionUser) {
      return response.redirect('/login')
    }

    const userId = sessionUser._id

    const fullName = request.input('fullName')
    const email = request.input('email')
    const password = request.input('password')

    const db = getMongoDb()
    const updateData: any = { fullName, email }

    if (password) {
      updateData.password = await hash.use('scrypt').make(password)
    }    

    await db.collection('users').updateOne(
      { _id: new ObjectId(userId) },
      { $set: updateData }
    )

    return response.redirect('/profile')
  }
}
