import User from '#models/user'
import { BaseSeeder } from '@adonisjs/lucid/seeders'

export default class UserSeeder extends BaseSeeder {
  async run() {
    await User.create({
      fullName: 'Dummy User',
      email: 'test@hidroponik.com',
      password: 'hidro2025', // akan di-hash otomatis
    })
  }
}
