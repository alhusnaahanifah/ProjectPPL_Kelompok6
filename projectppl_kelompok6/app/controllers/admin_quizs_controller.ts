import type { HttpContext } from '@adonisjs/core/http'
import { getMongoDb } from '#start/mongodb'
import { ObjectId } from 'mongodb'

export default class AdminQuizsController {
    public async index({ inertia, session }: HttpContext) {
        const db = getMongoDb()
        const user = session.get('user')

        const pertanyaanDocs = await db.collection('pertanyaan').find().toArray()
        const jawabanDocs = await db.collection('jawaban').find().toArray()

        const pertanyaan = pertanyaanDocs.map(p => ({
            id: p._id.toString(),
            text: p.Pertanyaan,
        }))

        // PERBAIKAN: Format jawaban sesuai dengan QuizController
        const jawaban = jawabanDocs.map(j => {
            const { _id, Tumbuhan, createdAt, updatedAt, ...answers } = j
            return {
                id: _id.toString(),
                tumbuhan: Tumbuhan,
                // Sertakan semua field jawaban langsung di level root
                ...answers
            }
        })

        return inertia.render('admin/KelolaQuiz', {
            user,
            pertanyaan,
            jawaban
        })
    }

    // Tambah pertanyaan baru
    public async storePertanyaan({ request, response }: HttpContext) {
        const { pertanyaan } = request.only(['pertanyaan'])
        if (!pertanyaan) return response.badRequest({ message: 'Pertanyaan wajib diisi' })

        const db = getMongoDb()
        await db.collection('pertanyaan').insertOne({ 
            Pertanyaan: pertanyaan,
            createdAt: new Date()
        })
        return response.redirect().back()
    }

    public async updatePertanyaan({ request, params, response }: HttpContext) {
        const { pertanyaan } = request.only(['pertanyaan'])
        if (!pertanyaan) return response.badRequest({ message: 'Pertanyaan wajib diisi' })

        const db = getMongoDb()
        const result = await db.collection('pertanyaan').updateOne(
            { _id: new ObjectId(params.id) },
            { $set: { Pertanyaan: pertanyaan, updatedAt: new Date() } }
        )

        if (result.modifiedCount === 0) {
            return response.notFound({ message: 'Pertanyaan tidak ditemukan' })
        }

        return response.redirect().back()
    }

    // Hapus pertanyaan
    public async deletePertanyaan({ params, response }: HttpContext) {
        const db = getMongoDb()
        const result = await db.collection('pertanyaan').deleteOne({ _id: new ObjectId(params.id) })

        if (result.deletedCount === 0) {
            return response.notFound({ message: 'Pertanyaan tidak ditemukan' })
        }

        return response.redirect().back()
    }

    // Tambah tanaman dan jawaban
    public async storeJawaban({ request, response }: HttpContext) {
        const { Tumbuhan, answers } = request.only(['Tumbuhan', 'answers'])

        if (!Tumbuhan || !answers) return response.badRequest({ message: 'Data tidak lengkap' })

        // Validasi bahwa Tumbuhan belum ada
        const db = getMongoDb()
        const existingPlant = await db.collection('jawaban').findOne({ Tumbuhan })
        
        if (existingPlant) {
            return response.badRequest({ message: 'Tanaman sudah ada dalam database' })
        }

        await db.collection('jawaban').insertOne({ 
            Tumbuhan, 
            ...answers,
            createdAt: new Date()
        })
        return response.redirect().back()
    }

    // GET /admin/quiz/jawaban/:tumbuhan
    public async showJawabanByTumbuhan({ params, response }: HttpContext) {
        const { tumbuhan } = params
        const db = getMongoDb()

        // Decode URI component untuk handle spasi dll
        const decodedTumbuhan = decodeURIComponent(tumbuhan)
        
        const doc = await db.collection('jawaban').findOne({ 
            Tumbuhan: decodedTumbuhan 
        })

        if (!doc) {
            return response.notFound({ message: 'Jawaban tidak ditemukan' })
        }

        const { _id, Tumbuhan: plantName, createdAt, updatedAt, ...answers } = doc

        return response.json({
            id: _id.toString(),
            tumbuhan: plantName,
            ...answers
        })
    }

