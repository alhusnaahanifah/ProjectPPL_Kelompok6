import type { HttpContext } from '@adonisjs/core/http'
import { getMongoDb } from '#start/mongodb'
import { ObjectId } from 'mongodb'

export default class AdminPanduanController {
  /**
   * Display the guides management page
   */
  public async index({ inertia, session, response }: HttpContext) {
    const user = session.get('user')
    
    if (!user || user.role !== 'admin') {
      return response.redirect('/login')
    }

    try {
      const db = getMongoDb()
      
      // ✅ FIXED: Gunakan nama collection yang sesuai dengan database
      const [infographics, videos, faqs, experiences] = await Promise.all([
        db.collection('infografis').find().sort({ createdAt: -1 }).toArray(),
        db.collection('video').find().sort({ createdAt: -1 }).toArray(),
        db.collection('faq').find().sort({ createdAt: -1 }).toArray(),
        db.collection('experiences').find().sort({ createdAt: -1 }).toArray()
      ])

      return inertia.render('admin/ManagePanduan', {
        user,
        infographics: infographics.map(item => ({
          ...item,
          id: item._id.toString(),
          _id: item._id.toString()
        })),
        videos: videos.map(item => ({
          ...item,
          id: item._id.toString(),
          _id: item._id.toString()
        })),
        faqs: faqs.map(item => ({
          ...item,
          id: item._id.toString(),
          _id: item._id.toString()
        })),
        experiences: experiences.map(item => ({
          ...item,
          id: item._id.toString(),
          _id: item._id.toString()
        }))
      })
    } catch (error) {
      console.error('❌ Error fetching guides data:', error)
      // ✅ ADDED: Redirect to safe page on error instead of throwing 500
      session.flash('error', 'Gagal memuat data panduan')
      return response.redirect('/admin')
    }
  }

  // INFOGRAPHIC METHODS
  /**
   * Store a new infographic
   */
  public async storeInfographic({ request, response, session }: HttpContext) {
    const user = session.get('user')
    
    if (!user || user.role !== 'admin') {
      return response.redirect('/login')
    }

    try {
      const { title, deskripsi, link } = request.body()

      // Basic validation
      if (!title || !deskripsi || !link) {
        return response.status(422).json({
          message: 'Semua field wajib diisi'
        })
      }

      const db = getMongoDb()
      
      const infographic = {
        title,
        deskripsi,
        link,
        createdBy: user.id,
        createdAt: new Date(),
        updatedAt: new Date()
      }

      await db.collection('infografis').insertOne(infographic)

      return response.redirect().back()
    } catch (error) {
      console.error('❌ Error creating infographic:', error)
      return response.status(500).json({ 
        message: 'Terjadi kesalahan saat menambahkan infografis' 
      })
    }
  }

  /**
   * Update an existing infographic
   */
  public async updateInfographic({ params, request, response, session }: HttpContext) {
    const user = session.get('user')
    
    if (!user || user.role !== 'admin') {
      return response.redirect('/login')
    }

    try {
      const { id } = params
      
      if (!ObjectId.isValid(id)) {
        return response.badRequest('ID tidak valid')
      }

      const { title, deskripsi, link } = request.body()

      // Basic validation
      if (!title || !deskripsi || !link) {
        return response.status(422).json({
          message: 'Semua field wajib diisi'
        })
      }

      const db = getMongoDb()
      
      const result = await db.collection('infografis').updateOne(
        { _id: new ObjectId(id) },
        {
          $set: {
            title,
            deskripsi,
            link,
            updatedBy: user.id,
            updatedAt: new Date()
          }
        }
      )

      if (result.modifiedCount === 1) {
        return response.redirect().back()
      } else {
        return response.status(404).json({ 
          message: 'Infografis tidak ditemukan atau tidak ada perubahan' 
        })
      }
    } catch (error) {
      console.error('❌ Error updating infographic:', error)
      return response.status(500).json({ 
        message: 'Terjadi kesalahan saat memperbarui infografis' 
      })
    }
  }

