import type { HttpContext } from '@adonisjs/core/http'
import hash from '@adonisjs/core/services/hash'
import { getMongoDb } from '#start/mongodb'

export default class AuthController {
  public async login({ request, response, session }: HttpContext) {
    const email = request.input('email').toLowerCase()
    const password = request.input('password')

    const db = getMongoDb()
    const user = await db.collection('users').findOne({ email })

    if (!user) {
      return response.status(422).send({
        errors: {
          email: 'Email tidak ditemukan'
        }
      })
    }

    const isPasswordValid = await hash.verify(user.password, password)

    if (!isPasswordValid) {
      return response.status(422).send({
        errors: {
          password: 'Password salah'
        }
      })
    }

    // Set user ke session
    session.put('user', {
      id: user._id.toString(),
      fullName: user.fullName,
      email: user.email
    })

    return response.redirect('/dashboard')
  }

  public async logout({ response, session }: HttpContext) {
    session.forget('user')
    return response.redirect('/')
  }

  public async signup({ request, response, session }: HttpContext) {
    const name = request.input('name')
    const email = request.input('email')
    const password = request.input('password')

    if (!name || !email || !password) {
      return response.status(422).send({
        errors: {
          name: !name ? 'Nama harus diisi' : undefined,
          email: !email ? 'Email harus diisi' : undefined,
          password: !password ? 'Password harus diisi' : undefined,
        }
      })
    }

    const db = getMongoDb()
    const existingUser = await db.collection('users').findOne({ email })
    if (existingUser) {
      return response.status(422).send({
        errors: {
          email: 'Email sudah terdaftar'
        }
      })
    }

    const hashedPassword = await hash.use('scrypt').make(password)

    const result = await db.collection('users').insertOne({
      fullName: name,
      email,
      password: hashedPassword,
    })

    session.put('user', {
      id: result.insertedId.toString(),
      fullName: name,
      email,
    })

    return response.redirect('/login')
  }
}
