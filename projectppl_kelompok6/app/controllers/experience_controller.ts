// app/Controllers/Http/ExperienceController.ts
import type { HttpContext } from '@adonisjs/core/http'
import { getMongoDb } from '#start/mongodb'
import { ObjectId } from 'mongodb'

export default class ExperienceController {
  public async index({ inertia, session }: HttpContext) {
    const db = getMongoDb()
    const experiences = await db.collection('experiences').find().sort({ createdAt: -1 }).toArray()

    const user = session.get('user')

    // Convert MongoDB _id to string untuk Vue bisa gunakan
    const experiencesWithStringId = experiences.map(exp => ({
      ...exp,
      id: exp._id.toString(), // tambahkan field id sebagai string
      _id: exp._id.toString()  // convert _id juga ke string
    }))

    return inertia.render('Guides', {
      experiences: experiencesWithStringId,
      user,
    })
  }

  public async store({ request, response, session }: HttpContext) {
    const user = session.get('user')
    if (!user) {
      return response.unauthorized('Silakan login terlebih dahulu.')
    }

    const story = request.input('story')
    const photoFile = request.file('photo')

    let photoUrl = null
    if (photoFile) {
      await photoFile.move('./uploads')
      photoUrl = `/uploads/${photoFile.fileName}`
    }

    const db = getMongoDb()
    await db.collection('experiences').insertOne({
      user_id: user.id,
      username: user.fullName || user.email,
      story,
      photo: photoUrl,
      createdAt: new Date()
    })

    return response.redirect().back()
  }

  // Alternative POST route untuk edit (lebih reliable daripada PUT dengan form data)
  public async edit({ params, request, response, session }: HttpContext) {
    const user = session.get('user')
    if (!user) {
      return response.unauthorized('Silakan login terlebih dahulu.')
    }

    // Validasi ObjectId
    if (!ObjectId.isValid(params.id)) {
      return response.badRequest('ID tidak valid')
    }

    const db = getMongoDb()
    const experience = await db.collection('experiences').findOne({ 
      _id: new ObjectId(params.id) 
    })

    if (!experience) {
      return response.notFound('Pengalaman tidak ditemukan')
    }

    if (experience.user_id !== user.id) {
      return response.unauthorized('Anda tidak diizinkan mengedit postingan ini')
    }

    const story = request.input('story')
    const photoFile = request.file('photo')

    let photoUrl = experience.photo // gunakan foto lama jika tidak ada foto baru
    if (photoFile) {
      await photoFile.move('./uploads')
      photoUrl = `/uploads/${photoFile.fileName}`
    }

    // Update data
    await db.collection('experiences').updateOne(
      { _id: new ObjectId(params.id) },
      {
        $set: {
          story,
          photo: photoUrl,
          updatedAt: new Date()
        }
      }
    )

    return response.redirect().back()
  }

  public async update({ params, request, response, session }: HttpContext) {
    const user = session.get('user')
    if (!user) {
      return response.unauthorized('Silakan login terlebih dahulu.')
    }

    // Validasi ObjectId
    if (!ObjectId.isValid(params.id)) {
      return response.badRequest('ID tidak valid')
    }

    const db = getMongoDb()
    const experience = await db.collection('experiences').findOne({ 
      _id: new ObjectId(params.id) 
    })

    if (!experience) {
      return response.notFound('Pengalaman tidak ditemukan')
    }

    if (experience.user_id !== user.id) {
      return response.unauthorized('Anda tidak diizinkan mengedit postingan ini')
    }

    const story = request.input('story')
    const photoFile = request.file('photo')

    let photoUrl = experience.photo // gunakan foto lama jika tidak ada foto baru
    if (photoFile) {
      await photoFile.move('./uploads')
      photoUrl = `/uploads/${photoFile.fileName}`
    }

    // Update data
    await db.collection('experiences').updateOne(
      { _id: new ObjectId(params.id) },
      {
        $set: {
          story,
          photo: photoUrl,
          updatedAt: new Date()
        }
      }
    )

    return response.redirect().back()
  }

  public async delete({ params, response, session }: HttpContext) {
    const user = session.get('user')
    if (!user) {
      return response.unauthorized('Silakan login terlebih dahulu.')
    }

    // Validasi ObjectId sebelum digunakan
    if (!ObjectId.isValid(params.id)) {
      return response.badRequest('ID tidak valid')
    }

    const db = getMongoDb()
    const experience = await db.collection('experiences').findOne({ 
      _id: new ObjectId(params.id) 
    })

    if (!experience) {
      return response.notFound('Pengalaman tidak ditemukan')
    }

    if (experience.user_id !== user.id) {
      return response.unauthorized('Anda tidak diizinkan menghapus postingan ini')
    }

    await db.collection('experiences').deleteOne({ 
      _id: new ObjectId(params.id) 
    })

    return response.redirect().back()
  }

  // Method untuk mendapatkan detail experience (opsional, untuk debugging)
  public async show({ params, response }: HttpContext) {
    if (!ObjectId.isValid(params.id)) {
      return response.badRequest('ID tidak valid')
    }

    const db = getMongoDb()
    const experience = await db.collection('experiences').findOne({ 
      _id: new ObjectId(params.id) 
    })

    if (!experience) {
      return response.notFound('Pengalaman tidak ditemukan')
    }

    return response.json({
      ...experience,
      id: experience._id.toString()
    })
  }
}