  /**
   * Delete an infographic
   */
  public async destroyInfographic({ params, response, session }: HttpContext) {
    const user = session.get('user')
    
    if (!user || user.role !== 'admin') {
      return response.redirect('/login')
    }

    try {
      const { id } = params
      
      if (!ObjectId.isValid(id)) {
        return response.badRequest('ID tidak valid')
      }

      const db = getMongoDb()
      
      const result = await db.collection('infografis').deleteOne({ 
        _id: new ObjectId(id) 
      })

      if (result.deletedCount === 1) {
        return response.redirect().back()
      } else {
        return response.status(404).json({ 
          message: 'Infografis tidak ditemukan' 
        })
      }
    } catch (error) {
      console.error('❌ Error deleting infographic:', error)
      return response.status(500).json({ 
        message: 'Terjadi kesalahan saat menghapus infografis' 
      })
    }
  }

  // VIDEO METHODS
  /**
   * Store a new video
   */
  public async storeVideo({ request, response, session }: HttpContext) {
    const user = session.get('user')
    
    if (!user || user.role !== 'admin') {
      return response.redirect('/login')
    }

    try {
      const { title, link, durasi } = request.body()

      // Basic validation
      if (!title || !link || !durasi) {
        return response.status(422).json({
          message: 'Semua field wajib diisi'
        })
      }

      const db = getMongoDb()
      
      const video = {
        title,
        link,
        durasi,
        createdBy: user.id,
        createdAt: new Date(),
        updatedAt: new Date()
      }

      await db.collection('video').insertOne(video)

      return response.redirect().back()
    } catch (error) {
      console.error('❌ Error creating video:', error)
      return response.status(500).json({ 
        message: 'Terjadi kesalahan saat menambahkan video' 
      })
    }
  }

  /**
   * Update an existing video
   */
  public async updateVideo({ params, request, response, session }: HttpContext) {
    const user = session.get('user')
    
    if (!user || user.role !== 'admin') {
      return response.redirect('/login')
    }

    try {
      const { id } = params
      
      if (!ObjectId.isValid(id)) {
        return response.badRequest('ID tidak valid')
      }

      const { title, link, durasi } = request.body()

      // Basic validation
      if (!title || !link || !durasi) {
        return response.status(422).json({
          message: 'Semua field wajib diisi'
        })
      }

      const db = getMongoDb()
      
      const result = await db.collection('video').updateOne(
        { _id: new ObjectId(id) },
        {
          $set: {
            title,
            link,
            durasi,
            updatedBy: user.id,
            updatedAt: new Date()
          }
        }
      )

      if (result.modifiedCount === 1) {
        return response.redirect().back()
      } else {
        return response.status(404).json({ 
          message: 'Video tidak ditemukan atau tidak ada perubahan' 
        })
      }
    } catch (error) {
      console.error('❌ Error updating video:', error)
      return response.status(500).json({ 
        message: 'Terjadi kesalahan saat memperbarui video' 
      })
    }
  }

  /**
   * Delete a video
   */
  public async destroyVideo({ params, response, session }: HttpContext) {
    const user = session.get('user')
    
    if (!user || user.role !== 'admin') {
      return response.redirect('/login')
    }

    try {
      const { id } = params
      
      if (!ObjectId.isValid(id)) {
        return response.badRequest('ID tidak valid')
      }

      const db = getMongoDb()
      
      const result = await db.collection('video').deleteOne({ 
        _id: new ObjectId(id) 
      })

      if (result.deletedCount === 1) {
        return response.redirect().back()
      } else {
        return response.status(404).json({ 
          message: 'Video tidak ditemukan' 
        })
      }
    } catch (error) {
      console.error('❌ Error deleting video:', error)
      return response.status(500).json({ 
        message: 'Terjadi kesalahan saat menghapus video' 
      })
    }
  }

  // FAQ METHODS
  /**
   * Store a new FAQ
   */
  public async storeFaq({ request, response, session }: HttpContext) {
    const user = session.get('user')
    
    if (!user || user.role !== 'admin') {
      return response.redirect('/login')
    }

    try {
      const { pertanyaan, jawaban } = request.body()

      // Basic validation
      if (!pertanyaan || !jawaban) {
        return response.status(422).json({
          message: 'Pertanyaan dan jawaban wajib diisi'
        })
      }

      const db = getMongoDb()
      
      const faq = {
        pertanyaan,
        jawaban,
        createdBy: user.id,
        createdAt: new Date(),
        updatedAt: new Date()
      }

      await db.collection('faq').insertOne(faq)

      return response.redirect().back()
    } catch (error) {
      console.error('❌ Error creating FAQ:', error)
      return response.status(500).json({ 
        message: 'Terjadi kesalahan saat menambahkan FAQ' 
      })
    }
  }

