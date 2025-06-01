// app/Controllers/Http/GuidesController.ts
import type { HttpContext } from '@adonisjs/core/http'
import Guide from '#models/guides'
import { getMongoDb } from '#start/mongodb'
import { ObjectId } from 'mongodb'

export default class GuidesController {
  // Handle /info route - shows infographics, videos, FAQs (tabs 1-3)
  public async info({ inertia, session }: HttpContext) {
    try {
     
      const { infographics, videos, faqs } = await Guide.fetchAll()
      // Serialize data with proper error handling and null filtering
      const serializedData = {
        user : session.get('user'),
        infographics: (infographics || []).filter(item => item !== null).map(item => item.serialize()),
        videos: (videos || []).filter(item => item !== null).map(item => item.serialize()),
        faqs: (faqs || []).filter(item => item !== null).map(item => item.serialize()),
        experiences: [], // Empty for info route
        activeRoute: 'info' // Add route identifier
      }

      return inertia.render('Guides', serializedData)
     
    } catch (error) {
      console.error('❌ Error in GuidesController.info:', error)
     
      // Return empty data on error
      const errorData = {
        user : session.get('user'),
        infographics: [],
        videos: [],
        faqs: [],
        experiences: [],
        activeRoute: 'info'
      }
      
      return inertia.render('Guides', errorData)
    }
  }

  // Handle /guides route - shows community experiences (tab 4)
  public async index({ inertia, session }: HttpContext) {
    try {

      const db = getMongoDb()
      const experiences = await db.collection('experiences').find().sort({ createdAt: -1 }).toArray()

      // Convert MongoDB _id to string for Vue
      const experiencesWithStringId = experiences.map(exp => ({
        ...exp,
        id: exp._id.toString(),
        _id: exp._id.toString()
      }))

      // Also fetch guide data for other tabs
      const { infographics, videos, faqs } = await Guide.fetchAll()

      const serializedData = {
        user : session.get('user'),
        infographics: (infographics || []).filter(item => item !== null).map(item => item.serialize()),
        videos: (videos || []).filter(item => item !== null).map(item => item.serialize()),
        faqs: (faqs || []).filter(item => item !== null).map(item => item.serialize()),
        experiences: experiencesWithStringId,
        activeRoute: 'guides' // Add route identifier
      }

      return inertia.render('Guides', serializedData)

    } catch (error) {
      console.error('❌ Error in GuidesController.index:', error)
      
      const errorData = {
        user : session.get('user'),
        infographics: [],
        videos: [],
        faqs: [],
        experiences: [],
        activeRoute: 'guides'
      }
      
      return inertia.render('Guides', errorData)
    }
  }

  // Handle community post creation
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

  // Handle community post update
  public async update({ params, request, response, session }: HttpContext) {
    const user = session.get('user')
    if (!user) {
      return response.unauthorized('Silakan login terlebih dahulu.')
    }

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

    let photoUrl = experience.photo
    if (photoFile) {
      await photoFile.move('./uploads')
      photoUrl = `/uploads/${photoFile.fileName}`
    }

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

  // Handle community post deletion
  public async delete({ params, response, session }: HttpContext) {
    const user = session.get('user')
    if (!user) {
      return response.unauthorized('Silakan login terlebih dahulu.')
    }

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
}