    // PERBAIKAN: Tambah method untuk search
    public async searchJawaban({ params, response }: HttpContext) {
        const { tumbuhan } = params
        const db = getMongoDb()

        const decodedTumbuhan = decodeURIComponent(tumbuhan)
        
        // Cari menggunakan regex untuk pencarian yang lebih fleksibel
        const docs = await db.collection('jawaban').find({ 
            Tumbuhan: { $regex: decodedTumbuhan, $options: 'i' }
        }).toArray()

        if (docs.length === 0) {
            return response.notFound({ message: 'Tanaman tidak ditemukan' })
        }

        const jawaban = docs.map(j => {
            const { _id, Tumbuhan, createdAt, updatedAt, ...answers } = j
            return {
                id: _id.toString(),
                tumbuhan: Tumbuhan,
                ...answers
            }
        })

        return response.json(jawaban)
    }

    // PUT /admin/quiz/jawaban/:tumbuhan
    public async updateJawaban({ params, request, response }: HttpContext) {
        const { tumbuhan } = params
        const { Tumbuhan: newTumbuhan, answers } = request.only(['Tumbuhan', 'answers'])

        if (!answers) {
            return response.badRequest({ message: 'Jawaban tidak boleh kosong' })
        }

        const db = getMongoDb()
        
        // Handle perubahan nama tumbuhan
        const updateData = {
            ...answers,
            updatedAt: new Date()
        }
        
        // Jika nama tumbuhan berubah, tambahkan ke update data
        if (newTumbuhan && newTumbuhan !== tumbuhan) {
            // PERBAIKAN: Validasi nama tumbuhan baru tidak duplikat
            const existingPlant = await db.collection('jawaban').findOne({ 
                Tumbuhan: newTumbuhan,
                Tumbuhan: { $ne: decodeURIComponent(tumbuhan) } // exclude current plant
            })
            
            if (existingPlant) {
                return response.badRequest({ message: 'Nama tanaman sudah ada dalam database' })
            }
            
            updateData.Tumbuhan = newTumbuhan
        }

        const result = await db.collection('jawaban').updateOne(
            { Tumbuhan: decodeURIComponent(tumbuhan) },
            { $set: updateData }
        )

        if (result.matchedCount === 0) {
            return response.notFound({ message: 'Tumbuhan tidak ditemukan' })
        }

        return response.redirect().back()
    }

    // DELETE /admin/quiz/jawaban/:tumbuhan
    public async deleteJawaban({ params, response }: HttpContext) {
        const { tumbuhan } = params
        const decodedTumbuhan = decodeURIComponent(tumbuhan)

        const db = getMongoDb()
        const result = await db.collection('jawaban').deleteOne({ Tumbuhan: decodedTumbuhan })

        if (result.deletedCount === 0) {
            return response.notFound({ message: 'Tumbuhan tidak ditemukan' })
        }

        return response.redirect().back()
    }

    // PERBAIKAN: Tambah method untuk get data via API (seperti QuizController)
    public async getData({ response }: HttpContext) {
        try {
            const db = getMongoDb()
            const pertanyaanDocs = await db.collection('pertanyaan').find().toArray()
            const jawabanDocs = await db.collection('jawaban').find().toArray()

            const pertanyaan = pertanyaanDocs.map(p => ({
                id: p._id.toString(),
                text: p.Pertanyaan,
            }))

            const jawaban = jawabanDocs.map(j => {
                const { _id, Tumbuhan, createdAt, updatedAt, ...answers } = j
                return {
                    id: _id.toString(),
                    tumbuhan: Tumbuhan,
                    ...answers
                }
            })

            return response.json({
                success: true,
                pertanyaan,
                jawaban,
            })
        } catch (error) {
            console.log('Terjadi error:', error)
            return response.status(500).json({
                success: false,
                message: 'Error fetching quiz data',
                error: error.message,
            })
        }
    }
}