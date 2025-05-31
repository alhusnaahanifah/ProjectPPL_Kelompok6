// app/Controllers/Http/QuizController.ts

import type { HttpContext } from '@adonisjs/core/http'

import { getMongoDb } from '#start/mongodb';

export default class QuizController {
    public async index({ inertia }: HttpContext) {
        try {            
            // Ambil koneksi MongoDB
            const db = getMongoDb();

            // Akses koleksi secara langsung
            const pertanyaanDocs = await db.collection('pertanyaan').find().toArray();
            const jawabanDocs = await db.collection('jawaban').find().toArray();

            const pertanyaanList = pertanyaanDocs.map((p) => ({
                id: p._id.toString(),
                text: p.Pertanyaan,
            }));

            const jawabanList = jawabanDocs.map((j) => {
                const { Tumbuhan, _id, ...answers } = j;

                return {
                    id: _id.toString(),
                    tumbuhan: Tumbuhan,
                    jawaban: Object.entries(answers).map(([pertanyaan, jawaban]) => ({
                        pertanyaan, // Nama kolom (misalnya: "Apakah Anda ingin tanaman yang tahan hama?")
                        jawaban, // Jawaban dari tanaman tersebut ("Ya" atau "Tidak")
                    })),
                };
            });

            return inertia.render('PlantQuiz', {
                pertanyaan: pertanyaanList,
                jawaban: jawabanList,
            });

        } catch (error) {
            console.log('Terjadi Error:', error);
            return inertia.render('Error', { 
                error: error.message,
                status: 500 
            });
        }
    }

    // For API data fetching (used by frontend)
    public async getData({ response }: HttpContext) {
        try {
            
            const db = getMongoDb(); // Ambil koneksi database
            const pertanyaanDocs = await db.collection('pertanyaan').find().toArray();
            const jawabanDocs = await db.collection('jawaban').find().toArray();

            return response.json({
                success: true,
                pertanyaan: pertanyaanDocs,
                jawaban: jawabanDocs,
            });
        } catch (error) {
            console.log('Terjadi error:', error);
            return response.status(500).json({
                success: false,
                message: 'Error fetching quiz data',
                error: error.message,
            });
        }
    }
    public async calculateResult({ request, response }: HttpContext) {
        try {
            const { answers } = request.only(['answers']);

            if (!answers || !Array.isArray(answers)) {
                return response.status(400).json({
                    success: false,
                    message: 'Invalid answers format',
                });
            }

            const db = getMongoDb();
            const pertanyaanDocs = await db.collection('pertanyaan').find().toArray();
            const jawabanDocs = await db.collection('jawaban').find().toArray();

            // Buat pemetaan ID pertanyaan ke teks pertanyaan
            const pertanyaanMap: Record<string, string> = {};
            pertanyaanDocs.forEach((p) => {
                pertanyaanMap[p._id.toString()] = p.Pertanyaan;
            });

            let maxScore = 0;
            let bestMatches: Array<{ tumbuhan: string; score: number; totalQuestions: number }> = [];

            // **Nama pertanyaan khusus yang harus diproses berbeda**
            const pertanyaanIndoor = "Apakah Anda lebih suka menanam tanaman di dalam ruangan (indoor)?";

            // Proses setiap tanaman
            for (const jawabanDoc of jawabanDocs) {
                let score = 0;
                const { Tumbuhan, _id, ...plantAnswers } = jawabanDoc;

                answers.forEach(({ questionId, answer }) => {
                    const pertanyaanText = pertanyaanMap[questionId];

                    // **Logika khusus untuk pertanyaan "Indoor"**
                    if (pertanyaanText === pertanyaanIndoor) {
                        if (answer === "Tidak") {
                            // Jika pengguna menjawab "Tidak", semua tanaman dapat poin tambahan
                            score++;
                        } else if (answer === "Ya" && plantAnswers[pertanyaanText] === "Ya") {
                            // Jika pengguna menjawab "Ya", hanya tanaman yang "Ya" mendapatkan poin
                            score++;
                        }
                    } else {
                        // **Logika perhitungan biasa**
                        if (pertanyaanText in plantAnswers && plantAnswers[pertanyaanText] === answer) {
                            score++;
                        }
                    }
                });

                if (score > maxScore) {
                    maxScore = score;
                    bestMatches = [{ tumbuhan: Tumbuhan, score, totalQuestions: answers.length }];
                } else if (score === maxScore) {
                    bestMatches.push({ tumbuhan: Tumbuhan, score, totalQuestions: answers.length });
                }
            }

            return response.json({
                success: true,
                result: bestMatches,
                message: bestMatches.length > 0
                    ? `Tanaman yang paling cocok berdasarkan jawaban Anda adalah: ${bestMatches.map((p) => p.tumbuhan).join(', ')}`
                    : 'Tidak dapat menentukan tanaman yang cocok',
            });
        } catch (error) {
            return response.status(500).json({
                success: false,
                message: 'Error calculating result',
                error: error.message,
            });
        }
    }
}