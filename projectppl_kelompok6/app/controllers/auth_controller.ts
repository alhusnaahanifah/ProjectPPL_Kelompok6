import type { HttpContext } from '@adonisjs/core/http'
import hash from '@adonisjs/core/services/hash'
import User from '#models/user'

export default class AuthController {
    async login({ request, auth, response }: HttpContext) {
        const email = request.input('email')
        const password = request.input('password')
    
        const user = await User.findBy('email', email)
        if (!user) {
          return response.unauthorized({ message: 'User tidak ditemukan' })
        }
    
        const isValid = await hash.verify(user.password, password)
        if (!isValid) {
          return response.unauthorized({ message: 'Password salah' })
        }
    
        await auth.use('web').login(user)
        return response.redirect('/dashboard')
      }

  async logout({ response, auth }: HttpContext) {
    await auth.use('web').logout()
    return response.redirect('/login')
  }

    async signup({ request, auth, response }: HttpContext) {
    const name = request.input('name')
    const email = request.input('email')
    const password = request.input('password')

    if (!name || !email || !password) {
        return response.badRequest('Semua field harus diisi')
    }

    // Cek jika email sudah digunakan
    const existingUser = await User.findBy('email', email)
    if (existingUser) {
        return response.badRequest('Email sudah terdaftar')
    }

    try {
        const user = await User.create({
        fullName: name,
        email,
        password: await hash.make(password),
        })

        await auth.use('web').login(user)
        return response.ok({ success: true }) // biar Inertia yang redirect

    } catch (error) {
        console.error(error)
        return response.badRequest('Gagal mendaftar')
    }
    }
}
