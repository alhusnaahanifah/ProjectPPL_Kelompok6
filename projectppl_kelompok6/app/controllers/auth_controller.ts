import type { HttpContext } from '@adonisjs/core/http'
import hash from '@adonisjs/core/services/hash'
import User from '#models/user'

export default class AuthController {

  public async login({ request, auth, response, session }: HttpContext) {
    const email = request.input('email').toLowerCase()
    const password = request.input('password')

    const user = await User.query().where('email', email).first()

    if (!user) {
      session.flash('errors', { email: 'Email tidak ditemukan' })
      return response.redirect().back()
    }

    const isPasswordValid = await hash.verify(user.password, password)

    if (!isPasswordValid) {
      session.flash('errors', { password: 'Password salah' })
      return response.redirect().back()
    }

    await auth.use('web').login(user)

    return response.redirect('/dashboard') // ✅ redirect inertia-friendly
  } 


  async logout({ response, auth }: HttpContext) {
    await auth.use('web').logout()
    return response.redirect('/login')
  }

  public async signup({ request, auth, response }: HttpContext) {
    const name = request.input('name')
    const email = request.input('email')
    const password = request.input('password')

    // Validasi sederhana
    if (!name || !email || !password) {
      return response.badRequest({ message: 'Semua field harus diisi' })
    }

    // Cek jika email sudah digunakan
    const existingUser = await User.findBy('email', email)
    if (existingUser) {
      return response.badRequest({ message: 'Email sudah terdaftar' })
    }

    try {
      // Buat user baru
      const user = await User.create({
        fullName: name,
        email,
        password: await hash.use('scrypt').make(password), // ✅ pastikan password di-hash
      })

      // Auto login setelah daftar (opsional)
      await auth.use('web').login(user)

      return response.redirect('/login') // Inertia akan handle redirect
    } catch (error) {
      console.error('Signup error:', error)
      return response.badRequest({ message: 'Gagal mendaftar. Coba lagi nanti.' })
    }
  }
}
