import type { HttpContext } from '@adonisjs/core/http'
import { getMongoDb } from '#start/mongodb'
import { ObjectId } from 'mongodb'

export default class AdminController {
  public async index({ inertia, session, response }: HttpContext) {
    const user = session.get('user')

    if (!user || user.role !== 'admin') {
      return response.redirect('/login')
    }

    const db = getMongoDb()

    // Hitung jumlah dokumen di masing-masing koleksi
    const totalUsers = await db.collection('users').countDocuments()
    const totalPlants = await db.collection('plants').countDocuments()
    const totalExperiences = await db.collection('experiences').countDocuments()
    const totalQuestions = await db.collection('pertanyaan').countDocuments()

    return inertia.render('admin/DashboardAdmin', {
      user,
      stats: {
        users: totalUsers,
        plants: totalPlants,
        experiences: totalExperiences,
        questions: totalQuestions,
      },
    })
  }

  public async kelolaUsers({ inertia, session, response }: HttpContext) {
    const user = session.get('user')
    if (!user || user.role !== 'admin') {
        return response.redirect('/login')
    }

    const db = getMongoDb()
    const users = await db.collection('users').find().toArray()

    return inertia.render('admin/KelolaUsers', { user, users })
    }

    public async deleteUser({ params, session, response }: HttpContext) {
    const user = session.get('user')
    if (!user || user.role !== 'admin') {
      return response.redirect('/login')
    }

    try {
      const db = getMongoDb()
      const result = await db.collection('users').deleteOne({ 
        _id: new ObjectId(params.id) 
      })

      if (result.deletedCount === 1) {
        return response.redirect().back()
      } else {
        return response.status(404).json({ message: 'User tidak ditemukan' })
      }
    } catch (error) {
      console.error('Error deleting user:', error)
      return response.status(500).json({ message: 'Gagal menghapus user' })
    }
  }

  public async kelolaTanaman({ inertia, session, response }: HttpContext) {
    const user = session.get('user')
    if (!user || user.role !== 'admin') {
        return response.redirect('/login')
    }

    const db = getMongoDb()
    const plants = await db.collection('plants').find().toArray()

    return inertia.render('admin/KelolaTanaman', { user, plants })
  }

  public async storePlant({ request, session, response }: HttpContext) {
    const user = session.get('user')
    if (!user || user.role !== 'admin') {
      return response.redirect('/login')
    }

    try {
      const db = getMongoDb()
      const { plant, steps } = request.body()

      // Struktur default jika steps tidak disediakan
      const defaultSteps = steps || [
        {
          id: 1,
          title: "Persiapan Alat dan Bahan",
          locked: false,
          challenges: [
            {
              id: 1,
              title: "Siapkan Wadah Tanam",
              description: `Gunakan tray semai atau netpot kecil yang sesuai untuk ${plant}.`,
              tips: [
                "Pastikan tray mudah menyerap air",
                "Bersihkan dengan air panas sebelum digunakan"
              ],
              completed: false,
              completedAt: null,
              note: ""
            },
            {
              id: 2,
              title: "Siapkan Nutrisi dan Media",
              description: "Gunakan AB Mix khusus sayuran daun dan media seperti rockwool atau cocopeat.",
              tips: [
                "Jaga pH larutan sekitar 6.0",
                "Sterilkan media dengan air mendidih jika perlu"
              ],
              completed: false,
              completedAt: null,
              note: ""
            }
          ]
        },
        {
          id: 2,
          title: "Penyemaian Benih",
          locked: true,
          challenges: [
            {
              id: 1,
              title: "Semai Benih di Media",
              description: `Taburkan benih ${plant} secara merata di atas media tanam.`,
              tips: [
                "Lembapkan media sebelum tabur",
                "Tutupi semaian hingga berkecambah"
              ],
              completed: false,
              completedAt: null,
              note: ""
            }
          ]
        }
      ]

      const plantData = {
        plant,
        steps: defaultSteps,
        createdAt: new Date(),
        updatedAt: new Date()
      }

      await db.collection('plants').insertOne(plantData)
      return response.redirect().back()

    } catch (error) {
      console.error('Error adding plant:', error)
      return response.status(500).json({ message: 'Gagal menambah tanaman' })
    }
  }

  public async updatePlant({ params, request, response, session }: HttpContext) {
    const user = session.get('user')
    if (!user || user.role !== 'admin') {
      return response.redirect('/login')
    }

    try {
      const db = getMongoDb()
      const plantId = params.id
      const updatedData = request.body()

      // Pastikan ada data yang dikirim
      if (!updatedData || Object.keys(updatedData).length === 0) {
        return response.badRequest({ message: 'Data kosong' })
      }

      // Tambahkan updatedAt
      updatedData.updatedAt = new Date()

      // Jalankan update
      const result = await db.collection('plants').updateOne(
        { _id: new ObjectId(plantId) },
        { $set: updatedData }
      )

      if (result.modifiedCount === 1) {
        return response.status(200).json({ message: 'Tanaman berhasil diupdate' })
      } else {
        return response.status(404).json({ message: 'Tanaman tidak ditemukan atau tidak ada perubahan' })
      }

    } catch (error) {
      console.error('Error updating plant:', error)
      return response.status(500).json({ message: 'Gagal mengupdate tanaman' })
    }
  }


  public async deletePlant({ params, session, response }: HttpContext) {
    const user = session.get('user')
    if (!user || user.role !== 'admin') {
      return response.redirect('/login')
    }

    try {
      const db = getMongoDb()
      const result = await db.collection('plants').deleteOne({ 
        _id: new ObjectId(params.id) 
      })

      if (result.deletedCount === 1) {
        return response.redirect().back()
      } else {
        return response.status(404).json({ message: 'Tanaman tidak ditemukan' })
      }
    } catch (error) {
      console.error('Error deleting plant:', error)
      return response.status(500).json({ message: 'Gagal menghapus tanaman' })
    }
  }

  public async getPlant({ params, session, response }: HttpContext) {
    const user = session.get('user')
    if (!user || user.role !== 'admin') {
      return response.redirect('/login')
    }

    try {
      const db = getMongoDb()
      const plant = await db.collection('plants').findOne({ 
        _id: new ObjectId(params.id) 
      })

      if (plant) {
        return response.json(plant)
      } else {
        return response.status(404).json({ message: 'Tanaman tidak ditemukan' })
      }
    } catch (error) {
      console.error('Error getting plant:', error)
      return response.status(500).json({ message: 'Gagal mengambil data tanaman' })
    }
  }

  
}
