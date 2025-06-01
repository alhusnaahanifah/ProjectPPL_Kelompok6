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

        const jawaban = jawabanDocs.map(j => ({
        id: j._id.toString(),
        tumbuhan: j.Tumbuhan,
        }))

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
    await db.collection('pertanyaan').insertOne({ Pertanyaan: pertanyaan })
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

    const db = getMongoDb()
    await db.collection('jawaban').insertOne({ Tumbuhan, ...answers })
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

        return response.json({
            ...doc,
            tumbuhan: doc.Tumbuhan // Tambahkan field alias untuk konsistensi
        })
    }

    // PUT /admin/quiz/jawaban/:tumbuhan
    public async updateJawaban({ params, request, response }: HttpContext) {
        const { tumbuhan } = params
        const { answers } = request.only(['answers'])

        if (!answers) {
            return response.badRequest({ message: 'Jawaban tidak boleh kosong' })
        }

        const db = getMongoDb()
        const result = await db.collection('jawaban').updateOne(
            { Tumbuhan: tumbuhan },
            { $set: answers }
        )

        if (result.matchedCount === 0) {
            return response.notFound({ message: 'Tumbuhan tidak ditemukan' })
        }

        return response.redirect().back()
    }

    // DELETE /admin/quiz/jawaban/:tumbuhan
    public async deleteJawaban({ params, response }: HttpContext) {
        const { tumbuhan } = params

        const db = getMongoDb()
        const result = await db.collection('jawaban').deleteOne({ Tumbuhan: tumbuhan })

        if (result.deletedCount === 0) {
            return response.notFound({ message: 'Tumbuhan tidak ditemukan' })
        }

        return response.redirect().back()
    }

}