  /**
   * Update an existing FAQ
   */
  public async updateFaq({ params, request, response, session }: HttpContext) {
    const user = session.get('user')
    
    if (!user || user.role !== 'admin') {
      return response.redirect('/login')
    }

    try {
      const { id } = params
      
      if (!ObjectId.isValid(id)) {
        return response.badRequest('ID tidak valid')
      }

      const { pertanyaan, jawaban } = request.body()

      // Basic validation
      if (!pertanyaan || !jawaban) {
        return response.status(422).json({
          message: 'Pertanyaan dan jawaban wajib diisi'
        })
      }

      const db = getMongoDb()
      
      const result = await db.collection('faq').updateOne(
        { _id: new ObjectId(id) },
        {
          $set: {
            pertanyaan,
            jawaban,
            updatedBy: user.id,
            updatedAt: new Date()
          }
        }
      )

      if (result.modifiedCount === 1) {
        return response.redirect().back()
      } else {
        return response.status(404).json({ 
          message: 'FAQ tidak ditemukan atau tidak ada perubahan' 
        })
      }
    } catch (error) {
      console.error('❌ Error updating FAQ:', error)
      return response.status(500).json({ 
        message: 'Terjadi kesalahan saat memperbarui FAQ' 
      })
    }
  }

  /**
   * Delete a FAQ
   */
  public async destroyFaq({ params, response, session }: HttpContext) {
    const user = session.get('user')
    
    if (!user || user.role !== 'admin') {
      return response.redirect('/login')
    }

    try {
      const { id } = params
      
      if (!ObjectId.isValid(id)) {
        return response.badRequest('ID tidak valid')
      }

      const db = getMongoDb()
      
      const result = await db.collection('faq').deleteOne({ 
        _id: new ObjectId(id) 
      })

      if (result.deletedCount === 1) {
        return response.redirect().back()
      } else {
        return response.status(404).json({ 
          message: 'FAQ tidak ditemukan' 
        })
      }
    } catch (error) {
      console.error('❌ Error deleting FAQ:', error)
      return response.status(500).json({ 
        message: 'Terjadi kesalahan saat menghapus FAQ' 
      })
    }
  }

  // EXPERIENCE METHODS
  /**
   * Delete a community experience
   */
  public async destroyExperience({ params, response, session }: HttpContext) {
    const user = session.get('user')
    
    if (!user || user.role !== 'admin') {
      return response.redirect('/login')
    }

    try {
      const { id } = params
      
      if (!ObjectId.isValid(id)) {
        return response.badRequest('ID tidak valid')
      }

      const db = getMongoDb()
      
      const result = await db.collection('experiences').deleteOne({ 
        _id: new ObjectId(id) 
      })

      if (result.deletedCount === 1) {
        return response.redirect().back()
      } else {
        return response.status(404).json({ 
          message: 'Pengalaman tidak ditemukan' 
        })
      }
    } catch (error) {
      console.error('❌ Error deleting experience:', error)
      return response.status(500).json({ 
        message: 'Terjadi kesalahan saat menghapus pengalaman' 
      })
    }
  }

  // UTILITY METHODS
  /**
   * Get statistics for dashboard
   */
  public async getStatistics({ response, session }: HttpContext) {
    const user = session.get('user')
    
    if (!user || user.role !== 'admin') {
      return response.redirect('/login')
    }

    try {
      const db = getMongoDb()
      
      const [
        infographicsCount,
        videosCount,
        faqsCount,
        experiencesCount
      ] = await Promise.all([
        db.collection('infografis').countDocuments(),
        db.collection('video').countDocuments(),
        db.collection('faq').countDocuments(),
        db.collection('experiences').countDocuments()
      ])

      return response.json({
        statistics: {
          infographics: infographicsCount,
          videos: videosCount,
          faqs: faqsCount,
          experiences: experiencesCount
        }
      })
    } catch (error) {
      console.error('❌ Error fetching statistics:', error)
      return response.status(500).json({ 
        message: 'Terjadi kesalahan saat memuat statistik' 
      })
    }
  }
}